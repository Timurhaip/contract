import {
    Cell,
    Slice,
    Address,
    Builder,
    beginCell,
    ComputeError,
    TupleItem,
    TupleReader,
    Dictionary,
    contractAddress,
    address,
    ContractProvider,
    Sender,
    Contract,
    ContractABI,
    ABIType,
    ABIGetter,
    ABIReceiver,
    TupleBuilder,
    DictionaryValue
} from '@ton/core';

export type DataSize = {
    $$type: 'DataSize';
    cells: bigint;
    bits: bigint;
    refs: bigint;
}

export function storeDataSize(src: DataSize) {
    return (builder: Builder) => {
        const b_0 = builder;
        b_0.storeInt(src.cells, 257);
        b_0.storeInt(src.bits, 257);
        b_0.storeInt(src.refs, 257);
    };
}

export function loadDataSize(slice: Slice) {
    const sc_0 = slice;
    const _cells = sc_0.loadIntBig(257);
    const _bits = sc_0.loadIntBig(257);
    const _refs = sc_0.loadIntBig(257);
    return { $$type: 'DataSize' as const, cells: _cells, bits: _bits, refs: _refs };
}

export function loadTupleDataSize(source: TupleReader) {
    const _cells = source.readBigNumber();
    const _bits = source.readBigNumber();
    const _refs = source.readBigNumber();
    return { $$type: 'DataSize' as const, cells: _cells, bits: _bits, refs: _refs };
}

export function loadGetterTupleDataSize(source: TupleReader) {
    const _cells = source.readBigNumber();
    const _bits = source.readBigNumber();
    const _refs = source.readBigNumber();
    return { $$type: 'DataSize' as const, cells: _cells, bits: _bits, refs: _refs };
}

export function storeTupleDataSize(source: DataSize) {
    const builder = new TupleBuilder();
    builder.writeNumber(source.cells);
    builder.writeNumber(source.bits);
    builder.writeNumber(source.refs);
    return builder.build();
}

export function dictValueParserDataSize(): DictionaryValue<DataSize> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeDataSize(src)).endCell());
        },
        parse: (src) => {
            return loadDataSize(src.loadRef().beginParse());
        }
    }
}

export type SignedBundle = {
    $$type: 'SignedBundle';
    signature: Buffer;
    signedData: Slice;
}

export function storeSignedBundle(src: SignedBundle) {
    return (builder: Builder) => {
        const b_0 = builder;
        b_0.storeBuffer(src.signature);
        b_0.storeBuilder(src.signedData.asBuilder());
    };
}

export function loadSignedBundle(slice: Slice) {
    const sc_0 = slice;
    const _signature = sc_0.loadBuffer(64);
    const _signedData = sc_0;
    return { $$type: 'SignedBundle' as const, signature: _signature, signedData: _signedData };
}

export function loadTupleSignedBundle(source: TupleReader) {
    const _signature = source.readBuffer();
    const _signedData = source.readCell().asSlice();
    return { $$type: 'SignedBundle' as const, signature: _signature, signedData: _signedData };
}

export function loadGetterTupleSignedBundle(source: TupleReader) {
    const _signature = source.readBuffer();
    const _signedData = source.readCell().asSlice();
    return { $$type: 'SignedBundle' as const, signature: _signature, signedData: _signedData };
}

export function storeTupleSignedBundle(source: SignedBundle) {
    const builder = new TupleBuilder();
    builder.writeBuffer(source.signature);
    builder.writeSlice(source.signedData.asCell());
    return builder.build();
}

export function dictValueParserSignedBundle(): DictionaryValue<SignedBundle> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeSignedBundle(src)).endCell());
        },
        parse: (src) => {
            return loadSignedBundle(src.loadRef().beginParse());
        }
    }
}

export type StateInit = {
    $$type: 'StateInit';
    code: Cell;
    data: Cell;
}

export function storeStateInit(src: StateInit) {
    return (builder: Builder) => {
        const b_0 = builder;
        b_0.storeRef(src.code);
        b_0.storeRef(src.data);
    };
}

export function loadStateInit(slice: Slice) {
    const sc_0 = slice;
    const _code = sc_0.loadRef();
    const _data = sc_0.loadRef();
    return { $$type: 'StateInit' as const, code: _code, data: _data };
}

export function loadTupleStateInit(source: TupleReader) {
    const _code = source.readCell();
    const _data = source.readCell();
    return { $$type: 'StateInit' as const, code: _code, data: _data };
}

export function loadGetterTupleStateInit(source: TupleReader) {
    const _code = source.readCell();
    const _data = source.readCell();
    return { $$type: 'StateInit' as const, code: _code, data: _data };
}

export function storeTupleStateInit(source: StateInit) {
    const builder = new TupleBuilder();
    builder.writeCell(source.code);
    builder.writeCell(source.data);
    return builder.build();
}

export function dictValueParserStateInit(): DictionaryValue<StateInit> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeStateInit(src)).endCell());
        },
        parse: (src) => {
            return loadStateInit(src.loadRef().beginParse());
        }
    }
}

export type Context = {
    $$type: 'Context';
    bounceable: boolean;
    sender: Address;
    value: bigint;
    raw: Slice;
}

export function storeContext(src: Context) {
    return (builder: Builder) => {
        const b_0 = builder;
        b_0.storeBit(src.bounceable);
        b_0.storeAddress(src.sender);
        b_0.storeInt(src.value, 257);
        b_0.storeRef(src.raw.asCell());
    };
}

export function loadContext(slice: Slice) {
    const sc_0 = slice;
    const _bounceable = sc_0.loadBit();
    const _sender = sc_0.loadAddress();
    const _value = sc_0.loadIntBig(257);
    const _raw = sc_0.loadRef().asSlice();
    return { $$type: 'Context' as const, bounceable: _bounceable, sender: _sender, value: _value, raw: _raw };
}

export function loadTupleContext(source: TupleReader) {
    const _bounceable = source.readBoolean();
    const _sender = source.readAddress();
    const _value = source.readBigNumber();
    const _raw = source.readCell().asSlice();
    return { $$type: 'Context' as const, bounceable: _bounceable, sender: _sender, value: _value, raw: _raw };
}

export function loadGetterTupleContext(source: TupleReader) {
    const _bounceable = source.readBoolean();
    const _sender = source.readAddress();
    const _value = source.readBigNumber();
    const _raw = source.readCell().asSlice();
    return { $$type: 'Context' as const, bounceable: _bounceable, sender: _sender, value: _value, raw: _raw };
}

export function storeTupleContext(source: Context) {
    const builder = new TupleBuilder();
    builder.writeBoolean(source.bounceable);
    builder.writeAddress(source.sender);
    builder.writeNumber(source.value);
    builder.writeSlice(source.raw.asCell());
    return builder.build();
}

export function dictValueParserContext(): DictionaryValue<Context> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeContext(src)).endCell());
        },
        parse: (src) => {
            return loadContext(src.loadRef().beginParse());
        }
    }
}

export type SendParameters = {
    $$type: 'SendParameters';
    mode: bigint;
    body: Cell | null;
    code: Cell | null;
    data: Cell | null;
    value: bigint;
    to: Address;
    bounce: boolean;
}

export function storeSendParameters(src: SendParameters) {
    return (builder: Builder) => {
        const b_0 = builder;
        b_0.storeInt(src.mode, 257);
        if (src.body !== null && src.body !== undefined) { b_0.storeBit(true).storeRef(src.body); } else { b_0.storeBit(false); }
        if (src.code !== null && src.code !== undefined) { b_0.storeBit(true).storeRef(src.code); } else { b_0.storeBit(false); }
        if (src.data !== null && src.data !== undefined) { b_0.storeBit(true).storeRef(src.data); } else { b_0.storeBit(false); }
        b_0.storeInt(src.value, 257);
        b_0.storeAddress(src.to);
        b_0.storeBit(src.bounce);
    };
}

export function loadSendParameters(slice: Slice) {
    const sc_0 = slice;
    const _mode = sc_0.loadIntBig(257);
    const _body = sc_0.loadBit() ? sc_0.loadRef() : null;
    const _code = sc_0.loadBit() ? sc_0.loadRef() : null;
    const _data = sc_0.loadBit() ? sc_0.loadRef() : null;
    const _value = sc_0.loadIntBig(257);
    const _to = sc_0.loadAddress();
    const _bounce = sc_0.loadBit();
    return { $$type: 'SendParameters' as const, mode: _mode, body: _body, code: _code, data: _data, value: _value, to: _to, bounce: _bounce };
}

export function loadTupleSendParameters(source: TupleReader) {
    const _mode = source.readBigNumber();
    const _body = source.readCellOpt();
    const _code = source.readCellOpt();
    const _data = source.readCellOpt();
    const _value = source.readBigNumber();
    const _to = source.readAddress();
    const _bounce = source.readBoolean();
    return { $$type: 'SendParameters' as const, mode: _mode, body: _body, code: _code, data: _data, value: _value, to: _to, bounce: _bounce };
}

export function loadGetterTupleSendParameters(source: TupleReader) {
    const _mode = source.readBigNumber();
    const _body = source.readCellOpt();
    const _code = source.readCellOpt();
    const _data = source.readCellOpt();
    const _value = source.readBigNumber();
    const _to = source.readAddress();
    const _bounce = source.readBoolean();
    return { $$type: 'SendParameters' as const, mode: _mode, body: _body, code: _code, data: _data, value: _value, to: _to, bounce: _bounce };
}

export function storeTupleSendParameters(source: SendParameters) {
    const builder = new TupleBuilder();
    builder.writeNumber(source.mode);
    builder.writeCell(source.body);
    builder.writeCell(source.code);
    builder.writeCell(source.data);
    builder.writeNumber(source.value);
    builder.writeAddress(source.to);
    builder.writeBoolean(source.bounce);
    return builder.build();
}

export function dictValueParserSendParameters(): DictionaryValue<SendParameters> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeSendParameters(src)).endCell());
        },
        parse: (src) => {
            return loadSendParameters(src.loadRef().beginParse());
        }
    }
}

export type MessageParameters = {
    $$type: 'MessageParameters';
    mode: bigint;
    body: Cell | null;
    value: bigint;
    to: Address;
    bounce: boolean;
}

export function storeMessageParameters(src: MessageParameters) {
    return (builder: Builder) => {
        const b_0 = builder;
        b_0.storeInt(src.mode, 257);
        if (src.body !== null && src.body !== undefined) { b_0.storeBit(true).storeRef(src.body); } else { b_0.storeBit(false); }
        b_0.storeInt(src.value, 257);
        b_0.storeAddress(src.to);
        b_0.storeBit(src.bounce);
    };
}

export function loadMessageParameters(slice: Slice) {
    const sc_0 = slice;
    const _mode = sc_0.loadIntBig(257);
    const _body = sc_0.loadBit() ? sc_0.loadRef() : null;
    const _value = sc_0.loadIntBig(257);
    const _to = sc_0.loadAddress();
    const _bounce = sc_0.loadBit();
    return { $$type: 'MessageParameters' as const, mode: _mode, body: _body, value: _value, to: _to, bounce: _bounce };
}

export function loadTupleMessageParameters(source: TupleReader) {
    const _mode = source.readBigNumber();
    const _body = source.readCellOpt();
    const _value = source.readBigNumber();
    const _to = source.readAddress();
    const _bounce = source.readBoolean();
    return { $$type: 'MessageParameters' as const, mode: _mode, body: _body, value: _value, to: _to, bounce: _bounce };
}

export function loadGetterTupleMessageParameters(source: TupleReader) {
    const _mode = source.readBigNumber();
    const _body = source.readCellOpt();
    const _value = source.readBigNumber();
    const _to = source.readAddress();
    const _bounce = source.readBoolean();
    return { $$type: 'MessageParameters' as const, mode: _mode, body: _body, value: _value, to: _to, bounce: _bounce };
}

export function storeTupleMessageParameters(source: MessageParameters) {
    const builder = new TupleBuilder();
    builder.writeNumber(source.mode);
    builder.writeCell(source.body);
    builder.writeNumber(source.value);
    builder.writeAddress(source.to);
    builder.writeBoolean(source.bounce);
    return builder.build();
}

export function dictValueParserMessageParameters(): DictionaryValue<MessageParameters> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeMessageParameters(src)).endCell());
        },
        parse: (src) => {
            return loadMessageParameters(src.loadRef().beginParse());
        }
    }
}

export type DeployParameters = {
    $$type: 'DeployParameters';
    mode: bigint;
    body: Cell | null;
    value: bigint;
    bounce: boolean;
    init: StateInit;
}

export function storeDeployParameters(src: DeployParameters) {
    return (builder: Builder) => {
        const b_0 = builder;
        b_0.storeInt(src.mode, 257);
        if (src.body !== null && src.body !== undefined) { b_0.storeBit(true).storeRef(src.body); } else { b_0.storeBit(false); }
        b_0.storeInt(src.value, 257);
        b_0.storeBit(src.bounce);
        b_0.store(storeStateInit(src.init));
    };
}

export function loadDeployParameters(slice: Slice) {
    const sc_0 = slice;
    const _mode = sc_0.loadIntBig(257);
    const _body = sc_0.loadBit() ? sc_0.loadRef() : null;
    const _value = sc_0.loadIntBig(257);
    const _bounce = sc_0.loadBit();
    const _init = loadStateInit(sc_0);
    return { $$type: 'DeployParameters' as const, mode: _mode, body: _body, value: _value, bounce: _bounce, init: _init };
}

export function loadTupleDeployParameters(source: TupleReader) {
    const _mode = source.readBigNumber();
    const _body = source.readCellOpt();
    const _value = source.readBigNumber();
    const _bounce = source.readBoolean();
    const _init = loadTupleStateInit(source);
    return { $$type: 'DeployParameters' as const, mode: _mode, body: _body, value: _value, bounce: _bounce, init: _init };
}

export function loadGetterTupleDeployParameters(source: TupleReader) {
    const _mode = source.readBigNumber();
    const _body = source.readCellOpt();
    const _value = source.readBigNumber();
    const _bounce = source.readBoolean();
    const _init = loadGetterTupleStateInit(source);
    return { $$type: 'DeployParameters' as const, mode: _mode, body: _body, value: _value, bounce: _bounce, init: _init };
}

export function storeTupleDeployParameters(source: DeployParameters) {
    const builder = new TupleBuilder();
    builder.writeNumber(source.mode);
    builder.writeCell(source.body);
    builder.writeNumber(source.value);
    builder.writeBoolean(source.bounce);
    builder.writeTuple(storeTupleStateInit(source.init));
    return builder.build();
}

export function dictValueParserDeployParameters(): DictionaryValue<DeployParameters> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeDeployParameters(src)).endCell());
        },
        parse: (src) => {
            return loadDeployParameters(src.loadRef().beginParse());
        }
    }
}

export type StdAddress = {
    $$type: 'StdAddress';
    workchain: bigint;
    address: bigint;
}

export function storeStdAddress(src: StdAddress) {
    return (builder: Builder) => {
        const b_0 = builder;
        b_0.storeInt(src.workchain, 8);
        b_0.storeUint(src.address, 256);
    };
}

export function loadStdAddress(slice: Slice) {
    const sc_0 = slice;
    const _workchain = sc_0.loadIntBig(8);
    const _address = sc_0.loadUintBig(256);
    return { $$type: 'StdAddress' as const, workchain: _workchain, address: _address };
}

export function loadTupleStdAddress(source: TupleReader) {
    const _workchain = source.readBigNumber();
    const _address = source.readBigNumber();
    return { $$type: 'StdAddress' as const, workchain: _workchain, address: _address };
}

export function loadGetterTupleStdAddress(source: TupleReader) {
    const _workchain = source.readBigNumber();
    const _address = source.readBigNumber();
    return { $$type: 'StdAddress' as const, workchain: _workchain, address: _address };
}

export function storeTupleStdAddress(source: StdAddress) {
    const builder = new TupleBuilder();
    builder.writeNumber(source.workchain);
    builder.writeNumber(source.address);
    return builder.build();
}

export function dictValueParserStdAddress(): DictionaryValue<StdAddress> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeStdAddress(src)).endCell());
        },
        parse: (src) => {
            return loadStdAddress(src.loadRef().beginParse());
        }
    }
}

export type VarAddress = {
    $$type: 'VarAddress';
    workchain: bigint;
    address: Slice;
}

export function storeVarAddress(src: VarAddress) {
    return (builder: Builder) => {
        const b_0 = builder;
        b_0.storeInt(src.workchain, 32);
        b_0.storeRef(src.address.asCell());
    };
}

export function loadVarAddress(slice: Slice) {
    const sc_0 = slice;
    const _workchain = sc_0.loadIntBig(32);
    const _address = sc_0.loadRef().asSlice();
    return { $$type: 'VarAddress' as const, workchain: _workchain, address: _address };
}

export function loadTupleVarAddress(source: TupleReader) {
    const _workchain = source.readBigNumber();
    const _address = source.readCell().asSlice();
    return { $$type: 'VarAddress' as const, workchain: _workchain, address: _address };
}

export function loadGetterTupleVarAddress(source: TupleReader) {
    const _workchain = source.readBigNumber();
    const _address = source.readCell().asSlice();
    return { $$type: 'VarAddress' as const, workchain: _workchain, address: _address };
}

export function storeTupleVarAddress(source: VarAddress) {
    const builder = new TupleBuilder();
    builder.writeNumber(source.workchain);
    builder.writeSlice(source.address.asCell());
    return builder.build();
}

export function dictValueParserVarAddress(): DictionaryValue<VarAddress> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeVarAddress(src)).endCell());
        },
        parse: (src) => {
            return loadVarAddress(src.loadRef().beginParse());
        }
    }
}

export type BasechainAddress = {
    $$type: 'BasechainAddress';
    hash: bigint | null;
}

export function storeBasechainAddress(src: BasechainAddress) {
    return (builder: Builder) => {
        const b_0 = builder;
        if (src.hash !== null && src.hash !== undefined) { b_0.storeBit(true).storeInt(src.hash, 257); } else { b_0.storeBit(false); }
    };
}

export function loadBasechainAddress(slice: Slice) {
    const sc_0 = slice;
    const _hash = sc_0.loadBit() ? sc_0.loadIntBig(257) : null;
    return { $$type: 'BasechainAddress' as const, hash: _hash };
}

export function loadTupleBasechainAddress(source: TupleReader) {
    const _hash = source.readBigNumberOpt();
    return { $$type: 'BasechainAddress' as const, hash: _hash };
}

export function loadGetterTupleBasechainAddress(source: TupleReader) {
    const _hash = source.readBigNumberOpt();
    return { $$type: 'BasechainAddress' as const, hash: _hash };
}

export function storeTupleBasechainAddress(source: BasechainAddress) {
    const builder = new TupleBuilder();
    builder.writeNumber(source.hash);
    return builder.build();
}

export function dictValueParserBasechainAddress(): DictionaryValue<BasechainAddress> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeBasechainAddress(src)).endCell());
        },
        parse: (src) => {
            return loadBasechainAddress(src.loadRef().beginParse());
        }
    }
}

export type Deploy = {
    $$type: 'Deploy';
    queryId: bigint;
}

export function storeDeploy(src: Deploy) {
    return (builder: Builder) => {
        const b_0 = builder;
        b_0.storeUint(2490013878, 32);
        b_0.storeUint(src.queryId, 64);
    };
}

export function loadDeploy(slice: Slice) {
    const sc_0 = slice;
    if (sc_0.loadUint(32) !== 2490013878) { throw Error('Invalid prefix'); }
    const _queryId = sc_0.loadUintBig(64);
    return { $$type: 'Deploy' as const, queryId: _queryId };
}

export function loadTupleDeploy(source: TupleReader) {
    const _queryId = source.readBigNumber();
    return { $$type: 'Deploy' as const, queryId: _queryId };
}

export function loadGetterTupleDeploy(source: TupleReader) {
    const _queryId = source.readBigNumber();
    return { $$type: 'Deploy' as const, queryId: _queryId };
}

export function storeTupleDeploy(source: Deploy) {
    const builder = new TupleBuilder();
    builder.writeNumber(source.queryId);
    return builder.build();
}

export function dictValueParserDeploy(): DictionaryValue<Deploy> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeDeploy(src)).endCell());
        },
        parse: (src) => {
            return loadDeploy(src.loadRef().beginParse());
        }
    }
}

