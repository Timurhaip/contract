import { Config } from '@ton/blueprint';
import { TonClient4 } from '@ton/ton';
import { HttpApi } from '@ton/ton/dist/client/api/HttpApi';

export const config: Config = {
    network: {
        endpoint: 'https://orbs.network', // Стабильный RPC без ошибок десинхронизации
        type: 'testnet',
        // Blueprint автоматически подхватит WALLET_MNEMONIC и WALLET_VERSION из .env
    },
};
