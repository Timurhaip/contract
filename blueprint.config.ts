import { Config } from '@ton/blueprint';

export const config: Config = {
    network: {
        endpoint: 'https://testnet.toncenter.com/api/v2/jsonRPC',
        type: 'testnet',
        version: 'v2',
        // Добавляем полученный ключ в заголовки
        headers: {
            'X-API-Key': '76b73ce5929f715872750d261098bd40a9be4cd9ad0d3220555faf64f2006ebc'
        }
    },
};
