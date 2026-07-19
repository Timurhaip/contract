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
    initiator: Address;
}

export function storeChangeVal(src: ChangeVal) {
    return (builder: Builder) => {
        const b_0 = builder;
        b_0.storeUint(3492612805, 32);
        b_0.storeUint(src.val, 8);
        b_0.storeRef(src.newVal);
        b_0.storeAddress(src.initiator);
    };
}

export function loadChangeVal(slice: Slice) {
    const sc_0 = slice;
    if (sc_0.loadUint(32) !== 3492612805) { throw Error('Invalid prefix'); }
    const _val = sc_0.loadUintBig(8);
    const _newVal = sc_0.loadRef();
    const _initiator = sc_0.loadAddress();
    return { $$type: 'ChangeVal' as const, val: _val, newVal: _newVal, initiator: _initiator };
}

export function loadTupleChangeVal(source: TupleReader) {
    const _val = source.readBigNumber();
    const _newVal = source.readCell();
    const _initiator = source.readAddress();
    return { $$type: 'ChangeVal' as const, val: _val, newVal: _newVal, initiator: _initiator };
}

export function loadGetterTupleChangeVal(source: TupleReader) {
    const _val = source.readBigNumber();
    const _newVal = source.readCell();
    const _initiator = source.readAddress();
    return { $$type: 'ChangeVal' as const, val: _val, newVal: _newVal, initiator: _initiator };
}

export function storeTupleChangeVal(source: ChangeVal) {
    const builder = new TupleBuilder();
    builder.writeNumber(source.val);
    builder.writeCell(source.newVal);
    builder.writeAddress(source.initiator);
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
    addressUser: Address;
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
        b_0.storeAddress(src.addressUser);
        b_0.storeInt(src.rating, 257);
        b_0.storeAddress(src.app);
        b_0.storeDict(src.debts, Dictionary.Keys.Uint(32), dictValueParserDebt());
        b_0.storeDict(src.investedIn, Dictionary.Keys.Address(), dictValueParserCompPoolData());
        b_0.storeDict(src.compensationPools, Dictionary.Keys.BigUint(256), Dictionary.Values.Address());
        b_0.storeUint(src.debtId, 32);
    };
}

export function loadUser$Data(slice: Slice) {
    const sc_0 = slice;
    const _addressUser = sc_0.loadAddress();
    const _rating = sc_0.loadIntBig(257);
    const _app = sc_0.loadAddress();
    const _debts = Dictionary.load(Dictionary.Keys.Uint(32), dictValueParserDebt(), sc_0);
    const _investedIn = Dictionary.load(Dictionary.Keys.Address(), dictValueParserCompPoolData(), sc_0);
    const _compensationPools = Dictionary.load(Dictionary.Keys.BigUint(256), Dictionary.Values.Address(), sc_0);
    const _debtId = sc_0.loadUintBig(32);
    return { $$type: 'User$Data' as const, addressUser: _addressUser, rating: _rating, app: _app, debts: _debts, investedIn: _investedIn, compensationPools: _compensationPools, debtId: _debtId };
}

export function loadTupleUser$Data(source: TupleReader) {
    const _addressUser = source.readAddress();
    const _rating = source.readBigNumber();
    const _app = source.readAddress();
    const _debts = Dictionary.loadDirect(Dictionary.Keys.Uint(32), dictValueParserDebt(), source.readCellOpt());
    const _investedIn = Dictionary.loadDirect(Dictionary.Keys.Address(), dictValueParserCompPoolData(), source.readCellOpt());
    const _compensationPools = Dictionary.loadDirect(Dictionary.Keys.BigUint(256), Dictionary.Values.Address(), source.readCellOpt());
    const _debtId = source.readBigNumber();
    return { $$type: 'User$Data' as const, addressUser: _addressUser, rating: _rating, app: _app, debts: _debts, investedIn: _investedIn, compensationPools: _compensationPools, debtId: _debtId };
}

export function loadGetterTupleUser$Data(source: TupleReader) {
    const _addressUser = source.readAddress();
    const _rating = source.readBigNumber();
    const _app = source.readAddress();
    const _debts = Dictionary.loadDirect(Dictionary.Keys.Uint(32), dictValueParserDebt(), source.readCellOpt());
    const _investedIn = Dictionary.loadDirect(Dictionary.Keys.Address(), dictValueParserCompPoolData(), source.readCellOpt());
    const _compensationPools = Dictionary.loadDirect(Dictionary.Keys.BigUint(256), Dictionary.Values.Address(), source.readCellOpt());
    const _debtId = source.readBigNumber();
    return { $$type: 'User$Data' as const, addressUser: _addressUser, rating: _rating, app: _app, debts: _debts, investedIn: _investedIn, compensationPools: _compensationPools, debtId: _debtId };
}

export function storeTupleUser$Data(source: User$Data) {
    const builder = new TupleBuilder();
    builder.writeAddress(source.addressUser);
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

export type ExternalLogin = {
    $$type: 'ExternalLogin';
    serverSignature: Slice;
    payload: Cell;
}

export function storeExternalLogin(src: ExternalLogin) {
    return (builder: Builder) => {
        const b_0 = builder;
        b_0.storeUint(2963964483, 32);
        b_0.storeRef(src.serverSignature.asCell());
        b_0.storeRef(src.payload);
    };
}

export function loadExternalLogin(slice: Slice) {
    const sc_0 = slice;
    if (sc_0.loadUint(32) !== 2963964483) { throw Error('Invalid prefix'); }
    const _serverSignature = sc_0.loadRef().asSlice();
    const _payload = sc_0.loadRef();
    return { $$type: 'ExternalLogin' as const, serverSignature: _serverSignature, payload: _payload };
}

export function loadTupleExternalLogin(source: TupleReader) {
    const _serverSignature = source.readCell().asSlice();
    const _payload = source.readCell();
    return { $$type: 'ExternalLogin' as const, serverSignature: _serverSignature, payload: _payload };
}

export function loadGetterTupleExternalLogin(source: TupleReader) {
    const _serverSignature = source.readCell().asSlice();
    const _payload = source.readCell();
    return { $$type: 'ExternalLogin' as const, serverSignature: _serverSignature, payload: _payload };
}

export function storeTupleExternalLogin(source: ExternalLogin) {
    const builder = new TupleBuilder();
    builder.writeSlice(source.serverSignature.asCell());
    builder.writeCell(source.payload);
    return builder.build();
}

export function dictValueParserExternalLogin(): DictionaryValue<ExternalLogin> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeExternalLogin(src)).endCell());
        },
        parse: (src) => {
            return loadExternalLogin(src.loadRef().beginParse());
        }
    }
}

export type ExternalRequest = {
    $$type: 'ExternalRequest';
    pubkey: bigint;
    signature: Slice;
    payload: Cell;
}

export function storeExternalRequest(src: ExternalRequest) {
    return (builder: Builder) => {
        const b_0 = builder;
        b_0.storeUint(753189113, 32);
        b_0.storeUint(src.pubkey, 256);
        b_0.storeRef(src.signature.asCell());
        b_0.storeRef(src.payload);
    };
}

export function loadExternalRequest(slice: Slice) {
    const sc_0 = slice;
    if (sc_0.loadUint(32) !== 753189113) { throw Error('Invalid prefix'); }
    const _pubkey = sc_0.loadUintBig(256);
    const _signature = sc_0.loadRef().asSlice();
    const _payload = sc_0.loadRef();
    return { $$type: 'ExternalRequest' as const, pubkey: _pubkey, signature: _signature, payload: _payload };
}

export function loadTupleExternalRequest(source: TupleReader) {
    const _pubkey = source.readBigNumber();
    const _signature = source.readCell().asSlice();
    const _payload = source.readCell();
    return { $$type: 'ExternalRequest' as const, pubkey: _pubkey, signature: _signature, payload: _payload };
}

export function loadGetterTupleExternalRequest(source: TupleReader) {
    const _pubkey = source.readBigNumber();
    const _signature = source.readCell().asSlice();
    const _payload = source.readCell();
    return { $$type: 'ExternalRequest' as const, pubkey: _pubkey, signature: _signature, payload: _payload };
}

export function storeTupleExternalRequest(source: ExternalRequest) {
    const builder = new TupleBuilder();
    builder.writeNumber(source.pubkey);
    builder.writeSlice(source.signature.asCell());
    builder.writeCell(source.payload);
    return builder.build();
}

export function dictValueParserExternalRequest(): DictionaryValue<ExternalRequest> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeExternalRequest(src)).endCell());
        },
        parse: (src) => {
            return loadExternalRequest(src.loadRef().beginParse());
        }
    }
}

export type ExternalBorrow = {
    $$type: 'ExternalBorrow';
    pubkey: bigint;
    signature: Slice;
    payload: Cell;
}

export function storeExternalBorrow(src: ExternalBorrow) {
    return (builder: Builder) => {
        const b_0 = builder;
        b_0.storeUint(359929327, 32);
        b_0.storeUint(src.pubkey, 256);
        b_0.storeRef(src.signature.asCell());
        b_0.storeRef(src.payload);
    };
}

export function loadExternalBorrow(slice: Slice) {
    const sc_0 = slice;
    if (sc_0.loadUint(32) !== 359929327) { throw Error('Invalid prefix'); }
    const _pubkey = sc_0.loadUintBig(256);
    const _signature = sc_0.loadRef().asSlice();
    const _payload = sc_0.loadRef();
    return { $$type: 'ExternalBorrow' as const, pubkey: _pubkey, signature: _signature, payload: _payload };
}

export function loadTupleExternalBorrow(source: TupleReader) {
    const _pubkey = source.readBigNumber();
    const _signature = source.readCell().asSlice();
    const _payload = source.readCell();
    return { $$type: 'ExternalBorrow' as const, pubkey: _pubkey, signature: _signature, payload: _payload };
}

export function loadGetterTupleExternalBorrow(source: TupleReader) {
    const _pubkey = source.readBigNumber();
    const _signature = source.readCell().asSlice();
    const _payload = source.readCell();
    return { $$type: 'ExternalBorrow' as const, pubkey: _pubkey, signature: _signature, payload: _payload };
}

