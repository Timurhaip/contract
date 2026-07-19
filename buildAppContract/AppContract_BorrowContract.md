# Tact compilation report
Contract: BorrowContract
BoC Size: 946 bytes

## Structures (Structs and Messages)
Total structures: 49

### DataSize
TL-B: `_ cells:int257 bits:int257 refs:int257 = DataSize`
Signature: `DataSize{cells:int257,bits:int257,refs:int257}`

### SignedBundle
TL-B: `_ signature:fixed_bytes64 signedData:remainder<slice> = SignedBundle`
Signature: `SignedBundle{signature:fixed_bytes64,signedData:remainder<slice>}`

### StateInit
TL-B: `_ code:^cell data:^cell = StateInit`
Signature: `StateInit{code:^cell,data:^cell}`

### Context
TL-B: `_ bounceable:bool sender:address value:int257 raw:^slice = Context`
Signature: `Context{bounceable:bool,sender:address,value:int257,raw:^slice}`

### SendParameters
TL-B: `_ mode:int257 body:Maybe ^cell code:Maybe ^cell data:Maybe ^cell value:int257 to:address bounce:bool = SendParameters`
Signature: `SendParameters{mode:int257,body:Maybe ^cell,code:Maybe ^cell,data:Maybe ^cell,value:int257,to:address,bounce:bool}`

### MessageParameters
TL-B: `_ mode:int257 body:Maybe ^cell value:int257 to:address bounce:bool = MessageParameters`
Signature: `MessageParameters{mode:int257,body:Maybe ^cell,value:int257,to:address,bounce:bool}`

### DeployParameters
TL-B: `_ mode:int257 body:Maybe ^cell value:int257 bounce:bool init:StateInit{code:^cell,data:^cell} = DeployParameters`
Signature: `DeployParameters{mode:int257,body:Maybe ^cell,value:int257,bounce:bool,init:StateInit{code:^cell,data:^cell}}`

### StdAddress
TL-B: `_ workchain:int8 address:uint256 = StdAddress`
Signature: `StdAddress{workchain:int8,address:uint256}`

### VarAddress
TL-B: `_ workchain:int32 address:^slice = VarAddress`
Signature: `VarAddress{workchain:int32,address:^slice}`

### BasechainAddress
TL-B: `_ hash:Maybe int257 = BasechainAddress`
Signature: `BasechainAddress{hash:Maybe int257}`

### Deploy
TL-B: `deploy#946a98b6 queryId:uint64 = Deploy`
Signature: `Deploy{queryId:uint64}`

### DeployOk
TL-B: `deploy_ok#aff90f57 queryId:uint64 = DeployOk`
Signature: `DeployOk{queryId:uint64}`

### FactoryDeploy
TL-B: `factory_deploy#6d0ff13b queryId:uint64 cashback:address = FactoryDeploy`
Signature: `FactoryDeploy{queryId:uint64,cashback:address}`

### AddTelegramId
TL-B: `add_telegram_id#688f23fb id:uint256 = AddTelegramId`
Signature: `AddTelegramId{id:uint256}`

### ChangeVal
TL-B: `change_val#d02d0ac5 val:uint8 newVal:^cell initiator:address = ChangeVal`
Signature: `ChangeVal{val:uint8,newVal:^cell,initiator:address}`

### RequestContract$Data
TL-B: `_ address:address pool:uint256 app:address = RequestContract`
Signature: `RequestContract{address:address,pool:uint256,app:address}`

### BorrowContract$Data
TL-B: `_ id:uint32 address:address createdTime:uint32 pool:uint256 sum:coins app:address endTime:uint64 = BorrowContract`
Signature: `BorrowContract{id:uint32,address:address,createdTime:uint32,pool:uint256,sum:coins,app:address,endTime:uint64}`

### User$Data
TL-B: `_ addressUser:address rating:int257 app:address debts:dict<uint32, ^Debt{sum:coins,timetoreturn:uint32,borrowPool:uint256,compPool:uint256,commision:coins,fcc:coins}> investedIn:dict<address, ^CompPoolData{v:uint32,freezed:coins,address:address,balance:coins,earnCoff:uint64,freezeCoff:uint64,balanceUserAfter:coins}> compensationPools:dict<uint256, address> debtId:uint32 isDeployed:bool = User`
Signature: `User{addressUser:address,rating:int257,app:address,debts:dict<uint32, ^Debt{sum:coins,timetoreturn:uint32,borrowPool:uint256,compPool:uint256,commision:coins,fcc:coins}>,investedIn:dict<address, ^CompPoolData{v:uint32,freezed:coins,address:address,balance:coins,earnCoff:uint64,freezeCoff:uint64,balanceUserAfter:coins}>,compensationPools:dict<uint256, address>,debtId:uint32,isDeployed:bool}`