export type DeployOk = {
    $$type: 'DeployOk';
    queryId: bigint;
}

export function storeDeployOk(src: DeployOk) {
    return (builder: Builder) => {
        const b_0 = builder;
        b_0.storeUint(2952335191, 32);
        b_0.storeUint(src.queryId, 64);
    };
}

export function loadDeployOk(slice: Slice) {
    const sc_0 = slice;
    if (sc_0.loadUint(32) !== 2952335191) { throw Error('Invalid prefix'); }
    const _queryId = sc_0.loadUintBig(64);
    return { $$type: 'DeployOk' as const, queryId: _queryId };
}

export function loadTupleDeployOk(source: TupleReader) {
    const _queryId = source.readBigNumber();
    return { $$type: 'DeployOk' as const, queryId: _queryId };
}

export function loadGetterTupleDeployOk(source: TupleReader) {
    const _queryId = source.readBigNumber();
    return { $$type: 'DeployOk' as const, queryId: _queryId };
}

export function storeTupleDeployOk(source: DeployOk) {
    const builder = new TupleBuilder();
    builder.writeNumber(source.queryId);
    return builder.build();
}

export function dictValueParserDeployOk(): DictionaryValue<DeployOk> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeDeployOk(src)).endCell());
        },
        parse: (src) => {
            return loadDeployOk(src.loadRef().beginParse());
        }
    }
}

export type FactoryDeploy = {
    $$type: 'FactoryDeploy';
    queryId: bigint;
    cashback: Address;
}

export function storeFactoryDeploy(src: FactoryDeploy) {
    return (builder: Builder) => {
        const b_0 = builder;
        b_0.storeUint(1829761339, 32);
        b_0.storeUint(src.queryId, 64);
        b_0.storeAddress(src.cashback);
    };
}

export function loadFactoryDeploy(slice: Slice) {
    const sc_0 = slice;
    if (sc_0.loadUint(32) !== 1829761339) { throw Error('Invalid prefix'); }
    const _queryId = sc_0.loadUintBig(64);
    const _cashback = sc_0.loadAddress();
    return { $$type: 'FactoryDeploy' as const, queryId: _queryId, cashback: _cashback };
}

export function loadTupleFactoryDeploy(source: TupleReader) {
    const _queryId = source.readBigNumber();
    const _cashback = source.readAddress();
    return { $$type: 'FactoryDeploy' as const, queryId: _queryId, cashback: _cashback };
}

export function loadGetterTupleFactoryDeploy(source: TupleReader) {
    const _queryId = source.readBigNumber();
    const _cashback = source.readAddress();
    return { $$type: 'FactoryDeploy' as const, queryId: _queryId, cashback: _cashback };
}

export function storeTupleFactoryDeploy(source: FactoryDeploy) {
    const builder = new TupleBuilder();
    builder.writeNumber(source.queryId);
    builder.writeAddress(source.cashback);
    return builder.build();
}

export function dictValueParserFactoryDeploy(): DictionaryValue<FactoryDeploy> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeFactoryDeploy(src)).endCell());
        },
        parse: (src) => {
            return loadFactoryDeploy(src.loadRef().beginParse());
        }
    }
}

export type AddTelegramId = {
    $$type: 'AddTelegramId';
    id: bigint;
}

export function storeAddTelegramId(src: AddTelegramId) {
    return (builder: Builder) => {
        const b_0 = builder;
        b_0.storeUint(1754211323, 32);
        b_0.storeUint(src.id, 256);
    };
}

export function loadAddTelegramId(slice: Slice) {
    const sc_0 = slice;
    if (sc_0.loadUint(32) !== 1754211323) { throw Error('Invalid prefix'); }
    const _id = sc_0.loadUintBig(256);
    return { $$type: 'AddTelegramId' as const, id: _id };
}

export function loadTupleAddTelegramId(source: TupleReader) {
    const _id = source.readBigNumber();
    return { $$type: 'AddTelegramId' as const, id: _id };
}

export function loadGetterTupleAddTelegramId(source: TupleReader) {
    const _id = source.readBigNumber();
    return { $$type: 'AddTelegramId' as const, id: _id };
}

export function storeTupleAddTelegramId(source: AddTelegramId) {
    const builder = new TupleBuilder();
    builder.writeNumber(source.id);
    return builder.build();
}

export function dictValueParserAddTelegramId(): DictionaryValue<AddTelegramId> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeAddTelegramId(src)).endCell());
        },
        parse: (src) => {
            return loadAddTelegramId(src.loadRef().beginParse());
        }
    }
}

export type ChangeVal = {
    $$type: 'ChangeVal';
    val: bigint;
    newVal: Cell;
}

export function storeChangeVal(src: ChangeVal) {
    return (builder: Builder) => {
        const b_0 = builder;
        b_0.storeUint(940018033, 32);
        b_0.storeUint(src.val, 8);
        b_0.storeRef(src.newVal);
    };
}

export function loadChangeVal(slice: Slice) {
    const sc_0 = slice;
    if (sc_0.loadUint(32) !== 940018033) { throw Error('Invalid prefix'); }
    const _val = sc_0.loadUintBig(8);
    const _newVal = sc_0.loadRef();
    return { $$type: 'ChangeVal' as const, val: _val, newVal: _newVal };
}

export function loadTupleChangeVal(source: TupleReader) {
    const _val = source.readBigNumber();
    const _newVal = source.readCell();
    return { $$type: 'ChangeVal' as const, val: _val, newVal: _newVal };
}

export function loadGetterTupleChangeVal(source: TupleReader) {
    const _val = source.readBigNumber();
    const _newVal = source.readCell();
    return { $$type: 'ChangeVal' as const, val: _val, newVal: _newVal };
}

export function storeTupleChangeVal(source: ChangeVal) {
    const builder = new TupleBuilder();
    builder.writeNumber(source.val);
    builder.writeCell(source.newVal);
    return builder.build();
}

export function dictValueParserChangeVal(): DictionaryValue<ChangeVal> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeChangeVal(src)).endCell());
        },
        parse: (src) => {
            return loadChangeVal(src.loadRef().beginParse());
        }
    }
}

export type SendData = {
    $$type: 'SendData';
    val: bigint;
    data: Cell;
}

export function storeSendData(src: SendData) {
    return (builder: Builder) => {
        const b_0 = builder;
        b_0.storeUint(2298462272, 32);
        b_0.storeUint(src.val, 8);
        b_0.storeRef(src.data);
    };
}

export function loadSendData(slice: Slice) {
    const sc_0 = slice;
    if (sc_0.loadUint(32) !== 2298462272) { throw Error('Invalid prefix'); }
    const _val = sc_0.loadUintBig(8);
    const _data = sc_0.loadRef();
    return { $$type: 'SendData' as const, val: _val, data: _data };
}

export function loadTupleSendData(source: TupleReader) {
    const _val = source.readBigNumber();
    const _data = source.readCell();
    return { $$type: 'SendData' as const, val: _val, data: _data };
}

export function loadGetterTupleSendData(source: TupleReader) {
    const _val = source.readBigNumber();
    const _data = source.readCell();
    return { $$type: 'SendData' as const, val: _val, data: _data };
}

export function storeTupleSendData(source: SendData) {
    const builder = new TupleBuilder();
    builder.writeNumber(source.val);
    builder.writeCell(source.data);
    return builder.build();
}

export function dictValueParserSendData(): DictionaryValue<SendData> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeSendData(src)).endCell());
        },
        parse: (src) => {
            return loadSendData(src.loadRef().beginParse());
        }
    }
}

export type RequestContract$Data = {
    $$type: 'RequestContract$Data';
    address: Address;
    pool: bigint;
    app: Address;
}

export function storeRequestContract$Data(src: RequestContract$Data) {
    return (builder: Builder) => {
        const b_0 = builder;
        b_0.storeAddress(src.address);
        b_0.storeUint(src.pool, 256);
        b_0.storeAddress(src.app);
    };
}

export function loadRequestContract$Data(slice: Slice) {
    const sc_0 = slice;
    const _address = sc_0.loadAddress();
    const _pool = sc_0.loadUintBig(256);
    const _app = sc_0.loadAddress();
    return { $$type: 'RequestContract$Data' as const, address: _address, pool: _pool, app: _app };
}

export function loadTupleRequestContract$Data(source: TupleReader) {
    const _address = source.readAddress();
    const _pool = source.readBigNumber();
    const _app = source.readAddress();
    return { $$type: 'RequestContract$Data' as const, address: _address, pool: _pool, app: _app };
}

export function loadGetterTupleRequestContract$Data(source: TupleReader) {
    const _address = source.readAddress();
    const _pool = source.readBigNumber();
    const _app = source.readAddress();
    return { $$type: 'RequestContract$Data' as const, address: _address, pool: _pool, app: _app };
}

export function storeTupleRequestContract$Data(source: RequestContract$Data) {
    const builder = new TupleBuilder();
    builder.writeAddress(source.address);
    builder.writeNumber(source.pool);
    builder.writeAddress(source.app);
    return builder.build();
}

export function dictValueParserRequestContract$Data(): DictionaryValue<RequestContract$Data> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeRequestContract$Data(src)).endCell());
        },
        parse: (src) => {
            return loadRequestContract$Data(src.loadRef().beginParse());
        }
    }
}

export type BorrowContract$Data = {
    $$type: 'BorrowContract$Data';
    id: bigint;
    address: Address;
    createdTime: bigint;
    pool: bigint;
    sum: bigint;
    app: Address;
    endTime: bigint;
}

export function storeBorrowContract$Data(src: BorrowContract$Data) {
    return (builder: Builder) => {
        const b_0 = builder;
        b_0.storeUint(src.id, 32);
        b_0.storeAddress(src.address);
        b_0.storeUint(src.createdTime, 32);
        b_0.storeUint(src.pool, 256);
        b_0.storeCoins(src.sum);
        b_0.storeAddress(src.app);
        const b_1 = new Builder();
        b_1.storeUint(src.endTime, 64);
        b_0.storeRef(b_1.endCell());
    };
}

export function loadBorrowContract$Data(slice: Slice) {
    const sc_0 = slice;
    const _id = sc_0.loadUintBig(32);
    const _address = sc_0.loadAddress();
    const _createdTime = sc_0.loadUintBig(32);
    const _pool = sc_0.loadUintBig(256);
    const _sum = sc_0.loadCoins();
    const _app = sc_0.loadAddress();
    const sc_1 = sc_0.loadRef().beginParse();
    const _endTime = sc_1.loadUintBig(64);
    return { $$type: 'BorrowContract$Data' as const, id: _id, address: _address, createdTime: _createdTime, pool: _pool, sum: _sum, app: _app, endTime: _endTime };
}

export function loadTupleBorrowContract$Data(source: TupleReader) {
    const _id = source.readBigNumber();
    const _address = source.readAddress();
    const _createdTime = source.readBigNumber();
    const _pool = source.readBigNumber();
    const _sum = source.readBigNumber();
    const _app = source.readAddress();
    const _endTime = source.readBigNumber();
    return { $$type: 'BorrowContract$Data' as const, id: _id, address: _address, createdTime: _createdTime, pool: _pool, sum: _sum, app: _app, endTime: _endTime };
}

export function loadGetterTupleBorrowContract$Data(source: TupleReader) {
    const _id = source.readBigNumber();
    const _address = source.readAddress();
    const _createdTime = source.readBigNumber();
    const _pool = source.readBigNumber();
    const _sum = source.readBigNumber();
    const _app = source.readAddress();
    const _endTime = source.readBigNumber();
    return { $$type: 'BorrowContract$Data' as const, id: _id, address: _address, createdTime: _createdTime, pool: _pool, sum: _sum, app: _app, endTime: _endTime };
}

export function storeTupleBorrowContract$Data(source: BorrowContract$Data) {
    const builder = new TupleBuilder();
    builder.writeNumber(source.id);
    builder.writeAddress(source.address);
    builder.writeNumber(source.createdTime);
    builder.writeNumber(source.pool);
    builder.writeNumber(source.sum);
    builder.writeAddress(source.app);
    builder.writeNumber(source.endTime);
    return builder.build();
}

export function dictValueParserBorrowContract$Data(): DictionaryValue<BorrowContract$Data> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeBorrowContract$Data(src)).endCell());
        },
        parse: (src) => {
            return loadBorrowContract$Data(src.loadRef().beginParse());
        }
    }
}

export type User$Data = {
    $$type: 'User$Data';
    address: Address;
    telegramId: bigint | null;
    rating: bigint;
    app: Address;
    debts: Dictionary<number, Debt>;
    investedIn: Dictionary<Address, CompPoolData>;
    compensationPools: Dictionary<bigint, Address>;
    debtId: bigint;
}

export function storeUser$Data(src: User$Data) {
    return (builder: Builder) => {
        const b_0 = builder;
        b_0.storeAddress(src.address);
        if (src.telegramId !== null && src.telegramId !== undefined) { b_0.storeBit(true).storeInt(src.telegramId, 257); } else { b_0.storeBit(false); }
        b_0.storeInt(src.rating, 257);
        const b_1 = new Builder();
        b_1.storeAddress(src.app);
        b_1.storeDict(src.debts, Dictionary.Keys.Uint(32), dictValueParserDebt());
        b_1.storeDict(src.investedIn, Dictionary.Keys.Address(), dictValueParserCompPoolData());
        b_1.storeDict(src.compensationPools, Dictionary.Keys.BigUint(256), Dictionary.Values.Address());
        b_1.storeUint(src.debtId, 32);
        b_0.storeRef(b_1.endCell());
    };
}

export function loadUser$Data(slice: Slice) {
    const sc_0 = slice;
    const _address = sc_0.loadAddress();
    const _telegramId = sc_0.loadBit() ? sc_0.loadIntBig(257) : null;
    const _rating = sc_0.loadIntBig(257);
    const sc_1 = sc_0.loadRef().beginParse();
    const _app = sc_1.loadAddress();
    const _debts = Dictionary.load(Dictionary.Keys.Uint(32), dictValueParserDebt(), sc_1);
    const _investedIn = Dictionary.load(Dictionary.Keys.Address(), dictValueParserCompPoolData(), sc_1);
    const _compensationPools = Dictionary.load(Dictionary.Keys.BigUint(256), Dictionary.Values.Address(), sc_1);
    const _debtId = sc_1.loadUintBig(32);
    return { $$type: 'User$Data' as const, address: _address, telegramId: _telegramId, rating: _rating, app: _app, debts: _debts, investedIn: _investedIn, compensationPools: _compensationPools, debtId: _debtId };
}

export function loadTupleUser$Data(source: TupleReader) {
    const _address = source.readAddress();
    const _telegramId = source.readBigNumberOpt();
    const _rating = source.readBigNumber();
    const _app = source.readAddress();
    const _debts = Dictionary.loadDirect(Dictionary.Keys.Uint(32), dictValueParserDebt(), source.readCellOpt());
    const _investedIn = Dictionary.loadDirect(Dictionary.Keys.Address(), dictValueParserCompPoolData(), source.readCellOpt());
    const _compensationPools = Dictionary.loadDirect(Dictionary.Keys.BigUint(256), Dictionary.Values.Address(), source.readCellOpt());
    const _debtId = source.readBigNumber();
    return { $$type: 'User$Data' as const, address: _address, telegramId: _telegramId, rating: _rating, app: _app, debts: _debts, investedIn: _investedIn, compensationPools: _compensationPools, debtId: _debtId };
}

export function loadGetterTupleUser$Data(source: TupleReader) {
    const _address = source.readAddress();
    const _telegramId = source.readBigNumberOpt();
    const _rating = source.readBigNumber();
    const _app = source.readAddress();
    const _debts = Dictionary.loadDirect(Dictionary.Keys.Uint(32), dictValueParserDebt(), source.readCellOpt());
    const _investedIn = Dictionary.loadDirect(Dictionary.Keys.Address(), dictValueParserCompPoolData(), source.readCellOpt());
    const _compensationPools = Dictionary.loadDirect(Dictionary.Keys.BigUint(256), Dictionary.Values.Address(), source.readCellOpt());
    const _debtId = source.readBigNumber();
    return { $$type: 'User$Data' as const, address: _address, telegramId: _telegramId, rating: _rating, app: _app, debts: _debts, investedIn: _investedIn, compensationPools: _compensationPools, debtId: _debtId };
}

export function storeTupleUser$Data(source: User$Data) {
    const builder = new TupleBuilder();
    builder.writeAddress(source.address);
    builder.writeNumber(source.telegramId);
    builder.writeNumber(source.rating);
    builder.writeAddress(source.app);
    builder.writeCell(source.debts.size > 0 ? beginCell().storeDictDirect(source.debts, Dictionary.Keys.Uint(32), dictValueParserDebt()).endCell() : null);
    builder.writeCell(source.investedIn.size > 0 ? beginCell().storeDictDirect(source.investedIn, Dictionary.Keys.Address(), dictValueParserCompPoolData()).endCell() : null);
    builder.writeCell(source.compensationPools.size > 0 ? beginCell().storeDictDirect(source.compensationPools, Dictionary.Keys.BigUint(256), Dictionary.Values.Address()).endCell() : null);
    builder.writeNumber(source.debtId);
    return builder.build();
}

export function dictValueParserUser$Data(): DictionaryValue<User$Data> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeUser$Data(src)).endCell());
        },
        parse: (src) => {
            return loadUser$Data(src.loadRef().beginParse());
        }
    }
}

export type Overdue = {
    $$type: 'Overdue';
    address: Address;
    sum: bigint;
    id: bigint;
}

export function storeOverdue(src: Overdue) {
    return (builder: Builder) => {
        const b_0 = builder;
        b_0.storeUint(3553126303, 32);
        b_0.storeAddress(src.address);
        b_0.storeCoins(src.sum);
        b_0.storeUint(src.id, 32);
    };
}

export function loadOverdue(slice: Slice) {
    const sc_0 = slice;
    if (sc_0.loadUint(32) !== 3553126303) { throw Error('Invalid prefix'); }
    const _address = sc_0.loadAddress();
    const _sum = sc_0.loadCoins();
    const _id = sc_0.loadUintBig(32);
    return { $$type: 'Overdue' as const, address: _address, sum: _sum, id: _id };
}

export function loadTupleOverdue(source: TupleReader) {
    const _address = source.readAddress();
    const _sum = source.readBigNumber();
    const _id = source.readBigNumber();
    return { $$type: 'Overdue' as const, address: _address, sum: _sum, id: _id };
}

export function loadGetterTupleOverdue(source: TupleReader) {
    const _address = source.readAddress();
    const _sum = source.readBigNumber();
    const _id = source.readBigNumber();
    return { $$type: 'Overdue' as const, address: _address, sum: _sum, id: _id };
}

export function storeTupleOverdue(source: Overdue) {
    const builder = new TupleBuilder();
    builder.writeAddress(source.address);
    builder.writeNumber(source.sum);
    builder.writeNumber(source.id);
    return builder.build();
}

export function dictValueParserOverdue(): DictionaryValue<Overdue> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeOverdue(src)).endCell());
        },
        parse: (src) => {
            return loadOverdue(src.loadRef().beginParse());
        }
    }
}

export type Time = {
    $$type: 'Time';
    address: Address;
    id: bigint;
    pool: bigint;
}

export function storeTime(src: Time) {
    return (builder: Builder) => {
        const b_0 = builder;
        b_0.storeUint(2793874247, 32);
        b_0.storeAddress(src.address);
        b_0.storeUint(src.id, 16);
        b_0.storeUint(src.pool, 16);
    };
}

export function loadTime(slice: Slice) {
    const sc_0 = slice;
    if (sc_0.loadUint(32) !== 2793874247) { throw Error('Invalid prefix'); }
    const _address = sc_0.loadAddress();
    const _id = sc_0.loadUintBig(16);
    const _pool = sc_0.loadUintBig(16);
    return { $$type: 'Time' as const, address: _address, id: _id, pool: _pool };
}

export function loadTupleTime(source: TupleReader) {
    const _address = source.readAddress();
    const _id = source.readBigNumber();
    const _pool = source.readBigNumber();
    return { $$type: 'Time' as const, address: _address, id: _id, pool: _pool };
}