export function storeTupleExternalBorrow(source: ExternalBorrow) {
    const builder = new TupleBuilder();
    builder.writeNumber(source.pubkey);
    builder.writeSlice(source.signature.asCell());
    builder.writeCell(source.payload);
    return builder.build();
}

export function dictValueParserExternalBorrow(): DictionaryValue<ExternalBorrow> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeExternalBorrow(src)).endCell());
        },
        parse: (src) => {
            return loadExternalBorrow(src.loadRef().beginParse());
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

export type ChangeBorrow = {
    $$type: 'ChangeBorrow';
    balance: bigint;
    id: bigint;
}

export function storeChangeBorrow(src: ChangeBorrow) {
    return (builder: Builder) => {
        const b_0 = builder;
        b_0.storeUint(3634185715, 32);
        b_0.storeCoins(src.balance);
        b_0.storeUint(src.id, 32);
    };
}

export function loadChangeBorrow(slice: Slice) {
    const sc_0 = slice;
    if (sc_0.loadUint(32) !== 3634185715) { throw Error('Invalid prefix'); }
    const _balance = sc_0.loadCoins();
    const _id = sc_0.loadUintBig(32);
    return { $$type: 'ChangeBorrow' as const, balance: _balance, id: _id };
}

export function loadTupleChangeBorrow(source: TupleReader) {
    const _balance = source.readBigNumber();
    const _id = source.readBigNumber();
    return { $$type: 'ChangeBorrow' as const, balance: _balance, id: _id };
}

export function loadGetterTupleChangeBorrow(source: TupleReader) {
    const _balance = source.readBigNumber();
    const _id = source.readBigNumber();
    return { $$type: 'ChangeBorrow' as const, balance: _balance, id: _id };
}

export function storeTupleChangeBorrow(source: ChangeBorrow) {
    const builder = new TupleBuilder();
    builder.writeNumber(source.balance);
    builder.writeNumber(source.id);
    return builder.build();
}

export function dictValueParserChangeBorrow(): DictionaryValue<ChangeBorrow> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeChangeBorrow(src)).endCell());
        },
        parse: (src) => {
            return loadChangeBorrow(src.loadRef().beginParse());
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
    balanceComp: bigint;
    balanceBorrow: bigint;
}

export function storeBorrow(src: Borrow) {
    return (builder: Builder) => {
        const b_0 = builder;
        b_0.storeUint(490195545, 32);
        b_0.storeUint(src.idBorrow, 64);
        b_0.storeUint(src.idComp, 64);
        b_0.storeCoins(src.amount);
        if (src.time !== null && src.time !== undefined) { b_0.storeBit(true).storeUint(src.time, 32); } else { b_0.storeBit(false); }
        b_0.storeAddress(src.to);
        b_0.storeCoins(src.fcc);
        b_0.storeCoins(src.balanceComp);
        b_0.storeCoins(src.balanceBorrow);
    };
}

export function loadBorrow(slice: Slice) {
    const sc_0 = slice;
    if (sc_0.loadUint(32) !== 490195545) { throw Error('Invalid prefix'); }
    const _idBorrow = sc_0.loadUintBig(64);
    const _idComp = sc_0.loadUintBig(64);
    const _amount = sc_0.loadCoins();
    const _time = sc_0.loadBit() ? sc_0.loadUintBig(32) : null;
    const _to = sc_0.loadMaybeAddress();
    const _fcc = sc_0.loadCoins();
    const _balanceComp = sc_0.loadCoins();
    const _balanceBorrow = sc_0.loadCoins();
    return { $$type: 'Borrow' as const, idBorrow: _idBorrow, idComp: _idComp, amount: _amount, time: _time, to: _to, fcc: _fcc, balanceComp: _balanceComp, balanceBorrow: _balanceBorrow };
}

export function loadTupleBorrow(source: TupleReader) {
    const _idBorrow = source.readBigNumber();
    const _idComp = source.readBigNumber();
    const _amount = source.readBigNumber();
    const _time = source.readBigNumberOpt();
    const _to = source.readAddressOpt();
    const _fcc = source.readBigNumber();
    const _balanceComp = source.readBigNumber();
    const _balanceBorrow = source.readBigNumber();
    return { $$type: 'Borrow' as const, idBorrow: _idBorrow, idComp: _idComp, amount: _amount, time: _time, to: _to, fcc: _fcc, balanceComp: _balanceComp, balanceBorrow: _balanceBorrow };
}

export function loadGetterTupleBorrow(source: TupleReader) {
    const _idBorrow = source.readBigNumber();
    const _idComp = source.readBigNumber();
    const _amount = source.readBigNumber();
    const _time = source.readBigNumberOpt();
    const _to = source.readAddressOpt();
    const _fcc = source.readBigNumber();
    const _balanceComp = source.readBigNumber();
    const _balanceBorrow = source.readBigNumber();
    return { $$type: 'Borrow' as const, idBorrow: _idBorrow, idComp: _idComp, amount: _amount, time: _time, to: _to, fcc: _fcc, balanceComp: _balanceComp, balanceBorrow: _balanceBorrow };
}

export function storeTupleBorrow(source: Borrow) {
    const builder = new TupleBuilder();
    builder.writeNumber(source.idBorrow);
    builder.writeNumber(source.idComp);
    builder.writeNumber(source.amount);
    builder.writeNumber(source.time);
    builder.writeAddress(source.to);
    builder.writeNumber(source.fcc);
    builder.writeNumber(source.balanceComp);
    builder.writeNumber(source.balanceBorrow);
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
    sender: Address | null;
    balance: bigint;
}

export function storeApprove(src: Approve) {
    return (builder: Builder) => {
        const b_0 = builder;
        b_0.storeUint(1599388651, 32);
        b_0.storeInt(src.id, 257);
        b_0.storeAddress(src.user);
        b_0.storeAddress(src.sender);
        b_0.storeCoins(src.balance);
    };
}

export function loadApprove(slice: Slice) {
    const sc_0 = slice;
    if (sc_0.loadUint(32) !== 1599388651) { throw Error('Invalid prefix'); }
    const _id = sc_0.loadIntBig(257);
    const _user = sc_0.loadMaybeAddress();
    const _sender = sc_0.loadMaybeAddress();
    const _balance = sc_0.loadCoins();
    return { $$type: 'Approve' as const, id: _id, user: _user, sender: _sender, balance: _balance };
}

export function loadTupleApprove(source: TupleReader) {
    const _id = source.readBigNumber();
    const _user = source.readAddressOpt();
    const _sender = source.readAddressOpt();
    const _balance = source.readBigNumber();
    return { $$type: 'Approve' as const, id: _id, user: _user, sender: _sender, balance: _balance };
}

export function loadGetterTupleApprove(source: TupleReader) {
    const _id = source.readBigNumber();
    const _user = source.readAddressOpt();
    const _sender = source.readAddressOpt();
    const _balance = source.readBigNumber();
    return { $$type: 'Approve' as const, id: _id, user: _user, sender: _sender, balance: _balance };
}

export function storeTupleApprove(source: Approve) {
    const builder = new TupleBuilder();
    builder.writeNumber(source.id);
    builder.writeAddress(source.user);
    builder.writeAddress(source.sender);
    builder.writeNumber(source.balance);
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
    sender: Address | null;
    balance: bigint;
}

export function storeDecline(src: Decline) {
    return (builder: Builder) => {
        const b_0 = builder;
        b_0.storeUint(750137859, 32);
        b_0.storeInt(src.id, 257);
        b_0.storeAddress(src.user);
        b_0.storeAddress(src.sender);
        b_0.storeCoins(src.balance);
    };
}

export function loadDecline(slice: Slice) {
    const sc_0 = slice;
    if (sc_0.loadUint(32) !== 750137859) { throw Error('Invalid prefix'); }
    const _id = sc_0.loadIntBig(257);
    const _user = sc_0.loadMaybeAddress();
    const _sender = sc_0.loadMaybeAddress();
    const _balance = sc_0.loadCoins();
    return { $$type: 'Decline' as const, id: _id, user: _user, sender: _sender, balance: _balance };
}

export function loadTupleDecline(source: TupleReader) {
    const _id = source.readBigNumber();
    const _user = source.readAddressOpt();
    const _sender = source.readAddressOpt();
    const _balance = source.readBigNumber();
    return { $$type: 'Decline' as const, id: _id, user: _user, sender: _sender, balance: _balance };
}

export function loadGetterTupleDecline(source: TupleReader) {
    const _id = source.readBigNumber();
    const _user = source.readAddressOpt();
    const _sender = source.readAddressOpt();
    const _balance = source.readBigNumber();
    return { $$type: 'Decline' as const, id: _id, user: _user, sender: _sender, balance: _balance };
}

export function storeTupleDecline(source: Decline) {
    const builder = new TupleBuilder();
    builder.writeNumber(source.id);
    builder.writeAddress(source.user);
    builder.writeAddress(source.sender);
    builder.writeNumber(source.balance);
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
    balanceUserAfter: bigint;
}

export function storeCompPoolData(src: CompPoolData) {
    return (builder: Builder) => {
        const b_0 = builder;
        b_0.storeUint(src.v, 32);
        b_0.storeCoins(src.freezed);
        b_0.storeAddress(src.address);
        b_0.storeCoins(src.balance);
        b_0.storeUint(src.earnCoff, 64);
        b_0.storeUint(src.freezeCoff, 64);
        b_0.storeCoins(src.balanceUserAfter);
    };
}

export function loadCompPoolData(slice: Slice) {
    const sc_0 = slice;
    const _v = sc_0.loadUintBig(32);
    const _freezed = sc_0.loadCoins();
    const _address = sc_0.loadAddress();
    const _balance = sc_0.loadCoins();
    const _earnCoff = sc_0.loadUintBig(64);
    const _freezeCoff = sc_0.loadUintBig(64);
    const _balanceUserAfter = sc_0.loadCoins();
    return { $$type: 'CompPoolData' as const, v: _v, freezed: _freezed, address: _address, balance: _balance, earnCoff: _earnCoff, freezeCoff: _freezeCoff, balanceUserAfter: _balanceUserAfter };
}

