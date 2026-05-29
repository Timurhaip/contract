import { toNano } from '@ton/core';
import { AppContract } from '../buildAppContract/AppContract_AppContract';
import { NetworkProvider } from '@ton/blueprint';

export async function run(provider: NetworkProvider) {
    const appContract = provider.open(await AppContract.fromInit());

    await appContract.send(
        provider.sender(),
        {
            value: toNano('0.05'),
        },
        null,
    );

    await provider.waitForDeploy(appContract.address);

    console.log(`DEPLOYED: ADDRESS ${appContract.address}`)
}
