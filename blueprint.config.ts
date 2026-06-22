import { Config } from '@ton/blueprint';

export const config: Config = {
    network: {
        // Указываем прямой JSON-файл конфигурации тестнета
        endpoint: 'https://ton.org/testnet-global.config.json', 
        type: 'testnet', 
        version: 'liteclient', // Ключевое слово для переключения Blueprint на Lite Client
    },
};
