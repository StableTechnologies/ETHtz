# ETHtz token deployment

The initial deployment of the ETHtz token is an instance of the tzip7 contract. This script is based on on the [USDtz deployment script](https://github.com/USDtz). For completeness the instructions there are duplicated below adjusting for the correct contract address. Another notable change was related to the recent Delphi protocol update which reduced operation costs.

This is the code that was used to deploy the current version of the ETHtz token on the Tezos blockchain at [KT19at7rQUvyjxnZ2fBv7D9zc8rkyG7gAoU8](https://arronax.io/tezos/mainnet/accounts/KT19at7rQUvyjxnZ2fBv7D9zc8rkyG7gAoU8). The script is based on [ConseilJS](https://github.com/Cryptonomic/ConseilJS) and was run with [Nautilus Cloud](https://nautilus.cloud) infrastructure.

## Steps

The script is fairly manual, there are 5 steps, each of which entails a re-build and re-run once the prior step has completed. The script consumed roughly 7 XTZ as fees. Initial setup is just the package installation with `npm i`.

### 1

This step will reveal the account on the chain once it has received seed funding, which in the case of the initial deployment was 10 XTZ.

In the `run()` method uncomment the line below "step 1", then run the following: `npm run build && npm start`.

### 2

Step 2 deploys the token contract which is the [vanilla implementation](https://gitlab.com/tzip/tzip/-/blob/master/proposals/tzip-7/ManagedLedger.tz) of the FA1.2 token defined in [TZIP7 proposal](https://gitlab.com/tzip/tzip/-/blob/master/proposals/tzip-7/ManagedLedger.md) using [ConseilJS](https://github.com/Cryptonomic/ConseilJS/blob/master/src/chain/tezos/contracts/Tzip7ReferenceTokenHelper.ts).

In the `run()` method disable the code from step 1 uncomment the line below "step 2", then run the following: `npm run build && npm start`.

### 3

[Step 3](https://arronax.io/tezos/mainnet/operations/oo6ZABJtTcdeezJs9pqvnQLGBVRkc6fW5cS7XrQjDhV4Y3zPPFd) activates the token contract so that it may execute operations such as balance transfers.

In the `run()` method disable the code from step 2 uncomment the line below "step 3", then run the following: `npm run build && npm start`.

### 4

[Step 4](https://arronax.io/tezos/mainnet/operations/ooKgQYGaVPUgUiGpzeJSonVHNSMVPjHCLhj6zUdZVLhiQmbuB6N) `mint`s a minimum balance to the final token admin. This step is necessary due to a limitation on Galleon Preview 1.1.1b wallet where the software will not allow UI-based interactions with the token contract unless the loaded account has a balance in that ledger. This step mints "1" which is interpreted as 0.0000000000000000001 ETHtz, matching the Ethereum decimals.

In the `run()` method disable the code from step 3 uncomment the line below "step 4", then run the following: `npm run build && npm start`.

### 5

[Step 5](https://arronax.io/tezos/mainnet/operations/oo4rwxHLabtUB4jjsLRHS7ancFeAiDR998sBzDEE56Uej3ZsCrt) transfers ownership of the contract to the destination account. This  was the address designated by [StableTez](https://stabletez.com/). Once this operation completes the initial deployment account loses control of the contract.

Address verification was completed using the Sign & Verify feature of Galleon. The deployment operator shared an out-of-band mnemonic with the administrator who then signed the phrase. The signature was then confirmed in Galleon by the deployment operator.

In the `run()` method disable the code from step 4 uncomment the line below "step 5", then run the following: `npm run build && npm start`.

## ETHtz support

### Wallets

Currently, the following wallets allow ETHtz interactions for balance holders.

- [Galleon 1.1.8b](https://github.com/Cryptonomic/Deployments/wiki/Galleon:-Releases) by [Cryptonomic Inc](https://cryptonomic.tech/).

Additionally, administration functions are supported by:

- [Galleon 1.1.8b](https://github.com/Cryptonomic/Deployments/wiki/Galleon:-Releases) by [Cryptonomic Inc](https://cryptonomic.tech/).

### Block explorers

View [ETHtz operations](https://arronax.io/tezos/mainnet/operations/query/eyJmaWVsZHMiOlsidGltZXN0YW1wIiwiYmxvY2tfbGV2ZWwiLCJzb3VyY2UiLCJkZXN0aW5hdGlvbiIsImZlZSIsInBhcmFtZXRlcnMiXSwicHJlZGljYXRlcyI6W3siZmllbGQiOiJkZXN0aW5hdGlvbiIsIm9wZXJhdGlvbiI6ImVxIiwic2V0IjpbIktUMUxONExQU3FUTVM3U2QyQ0p3NGJiREdSa012MnQ2OEZ5OSJdLCJpbnZlcnNlIjpmYWxzZX0seyJmaWVsZCI6ImtpbmQiLCJvcGVyYXRpb24iOiJlcSIsInNldCI6WyJ0cmFuc2FjdGlvbiJdLCJpbnZlcnNlIjpmYWxzZX0seyJmaWVsZCI6InN0YXR1cyIsIm9wZXJhdGlvbiI6ImVxIiwic2V0IjpbImFwcGxpZWQiXSwiaW52ZXJzZSI6ZmFsc2V9XSwib3JkZXJCeSI6W3siZmllbGQiOiJ0aW1lc3RhbXAiLCJkaXJlY3Rpb24iOiJkZXNjIn1dLCJhZ2dyZWdhdGlvbiI6W10sImxpbWl0IjoxMDAwfQ) on Arronax.

See ETHtz on the various Tezos block explorers.

- [TezBlock](https://tezblock.io/contract/KT19at7rQUvyjxnZ2fBv7D9zc8rkyG7gAoU8)
- [Better Call Dev](https://better-call.dev/mainnet/KT19at7rQUvyjxnZ2fBv7D9zc8rkyG7gAoU8/operations)
- [TzStats](https://tzstats.com/KT19at7rQUvyjxnZ2fBv7D9zc8rkyG7gAoU8)
- [TzKt](https://tzkt.io/KT19at7rQUvyjxnZ2fBv7D9zc8rkyG7gAoU8/operations)
- [Arronax](https://arronax.io/tezos/mainnet/accounts/KT19at7rQUvyjxnZ2fBv7D9zc8rkyG7gAoU8)
