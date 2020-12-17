import fetch from 'node-fetch';
import * as log from 'loglevel';

import { registerFetch, registerLogger } from 'conseiljs';

import { TezosNodeReader, TezosNodeWriter, TezosConseilClient, TezosMessageUtils, KeyStore, Signer, Tzip7ReferenceTokenHelper } from 'conseiljs';
import { KeyStoreUtils, SoftSigner } from 'conseiljs-softsigner';

const logger = log.getLogger('conseiljs');
logger.setLevel('debug', false);
registerLogger(logger);
registerFetch(fetch);

const tezosNode = '';
const conseilServer = { url: '', apiKey: '', network: 'mainnet' };
const networkBlockTime = 60 + 1;

function clearRPCOperationGroupHash(hash: string) {
    return hash.replace(/\"/g, '').replace(/\n/, '');
}

async function initAccount(signer: Signer, keyStore: KeyStore) {
    if (await TezosNodeReader.isManagerKeyRevealedForAccount(tezosNode, keyStore.publicKeyHash)) { return; }

    const nodeResult = await TezosNodeWriter.sendKeyRevealOperation(tezosNode, signer, keyStore);
    const groupid = clearRPCOperationGroupHash(nodeResult.operationGroupID);
    console.log(`Injected reveal operation with ${groupid}`);

    await TezosConseilClient.awaitOperationConfirmation(conseilServer, conseilServer.network, groupid, 5, networkBlockTime);
}

async function deployTokenContract(signer: Signer, keyStore: KeyStore) {
    console.log('deploying a tzip7 token contract');
    const groupid = await Tzip7ReferenceTokenHelper.deployContract(tezosNode, signer, keyStore, 500_000, keyStore.publicKeyHash, true, 0, 150_000, 5_000);
    console.log(`injected operation ${groupid}`);
}

async function enableToken(signer: Signer, keyStore: KeyStore, contractAddress: string) {
    console.log(`enabling token at ${contractAddress}`);
    const groupid = await Tzip7ReferenceTokenHelper.activateLedger(tezosNode, signer, keyStore, contractAddress, 20_000, 120_000, 0);
    console.log(`injected operation ${groupid}`);
}

async function mintMinimumBalance(signer: Signer, keyStore: KeyStore, contractAddress: string, targetAdmin: string) {
    console.log(`minting minimum balance future admin ${targetAdmin}`);
    const groupid = await Tzip7ReferenceTokenHelper.mint(tezosNode, signer, keyStore, contractAddress, 20_000, targetAdmin, 1, 120_000, 100);
    console.log(`injected operation ${groupid}`);
}

async function transferAdminRights(signer: Signer, keyStore: KeyStore, contractAddress: string, targetAdmin: string) {
    console.log(`transferring ownership to ${targetAdmin}`);
    const groupid = await Tzip7ReferenceTokenHelper.setAdministrator(tezosNode, signer, keyStore, contractAddress, targetAdmin, 5_000, 30_000, 0);
    console.log(`injected operation ${groupid}`);
}

async function run() {
    let keyStore: KeyStore;
    let signer: Signer;
    const contractAddress = 'KT19at7rQUvyjxnZ2fBv7D9zc8rkyG7gAoU8';
    const targetAdmin = 'tz1gEMsgfFqfZiUEmGypaD8SPYouBFbPahqu';

    keyStore = await KeyStoreUtils.restoreIdentityFromSecretKey('edskRjLjJdy3Xg6wUNn9hPVco7rEf42dGB28mo7Hd359HQktkYvac9pqyBGURSvUDrCXnLrRqtJjhm71zdc2vCGHqpkkCBonxk');
    signer = await SoftSigner.createSigner(TezosMessageUtils.writeKeyWithHint(keyStore.secretKey, 'edsk'));
    console.log(`loaded keys for ${keyStore.publicKeyHash}`);

    // step 1
    //await initAccount(signer, keyStore);

    // step 2
    //await deployTokenContract(signer, keyStore);

    // step 3
    //await enableToken(signer, keyStore, contractAddress);

    // step 4
    //await mintMinimumBalance(signer, keyStore, contractAddress, targetAdmin);

    // step 5
    await transferAdminRights(signer, keyStore, contractAddress, targetAdmin);
}

run();
