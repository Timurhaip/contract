import "@stdlib/deploy";
// Импорты
import "./help_contracts";

// Сообщения
message Overdue {
    address: Address;
    sum: Int as coins;
    id: Int as uint32;
}
message Time {
    address: Address;
    id: Int as uint16;
    pool: Int as uint16;
}
message Changesum { sum: Int as coins }
message Borrow {
    idBorrow: Int as uint256;
    idComp: Int as uint256;
    amount: Int as coins;
    time: Int?;
    to: Address?;
    fcc: Int as coins;
}
message InitBorrow {
    endTime: Int as uint32;
    sum: Int as coins;
}
message CheckTime {}
message Close {}
message Update {
    sender: Address;
}
message Unfreeze {
    v: Int as uint256;
    fcc: Int as coins;
    id: Int as uint256;
}
message UpdateEarn {
    sender: Address;
}
message Repay {
    id: Int as uint256;
}
message Request {
    id: Int as uint256;
    user: Address?;
}
message Approve {
    id: Int;
    user: Address?;
}
message Decline {
    id: Int;
    user: Address?;
}
message Withdraw {
    from: Int;
    from2: Address?;
    amount: Int as coins;
    to1: Address?;
}
message WithdrawFromComp {
    from: Int;
    from2: Address?;
    amount: Int as coins;
    to1: Address?;
}
message InitCompensationPool {
    name: String;
    maxTime: Int as uint32;
}
message CreateBorrowPool {
    name: String;
    maxTime: Int as uint32;
}
message CreateCompensationPool {
    name: String;
    maxTime: Int as uint32;
}
message Login {}
message Deposit {
    id: Int as uint32;
    sender: Address?;
}
message DepositToComp {
    id: Int as uint32;
    sender: Address?;
}
message InitBorrowPool {
    name: String;
    maxTime: Int as uint32;
}