export function loadGetterTupleTime(source: TupleReader) {
    const _address = source.readAddress();
    const _id = source.readBigNumber();
    const _pool = source.readBigNumber();
    return { $$type: 'Time' as const, address: _address, id: _id, pool: _pool };
}

export function storeTupleTime(source: Time) {
    const builder = new TupleBuilder();
    builder.writeAddress(source.address);
    builder.writeNumber(source.id);
    builder.writeNumber(source.pool);
    return builder.build();
}

export function dictValueParserTime(): DictionaryValue<Time> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeTime(src)).endCell());
        },
        parse: (src) => {
            return loadTime(src.loadRef().beginParse());
        }
    }
}

export type Changesum = {
    $$type: 'Changesum';
    sum: bigint;
}

export function storeChangesum(src: Changesum) {
    return (builder: Builder) => {
        const b_0 = builder;
        b_0.storeUint(50664625, 32);
        b_0.storeCoins(src.sum);
    };
}

export function loadChangesum(slice: Slice) {
    const sc_0 = slice;
    if (sc_0.loadUint(32) !== 50664625) { throw Error('Invalid prefix'); }
    const _sum = sc_0.loadCoins();
    return { $$type: 'Changesum' as const, sum: _sum };
}

export function loadTupleChangesum(source: TupleReader) {
    const _sum = source.readBigNumber();
    return { $$type: 'Changesum' as const, sum: _sum };
}

export function loadGetterTupleChangesum(source: TupleReader) {
    const _sum = source.readBigNumber();
    return { $$type: 'Changesum' as const, sum: _sum };
}

export function storeTupleChangesum(source: Changesum) {
    const builder = new TupleBuilder();
    builder.writeNumber(source.sum);
    return builder.build();
}

export function dictValueParserChangesum(): DictionaryValue<Changesum> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeChangesum(src)).endCell());
        },
        parse: (src) => {
            return loadChangesum(src.loadRef().beginParse());
        }
    }
}

export type Borrow = {
    $$type: 'Borrow';
    idBorrow: bigint;
    idComp: bigint;
    amount: bigint;
    time: bigint | null;
    to: Address | null;
    fcc: bigint;
}

export function storeBorrow(src: Borrow) {
    return (builder: Builder) => {
        const b_0 = builder;
        b_0.storeUint(410637793, 32);
        b_0.storeUint(src.idBorrow, 256);
        b_0.storeUint(src.idComp, 256);
        b_0.storeCoins(src.amount);
        if (src.time !== null && src.time !== undefined) { b_0.storeBit(true).storeInt(src.time, 257); } else { b_0.storeBit(false); }
        const b_1 = new Builder();
        b_1.storeAddress(src.to);
        b_1.storeCoins(src.fcc);
        b_0.storeRef(b_1.endCell());
    };
}

export function loadBorrow(slice: Slice) {
    const sc_0 = slice;
    if (sc_0.loadUint(32) !== 410637793) { throw Error('Invalid prefix'); }
    const _idBorrow = sc_0.loadUintBig(256);
    const _idComp = sc_0.loadUintBig(256);
    const _amount = sc_0.loadCoins();
    const _time = sc_0.loadBit() ? sc_0.loadIntBig(257) : null;
    const sc_1 = sc_0.loadRef().beginParse();
    const _to = sc_1.loadMaybeAddress();
    const _fcc = sc_1.loadCoins();
    return { $$type: 'Borrow' as const, idBorrow: _idBorrow, idComp: _idComp, amount: _amount, time: _time, to: _to, fcc: _fcc };
}

export function loadTupleBorrow(source: TupleReader) {
    const _idBorrow = source.readBigNumber();
    const _idComp = source.readBigNumber();
    const _amount = source.readBigNumber();
    const _time = source.readBigNumberOpt();
    const _to = source.readAddressOpt();
    const _fcc = source.readBigNumber();
    return { $$type: 'Borrow' as const, idBorrow: _idBorrow, idComp: _idComp, amount: _amount, time: _time, to: _to, fcc: _fcc };
}

export function loadGetterTupleBorrow(source: TupleReader) {
    const _idBorrow = source.readBigNumber();
    const _idComp = source.readBigNumber();
    const _amount = source.readBigNumber();
    const _time = source.readBigNumberOpt();
    const _to = source.readAddressOpt();
    const _fcc = source.readBigNumber();
    return { $$type: 'Borrow' as const, idBorrow: _idBorrow, idComp: _idComp, amount: _amount, time: _time, to: _to, fcc: _fcc };
}

export function storeTupleBorrow(source: Borrow) {
    const builder = new TupleBuilder();
    builder.writeNumber(source.idBorrow);
    builder.writeNumber(source.idComp);
    builder.writeNumber(source.amount);
    builder.writeNumber(source.time);
    builder.writeAddress(source.to);
    builder.writeNumber(source.fcc);
    return builder.build();
}

export function dictValueParserBorrow(): DictionaryValue<Borrow> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeBorrow(src)).endCell());
        },
        parse: (src) => {
            return loadBorrow(src.loadRef().beginParse());
        }
    }
}

export type InitBorrow = {
    $$type: 'InitBorrow';
    endTime: bigint;
    sum: bigint;
}

export function storeInitBorrow(src: InitBorrow) {
    return (builder: Builder) => {
        const b_0 = builder;
        b_0.storeUint(1774839781, 32);
        b_0.storeUint(src.endTime, 32);
        b_0.storeCoins(src.sum);
    };
}

export function loadInitBorrow(slice: Slice) {
    const sc_0 = slice;
    if (sc_0.loadUint(32) !== 1774839781) { throw Error('Invalid prefix'); }
    const _endTime = sc_0.loadUintBig(32);
    const _sum = sc_0.loadCoins();
    return { $$type: 'InitBorrow' as const, endTime: _endTime, sum: _sum };
}

export function loadTupleInitBorrow(source: TupleReader) {
    const _endTime = source.readBigNumber();
    const _sum = source.readBigNumber();
    return { $$type: 'InitBorrow' as const, endTime: _endTime, sum: _sum };
}

export function loadGetterTupleInitBorrow(source: TupleReader) {
    const _endTime = source.readBigNumber();
    const _sum = source.readBigNumber();
    return { $$type: 'InitBorrow' as const, endTime: _endTime, sum: _sum };
}

export function storeTupleInitBorrow(source: InitBorrow) {
    const builder = new TupleBuilder();
    builder.writeNumber(source.endTime);
    builder.writeNumber(source.sum);
    return builder.build();
}

export function dictValueParserInitBorrow(): DictionaryValue<InitBorrow> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeInitBorrow(src)).endCell());
        },
        parse: (src) => {
            return loadInitBorrow(src.loadRef().beginParse());
        }
    }
}

export type CheckTime = {
    $$type: 'CheckTime';
}

export function storeCheckTime(src: CheckTime) {
    return (builder: Builder) => {
        const b_0 = builder;
        b_0.storeUint(265710716, 32);
    };
}

export function loadCheckTime(slice: Slice) {
    const sc_0 = slice;
    if (sc_0.loadUint(32) !== 265710716) { throw Error('Invalid prefix'); }
    return { $$type: 'CheckTime' as const };
}

export function loadTupleCheckTime(source: TupleReader) {
    return { $$type: 'CheckTime' as const };
}

export function loadGetterTupleCheckTime(source: TupleReader) {
    return { $$type: 'CheckTime' as const };
}

export function storeTupleCheckTime(source: CheckTime) {
    const builder = new TupleBuilder();
    return builder.build();
}

export function dictValueParserCheckTime(): DictionaryValue<CheckTime> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeCheckTime(src)).endCell());
        },
        parse: (src) => {
            return loadCheckTime(src.loadRef().beginParse());
        }
    }
}

export type Close = {
    $$type: 'Close';
}

export function storeClose(src: Close) {
    return (builder: Builder) => {
        const b_0 = builder;
        b_0.storeUint(3009980024, 32);
    };
}

export function loadClose(slice: Slice) {
    const sc_0 = slice;
    if (sc_0.loadUint(32) !== 3009980024) { throw Error('Invalid prefix'); }
    return { $$type: 'Close' as const };
}

export function loadTupleClose(source: TupleReader) {
    return { $$type: 'Close' as const };
}

export function loadGetterTupleClose(source: TupleReader) {
    return { $$type: 'Close' as const };
}

export function storeTupleClose(source: Close) {
    const builder = new TupleBuilder();
    return builder.build();
}

export function dictValueParserClose(): DictionaryValue<Close> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeClose(src)).endCell());
        },
        parse: (src) => {
            return loadClose(src.loadRef().beginParse());
        }
    }
}

export type Update = {
    $$type: 'Update';
    sender: Address;
}

export function storeUpdate(src: Update) {
    return (builder: Builder) => {
        const b_0 = builder;
        b_0.storeUint(2420382095, 32);
        b_0.storeAddress(src.sender);
    };
}

export function loadUpdate(slice: Slice) {
    const sc_0 = slice;
    if (sc_0.loadUint(32) !== 2420382095) { throw Error('Invalid prefix'); }
    const _sender = sc_0.loadAddress();
    return { $$type: 'Update' as const, sender: _sender };
}

export function loadTupleUpdate(source: TupleReader) {
    const _sender = source.readAddress();
    return { $$type: 'Update' as const, sender: _sender };
}

export function loadGetterTupleUpdate(source: TupleReader) {
    const _sender = source.readAddress();
    return { $$type: 'Update' as const, sender: _sender };
}

export function storeTupleUpdate(source: Update) {
    const builder = new TupleBuilder();
    builder.writeAddress(source.sender);
    return builder.build();
}

export function dictValueParserUpdate(): DictionaryValue<Update> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeUpdate(src)).endCell());
        },
        parse: (src) => {
            return loadUpdate(src.loadRef().beginParse());
        }
    }
}

export type Unfreeze = {
    $$type: 'Unfreeze';
    v: bigint;
    fcc: bigint;
    id: bigint;
}

export function storeUnfreeze(src: Unfreeze) {
    return (builder: Builder) => {
        const b_0 = builder;
        b_0.storeUint(2279497427, 32);
        b_0.storeUint(src.v, 256);
        b_0.storeCoins(src.fcc);
        b_0.storeUint(src.id, 256);
    };
}

export function loadUnfreeze(slice: Slice) {
    const sc_0 = slice;
    if (sc_0.loadUint(32) !== 2279497427) { throw Error('Invalid prefix'); }
    const _v = sc_0.loadUintBig(256);
    const _fcc = sc_0.loadCoins();
    const _id = sc_0.loadUintBig(256);
    return { $$type: 'Unfreeze' as const, v: _v, fcc: _fcc, id: _id };
}

export function loadTupleUnfreeze(source: TupleReader) {
    const _v = source.readBigNumber();
    const _fcc = source.readBigNumber();
    const _id = source.readBigNumber();
    return { $$type: 'Unfreeze' as const, v: _v, fcc: _fcc, id: _id };
}

export function loadGetterTupleUnfreeze(source: TupleReader) {
    const _v = source.readBigNumber();
    const _fcc = source.readBigNumber();
    const _id = source.readBigNumber();
    return { $$type: 'Unfreeze' as const, v: _v, fcc: _fcc, id: _id };
}

export function storeTupleUnfreeze(source: Unfreeze) {
    const builder = new TupleBuilder();
    builder.writeNumber(source.v);
    builder.writeNumber(source.fcc);
    builder.writeNumber(source.id);
    return builder.build();
}

export function dictValueParserUnfreeze(): DictionaryValue<Unfreeze> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeUnfreeze(src)).endCell());
        },
        parse: (src) => {
            return loadUnfreeze(src.loadRef().beginParse());
        }
    }
}

export type UpdateEarn = {
    $$type: 'UpdateEarn';
    sender: Address;
}

export function storeUpdateEarn(src: UpdateEarn) {
    return (builder: Builder) => {
        const b_0 = builder;
        b_0.storeUint(584289618, 32);
        b_0.storeAddress(src.sender);
    };
}

export function loadUpdateEarn(slice: Slice) {
    const sc_0 = slice;
    if (sc_0.loadUint(32) !== 584289618) { throw Error('Invalid prefix'); }
    const _sender = sc_0.loadAddress();
    return { $$type: 'UpdateEarn' as const, sender: _sender };
}

export function loadTupleUpdateEarn(source: TupleReader) {
    const _sender = source.readAddress();
    return { $$type: 'UpdateEarn' as const, sender: _sender };
}

export function loadGetterTupleUpdateEarn(source: TupleReader) {
    const _sender = source.readAddress();
    return { $$type: 'UpdateEarn' as const, sender: _sender };
}

export function storeTupleUpdateEarn(source: UpdateEarn) {
    const builder = new TupleBuilder();
    builder.writeAddress(source.sender);
    return builder.build();
}

export function dictValueParserUpdateEarn(): DictionaryValue<UpdateEarn> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeUpdateEarn(src)).endCell());
        },
        parse: (src) => {
            return loadUpdateEarn(src.loadRef().beginParse());
        }
    }
}

export type Repay = {
    $$type: 'Repay';
    id: bigint;
}

export function storeRepay(src: Repay) {
    return (builder: Builder) => {
        const b_0 = builder;
        b_0.storeUint(1754501411, 32);
        b_0.storeUint(src.id, 256);
    };
}

export function loadRepay(slice: Slice) {
    const sc_0 = slice;
    if (sc_0.loadUint(32) !== 1754501411) { throw Error('Invalid prefix'); }
    const _id = sc_0.loadUintBig(256);
    return { $$type: 'Repay' as const, id: _id };
}

export function loadTupleRepay(source: TupleReader) {
    const _id = source.readBigNumber();
    return { $$type: 'Repay' as const, id: _id };
}

export function loadGetterTupleRepay(source: TupleReader) {
    const _id = source.readBigNumber();
    return { $$type: 'Repay' as const, id: _id };
}

export function storeTupleRepay(source: Repay) {
    const builder = new TupleBuilder();
    builder.writeNumber(source.id);
    return builder.build();
}

export function dictValueParserRepay(): DictionaryValue<Repay> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeRepay(src)).endCell());
        },
        parse: (src) => {
            return loadRepay(src.loadRef().beginParse());
        }
    }
}

export type Request = {
    $$type: 'Request';
    id: bigint;
    user: Address | null;
}

export function storeRequest(src: Request) {
    return (builder: Builder) => {
        const b_0 = builder;
        b_0.storeUint(1390358458, 32);
        b_0.storeUint(src.id, 256);
        b_0.storeAddress(src.user);
    };
}

export function loadRequest(slice: Slice) {
    const sc_0 = slice;
    if (sc_0.loadUint(32) !== 1390358458) { throw Error('Invalid prefix'); }
    const _id = sc_0.loadUintBig(256);
    const _user = sc_0.loadMaybeAddress();
    return { $$type: 'Request' as const, id: _id, user: _user };
}

export function loadTupleRequest(source: TupleReader) {
    const _id = source.readBigNumber();
    const _user = source.readAddressOpt();
    return { $$type: 'Request' as const, id: _id, user: _user };
}

export function loadGetterTupleRequest(source: TupleReader) {
    const _id = source.readBigNumber();
    const _user = source.readAddressOpt();
    return { $$type: 'Request' as const, id: _id, user: _user };
}

export function storeTupleRequest(source: Request) {
    const builder = new TupleBuilder();
    builder.writeNumber(source.id);
    builder.writeAddress(source.user);
    return builder.build();
}

export function dictValueParserRequest(): DictionaryValue<Request> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeRequest(src)).endCell());
        },
        parse: (src) => {
            return loadRequest(src.loadRef().beginParse());
        }
    }
}

export type Approve = {
    $$type: 'Approve';
    id: bigint;
    user: Address | null;
}

export function storeApprove(src: Approve) {
    return (builder: Builder) => {
        const b_0 = builder;
        b_0.storeUint(2374532565, 32);
        b_0.storeInt(src.id, 257);
        b_0.storeAddress(src.user);
    };
}

export function loadApprove(slice: Slice) {
    const sc_0 = slice;
    if (sc_0.loadUint(32) !== 2374532565) { throw Error('Invalid prefix'); }
    const _id = sc_0.loadIntBig(257);
    const _user = sc_0.loadMaybeAddress();
    return { $$type: 'Approve' as const, id: _id, user: _user };
}

export function loadTupleApprove(source: TupleReader) {
    const _id = source.readBigNumber();
    const _user = source.readAddressOpt();
    return { $$type: 'Approve' as const, id: _id, user: _user };
}

export function loadGetterTupleApprove(source: TupleReader) {
    const _id = source.readBigNumber();
    const _user = source.readAddressOpt();
    return { $$type: 'Approve' as const, id: _id, user: _user };
}

export function storeTupleApprove(source: Approve) {
    const builder = new TupleBuilder();
    builder.writeNumber(source.id);
    builder.writeAddress(source.user);
    return builder.build();
}

export function dictValueParserApprove(): DictionaryValue<Approve> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeApprove(src)).endCell());
        },
        parse: (src) => {
            return loadApprove(src.loadRef().beginParse());
        }
    }
}

export type Decline = {
    $$type: 'Decline';
    id: bigint;
    user: Address | null;
}

export function storeDecline(src: Decline) {
    return (builder: Builder) => {
        const b_0 = builder;
        b_0.storeUint(2494548685, 32);
        b_0.storeInt(src.id, 257);
        b_0.storeAddress(src.user);
    };
}

export function loadDecline(slice: Slice) {
    const sc_0 = slice;
    if (sc_0.loadUint(32) !== 2494548685) { throw Error('Invalid prefix'); }
    const _id = sc_0.loadIntBig(257);
    const _user = sc_0.loadMaybeAddress();
    return { $$type: 'Decline' as const, id: _id, user: _user };
}

export function loadTupleDecline(source: TupleReader) {
    const _id = source.readBigNumber();
    const _user = source.readAddressOpt();
    return { $$type: 'Decline' as const, id: _id, user: _user };
}

export function loadGetterTupleDecline(source: TupleReader) {
    const _id = source.readBigNumber();
    const _user = source.readAddressOpt();
    return { $$type: 'Decline' as const, id: _id, user: _user };
}

export function storeTupleDecline(source: Decline) {
    const builder = new TupleBuilder();
    builder.writeNumber(source.id);
    builder.writeAddress(source.user);
    return builder.build();
}

export function dictValueParserDecline(): DictionaryValue<Decline> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeDecline(src)).endCell());
        },
        parse: (src) => {
            return loadDecline(src.loadRef().beginParse());
        }
    }
}

export type Withdraw = {
    $$type: 'Withdraw';
    from: bigint;
    from2: Address | null;
    amount: bigint;
    to1: Address | null;
}

export function storeWithdraw(src: Withdraw) {
    return (builder: Builder) => {
        const b_0 = builder;
        b_0.storeUint(180313183, 32);
        b_0.storeInt(src.from, 257);
        b_0.storeAddress(src.from2);
        b_0.storeCoins(src.amount);
        b_0.storeAddress(src.to1);
    };
}

export function loadWithdraw(slice: Slice) {
    const sc_0 = slice;
    if (sc_0.loadUint(32) !== 180313183) { throw Error('Invalid prefix'); }
    const _from = sc_0.loadIntBig(257);
    const _from2 = sc_0.loadMaybeAddress();
    const _amount = sc_0.loadCoins();
    const _to1 = sc_0.loadMaybeAddress();
    return { $$type: 'Withdraw' as const, from: _from, from2: _from2, amount: _amount, to1: _to1 };
}

export function loadTupleWithdraw(source: TupleReader) {
    const _from = source.readBigNumber();
    const _from2 = source.readAddressOpt();
    const _amount = source.readBigNumber();
    const _to1 = source.readAddressOpt();
    return { $$type: 'Withdraw' as const, from: _from, from2: _from2, amount: _amount, to1: _to1 };
}

export function loadGetterTupleWithdraw(source: TupleReader) {
    const _from = source.readBigNumber();
    const _from2 = source.readAddressOpt();
    const _amount = source.readBigNumber();
    const _to1 = source.readAddressOpt();
    return { $$type: 'Withdraw' as const, from: _from, from2: _from2, amount: _amount, to1: _to1 };
}