export function loadTupleCompPoolData(source: TupleReader) {
    const _v = source.readBigNumber();
    const _freezed = source.readBigNumber();
    const _address = source.readAddress();
    const _balance = source.readBigNumber();
    const _earnCoff = source.readBigNumber();
    const _freezeCoff = source.readBigNumber();
    const _balanceUserAfter = source.readBigNumber();
    return { $$type: 'CompPoolData' as const, v: _v, freezed: _freezed, address: _address, balance: _balance, earnCoff: _earnCoff, freezeCoff: _freezeCoff, balanceUserAfter: _balanceUserAfter };
}

export function loadGetterTupleCompPoolData(source: TupleReader) {
    const _v = source.readBigNumber();
    const _freezed = source.readBigNumber();
    const _address = source.readAddress();
    const _balance = source.readBigNumber();
    const _earnCoff = source.readBigNumber();
    const _freezeCoff = source.readBigNumber();
    const _balanceUserAfter = source.readBigNumber();
    return { $$type: 'CompPoolData' as const, v: _v, freezed: _freezed, address: _address, balance: _balance, earnCoff: _earnCoff, freezeCoff: _freezeCoff, balanceUserAfter: _balanceUserAfter };
}

export function storeTupleCompPoolData(source: CompPoolData) {
    const builder = new TupleBuilder();
    builder.writeNumber(source.v);
    builder.writeNumber(source.freezed);
    builder.writeAddress(source.address);
    builder.writeNumber(source.balance);
    builder.writeNumber(source.earnCoff);
    builder.writeNumber(source.freezeCoff);
    builder.writeNumber(source.balanceUserAfter);
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
    borrowBalance: Dictionary<bigint, bigint>;
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
        b_0.storeDict(src.borrowBalance, Dictionary.Keys.BigInt(257), Dictionary.Values.BigVarUint(4));
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
    const _borrowBalance = Dictionary.load(Dictionary.Keys.BigInt(257), Dictionary.Values.BigVarUint(4), sc_0);
    return { $$type: 'BorrowPool$Data' as const, id: _id, name: _name, maxTime: _maxTime, app: _app, acc: _acc, v: _v, borrowBalance: _borrowBalance };
}

export function loadTupleBorrowPool$Data(source: TupleReader) {
    const _id = source.readBigNumber();
    const _name = source.readString();
    const _maxTime = source.readBigNumber();
    const _app = source.readAddress();
    const _acc = source.readBigNumber();
    const _v = source.readBigNumber();
    const _borrowBalance = Dictionary.loadDirect(Dictionary.Keys.BigInt(257), Dictionary.Values.BigVarUint(4), source.readCellOpt());
    return { $$type: 'BorrowPool$Data' as const, id: _id, name: _name, maxTime: _maxTime, app: _app, acc: _acc, v: _v, borrowBalance: _borrowBalance };
}

export function loadGetterTupleBorrowPool$Data(source: TupleReader) {
    const _id = source.readBigNumber();
    const _name = source.readString();
    const _maxTime = source.readBigNumber();
    const _app = source.readAddress();
    const _acc = source.readBigNumber();
    const _v = source.readBigNumber();
    const _borrowBalance = Dictionary.loadDirect(Dictionary.Keys.BigInt(257), Dictionary.Values.BigVarUint(4), source.readCellOpt());
    return { $$type: 'BorrowPool$Data' as const, id: _id, name: _name, maxTime: _maxTime, app: _app, acc: _acc, v: _v, borrowBalance: _borrowBalance };
}

export function storeTupleBorrowPool$Data(source: BorrowPool$Data) {
    const builder = new TupleBuilder();
    builder.writeNumber(source.id);
    builder.writeString(source.name);
    builder.writeNumber(source.maxTime);
    builder.writeAddress(source.app);
    builder.writeNumber(source.acc);
    builder.writeNumber(source.v);
    builder.writeCell(source.borrowBalance.size > 0 ? beginCell().storeDictDirect(source.borrowBalance, Dictionary.Keys.BigInt(257), Dictionary.Values.BigVarUint(4)).endCell() : null);
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
    borrowBalance: Dictionary<bigint, bigint>;
    debtId: bigint;
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
        b_0.storeDict(src.borrowBalance, Dictionary.Keys.BigInt(257), Dictionary.Values.BigVarUint(4));
        b_0.storeUint(src.debtId, 256);
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
    const _borrowBalance = Dictionary.load(Dictionary.Keys.BigInt(257), Dictionary.Values.BigVarUint(4), sc_0);
    const _debtId = sc_0.loadUintBig(256);
    return { $$type: 'CompensationPool$Data' as const, id: _id, name: _name, maxTime: _maxTime, app: _app, freezed: _freezed, acc: _acc, v: _v, fcc: _fcc, borrowBalance: _borrowBalance, debtId: _debtId };
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
    const _borrowBalance = Dictionary.loadDirect(Dictionary.Keys.BigInt(257), Dictionary.Values.BigVarUint(4), source.readCellOpt());
    const _debtId = source.readBigNumber();
    return { $$type: 'CompensationPool$Data' as const, id: _id, name: _name, maxTime: _maxTime, app: _app, freezed: _freezed, acc: _acc, v: _v, fcc: _fcc, borrowBalance: _borrowBalance, debtId: _debtId };
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
    const _borrowBalance = Dictionary.loadDirect(Dictionary.Keys.BigInt(257), Dictionary.Values.BigVarUint(4), source.readCellOpt());
    const _debtId = source.readBigNumber();
    return { $$type: 'CompensationPool$Data' as const, id: _id, name: _name, maxTime: _maxTime, app: _app, freezed: _freezed, acc: _acc, v: _v, fcc: _fcc, borrowBalance: _borrowBalance, debtId: _debtId };
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
    builder.writeCell(source.borrowBalance.size > 0 ? beginCell().storeDictDirect(source.borrowBalance, Dictionary.Keys.BigInt(257), Dictionary.Values.BigVarUint(4)).endCell() : null);
    builder.writeNumber(source.debtId);
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
    seqno: bigint;
    serverPublicKey: bigint;
}

export function storeAppContract$Data(src: AppContract$Data) {
    return (builder: Builder) => {
        const b_0 = builder;
        b_0.storeUint(src.nowId, 256);
        b_0.storeUint(src.seqno, 32);
        b_0.storeUint(src.serverPublicKey, 256);
    };
}

export function loadAppContract$Data(slice: Slice) {
    const sc_0 = slice;
    const _nowId = sc_0.loadUintBig(256);
    const _seqno = sc_0.loadUintBig(32);
    const _serverPublicKey = sc_0.loadUintBig(256);
    return { $$type: 'AppContract$Data' as const, nowId: _nowId, seqno: _seqno, serverPublicKey: _serverPublicKey };
}

export function loadTupleAppContract$Data(source: TupleReader) {
    const _nowId = source.readBigNumber();
    const _seqno = source.readBigNumber();
    const _serverPublicKey = source.readBigNumber();
    return { $$type: 'AppContract$Data' as const, nowId: _nowId, seqno: _seqno, serverPublicKey: _serverPublicKey };
}

export function loadGetterTupleAppContract$Data(source: TupleReader) {
    const _nowId = source.readBigNumber();
    const _seqno = source.readBigNumber();
    const _serverPublicKey = source.readBigNumber();
    return { $$type: 'AppContract$Data' as const, nowId: _nowId, seqno: _seqno, serverPublicKey: _serverPublicKey };
}

