import "@stdlib/deploy";
// Импорты
import "./help_contracts";

// Константы
const SCALE: Int = 1000000000;
// Сообщения
message Overdue {
    address: Address;
    sum: Int as coins;
    id: Int as uint32;
}
message ChangeBorrow {
    balance: Int as coins;
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
    balanceComp: Int as coins;
    balanceBorrow: Int as coins;
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
    sender: Address?;
    balance: Int as coins;
}
message Decline {
    id: Int;
    user: Address?;
    sender: Address?;
    balance: Int as coins;
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
    let init: StateInit = initOf User(address, app);
    let contractAddress: Address = contractAddress(init);
    if (create != null) {
        send(SendParameters {
            to: contractAddress,
            value: ton("0.05"),
            code: init.code,
            data: init.data,
            body: emptyCell(), // ← Явно указываем пустое тело
        });
        return contractAddress;
    }
    return contractAddress;
}
fun updateFunc(address: Address, data: Cell, val1: Int, sender: Address) {
    send(SendParameters {
        to: address,
        value: ton("0.05"),
        mode: SendIgnoreErrors,
        body: ChangeVal { val: val1, newVal: data, initiator: sender }.toCell(), // Тело сообщения
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
    earnCoff: Int as uint64;
    freezeCoff: Int as uint64;
}
// Borrow pool Contract
contract BorrowPool with Deployable {
    id: Int as uint32;
    name: String;
    maxTime: Int as uint32;
    app: Address;
    acc: Int as coins;
    v: Int as uint32;
    borrowBalance: map<Int, Int as coins>;

    init(id: Int, app: Address) {
        self.id = id;
        self.name = "";
        self.maxTime = 0;
        self.acc = 0;
        self.app = app;
        self.v = 0;
        self.borrowBalance = emptyMap();
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
            mode: SendPayGasSeparately,
            body: Borrow { idBorrow: msg.idBorrow, idComp: msg.idComp, amount: msg.amount, to: msg.to, time: time1, fcc: msg.fcc, balanceComp: msg.balanceComp, balanceBorrow: myBalance() }.toCell(), // Тело сообщения
        });
        send(SendParameters {
            to: msg.to!!,
            value: 0,
            mode: SendRemainingValue,
        });
    }

    receive() {}

    receive (msg: InitBorrowPool) {
        require(sender() == self.app, "Not enough rights!");
        self.name = msg.name;
        self.maxTime = msg.maxTime;
    }

    receive(msg: ChangeBorrow) {
        let myCell: Cell = beginCell()
            .storeAddress(sender())
            .storeUint(msg.id, 32) // укажите нужную битность для вашего Int (например, 257)
            .endCell();

        // 2. Получаем SHA-256 хеш ячейки в виде Int (256 бит)
        let sha256Hash: Int = myCell.hash();
        self.borrowBalance.set(sha256Hash, msg.balance);
    }

    receive(msg: Repay) {
        let myCell: Cell = beginCell()
            .storeAddress(sender())
            .storeUint(msg.id, 32) // укажите нужную битность для вашего Int (например, 257)
            .endCell();
        // 2. Получаем SHA-256 хеш ячейки в виде Int (256 бит)
        let sha256Hash: Int = myCell.hash();
        let poolBalance: Int = self.borrowBalance.get(sha256Hash)!!;
        let sum: Int = (context().value * 110) / 104;
        let comeback: Int = sum - ((sum * 10) / 11);
        let income: Int = ((sum - comeback) * 4) / 10; // доход в TON
        self.acc = self.acc + ((income * SCALE) / poolBalance) / 10;
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
        let userAddress: Address = login(msg.sender!!, self.app, null);
        send(SendParameters {
            to: userAddress,
            value: ton("0.05"),
            body: ChangeVal {
                val: 3,
                newVal: data,
                initiator: msg.sender!!,
            }.toCell(),
        });
    }

    receive(msg: UpdateEarn) {
        let data2: Cell = beginCell()
            .storeUint(0, 2)
            .storeUint(self.id, 32)
            .storeUint(self.v, 32)
            .storeCoins(self.acc)
            .endCell();
        let address: Address = login(msg.sender, self.app, null);
        updateFunc(address, data2, 5, msg.sender);
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
    borrowBalance: map<Int, Int as coins>;
    debtId: Int as uint256;

    init(id: Int, app: Address) {
        self.id = id;
        self.debtId = 0;
        self.name = "";
        self.maxTime = 0;
        self.app = app;
        self.freezed = 0;
        self.acc = 0;
        self.v = 0;
        self.borrowBalance = emptyMap();
    }

    receive(msg: Overdue) {
        let myCell: Cell = beginCell()
            .storeAddress(msg.address)
            .storeUint(msg.id, 32) // укажите нужную битность для вашего Int (например, 257)
            .endCell();
        // 2. Получаем SHA-256 хеш ячейки в виде Int (256 бит)
        let sha256Hash: Int = myCell.hash();
        let balanceDebt: Int = self.borrowBalance.get(sha256Hash)!!;
        self.fcc = self.fcc + ((msg.sum * SCALE) / balanceDebt);
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

    receive(msg: Approve) {
        let userAddress = login(msg.sender!!, self.app, null);
        send(SendParameters {
            to: userAddress,
            value: 0,
            mode: SendRemainingValue,
            body: Approve {
                id: msg.id,
                user: msg.user,
                sender: msg.sender,
                balance: myBalance(),
            }.toCell(),
        });
    }

    receive(msg: Decline) {
        let userAddress = login(msg.sender!!, self.app, null);
        send(SendParameters {
            to: userAddress,
            value: 0,
            mode: SendRemainingValue,
            body: Decline {
                id: msg.id,
                user: msg.user,
                sender: msg.sender,
                balance: myBalance(),
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
            code: init.code,
            data: init.data,
        });
    }

    receive(msg: Borrow) {
        require(sender() == self.app, "Not enought rights");
        require(myBalance() - (msg.amount + self.freezed) >= 0, "Not enought funds");
        // 11 * 10^9 / 24
        let sum_freeze: Int = msg.amount + ((msg.amount * 10) / 100);
        self.fcc = self.fcc + ((sum_freeze * SCALE) / myBalance());
        self.freezed = self.freezed + sum_freeze;
        self.v = self.v + 1;
        let init: StateInit = initOf BorrowPool(msg.idBorrow, self.app);
        let childAddress: Address = contractAddress(init);
        let sum: Int = context().value;
        //self.borrowBalance.set(self.debtId, myBalance());
        send(SendParameters {
            to: childAddress,
            value: sum,
            mode: SendIgnoreErrors,
            body: Borrow { idBorrow: msg.idBorrow, idComp: msg.idComp, amount: msg.amount, to: msg.to, time: self.maxTime, fcc: (msg.amount * SCALE) / myBalance(), balanceComp: myBalance(), balanceBorrow: msg.balanceBorrow }.toCell(), // Тело сообщения
        });
    }

    receive(msg: ChangeBorrow) {
        let myCell: Cell = beginCell()
            .storeAddress(sender())
            .storeUint(msg.id, 32) // укажите нужную битность для вашего Int (например, 257)
            .endCell();

        // 2. Получаем SHA-256 хеш ячейки в виде Int (256 бит)
        let sha256Hash: Int = myCell.hash();
        self.borrowBalance.set(sha256Hash, msg.balance);
    }

    receive (msg: InitCompensationPool) {
        require(sender() == self.app, "Not enough rights!");
        self.name = msg.name;
        self.maxTime = msg.maxTime;
    }

    receive() {}

    receive(msg: Repay) {
        let sum: Int = context().value;
        let myCell: Cell = beginCell()
            .storeAddress(sender())
            .storeUint(msg.id, 32) // укажите нужную битность для вашего Int (например, 257)
            .endCell();
        // 2. Получаем SHA-256 хеш ячейки в виде Int (256 бит)
        let sha256Hash: Int = myCell.hash();
        let balanceDebt: Int = self.borrowBalance.get(sha256Hash)!!;
        sum = sum * SCALE;
        // Сейчас здесь примерно 0,6 * 10^9 / 0.6 = 10^9
        let comission: Int = (context().value * SCALE) / ton("0.6");
        // В скобках примерно 1 / 0.1 = 10^10
        let debtSum: Int = ((comission * SCALE) / ton("0.1")) + comission;
        // В скобках 10 * 10^9 / 24
        self.fcc -= (debtSum * SCALE) / balanceDebt;
        self.borrowBalance.set(sha256Hash, null);
        self.acc += sum / balanceDebt;
        self.freezed = self.freezed - debtSum;
        self.v = self.v + 1;
    }

    receive(msg: Update) {
        let data2: Cell = beginCell()
            .storeUint(self.id, 32)
            .storeUint(self.v, 32)
            .storeUint(self.fcc, 64)
            .endCell();
        let address: Address = login(msg.sender, self.app, null);
        updateFunc(address, data2, 6, msg.sender);
    }

    receive(msg: UpdateEarn) {
        let data2: Cell = beginCell()
            .storeUint(1, 2)
            .storeUint(self.id, 32)
            .storeUint(self.v, 32)
            .storeCoins(self.acc)
            .endCell();
        let address: Address = login(msg.sender, self.app, null);
        updateFunc(address, data2, 5, msg.sender);
    }

    receive(msg: DepositToComp) {
        require(sender() == self.app, "Not enough rights!");
        let balance = context().value;
        let data: Cell = beginCell()
            .storeAddress(myAddress()) // первое число
            .storeCoins(context().value - ton("0.05"))
            .endCell();
        let userAddress: Address = login(msg.sender!!, self.app, null);
        send(SendParameters {
            to: userAddress,
            value: ton("0.05"),
            body: ChangeVal {
                val: 3,
                newVal: data,
                initiator: msg.sender!!,
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

    get fun fcc(): Int { return self.fcc }
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

    // READY 1
    receive(msg: Login) {
        require(context().value > ton("0.05"), "Insufficient funds for deploy");
        login(sender(), myAddress(), 1);
        cashback(sender());
    }

    //READY 1
    receive(msg: Borrow) {
        require(context().value >= ton("0.05"), "Insufficient funds for deploy");
        let initComp: StateInit = initOf CompensationPool(msg.idComp, myAddress());
        let comppoolAddress: Address = contractAddress(initComp);
        send(SendParameters {
            to: comppoolAddress,
            value: 0,
            mode: SendRemainingValue,
            body: Borrow { idBorrow: msg.idBorrow, idComp: msg.idComp, amount: msg.amount, to: sender(), time: 0, fcc: msg.fcc, balanceComp: msg.balanceComp, balanceBorrow: msg.balanceBorrow }.toCell(), // Тело сообщения
        });
    }

    // Работа с BorrowPool
    // Ready
    receive(msg: CreateBorrowPool) {
        let id: Int = self.nowId;
        self.nowId = self.nowId + 1;
        let balance: Int = context().value;
        // 1. Получаем инициализационные данные (код и начальный стейт)
        let init: StateInit = initOf BorrowPool(id, myAddress());
        // 2. Вычисляем адрес будущего контракта
        let borrowpoolAddress: Address = contractAddress(init);
        require(balance - ton("0.1") > 0, "Insufficient funds for deploy");
        let userAddress: Address = login(sender(), myAddress(), null);
        let data: Cell = beginCell()
            .storeAddress(borrowpoolAddress) // первое число
            .storeCoins(balance - ton("0.06"))
            .endCell();
        send(SendParameters {
            to: userAddress,
            value: ton("0.05"),
            body: ChangeVal {
                val: 3,
                newVal: data,
                initiator: sender(),
            }.toCell(),
        });
        balance = balance - ton("0.06");
        send(SendParameters {
            to: borrowpoolAddress,
            value: balance,
            code: init.code,
            data: init.data,
            body: InitBorrowPool { name: msg.name, maxTime: msg.maxTime }.toCell(), // Тело сообщения
        });
    }

    // Ready
    receive(msg: Withdraw) {
        require(context().value >= ton("0.075"), "Not enought funs!");
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
        send(SendParameters {
            to: userAddress,
            value: ton("0.05"),
            body: Withdraw {
                from: msg.from,
                from2: childAddress,
                amount: msg.amount,
                to1: sender(),
            }.toCell(),
        });
    }

    // Ready
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
        let balance = context().value - ton("0.1");
        send(SendParameters {
            to: childAddress,
            value: balance,
            body: Deposit {
                id: msg.id,
                sender: sender(),
            }.toCell(),
        });
    }

    // Работа с CompensationPool
    // Ready
    receive(msg: CreateCompensationPool) {
        let id: Int = self.nowId;
        self.nowId = self.nowId + 1;
        let balance: Int = context().value;
        // 1. Получаем инициализационные данные (код и начальный стейт)
        let init: StateInit = initOf CompensationPool(id, myAddress());
        // 2. Вычисляем адрес будущего контракта
        let compensationpoolAddress: Address = contractAddress(init);
        require(balance - ton("0.1") > 0, "Insufficient funds for deploy");
        let userAddress: Address = login(sender(), myAddress(), null);
        let data: Cell = beginCell()
            .storeAddress(compensationpoolAddress) // первое число
            .storeCoins(balance - ton("0.1"))
            .endCell();
        send(SendParameters {
            to: userAddress,
            value: ton("0.05"),
            body: ChangeVal {
                val: 3,
                newVal: data,
                initiator: sender(),
            }.toCell(),
        });
        balance = balance - ton("0.1");
        send(SendParameters {
            to: compensationpoolAddress,
            value: balance,
            code: init.code,
            data: init.data,
            body: InitCompensationPool { name: msg.name, maxTime: msg.maxTime }.toCell(), // Тело сообщения
        });
    }

    // Ready
    receive(msg: WithdrawFromComp) {
        require(context().value > ton("0.1"), "Infuccient funds!");
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
            value: ton("0.05"),
            body: Withdraw {
                from: msg.from,
                from2: childAddress,
                amount: msg.amount,
                to1: sender(),
            }.toCell(),
        });
    }

    // Ready
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
        require(amountToSend - ton("0.1") > 0, "Not enough TON sent");
        amountToSend = amountToSend - ton("0.1");
        send(SendParameters {
            to: childAddress,
            value: amountToSend,
            body: DepositToComp {
                id: msg.id,
                sender: sender(),
            }.toCell(),
        });
    }

    // Ready
    receive(msg: Request) {
        require(context().value - ton("0.1") >= 0, "Not enought funds!");
        let userAddress: Address = login(sender(), myAddress(), null);
        let init: StateInit = initOf CompensationPool(msg.id, myAddress());
        let childAddress: Address = contractAddress(init);
        send(SendParameters {
            to: childAddress,
            value: ton("0.1"),
            body: Request {
                id: msg.id,
                user: userAddress,
            }.toCell(),
        });
    }

    // Ready
    receive(msg: Approve) {
        require(context().value - ton("0.1") >= 0, "Not enought funds!");
        let userAddress: Address = login(msg.user!!, myAddress(), null);
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
            body: Approve {
                id: msg.id,
                user: userAddress,
                sender: sender(),
                balance: ton("0"),
            }.toCell(),
        });
    }

    // Ready
    receive(msg: Decline) {
        require(context().value - ton("0.1") >= 0, "Not enought funds!");
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
                sender: sender(),
                balance: ton("0"),
            }.toCell(),
        });
    }

    // Repay
    receive(msg: Repay) {
        let userAddress: Address = login(sender(), myAddress(), null);
        send(SendParameters {
            to: userAddress,
            value: 0, // Ставим 0, так как реальную сумму определит флаг ниже
            mode: SendRemainingValue,
            body: Repay {
                id: msg.id,
            }.toCell(),
        });
    }

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
// ФРОНТЕНД
// Исправить комиссию