### ExternalLogin
TL-B: `external_login#d4da92b1 serverSignature:^cell payload:^cell = ExternalLogin`
Signature: `ExternalLogin{serverSignature:^cell,payload:^cell}`

### ExternalRequest
TL-B: `external_request#2ce4c0f9 pubkey:uint256 signature:^slice payload:^cell = ExternalRequest`
Signature: `ExternalRequest{pubkey:uint256,signature:^slice,payload:^cell}`

### ExternalBorrow
TL-B: `external_borrow#157415ef pubkey:uint256 signature:^slice payload:^cell = ExternalBorrow`
Signature: `ExternalBorrow{pubkey:uint256,signature:^slice,payload:^cell}`

### Overdue
TL-B: `overdue#d3c8679f address:address sum:coins id:uint32 = Overdue`
Signature: `Overdue{address:address,sum:coins,id:uint32}`

### ChangeBorrow
TL-B: `change_borrow#d89d45f3 balance:coins id:uint32 = ChangeBorrow`
Signature: `ChangeBorrow{balance:coins,id:uint32}`

### Time
TL-B: `time#a6872347 address:address id:uint16 pool:uint16 = Time`
Signature: `Time{address:address,id:uint16,pool:uint16}`

### Changesum
TL-B: `changesum#030514b1 sum:coins = Changesum`
Signature: `Changesum{sum:coins}`

### Borrow
TL-B: `borrow#1d37ca59 idBorrow:uint64 idComp:uint64 amount:coins time:Maybe uint32 to:address fcc:coins balanceComp:coins balanceBorrow:coins = Borrow`
Signature: `Borrow{idBorrow:uint64,idComp:uint64,amount:coins,time:Maybe uint32,to:address,fcc:coins,balanceComp:coins,balanceBorrow:coins}`

### InitBorrow
TL-B: `init_borrow#69c9e7e5 endTime:uint32 sum:coins = InitBorrow`
Signature: `InitBorrow{endTime:uint32,sum:coins}`

### CheckTime
TL-B: `check_time#0fd66c7c  = CheckTime`
Signature: `CheckTime{}`

### Close
TL-B: `close#b368a678  = Close`
Signature: `Close{}`

### Update
TL-B: `update#9044198f sender:address = Update`
Signature: `Update{sender:address}`

### UpdateEarn
TL-B: `update_earn#22d38d52 sender:address = UpdateEarn`
Signature: `UpdateEarn{sender:address}`

### Repay
TL-B: `repay#68939123 id:uint256 = Repay`
Signature: `Repay{id:uint256}`

### Request
TL-B: `request#52df2fba id:uint256 user:address = Request`
Signature: `Request{id:uint256,user:address}`

### Approve
TL-B: `approve#5f54bbeb id:int257 user:address sender:address balance:coins = Approve`
Signature: `Approve{id:int257,user:address,sender:address,balance:coins}`

### Decline
TL-B: `decline#2cb63203 id:int257 user:address sender:address balance:coins = Decline`
Signature: `Decline{id:int257,user:address,sender:address,balance:coins}`

### Withdraw
TL-B: `withdraw#0abf5c5f from:int257 from2:address amount:coins to1:address = Withdraw`
Signature: `Withdraw{from:int257,from2:address,amount:coins,to1:address}`

### WithdrawFromComp
TL-B: `withdraw_from_comp#c4419947 from:int257 from2:address amount:coins to1:address = WithdrawFromComp`
Signature: `WithdrawFromComp{from:int257,from2:address,amount:coins,to1:address}`

### InitCompensationPool
TL-B: `init_compensation_pool#05ae90f1 name:^string maxTime:uint32 = InitCompensationPool`
Signature: `InitCompensationPool{name:^string,maxTime:uint32}`

### CreateBorrowPool
TL-B: `create_borrow_pool#51757359 name:^string maxTime:uint32 = CreateBorrowPool`
Signature: `CreateBorrowPool{name:^string,maxTime:uint32}`

### CreateCompensationPool
TL-B: `create_compensation_pool#9b407b7d name:^string maxTime:uint32 = CreateCompensationPool`
Signature: `CreateCompensationPool{name:^string,maxTime:uint32}`

### Login
TL-B: `login#5ee94f23  = Login`
Signature: `Login{}`

### Deposit
TL-B: `deposit#1e4758c2 id:uint32 sender:address = Deposit`
Signature: `Deposit{id:uint32,sender:address}`

### DepositToComp
TL-B: `deposit_to_comp#8a6d35fc id:uint32 sender:address = DepositToComp`
Signature: `DepositToComp{id:uint32,sender:address}`