export function storeTupleWithdraw(source: Withdraw) {
    const builder = new TupleBuilder();
    builder.writeNumber(source.from);
    builder.writeAddress(source.from2);
    builder.writeNumber(source.amount);
    builder.writeAddress(source.to1);
    return builder.build();
}

export function dictValueParserWithdraw(): DictionaryValue<Withdraw> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeWithdraw(src)).endCell());
        },
        parse: (src) => {
            return loadWithdraw(src.loadRef().beginParse());
        }
    }
}

export type WithdrawFromComp = {
    $$type: 'WithdrawFromComp';
    from: bigint;
    from2: Address | null;
    amount: bigint;
    to1: Address | null;
}

export function storeWithdrawFromComp(src: WithdrawFromComp) {
    return (builder: Builder) => {
        const b_0 = builder;
        b_0.storeUint(3292633415, 32);
        b_0.storeInt(src.from, 257);
        b_0.storeAddress(src.from2);
        b_0.storeCoins(src.amount);
        b_0.storeAddress(src.to1);
    };
}

export function loadWithdrawFromComp(slice: Slice) {
    const sc_0 = slice;
    if (sc_0.loadUint(32) !== 3292633415) { throw Error('Invalid prefix'); }
    const _from = sc_0.loadIntBig(257);
    const _from2 = sc_0.loadMaybeAddress();
    const _amount = sc_0.loadCoins();
    const _to1 = sc_0.loadMaybeAddress();
    return { $$type: 'WithdrawFromComp' as const, from: _from, from2: _from2, amount: _amount, to1: _to1 };
}

export function loadTupleWithdrawFromComp(source: TupleReader) {
    const _from = source.readBigNumber();
    const _from2 = source.readAddressOpt();
    const _amount = source.readBigNumber();
    const _to1 = source.readAddressOpt();
    return { $$type: 'WithdrawFromComp' as const, from: _from, from2: _from2, amount: _amount, to1: _to1 };
}

export function loadGetterTupleWithdrawFromComp(source: TupleReader) {
    const _from = source.readBigNumber();
    const _from2 = source.readAddressOpt();
    const _amount = source.readBigNumber();
    const _to1 = source.readAddressOpt();
    return { $$type: 'WithdrawFromComp' as const, from: _from, from2: _from2, amount: _amount, to1: _to1 };
}

export function storeTupleWithdrawFromComp(source: WithdrawFromComp) {
    const builder = new TupleBuilder();
    builder.writeNumber(source.from);
    builder.writeAddress(source.from2);
    builder.writeNumber(source.amount);
    builder.writeAddress(source.to1);
    return builder.build();
}

export function dictValueParserWithdrawFromComp(): DictionaryValue<WithdrawFromComp> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeWithdrawFromComp(src)).endCell());
        },
        parse: (src) => {
            return loadWithdrawFromComp(src.loadRef().beginParse());
        }
    }
}

export type InitCompensationPool = {
    $$type: 'InitCompensationPool';
    name: string;
    maxTime: bigint;
}

export function storeInitCompensationPool(src: InitCompensationPool) {
    return (builder: Builder) => {
        const b_0 = builder;
        b_0.storeUint(95326449, 32);
        b_0.storeStringRefTail(src.name);
        b_0.storeUint(src.maxTime, 32);
    };
}

export function loadInitCompensationPool(slice: Slice) {
    const sc_0 = slice;
    if (sc_0.loadUint(32) !== 95326449) { throw Error('Invalid prefix'); }
    const _name = sc_0.loadStringRefTail();
    const _maxTime = sc_0.loadUintBig(32);
    return { $$type: 'InitCompensationPool' as const, name: _name, maxTime: _maxTime };
}

export function loadTupleInitCompensationPool(source: TupleReader) {
    const _name = source.readString();
    const _maxTime = source.readBigNumber();
    return { $$type: 'InitCompensationPool' as const, name: _name, maxTime: _maxTime };
}

export function loadGetterTupleInitCompensationPool(source: TupleReader) {
    const _name = source.readString();
    const _maxTime = source.readBigNumber();
    return { $$type: 'InitCompensationPool' as const, name: _name, maxTime: _maxTime };
}

export function storeTupleInitCompensationPool(source: InitCompensationPool) {
    const builder = new TupleBuilder();
    builder.writeString(source.name);
    builder.writeNumber(source.maxTime);
    return builder.build();
}

export function dictValueParserInitCompensationPool(): DictionaryValue<InitCompensationPool> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeInitCompensationPool(src)).endCell());
        },
        parse: (src) => {
            return loadInitCompensationPool(src.loadRef().beginParse());
        }
    }
}

export type CreateBorrowPool = {
    $$type: 'CreateBorrowPool';
    name: string;
    maxTime: bigint;
}

export function storeCreateBorrowPool(src: CreateBorrowPool) {
    return (builder: Builder) => {
        const b_0 = builder;
        b_0.storeUint(1366651737, 32);
        b_0.storeStringRefTail(src.name);
        b_0.storeUint(src.maxTime, 32);
    };
}

export function loadCreateBorrowPool(slice: Slice) {
    const sc_0 = slice;
    if (sc_0.loadUint(32) !== 1366651737) { throw Error('Invalid prefix'); }
    const _name = sc_0.loadStringRefTail();
    const _maxTime = sc_0.loadUintBig(32);
    return { $$type: 'CreateBorrowPool' as const, name: _name, maxTime: _maxTime };
}

export function loadTupleCreateBorrowPool(source: TupleReader) {
    const _name = source.readString();
    const _maxTime = source.readBigNumber();
    return { $$type: 'CreateBorrowPool' as const, name: _name, maxTime: _maxTime };
}

export function loadGetterTupleCreateBorrowPool(source: TupleReader) {
    const _name = source.readString();
    const _maxTime = source.readBigNumber();
    return { $$type: 'CreateBorrowPool' as const, name: _name, maxTime: _maxTime };
}

export function storeTupleCreateBorrowPool(source: CreateBorrowPool) {
    const builder = new TupleBuilder();
    builder.writeString(source.name);
    builder.writeNumber(source.maxTime);
    return builder.build();
}

export function dictValueParserCreateBorrowPool(): DictionaryValue<CreateBorrowPool> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeCreateBorrowPool(src)).endCell());
        },
        parse: (src) => {
            return loadCreateBorrowPool(src.loadRef().beginParse());
        }
    }
}

export type CreateCompensationPool = {
    $$type: 'CreateCompensationPool';
    name: string;
    maxTime: bigint;
}

export function storeCreateCompensationPool(src: CreateCompensationPool) {
    return (builder: Builder) => {
        const b_0 = builder;
        b_0.storeUint(2604694397, 32);
        b_0.storeStringRefTail(src.name);
        b_0.storeUint(src.maxTime, 32);
    };
}

export function loadCreateCompensationPool(slice: Slice) {
    const sc_0 = slice;
    if (sc_0.loadUint(32) !== 2604694397) { throw Error('Invalid prefix'); }
    const _name = sc_0.loadStringRefTail();
    const _maxTime = sc_0.loadUintBig(32);
    return { $$type: 'CreateCompensationPool' as const, name: _name, maxTime: _maxTime };
}

export function loadTupleCreateCompensationPool(source: TupleReader) {
    const _name = source.readString();
    const _maxTime = source.readBigNumber();
    return { $$type: 'CreateCompensationPool' as const, name: _name, maxTime: _maxTime };
}

export function loadGetterTupleCreateCompensationPool(source: TupleReader) {
    const _name = source.readString();
    const _maxTime = source.readBigNumber();
    return { $$type: 'CreateCompensationPool' as const, name: _name, maxTime: _maxTime };
}

export function storeTupleCreateCompensationPool(source: CreateCompensationPool) {
    const builder = new TupleBuilder();
    builder.writeString(source.name);
    builder.writeNumber(source.maxTime);
    return builder.build();
}

export function dictValueParserCreateCompensationPool(): DictionaryValue<CreateCompensationPool> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeCreateCompensationPool(src)).endCell());
        },
        parse: (src) => {
            return loadCreateCompensationPool(src.loadRef().beginParse());
        }
    }
}

export type Login = {
    $$type: 'Login';
}

export function storeLogin(src: Login) {
    return (builder: Builder) => {
        const b_0 = builder;
        b_0.storeUint(1592348451, 32);
    };
}

export function loadLogin(slice: Slice) {
    const sc_0 = slice;
    if (sc_0.loadUint(32) !== 1592348451) { throw Error('Invalid prefix'); }
    return { $$type: 'Login' as const };
}

export function loadTupleLogin(source: TupleReader) {
    return { $$type: 'Login' as const };
}

export function loadGetterTupleLogin(source: TupleReader) {
    return { $$type: 'Login' as const };
}

export function storeTupleLogin(source: Login) {
    const builder = new TupleBuilder();
    return builder.build();
}

export function dictValueParserLogin(): DictionaryValue<Login> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeLogin(src)).endCell());
        },
        parse: (src) => {
            return loadLogin(src.loadRef().beginParse());
        }
    }
}

export type Deposit = {
    $$type: 'Deposit';
    id: bigint;
    sender: Address | null;
}

export function storeDeposit(src: Deposit) {
    return (builder: Builder) => {
        const b_0 = builder;
        b_0.storeUint(507992258, 32);
        b_0.storeUint(src.id, 32);
        b_0.storeAddress(src.sender);
    };
}

export function loadDeposit(slice: Slice) {
    const sc_0 = slice;
    if (sc_0.loadUint(32) !== 507992258) { throw Error('Invalid prefix'); }
    const _id = sc_0.loadUintBig(32);
    const _sender = sc_0.loadMaybeAddress();
    return { $$type: 'Deposit' as const, id: _id, sender: _sender };
}

export function loadTupleDeposit(source: TupleReader) {
    const _id = source.readBigNumber();
    const _sender = source.readAddressOpt();
    return { $$type: 'Deposit' as const, id: _id, sender: _sender };
}

export function loadGetterTupleDeposit(source: TupleReader) {
    const _id = source.readBigNumber();
    const _sender = source.readAddressOpt();
    return { $$type: 'Deposit' as const, id: _id, sender: _sender };
}

export function storeTupleDeposit(source: Deposit) {
    const builder = new TupleBuilder();
    builder.writeNumber(source.id);
    builder.writeAddress(source.sender);
    return builder.build();
}

export function dictValueParserDeposit(): DictionaryValue<Deposit> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeDeposit(src)).endCell());
        },
        parse: (src) => {
            return loadDeposit(src.loadRef().beginParse());
        }
    }
}

export type DepositToComp = {
    $$type: 'DepositToComp';
    id: bigint;
    sender: Address | null;
}

export function storeDepositToComp(src: DepositToComp) {
    return (builder: Builder) => {
        const b_0 = builder;
        b_0.storeUint(2322413052, 32);
        b_0.storeUint(src.id, 32);
        b_0.storeAddress(src.sender);
    };
}

export function loadDepositToComp(slice: Slice) {
    const sc_0 = slice;
    if (sc_0.loadUint(32) !== 2322413052) { throw Error('Invalid prefix'); }
    const _id = sc_0.loadUintBig(32);
    const _sender = sc_0.loadMaybeAddress();
    return { $$type: 'DepositToComp' as const, id: _id, sender: _sender };
}

export function loadTupleDepositToComp(source: TupleReader) {
    const _id = source.readBigNumber();
    const _sender = source.readAddressOpt();
    return { $$type: 'DepositToComp' as const, id: _id, sender: _sender };
}

export function loadGetterTupleDepositToComp(source: TupleReader) {
    const _id = source.readBigNumber();
    const _sender = source.readAddressOpt();
    return { $$type: 'DepositToComp' as const, id: _id, sender: _sender };
}

export function storeTupleDepositToComp(source: DepositToComp) {
    const builder = new TupleBuilder();
    builder.writeNumber(source.id);
    builder.writeAddress(source.sender);
    return builder.build();
}

export function dictValueParserDepositToComp(): DictionaryValue<DepositToComp> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeDepositToComp(src)).endCell());
        },
        parse: (src) => {
            return loadDepositToComp(src.loadRef().beginParse());
        }
    }
}

export type InitBorrowPool = {
    $$type: 'InitBorrowPool';
    name: string;
    maxTime: bigint;
}

export function storeInitBorrowPool(src: InitBorrowPool) {
    return (builder: Builder) => {
        const b_0 = builder;
        b_0.storeUint(1160199139, 32);
        b_0.storeStringRefTail(src.name);
        b_0.storeUint(src.maxTime, 32);
    };
}

export function loadInitBorrowPool(slice: Slice) {
    const sc_0 = slice;
    if (sc_0.loadUint(32) !== 1160199139) { throw Error('Invalid prefix'); }
    const _name = sc_0.loadStringRefTail();
    const _maxTime = sc_0.loadUintBig(32);
    return { $$type: 'InitBorrowPool' as const, name: _name, maxTime: _maxTime };
}

export function loadTupleInitBorrowPool(source: TupleReader) {
    const _name = source.readString();
    const _maxTime = source.readBigNumber();
    return { $$type: 'InitBorrowPool' as const, name: _name, maxTime: _maxTime };
}

export function loadGetterTupleInitBorrowPool(source: TupleReader) {
    const _name = source.readString();
    const _maxTime = source.readBigNumber();
    return { $$type: 'InitBorrowPool' as const, name: _name, maxTime: _maxTime };
}

export function storeTupleInitBorrowPool(source: InitBorrowPool) {
    const builder = new TupleBuilder();
    builder.writeString(source.name);
    builder.writeNumber(source.maxTime);
    return builder.build();
}

export function dictValueParserInitBorrowPool(): DictionaryValue<InitBorrowPool> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeInitBorrowPool(src)).endCell());
        },
        parse: (src) => {
            return loadInitBorrowPool(src.loadRef().beginParse());
        }
    }
}

export type Debt = {
    $$type: 'Debt';
    sum: bigint;
    timetoreturn: bigint;
    borrowPool: bigint;
    compPool: bigint;
    commision: bigint;
    fcc: bigint;
}

export function storeDebt(src: Debt) {
    return (builder: Builder) => {
        const b_0 = builder;
        b_0.storeCoins(src.sum);
        b_0.storeUint(src.timetoreturn, 32);
        b_0.storeUint(src.borrowPool, 256);
        b_0.storeUint(src.compPool, 256);
        b_0.storeCoins(src.commision);
        b_0.storeCoins(src.fcc);
    };
}

export function loadDebt(slice: Slice) {
    const sc_0 = slice;
    const _sum = sc_0.loadCoins();
    const _timetoreturn = sc_0.loadUintBig(32);
    const _borrowPool = sc_0.loadUintBig(256);
    const _compPool = sc_0.loadUintBig(256);
    const _commision = sc_0.loadCoins();
    const _fcc = sc_0.loadCoins();
    return { $$type: 'Debt' as const, sum: _sum, timetoreturn: _timetoreturn, borrowPool: _borrowPool, compPool: _compPool, commision: _commision, fcc: _fcc };
}

export function loadTupleDebt(source: TupleReader) {
    const _sum = source.readBigNumber();
    const _timetoreturn = source.readBigNumber();
    const _borrowPool = source.readBigNumber();
    const _compPool = source.readBigNumber();
    const _commision = source.readBigNumber();
    const _fcc = source.readBigNumber();
    return { $$type: 'Debt' as const, sum: _sum, timetoreturn: _timetoreturn, borrowPool: _borrowPool, compPool: _compPool, commision: _commision, fcc: _fcc };
}

export function loadGetterTupleDebt(source: TupleReader) {
    const _sum = source.readBigNumber();
    const _timetoreturn = source.readBigNumber();
    const _borrowPool = source.readBigNumber();
    const _compPool = source.readBigNumber();
    const _commision = source.readBigNumber();
    const _fcc = source.readBigNumber();
    return { $$type: 'Debt' as const, sum: _sum, timetoreturn: _timetoreturn, borrowPool: _borrowPool, compPool: _compPool, commision: _commision, fcc: _fcc };
}

export function storeTupleDebt(source: Debt) {
    const builder = new TupleBuilder();
    builder.writeNumber(source.sum);
    builder.writeNumber(source.timetoreturn);
    builder.writeNumber(source.borrowPool);
    builder.writeNumber(source.compPool);
    builder.writeNumber(source.commision);
    builder.writeNumber(source.fcc);
    return builder.build();
}

export function dictValueParserDebt(): DictionaryValue<Debt> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeDebt(src)).endCell());
        },
        parse: (src) => {
            return loadDebt(src.loadRef().beginParse());
        }
    }
}

export type CompPoolData = {
    $$type: 'CompPoolData';
    v: bigint;
    freezed: bigint;
    address: Address;
    balance: bigint;
    earnCoff: bigint;
    freezeCoff: bigint;
}

export function storeCompPoolData(src: CompPoolData) {
    return (builder: Builder) => {
        const b_0 = builder;
        b_0.storeUint(src.v, 32);
        b_0.storeCoins(src.freezed);
        b_0.storeAddress(src.address);
        b_0.storeCoins(src.balance);
        b_0.storeUint(src.earnCoff, 32);
        b_0.storeUint(src.freezeCoff, 32);
    };
}

export function loadCompPoolData(slice: Slice) {
    const sc_0 = slice;
    const _v = sc_0.loadUintBig(32);
    const _freezed = sc_0.loadCoins();
    const _address = sc_0.loadAddress();
    const _balance = sc_0.loadCoins();
    const _earnCoff = sc_0.loadUintBig(32);
    const _freezeCoff = sc_0.loadUintBig(32);
    return { $$type: 'CompPoolData' as const, v: _v, freezed: _freezed, address: _address, balance: _balance, earnCoff: _earnCoff, freezeCoff: _freezeCoff };
}

export function loadTupleCompPoolData(source: TupleReader) {
    const _v = source.readBigNumber();
    const _freezed = source.readBigNumber();
    const _address = source.readAddress();
    const _balance = source.readBigNumber();
    const _earnCoff = source.readBigNumber();
    const _freezeCoff = source.readBigNumber();
    return { $$type: 'CompPoolData' as const, v: _v, freezed: _freezed, address: _address, balance: _balance, earnCoff: _earnCoff, freezeCoff: _freezeCoff };
}

export function loadGetterTupleCompPoolData(source: TupleReader) {
    const _v = source.readBigNumber();
    const _freezed = source.readBigNumber();
    const _address = source.readAddress();
    const _balance = source.readBigNumber();
    const _earnCoff = source.readBigNumber();
    const _freezeCoff = source.readBigNumber();
    return { $$type: 'CompPoolData' as const, v: _v, freezed: _freezed, address: _address, balance: _balance, earnCoff: _earnCoff, freezeCoff: _freezeCoff };
}

export function storeTupleCompPoolData(source: CompPoolData) {
    const builder = new TupleBuilder();
    builder.writeNumber(source.v);
    builder.writeNumber(source.freezed);
    builder.writeAddress(source.address);
    builder.writeNumber(source.balance);
    builder.writeNumber(source.earnCoff);
    builder.writeNumber(source.freezeCoff);
    return builder.build();
}

export function dictValueParserCompPoolData(): DictionaryValue<CompPoolData> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeCompPoolData(src)).endCell());
        },
        parse: (src) => {
            return loadCompPoolData(src.loadRef().beginParse());
        }
    }
}

export type BorrowPool$Data = {
    $$type: 'BorrowPool$Data';
    id: bigint;
    name: string;
    maxTime: bigint;
    app: Address;
    acc: bigint;
    v: bigint;
}

export function storeBorrowPool$Data(src: BorrowPool$Data) {
    return (builder: Builder) => {
        const b_0 = builder;
        b_0.storeUint(src.id, 32);
        b_0.storeStringRefTail(src.name);
        b_0.storeUint(src.maxTime, 32);
        b_0.storeAddress(src.app);
        b_0.storeCoins(src.acc);
        b_0.storeUint(src.v, 32);
    };
}

export function loadBorrowPool$Data(slice: Slice) {
    const sc_0 = slice;
    const _id = sc_0.loadUintBig(32);
    const _name = sc_0.loadStringRefTail();
    const _maxTime = sc_0.loadUintBig(32);
    const _app = sc_0.loadAddress();
    const _acc = sc_0.loadCoins();
    const _v = sc_0.loadUintBig(32);
    return { $$type: 'BorrowPool$Data' as const, id: _id, name: _name, maxTime: _maxTime, app: _app, acc: _acc, v: _v };
}

