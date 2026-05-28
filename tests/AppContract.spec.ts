import { Blockchain, SandboxContract, TreasuryContract } from '@ton/sandbox';
import { address, toNano, Address, Dictionary } from '@ton/core';
import { AppContract } from '../build/AppContract/AppContract_AppContract';
import { CompensationPool } from '../build/CompensationPool/CompensationPool_CompensationPool';
import { BorrowPool } from '../build/BorrowPools/BorrowPool_BorrowPool';
import '@ton/test-utils';
import { emptyPath } from '@tact-lang/compiler';

describe('AppContract', () => {
    let blockchain: Blockchain;
    let deployer: SandboxContract<TreasuryContract>;
    let appContract: SandboxContract<AppContract>;

    beforeAll(async () => {
        blockchain = await Blockchain.create();

        appContract = blockchain.openContract(await AppContract.fromInit());

        deployer = await blockchain.treasury('deployer');

        const deployResult = await appContract.send(
            deployer.getSender(),
            {
                value: toNano('0.05'),
            },
            null,
        );

        expect(deployResult.transactions).toHaveTransaction({
            from: deployer.address,
            to: appContract.address,
            deploy: true,
            success: true,
        });
    });

    it('should deploy', async () => {
        // the check is done inside beforeEach
        // blockchain and appContract are ready to use
    });

    it('should work login', async () => {

        const increaser = await blockchain.treasury('increaser');
        const increaseResult = await appContract.send(
            increaser.getSender(),
            {
                value: toNano('0.1'),
            },
            {
                $$type: 'Login'
            }
        );

        expect(increaseResult.transactions).toHaveTransaction({
            from: increaser.address,
            to: appContract.address,
            success: true,
        });
        for (const tx of increaseResult.transactions) {
            // Печатаем кто вызвал, кто получил и какой результат
            const from = tx.inMessage?.info.src;
            const to = tx.inMessage?.info.dest;

            if (tx.description.type === 'generic') {
                const exitCode = tx.description.computePhase.type === 'vm'
                    ? tx.description.computePhase.exitCode
                    : 'no-vm';

                console.log(`From: ${from} -> To: ${to} | Exit Code: ${exitCode}`);

                // Если был bounce, посмотрим почему
                if (tx.description.actionPhase?.success === false) {
                    console.log(`Action Phase Error: ${tx.description.actionPhase.resultCode}`);
                }
            }
        }
        console.log(increaseResult.events)
    }
    );
    it('should create borrow pool', async () => {

        const increaser = await blockchain.treasury('increaser');

        const increaseResult = await appContract.send(
            increaser.getSender(),
            {
                value: toNano('5'),
            },
            {
                $$type: 'CreateBorrowPool',
                name: "Я лизал пизду Лерке",
                maxTime: 1n
            }
        );
        // console.log(increaseResult.events)
        expect(increaseResult.transactions).toHaveTransaction({
            from: increaser.address,
            to: appContract.address,
            success: true,
        });
    });
    it('should create comp pool', async () => {

        const increaser = await blockchain.treasury('increaser');

        const increaseResult = await appContract.send(
            increaser.getSender(),
            {
                value: toNano('5'),
            },
            {
                $$type: 'CreateCompensationPool',
                name: "Я лизал пизду Лерке",
                maxTime: 1n
            }
        );
        expect(increaseResult.transactions).toHaveTransaction({
            from: increaser.address,
            to: appContract.address,
            success: true,
        });
    });
    it('should deposit tokens to borrow pool', async () => {

        const increaser = await blockchain.treasury('increaser');

        const counterBefore = await appContract.getBorrowPools(1n);

        console.log('usersdat before change', counterBefore);

        const increaseResult = await appContract.send(
            increaser.getSender(),
            {
                value: toNano('20'),
            },
            {
                $$type: 'Deposit',
                id: 1n,
                sender: null
            }
        );
        let compAddress = await appContract.getBorrowPools(1n);
        let comp = blockchain.openContract(BorrowPool.fromAddress(compAddress))
        console.log(await comp.getBalance())
    });
    it('should deposit tokens to comp pool', async () => {

        const increaser = await blockchain.treasury('increaser');

        const increaseResult = await appContract.send(
            increaser.getSender(),
            {
                value: toNano('20'),
            },
            {
                $$type: 'DepositToComp',
                id: 2n,
                sender: null
            }
        );
        console.log(increaseResult.events)
        for (const tx of increaseResult.transactions) {
            // Печатаем кто вызвал, кто получил и какой результат
            const from = tx.inMessage?.info.src;
            const to = tx.inMessage?.info.dest;

            if (tx.description.type === 'generic') {
                const exitCode = tx.description.computePhase.type === 'vm'
                    ? tx.description.computePhase.exitCode
                    : 'no-vm';

                console.log(`From: ${from} -> To: ${to} | Exit Code: ${exitCode}`);

                // Если был bounce, посмотрим почему
                if (tx.description.actionPhase?.success === false) {
                    console.log(`Action Phase Error: ${tx.description.actionPhase.resultCode}`);
                }
            }
        }
        let compAddress = await appContract.getCompPools(2n);
        let comp = blockchain.openContract(CompensationPool.fromAddress(compAddress))
        console.log(await comp.getBalance())
    });
    it('should withdraw tokens from borrow pool', async () => {

        const increaser = await blockchain.treasury('increaser');

        const increaseResult = await appContract.send(
            increaser.getSender(),
            {
                value: toNano('0.15'),
            },
            {
                $$type: 'Withdraw',
                from: 1n,
                amount: toNano("1"),
                from2: null,
                to1: null
            }
        );
    });
    it('should withdraw tokens from comp pool', async () => {

        const increaser = await blockchain.treasury('increaser');

        const increaseResult = await appContract.send(
            increaser.getSender(),
            {
                value: toNano('0.12'),
            },
            {
                $$type: 'WithdrawFromComp',
                from: 2n,
                amount: toNano("1"),
                from2: null,
                to1: null
            }
        );
        let compAddress = await appContract.getCompPools(2n);
        let comp = blockchain.openContract(CompensationPool.fromAddress(compAddress))
        console.log(await comp.getBalance())


    });
    it('should create request', async () => {

        const increaser = await blockchain.treasury('increaser');

        const increaseResult = await appContract.send(
            increaser.getSender(),
            {
                value: toNano('0.2'),
            },
            {
                $$type: 'Request',
                id: 2n,
                user: null
            }
        );
        //console.log(increaseResult.events)
        let compAddress = await appContract.getCompPools(2n);
        let comp = blockchain.openContract(CompensationPool.fromAddress(compAddress))
        console.log(await comp.getBalance())


    });
    it('should approve request', async () => {

        const increaser = await blockchain.treasury('increaser');

        const increaseResult = await appContract.send(
            increaser.getSender(),
            {
                value: toNano('0.2'),
            },
            {
                $$type: 'Approve',
                id: 2n,
                user: null
            }
        );
        // console.log(increaseResult.events)
        let compAddress = await appContract.getCompPools(2n);
        let comp = blockchain.openContract(CompensationPool.fromAddress(compAddress))
        console.log(await comp.getBalance())


    });
    it('should borrow', async () => {
        const increaser = await blockchain.treasury('increaser');
        let address = await appContract.getBorrowPools(1n);
        console.log(address);
        console.log(await increaser.getBalance())
        const increaseResult = await appContract.send(
            increaser.getSender(),
            {
                value: toNano('0.2'),
            },
            {
                $$type: 'Borrow',
                idBorrow: 1n,
                idComp: 2n,
                amount: toNano("2"),
                time: null,
                to: null,
                fcc: 0n
            }
        );
        for (const tx of increaseResult.transactions) {
            // Печатаем кто вызвал, кто получил и какой результат
            const from = tx.inMessage?.info.src;
            const to = tx.inMessage?.info.dest;

            if (tx.description.type === 'generic') {
                const exitCode = tx.description.computePhase.type === 'vm'
                    ? tx.description.computePhase.exitCode
                    : 'no-vm';

                console.log(`From: ${from} -> To: ${to} | Exit Code: ${exitCode}`);

                // Если был bounce, посмотрим почему
                if (tx.description.actionPhase?.success === false) {
                    console.log(`Action Phase Error: ${tx.description.actionPhase.resultCode}`);
                }
            }
        }
        console.log(increaseResult.events)
        console.log(await increaser.getBalance())
        let compAddress = await appContract.getCompPools(2n);
        let comp = blockchain.openContract(CompensationPool.fromAddress(compAddress))
        console.log(await comp.getBalance())


    });
    it('should repay', async () => {
        const increaser = await blockchain.treasury('increaser');
        let borrowAddress1 = await appContract.getBorrowPools(1n);
        let bor1 = blockchain.openContract(BorrowPool.fromAddress(borrowAddress1))
        console.log(await bor1.getBalance())
        console.log(await increaser.getBalance(), "REPAYING")
        const increaseResult = await appContract.send(
            increaser.getSender(),
            {
                value: toNano('10'),
            },
            {
                $$type: 'Repay',
                id: 1n,
            }
        );
        console.log(increaseResult.events)
        console.log(await increaser.getBalance())
        let compAddress = await appContract.getCompPools(2n);
        let comp = blockchain.openContract(CompensationPool.fromAddress(compAddress))
        console.log(await comp.getBalance())
        let borrowAddress = await appContract.getBorrowPools(1n);
        let bor = blockchain.openContract(BorrowPool.fromAddress(borrowAddress))
        console.log(await bor.getBalance())
    });
    it('should repay if not repayed', async () => {
        const increaser = await blockchain.treasury('increaser');
        let compAddress1 = await appContract.getCompPools(2n);
        let comp1 = blockchain.openContract(CompensationPool.fromAddress(compAddress1))
        console.log(await comp1.getBalance())
        let borrowAddress = await appContract.getBorrowPools(1n);
        let bor = blockchain.openContract(BorrowPool.fromAddress(borrowAddress))
        console.log(await bor.getBalance())
        await setTimeout(() => { }, 60000)
        const increaseResult = await appContract.send(
            increaser.getSender(),
            {
                value: toNano('0.2'),
            },
            {
                $$type: 'Time',
                address: increaser.address,
                id: 1n,
                pool: 2n

            });
        console.log(increaseResult.events)
        for (const tx of increaseResult.transactions) {
            // Печатаем кто вызвал, кто получил и какой результат
            const from = tx.inMessage?.info.src;
            const to = tx.inMessage?.info.dest;

            if (tx.description.type === 'generic') {
                const exitCode = tx.description.computePhase.type === 'vm'
                    ? tx.description.computePhase.exitCode
                    : 'no-vm';

                console.log(`From: ${from} -> To: ${to} | Exit Code: ${exitCode}`);

                // Если был bounce, посмотрим почему
                if (tx.description.actionPhase?.success === false) {
                    console.log(`Action Phase Error: ${tx.description.actionPhase.resultCode}`);
                }
            }
        }
        let compAddress = await appContract.getCompPools(2n);
        let comp = blockchain.openContract(CompensationPool.fromAddress(compAddress))
        console.log(await comp.getBalance())
        console.log(await bor.getBalance())


    });
});