### InitBorrowPool
TL-B: `init_borrow_pool#45273be3 name:^string maxTime:uint32 = InitBorrowPool`
Signature: `InitBorrowPool{name:^string,maxTime:uint32}`

### Debt
TL-B: `_ sum:coins timetoreturn:uint32 borrowPool:uint256 compPool:uint256 commision:coins fcc:coins = Debt`
Signature: `Debt{sum:coins,timetoreturn:uint32,borrowPool:uint256,compPool:uint256,commision:coins,fcc:coins}`

### CompPoolData
TL-B: `_ v:uint32 freezed:coins address:address balance:coins earnCoff:uint64 freezeCoff:uint64 balanceUserAfter:coins = CompPoolData`
Signature: `CompPoolData{v:uint32,freezed:coins,address:address,balance:coins,earnCoff:uint64,freezeCoff:uint64,balanceUserAfter:coins}`

### BorrowPool$Data
TL-B: `_ id:uint32 name:^string maxTime:uint32 app:address acc:coins v:uint32 borrowBalance:dict<int, coins> = BorrowPool`
Signature: `BorrowPool{id:uint32,name:^string,maxTime:uint32,app:address,acc:coins,v:uint32,borrowBalance:dict<int, coins>}`

### CompensationPool$Data
TL-B: `_ id:uint32 name:^string maxTime:uint32 app:address freezed:coins acc:uint32 v:uint32 fcc:coins borrowBalance:dict<int, coins> debtId:uint256 = CompensationPool`
Signature: `CompensationPool{id:uint32,name:^string,maxTime:uint32,app:address,freezed:coins,acc:uint32,v:uint32,fcc:coins,borrowBalance:dict<int, coins>,debtId:uint256}`

### AppContract$Data
TL-B: `_ nowId:uint256 seqno:uint32 serverPublicKey:uint256 = AppContract`
Signature: `AppContract{nowId:uint256,seqno:uint32,serverPublicKey:uint256}`

## Get methods
Total get methods: 0

## Exit codes
* 2: Stack underflow
* 3: Stack overflow
* 4: Integer overflow
* 5: Integer out of expected range
* 6: Invalid opcode
* 7: Type check error
* 8: Cell overflow
* 9: Cell underflow
* 10: Dictionary error
* 11: 'Unknown' error
* 12: Fatal error
* 13: Out of gas error
* 14: Virtualization error
* 32: Action list is invalid
* 33: Action list is too long
* 34: Action is invalid or not supported
* 35: Invalid source address in outbound message
* 36: Invalid destination address in outbound message
* 37: Not enough Toncoin
* 38: Not enough extra currencies
* 39: Outbound message does not fit into a cell after rewriting
* 40: Cannot process a message
* 41: Library reference is null
* 42: Library change action error
* 43: Exceeded maximum number of cells in the library or the maximum depth of the Merkle tree
* 50: Account state size exceeded limits
* 128: Null reference exception
* 129: Invalid serialization prefix
* 130: Invalid incoming message
* 131: Constraints error
* 132: Access denied
* 133: Contract stopped
* 134: Invalid argument
* 135: Code of a contract was not found
* 136: Invalid standard address
* 138: Not a basechain address
* 7997: You cant approve yourself
* 8610:
* 10453: You cant decline yourself
* 14711: Not enought rights
* 17654: Invalid seqno
* 19281: Infuccient funds!
* 28284: Not enough TON sent
* 30382: You must obtain permission from this Compensation Pool.
* 37146: Insufficient rights!
* 38055: Invalid user signature
* 40092: Not enought funds
* 40420: Not enought rights!
* 41253: Not enought funs!
* 42972: Not enough rights
* 44371: Invalid server signature
* 46421: value not found
* 48401: Invalid signature
* 55621: Your rating only allows you to take less than 2
* 56619: Insufficient funds for deploy
* 56672: You dont have enought rights in this pool
* 57255: Not enough rights!
* 63522: Not enought funds!

## Trait inheritance diagram

```mermaid
graph TD
BorrowContract
BorrowContract --> BaseTrait
BorrowContract --> Deployable
Deployable --> BaseTrait
```

## Contract dependency diagram

```mermaid
graph TD
BorrowContract
BorrowContract --> CompensationPool
CompensationPool --> RequestContract
RequestContract --> User
User --> CompensationPool
CompensationPool --> BorrowPool
BorrowPool --> CompensationPool
CompensationPool --> User
User --> RequestContract
RequestContract --> CompensationPool
CompensationPool --> BorrowContract
BorrowContract --> RequestContract
RequestContract --> BorrowPool
BorrowPool --> User
User --> BorrowContract
BorrowContract --> User
User --> BorrowPool
BorrowPool --> RequestContract
RequestContract --> BorrowContract
BorrowContract --> BorrowPool
BorrowPool --> BorrowContract
```