import "@stdlib/deploy";
import "./app_contract";

// Сообщения
message AddTelegramId {
    id: Int as uint256;
}
message ChangeVal {
    val: Int as uint8;
    newVal: Cell;
    initiator: Address;
}
contract RequestContract with Deployable {
    address: Address;
    pool: Int as uint256;
    app: Address;

    init(addressUser: Address, pool: Int as uint256, app: Address) {
        self.address = addressUser;
        self.pool = pool;
        self.app = app;
    }

    receive() {}

    receive(msg: Approve) {
        let loginAddress = login(msg.sender!!, self.app, null);
        require(loginAddress == sender(), "Not enought rights");
        let data: Cell = beginCell()
            .storeAddress(msg.user!!) // первое число
            .storeUint(self.pool, 256)
            .endCell();
        send(SendParameters {
            to: self.address,
            value: ton("0.05"),
            body: ChangeVal {
                val: 4,
                newVal: data,
                initiator: msg.sender!!,
            }.toCell(),
        });
        send(SendParameters {
            to: msg.sender!!,
            value: 0,
            mode: SendRemainingBalance + SendDestroyIfZero,
        });
    }

    receive(msg: Decline) {
        let loginAddress = login(msg.sender!!, self.app, null);
        require(loginAddress == sender(), "Not enought rights");
        let data: Cell = beginCell()
            .storeAddress(msg.user!!) // первое число
            .storeUint(self.pool, 256)
            .endCell();
        send(SendParameters {
            to: sender(),
            value: 0,
            mode: SendRemainingBalance + SendDestroyIfZero,
            body: "Contract destroyed".asComment(),
        });
    }
}
contract BorrowContract with Deployable {
    id: Int as uint32;
    address: Address;
    createdTime: Int as uint32;
    pool: Int as uint256;
    sum: Int as coins;
    app: Address;
    endTime: Int as uint64;

    init(address: Address, pool: Int as uint256, app: Address, id: Int) {
        self.createdTime = now();
        self.pool = pool;
        self.address = address;
        self.app = app;
        self.id = id;
        self.endTime = 0;
        self.sum = 0;
    }

    receive(msg: InitBorrow) {
        require(sender() == self.address, "Not enough rights!");
        self.endTime = now() + msg.endTime;
        self.sum = msg.sum;
    }

    receive() {}

    receive(msg: Changesum) {
        require(sender() == self.address, "Not enough rights!");
        self.sum = self.sum - msg.sum;
    }

    receive(msg: CheckTime) {
        require(sender() == self.app, "Not enough rights!");
        if (now() >= self.endTime) {
            let init: StateInit = initOf CompensationPool(self.pool, self.app);
            let childAddress: Address = contractAddress(init);
            let sum: Int = self.sum;
            send(SendParameters {
                to: childAddress,
                value: 0,
                mode: SendRemainingBalance + SendDestroyIfZero,
                body: Overdue {
                    address: self.address,
                    sum,
                    id: self.id,
                }.toCell(),
            });
        }
    }

    receive(msg: Close) {
        require(sender() == self.address, "Not enough rights!");
        send(SendParameters {
            to: sender(),
            value: 0,
            mode: SendRemainingBalance + SendDestroyIfZero,
            body: "Contract destroyed".asComment(),
        });
    }
}
contract User with Deployable {
    addressUser: Address;
    rating: Int as int257;
    app: Address;
    debts: map<Int as uint32, Debt>;
    investedIn: map<Address, CompPoolData>;
    compensationPools: map<Int as uint256, Address>;
    debtId: Int as uint32 = 0;

    init(addressUser: Address, app: Address) {
        self.app = app;
        self.addressUser = addressUser;
        self.rating = 0;
        self.debts = emptyMap();
        self.investedIn = emptyMap();
        self.compensationPools = emptyMap();
    }

    receive(msg: Approve) {
        let init2: StateInit = initOf CompensationPool(msg.id, self.app);
        let compPool: Address = contractAddress(init2);
        require(sender() == compPool, "Not enought rights");
        require(null != self.investedIn.get(sender()), "Not enough rights");
        //ПРОВЕРИТЬ
        let procent: Int = (self.investedIn.get(sender())!!.balance * 100) / msg.balance;
        require(procent >= 70, "You dont have enought rights in this pool");
        let init: StateInit = initOf RequestContract(msg.user!!, msg.id, self.app);
        let requestContract: Address = contractAddress(init);
        let user1: Address = msg.user!!;
        send(SendParameters {
            to: requestContract,
            value: 0,
            mode: SendRemainingValue,
            body: Approve {
                id: msg.id,
                user: user1,
                sender: msg.sender,
                balance: msg.balance,
            }.toCell(),
        });
    }

    receive(msg: Decline) {
        let init2: StateInit = initOf CompensationPool(msg.id, self.app);
        let compPool: Address = contractAddress(init2);
        require(sender() == compPool, "Not enought rights");
        require(null != self.investedIn.get(sender()), "Not enough rights");
        //ПРОВЕРИТЬ
        let procent: Int = (self.investedIn.get(sender())!!.balance * 100) / msg.balance;
        require(procent >= 70, "You dont have enought rights in this pool");
        let init: StateInit = initOf RequestContract(msg.user!!, msg.id, self.app);
        let requestContract: Address = contractAddress(init);
        let user1: Address = msg.user!!;
        send(SendParameters {
            to: requestContract,
            value: 0,
            mode: SendRemainingValue,
            body: Decline {
                id: msg.id,
                user: user1,
                sender: msg.sender,
                balance: msg.balance,
            }.toCell(),
        });
    }

    receive(msg: Borrow) {
        require(self.compensationPools.get(msg.idComp) != null, "You must obtain permission from this Compensation Pool.");
        let commision: Int = (msg.amount * 10) / 100;
        // 0.055
        let sum: Int = msg.amount + commision;
        if (self.rating < 0) { require(sum < ton("2"), "Your rating only allows you to take less than 2") }
        else if (self.rating >= 0 && self.rating < 20) { require(sum <= ton("15"), "Your rating only allows you to take less than 2") }
        else if (self.rating >= 20 && self.rating < 50) { require(sum <= ton("50"), "Your rating only allows you to take less than 2") }
        else if (self.rating >= 50 && self.rating < 80) { require(sum <= ton("100"), "Your rating only allows you to take less than 2") }
        // ЧТО ЛУЧШЕ Залог, Запрет суммы
        // ПРОВЕРИТЬ
        let debt: Debt = Debt { sum, timetoreturn: msg.time!!, borrowPool: msg.idBorrow, compPool: msg.idComp, commision, fcc: msg.fcc };
        self.debtId = self.debtId + 1;
        self.debts.set(self.debtId, debt);
        let init: StateInit = initOf BorrowContract(myAddress(), msg.idComp, self.app, self.debtId);
        let address: Address = contractAddress(init);
        self.compensationPools.set(msg.idComp, null);
        send(SendParameters {
            to: address,
            value: ton("0.02"),
            code: init.code,
            data: init.data, // Тело сообщения
            body: InitBorrow {
                endTime: msg.time!!,
                sum,
            }.toCell(),
        });
        let init2: StateInit = initOf CompensationPool(msg.idComp, self.app);
        let address2: Address = contractAddress(init2);
        let init3: StateInit = initOf BorrowPool(msg.idBorrow, self.app);
        let addressBorrow: Address = contractAddress(init3);
        send(SendParameters {
            to: address2,
            value: ton("0.01"),
            body: ChangeBorrow {
                balance: msg.balanceComp,
                id: self.debtId,
            }.toCell(),
        });
        send(SendParameters {
            to: addressBorrow,
            value: ton("0.01"),
            body: ChangeBorrow {
                balance: msg.balanceComp,
                id: self.debtId,
            }.toCell(),
        });
        // Доделать изменение map
        send(SendParameters {
            to: msg.to!!,
            value: msg.amount - ton("0.05"),
        });
    }

    receive(msg: Overdue) {
        // НЕ ВЫПОЛНЯЕТСЯ
        let debt: Debt = self.debts.get(msg.id)!!;
        let init: StateInit = initOf CompensationPool(debt.compPool, self.app);
        let compensationpoolAddress: Address = contractAddress(init);
        require(compensationpoolAddress == sender(), "Not enought rights");
        let init2: StateInit = initOf BorrowPool(debt.borrowPool, self.app);
        let borrowpoolAddress = contractAddress(init2);
        let toComp: Int = (debt.commision * 60) / 100;
        let toBorrow: Int = debt.sum - toComp;
        let toCreator: Int = (debt.commision * 10) / 100;
        self.debts.set(msg.id, null);
        self.rating = self.rating - (debt.sum * 10);
        send(SendParameters {
            to: compensationpoolAddress,
            value: toComp,
            body: Repay {
                id: msg.id,
            }.toCell(),
        });
        send(SendParameters {
            to: borrowpoolAddress,
            value: toBorrow,
            body: Repay {
                id: msg.id,
            }.toCell(),
        });
    }

    receive() {}

    receive(msg: Repay) {
        require(sender() == self.app, "Not enought rights!");
        let debt = self.debts.get(msg.id)!!;
        if (debt.sum - context().value > 0) {
            let init: StateInit = initOf BorrowContract(self.addressUser, debt.borrowPool, self.app, msg.id);
            let address: Address = contractAddress(init);
            send(SendParameters {
                to: address,
                value: ton("0.01"),
                mode: SendIgnoreErrors,
                body: Changesum {
                    sum: context().value,
                }.toCell(),
            });
        } else {
            let init: StateInit = initOf CompensationPool(debt.compPool, self.app);
            self.debts.set(msg.id, null);
            let compensationpoolAddress = contractAddress(init);
            let init2: StateInit = initOf BorrowPool(debt.borrowPool, self.app);
            let borrowpoolAddress = contractAddress(init2);
            let toComp: Int = (debt.commision * 60) / 100;
            let toBorrow: Int = debt.sum - toComp;
            //let toCreator: Int = (debt.commision * 10) / 100;
            self.rating = self.rating + (debt.sum / 1000);
            send(SendParameters {
                to: compensationpoolAddress,
                value: toComp,
                body: Repay {
                    id: msg.id,
                }.toCell(),
            });
            send(SendParameters {
                to: borrowpoolAddress,
                value: toBorrow,
                body: Repay {
                    id: msg.id,
                }.toCell(),
            });
            send(SendParameters {
                to: self.addressUser,
                value: 0,
                mode: SendRemainingValue,
            });
        }
    }

    receive(msg: ChangeVal) {
        if (msg.val == 1) {
            let s: Slice = msg.newVal.asSlice();
            self.rating = s.loadInt(257);
        } else if (msg.val == 3) {
            let s: Slice = msg.newVal.asSlice();
            let firstValue: Address = s.loadAddress();
            require(sender() == self.app || sender() == firstValue, "Insufficient rights!");
            let secondValue: Int = s.loadCoins();
            let pool: CompPoolData = CompPoolData { v: 0, freezed: 0, address: firstValue, balance: secondValue, earnCoff: 0, freezeCoff: 0, balanceUserAfter: secondValue };
            if (self.investedIn.get(firstValue) != null) {
                let oldVal: CompPoolData = self.investedIn.get(firstValue)!!;
                secondValue = oldVal.balance + secondValue;
                pool.v = oldVal.v;
                pool.freezed = oldVal.freezed;
                pool.address = oldVal.address;
                pool.balance = secondValue;
                pool.earnCoff = oldVal.earnCoff;
                pool.freezeCoff = oldVal.freezeCoff;
                pool.balanceUserAfter = oldVal.balanceUserAfter;
            }
            self.investedIn.set(firstValue, pool);
        } else if (msg.val == 4) {
            let s: Slice = msg.newVal.asSlice();
            let firstValue: Address = s.loadAddress();
            let secondValue: Int = s.loadUint(256);
            let init: StateInit = initOf RequestContract(myAddress(), secondValue, self.app);
            let address1: Address = contractAddress(init);
            require(address1 == sender(), "Not enought rights!");
            self.compensationPools.set(secondValue, firstValue);
        } else if (msg.val == 6) {
            let s: Slice = msg.newVal.asSlice();
            let firstValue: Int = s.loadUint(32); // id
            let v: Int = s.loadUint(32); // version
            let secondValue: Int = s.loadUint(64); // fcc 458333333
            let init: StateInit = initOf CompensationPool(firstValue, self.app);
            let address1: Address = contractAddress(init);
            require(self.investedIn.get(address1) != null, "value not found");
            require(self.investedIn.get(address1)!!.freezeCoff != secondValue, "");
            //require(self.investedIn.get(address1)!!.v != v, "");
            let oldData: CompPoolData = self.investedIn.get(address1)!!;
            let balance: Int = oldData.balance + oldData.freezed;
            let freezeDelta: Int = secondValue - oldData.freezeCoff;
            let userFreeze: Int = (balance * freezeDelta) / SCALE;
            let newBalance: Int = oldData.balance - userFreeze;
            let newFreeze: Int = oldData.freezed + userFreeze;
            let struct: CompPoolData = CompPoolData {
                v,
                freezed: newFreeze,
                address: address1,
                balance: newBalance,
                earnCoff: oldData.earnCoff,
                freezeCoff: secondValue,
                balanceUserAfter: oldData.balanceUserAfter,
            };
            self.investedIn.set(address1, struct);
        } else if (msg.val == 5) {
            let s: Slice = msg.newVal.asSlice();
            let type: Int = s.loadUint(2);
            let firstValue: Int = s.loadUint(32); // id
            let v: Int = s.loadUint(32); // v (версия)
            let secondValue: Int = s.loadCoins();
            let address1: Address = myAddress(); // Это временное значение
            if (type == 1) {
                let init: StateInit = initOf CompensationPool(firstValue, self.app);
                address1 = contractAddress(init);
            } else {
                let init: StateInit = initOf BorrowPool(firstValue, self.app);
                address1 = contractAddress(inэit);
            }
            require(self.investedIn.get(address1) != null, "value not found");
            require(self.investedIn.get(address1)!!.earnCoff != secondValue, "");
            let oldData: CompPoolData = self.investedIn.get(address1)!!;
            let balance: Int = oldData.balance;
            let earnDelta: Int = secondValue - oldData.earnCoff;
            let userEarn: Int = (balance * earnDelta) / SCALE;
            let newBalance: Int = oldData.balance + userEarn;
            let struct: CompPoolData = CompPoolData {
                v,
                freezed: oldData.freezed,
                address: address1,
                balance: newBalance,
                earnCoff: secondValue, // сохраняем новый acc
                freezeCoff: oldData.freezeCoff,
                balanceUserAfter: oldData.balanceUserAfter,
            };
            self.investedIn.set(address1, struct);
        }
        send(SendParameters {
            to: msg.initiator,
            value: 0,
            mode: SendRemainingValue,
        });
    }

    receive(msg: Withdraw) {
        require(sender() == self.app, "Not enought rights");
        let from: Address = msg.from2!!;
        let oldValue: CompPoolData = self.investedIn.get(from)!!;
        oldValue.balance = oldValue.balance - msg.amount;
        require(oldValue.balance >= 0, "Not enought funds");
        self.investedIn.set(from, oldValue);
        send(SendParameters {
            to: from,
            value: 0,
            mode: SendRemainingValue,
            body: Withdraw {
                from: msg.from,
                from2: from,
                amount: msg.amount,
                to1: msg.to1,
            }.toCell(),
        });
    }

    get fun investedIn(): map<Address, CompPoolData> {
        return self.investedIn;
    }

    get fun debts(): map<Int as uint32, Debt> {
        return self.debts;
    }

    get fun rating(): Int {
        return self.rating;
    }

    get fun compensationPools(): map<Int as uint256, Address> {
        return self.compensationPools;
    }
}
// Места исправлений помечены коментарием РАСПРЕДЕЛЕНИЕ