export function loadTupleBorrowPool$Data(source: TupleReader) {
    const _id = source.readBigNumber();
    const _name = source.readString();
    const _maxTime = source.readBigNumber();
    const _app = source.readAddress();
    const _acc = source.readBigNumber();
    const _v = source.readBigNumber();
    return { $$type: 'BorrowPool$Data' as const, id: _id, name: _name, maxTime: _maxTime, app: _app, acc: _acc, v: _v };
}

export function loadGetterTupleBorrowPool$Data(source: TupleReader) {
    const _id = source.readBigNumber();
    const _name = source.readString();
    const _maxTime = source.readBigNumber();
    const _app = source.readAddress();
    const _acc = source.readBigNumber();
    const _v = source.readBigNumber();
    return { $$type: 'BorrowPool$Data' as const, id: _id, name: _name, maxTime: _maxTime, app: _app, acc: _acc, v: _v };
}

export function storeTupleBorrowPool$Data(source: BorrowPool$Data) {
    const builder = new TupleBuilder();
    builder.writeNumber(source.id);
    builder.writeString(source.name);
    builder.writeNumber(source.maxTime);
    builder.writeAddress(source.app);
    builder.writeNumber(source.acc);
    builder.writeNumber(source.v);
    return builder.build();
}

export function dictValueParserBorrowPool$Data(): DictionaryValue<BorrowPool$Data> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeBorrowPool$Data(src)).endCell());
        },
        parse: (src) => {
            return loadBorrowPool$Data(src.loadRef().beginParse());
        }
    }
}

export type CompensationPool$Data = {
    $$type: 'CompensationPool$Data';
    id: bigint;
    name: string;
    maxTime: bigint;
    app: Address;
    freezed: bigint;
    acc: bigint;
    v: bigint;
    fcc: bigint;
}

export function storeCompensationPool$Data(src: CompensationPool$Data) {
    return (builder: Builder) => {
        const b_0 = builder;
        b_0.storeUint(src.id, 32);
        b_0.storeStringRefTail(src.name);
        b_0.storeUint(src.maxTime, 32);
        b_0.storeAddress(src.app);
        b_0.storeCoins(src.freezed);
        b_0.storeUint(src.acc, 32);
        b_0.storeUint(src.v, 32);
        b_0.storeCoins(src.fcc);
    };
}

export function loadCompensationPool$Data(slice: Slice) {
    const sc_0 = slice;
    const _id = sc_0.loadUintBig(32);
    const _name = sc_0.loadStringRefTail();
    const _maxTime = sc_0.loadUintBig(32);
    const _app = sc_0.loadAddress();
    const _freezed = sc_0.loadCoins();
    const _acc = sc_0.loadUintBig(32);
    const _v = sc_0.loadUintBig(32);
    const _fcc = sc_0.loadCoins();
    return { $$type: 'CompensationPool$Data' as const, id: _id, name: _name, maxTime: _maxTime, app: _app, freezed: _freezed, acc: _acc, v: _v, fcc: _fcc };
}

export function loadTupleCompensationPool$Data(source: TupleReader) {
    const _id = source.readBigNumber();
    const _name = source.readString();
    const _maxTime = source.readBigNumber();
    const _app = source.readAddress();
    const _freezed = source.readBigNumber();
    const _acc = source.readBigNumber();
    const _v = source.readBigNumber();
    const _fcc = source.readBigNumber();
    return { $$type: 'CompensationPool$Data' as const, id: _id, name: _name, maxTime: _maxTime, app: _app, freezed: _freezed, acc: _acc, v: _v, fcc: _fcc };
}

export function loadGetterTupleCompensationPool$Data(source: TupleReader) {
    const _id = source.readBigNumber();
    const _name = source.readString();
    const _maxTime = source.readBigNumber();
    const _app = source.readAddress();
    const _freezed = source.readBigNumber();
    const _acc = source.readBigNumber();
    const _v = source.readBigNumber();
    const _fcc = source.readBigNumber();
    return { $$type: 'CompensationPool$Data' as const, id: _id, name: _name, maxTime: _maxTime, app: _app, freezed: _freezed, acc: _acc, v: _v, fcc: _fcc };
}

export function storeTupleCompensationPool$Data(source: CompensationPool$Data) {
    const builder = new TupleBuilder();
    builder.writeNumber(source.id);
    builder.writeString(source.name);
    builder.writeNumber(source.maxTime);
    builder.writeAddress(source.app);
    builder.writeNumber(source.freezed);
    builder.writeNumber(source.acc);
    builder.writeNumber(source.v);
    builder.writeNumber(source.fcc);
    return builder.build();
}

export function dictValueParserCompensationPool$Data(): DictionaryValue<CompensationPool$Data> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeCompensationPool$Data(src)).endCell());
        },
        parse: (src) => {
            return loadCompensationPool$Data(src.loadRef().beginParse());
        }
    }
}

export type AppContract$Data = {
    $$type: 'AppContract$Data';
    nowId: bigint;
}

export function storeAppContract$Data(src: AppContract$Data) {
    return (builder: Builder) => {
        const b_0 = builder;
        b_0.storeUint(src.nowId, 256);
    };
}

export function loadAppContract$Data(slice: Slice) {
    const sc_0 = slice;
    const _nowId = sc_0.loadUintBig(256);
    return { $$type: 'AppContract$Data' as const, nowId: _nowId };
}

export function loadTupleAppContract$Data(source: TupleReader) {
    const _nowId = source.readBigNumber();
    return { $$type: 'AppContract$Data' as const, nowId: _nowId };
}

export function loadGetterTupleAppContract$Data(source: TupleReader) {
    const _nowId = source.readBigNumber();
    return { $$type: 'AppContract$Data' as const, nowId: _nowId };
}

export function storeTupleAppContract$Data(source: AppContract$Data) {
    const builder = new TupleBuilder();
    builder.writeNumber(source.nowId);
    return builder.build();
}

export function dictValueParserAppContract$Data(): DictionaryValue<AppContract$Data> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeAppContract$Data(src)).endCell());
        },
        parse: (src) => {
            return loadAppContract$Data(src.loadRef().beginParse());
        }
    }
}

 type AppContract_init_args = {
    $$type: 'AppContract_init_args';
}

function initAppContract_init_args(src: AppContract_init_args) {
    return (builder: Builder) => {
        const b_0 = builder;
    };
}

