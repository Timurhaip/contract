import "@stdlib/deploy";
import "./app_contract";

// Сообщения
message AddTelegramId {
    id: Int as uint256;
}
message ChangeVal {
    val: Int as uint8;
    newVal: Cell;
}
message SendData {
    val: Int as uint8;
    data: Cell;
}
contract RequestContract with Deployable {
    address: Address;
    pool: Int as uint256;
    app: Address;

    init(address: Address, pool: Int as uint256, app: Address) {
        self.address = address;
        self.pool = pool;
        self.app = app;
    }

    receive() {}

    receive(msg: Approve) {
        let init: StateInit = initOf CompensationPool(msg.id, self.app);
        let childAddress: Address = contractAddress(init);
        require(childAddress == sender(), "Not enought rights");
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
            }.toCell(),
        });
        send(SendParameters {
            to: sender(),
            value: 0,
            mode: SendRemainingBalance + SendDestroyIfZero,
            body: "Contract destroyed".asComment(),
        });
    }

    receive(msg: Decline) {
        let init: StateInit = initOf CompensationPool(msg.id, self.app);
        let childAddress: Address = contractAddress(init);
        require(childAddress == sender(), "Not enought rights");
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
    address: Address;
    telegramId: Int?;
    rating: Int as int257;
    app: Address;
    debts: map<Int as uint32, Debt>;
    investedIn: map<Address, CompPoolData>;
    compensationPools: map<Int as uint256, Address>;
    debtId: Int as uint32 = 0;

    init(address: Address, app: Address) {
        self.app = app;
        self.address = address;
        self.rating = 0;
        self.debts = emptyMap();
        self.investedIn = emptyMap();
        self.compensationPools = emptyMap();
    }

    receive(msg: Approve) {
        require(self.investedIn.get(sender()) >= ton("20"), "You dont have enought rights in this pool");
        require(sender() == self.app, "Not enough rights");
        // Добавить ещё одну проверку на права в пуле
        let init: StateInit = initOf RequestContract(msg.user!!, msg.id, self.app);
        let requestContract: Address = contractAddress(init);
        let user1: Address = msg.user!!;
        send(SendParameters {
            to: requestContract,
            value: context().value,
            mode: SendIgnoreErrors,
            body: Approve {
                id: msg.id,
                user: user1,
            }.toCell(),
        });
    }
    receive(msg: Decline){
        require(self.investedIn.get(sender()) >= ton("20"), "You dont have enought rights in this pool");
        let init: StateInit = initOf CompensationPool(msg.id, se);
        let requestContract: Address = contractAddress(init);
        let user1: Address = msg.user!!;
        send(SendParameters {
            to: requestContract,
            value: context().value,
            mode: SendIgnoreErrors,
            body: Decline {
                id: msg.id,
                user: user1,
            }.toCell(),
        });
    }
    receive(msg: Borrow) {
        let init: StateInit = initOf BorrowContract(myAddress(), msg.idComp, self.app, self.debtId);
        let address: Address = contractAddress(init);
        require(self.compensationPools.get(msg.idComp) != null, "You must obtain permission from this Compensation Pool.");
        let commision: Int = (msg.amount * 10) / 100;
        let sum: Int = msg.amount + commision - ton("0.15");
        if (self.rating < 0) { require(sum < ton("2"), "Your rating only allows you to take less than 2") }
        else if (self.rating >= 0 && self.rating < 20) { require(sum <= ton("5"), "Your rating only allows you to take less than 2") }
        let debt: Debt = Debt { sum, timetoreturn: msg.time!!, borrowPool: msg.idBorrow, compPool: msg.idComp, commision, fcc: msg.fcc };
        self.debtId = self.debtId + 1;
        self.debts.set(self.debtId, debt);
        send(SendParameters {
            to: address,
            value: ton("0.05"),
            mode: SendIgnoreErrors,
            code: init.code,
            data: init.data, // Тело сообщения
        });
        send(SendParameters {
            to: address,
            value: ton("0.05"),
            mode: SendIgnoreErrors,
            body: InitBorrow {
                endTime: msg.time!!,
                sum,
            }.toCell(),
        });
        send(SendParameters {
            to: msg.to!!,
            value: msg.amount,
            mode: SendPayGasSeparately, // Тело сообщения
        });
    }

    receive(msg: AddTelegramId) {
        require(sender() == self.app, "Not enought rights!");
        self.telegramId = msg.id;
    }

    receive(msg: Overdue) {
        let debt: Debt = self.debts.get(msg.id)!!;
        let init: StateInit = initOf CompensationPool(debt.compPool, self.app);
        let compensationpoolAddress: Address = contractAddress(init);
        require(compensationpoolAddress == sender(), "You must obtain permission from the Compensation Pool.");
        let init2: StateInit = initOf BorrowPool(debt.borrowPool, self.app);
        let borrowpoolAddress = contractAddress(init2);
        let toComp: Int = (debt.commision * 60) / 100;
        let toBorrow: Int = debt.sum - toComp;
        self.debts.set(msg.id, null);
        self.rating = self.rating - 2 * debt.sum;
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
            let init: StateInit = initOf BorrowContract(self.address, debt.borrowPool, self.app, msg.id);
            let address: Address = contractAddress(init);
            send(SendParameters {
                to: address,
                value: ton("0.05"),
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
            self.rating = self.rating + 2 * debt.sum;
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
    }

    receive(msg: Unfreeze) {
        let init: StateInit = initOf CompensationPool(msg.id, self.app);
        let address1: Address = contractAddress(init);
        let v: Int = msg.v;
        require(self.investedIn.get(address1) != null, "");
        let data: CompPoolData = self.investedIn.get(address1)!!;
        let newFreezed: Int = data.freezed - (data.freezed / msg.fcc);
        let newBalance = data.balance + (data.freezed - newFreezed);
        let struct: CompPoolData = CompPoolData { v, freezed: newFreezed, address: address1, balance: newBalance, earnCoff: data.earnCoff, freezeCoff: data.freezeCoff };
        self.investedIn.set(address1, struct);
    }

    receive(msg: ChangeVal) {
        if (msg.val == 1) {
            let s: Slice = msg.newVal.asSlice();
            self.rating = s.loadInt(257);
        } else if (msg.val == 3) {
            let s: Slice = msg.newVal.asSlice();
            let firstValue: Address = s.loadAddress();
            let secondValue: Int = s.loadCoins();
            if (self.investedIn.get(firstValue) != null) {
                secondValue = self.investedIn.get(firstValue)!!.balance + secondValue;
            }
            let pool: CompPoolData = CompPoolData { v: s.loadUint(32), freezed: 0, address: firstValue, balance: secondValue, earnCoff: s.loadUint(32), freezeCoff: s.loadUint(32) };
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
            let firstValue: Int = s.loadUint(32);
            let init: StateInit = initOf CompensationPool(firstValue, self.app);
            let address1: Address = contractAddress(init);
            require(self.investedIn.get(address1) != null, "");
            let secondValue: Int = s.loadCoins();
            let v: Int = s.loadUint(32);
            require(self.investedIn.get(address1)!!.v != v, "");
            let balance: Int = self.investedIn.get(address1)!!.balance;
            let freezed: Int = self.investedIn.get(address1)!!.freezed;
            let newBalance: Int = (balance - secondValue * balance) - self.investedIn.get(address1)!!.freezeCoff * balance;
            let newFreezevalue: Int = self.investedIn.get(address1)!!.freezeCoff + secondValue;
            let struct: CompPoolData = CompPoolData { v, freezed: freezed + secondValue * balance, address: address1, balance: newBalance, earnCoff: self.investedIn.get(address1)!!.earnCoff, freezeCoff: newFreezevalue };
            self.investedIn.set(address1, struct);
        } else if (msg.val == 5) {
            let s: Slice = msg.newVal.asSlice();
            let firstValue: Int = s.loadUint(32);
            let init: StateInit = initOf CompensationPool(firstValue, self.app);
            let address1: Address = contractAddress(init);
            require(self.investedIn.get(address1) != null, "");
            let secondValue: Int = s.loadCoins();
            let v: Int = s.loadUint(32);
            require(self.investedIn.get(address1)!!.v != v, "");
            let balance: Int = self.investedIn.get(address1)!!.balance;
            let newBalance: Int = (balance + secondValue * balance) - self.investedIn.get(address1)!!.earnCoff * balance;
            let newEarnValue: Int = self.investedIn.get(address1)!!.earnCoff + secondValue * balance;
            let struct: CompPoolData = CompPoolData { v, freezed: self.investedIn.get(address1)!!.freezed, address: address1, balance: newBalance, earnCoff: newEarnValue, freezeCoff: self.investedIn.get(address1)!!.freezeCoff };
            self.investedIn.set(address1, struct);
        }
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
            value: ton("0.05"),
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
// ПЕРЕРАБОТАТЬ ЛОГИКУ REQUEST, ДАННЫЕ НЕ ОБНОВЛЯЮТСЯ
