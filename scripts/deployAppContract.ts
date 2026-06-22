import { toNano } from '@ton/core';
import { AppContract } from '../buildAppContract/AppContract_AppContract';
import { NetworkProvider } from '@ton/blueprint';

export async function run(provider: NetworkProvider) {
    const appContract = await AppContract.fromInit();

    console.log(`Новый адрес контракта: ${appContract.address}`);

    await provider.sender().send(
        {
            // Передаем 0.25 TON — этого гарантированно хватит на создание аккаунта
            value: toNano('0.25'), 
            to: appContract.address,
        init: {
            code: appContract.init!.code, // Передаем скомпилированный бинарный код контракта
            data: appContract.init!.data  // Передаем начальное состояние
        },
        },
    );

    console.log(`🚀 Транзакция деплоя отправлена на новый адрес!`);
}