async function AppContract_init() {
    const __code = Cell.fromHex('b5ee9c7241023c0100143700022cff008e88f4a413f4bcf2c80bed53208e8130e1ed43d90109020378e0020702012003050133b74cbda89a1a803f0c7a4000329a7fe02632460e3c403b678630040162f828db3c705920f90022f9005ad76501d76582020134c8cb17cb0fcb0fcbffcbff71f90400c87401cb0212ca07cbffc9d01a0133b64e1da89a1a803f0c7a4000329a7fe02632460e3c403b678630060162f828db3c705920f90022f9005ad76501d76582020134c8cb17cb0fcb0fcbffcbff71f90400c87401cb0212ca07cbffc9d0310133ba377ed44d0d401f863d2000194d3ff0131923071e201db3c318080162f828db3c705920f90022f9005ad76501d76582020134c8cb17cb0fcb0fcbffcbff71f90400c87401cb0212ca07cbffc9d03904c401d072d721d200d200fa4021103450666f04f86102f862ed44d0d401f863d2000194d3ff0131923071e202915be07021d74920c21f953101d31f02de218210a6872347bae3022182105ee94f23bae3022182101879d5e1bae30221821051757359ba0a0f101204fe5bfa40d30fd30f30f828136ddb3cf8284303db3c705920f90022f9005ad76501d76582020134c8cb17cb0fcb0fcbffcbff71f90400c87401cb0212ca07cbffc9d0f8416f24135f03726f00c8013082100fd66c7c01cb1fc95a6d6d40037fc8cf8580ca00cf8440ce01fa028069cf40025c6e016eb0935bcf818ae2f400c901360b0d0e01f6f843d0f40430208200da7b018010f40f6fa1f2e0876d22815422018010f40f6fa1f2e08781542201028010f417228200a60a018010f40f6fa1f2e0878200a60a01028010f41722820083df018010f40f6fa1f2e087820083df01028010f417028200e22c018010f40f6fa1f2e087128200e22c01028010f417c8010c0032c8f400cd7001ca0055315034cecbffce01c8810101cf00cdc9001a58cf8680cf8480f400f400cf810024fb00c8f84301cc7f01ca000101cbffc9ed54017c5f038200dd2bf8416f24135f03821005f5e100bef2f4f842f82871db3c30f842c8cf8508ce70cf0b6ec98042fb00c8f84301cc7f01ca000101cbffc9ed543602d65bd3ffd3fffa00d2000196810101d70031ded430d0d72c01916d93fa4001e230fa0030f8285230db3c705920f90022f9005ad76501d76582020134c8cb17cb0fcb0fcbffcbff71f90400c87401cb0212ca07cbffc9d0f8416f24135f0372f84210471036450070500812c8311101e4555082101879d5e15007cb1f15cbff13cbff01fa02216eb3997f01ca00810101cf00947032ca00e2c858206e9430cf84809201cee258fa02cdc941305a6d6d40037fc8cf8580ca00cf8440ce01fa028069cf40025c6e016eb0935bcf819d58cf8680cf8480f400f400cf81e2f400c901fb001d04fa8ff25bd401d001d31f3022a4f8416f24135f03f82815db3c5c705920f90022f9005ad76501d76582020134c8cb17cb0fcb0fcbffcbff71f90400c87401cb0212ca07cbffc9d08200dd2b27821008f0d180a1c200f2f4f842f8286ddb3cc822cf1628821008f0d180a1fa02c9820afaf0807358c8e02182100abf5c5fba1a36131501fc598210380789715003cb1fcb07ccc9706d50426d50427fc8cf8580ca00cf8440ce01fa028069cf40025c6e016eb0935bcf819d58cf8680cf8480f400f400cf81e2f400c901fb0006821008f0d180a1057205c859821045273be35003cb1f01c8cecdcb1fc926051046552010354144037fc8cf8580ca00cf8440ce01fa021401e28069cf40025c6e016eb0935bcf819d58cf8680cf8480f400f400cf81e2f400c901fb00820afaf080f842c801821022d38d5258cb1fcec91023706d50426d50427fc8cf8580ca00cf8440ce01fa028069cf40025c6e016eb0935bcf819d58cf8680cf8480f400f400cf81e2f400c901fb001d043ce3022182101e4758c2bae3022182109b407b7dbae302218210c4419947ba16191e2203fe5b810101d700d72c01916d93fa4001e230fa0030f842f8286ddb3cf8285230db3c705920f90022f9005ad76501d76582020134c8cb17cb0fcb0fcbffcbff71f90400c87401cb0212ca07cbffc9d0820afaf080f842c801821022d38d5258cb1fcec92259706d50426d50427fc8cf8580ca00cf8440ce01fa028069cf40025c361a1701fc6e016eb0935bcf819d58cf8680cf8480f400f400cf81e2f400c901fb008200a125f8416f24135f03821008f0d180bef2f4821005f5e100f842103514c8553082100abf5c5f5005cb1f13810101cf0001206e9430cf84809201cee201fa0201206e9430cf84809201cee2c9706d50426d50427fc8cf8580ca00cf8440ce0118006afa028069cf40025c6e016eb0935bcf819d58cf8680cf8480f400f400cf81e2f400c901fb00c8f84301cc7f01ca000101cbffc9ed5402fe5bd31f30f8285210db3c705920f90022f9005ad76501d76582020134c8cb17cb0fcb0fcbffcbff71f90400c87401cb0212ca07cbffc9d0820afaf080f842c801821022d38d5258cb1fcec92259706d50426d50427fc8cf8580ca00cf8440ce01fa028069cf40025c6e016eb0935bcf819d58cf8680cf8480f400f400cf81e21a1c01f6f843d0f4043020820083df018010f40f6fa1f2e0876d22815422018010f40f6fa1f2e08781542201028010f417228200e22c018010f40f6fa1f2e0878200e22c01028010f417228200a60a018010f40f6fa1f2e0878200a60a01028010f417028200da7b018010f40f6fa1f2e087128200da7b01028010f417c8011b0022c8f400cd7001ca005a02810101cf00cec901eaf400c901fb00f8416f24135f03816e7c01821005f5e100a1c200f2f4708042f84214c85982101e4758c25003cb1fcb1f01206e9430cf84809201cee2c941305a6d6d40037fc8cf8580ca00cf8440ce01fa028069cf40025c6e016eb0935bcf819d58cf8680cf8480f400f400cf81e2f400c901fb001d0020c8f84301cc7f01ca000101cbffc9ed5403e45bd401d001d31f3022a4f8416f24135f03f82815db3c5c705920f90022f9005ad76501d76582020134c8cb17cb0fcb0fcbffcbff71f90400c87401cb0212ca07cbffc9d08200dd2b27821008f0d180a1c200f2f4f842f8286ddb3cc822cf1628821008f0d180a1fa02c9820afaf0807358c831361f01fe598210380789715003cb1fcb07ccc9706d50426d50427fc8cf8580ca00cf8440ce01fa028069cf40025c6e016eb0935bcf819d58cf8680cf8480f400f400cf81e2f400c901fb0006821008f0d180a1c87001cb1f70fa02c930057205c859821005ae90f15003cb1f01c8cecdcb1fc926051046552010354144037fc8cf85802001feca00cf8440ce01fa028069cf40025c6e016eb0935bcf819d58cf8680cf8480f400f400cf81e2f400c901fb0082097d7840f842c80182109044198f58cb1fcec92359706d50426d50427fc8cf8580ca00cf8440ce01fa028069cf40025c6e016eb0935bcf819d58cf8680cf8480f400f400cf81e2f400c901fb0082097d78402100b2f842c801821022d38d5258cb1fcec91023706d50426d50427fc8cf8580ca00cf8440ce01fa028069cf40025c6e016eb0935bcf819d58cf8680cf8480f400f400cf81e2f400c901fb00c8f84301cc7f01ca000101cbffc9ed54043ce3022182108a6d35fcbae30221821052df2fbabae3022182108d887dd5ba2326292c03fe5b810101d700d72c01916d93fa4001e230fa0030f842f8286ddb3cf8285230db3c705920f90022f9005ad76501d76582020134c8cb17cb0fcb0fcbffcbff71f90400c87401cb0212ca07cbffc9d0820afaf080f842c80182109044198f58cb1fcec92259706d50426d50427fc8cf8580ca00cf8440ce01fa028069cf40025c36312401ee6e016eb0935bcf819d58cf8680cf8480f400f400cf81e2f400c901fb00820afaf080f842c801821022d38d5258cb1fcec92259706d50426d50427fc8cf8580ca00cf8440ce01fa028069cf40025c6e016eb0935bcf819d58cf8680cf8480f400f400cf81e2f400c901fb0082100bebc200f842103514c82500ec553082100abf5c5f5005cb1f13810101cf0001206e9430cf84809201cee201fa0201206e9430cf84809201cee2c9706d50426d50427fc8cf8580ca00cf8440ce01fa028069cf40025c6e016eb0935bcf819d58cf8680cf8480f400f400cf81e2f400c901fb00c8f84301cc7f01ca000101cbffc9ed5402fe5bd31f30f8285210db3c705920f90022f9005ad76501d76582020134c8cb17cb0fcb0fcbffcbff71f90400c87401cb0212ca07cbffc9d0820afaf080f842c80182109044198f58cb1fcec92259706d50426d50427fc8cf8580ca00cf8440ce01fa028069cf40025c6e016eb0935bcf819d58cf8680cf8480f400f400cf81e2312701faf400c901fb00820afaf080f842c801821022d38d5258cb1fcec92259706d50426d50427fc8cf8580ca00cf8440ce01fa028069cf40025c6e016eb0935bcf819d58cf8680cf8480f400f400cf81e2f400c901fb00f8416f24135f03816e7c01821008f0d180a1c200f2f4f8416f24135f03821008f0d180a172f84214c82800c45982108a6d35fc5003cb1fcb1f01206e9430cf84809201cee2c941305a6d6d40037fc8cf8580ca00cf8440ce01fa028069cf40025c6e016eb0935bcf819d58cf8680cf8480f400f400cf81e2f400c901fb00c8f84301cc7f01ca000101cbffc9ed5403fc5bd3ff308200f822f8416f24135f03821008f0d180a1c2fff2f4f842f8286ddb3cf8285220db3c5c705920f90022f9005ad76501d76582020134c8cb17cb0fcb0fcbffcbff71f90400c87401cb0212ca07cbffc9d0820afaf080f842c80182109044198f58cb1fcec92259706d50426d50427fc8cf8580ca00cf8440ce0136312a01f8fa028069cf40025c6e016eb0935bcf819d58cf8680cf8480f400f400cf81e2f400c901fb00820afaf080f842c801821022d38d5258cb1fcec92259706d50426d50427fc8cf8580ca00cf8440ce01fa028069cf40025c6e016eb0935bcf819d58cf8680cf8480f400f400cf81e2f400c901fb0004821005f5e10004c82b00be59821052df2fba5003cb1fcbff01206e9430cf84809201cee2c912705e407fc8cf8580ca00cf8440ce01fa028069cf40025c6e016eb0935bcf819d58cf8680cf8480f400f400cf81e2f400c901fb00c8f84301cc7f01ca000101cbffc9ed5404fee30221821094afcacdbae30221821068939123bae302218210946a98b6ba8e455bd33f30c8018210aff90f5758cb1fcb3fc9f84270705003804201503304c8cf8580ca00cf8440ce01fa02806acf40f400c901fb00c8f84301cc7f01ca000101cbffc9ed54e032c00001c121b08e10c8f84301cc7f01ca000101cbffc9ed542d30353b03fe5b810101d700308200f822f8416f24135f03821008f0d180a1c2fff2f4f842f8286ddb3cf8285220db3c705920f90022f9005ad76501d76582020134c8cb17cb0fcb0fcbffcbff71f90400c87401cb0212ca07cbffc9d0820afaf080f842c80182109044198f58cb1fcec92259706d50426d50427fc8cf8580ca00cf8440ce36312e01f601fa028069cf40025c6e016eb0935bcf819d58cf8680cf8480f400f400cf81e2f400c901fb00820afaf080f842c801821022d38d5258cb1fcec9706d50426d50427fc8cf8580ca00cf8440ce01fa028069cf40025c6e016eb0935bcf819d58cf8680cf8480f400f400cf81e2f400c901fb00821005f5e1005121c82f00cc5982108d887dd55003cb1f810101cf0001206e9430cf84809201cee2c912706d50426d50427fc8cf8580ca00cf8440ce01fa028069cf40025c6e016eb0935bcf819d58cf8680cf8480f400f400cf81e2f400c901fb00c8f84301cc7f01ca000101cbffc9ed5403fe5b810101d700308200f822f8416f24135f03821008f0d180a1c2fff2f4f842f8286ddb3cf8285220db3c705920f90022f9005ad76501d76582020134c8cb17cb0fcb0fcbffcbff71f90400c87401cb0212ca07cbffc9d0820afaf080f842c80182109044198f58cb1fcec92259706d50426d50427fc8cf8580ca00cf8440ce36313301f6f843d0f4043020815422018010f40f6fa1f2e0876d228200a60a018010f40f6fa1f2e0878200a60a01028010f41722820083df018010f40f6fa1f2e087820083df01028010f417228200e22c018010f40f6fa1f2e0878200e22c01028010f417028200da7b018010f40f6fa1f2e087128200da7b01028010f417c832002401c8f400cd7001ca005a02810101cf00cec901fa01fa028069cf40025c6e016eb0935bcf819d58cf8680cf8480f400f400cf81e2f400c901fb00820afaf080f842c801821022d38d5258cb1fcec92259706d50426d50427fc8cf8580ca00cf8440ce01fa028069cf40025c6e016eb0935bcf819d58cf8680cf8480f400f400cf81e2f400c901fb0002821005f5e10002c83400ca59821094afcacd5003cb1f810101cf0001206e9430cf84809201cee2c9706d50426d50427fc8cf8580ca00cf8440ce01fa028069cf40025c6e016eb0935bcf819d58cf8680cf8480f400f400cf81e2f400c901fb00c8f84301cc7f01ca000101cbffc9ed5401d45bd3ff30f842f8286ddb3cf8416f24135f0302c80182106893912358cb1fcbffc912706d50426d50427fc8cf8580ca00cf8440ce01fa028069cf40025c6e016eb0935bcf819d58cf8680cf8480f400f400cf81e2f400c901fb00c8f84301cc7f01ca000101cbffc9ed543603f66eb38f76db3c5c705920f90022f9005ad76501d76582020134c8cb17cb0fcb0fcbffcbff71f90400c87401cb0212ca07cbffc9d0821005f5e1007188230510341023460010354144037fc8cf8580ca00cf8440ce01fa028069cf40025c6e016eb0935bcf819d58cf8680cf8480f400f400cf81e2f400c901fb00e03937380000015edb3c705920f90022f9005ad76501d76582020134c8cb17cb0fcb0fcbffcbff71f90400c87401cb0212ca07cbffc9d03901f6f843d0f40430208200e22c018010f40f6fa1f2e0876d228200a60a018010f40f6fa1f2e0878200a60a01028010f41722815422018010f40f6fa1f2e08781542201028010f417228200da7b018010f40f6fa1f2e0878200da7b01028010f41702820083df018010f40f6fa1f2e08712820083df01028010f417c8013a001ac8f400cd7001ca005a02cecec9000ae030f2c082001649f2');
    const builder = beginCell();
    const __system = Cell.fromHex('b5ee9c7241029c01002ec9000101c00102012002250105bea114030228ff008e88f4a413f4bcf2c80bed5320e303ed43d9040c02027105070187bcb5376a2686a00fc31e90000c70b698fea00e800e98ffd207d00698fe98ffd002ab8360c470c408080eb807d202c816880b845842a3888900823081aaa81716d9e3640c06000226020120080b020120090a0187b6d81da89a1a803f0c7a400031c2da63fa803a003a63ff481f401a63fa63ff400aae0d8311c31020203ae01f480b205a202e11610a8e22240208c206aaa05c5b678d90302e0187b4e8dda89a1a803f0c7a400031c2da63fa803a003a63ff481f401a63fa63ff400aae0d8311c31020203ae01f480b205a202e11610a8e22240208c206aaa05c5b678d9030680187b84cbed44d0d401f863d200018e16d31fd401d001d31ffa40fa00d31fd31ffa0055706c188e18810101d700fa405902d101708b0854711120104610355502e2db3c6c8186103f83001d072d721d200d200fa4021103450666f04f86102f862ed44d0d401f863d200018e16d31fd401d001d31ffa40fa00d31fd31ffa0055706c188e18810101d700fa405902d101708b0854711120104610355502e209925f09e07028d74920c21f953108d31f09de218210d3c8679fbae30221821052df2fbabae3020d0f1101b85b07fa40fa00d31f3053217203c855208210d3c8679f5004cb1f12ce01fa02cb1fc95a6d6d40037fc8cf8580ca00cf8440ce01fa028069cf40025c6e016eb0935bcf819d58cf8680cf8480f400f400cf81e2f400c901fb00105755140e004ac8f84301cc7f01ca0055705078cb1f05c8ce15cd13cb1fce01fa02cb1fcb1f01fa02c9ed5403fe5b07d3ffd72c01916d93fa4001e2318200a7dcf84226c705f2f4206ef2d080f84212db3c5c705920f90022f9005ad76501d76582020134c8cb17cb0fcb0fcbffcbff71f90400c87401cb0212ca07cbffc9d0f8416f24135f035a725910246d4144037fc8cf8580ca00cf8440ce01fa028069cf40025c6e016eb0935bcf818a1299100060e2f400c901fb0010575514c8f84301cc7f01ca0055705078cb1f05c8ce15cd13cb1fce01fa02cb1fcb1f01fa02c9ed5404fa21821094afcacdba8f675b07810101d700d72c01916d93fa4001e2318200a7dcf84226c705f2f420206ef2d080f8425230db3c705920f90022f9005ad76501d76582020134c8cb17cb0fcb0fcbffcbff71f90400c87401cb0212ca07cbffc9d001206ef2d080f8416f24135f03037202c8e02182101879d5e1bae302211213141801f0f843d0f40430208200a60a018010f40f6fa1f2e0876d815422f82a028010f41722820083df018010f40f6fa1f2e087820083df01028010f417228200e22c018010f40f6fa1f2e0878200e22c01028010f417028200da7b018010f40f6fa1f2e087128200da7b01028010f417c801c8f400cd7001ca0055218800fc59821094afcacd5003cb1f810101cf0001206e9430cf84809201cee2c910235a6d6d40037fc8cf8580ca00cf8440ce01fa028069cf40025c6e016eb0935bcf819d58cf8680cf8480f400f400cf81e2f400c901fb0010575514c8f84301cc7f01ca0055705078cb1f05c8ce15cd13cb1fce01fa02cb1fcb1f01fa02c9ed5402fe5b07d3ffd3fffa00d2000196810101d70031ded430d0d72c01916d93fa4001e231813977f84228c705f2f482009c9cf8276f105337a0a1c2fff2f4f8276f105220a9041ca05151a00aa45336db3c705920f90022f9005ad76501d76582020134c8cb17cb0fcb0fcbffcbff71f90400c87401cb0212ca07cbffc9d0f8416f24151601eef843d0f4043020820083df018010f40f6fa1f2e0876d815422f82a028010f417228200e22c018010f40f6fa1f2e0878200e22c01028010f417228200a60a018010f40f6fa1f2e0878200a60a01028010f417028200da7b018010f40f6fa1f2e087128200da7b01028010f417c801c8f400cd7001ca005a9002fc135f0372f8276f105250a9041047103645f052b012c8555082101879d5e15007cb1f15cbff13cbff01fa02216eb3997f01ca00810101cf00947032ca00e2c858206e9430cf84809201cee258fa02cdc941301b5a6d6d40037fc8cf8580ca00cf8440ce01fa028069cf40025c6e016eb0935bcf818ae2f400c901fb0010579917005a1046103540145033c8f84301cc7f01ca0055705078cb1f05c8ce15cd13cb1fce01fa02cb1fcb1f01fa02c9ed5404de821005ae90f1ba8e3f5b343405d401d001d31f308200dfa7f84224c705f2f405446713c8f84301cc7f01ca0055705078cb1f05c8ce15cd13cb1fce01fa02cb1fcb1f01fa02c9ed54e021821068939123bae3022182109044198fbae30221821022d38d52bae3022182108a6d35fcba191a1b1c007e5b37f8416f24135f03f8276f10a904a006a41057104610354403c8f84301cc7f01ca0055705078cb1f05c8ce15cd13cb1fce01fa02cb1fcb1f01fa02c9ed54017c5b07fa4030c85270cb1f5280cb1f29fa02c976db3c10575514c8f84301cc7f01ca0055705078cb1f05c8ce15cd13cb1fce01fa02cb1fcb1f01fa02c9ed543f017c5b07fa4030c85270cb1f5280cb1f22fa02c975db3c10575514c8f84301cc7f01ca0055705078cb1f05c8ce15cd13cb1fce01fa02cb1fcb1f01fa02c9ed543f03fce3022182100abf5c5fbae302218210946a98b6ba8e665b07d33f30c8018210aff90f5758cb1fcb3fc91068105710461035443012f84270705003804201503304c8cf8580ca00cf8440ce01fa02806acf40f400c901fb00c8f84301cc7f01ca0055705078cb1f05c8ce15cd13cb1fce01fa02cb1fcb1f01fa02c9ed54e0391d212403fe5b07d31f31d72c01916d93fa4001e2318200dfa7f84225c705f2f4c8f828cf16f8416f24135f03820afaf080a1fa025280cb1f5220cb1f5290cb1fc901206ef2d080246ddb3c820afaf080735003c8598210380789715003cb1fcb07ccc912706d50426d50427fc8cf8580ca00cf8440ce01fa028069cf40025c6e016eb08a1e972003f66eb38f76db3c5c705920f90022f9005ad76501d76582020134c8cb17cb0fcb0fcbffcbff71f90400c87401cb0212ca07cbffc9d0821005f5e1007188230510341023460010354144037fc8cf8580ca00cf8440ce01fa028069cf40025c6e016eb0935bcf819d58cf8680cf8480f400f400cf81e2f400c901fb00e0223a1f015edb3c705920f90022f9005ad76501d76582020134c8cb17cb0fcb0fcbffcbff71f90400c87401cb0212ca07cbffc9d02201628ae2f400c901fb0010575514c8f84301cc7f01ca0055705078cb1f05c8ce15cd13cb1fce01fa02cb1fcb1f01fa02c9ed549902fe5b07810101d70031d72c01916d93fa4001e230fa00d72c01916d93fa4001e23120206ef2d08025db3c705920f90022f9005ad76501d76582020134c8cb17cb0fcb0fcbffcbff71f90400c87401cb0212ca07cbffc9d0813977f84258c705f2f4206ef2d08001706d5a6d6d40037fc8cf8580ca00cf8440ce01fa028069cf40222300f6f843d0f40430208200e22c018010f40f6fa1f2e0876d228200a60a018010f40f6fa1f2e0878200a60a01028010f417815422f82a028010f417228200da7b018010f40f6fa1f2e0878200da7b01028010f41702820083df018010f40f6fa1f2e08712820083df01028010f417c801c8f400cd7001ca005a02cecec90090025c6e016eb0935bcf819d58cf8680cf8480f400f400cf81e2f400c901fb0010575514c8f84301cc7f01ca0055705078cb1f05c8ce15cd13cb1fce01fa02cb1fcb1f01fa02c9ed540070c00008c12118b08e2910575514c8f84301cc7f01ca0055705078cb1f05c8ce15cd13cb1fce01fa02cb1fcb1f01fa02c9ed54e05f08f2c082020120264e02012027420105b47bf0280228ff008e88f4a413f4bcf2c80bed5320e303ed43d929300202712a2c0177bcb5376a2686a00fc31e90000c709698fea00e800e98ffd207d00698faaa8360b470a408080eb807d202c816880c584382980081a0811f16d9e3630c2b0002240201482d2f0177b6d81da89a1a803f0c7a400031c25a63fa803a003a63ff481f401a63eaaa0d82d1c29020203ae01f480b205a2031610e0a60020682047c5b678d8c302e0008f8276f100177b4e8dda89a1a803f0c7a400031c25a63fa803a003a63ff481f401a63eaaa0d82d1c29020203ae01f480b205a2031610e0a60020682047c5b678d8c306103f83001d072d721d200d200fa4021103450666f04f86102f862ed44d0d401f863d200018e12d31fd401d001d31ffa40fa00d31f55506c168e14810101d700fa405902d1018b0870530010341023e207925f07e07026d74920c21f953106d31f07de2182101879d5e1bae30221821045273be3bae30221821068939123ba31343503fe5b05d3ffd3fffa00d2000195810101d700926d01e2d430d0d72c01916d93fa4001e201fa00305346db3c705920f90022f9005ad76501d76582020134c8cb17cb0fcb0fcbffcbff71f90400c87401cb0212ca07cbffc9d0813977f84258c705f2f482009c9cf8276f1025a1c2fff2f421206ef2d080276ddb3c03206ef2d08032393301eef843d0f4043020815422018010f40f6fa1f2e0876d228200a60a018010f40f6fa1f2e0878200a60a01028010f417820083dff82a028010f417228200e22c018010f40f6fa1f2e0878200e22c01028010f417028200da7b018010f40f6fa1f2e087128200da7b01028010f417c801c8f400cd7001ca005a9001fc28b608103610257225477312c8555082101879d5e15007cb1f15cbff13cbff01fa02216eb3997f01ca00810101cf00947032ca00e2c858206e9430cf84809201cee258fa02cdc9125a6d6d40037fc8cf8580ca00cf8440ce01fa028069cf40025c6e016eb0935bcf819d58cf8680cf8480f400f400cf81e2f400c901fb004100705b6c2203d401d001d31f308200dfa7f84224c705f2f4035045c8f84301cc7f01ca0055505056cb1f03c8ce13cdcb1fce01fa02cb1fc9ed5404f88e535b35f8416f24135f0382104190ab00a882103dfd2400a9042082104190ab00a9045210a1a1821017d78400a815a005a410354430c8f84301cc7f01ca0055505056cb1f03c8ce13cdcb1fce01fa02cb1fc9ed54e02182100abf5c5fbae3022182101e4758c2bae30221821022d38d52bae302218210946a98b6ba36383e4002fe5b05810101d70031d72c01916d93fa4001e230fa00d72c01916d93fa4001e23120206ef2d08023db3c705920f90022f9005ad76501d76582020134c8cb17cb0fcb0fcbffcbff71f90400c87401cb0212ca07cbffc9d0813977f84258c705f2f4206ef2d08001706d5a6d6d40037fc8cf8580ca00cf8440ce01fa028069cf403c370084025c6e016eb0935bcf819d58cf8680cf8480f400f400cf81e2f400c901fb0010355512c8f84301cc7f01ca0055505056cb1f03c8ce13cdcb1fce01fa02cb1fc9ed5402fe5b05d31f31d72c01916d93fa4001e2318200dfa7f84223c705f2f4c8f828cf16f8416f24135f03820afaf080a1fa025270cb1f5260cb1f7001cb1fc901206ef2d080f8286ddb3c820afaf080735003c8598210380789715003cb1fcb07ccc912706d50426d50427fc8cf8580ca00cf8440ce01fa028069cf40025c6e016eb0393d03f66eb38f76db3c5c705920f90022f9005ad76501d76582020134c8cb17cb0fcb0fcbffcbff71f90400c87401cb0212ca07cbffc9d0821005f5e1007188230510341023460010354144037fc8cf8580ca00cf8440ce01fa028069cf40025c6e016eb0935bcf819d58cf8680cf8480f400f400cf81e2f400c901fb00e03c3a3b0000015edb3c705920f90022f9005ad76501d76582020134c8cb17cb0fcb0fcbffcbff71f90400c87401cb0212ca07cbffc9d03c00f4f843d0f40430208200e22c018010f40f6fa1f2e0876d228200a60a018010f40f6fa1f2e0878200a60a01028010f41722815422018010f40f6fa1f2e08781542201028010f417028200da7b018010f40f6fa1f2e087128200da7b01028010f417820083dff82a028010f417c801c8f400cd7001ca005a02cecec901728a9d58cf8680cf8480f400f400cf81e2f400c901fb0010355512c8f84301cc7f01ca0055505056cb1f03c8ce13cdcb1fce01fa02cb1fc9ed549701705b35c85240cb1f5260cb1f25fa02c9f8280176db3c10355512c8f84301cc7f01ca0055505056cb1f03c8ce13cdcb1fce01fa02cb1fc9ed543f009e820afaf080017203c8598210380789715003cb1fcb07ccc9125a6d6d40037fc8cf8580ca00cf8440ce01fa028069cf40025c6e016eb0935bcf819d58cf8680cf8480f400f400cf81e2f400c901fb0001dc8e5c5b05d33f30c8018210aff90f5758cb1fcb3fc910461035443012f84270705003804201503304c8cf8580ca00cf8440ce01fa02806acf40f400c901fb00c8f84301cc7f01ca0055505056cb1f03c8ce13cdcb1fce01fa02cb1fc9ed54e037c00006c12116b0e3025f06f2c08241004610355512c8f84301cc7f01ca0055505056cb1f03c8ce13cdcb1fce01fa02cb1fc9ed540105b4c150430114ff00208e8130e1f2c80b4404e401d072d721d200d200fa4021103450666f04f86102f862ed44d0d401f863d200019afa40d3fffa4055206c139bfa40d3fffa40552003d158e204925f04e07023d74920c21f953103d31f04de2182108d887dd5bae30221821094afcacdbae302218210946a98b6bae30234c00003c12113b045494c4d03fc5b02810101d700d72c01916d93fa4001e2315114db3c705920f90022f9005ad76501d76582020134c8cb17cb0fcb0fcbffcbff71f90400c87401cb0212ca07cbffc9d0813977f84212c705f2f4c801206ef2d080cf165220cbffc9820afaf0807458c8598210380789715003cb1fcb07ccc92259706d50426d50427fc8894a464700016002d8cf16ca00cf8440ce01fa028069cf40025c6e016eb0935bcf819d58cf8680cf8480f400f400cf81e2f400c901fb00f842708100a0885a6d6d40037fc8cf8580ca00cf8440ce01fa028069cf40025c6e016eb0935bcf819d58cf8680cf8480f400f400cf81e2f400c901fb000259480028c8f84301cc7f01ca0055205023cecbffcec9ed5403fe5b02810101d700d72c01916d93fa4001e2315114db3c705920f90022f9005ad76501d76582020134c8cb17cb0fcb0fcbffcbff71f90400c87401cb0212ca07cbffc9d0813977f84212c705f2f4c801206ef2d080cf165220cbffc930f842708100a0885a6d6d40037fc8cf8580ca00cf8440ce01fa028069cf40025c6e016e4a594b01eef843d0f4043020815422018010f40f6fa1f2e0876d8200a60af82a028010f41722820083df018010f40f6fa1f2e087820083df01028010f417228200e22c018010f40f6fa1f2e0878200e22c01028010f417028200da7b018010f40f6fa1f2e087128200da7b01028010f417c801c8f400cd7001ca005a90005eb0935bcf819d58cf8680cf8480f400f400cf81e2f400c901fb0002c8f84301cc7f01ca0055205023cecbffcec9ed5400965b02d33f30c8018210aff90f5758cb1fcb3fc913f84270705003804201503304c8cf8580ca00cf8440ce01fa02806acf40f400c901fb00c8f84301cc7f01ca0055205023cecbffcec9ed54003a8e1502c8f84301cc7f01ca0055205023cecbffcec9ed54e05f03f2c0820201204f5c0105b74f70500110ff0020e303f2c80b5101f83001d072d721d200d200fa4021103450666f04f86102f862ed44d0d401f863d200018e1ad31ffa40d31fd3fffa00fa40d401d0d33f301716151443306c178e20fa40d3fffa40d401d0810101d7003014433004d15502f8237020103610354044e208925f08e07027d74920c21f953107d31f08de21821069c9e7e5ba5204d48e4210235f033604d31ffa00308200dfa7f84225c705f2f4f82358a0104610354140c8f84301cc7f01ca0055605067cb1f14ce12cb1fcbff01fa02ce01c8cb3fcdc9ed54e021820b0514b1bae3022182100fd66c7cbae302218210b368a678bae302218210946a98b6ba5354585a006e5b06fa00308200dfa7f84226c705f2f4a110465513c8f84301cc7f01ca0055605067cb1f14ce12cb1fcbff01fa02ce01c8cb3fcdc9ed5401725b368200dfa7f84227c705f2f4f82327bee30010465513c8f84301cc7f01ca0055605067cb1f14ce12cb1fcbff01fa02ce01c8cb3fcdc9ed545502fe5315db3c705920f90022f9005ad76501d76582020134c8cb17cb0fcb0fcbffcbff71f90400c87401cb0212ca07cbffc9d02170268100a05139c855208210d3c8679f5004cb1f12ce01fa02cb1fc9125a6d6d40037fc8cf8580ca00cf8440ce01fa028069cf40025c6e016eb0935bcf819d58cf8680cf8480f400f400cf81e2565701eef843d0f4043020815422018010f40f6fa1f2e0876d228200a60a018010f40f6fa1f2e0878200a60a01028010f41722820083df018010f40f6fa1f2e087820083df01028010f417028200e22c018010f40f6fa1f2e087128200e22c01028010f4178200da7bf82a028010f417c801c8f400cd7001ca005a90000cf400c901fb0001e05b368200dfa7f84225c705f2f4f842708100a0885a6d6d40037fc8cf8580ca00cf8440ce01fa028069cf40025c6e016eb0935bcf819d58cf8680cf8480f400f400cf81e2f400c901fb0010465513c8f84301cc7f01ca0055605067cb1f14ce12cb1fcbff01fa02ce01c8cb3fcdc9ed5459002c00000000436f6e74726163742064657374726f79656401e48e605b06d33f30c8018210aff90f5758cb1fcb3fc91057104610354430f84270705003804201503304c8cf8580ca00cf8440ce01fa02806acf40f400c901fb00c8f84301cc7f01ca0055605067cb1f14ce12cb1fcbff01fa02ce01c8cb3fcdc9ed54e038c00007c12117b0e3025f07f2c0825b004c10465513c8f84301cc7f01ca0055605067cb1f14ce12cb1fcbff01fa02ce01c8cb3fcdc9ed540105b445905d0228ff008e88f4a413f4bcf2c80bed5320e303ed43d95e690202715f64020120606201a7b8a2fed44d0d401f863d200018e2afa40d2000195810101d700926d01e2810101d700d401d0fa40f404f404f404d31f301058105710566c188e14fa40fa405902d1016d7052026d50046d50036d01e2db3c6c8186100022301a7b8a87ed44d0d401f863d200018e2afa40d2000195810101d700926d01e2810101d700d401d0fa40f404f404f404d31f301058105710566c188e14fa40fa405902d1016d7052026d50046d50036d01e2db3c6c81863000221020120656701a7b98cded44d0d401f863d200018e2afa40d2000195810101d700926d01e2810101d700d401d0fa40f404f404f404d31f301058105710566c188e14fa40fa405902d1016d7052026d50046d50036d01e2db3c6c8186600022201a7b844bed44d0d401f863d200018e2afa40d2000195810101d700926d01e2810101d700d401d0fa40f404f404f404d31f301058105710566c188e14fa40fa405902d1016d7052026d50046d50036d01e2db3c6c8186800022501f23001d072d721d200d200fa4021103450666f04f86102f862ed44d0d401f863d200018e2afa40d2000195810101d700926d01e2810101d700d401d0fa40f404f404f404d31f301058105710566c188e14fa40fa405902d1016d7052026d50046d50036d01e209925f09e07028d74920c21f953108d31f09de216a04fe82108d887dd5ba8f6b5b07810101d700d72c01916d93fa4001e2318200dd6081010bf842255959f40b6fa192306ddf206e92306d8e13d0d31ffa00fa40fa00d31fd31f55506c166f06e2206ef2d0806f2610255f05821804a817c800bef2f48200a7dcf84226c705f2f420206ef2d0805325db3ce021821094afcacdbae302876b6c6f02fe705920f90022f9005ad76501d76582020134c8cb17cb0fcb0fcbffcbff71f90400c87401cb0212ca07cbffc9d001206ef2d080f8416f24135f03037202c85982108d887dd55003cb1f810101cf0001206e9430cf84809201cee2c910235a6d6d40037fc8cf8580ca00cf8440ce01fa028069cf40025c6e016eb0935bcf818a996e02b45b07810101d700d72c01916d93fa4001e2318200dd6081010bf842255959f40b6fa192306ddf206e92306d8e13d0d31ffa00fa40fa00d31fd31f55506c166f06e2206ef2d0806f2610255f05821804a817c800bef2f45314db3c8f6d02fe705920f90022f9005ad76501d76582020134c8cb17cb0fcb0fcbffcbff71f90400c87401cb0212ca07cbffc9d001206ef2d080f8416f24135f03037202c859821094afcacd5003cb1f810101cf0001206e9430cf84809201cee2c910235a6d6d40037fc8cf8580ca00cf8440ce01fa028069cf40025c6e016eb0935bcf818a996e0090e2f400c901fb0010575514c8f84301cc7f01ca0055705078ce256eb39a7f01ca0015810101cf009635705005ca00e213810101cf0001c8ce12f40012f40012f40012cb1fcdc9ed5404fe2182101879d5e1bae302218210688f23fbba8e555b3506d3ff3082009de4f84224c705f2f410570610355512c8f84301cc7f01ca0055705078ce256eb39a7f01ca0015810101cf009635705005ca00e213810101cf0001c8ce12f40012f40012f40012cb1fcdc9ed54e0218210d3c8679fbae30221821068939123bae302217074788002f45b07d3ffd3fffa00d2000195810101d700926d01e2d430d0d72c01916d93fa4001e201fa0030f82854759edb3c5c705920f90022f9005ad76501d76582020134c8cb17cb0fcb0fcbffcbff71f90400c87401cb0212ca07cbffc9d08176ae561083072a59f40e6fa192306ddf6eb3f2f426a70a8064a9045370a07a7101f6821008f0d180a12ec1009e8200d94521821077359400b9f2f48e1a2ec2ff932ec1149170e29e8200d9452182112a05f200bbf2f4dee227206ef2d080544145103c4bc71114a4050443138020111512c855505065fa0213cb1fcbffcbff58fa0201fa02c9102a01111001561001206e953059f45b30944133f417e27201fe820afaf080722841341b10246d4144037fc8cf8580ca00cf8440ce01fa028069cf40025c6e016eb0935bcf819d58cf8680cf8480f400f400cf81e2f400c901fb00820afaf0807203206ef2d0805005c859821069c9e7e55003cb1fcb1f01fa02c9103544405a6d6d40037fc8cf8580ca00cf8440ce01fa028069cf40025c6e7301bc016eb0935bcf819d58cf8680cf8480f400f400cf81e2f400c901fb00206ef2d08001716d5a6d6d40037fc8cf8580ca00cf8440ce01fa028069cf40025c6e016eb0935bcf819d58cf8680cf8480f400f400cf81e2f400c901fb00105755148303f65b07fa4031fa0031d31f302280202259f40f6fa192306ddf206e92306d8e13d0fa00d31fd3ffd3fffa00fa0055506c166f06e2206ef2d0806f26303327db3c705920f90022f9005ad76501d76582020134c8cb17cb0fcb0fcbffcbff71f90400c87401cb0212ca07cbffc9d0816878f8425220c705f2f45117db3c8f7d7501f4705920f90022f9005ad76501d76582020134c8cb17cb0fcb0fcbffcbff71f90400c87401cb0212ca07cbffc9d002a73c8064a9045330a180206dc8216e925b6d8e1e01206ef2d0806f26550555505065fa0213cb1fcbffcbff58fa0201fa02c9e227103a01206e953059f45b30944133f417e204aa0019a124c87602fe0182106893912358cb1fcbffc919706d50426d50427fc8cf8580ca00cf8440ce01fa028069cf40025c6e016eb0935bcf819d58cf8680cf8480f400f400cf81e2f400c901fb0002c80182106893912358cb1fcbffc914706d50426d50427fc8cf8580ca00cf8440ce01fa028069cf40025c6e016eb0935bcf818ae2f400c90199770086fb0010575514c8f84301cc7f01ca0055705078ce256eb39a7f01ca0015810101cf009635705005ca00e213810101cf0001c8ce12f40012f40012f40012cb1fcdc9ed5403a65b07d3ff3082009de4f84225c705f2f42280202259f40f6fa192306ddf206e92306d8e13d0fa00d31fd3ffd3fffa00fa0055506c166f06e2206ef2d0806f263033f8416f24135f035240a1c200e30f10575514797c8302f2135f03275253db3c705920f90022f9005ad76501d76582020134c8cb17cb0fcb0fcbffcbff71f90400c87401cb0212ca07cbffc9d0820afaf08072f8416f24135f03c801820b0514b158cb1f01fa02c95a6d6d40037fc8cf8580ca00cf8440ce01fa028069cf40025c6e016eb0935bcf818ae2f400c901fb007a9901eef843d0f40430208200da7b018010f40f6fa1f2e0876d22815422018010f40f6fa1f2e08781542201028010f417228200a60a018010f40f6fa1f2e0878200a60a01028010f41702820083df018010f40f6fa1f2e08712820083df01028010f4178200e22cf82a028010f417c801c8f400cd7001ca0055317b001e5034cecbffce01c8810101cf00cdc903e227db3c80206dc8216e925b6d8e1e01206ef2d0806f26550555505065fa0213cb1fcbffcbff58fa0201fa02c9e227103a01206e953059f45b30944133f417e207705920f90022f9005ad76501d76582020134c8cb17cb0fcb0fcbffcbff71f90400c87401cb0212ca07cbffc9d05117db3c8f7d7e01ecf843d0f4043020820083df018010f40f6fa1f2e0876d22815422018010f40f6fa1f2e08781542201028010f4178200e22cf82a028010f417228200a60a018010f40f6fa1f2e0878200a60a01028010f417028200da7b018010f40f6fa1f2e087128200da7b01028010f417c801c8f400cd7001ca005a9001fc705920f90022f9005ad76501d76582020134c8cb17cb0fcb0fcbffcbff71f90400c87401cb0212ca07cbffc9d002a73c8064a9045330a104aa0019a024c80182106893912358cb1fcbffc919706d50426d50427fc8cf8580ca00cf8440ce01fa028069cf40025c6e016eb0935bcf819d58cf8680cf8480f400f400cf81e27f009af400c901fb0002c80182106893912358cb1fcbffc9706d50426d50427fc8cf8580ca00cf8440ce01fa028069cf40025c6e016eb0935bcf819d58cf8680cf8480f400f400cf81e2f400c901fb0004fa821087de5ed3bae30221821038078971ba8f615b07d307d43021c0019a313403d0810101d700308f0621c003e30f03e210571046443512c8f84301cc7f01ca0055705078ce256eb39a7f01ca0015810101cf009635705005ca00e213810101cf0001c8ce12f40012f40012f40012cb1fcdc9ed54e02182100abf5c5fba8184869502ee5b07d3fffa00d3ff3025db3c705920f90022f9005ad76501d76582020134c8cb17cb0fcb0fcbffcbff71f90400c87401cb0212ca07cbffc9d08121a22481010b2359f40b6fa192306ddf206e92306d8e13d0d31ffa00fa40fa00d31fd31f55506c166f06e26eb3f2f42381010b2259f40b6fa192306ddf8f8201d0206e92306d8e13d0d31ffa00fa40fa00d31fd31f55506c166f06e2206ef2d0806f2633345226a9045220a15122a115a010455413014133060504431381010b5026c855505056cb1f5003fa02ce01fa02cb1fcb1fc912206e953059f45930944133f413e21057551483007ac8f84301cc7f01ca0055705078ce256eb39a7f01ca0015810101cf009635705005ca00e213810101cf0001c8ce12f40012f40012f40012cb1fcdc9ed5401fc31d0fa40fa002381010b2459f40b6fa192306ddf206e92306d8e13d0d31ffa00fa40fa00d31fd31f55506c166f06e26eb38e372381010b2459f40b6fa192306ddf206e92306d8e13d0d31ffa00fa40fa00d31fd31f55506c166f06e2206ef2d0806f2610255f0558a001ded31f7001d31fd31f302510450344440504431385005081010b5026c855505056cb1f5003fa02ce01fa02cb1fcb1fc912206e953059f45930944133f413e203e021c0048ed831d0fa40d3ff30f8285315db3c705920f90022f9005ad76501d76582020134c8cb17cb0fcb0fcbffcbff71f90400c87401cb0212ca07cbffc9d082009de4f84212c705f2f41028830702206e953059f45b30944133f416e28f0f21c0068e8701c0059130e30de30d06e20687898e01eef843d0f40430208200a60a018010f40f6fa1f2e0876d22815422018010f40f6fa1f2e08781542201028010f41722820083df018010f40f6fa1f2e087820083df01028010f4178200e22cf82a028010f417028200da7b018010f40f6fa1f2e087128200da7b01028010f417c801c8f400cd7001ca00552188000e5023cecbffcec902f6d0d31f5114db3c705920f90022f9005ad76501d76582020134c8cb17cb0fcb0fcbffcbff71f90400c87401cb0212ca07cbffc9d08121a22381010b2359f40b6fa192306ddf206e92306d8e13d0d31ffa00fa40fa00d31fd31f55506c166f06e26eb3f2f401fa00d31f308121a22481010b2559f40b6fa192306ddf8f8a01e0206e92306d8e13d0d31ffa00fa40fa00d31fd31f55506c166f06e2206ef2d0806f265f0522bdf2f42381010b2459f40b6fa192306ddf206e92306d8e13d0d31ffa00fa40fa00d31fd31f55506c166f06e2206ef2d0806f2610255f055320a85210a02581010b2659f40b6fa192306ddf8b01da206e92306d8e13d0d31ffa00fa40fa00d31fd31f55506c166f06e2206ef2d0806f26155f0522a8a12581010b2659f40b6fa192306ddf206e92306d8e13d0d31ffa00fa40fa00d31fd31f55506c166f06e2206ef2d0806f26155f055042a8a02481010b2559f40b6fa192306ddf8c01f8206e92306d8e13d0d31ffa00fa40fa00d31fd31f55506c166f06e2206ef2d0806f2610455f052581010b2659f40b6fa192306ddf206e92306d8e13d0d31ffa00fa40fa00d31fd31f55506c166f06e2206ef2d0806f266c511354140550330504431381010b5026c855505056cb1f5003fa02ce01fa02cb1fcb1fc9128d001c206e953059f45930944133f413e202f831d0d31f5114db3c705920f90022f9005ad76501d76582020134c8cb17cb0fcb0fcbffcbff71f90400c87401cb0212ca07cbffc9d08121a22381010b2359f40b6fa192306ddf206e92306d8e13d0d31ffa00fa40fa00d31fd31f55506c166f06e26eb3f2f401fa00d31f308121a22481010b2559f40b6fa192306ddf8f9101eef843d0f4043020815422018010f40f6fa1f2e0876d228200a60a018010f40f6fa1f2e0878200a60a01028010f41722820083df018010f40f6fa1f2e087820083df01028010f4178200e22cf82a028010f417028200da7b018010f40f6fa1f2e087128200da7b01028010f417c801c8f400cd7001ca005a90001002810101cf00cec901d4206e92306d8e13d0d31ffa00fa40fa00d31fd31f55506c166f06e2206ef2d0806f265f0522bdf2f42381010b2459f40b6fa192306ddf206e92306d8e13d0d31ffa00fa40fa00d31fd31f55506c166f06e2206ef2d0806f2610255f052481010b2559f40b6fa192306ddf9201de206e92306d8e13d0d31ffa00fa40fa00d31fd31f55506c166f06e2206ef2d0806f2610455f055331a85220a12681010b2759f40b6fa192306ddf206e92306d8e13d0d31ffa00fa40fa00d31fd31f55506c166f06e2206ef2d0806f266c5123a8a12681010b2759f40b6fa192306ddf9301fe206e92306d8e13d0d31ffa00fa40fa00d31fd31f55506c166f06e2206ef2d0806f266c5125a05053a8a02581010b2659f40b6fa192306ddf206e92306d8e13d0d31ffa00fa40fa00d31fd31f55506c166f06e2206ef2d0806f26155f0513541405030504431381010b5026c855505056cb1f5003fa02ce01fa02cb1fcb1fc994001e12206e953059f45930944133f413e202f68ef75b07810101d700d72c01916d93fa4001e201fa00d72c01916d93fa4001e231813977f84228c705f2f402206ef2d0802481010b2259f40b6fa192306ddf206e92306d8e13d0d31ffa00fa40fa00d31fd31f55506c166f06e2206ef2d0806f265127a182009c9c21c2fff2f410451035102581010b5026c8e021969a02fe55505056cb1f5003fa02ce01fa02cb1fcb1fc922103701206e953059f45930944133f413e213820afaf080544554c8553082100abf5c5f5005cb1f13810101cf0001206e9430cf84809201cee201fa0201206e9430cf84809201cee2c94330706d50426d50427fc8cf8580ca00cf8440ce01fa028069cf40025c6e016eb08a979800065bcf8101928ae2f400c901fb0010575514c8f84301cc7f01ca0055705078ce256eb39a7f01ca0015810101cf009635705005ca00e213810101cf0001c8ce12f40012f40012f40012cb1fcdc9ed5499001a58cf8680cf8480f400f400cf8101b48210946a98b6bae30239c00008c12118b08e4110575514c8f84301cc7f01ca0055705078ce256eb39a7f01ca0015810101cf009635705005ca00e213810101cf0001c8ce12f40012f40012f40012cb1fcdc9ed54e05f08f2c0829b00fc5b07d33f30c8018210aff90f5758cb1fcb3fc91068105710461035443012f84270705003804201503304c8cf8580ca00cf8440ce01fa02806acf40f400c901fb00c8f84301cc7f01ca0055705078ce256eb39a7f01ca0015810101cf009635705005ca00e213810101cf0001c8ce12f40012f40012f40012cb1fcdc9ed547da1b673');
    builder.storeRef(__system);
    builder.storeUint(0, 1);
    initAppContract_init_args({ $$type: 'AppContract_init_args' })(builder);
    const __data = builder.endCell();
    return { code: __code, data: __data };
}