// Функции
fun login(address: Address, app: Address, create: Int?): Address {
    if (create != null) {
        let init: StateInit = initOf User(address, app);
        let contractAddress: Address = contractAddress(init);
        send(SendParameters {
            to: contractAddress,
            value: ton("0.1"),
            mode: 1, // ← Добавить SendPayGasSeparately
            code: init.code,
            data: init.data,
            body: emptyCell(), // ← Явно указываем пустое тело
        });
        return contractAddress;
    } else {
        let init: StateInit = initOf User(address, app);
        let contractAddress: Address = contractAddress(init);
        return contractAddress;
    }
}
fun updateFunc(address: Address, data: Cell, val1: Int) {
    send(SendParameters {
        to: address,
        value: ton("0.05"),
        mode: SendIgnoreErrors,
        body: ChangeVal { val: val1, newVal: data }.toCell(), // Тело сообщения
    });
}
// Структуры
struct Debt {
    sum: Int as coins;
    timetoreturn: Int as uint32;
    borrowPool: Int as uint256;
    compPool: Int as uint256;
    commision: Int as coins;
    fcc: Int as coins;
}
struct CompPoolData {
    v: Int as uint32;
    freezed: Int as coins;
    address: Address;
    balance: Int as coins;
    earnCoff: Int as uint32;
    freezeCoff: Int as uint32;
}
// Borrow pool Contract
contract BorrowPool with Deployable {
    id: Int as uint32;
    name: String;
    maxTime: Int as uint32;
    app: Address;
    acc: Int as coins;
    v: Int as uint32;

    init(id: Int, app: Address) {
        self.id = id;
        self.name = "";
        self.maxTime = 0;
        self.acc = 0;
        self.app = app;
        self.v = 0;
    }

    receive(msg: Borrow) {
        let init: StateInit = initOf CompensationPool(msg.idComp, self.app);
        let childAddress: Address = contractAddress(init);
        require(sender() == childAddress, "Not enought rights");
        require(myBalance() - msg.amount >= 0, "Not enought funds");
        let userAddress: Address = login(msg.to!!, self.app, null);
        let time1: Int = min(msg.time!!, self.maxTime);
        send(SendParameters {
            to: userAddress,
            value: msg.amount,
            mode: SendIgnoreErrors,
            body: Borrow { idBorrow: msg.idBorrow, idComp: msg.idComp, amount: msg.amount, to: msg.to, time: time1, fcc: msg.fcc }.toCell(), // Тело сообщения
        });
    }

    receive() {}

    receive (msg: InitBorrowPool) {
        require(sender() == self.app, "Not enough rights!");
        self.name = msg.name;
        self.maxTime = msg.maxTime;
    }

    receive(msg: Repay) {
        let sum: Int = (context().value * ton("1.1")) / ton("1.04");
        let comeback: Int = sum - (sum / ton("1.1"));
        self.acc = self.acc + ((sum - comeback) * ton("0.4"));
        self.v = self.v + 1;
    }

    receive(msg: Withdraw) {
        let init: StateInit = initOf User(msg.to1!!, self.app);
        let userAddress: Address = contractAddress(init);
        require(sender() == userAddress, "Not enought rights");
        let to1: Address = msg.to1!!;
        send(SendParameters {
            to: to1,
            value: msg.amount,
        });
    }

    receive(msg: Deposit) {
        require(sender() == self.app, "Not enough rights!");
        let data: Cell = beginCell()
            .storeAddress(myAddress()) // первое число
            .storeCoins(context().value - ton("0.05"))
            .storeUint(self.v, 32)
            .storeUint(self.acc, 32)
            .storeUint(0, 32)
            .endCell();
        let userAddress: Address = login(msg.sender!!, myAddress(), null);
        send(SendParameters {
            to: userAddress,
            value: ton("0.05"),
            body: ChangeVal {
                val: 3,
                newVal: data,
            }.toCell(),
        });
    }

    receive(msg: UpdateEarn) {
        let data2: Cell = beginCell()
            .storeUint(self.id, 32)
            .storeUint(self.v, 32)
            .storeCoins(self.acc)
            .endCell();
        updateFunc(myAddress(), data2, 6);
    }

    get fun balance(): Int { return myBalance() }

    get fun maxTime(): Int { return self.maxTime }

    get fun name(): String { return self.name }
}
contract CompensationPool with Deployable {
    id: Int as uint32;
    name: String;
    maxTime: Int as uint32;
    app: Address;
    freezed: Int as coins;
    acc: Int as uint32;
    v: Int as uint32;
    fcc: Int as coins = 0;

    init(id: Int, app: Address) {
        self.id = id;
        self.name = "";
        self.maxTime = 0;
        self.app = app;
        self.freezed = 0;
        self.acc = 0;
        self.v = 0;
    }

    receive(msg: Overdue) {
        send(SendParameters {
            to: msg.address,
            value: msg.sum,
            mode: SendIgnoreErrors,
            body: Overdue {
                address: msg.address,
                sum: msg.sum,
                id: msg.id,
            }.toCell(),
        });
    }

    receive(msg: Request) {
        require(sender() == self.app, "Not enough rights");
        let init: StateInit = initOf RequestContract(msg.user!!, msg.id, sender());
        let requestContract: Address = contractAddress(init);
        send(SendParameters {
            to: requestContract,
            value: context().value,
            mode: SendIgnoreErrors,
            code: init.code,
            data: init.data,
        });
    }

    receive(msg: Decline) {
        require(sender() == self.app, "Not enough rights");
        // Добавить ещё одну проверку на права в пуле
        let init: StateInit = initOf RequestContract(msg.user!!, msg.id, sender());
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
        require(sender() == self.app, "Not enought rights");
        require(myBalance() - (msg.amount + self.freezed) >= 0, "Not enought funds");
        self.fcc = self.fcc + (msg.amount / myBalance());
        self.freezed = self.freezed + msg.amount;
        self.v = self.v + 1;
        let init: StateInit = initOf BorrowPool(msg.idBorrow, self.app);
        let childAddress: Address = contractAddress(init);
        let sum: Int = context().value;
        send(SendParameters {
            to: childAddress,
            value: sum,
            mode: SendIgnoreErrors,
            body: Borrow { idBorrow: msg.idBorrow, idComp: msg.idComp, amount: msg.amount, to: msg.to, time: self.maxTime, fcc: msg.amount / myBalance() }.toCell(), // Тело сообщения
        });
    }

    receive (msg: InitCompensationPool) {
        require(sender() == self.app, "Not enough rights!");
        self.name = msg.name;
        self.maxTime = msg.maxTime;
    }

    receive() {}

    receive(msg: Repay) {
        self.acc += context().value / myBalance();
        self.v = self.v + 1;
    }

    receive(msg: Update) {
        let data2: Cell = beginCell()
            .storeUint(self.id, 32)
            .storeUint(self.v, 32)
            .storeCoins(self.fcc)
            .endCell();
        updateFunc(msg.sender, data2, 6);
    }

    receive(msg: UpdateEarn) {
        let data2: Cell = beginCell()
            .storeUint(self.id, 32)
            .storeUint(self.v, 32)
            .storeCoins(self.acc)
            .endCell();
        updateFunc(msg.sender, data2, 5);
    }

    receive(msg: DepositToComp) {
        require(sender() == self.app, "Not enough rights!");
        let data: Cell = beginCell()
            .storeAddress(myAddress()) // первое число
            .storeCoins(context().value - ton("0.05"))
            .storeUint(self.v, 32)
            .storeUint(self.acc, 32)
            .storeUint(self.fcc, 32)
            .endCell();
        let userAddress: Address = login(msg.sender!!, self.app, null);
        send(SendParameters {
            to: userAddress,
            value: ton("0.05"),
            body: ChangeVal {
                val: 3,
                newVal: data,
            }.toCell(),
        });
    }

    receive(msg: Withdraw) {
        let init: StateInit = initOf User(msg.to1!!, self.app);
        let userAddress: Address = contractAddress(init);
        require(sender() == userAddress, "Not enought rights");
        let to1: Address = msg.to1!!;
        send(SendParameters {
            to: to1,
            value: msg.amount,
        });
    }

    get fun balance(): Int { return myBalance() }

    get fun maxTime(): Int { return self.maxTime }

    get fun name(): String { return self.name }

    get fun freezed(): Int { return self.freezed }
}
contract AppContract {
    nowId: Int as uint256 = 1;

    init() {}

    receive() {
        cashback(sender());
    }

    receive(msg: Time) {
        let user: Address = login(msg.address, myAddress(), null);
        let init: StateInit = initOf BorrowContract(user, msg.pool, myAddress(), msg.id);
        let borrowcontractaddress: Address = contractAddress(init);
        send(SendParameters {
            to: borrowcontractaddress,
            value: context().value,
            mode: SendIgnoreErrors,
            body: CheckTime {}.toCell(), // Тело сообщения
        });
    }

    receive(msg: Login) {
        require(context().value >= ton("0.1"), "Insufficient funds for deploy");
        login(sender(), myAddress(), 1);
        cashback(sender());
    }

    receive(msg: Borrow) {
        let initComp: StateInit = initOf CompensationPool(msg.idComp, myAddress());
        let comppoolAddress: Address = contractAddress(initComp);
        send(SendParameters {
            to: comppoolAddress,
            value: context().value,
            mode: SendIgnoreErrors,
            body: Borrow { idBorrow: msg.idBorrow, idComp: msg.idComp, amount: msg.amount, to: sender(), time: 0, fcc: msg.fcc }.toCell(), // Тело сообщения
        });
    }

    // Работа с BorrowPool
    receive(msg: CreateBorrowPool) {
        let id: Int = self.nowId;
        self.nowId = self.nowId + 1;
        let balance: Int = context().value;
        // 1. Получаем инициализационные данные (код и начальный стейт)
        let init: StateInit = initOf BorrowPool(id, myAddress());
        // 2. Вычисляем адрес будущего контракта
        let borrowpoolAddress: Address = contractAddress(init);
        require(balance - ton("0.15") > 0, "Insufficient funds for deploy");
        let userAddress: Address = login(sender(), myAddress(), null);
        let data: Cell = beginCell()
            .storeAddress(borrowpoolAddress) // первое число
            .storeCoins(balance - ton("0.15"))
            .endCell();
        send(SendParameters {
            to: userAddress,
            value: ton("0.05"),
            body: ChangeVal {
                val: 3,
                newVal: data,
            }.toCell(),
        });
        balance = balance - ton("0.15");
        send(SendParameters {
            to: borrowpoolAddress,
            value: balance,
            mode: SendIgnoreErrors,
            code: init.code,
            data: init.data,
            body: InitBorrowPool { name: msg.name, maxTime: msg.maxTime }.toCell(), // Тело сообщения
        });
        send(SendParameters {
            to: borrowpoolAddress,
            value: ton("0.05"),
            body: UpdateEarn {
                sender: sender(),
            }.toCell(),
        });
    }

    receive(msg: Withdraw) {
        let userAddress: Address = login(sender(), myAddress(), null);
        let init2: StateInit = initOf BorrowPool(msg.from, myAddress());
        let childAddress: Address = contractAddress(init2);
        send(SendParameters {
            to: childAddress,
            value: ton("0.05"),
            body: UpdateEarn {
                sender: sender(),
            }.toCell(),
        });
        require(context().value >= ton("0.15"), "Not enought funs!");
        send(SendParameters {
            to: userAddress,
            value: ton("0.1"),
            body: Withdraw {
                from: msg.from,
                from2: childAddress,
                amount: msg.amount,
                to1: sender(),
            }.toCell(),
        });
    }

    receive(msg: Deposit) {
        let init: StateInit = initOf BorrowPool(msg.id, myAddress());
        let childAddress: Address = contractAddress(init);
        send(SendParameters {
            to: childAddress,
            value: ton("0.05"),
            body: UpdateEarn {
                sender: sender(),
            }.toCell(),
        });
        let amountToSend: Int = context().value;
        require(amountToSend - ton("0.1") > 0, "Not enough TON sent");
        send(SendParameters {
            to: childAddress,
            value: 0, // Пишем 0, потому что используем mode 64
            mode: SendRemainingValue + SendIgnoreErrors,
            body: Deposit {
                id: msg.id,
                sender: sender(),
            }.toCell(),
        });
    }

    // Работа с CompensationPool
    receive(msg: CreateCompensationPool) {
        let id: Int = self.nowId;
        self.nowId = self.nowId + 1;
        let balance: Int = context().value;
        // 1. Получаем инициализационные данные (код и начальный стейт)
        let init: StateInit = initOf CompensationPool(id, myAddress());
        // 2. Вычисляем адрес будущего контракта
        let compensationpoolAddress: Address = contractAddress(init);
        require(balance - ton("0.15") > 0, "Insufficient funds for deploy");
        let userAddress: Address = login(sender(), myAddress(), null);
        let data: Cell = beginCell()
            .storeAddress(compensationpoolAddress) // первое число
            .storeCoins(balance - ton("0.15"))
            .endCell();
        send(SendParameters {
            to: userAddress,
            value: ton("0.05"),
            body: ChangeVal {
                val: 3,
                newVal: data,
            }.toCell(),
        });
        balance = balance - ton("0.15");
        let data2: Cell = beginCell().storeUint(0, 32).storeCoins(0).endCell();
        send(SendParameters {
            to: compensationpoolAddress,
            value: balance,
            mode: SendIgnoreErrors,
            code: init.code,
            data: init.data,
            body: InitCompensationPool { name: msg.name, maxTime: msg.maxTime }.toCell(), // Тело сообщения
        });
        send(SendParameters {
            to: compensationpoolAddress,
            value: ton("0.025"),
            body: Update {
                sender: sender(),
            }.toCell(),
        });
        send(SendParameters {
            to: compensationpoolAddress,
            value: ton("0.025"),
            body: UpdateEarn {
                sender: sender(),
            }.toCell(),
        });
    }

    receive(msg: WithdrawFromComp) {
        let userAddress: Address = login(sender(), myAddress(), null);
        let init2: StateInit = initOf CompensationPool(msg.from, myAddress());
        let childAddress: Address = contractAddress(init2);
        send(SendParameters {
            to: childAddress,
            value: ton("0.05"),
            body: Update {
                sender: sender(),
            }.toCell(),
        });
        send(SendParameters {
            to: childAddress,
            value: ton("0.05"),
            body: UpdateEarn {
                sender: sender(),
            }.toCell(),
        });
        send(SendParameters {
            to: userAddress,
            value: ton("0.2"),
            body: Withdraw {
                from: msg.from,
                from2: childAddress,
                amount: msg.amount,
                to1: sender(),
            }.toCell(),
        });
    }

    receive(msg: DepositToComp) {
        let init: StateInit = initOf CompensationPool(msg.id, myAddress());
        let childAddress: Address = contractAddress(init);
        send(SendParameters {
            to: childAddress,
            value: ton("0.05"),
            body: Update {
                sender: sender(),
            }.toCell(),
        });
        send(SendParameters {
            to: childAddress,
            value: ton("0.05"),
            body: UpdateEarn {
                sender: sender(),
            }.toCell(),
        });
        let amountToSend: Int = context().value;
        require(amountToSend - ton("0.15") > 0, "Not enough TON sent");
        let value: Int = context().value - ton("0.15");
        send(SendParameters {
            to: childAddress,
            value,
            mode: SendIgnoreErrors,
            body: DepositToComp {
                id: msg.id,
                sender: sender(),
            }.toCell(),
        });
    }

    receive(msg: Request) {
        require(context().value - ton("0.15") >= 0, "Not enought funds!");
        let userAddress: Address = login(sender(), myAddress(), null);
        let init: StateInit = initOf CompensationPool(msg.id, myAddress());
        let childAddress: Address = contractAddress(init);
        send(SendParameters {
            to: childAddress,
            value: ton("0.05"),
            body: Update {
                sender: sender(),
            }.toCell(),
        });
        send(SendParameters {
            to: childAddress,
            value: ton("0.05"),
            body: UpdateEarn {
                sender: sender(),
            }.toCell(),
        });
        send(SendParameters {
            to: childAddress,
            value: ton("0.1"),
            data: init.data,
            code: init.code,
            body: Request {
                id: msg.id,
                user: userAddress,
            }.toCell(),
        });
    }

    receive(msg: Approve) {
        require(context().value - ton("0.15") >= 0, "Not enought funds!");
        let userAddress: Address = login(sender(), myAddress(), null);
        let init: StateInit = initOf CompensationPool(msg.id, myAddress());
        let childAddress: Address = contractAddress(init);
        send(SendParameters {
            to: childAddress,
            value: ton("0.05"),
            body: Update {
                sender: sender(),
            }.toCell(),
        });
        send(SendParameters {
            to: childAddress,
            value: ton("0.05"),
            body: UpdateEarn {
                sender: sender(),
            }.toCell(),
        });
        send(SendParameters {
            to: userAddress,
            value: ton("0.1"),
            body: Approve {
                id: msg.id,
                user: userAddress,
            }.toCell(),
        });
    }

    receive(msg: Decline) {
        require(context().value - ton("0.15") >= 0, "Not enought funds!");
        let userAddress: Address = login(sender(), myAddress(), null);
        let init: StateInit = initOf CompensationPool(msg.id, myAddress());
        let childAddress: Address = contractAddress(init);
        send(SendParameters {
            to: childAddress,
            value: ton("0.05"),
            body: Update {
                sender: sender(),
            }.toCell(),
        });
        send(SendParameters {
            to: childAddress,
            value: ton("0.05"),
            body: UpdateEarn {
                sender: sender(),
            }.toCell(),
        });
        send(SendParameters {
            to: childAddress,
            value: ton("0.1"),
            body: Decline {
                id: msg.id,
                user: userAddress,
            }.toCell(),
        });
    }

    receive(msg: Repay) {
        let userAddress: Address = login(sender(), myAddress(), null);
        let value: Int = context().value;
        send(SendParameters {
            to: userAddress,
            value,
            body: Repay {
                id: msg.id,
            }.toCell(),
        });
    }
    // ДОБАВИТЬ ЛОГИКУ  С SENDDATA

    get fun usersData(address: Address): Address {
        let init: StateInit = initOf User(address, myAddress());
        let addresscontract: Address = contractAddress(init);
        return addresscontract;
    }

    get fun borrowPools(id: Int): Address {
        let init: StateInit = initOf BorrowPool(id, myAddress());
        let childAddress: Address = contractAddress(init);
        return childAddress;
    }

    get fun compPools(id: Int): Address {
        let init: StateInit = initOf CompensationPool(id, myAddress());
        let childAddress: Address = contractAddress(init);
        return childAddress;
    }
}
// require
// 5. Различные функции для удобства + геттеры
// ФРОНТЕНД