export function storeTupleAppContract$Data(source: AppContract$Data) {
    const builder = new TupleBuilder();
    builder.writeNumber(source.nowId);
    builder.writeNumber(source.seqno);
    builder.writeNumber(source.serverPublicKey);
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

 type RequestContract_init_args = {
    $$type: 'RequestContract_init_args';
    addressUser: Address;
    pool: bigint;
    app: Address;
}

function initRequestContract_init_args(src: RequestContract_init_args) {
    return (builder: Builder) => {
        const b_0 = builder;
        b_0.storeAddress(src.addressUser);
        b_0.storeUint(src.pool, 256);
        b_0.storeAddress(src.app);
    };
}

async function RequestContract_init(addressUser: Address, pool: bigint, app: Address) {
    const __code = Cell.fromHex('b5ee9c7241020c01000392000114ff00208e8130e1f2c80b0104e401d072d721d200d200fa4021103450666f04f86102f862ed44d0d401f863d200019afa40d3fffa4055206c139bfa40d3fffa40552003d158e204925f04e07023d74920c21f953103d31f04de2182105f54bbebbae3022182102cb63203bae302218210946a98b6bae30234c00003c12113b002040a0b02fe5b02810101d70031d72c01916d93fa4001e201d72c01916d93fa4001e23120206ef2d080256ddb3c813977f84212c705f2f4c802206ef2d08012cf165230cbffc9820afaf0807423206ef2d0804130c855208210d02d0ac55004cb1f12cb07cccec92359706d50426d50427fc8cf8580ca00cf8440ce01fa028069cf40025c050300e46e016eb0935bcf819d58cf8680cf8480f400f400cf81e2f400c901fb00206ef2d080708100a06d5a6d6d40037fc8cf8580ca00cf8440ce01fa028069cf40025c6e016eb0935bcf819d58cf8680cf8480f400f400cf81e2f400c901fb0002c8f84301cc7f01ca0055205023cecbffcec9ed5403fc5b02810101d70031d72c01916d93fa4001e201d72c01916d93fa4001e231206ef2d080246ddb3c813977f84212c705f2f4c801206ef2d080cf165220cbffc930f842708100a0885a6d6d40037fc8cf8580ca00cf8440ce01fa028069cf40025c6e016eb0935bcf819d58cf8680cf8480f400f400cf81e2f400c901fb000205080902ee59db3c5c705920f90022f9005ad76501d76582020134c8cb17cb0fcb0fcbffcbff71f90400c87401cb0212ca07cbffc9d0036eb38ebf8209312d008824441450337050457fc8cf8580ca00cf8440ce01fa028069cf40025c6e016eb0935bcf819d58cf8680cf8480f400f400cf81e2f400c901fb00e05b060700f4f843d0f40430208200e22c018010f40f6fa1f2e0876d22815422018010f40f6fa1f2e08781542201028010f4178200a60af82a028010f417228200da7b018010f40f6fa1f2e0878200da7b01028010f41702820083df018010f40f6fa1f2e08712820083df01028010f417c801c8f400cd7001ca005a02cecec90000002c00000000436f6e74726163742064657374726f7965640028c8f84301cc7f01ca0055205023cecbffcec9ed5400965b02d33f30c8018210aff90f5758cb1fcb3fc913f84270705003804201503304c8cf8580ca00cf8440ce01fa02806acf40f400c901fb00c8f84301cc7f01ca0055205023cecbffcec9ed54003a8e1502c8f84301cc7f01ca0055205023cecbffcec9ed54e05f03f2c0826f56b0d4');
    const builder = beginCell();
    const __system = Cell.fromHex('b5ee9c7241029d01002ee8000101c001020120022f0105bea114030228ff008e88f4a413f4bcf2c80bed5320e303ed43d90412020271050902014806080195b6d4dda89a1a803f0c7a400031c35a63fa803a003a63ff481f401a63fa63ff401e809a7feab20d8351c37020203ae01f480b205a202e0411610a8e22240208ebc468068da03c5b678d9430070002280195b56efda89a1a803f0c7a400031c35a63fa803a003a63ff481f401a63fa63ff401e809a7feab20d8351c37020203ae01f480b205a202e0411610a8e22240208ebc468068da03c5b678d9430670201200a110201200b0f0201580c0d0195af6076a2686a00fc31e90000c70d698fea00e800e98ffd207d00698fe98ffd007a0269ffaac8360d470dc08080eb807d202c816880b81045842a3888900823af11a01a3680f16d9e3650c0370195aec876a2686a00fc31e90000c70d698fea00e800e98ffd207d00698fe98ffd007a0269ffaac8360d470dc08080eb807d202c816880b81045842a3888900823af11a01a3680f16d9e3650c00e0002290195b4e8dda89a1a803f0c7a400031c35a63fa803a003a63ff481f401a63fa63ff401e809a7feab20d8351c37020203ae01f480b205a202e0411610a8e22240208ebc468068da03c5b678d9430100002270195b84cbed44d0d401f863d200018e1ad31fd401d001d31ffa40fa00d31fd31ffa00f404d3ff55906c1a8e1b810101d700fa405902d10170208b085471112010475e2340346d01e2db3c6ca186902f43001d072d721d200d200fa4021103450666f04f86102f862ed44d0d401f863d200018e1ad31fd401d001d31ffa40fa00d31fd31ffa00f404d3ff55906c1a8e1b810101d700fa405902d10170208b085471112010475e2340346d01e20b925f0be0702ad74920c21f95310ad31f0bde218210d3c8679fbae30221131502fe5b09fa40fa00d31f30c823cf165210cb1fc9f9008101012d0259f40c6fa193fa003092306de2206ef2d0802282103b9aca00a801a90414a053217206c855208210d3c8679f5004cb1f12ce01fa02cb1fc9145a6d6d40037fc8cf8580ca00cf8440ce01fa028069cf40025c6e016eb0935bcf818ae2f400c901fb00107955169a140054c8f84301cc7f01ca005590509acb1f07c8ce17cd15cb1f13ce01fa02cb1fcb1f01fa02f400cbffc9ed54044a82105f54bbebbae3022182102cb63203bae30221821052df2fbabae3022182101d37ca59ba1617191c02fe5b09810101d700d72c01916d93fa4001e201d72c01916d93fa4001e23120206ef2d080286ddb3cf8276f10f8416f24135f03a114705043804005c8553082105f54bbeb5005cb1f13810101cf0001206e9430cf84809201cee201206e9430cf84809201cee201fa02c9125a6d6d40037fc8cf8580ca00cf8440ce01fa028069291802fe5b09810101d700d72c01916d93fa4001e201d72c01916d93fa4001e23120206ef2d080286ddb3cf8276f10f8416f24135f03a114705043804005c8553082102cb632035005cb1f13810101cf0001206e9430cf84809201cee201206e9430cf84809201cee201fa02c9125a6d6d40037fc8cf8580ca00cf8440ce01fa0280692918009ecf40025c6e016eb0935bcf819d58cf8680cf8480f400f400cf81e2f400c901fb0010795516c8f84301cc7f01ca005590509acb1f07c8ce17cd15cb1f13ce01fa02cb1fcb1f01fa02f400cbffc9ed5403fe5b09d3ffd72c01916d93fa4001e2318200a7dcf84228c705f2f4206ef2d080f84212db3c5c705920f90022f9005ad76501d76582020134c8cb17cb0fcb0fcbffcbff71f90400c87401cb0212ca07cbffc9d0f8416f24135f035a706d5044057fc8cf8580ca00cf8440ce01fa028069cf40025c6e016eb0935bcf818ae2f4001a9a1b01f0f843d0f40430208200a60a018010f40f6fa1f2e0876d228200e22c018010f40f6fa1f2e0878200e22c01028010f417815422f82a028010f41722820083df018010f40f6fa1f2e087820083df01028010f417028200da7b018010f40f6fa1f2e087128200da7b01028010f417c801c8f400cd7001ca0055218c0064c901fb0010795516c8f84301cc7f01ca005590509acb1f07c8ce17cd15cb1f13ce01fa02cb1fcb1f01fa02f400cbffc9ed5404fc8f695b09d33fd33ffa00d2000193d31f31ded72c01916d93fa4001e201fa0031fa0031fa0030813977f8422bc705f2f482009c9cf8276f10534aa0a1c2fff2f422a70a8064a9045230a02082103b9aca00a8f8276f10f8416f24135f03a1a90417a05096a006a45349db3ce0218210d89d45f3bae30221821005ae90f1ba1d1e212201eef843d0f4043020820083df018010f40f6fa1f2e0876d815422f82a028010f417228200e22c018010f40f6fa1f2e0878200e22c01028010f417228200a60a018010f40f6fa1f2e0878200a60a01028010f417028200da7b018010f40f6fa1f2e087128200da7b01028010f417c801c8f400cd7001ca005a9301ba705920f90022f9005ad76501d76582020134c8cb17cb0fcb0fcbffcbff71f90400c87401cb0212ca07cbffc9d0f8416f24135f03722582103b9aca00a8f8276f10a904f8276f10f8416f24135f03a12f107a10691058104a030e1034c81f01fe557082101d37ca595009cb1f17cb3f15cb3f5003fa02216eb3967f01ca00cb1f947032ca00e201206e9430cf84809201cee201fa0201fa0201fa02c94330175a6d6d40037fc8cf8580ca00cf8440ce01fa028069cf40025c6e016eb0935bcf819d58cf8680cf8480f400f400cf81e2f400c901fb001079106810571046404420005605c8f84301cc7f01ca005590509acb1f07c8ce17cd15cb1f13ce01fa02cb1fcb1f01fa02f400cbffc9ed5400be5b09fa00d31f30c8f842cf16cb1fc9f900102a81010102206e953059f45a3098c801fa024133f442e2107910681057104610354403c8f84301cc7f01ca005590509acb1f07c8ce17cd15cb1f13ce01fa02cb1fcb1f01fa02f400cbffc9ed5404e48e495b363607d401d001d31f308200dfa7f84226c705f2f4075089104610354430c8f84301cc7f01ca005590509acb1f07c8ce17cd15cb1f13ce01fa02cb1fcb1f01fa02f400cbffc9ed54e021821068939123bae3022182109044198fbae30221821022d38d52bae3022182108a6d35fcba2325262701e45b09d3ff30f8416f24135f03c8f842cf1612cb1fc9f9002a8101012259f40c6fa193fa003092306de2206ef2d0800282103b9aca00a8f8416f24135f0382103b9aca00a8821023c34600a9042082103b9aca00a8821005f5e100a90401a02082103b9aca00a824a90415a11c81010150036d2400a6206e953059f45a3098c801fa024133f442e250b2a90414a05044a101a4107910681057104603444405c8f84301cc7f01ca005590509acb1f07c8ce17cd15cb1f13ce01fa02cb1fcb1f01fa02f400cbffc9ed5402965b09fa4030c85290cb1f5230cb1f5220cb3fc953166ddb3c027601db3c10795516c8f84301cc7f01ca005590509acb1f07c8ce17cd15cb1f13ce01fa02cb1fcb1f01fa02f400cbffc9ed54294c029c5b09fa4030c87101cb015290cb1f5230cb1f24fa02c953166ddb3c027501db3c10795516c8f84301cc7f01ca005590509acb1f07c8ce17cd15cb1f13ce01fa02cb1fcb1f01fa02f400cbffc9ed54294c03a8e3022182100abf5c5fbae302218210946a98b6bae3023bc0000ac1211ab08e2e10795516c8f84301cc7f01ca005590509acb1f07c8ce17cd15cb1f13ce01fa02cb1fcb1f01fa02f400cbffc9ed54e05f0af2c082282b2e03fe5b09d31f31d72c01916d93fa4001e2318200dfa7f84227c705f2f4c8f828cf16f8416f24135f03820afaf080a1fa02c921206ef2d080276ddb3c82089896807304206ef2d0804430c855208210d02d0ac55004cb1f12cb07cccec9706d50426d50427fc8cf8580ca00cf8440ce01fa028069cf40025c6e016eb0935bcf818a299a2a02ee59db3c5c705920f90022f9005ad76501d76582020134c8cb17cb0fcb0fcbffcbff71f90400c87401cb0212ca07cbffc9d0036eb38ebf8209312d008824441450337050457fc8cf8580ca00cf8440ce01fa028069cf40025c6e016eb0935bcf819d58cf8680cf8480f400f400cf81e2f400c901fb00e05b2c4b006ae2f400c901fb0010795516c8f84301cc7f01ca005590509acb1f07c8ce17cd15cb1f13ce01fa02cb1fcb1f01fa02f400cbffc9ed5402fe5b09810101d70031d72c01916d93fa4001e230fa00d72c01916d93fa4001e23120206ef2d08027db3c705920f90022f9005ad76501d76582020134c8cb17cb0fcb0fcbffcbff71f90400c87401cb0212ca07cbffc9d0813977f84258c705f2f4206ef2d08001706d5a6d6d40037fc8cf8580ca00cf8440ce01fa028069cf402c2d00f6f843d0f40430208200e22c018010f40f6fa1f2e0876d815422f82a028010f417228200a60a018010f40f6fa1f2e0878200a60a01028010f417228200da7b018010f40f6fa1f2e0878200da7b01028010f41702820083df018010f40f6fa1f2e08712820083df01028010f417c801c8f400cd7001ca005a02cecec9009a025c6e016eb0935bcf819d58cf8680cf8480f400f400cf81e2f400c901fb0010795516c8f84301cc7f01ca005590509acb1f07c8ce17cd15cb1f13ce01fa02cb1fcb1f01fa02f400cbffc9ed5400de5b09d33f30c8018210aff90f5758cb1fcb3fc9108a10791068105710461035443012f84270705003804201503304c8cf8580ca00cf8440ce01fa02806acf40f400c901fb00c8f84301cc7f01ca005590509acb1f07c8ce17cd15cb1f13ce01fa02cb1fcb1f01fa02f400cbffc9ed54020120304f0105b83df8310228ff008e88f4a413f4bcf2c80bed5320e303ed43d9323c0202713334017dbcb5376a2686a00fc31e90000c70a698fea00e800e98ffd207d00698ffa022ab0360bc70ac08080eb807d202c816880c584382980081a0811b6f16d9e3638c69020148353a0201583638017daf6076a2686a00fc31e90000c70a698fea00e800e98ffd207d00698ffa022ab0360bc70ac08080eb807d202c816880c584382980081a0811b6f16d9e3638c0370008f8276f10017daec876a2686a00fc31e90000c70a698fea00e800e98ffd207d00698ffa022ab0360bc70ac08080eb807d202c816880c584382980081a0811b6f16d9e3638c039000226017db4e8dda89a1a803f0c7a400031c29a63fa803a003a63ff481f401a63fe808aac0d82f1c2b020203ae01f480b205a2031610e0a60020682046dbc5b678d8e303b00022403f03001d072d721d200d200fa4021103450666f04f86102f862ed44d0d401f863d200018e14d31fd401d001d31ffa40fa00d31ff40455606c178e15810101d700fa405902d1018b08705300103410236de208925f08e07027d74920c21f953107d31f08de2182101d37ca59bae30221821045273be3bae302213d414203fe5b06d33fd33ffa00d2000192d31f926d01e2d72c01916d93fa4001e201fa00fa00305358db3c705920f90022f9005ad76501d76582020134c8cb17cb0fcb0fcbffcbff71f90400c87401cb0212ca07cbffc9d0813977f84258c705f2f482009c9cf8276f1026a1c2fff2f422206ef2d080296ddb3c04206ef2d0802ab608713e493f01eef843d0f4043020815422018010f40f6fa1f2e0876d228200a60a018010f40f6fa1f2e0878200a60a01028010f417820083dff82a028010f417228200e22c018010f40f6fa1f2e0878200e22c01028010f417028200da7b018010f40f6fa1f2e087128200da7b01028010f417c801c8f400cd7001ca005a9302fcf8276f10f8416f24135f03a127106a1059514a04034a1a1034c8557082101d37ca595009cb1f17cb3f15cb3f5003fa02216eb3967f01ca00cb1f947032ca00e201206e9430cf84809201cee201fa0201fa0201fa02c9135a6d6d40037fc8cf8580ca00cf8440ce01fa028069cf40025c6e016eb0935bcf818ae2f400c9019a4000cefb00206ef2d0807080406d5a6d6d40037fc8cf8580ca00cf8440ce01fa028069cf40025c6e016eb0935bcf819d58cf8680cf8480f400f400cf81e2f400c901fb0010465513c8f84301cc7f01ca0055605067cb1f04c8ce14cd12cb1fce01fa02cb1ff400c9ed54007a5b333304d401d001d31f308200dfa7f84227c705f2f40450564330c8f84301cc7f01ca0055605067cb1f04c8ce14cd12cb1fce01fa02cb1ff400c9ed5404f48210d89d45f3ba8e515b06fa00d31f30c8f842cf16cb1fc9f900102881010102206e953059f45a3098c801fa024133f442e2104610354430c8f84301cc7f01ca0055605067cb1f04c8ce14cd12cb1fce01fa02cb1ff400c9ed54e021821068939123bae3022182100abf5c5fbae3022182101e4758c2bae302214344464800f85b06d3ff30c8f842cf16cb1fc9f900810101280259f40c6fa193fa003092306de2206ef2d080f8416f24135f03a76e8068a90420a70a800ba9045210a1a1aa017aa90482103b9aca00a801a9047aa904a005a410461035440302c8f84301cc7f01ca0055605067cb1f04c8ce14cd12cb1fce01fa02cb1ff400c9ed5402fe5b06810101d70031d72c01916d93fa4001e230fa00d72c01916d93fa4001e23120206ef2d08024db3c705920f90022f9005ad76501d76582020134c8cb17cb0fcb0fcbffcbff71f90400c87401cb0212ca07cbffc9d0813977f84258c705f2f4206ef2d08001706d5a6d6d40037fc8cf8580ca00cf8440ce01fa028069cf404a45008a025c6e016eb0935bcf819d58cf8680cf8480f400f400cf81e2f400c901fb0010465513c8f84301cc7f01ca0055605067cb1f04c8ce14cd12cb1fce01fa02cb1ff400c9ed5402fc5b06d31f31d72c01916d93fa4001e2318200dfa7f84224c705f2f4c8f828cf16f8416f24135f038208989680a1fa025270cb1f5220cb1f7001cb1fc921206ef2d080246ddb3c82089896807304206ef2d0804430c855208210d02d0ac55004cb1f12cb07cccec9706d50426d50427fc8cf8580ca00cf8440ce01fa0280694947008ecf40025c6e016eb0935bcf819d58cf8680cf8480f400f400cf81e2f400c901fb0010465513c8f84301cc7f01ca0055605067cb1f04c8ce14cd12cb1fce01fa02cb1ff400c9ed5404c4821022d38d52ba8f465b06fa4030c87001cb015260cb1f5270cb1f22fa02c953136ddb3c027501db3c10465513c8f84301cc7f01ca0055605067cb1f04c8ce14cd12cb1fce01fa02cb1ff400c9ed54e0218210946a98b6bae30238c00007c12117b0494c4d4e02ee59db3c5c705920f90022f9005ad76501d76582020134c8cb17cb0fcb0fcbffcbff71f90400c87401cb0212ca07cbffc9d0036eb38ebf8209312d008824441450337050457fc8cf8580ca00cf8440ce01fa028069cf40025c6e016eb0935bcf819d58cf8680cf8480f400f400cf81e2f400c901fb00e05b4a4b00f4f843d0f40430208200e22c018010f40f6fa1f2e0876d22815422018010f40f6fa1f2e08781542201028010f417228200a60a018010f40f6fa1f2e0878200a60a01028010f417028200da7b018010f40f6fa1f2e087128200da7b01028010f417820083dff82a028010f417c801c8f400cd7001ca005a02cecec90000009e705023804203c855208210d02d0ac55004cb1f12cb07cccec95a6d6d40037fc8cf8580ca00cf8440ce01fa028069cf40025c6e016eb0935bcf819d58cf8680cf8480f400f400cf81e2f400c901fb0000c05b06d33f30c8018210aff90f5758cb1fcb3fc91057104610354430f84270705003804201503304c8cf8580ca00cf8440ce01fa02806acf40f400c901fb00c8f84301cc7f01ca0055605067cb1f04c8ce14cd12cb1fce01fa02cb1ff400c9ed54005c8e2610465513c8f84301cc7f01ca0055605067cb1f04c8ce14cd12cb1fce01fa02cb1ff400c9ed54e05f07f2c082020120505d0105b74f70510110ff0020e303f2c80b5201f83001d072d721d200d200fa4021103450666f04f86102f862ed44d0d401f863d200018e1ad31ffa40d31fd3fffa00fa40d401d0d33f301716151443306c178e20fa40d3fffa40d401d0810101d7003014433004d15502f8237020103610354044e208925f08e07027d74920c21f953107d31f08de21821069c9e7e5ba5304d48e4210235f033604d31ffa00308200dfa7f84225c705f2f4f82358a0104610354140c8f84301cc7f01ca0055605067cb1f14ce12cb1fcbff01fa02ce01c8cb3fcdc9ed54e021820b0514b1bae3022182100fd66c7cbae302218210b368a678bae302218210946a98b6ba5455595b006e5b06fa00308200dfa7f84226c705f2f4a110465513c8f84301cc7f01ca0055605067cb1f14ce12cb1fcbff01fa02ce01c8cb3fcdc9ed5401725b368200dfa7f84227c705f2f4f82327bee30010465513c8f84301cc7f01ca0055605067cb1f14ce12cb1fcbff01fa02ce01c8cb3fcdc9ed545602fe5315db3c705920f90022f9005ad76501d76582020134c8cb17cb0fcb0fcbffcbff71f90400c87401cb0212ca07cbffc9d02170268100a05139c855208210d3c8679f5004cb1f12ce01fa02cb1fc9125a6d6d40037fc8cf8580ca00cf8440ce01fa028069cf40025c6e016eb0935bcf819d58cf8680cf8480f400f400cf81e2575801eef843d0f4043020815422018010f40f6fa1f2e0876d228200a60a018010f40f6fa1f2e0878200a60a01028010f41722820083df018010f40f6fa1f2e087820083df01028010f417028200e22c018010f40f6fa1f2e087128200e22c01028010f4178200da7bf82a028010f417c801c8f400cd7001ca005a93000cf400c901fb0001e05b368200dfa7f84225c705f2f4f842708100a0885a6d6d40037fc8cf8580ca00cf8440ce01fa028069cf40025c6e016eb0935bcf819d58cf8680cf8480f400f400cf81e2f400c901fb0010465513c8f84301cc7f01ca0055605067cb1f14ce12cb1fcbff01fa02ce01c8cb3fcdc9ed545a002c00000000436f6e74726163742064657374726f79656401e48e605b06d33f30c8018210aff90f5758cb1fcb3fc91057104610354430f84270705003804201503304c8cf8580ca00cf8440ce01fa02806acf40f400c901fb00c8f84301cc7f01ca0055605067cb1f14ce12cb1fcbff01fa02ce01c8cb3fcdc9ed54e038c00007c12117b0e3025f07f2c0825c004c10465513c8f84301cc7f01ca0055605067cb1f14ce12cb1fcbff01fa02ce01c8cb3fcdc9ed540105b445905e0228ff008e88f4a413f4bcf2c80bed5320e303ed43d95f6a02027160650201206163018db8a2fed44d0d401f863d200018e1ffa40810101d700fa40f404d401d0f404f404d31f3010371036103510346c178e12fa40fa405902d10170206d50036d50036d01e2db3c6c71862000223018db8a87ed44d0d401f863d200018e1ffa40810101d700fa40f404d401d0f404f404d31f3010371036103510346c178e12fa40fa405902d10170206d50036d50036d01e2db3c6c718640002210201206668018db98cded44d0d401f863d200018e1ffa40810101d700fa40f404d401d0f404f404d31f3010371036103510346c178e12fa40fa405902d10170206d50036d50036d01e2db3c6c71867000222018db844bed44d0d401f863d200018e1ffa40810101d700fa40f404d401d0f404f404d31f3010371036103510346c178e12fa40fa405902d10170206d50036d50036d01e2db3c6c7186900022502f83001d072d721d200d200fa4021103450666f04f86102f862ed44d0d401f863d200018e1ffa40810101d700fa40f404d401d0f404f404d31f3010371036103510346c178e12fa40fa405902d10170206d50036d50036d01e208925f08e07027d74920c21f953107d31f08de2182105f54bbebbae3022182102cb632036b6e02de5b06810101d700d72c01916d93fa4001e201d72c01916d93fa4001e201fa00305336db3c705920f90022f9005ad76501d76582020134c8cb17cb0fcb0fcbffcbff71f90400c87401cb0212ca07cbffc9d0813977f84258c705f2f48200a7dc81010bf842275959f40b6fa192306ddf926c02e2206e92306d8e15d0d31ffa00fa40fa00d33fd33ffa0055606c176f07e26eb3f2f481010bf842265959f40b6fa192306ddf206e92306d8e15d0d31ffa00fa40fa00d33fd33ffa0055606c176f07e2206ef2d0806f2710365f06a76421a9048200dd6001c245f2f422206ef2d0805347db3c8b6d01fe705920f90022f9005ad76501d76582020134c8cb17cb0fcb0fcbffcbff71f90400c87401cb0212ca07cbffc9d003206ef2d080147003804006c8553082105f54bbeb5005cb1f13810101cf0001206e9430cf84809201cee201206e9430cf84809201cee201fa02c941305a6d6d40037fc8cf8580ca00cf8440ce01fa0280697104fcba8f6f5b06810101d700d72c01916d93fa4001e201d72c01916d93fa4001e201fa00305336db3c705920f90022f9005ad76501d76582020134c8cb17cb0fcb0fcbffcbff71f90400c87401cb0212ca07cbffc9d0813977f84258c705f2f48200a7dc81010bf842275959f40b6fa192306ddfe02182101d37ca59bae30221926f727902e2206e92306d8e15d0d31ffa00fa40fa00d33fd33ffa0055606c176f07e26eb3f2f481010bf842265959f40b6fa192306ddf206e92306d8e15d0d31ffa00fa40fa00d33fd33ffa0055606c176f07e2206ef2d0806f2710365f06a76421a9048200dd6001c245f2f422206ef2d0805347db3c8b7001fe705920f90022f9005ad76501d76582020134c8cb17cb0fcb0fcbffcbff71f90400c87401cb0212ca07cbffc9d003206ef2d080147003804006c8553082102cb632035005cb1f13810101cf0001206e9430cf84809201cee201206e9430cf84809201cee201fa02c941305a6d6d40037fc8cf8580ca00cf8440ce01fa028069710096cf40025c6e016eb0935bcf819d58cf8680cf8480f400f400cf81e2f400c901fb0010465513c8f84301cc7f01ca0055605067ce14810101cf0012cef40001c8f40012f40012cb1fcdc9ed5402de5b06d33fd33ffa00d2000192d31f926d01e2d72c01916d93fa4001e201fa00fa00308176ae2d83072859f40e6fa192306ddf6eb3f2f424a70a8064a9045350a02cc1009e8200d94521821077359400b9f2f4e30e25206ef2d0805420032a544a03071113a4050443138020111412c8737400a82cc2ff932cc1149170e29e8200d9452182137e11d600bbf2f48e382cc213932cc1329170e29f8200d9452182180ba43b7400bbf2f48e1b2cc231932cc1509170e29f8200d945218218174876e800bbf2f4dee2e202f855505065fa0213cb1fcbffcbff58fa0201fa02c94af052f0206e953059f45b30944133f417e2f8285476aedb3c5c705920f90022f9005ad76501d76582020134c8cb17cb0fcb0fcbffcbff71f90400c87401cb0212ca07cbffc9d00f8307296d206e953059f45b30944133f416e28209312d0007206ef2d0805005c8807503fc59821069c9e7e55003cb1fcb1f01fa02c9104f10367050457fc8cf8580ca00cf8440ce01fa028069cf40025c6e016eb0935bcf819d58cf8680cf8480f400f400cf81e2f400c901fb005137db3c705920f90022f9005ad76501d76582020134c8cb17cb0fcb0fcbffcbff71f90400c87401cb0212ca07cbffc9d05147db3c928e7601fc705920f90022f9005ad76501d76582020134c8cb17cb0fcb0fcbffcbff71f90400c87401cb0212ca07cbffc9d08208989680537cc8598210d89d45f35003cb1f01fa02cb1fc91026706d50426d50427fc8cf8580ca00cf8440ce01fa028069cf40025c6e016eb0935bcf819d58cf8680cf8480f400f400cf81e2f400c9017701fefb008208989680516bc8598210d89d45f35003cb1f01fa02cb1fc94460706d50426d50427fc8cf8580ca00cf8440ce01fa028069cf40025c6e016eb0935bcf819d58cf8680cf8480f400f400cf81e2f400c901fb00206ef2d08001820afaf080a1706d5a6d6d40037fc8cf8580ca00cf8440ce01fa028069cf40025c6e016e780088b0935bcf819d58cf8680cf8480f400f400cf81e2f400c901fb0010465513c8f84301cc7f01ca0055605067ce14810101cf0012cef40001c8f40012f40012cb1fcdc9ed54044a8210d3c8679fbae30221821068939123bae302218210d02d0ac5bae3022182100abf5c5fba7a7e869603f65b06fa4031fa0031d31f302280202259f40f6fa192306ddf206e92306d8e13d0fa00d31fd3ffd3fffa00fa0055506c166f06e2206ef2d0806f26303327db3c705920f90022f9005ad76501d76582020134c8cb17cb0fcb0fcbffcbff71f90400c87401cb0212ca07cbffc9d0813977f8425220c705f2f45117db3c928e7b01f8705920f90022f9005ad76501d76582020134c8cb17cb0fcb0fcbffcbff71f90400c87401cb0212ca07cbffc9d022a73c33028064a9045330a180206dc8216e925b6d8e1e01206ef2d0806f26550555505065fa0213cb1fcbffcbff58fa0201fa02c9e227103a01206e953059f45b30944133f417e204a70a19a124c87c02fe0182106893912358cb1fcbffc919706d50426d50427fc8cf8580ca00cf8440ce01fa028069cf40025c6e016eb0935bcf819d58cf8680cf8480f400f400cf81e2f400c901fb0002c80182106893912358cb1fcbffc914706d50426d50427fc8cf8580ca00cf8440ce01fa028069cf40025c6e016eb0935bcf818ae2f400c9019a7d0058fb0010465513c8f84301cc7f01ca0055605067ce14810101cf0012cef40001c8f40012f40012cb1fcdc9ed5402f25b06d3ff3082009de4f84225c705f2f42280202259f40f6fa192306ddf206e92306d8e13d0fa00d31fd3ffd3fffa00fa0055506c166f06e2206ef2d0806f263033f8416f24135f035240a1c200e30f10465513c8f84301cc7f01ca0055605067ce14810101cf0012cef40001c8f40012f40012cb1fcdc9ed547f8202f2135f03265253db3c705920f90022f9005ad76501d76582020134c8cb17cb0fcb0fcbffcbff71f90400c87401cb0212ca07cbffc9d0820898968072f8416f24135f03c801820b0514b158cb1f01fa02c95a6d6d40037fc8cf8580ca00cf8440ce01fa028069cf40025c6e016eb0935bcf818ae2f400c901fb00809a01eef843d0f40430208200da7b018010f40f6fa1f2e0876d22815422018010f40f6fa1f2e08781542201028010f417228200a60a018010f40f6fa1f2e0878200a60a01028010f4178200e22cf82a028010f41702820083df018010f40f6fa1f2e08712820083df01028010f417c801c8f400cd7001ca00553181001e5034cecbffce01c8810101cf00cdc903e227db3c80206dc8216e925b6d8e1e01206ef2d0806f26550555505065fa0213cb1fcbffcbff58fa0201fa02c9e227103a01206e953059f45b30944133f417e207705920f90022f9005ad76501d76582020134c8cb17cb0fcb0fcbffcbff71f90400c87401cb0212ca07cbffc9d05117db3c928e8302f8705920f90022f9005ad76501d76582020134c8cb17cb0fcb0fcbffcbff71f90400c87401cb0212ca07cbffc9d002a73c8064a9045330a1048103e8a90419a024c80182106893912358cb1fcbffc919706d50426d50427fc8cf8580ca00cf8440ce01fa028069cf40025c6e016eb0935bcf818ae2f400c901fb0002c89a8401fc0182106893912358cb1fcbffc9706d50426d50427fc8cf8580ca00cf8440ce01fa028069cf40025c6e016eb0935bcf819d58cf8680cf8480f400f400cf81e2f400c901fb00247080406d5a6d6d40037fc8cf8580ca00cf8440ce01fa028069cf40025c6e016eb0935bcf819d58cf8680cf8480f400f400cf81e2f400c901850004fb0001f85b06d307d4fa403022c001993631d0810101d70030e30e047080406d5a6d6d40037fc8cf8580ca00cf8440ce01fa028069cf40025c6e016eb0935bcf819d58cf8680cf8480f400f400cf81e2f400c901fb0010465513c8f84301cc7f01ca0055605067ce14810101cf0012cef40001c8f40012f40012cb1fcdc9ed548703fa22c0038f7432d0fa408200911af84227c705917f95f84223c705e2f2f4fa00307054700025544530262a81010b2a59f40b6fa192306ddf206e92306d8e15d0d31ffa00fa40fa00d33fd33ffa0055606c176f07e26eb39137e30d81010b07c855605067cb1f5004fa0212ce01fa02cb3fcb3f01fa02c9103412e30e500488898a00705f072381010b2359f40b6fa192306ddf206e92306d8e15d0d31ffa00fa40fa00d33fd33ffa0055606c176f07e2206ef2d0806f275037a002001c206e953059f45930944133f413e203e622c0048ed832d0fa40d3ff30f8285316db3c705920f90022f9005ad76501d76582020134c8cb17cb0fcb0fcbffcbff71f90400c87401cb0212ca07cbffc9d082009de4f84212c705f2f41028830702206e953059f45b30944133f416e28f1122c0068e8802c0059130e30d01e30d5006e250668b8d9101eef843d0f40430208200a60a018010f40f6fa1f2e0876d8200e22cf82a028010f41722815422018010f40f6fa1f2e08781542201028010f41722820083df018010f40f6fa1f2e087820083df01028010f417028200da7b018010f40f6fa1f2e087128200da7b01028010f417c801c8f400cd7001ca0055218c000e5023cecbffcec903fed0d301d31fd31ffa0030f8283003c0018eb15116db3c705920f90022f9005ad76501d76582020134c8cb17cb0fcb0fcbffcbff71f90400c87401cb0212ca07cbffc9d08eb15116db3c705920f90022f9005ad76501d76582020134c8cb17cb0fcb0fcbffcbff71f90400c87401cb0212ca07cbffc9d0e28200b5552581010b928e8f01ecf843d0f4043020820083df018010f40f6fa1f2e0876d22815422018010f40f6fa1f2e08781542201028010f4178200e22cf82a028010f417228200a60a018010f40f6fa1f2e0878200a60a01028010f417028200da7b018010f40f6fa1f2e087128200da7b01028010f417c801c8f400cd7001ca005a9301ec2359f40b6fa192306ddf206e92306d8e15d0d31ffa00fa40fa00d33fd33ffa0055606c176f07e26eb3f2f48121a22581010b2359f40b6fa192306ddf206e92306d8e15d0d31ffa00fa40fa00d33fd33ffa0055606c176f07e2206ef2d0806f2710265f0624bdf2f42481010b2259f40b6fa192306ddf9000de206e92306d8e15d0d31ffa00fa40fa00d33fd33ffa0055606c176f07e2206ef2d0806f273435546180a1a882103b9aca00a904a024103547345007060504431381010b5027c855605067cb1f5004fa0212ce01fa02cb3fcb3f01fa02c9103412206e953059f45930944133f413e20102fc32d0d31fd31fd33f305126db3c705920f90022f9005ad76501d76582020134c8cb17cb0fcb0fcbffcbff71f90400c87401cb0212ca07cbffc9d08200b5552581010b2359f40b6fa192306ddf206e92306d8e15d0d31ffa00fa40fa00d33fd33ffa0055606c176f07e26eb3f2f48121a22581010b2359f40b6fa192306ddf929401eef843d0f4043020815422018010f40f6fa1f2e0876d228200a60a018010f40f6fa1f2e0878200a60a01028010f41722820083df018010f40f6fa1f2e087820083df01028010f4178200e22cf82a028010f417028200da7b018010f40f6fa1f2e087128200da7b01028010f417c801c8f400cd7001ca005a93001002810101cf00cec901fa206e92306d8e15d0d31ffa00fa40fa00d33fd33ffa0055606c176f07e2206ef2d0806f27165f0624bdf2f42481010b2259f40b6fa192306ddf206e92306d8e15d0d31ffa00fa40fa00d33fd33ffa0055606c176f07e2206ef2d0806f2734355313a05286a115a882103b9aca00a90466a15033a051404474060504431395005c81010b5027c855605067cb1f5004fa0212ce01fa02cb3fcb3f01fa02c9103412206e953059f45930944133f413e202fc8efa5b06810101d700d72c01916d93fa4001e201fa00d72c01916d93fa4001e231813977f84228c705f2f402206ef2d0802481010b2259f40b6fa192306ddf206e92306d8e15d0d31ffa00fa40fa00d33fd33ffa0055606c176f07e2206ef2d0806f275138a182009c9c21c2fff2f41056104610360281010b5027c8e021979b02fe55605067cb1f5004fa0212ce01fa02cb3fcb3f01fa02c922103701206e953059f45930944133f413e203708040544645c8553082100abf5c5f5005cb1f13810101cf0001206e9430cf84809201cee201fa0201206e9430cf84809201cee2c910345a6d6d40037fc8cf8580ca00cf8440ce01fa028069cf40025c6e016eb08a989900065bcf8101648ae2f400c901fb0010465513c8f84301cc7f01ca0055605067ce14810101cf0012cef40001c8f40012f40012cb1fcdc9ed549a001a58cf8680cf8480f400f400cf8101fa8210946a98b6ba8e645b06d33f30c8018210aff90f5758cb1fcb3fc91057104610354430f84270705003804201503304c8cf8580ca00cf8440ce01fa02806acf40f400c901fb00c8f84301cc7f01ca0055605067ce14810101cf0012cef40001c8f40012f40012cb1fcdc9ed54e038c00007c12117b0e3025f07f2c0829c005410465513c8f84301cc7f01ca0055605067ce14810101cf0012cef40001c8f40012f40012cb1fcdc9ed545225dc10');
    builder.storeRef(__system);
    builder.storeUint(0, 1);
    initRequestContract_init_args({ $$type: 'RequestContract_init_args', addressUser, pool, app })(builder);
    const __data = builder.endCell();
    return { code: __code, data: __data };
}

export const RequestContract_errors = {
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
    7997: { message: "You cant approve yourself" },
    8610: { message: "" },
    10453: { message: "You cant decline yourself" },
    14711: { message: "Not enought rights" },
    17654: { message: "Invalid seqno" },
    19281: { message: "Infuccient funds!" },
    28284: { message: "Not enough TON sent" },
    30382: { message: "You must obtain permission from this Compensation Pool." },
    37146: { message: "Insufficient rights!" },
    38055: { message: "Invalid user signature" },
    40092: { message: "Not enought funds" },
    40420: { message: "Not enought rights!" },
    41253: { message: "Not enought funs!" },
    42972: { message: "Not enough rights" },
    44371: { message: "Invalid server signature" },
    46421: { message: "value not found" },
    48401: { message: "Invalid signature" },
    55621: { message: "Your rating only allows you to take less than 2" },
    56619: { message: "Insufficient funds for deploy" },
    56672: { message: "You dont have enought rights in this pool" },
    57255: { message: "Not enough rights!" },
    63522: { message: "Not enought funds!" },
} as const

export const RequestContract_errors_backward = {
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
    "You cant approve yourself": 7997,
    "": 8610,
    "You cant decline yourself": 10453,
    "Not enought rights": 14711,
    "Invalid seqno": 17654,
    "Infuccient funds!": 19281,
    "Not enough TON sent": 28284,
    "You must obtain permission from this Compensation Pool.": 30382,
    "Insufficient rights!": 37146,
    "Invalid user signature": 38055,
    "Not enought funds": 40092,
    "Not enought rights!": 40420,
    "Not enought funs!": 41253,
    "Not enough rights": 42972,
    "Invalid server signature": 44371,
    "value not found": 46421,
    "Invalid signature": 48401,
    "Your rating only allows you to take less than 2": 55621,
    "Insufficient funds for deploy": 56619,
    "You dont have enought rights in this pool": 56672,
    "Not enough rights!": 57255,
    "Not enought funds!": 63522,
} as const

const RequestContract_types: ABIType[] = [
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
    {"name":"ChangeVal","header":3492612805,"fields":[{"name":"val","type":{"kind":"simple","type":"uint","optional":false,"format":8}},{"name":"newVal","type":{"kind":"simple","type":"cell","optional":false}},{"name":"initiator","type":{"kind":"simple","type":"address","optional":false}}]},
    {"name":"RequestContract$Data","header":null,"fields":[{"name":"address","type":{"kind":"simple","type":"address","optional":false}},{"name":"pool","type":{"kind":"simple","type":"uint","optional":false,"format":256}},{"name":"app","type":{"kind":"simple","type":"address","optional":false}}]},
    {"name":"BorrowContract$Data","header":null,"fields":[{"name":"id","type":{"kind":"simple","type":"uint","optional":false,"format":32}},{"name":"address","type":{"kind":"simple","type":"address","optional":false}},{"name":"createdTime","type":{"kind":"simple","type":"uint","optional":false,"format":32}},{"name":"pool","type":{"kind":"simple","type":"uint","optional":false,"format":256}},{"name":"sum","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"app","type":{"kind":"simple","type":"address","optional":false}},{"name":"endTime","type":{"kind":"simple","type":"uint","optional":false,"format":64}}]},
    {"name":"User$Data","header":null,"fields":[{"name":"addressUser","type":{"kind":"simple","type":"address","optional":false}},{"name":"rating","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"app","type":{"kind":"simple","type":"address","optional":false}},{"name":"debts","type":{"kind":"dict","key":"uint","keyFormat":32,"value":"Debt","valueFormat":"ref"}},{"name":"investedIn","type":{"kind":"dict","key":"address","value":"CompPoolData","valueFormat":"ref"}},{"name":"compensationPools","type":{"kind":"dict","key":"uint","keyFormat":256,"value":"address"}},{"name":"debtId","type":{"kind":"simple","type":"uint","optional":false,"format":32}}]},
    {"name":"ExternalLogin","header":2963964483,"fields":[{"name":"serverSignature","type":{"kind":"simple","type":"slice","optional":false}},{"name":"payload","type":{"kind":"simple","type":"cell","optional":false}}]},
    {"name":"ExternalRequest","header":753189113,"fields":[{"name":"pubkey","type":{"kind":"simple","type":"uint","optional":false,"format":256}},{"name":"signature","type":{"kind":"simple","type":"slice","optional":false}},{"name":"payload","type":{"kind":"simple","type":"cell","optional":false}}]},
    {"name":"ExternalBorrow","header":359929327,"fields":[{"name":"pubkey","type":{"kind":"simple","type":"uint","optional":false,"format":256}},{"name":"signature","type":{"kind":"simple","type":"slice","optional":false}},{"name":"payload","type":{"kind":"simple","type":"cell","optional":false}}]},
    {"name":"Overdue","header":3553126303,"fields":[{"name":"address","type":{"kind":"simple","type":"address","optional":false}},{"name":"sum","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"id","type":{"kind":"simple","type":"uint","optional":false,"format":32}}]},
    {"name":"ChangeBorrow","header":3634185715,"fields":[{"name":"balance","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"id","type":{"kind":"simple","type":"uint","optional":false,"format":32}}]},
    {"name":"Time","header":2793874247,"fields":[{"name":"address","type":{"kind":"simple","type":"address","optional":false}},{"name":"id","type":{"kind":"simple","type":"uint","optional":false,"format":16}},{"name":"pool","type":{"kind":"simple","type":"uint","optional":false,"format":16}}]},
    {"name":"Changesum","header":50664625,"fields":[{"name":"sum","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}}]},
    {"name":"Borrow","header":490195545,"fields":[{"name":"idBorrow","type":{"kind":"simple","type":"uint","optional":false,"format":64}},{"name":"idComp","type":{"kind":"simple","type":"uint","optional":false,"format":64}},{"name":"amount","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"time","type":{"kind":"simple","type":"uint","optional":true,"format":32}},{"name":"to","type":{"kind":"simple","type":"address","optional":true}},{"name":"fcc","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"balanceComp","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"balanceBorrow","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}}]},
    {"name":"InitBorrow","header":1774839781,"fields":[{"name":"endTime","type":{"kind":"simple","type":"uint","optional":false,"format":32}},{"name":"sum","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}}]},
    {"name":"CheckTime","header":265710716,"fields":[]},
    {"name":"Close","header":3009980024,"fields":[]},
    {"name":"Update","header":2420382095,"fields":[{"name":"sender","type":{"kind":"simple","type":"address","optional":false}}]},
    {"name":"UpdateEarn","header":584289618,"fields":[{"name":"sender","type":{"kind":"simple","type":"address","optional":false}}]},
    {"name":"Repay","header":1754501411,"fields":[{"name":"id","type":{"kind":"simple","type":"uint","optional":false,"format":256}}]},
    {"name":"Request","header":1390358458,"fields":[{"name":"id","type":{"kind":"simple","type":"uint","optional":false,"format":256}},{"name":"user","type":{"kind":"simple","type":"address","optional":true}}]},
    {"name":"Approve","header":1599388651,"fields":[{"name":"id","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"user","type":{"kind":"simple","type":"address","optional":true}},{"name":"sender","type":{"kind":"simple","type":"address","optional":true}},{"name":"balance","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}}]},
    {"name":"Decline","header":750137859,"fields":[{"name":"id","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"user","type":{"kind":"simple","type":"address","optional":true}},{"name":"sender","type":{"kind":"simple","type":"address","optional":true}},{"name":"balance","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}}]},
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
    {"name":"CompPoolData","header":null,"fields":[{"name":"v","type":{"kind":"simple","type":"uint","optional":false,"format":32}},{"name":"freezed","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"address","type":{"kind":"simple","type":"address","optional":false}},{"name":"balance","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"earnCoff","type":{"kind":"simple","type":"uint","optional":false,"format":64}},{"name":"freezeCoff","type":{"kind":"simple","type":"uint","optional":false,"format":64}},{"name":"balanceUserAfter","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}}]},
    {"name":"BorrowPool$Data","header":null,"fields":[{"name":"id","type":{"kind":"simple","type":"uint","optional":false,"format":32}},{"name":"name","type":{"kind":"simple","type":"string","optional":false}},{"name":"maxTime","type":{"kind":"simple","type":"uint","optional":false,"format":32}},{"name":"app","type":{"kind":"simple","type":"address","optional":false}},{"name":"acc","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"v","type":{"kind":"simple","type":"uint","optional":false,"format":32}},{"name":"borrowBalance","type":{"kind":"dict","key":"int","value":"uint","valueFormat":"coins"}}]},
    {"name":"CompensationPool$Data","header":null,"fields":[{"name":"id","type":{"kind":"simple","type":"uint","optional":false,"format":32}},{"name":"name","type":{"kind":"simple","type":"string","optional":false}},{"name":"maxTime","type":{"kind":"simple","type":"uint","optional":false,"format":32}},{"name":"app","type":{"kind":"simple","type":"address","optional":false}},{"name":"freezed","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"acc","type":{"kind":"simple","type":"uint","optional":false,"format":32}},{"name":"v","type":{"kind":"simple","type":"uint","optional":false,"format":32}},{"name":"fcc","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"borrowBalance","type":{"kind":"dict","key":"int","value":"uint","valueFormat":"coins"}},{"name":"debtId","type":{"kind":"simple","type":"uint","optional":false,"format":256}}]},
    {"name":"AppContract$Data","header":null,"fields":[{"name":"nowId","type":{"kind":"simple","type":"uint","optional":false,"format":256}},{"name":"seqno","type":{"kind":"simple","type":"uint","optional":false,"format":32}},{"name":"serverPublicKey","type":{"kind":"simple","type":"uint","optional":false,"format":256}}]},
]

const RequestContract_opcodes = {
    "Deploy": 2490013878,
    "DeployOk": 2952335191,
    "FactoryDeploy": 1829761339,
    "AddTelegramId": 1754211323,
    "ChangeVal": 3492612805,
    "ExternalLogin": 2963964483,
    "ExternalRequest": 753189113,
    "ExternalBorrow": 359929327,
    "Overdue": 3553126303,
    "ChangeBorrow": 3634185715,
    "Time": 2793874247,
    "Changesum": 50664625,
    "Borrow": 490195545,
    "InitBorrow": 1774839781,
    "CheckTime": 265710716,
    "Close": 3009980024,
    "Update": 2420382095,
    "UpdateEarn": 584289618,
    "Repay": 1754501411,
    "Request": 1390358458,
    "Approve": 1599388651,
    "Decline": 750137859,
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

const RequestContract_getters: ABIGetter[] = [
]

export const RequestContract_getterMapping: { [key: string]: string } = {
}

const RequestContract_receivers: ABIReceiver[] = [
    {"receiver":"internal","message":{"kind":"empty"}},
    {"receiver":"internal","message":{"kind":"typed","type":"Approve"}},
    {"receiver":"internal","message":{"kind":"typed","type":"Decline"}},
    {"receiver":"internal","message":{"kind":"typed","type":"Deploy"}},
]

export const SCALE = 1000000000n;

export class RequestContract implements Contract {
    
    public static readonly storageReserve = 0n;
    public static readonly errors = RequestContract_errors_backward;
    public static readonly opcodes = RequestContract_opcodes;
    
    static async init(addressUser: Address, pool: bigint, app: Address) {
        return await RequestContract_init(addressUser, pool, app);
    }
    
    static async fromInit(addressUser: Address, pool: bigint, app: Address) {
        const __gen_init = await RequestContract_init(addressUser, pool, app);
        const address = contractAddress(0, __gen_init);
        return new RequestContract(address, __gen_init);
    }
    
    static fromAddress(address: Address) {
        return new RequestContract(address);
    }
    
    readonly address: Address; 
    readonly init?: { code: Cell, data: Cell };
    readonly abi: ContractABI = {
        types:  RequestContract_types,
        getters: RequestContract_getters,
        receivers: RequestContract_receivers,
        errors: RequestContract_errors,
    };
    
    constructor(address: Address, init?: { code: Cell, data: Cell }) {
        this.address = address;
        this.init = init;
    }
    
    async send(provider: ContractProvider, via: Sender, args: { value: bigint, bounce?: boolean| null | undefined }, message: null | Approve | Decline | Deploy) {
        
        let body: Cell | null = null;
        if (message === null) {
            body = new Cell();
        }
        if (message && typeof message === 'object' && !(message instanceof Slice) && message.$$type === 'Approve') {
            body = beginCell().store(storeApprove(message)).endCell();
        }
        if (message && typeof message === 'object' && !(message instanceof Slice) && message.$$type === 'Decline') {
            body = beginCell().store(storeDecline(message)).endCell();
        }
        if (message && typeof message === 'object' && !(message instanceof Slice) && message.$$type === 'Deploy') {
            body = beginCell().store(storeDeploy(message)).endCell();
        }
        if (body === null) { throw new Error('Invalid message type'); }
        
        await provider.internal(via, { ...args, body: body });
        
    }
    
}