export const AppContract_errors = {
    2: { message: "Stack underflow" },
    3: { message: "Stack overflow" },
    4: { message: "Integer overflow" },
    5: { message: "Integer out of expected range" },
    6: { message: "Invalid opcode" },
    7: { message: "Type check error" },
    8: { message: "Cell overflow" },
    9: { message: "Cell underflow" },
    10: { message: "Dictionary error" },
    11: { message: "'Unknown' error" },
    12: { message: "Fatal error" },
    13: { message: "Out of gas error" },
    14: { message: "Virtualization error" },
    32: { message: "Action list is invalid" },
    33: { message: "Action list is too long" },
    34: { message: "Action is invalid or not supported" },
    35: { message: "Invalid source address in outbound message" },
    36: { message: "Invalid destination address in outbound message" },
    37: { message: "Not enough Toncoin" },
    38: { message: "Not enough extra currencies" },
    39: { message: "Outbound message does not fit into a cell after rewriting" },
    40: { message: "Cannot process a message" },
    41: { message: "Library reference is null" },
    42: { message: "Library change action error" },
    43: { message: "Exceeded maximum number of cells in the library or the maximum depth of the Merkle tree" },
    50: { message: "Account state size exceeded limits" },
    128: { message: "Null reference exception" },
    129: { message: "Invalid serialization prefix" },
    130: { message: "Invalid incoming message" },
    131: { message: "Constraints error" },
    132: { message: "Access denied" },
    133: { message: "Contract stopped" },
    134: { message: "Invalid argument" },
    135: { message: "Code of a contract was not found" },
    136: { message: "Invalid standard address" },
    138: { message: "Not a basechain address" },
    8610: { message: "" },
    14711: { message: "Not enought rights" },
    26744: { message: "You must obtain permission from the Compensation Pool." },
    28284: { message: "Not enough TON sent" },
    30382: { message: "You must obtain permission from this Compensation Pool." },
    40092: { message: "Not enought funds" },
    40420: { message: "Not enought rights!" },
    41253: { message: "Not enought funs!" },
    42972: { message: "Not enough rights" },
    55621: { message: "Your rating only allows you to take less than 2" },
    56619: { message: "Insufficient funds for deploy" },
    56672: { message: "You dont have enought rights in this pool" },
    57255: { message: "Not enough rights!" },
    63522: { message: "Not enought funds!" },
} as const

export const AppContract_errors_backward = {
    "Stack underflow": 2,
    "Stack overflow": 3,
    "Integer overflow": 4,
    "Integer out of expected range": 5,
    "Invalid opcode": 6,
    "Type check error": 7,
    "Cell overflow": 8,
    "Cell underflow": 9,
    "Dictionary error": 10,
    "'Unknown' error": 11,
    "Fatal error": 12,
    "Out of gas error": 13,
    "Virtualization error": 14,
    "Action list is invalid": 32,
    "Action list is too long": 33,
    "Action is invalid or not supported": 34,
    "Invalid source address in outbound message": 35,
    "Invalid destination address in outbound message": 36,
    "Not enough Toncoin": 37,
    "Not enough extra currencies": 38,
    "Outbound message does not fit into a cell after rewriting": 39,
    "Cannot process a message": 40,
    "Library reference is null": 41,
    "Library change action error": 42,
    "Exceeded maximum number of cells in the library or the maximum depth of the Merkle tree": 43,
    "Account state size exceeded limits": 50,
    "Null reference exception": 128,
    "Invalid serialization prefix": 129,
    "Invalid incoming message": 130,
    "Constraints error": 131,
    "Access denied": 132,
    "Contract stopped": 133,
    "Invalid argument": 134,
    "Code of a contract was not found": 135,
    "Invalid standard address": 136,
    "Not a basechain address": 138,
    "": 8610,
    "Not enought rights": 14711,
    "You must obtain permission from the Compensation Pool.": 26744,
    "Not enough TON sent": 28284,
    "You must obtain permission from this Compensation Pool.": 30382,
    "Not enought funds": 40092,
    "Not enought rights!": 40420,
    "Not enought funs!": 41253,
    "Not enough rights": 42972,
    "Your rating only allows you to take less than 2": 55621,
    "Insufficient funds for deploy": 56619,
    "You dont have enought rights in this pool": 56672,
    "Not enough rights!": 57255,
    "Not enought funds!": 63522,
} as const

const AppContract_types: ABIType[] = [
    {"name":"DataSize","header":null,"fields":[{"name":"cells","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"bits","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"refs","type":{"kind":"simple","type":"int","optional":false,"format":257}}]},
    {"name":"SignedBundle","header":null,"fields":[{"name":"signature","type":{"kind":"simple","type":"fixed-bytes","optional":false,"format":64}},{"name":"signedData","type":{"kind":"simple","type":"slice","optional":false,"format":"remainder"}}]},
    {"name":"StateInit","header":null,"fields":[{"name":"code","type":{"kind":"simple","type":"cell","optional":false}},{"name":"data","type":{"kind":"simple","type":"cell","optional":false}}]},
    {"name":"Context","header":null,"fields":[{"name":"bounceable","type":{"kind":"simple","type":"bool","optional":false}},{"name":"sender","type":{"kind":"simple","type":"address","optional":false}},{"name":"value","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"raw","type":{"kind":"simple","type":"slice","optional":false}}]},
    {"name":"SendParameters","header":null,"fields":[{"name":"mode","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"body","type":{"kind":"simple","type":"cell","optional":true}},{"name":"code","type":{"kind":"simple","type":"cell","optional":true}},{"name":"data","type":{"kind":"simple","type":"cell","optional":true}},{"name":"value","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"to","type":{"kind":"simple","type":"address","optional":false}},{"name":"bounce","type":{"kind":"simple","type":"bool","optional":false}}]},
    {"name":"MessageParameters","header":null,"fields":[{"name":"mode","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"body","type":{"kind":"simple","type":"cell","optional":true}},{"name":"value","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"to","type":{"kind":"simple","type":"address","optional":false}},{"name":"bounce","type":{"kind":"simple","type":"bool","optional":false}}]},
    {"name":"DeployParameters","header":null,"fields":[{"name":"mode","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"body","type":{"kind":"simple","type":"cell","optional":true}},{"name":"value","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"bounce","type":{"kind":"simple","type":"bool","optional":false}},{"name":"init","type":{"kind":"simple","type":"StateInit","optional":false}}]},
    {"name":"StdAddress","header":null,"fields":[{"name":"workchain","type":{"kind":"simple","type":"int","optional":false,"format":8}},{"name":"address","type":{"kind":"simple","type":"uint","optional":false,"format":256}}]},
    {"name":"VarAddress","header":null,"fields":[{"name":"workchain","type":{"kind":"simple","type":"int","optional":false,"format":32}},{"name":"address","type":{"kind":"simple","type":"slice","optional":false}}]},
    {"name":"BasechainAddress","header":null,"fields":[{"name":"hash","type":{"kind":"simple","type":"int","optional":true,"format":257}}]},
    {"name":"Deploy","header":2490013878,"fields":[{"name":"queryId","type":{"kind":"simple","type":"uint","optional":false,"format":64}}]},
    {"name":"DeployOk","header":2952335191,"fields":[{"name":"queryId","type":{"kind":"simple","type":"uint","optional":false,"format":64}}]},
    {"name":"FactoryDeploy","header":1829761339,"fields":[{"name":"queryId","type":{"kind":"simple","type":"uint","optional":false,"format":64}},{"name":"cashback","type":{"kind":"simple","type":"address","optional":false}}]},
    {"name":"AddTelegramId","header":1754211323,"fields":[{"name":"id","type":{"kind":"simple","type":"uint","optional":false,"format":256}}]},
    {"name":"ChangeVal","header":940018033,"fields":[{"name":"val","type":{"kind":"simple","type":"uint","optional":false,"format":8}},{"name":"newVal","type":{"kind":"simple","type":"cell","optional":false}}]},
    {"name":"SendData","header":2298462272,"fields":[{"name":"val","type":{"kind":"simple","type":"uint","optional":false,"format":8}},{"name":"data","type":{"kind":"simple","type":"cell","optional":false}}]},
    {"name":"RequestContract$Data","header":null,"fields":[{"name":"address","type":{"kind":"simple","type":"address","optional":false}},{"name":"pool","type":{"kind":"simple","type":"uint","optional":false,"format":256}},{"name":"app","type":{"kind":"simple","type":"address","optional":false}}]},
    {"name":"BorrowContract$Data","header":null,"fields":[{"name":"id","type":{"kind":"simple","type":"uint","optional":false,"format":32}},{"name":"address","type":{"kind":"simple","type":"address","optional":false}},{"name":"createdTime","type":{"kind":"simple","type":"uint","optional":false,"format":32}},{"name":"pool","type":{"kind":"simple","type":"uint","optional":false,"format":256}},{"name":"sum","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"app","type":{"kind":"simple","type":"address","optional":false}},{"name":"endTime","type":{"kind":"simple","type":"uint","optional":false,"format":64}}]},
    {"name":"User$Data","header":null,"fields":[{"name":"address","type":{"kind":"simple","type":"address","optional":false}},{"name":"telegramId","type":{"kind":"simple","type":"int","optional":true,"format":257}},{"name":"rating","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"app","type":{"kind":"simple","type":"address","optional":false}},{"name":"debts","type":{"kind":"dict","key":"uint","keyFormat":32,"value":"Debt","valueFormat":"ref"}},{"name":"investedIn","type":{"kind":"dict","key":"address","value":"CompPoolData","valueFormat":"ref"}},{"name":"compensationPools","type":{"kind":"dict","key":"uint","keyFormat":256,"value":"address"}},{"name":"debtId","type":{"kind":"simple","type":"uint","optional":false,"format":32}}]},
    {"name":"Overdue","header":3553126303,"fields":[{"name":"address","type":{"kind":"simple","type":"address","optional":false}},{"name":"sum","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"id","type":{"kind":"simple","type":"uint","optional":false,"format":32}}]},
    {"name":"Time","header":2793874247,"fields":[{"name":"address","type":{"kind":"simple","type":"address","optional":false}},{"name":"id","type":{"kind":"simple","type":"uint","optional":false,"format":16}},{"name":"pool","type":{"kind":"simple","type":"uint","optional":false,"format":16}}]},
    {"name":"Changesum","header":50664625,"fields":[{"name":"sum","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}}]},
    {"name":"Borrow","header":410637793,"fields":[{"name":"idBorrow","type":{"kind":"simple","type":"uint","optional":false,"format":256}},{"name":"idComp","type":{"kind":"simple","type":"uint","optional":false,"format":256}},{"name":"amount","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"time","type":{"kind":"simple","type":"int","optional":true,"format":257}},{"name":"to","type":{"kind":"simple","type":"address","optional":true}},{"name":"fcc","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}}]},
    {"name":"InitBorrow","header":1774839781,"fields":[{"name":"endTime","type":{"kind":"simple","type":"uint","optional":false,"format":32}},{"name":"sum","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}}]},
    {"name":"CheckTime","header":265710716,"fields":[]},
    {"name":"Close","header":3009980024,"fields":[]},
    {"name":"Update","header":2420382095,"fields":[{"name":"sender","type":{"kind":"simple","type":"address","optional":false}}]},
    {"name":"Unfreeze","header":2279497427,"fields":[{"name":"v","type":{"kind":"simple","type":"uint","optional":false,"format":256}},{"name":"fcc","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"id","type":{"kind":"simple","type":"uint","optional":false,"format":256}}]},
    {"name":"UpdateEarn","header":584289618,"fields":[{"name":"sender","type":{"kind":"simple","type":"address","optional":false}}]},
    {"name":"Repay","header":1754501411,"fields":[{"name":"id","type":{"kind":"simple","type":"uint","optional":false,"format":256}}]},
    {"name":"Request","header":1390358458,"fields":[{"name":"id","type":{"kind":"simple","type":"uint","optional":false,"format":256}},{"name":"user","type":{"kind":"simple","type":"address","optional":true}}]},
    {"name":"Approve","header":2374532565,"fields":[{"name":"id","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"user","type":{"kind":"simple","type":"address","optional":true}}]},
    {"name":"Decline","header":2494548685,"fields":[{"name":"id","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"user","type":{"kind":"simple","type":"address","optional":true}}]},
    {"name":"Withdraw","header":180313183,"fields":[{"name":"from","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"from2","type":{"kind":"simple","type":"address","optional":true}},{"name":"amount","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"to1","type":{"kind":"simple","type":"address","optional":true}}]},
    {"name":"WithdrawFromComp","header":3292633415,"fields":[{"name":"from","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"from2","type":{"kind":"simple","type":"address","optional":true}},{"name":"amount","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"to1","type":{"kind":"simple","type":"address","optional":true}}]},
    {"name":"InitCompensationPool","header":95326449,"fields":[{"name":"name","type":{"kind":"simple","type":"string","optional":false}},{"name":"maxTime","type":{"kind":"simple","type":"uint","optional":false,"format":32}}]},
    {"name":"CreateBorrowPool","header":1366651737,"fields":[{"name":"name","type":{"kind":"simple","type":"string","optional":false}},{"name":"maxTime","type":{"kind":"simple","type":"uint","optional":false,"format":32}}]},
    {"name":"CreateCompensationPool","header":2604694397,"fields":[{"name":"name","type":{"kind":"simple","type":"string","optional":false}},{"name":"maxTime","type":{"kind":"simple","type":"uint","optional":false,"format":32}}]},
    {"name":"Login","header":1592348451,"fields":[]},
    {"name":"Deposit","header":507992258,"fields":[{"name":"id","type":{"kind":"simple","type":"uint","optional":false,"format":32}},{"name":"sender","type":{"kind":"simple","type":"address","optional":true}}]},
    {"name":"DepositToComp","header":2322413052,"fields":[{"name":"id","type":{"kind":"simple","type":"uint","optional":false,"format":32}},{"name":"sender","type":{"kind":"simple","type":"address","optional":true}}]},
    {"name":"InitBorrowPool","header":1160199139,"fields":[{"name":"name","type":{"kind":"simple","type":"string","optional":false}},{"name":"maxTime","type":{"kind":"simple","type":"uint","optional":false,"format":32}}]},
    {"name":"Debt","header":null,"fields":[{"name":"sum","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"timetoreturn","type":{"kind":"simple","type":"uint","optional":false,"format":32}},{"name":"borrowPool","type":{"kind":"simple","type":"uint","optional":false,"format":256}},{"name":"compPool","type":{"kind":"simple","type":"uint","optional":false,"format":256}},{"name":"commision","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"fcc","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}}]},
    {"name":"CompPoolData","header":null,"fields":[{"name":"v","type":{"kind":"simple","type":"uint","optional":false,"format":32}},{"name":"freezed","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"address","type":{"kind":"simple","type":"address","optional":false}},{"name":"balance","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"earnCoff","type":{"kind":"simple","type":"uint","optional":false,"format":32}},{"name":"freezeCoff","type":{"kind":"simple","type":"uint","optional":false,"format":32}}]},
    {"name":"BorrowPool$Data","header":null,"fields":[{"name":"id","type":{"kind":"simple","type":"uint","optional":false,"format":32}},{"name":"name","type":{"kind":"simple","type":"string","optional":false}},{"name":"maxTime","type":{"kind":"simple","type":"uint","optional":false,"format":32}},{"name":"app","type":{"kind":"simple","type":"address","optional":false}},{"name":"acc","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"v","type":{"kind":"simple","type":"uint","optional":false,"format":32}}]},
    {"name":"CompensationPool$Data","header":null,"fields":[{"name":"id","type":{"kind":"simple","type":"uint","optional":false,"format":32}},{"name":"name","type":{"kind":"simple","type":"string","optional":false}},{"name":"maxTime","type":{"kind":"simple","type":"uint","optional":false,"format":32}},{"name":"app","type":{"kind":"simple","type":"address","optional":false}},{"name":"freezed","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"acc","type":{"kind":"simple","type":"uint","optional":false,"format":32}},{"name":"v","type":{"kind":"simple","type":"uint","optional":false,"format":32}},{"name":"fcc","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}}]},
    {"name":"AppContract$Data","header":null,"fields":[{"name":"nowId","type":{"kind":"simple","type":"uint","optional":false,"format":256}}]},
]

const AppContract_opcodes = {
    "Deploy": 2490013878,
    "DeployOk": 2952335191,
    "FactoryDeploy": 1829761339,
    "AddTelegramId": 1754211323,
    "ChangeVal": 940018033,
    "SendData": 2298462272,
    "Overdue": 3553126303,
    "Time": 2793874247,
    "Changesum": 50664625,
    "Borrow": 410637793,
    "InitBorrow": 1774839781,
    "CheckTime": 265710716,
    "Close": 3009980024,
    "Update": 2420382095,
    "Unfreeze": 2279497427,
    "UpdateEarn": 584289618,
    "Repay": 1754501411,
    "Request": 1390358458,
    "Approve": 2374532565,
    "Decline": 2494548685,
    "Withdraw": 180313183,
    "WithdrawFromComp": 3292633415,
    "InitCompensationPool": 95326449,
    "CreateBorrowPool": 1366651737,
    "CreateCompensationPool": 2604694397,
    "Login": 1592348451,
    "Deposit": 507992258,
    "DepositToComp": 2322413052,
    "InitBorrowPool": 1160199139,
}

const AppContract_getters: ABIGetter[] = [
    {"name":"usersData","methodId":123767,"arguments":[{"name":"address","type":{"kind":"simple","type":"address","optional":false}}],"returnType":{"kind":"simple","type":"address","optional":false}},
    {"name":"borrowPools","methodId":105061,"arguments":[{"name":"id","type":{"kind":"simple","type":"int","optional":false,"format":257}}],"returnType":{"kind":"simple","type":"address","optional":false}},
    {"name":"compPools","methodId":111216,"arguments":[{"name":"id","type":{"kind":"simple","type":"int","optional":false,"format":257}}],"returnType":{"kind":"simple","type":"address","optional":false}},
]

export const AppContract_getterMapping: { [key: string]: string } = {
    'usersData': 'getUsersData',
    'borrowPools': 'getBorrowPools',
    'compPools': 'getCompPools',
}

const AppContract_receivers: ABIReceiver[] = [
    {"receiver":"internal","message":{"kind":"empty"}},
    {"receiver":"internal","message":{"kind":"typed","type":"Time"}},
    {"receiver":"internal","message":{"kind":"typed","type":"Login"}},
    {"receiver":"internal","message":{"kind":"typed","type":"Borrow"}},
    {"receiver":"internal","message":{"kind":"typed","type":"CreateBorrowPool"}},
    {"receiver":"internal","message":{"kind":"typed","type":"Withdraw"}},
    {"receiver":"internal","message":{"kind":"typed","type":"Deposit"}},
    {"receiver":"internal","message":{"kind":"typed","type":"CreateCompensationPool"}},
    {"receiver":"internal","message":{"kind":"typed","type":"WithdrawFromComp"}},
    {"receiver":"internal","message":{"kind":"typed","type":"DepositToComp"}},
    {"receiver":"internal","message":{"kind":"typed","type":"Request"}},
    {"receiver":"internal","message":{"kind":"typed","type":"Approve"}},
    {"receiver":"internal","message":{"kind":"typed","type":"Decline"}},
    {"receiver":"internal","message":{"kind":"typed","type":"Repay"}},
    {"receiver":"internal","message":{"kind":"typed","type":"Deploy"}},
]


export class AppContract implements Contract {
    
    public static readonly storageReserve = 0n;
    public static readonly errors = AppContract_errors_backward;
    public static readonly opcodes = AppContract_opcodes;
    
    static async init() {
        return await AppContract_init();
    }
    
    static async fromInit() {
        const __gen_init = await AppContract_init();
        const address = contractAddress(0, __gen_init);
        return new AppContract(address, __gen_init);
    }
    
    static fromAddress(address: Address) {
        return new AppContract(address);
    }
    
    readonly address: Address; 
    readonly init?: { code: Cell, data: Cell };
    readonly abi: ContractABI = {
        types:  AppContract_types,
        getters: AppContract_getters,
        receivers: AppContract_receivers,
        errors: AppContract_errors,
    };
    
    constructor(address: Address, init?: { code: Cell, data: Cell }) {
        this.address = address;
        this.init = init;
    }
    
    async send(provider: ContractProvider, via: Sender, args: { value: bigint, bounce?: boolean| null | undefined }, message: null | Time | Login | Borrow | CreateBorrowPool | Withdraw | Deposit | CreateCompensationPool | WithdrawFromComp | DepositToComp | Request | Approve | Decline | Repay | Deploy) {
        
        let body: Cell | null = null;
        if (message === null) {
            body = new Cell();
        }
        if (message && typeof message === 'object' && !(message instanceof Slice) && message.$$type === 'Time') {
            body = beginCell().store(storeTime(message)).endCell();
        }
        if (message && typeof message === 'object' && !(message instanceof Slice) && message.$$type === 'Login') {
            body = beginCell().store(storeLogin(message)).endCell();
        }
        if (message && typeof message === 'object' && !(message instanceof Slice) && message.$$type === 'Borrow') {
            body = beginCell().store(storeBorrow(message)).endCell();
        }
        if (message && typeof message === 'object' && !(message instanceof Slice) && message.$$type === 'CreateBorrowPool') {
            body = beginCell().store(storeCreateBorrowPool(message)).endCell();
        }
        if (message && typeof message === 'object' && !(message instanceof Slice) && message.$$type === 'Withdraw') {
            body = beginCell().store(storeWithdraw(message)).endCell();
        }
        if (message && typeof message === 'object' && !(message instanceof Slice) && message.$$type === 'Deposit') {
            body = beginCell().store(storeDeposit(message)).endCell();
        }
        if (message && typeof message === 'object' && !(message instanceof Slice) && message.$$type === 'CreateCompensationPool') {
            body = beginCell().store(storeCreateCompensationPool(message)).endCell();
        }
        if (message && typeof message === 'object' && !(message instanceof Slice) && message.$$type === 'WithdrawFromComp') {
            body = beginCell().store(storeWithdrawFromComp(message)).endCell();
        }
        if (message && typeof message === 'object' && !(message instanceof Slice) && message.$$type === 'DepositToComp') {
            body = beginCell().store(storeDepositToComp(message)).endCell();
        }
        if (message && typeof message === 'object' && !(message instanceof Slice) && message.$$type === 'Request') {
            body = beginCell().store(storeRequest(message)).endCell();
        }
        if (message && typeof message === 'object' && !(message instanceof Slice) && message.$$type === 'Approve') {
            body = beginCell().store(storeApprove(message)).endCell();
        }
        if (message && typeof message === 'object' && !(message instanceof Slice) && message.$$type === 'Decline') {
            body = beginCell().store(storeDecline(message)).endCell();
        }
        if (message && typeof message === 'object' && !(message instanceof Slice) && message.$$type === 'Repay') {
            body = beginCell().store(storeRepay(message)).endCell();
        }
        if (message && typeof message === 'object' && !(message instanceof Slice) && message.$$type === 'Deploy') {
            body = beginCell().store(storeDeploy(message)).endCell();
        }
        if (body === null) { throw new Error('Invalid message type'); }
        
        await provider.internal(via, { ...args, body: body });
        
    }
    
    async getUsersData(provider: ContractProvider, address: Address) {
        const builder = new TupleBuilder();
        builder.writeAddress(address);
        const source = (await provider.get('usersData', builder.build())).stack;
        const result = source.readAddress();
        return result;
    }
    
    async getBorrowPools(provider: ContractProvider, id: bigint) {
        const builder = new TupleBuilder();
        builder.writeNumber(id);
        const source = (await provider.get('borrowPools', builder.build())).stack;
        const result = source.readAddress();
        return result;
    }
    
    async getCompPools(provider: ContractProvider, id: bigint) {
        const builder = new TupleBuilder();
        builder.writeNumber(id);
        const source = (await provider.get('compPools', builder.build())).stack;
        const result = source.readAddress();
        return result;
    }
    
}