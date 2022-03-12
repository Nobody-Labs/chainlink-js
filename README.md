# chainlink-js
This is a simple library that enables quick integration of Chainlink price feeds into your JavaScript app.

## Installation
```sh
# Using npm
$ npm install nobody-labs/chainlink-js

# Using yarn
$ yarn add nobody-labs/chainlink-js
```

## Usage
```js
const { formatUnits } = require("@ethersproject/units");
const { getChainlinkPriceFeed } = require("chainlink-js");

async function PriceFeedConsumingDapp() {
    // Instantiate a Chainlink price feed for the FRAX/ETH pair.
    // Note that this gives a quote of asset1 in units of asset2.
    const fraxEthPriceFeed = await getChainlinkPriceFeed({
        asset1: "frax",
        asset2: "eth",
        providerUrl: "my-eth-provider-url"
    });

    // The latest answer can be retrieved from the chain using `latestRoundData`.
    const {
        roundId,
        answer,
        startedAt,
        updatedAt,
        answeredInRound
    } = await fraxEthPriceFeed.latestRoundData();

    console.log(`roundId: ${roundId}`);
    console.log(`answer: ${answer}`);
    console.log(`startedAt: ${startedAt}`);
    console.log(`updatedAt: ${updatedAt}`);
    console.log(`answeredInRound: ${answeredInRound}`);

    // The values are all BigNumber instances.
    // We can do some processing if we want only reasonable data.
    if (updatedAt.lt(1645496542)) {
        throw new Error("Outdated answer!")
    }

    // We can use the number of decimals to convert the answer.
    const decimals = await fraxEthPriceFeed.decimals();
    console.log(`decimals answer: ${formatUnits(answer, decimals)}`);
}
```

## Supported Chains
The code exported from this package reads addresses directly from Chainlink's [data.eth](https://app.ens.domains/name/data.eth/details) ENS subdomains on-chain, which point to proxies that reference production price feeds in real time.

As such, this library only natively supports price feeds deployed on **Ethereum mainnet**. The data in [feeds](./feeds/) was manually copy pasted from the [chainlink docs](https://docs.chain.link/docs/reference-contracts/) and *could be out of date*. Only use the Ethereum mainnet feeds (at least until ENS is cross chain compatible)!

## Supported Chainlink Price Feeds
| | | | |
|---|---|---|---|
|[1inch-eth](https://etherscan.io/address/1inch-eth.data.eth)|[1inch-usd](https://etherscan.io/address/1inch-usd.data.eth)|[aapl-usd](https://etherscan.io/address/aapl-usd.data.eth)|[aave-eth](https://etherscan.io/address/aave-eth.data.eth)|
|[aave-usd](https://etherscan.io/address/aave-usd.data.eth)|[ach-usd](https://etherscan.io/address/ach-usd.data.eth)|[ada-usd](https://etherscan.io/address/ada-usd.data.eth)|[adx-usd](https://etherscan.io/address/adx-usd.data.eth)|
|[akro-usd](https://etherscan.io/address/akro-usd.data.eth)|[albt-usd](https://etherscan.io/address/albt-usd.data.eth)|[alcx-eth](https://etherscan.io/address/alcx-eth.data.eth)|[alpha-eth](https://etherscan.io/address/alpha-eth.data.eth)|
|[amp-usd](https://etherscan.io/address/amp-usd.data.eth)|[ampl-eth](https://etherscan.io/address/ampl-eth.data.eth)|[ampl-usd](https://etherscan.io/address/ampl-usd.data.eth)|[amzn-usd](https://etherscan.io/address/amzn-usd.data.eth)|
|[ankr-eth](https://etherscan.io/address/ankr-eth.data.eth)|[ankr-usd](https://etherscan.io/address/ankr-usd.data.eth)|[ant-eth](https://etherscan.io/address/ant-eth.data.eth)|[arpa-usd](https://etherscan.io/address/arpa-usd.data.eth)|
|[atom-eth](https://etherscan.io/address/atom-eth.data.eth)|[atom-usd](https://etherscan.io/address/atom-usd.data.eth)|[auction-usd](https://etherscan.io/address/auction-usd.data.eth)|[aud-usd](https://etherscan.io/address/aud-usd.data.eth)|
|[audio-usd](https://etherscan.io/address/audio-usd.data.eth)|[auto-usd](https://etherscan.io/address/auto-usd.data.eth)|[avax-usd](https://etherscan.io/address/avax-usd.data.eth)|[axs-eth](https://etherscan.io/address/axs-eth.data.eth)|
|[badger-eth](https://etherscan.io/address/badger-eth.data.eth)|[badger-usd](https://etherscan.io/address/badger-usd.data.eth)|[bal-eth](https://etherscan.io/address/bal-eth.data.eth)|[bal-usd](https://etherscan.io/address/bal-usd.data.eth)|
|[band-eth](https://etherscan.io/address/band-eth.data.eth)|[band-usd](https://etherscan.io/address/band-usd.data.eth)|[bat-eth](https://etherscan.io/address/bat-eth.data.eth)|[bat-usd](https://etherscan.io/address/bat-usd.data.eth)|
|[bch-usd](https://etherscan.io/address/bch-usd.data.eth)|[beta-eth](https://etherscan.io/address/beta-eth.data.eth)|[bico-usd](https://etherscan.io/address/bico-usd.data.eth)|[bit-usd](https://etherscan.io/address/bit-usd.data.eth)|
|[bnb-eth](https://etherscan.io/address/bnb-eth.data.eth)|[bnb-usd](https://etherscan.io/address/bnb-usd.data.eth)|[bnt-eth](https://etherscan.io/address/bnt-eth.data.eth)|[bnt-usd](https://etherscan.io/address/bnt-usd.data.eth)|
|[bond-eth](https://etherscan.io/address/bond-eth.data.eth)|[brl-usd](https://etherscan.io/address/brl-usd.data.eth)|[btc-eth](https://etherscan.io/address/btc-eth.data.eth)|[btc-usd](https://etherscan.io/address/btc-usd.data.eth)|
|[btc-height](https://etherscan.io/address/btc-height.data.eth)|[btm-usd](https://etherscan.io/address/btm-usd.data.eth)|[busd-eth](https://etherscan.io/address/busd-eth.data.eth)|[busd-usd](https://etherscan.io/address/busd-usd.data.eth)|
|[c98-usd](https://etherscan.io/address/c98-usd.data.eth)|[cad-usd](https://etherscan.io/address/cad-usd.data.eth)|[cel-eth](https://etherscan.io/address/cel-eth.data.eth)|[celo-usd](https://etherscan.io/address/celo-usd.data.eth)|
|[celr-usd](https://etherscan.io/address/celr-usd.data.eth)|[chf-usd](https://etherscan.io/address/chf-usd.data.eth)|[cny-usd](https://etherscan.io/address/cny-usd.data.eth)|[coin-usd](https://etherscan.io/address/coin-usd.data.eth)|
|[comp-eth](https://etherscan.io/address/comp-eth.data.eth)|[comp-usd](https://etherscan.io/address/comp-usd.data.eth)|[cream-eth](https://etherscan.io/address/cream-eth.data.eth)|[cro-eth](https://etherscan.io/address/cro-eth.data.eth)|
|[cro-usd](https://etherscan.io/address/cro-usd.data.eth)|[crv-eth](https://etherscan.io/address/crv-eth.data.eth)|[crv-usd](https://etherscan.io/address/crv-usd.data.eth)|[cspr-usd](https://etherscan.io/address/cspr-usd.data.eth)|
|[ctsi-eth](https://etherscan.io/address/ctsi-eth.data.eth)|[ctx-usd](https://etherscan.io/address/ctx-usd.data.eth)|[cv-index](https://etherscan.io/address/cv-index.data.eth)|[cvx-usd](https://etherscan.io/address/cvx-usd.data.eth)|
|[calculated-xsushi-eth](https://etherscan.io/address/calculated-xsushi-eth.data.eth)|[calculated-xsushi-usd](https://etherscan.io/address/calculated-xsushi-usd.data.eth)|[dai-eth](https://etherscan.io/address/dai-eth.data.eth)|[dai-usd](https://etherscan.io/address/dai-usd.data.eth)|
|[dash-usd](https://etherscan.io/address/dash-usd.data.eth)|[data-eth](https://etherscan.io/address/data-eth.data.eth)|[dia-usd](https://etherscan.io/address/dia-usd.data.eth)|[dnt-eth](https://etherscan.io/address/dnt-eth.data.eth)|
|[dodo-usd](https://etherscan.io/address/dodo-usd.data.eth)|[doge-usd](https://etherscan.io/address/doge-usd.data.eth)|[dot-usd](https://etherscan.io/address/dot-usd.data.eth)|[dpi-eth](https://etherscan.io/address/dpi-eth.data.eth)|
|[dpi-usd](https://etherscan.io/address/dpi-usd.data.eth)|[dydx-usd](https://etherscan.io/address/dydx-usd.data.eth)|[enj-eth](https://etherscan.io/address/enj-eth.data.eth)|[enj-usd](https://etherscan.io/address/enj-usd.data.eth)|
|[ens-usd](https://etherscan.io/address/ens-usd.data.eth)|[eos-usd](https://etherscan.io/address/eos-usd.data.eth)|[eps-usd](https://etherscan.io/address/eps-usd.data.eth)|[ern-usd](https://etherscan.io/address/ern-usd.data.eth)|
|[etc-usd](https://etherscan.io/address/etc-usd.data.eth)|[eth-btc](https://etherscan.io/address/eth-btc.data.eth)|[eth-usd](https://etherscan.io/address/eth-usd.data.eth)|[eth-xdr](https://etherscan.io/address/eth-xdr.data.eth)|
|[eur-usd](https://etherscan.io/address/eur-usd.data.eth)|[eurt-usd](https://etherscan.io/address/eurt-usd.data.eth)|[farm-eth](https://etherscan.io/address/farm-eth.data.eth)|[fb-usd](https://etherscan.io/address/fb-usd.data.eth)|
|[fei-eth](https://etherscan.io/address/fei-eth.data.eth)|[fei-usd](https://etherscan.io/address/fei-usd.data.eth)|[fet-usd](https://etherscan.io/address/fet-usd.data.eth)|[fil-eth](https://etherscan.io/address/fil-eth.data.eth)|
|[fil-usd](https://etherscan.io/address/fil-usd.data.eth)|[flow-usd](https://etherscan.io/address/flow-usd.data.eth)|[for-usd](https://etherscan.io/address/for-usd.data.eth)|[fox-usd](https://etherscan.io/address/fox-usd.data.eth)|
|[front-usd](https://etherscan.io/address/front-usd.data.eth)|[ftm-eth](https://etherscan.io/address/ftm-eth.data.eth)|[ftt-eth](https://etherscan.io/address/ftt-eth.data.eth)|[fxs-usd](https://etherscan.io/address/fxs-usd.data.eth)|
|[fast-gas-gwei](https://etherscan.io/address/fast-gas-gwei.data.eth)|[gbp-usd](https://etherscan.io/address/gbp-usd.data.eth)|[ghst-eth](https://etherscan.io/address/ghst-eth.data.eth)|[glm-usd](https://etherscan.io/address/glm-usd.data.eth)|
|[gno-eth](https://etherscan.io/address/gno-eth.data.eth)|[googl-usd](https://etherscan.io/address/googl-usd.data.eth)|[grt-eth](https://etherscan.io/address/grt-eth.data.eth)|[grt-usd](https://etherscan.io/address/grt-usd.data.eth)|
|[gtc-eth](https://etherscan.io/address/gtc-eth.data.eth)|[gusd-eth](https://etherscan.io/address/gusd-eth.data.eth)|[gusd-usd](https://etherscan.io/address/gusd-usd.data.eth)|[hbar-usd](https://etherscan.io/address/hbar-usd.data.eth)|
|[hegic-eth](https://etherscan.io/address/hegic-eth.data.eth)|[hegic-usd](https://etherscan.io/address/hegic-usd.data.eth)|[ht-usd](https://etherscan.io/address/ht-usd.data.eth)|[husd-eth](https://etherscan.io/address/husd-eth.data.eth)|
|[idr-usd](https://etherscan.io/address/idr-usd.data.eth)|[ilv-eth](https://etherscan.io/address/ilv-eth.data.eth)|[inj-usd](https://etherscan.io/address/inj-usd.data.eth)|[inr-usd](https://etherscan.io/address/inr-usd.data.eth)|
|[iost-usd](https://etherscan.io/address/iost-usd.data.eth)|[iotx-usd](https://etherscan.io/address/iotx-usd.data.eth)|[iwm-usd](https://etherscan.io/address/iwm-usd.data.eth)|[jpy-usd](https://etherscan.io/address/jpy-usd.data.eth)|
|[knc-eth](https://etherscan.io/address/knc-eth.data.eth)|[knc-usd](https://etherscan.io/address/knc-usd.data.eth)|[kp3r-eth](https://etherscan.io/address/kp3r-eth.data.eth)|[krw-usd](https://etherscan.io/address/krw-usd.data.eth)|
|[ksm-usd](https://etherscan.io/address/ksm-usd.data.eth)|[ldo-eth](https://etherscan.io/address/ldo-eth.data.eth)|[link-eth](https://etherscan.io/address/link-eth.data.eth)|[link-usd](https://etherscan.io/address/link-usd.data.eth)|
|[lon-eth](https://etherscan.io/address/lon-eth.data.eth)|[lrc-eth](https://etherscan.io/address/lrc-eth.data.eth)|[lrc-usd](https://etherscan.io/address/lrc-usd.data.eth)|[ltc-usd](https://etherscan.io/address/ltc-usd.data.eth)|
|[luna-eth](https://etherscan.io/address/luna-eth.data.eth)|[lusd-usd](https://etherscan.io/address/lusd-usd.data.eth)|[mana-eth](https://etherscan.io/address/mana-eth.data.eth)|[mana-usd](https://etherscan.io/address/mana-usd.data.eth)|
|[mask-usd](https://etherscan.io/address/mask-usd.data.eth)|[matic-usd](https://etherscan.io/address/matic-usd.data.eth)|[mim-usd](https://etherscan.io/address/mim-usd.data.eth)|[mir-usd](https://etherscan.io/address/mir-usd.data.eth)|
|[mkr-eth](https://etherscan.io/address/mkr-eth.data.eth)|[mkr-usd](https://etherscan.io/address/mkr-usd.data.eth)|[mln-eth](https://etherscan.io/address/mln-eth.data.eth)|[msft-usd](https://etherscan.io/address/msft-usd.data.eth)|
|[near-usd](https://etherscan.io/address/near-usd.data.eth)|[nflx-usd](https://etherscan.io/address/nflx-usd.data.eth)|[ngn-usd](https://etherscan.io/address/ngn-usd.data.eth)|[nmr-eth](https://etherscan.io/address/nmr-eth.data.eth)|
|[nmr-usd](https://etherscan.io/address/nmr-usd.data.eth)|[nu-eth](https://etherscan.io/address/nu-eth.data.eth)|[nzd-usd](https://etherscan.io/address/nzd-usd.data.eth)|[ocean-eth](https://etherscan.io/address/ocean-eth.data.eth)|
|[ocean-usd](https://etherscan.io/address/ocean-usd.data.eth)|[ogn-eth](https://etherscan.io/address/ogn-eth.data.eth)|[ohm-eth](https://etherscan.io/address/ohm-eth.data.eth)|[ohmv2-eth](https://etherscan.io/address/ohmv2-eth.data.eth)|
|[okb-usd](https://etherscan.io/address/okb-usd.data.eth)|[om-usd](https://etherscan.io/address/om-usd.data.eth)|[omg-eth](https://etherscan.io/address/omg-eth.data.eth)|[omg-usd](https://etherscan.io/address/omg-usd.data.eth)|
|[ont-usd](https://etherscan.io/address/ont-usd.data.eth)|[orn-eth](https://etherscan.io/address/orn-eth.data.eth)|[oxt-usd](https://etherscan.io/address/oxt-usd.data.eth)|[pax-eth](https://etherscan.io/address/pax-eth.data.eth)|
|[pax-reserves](https://etherscan.io/address/pax-reserves.data.eth)|[paxg-eth](https://etherscan.io/address/paxg-eth.data.eth)|[paxg-reserves](https://etherscan.io/address/paxg-reserves.data.eth)|[perp-eth](https://etherscan.io/address/perp-eth.data.eth)|
|[perp-usd](https://etherscan.io/address/perp-usd.data.eth)|[pha-usd](https://etherscan.io/address/pha-usd.data.eth)|[php-usd](https://etherscan.io/address/php-usd.data.eth)|[pla-usd](https://etherscan.io/address/pla-usd.data.eth)|
|[pundix-usd](https://etherscan.io/address/pundix-usd.data.eth)|[qqq-usd](https://etherscan.io/address/qqq-usd.data.eth)|[rai-eth](https://etherscan.io/address/rai-eth.data.eth)|[rai-usd](https://etherscan.io/address/rai-usd.data.eth)|
|[ramp-usd](https://etherscan.io/address/ramp-usd.data.eth)|[rari-eth](https://etherscan.io/address/rari-eth.data.eth)|[ren-eth](https://etherscan.io/address/ren-eth.data.eth)|[ren-usd](https://etherscan.io/address/ren-usd.data.eth)|
|[rep-eth](https://etherscan.io/address/rep-eth.data.eth)|[rep-usd](https://etherscan.io/address/rep-usd.data.eth)|[req-usd](https://etherscan.io/address/req-usd.data.eth)|[rlc-eth](https://etherscan.io/address/rlc-eth.data.eth)|
|[rsr-usd](https://etherscan.io/address/rsr-usd.data.eth)|[rub-usd](https://etherscan.io/address/rub-usd.data.eth)|[rune-eth](https://etherscan.io/address/rune-eth.data.eth)|[rune-usd](https://etherscan.io/address/rune-usd.data.eth)|
|[sand-usd](https://etherscan.io/address/sand-usd.data.eth)|[sgd-usd](https://etherscan.io/address/sgd-usd.data.eth)|[shib-eth](https://etherscan.io/address/shib-eth.data.eth)|[slp-eth](https://etherscan.io/address/slp-eth.data.eth)|
|[snx-eth](https://etherscan.io/address/snx-eth.data.eth)|[snx-usd](https://etherscan.io/address/snx-usd.data.eth)|[sol-usd](https://etherscan.io/address/sol-usd.data.eth)|[spell-usd](https://etherscan.io/address/spell-usd.data.eth)|
|[spy-usd](https://etherscan.io/address/spy-usd.data.eth)|[srm-eth](https://etherscan.io/address/srm-eth.data.eth)|[stake-eth](https://etherscan.io/address/stake-eth.data.eth)|[stmx-usd](https://etherscan.io/address/stmx-usd.data.eth)|
|[susd-eth](https://etherscan.io/address/susd-eth.data.eth)|[sushi-eth](https://etherscan.io/address/sushi-eth.data.eth)|[sushi-usd](https://etherscan.io/address/sushi-usd.data.eth)|[sxp-usd](https://etherscan.io/address/sxp-usd.data.eth)|
|[toke-usd](https://etherscan.io/address/toke-usd.data.eth)|[tomo-usd](https://etherscan.io/address/tomo-usd.data.eth)|[tribe-eth](https://etherscan.io/address/tribe-eth.data.eth)|[tru-usd](https://etherscan.io/address/tru-usd.data.eth)|
|[trx-usd](https://etherscan.io/address/trx-usd.data.eth)|[try-usd](https://etherscan.io/address/try-usd.data.eth)|[tsla-usd](https://etherscan.io/address/tsla-usd.data.eth)|[tusd-eth](https://etherscan.io/address/tusd-eth.data.eth)|
|[tusd-usd](https://etherscan.io/address/tusd-usd.data.eth)|[total-marketcap-usd](https://etherscan.io/address/total-marketcap-usd.data.eth)|[uft-usd](https://etherscan.io/address/uft-usd.data.eth)|[uma-eth](https://etherscan.io/address/uma-eth.data.eth)|
|[uni-eth](https://etherscan.io/address/uni-eth.data.eth)|[uni-usd](https://etherscan.io/address/uni-usd.data.eth)|[usdc-eth](https://etherscan.io/address/usdc-eth.data.eth)|[usdc-usd](https://etherscan.io/address/usdc-usd.data.eth)|
|[usdk-usd](https://etherscan.io/address/usdk-usd.data.eth)|[usdn-usd](https://etherscan.io/address/usdn-usd.data.eth)|[usdp-usd](https://etherscan.io/address/usdp-usd.data.eth)|[usdt-eth](https://etherscan.io/address/usdt-eth.data.eth)|
|[usdt-usd](https://etherscan.io/address/usdt-usd.data.eth)|[ust-eth](https://etherscan.io/address/ust-eth.data.eth)|[ust-usd](https://etherscan.io/address/ust-usd.data.eth)|[vgx-eth](https://etherscan.io/address/vgx-eth.data.eth)|
|[vxx-usd](https://etherscan.io/address/vxx-usd.data.eth)|[waves-usd](https://etherscan.io/address/waves-usd.data.eth)|[wing-usd](https://etherscan.io/address/wing-usd.data.eth)|[wnxm-eth](https://etherscan.io/address/wnxm-eth.data.eth)|
|[woo-eth](https://etherscan.io/address/woo-eth.data.eth)|[wti-usd](https://etherscan.io/address/wti-usd.data.eth)|[xag-usd](https://etherscan.io/address/xag-usd.data.eth)|[xau-usd](https://etherscan.io/address/xau-usd.data.eth)|
|[xlm-usd](https://etherscan.io/address/xlm-usd.data.eth)|[xmr-usd](https://etherscan.io/address/xmr-usd.data.eth)|[xrp-usd](https://etherscan.io/address/xrp-usd.data.eth)|[xsushi-eth](https://etherscan.io/address/xsushi-eth.data.eth)|
|[xtz-usd](https://etherscan.io/address/xtz-usd.data.eth)|[xvs-usd](https://etherscan.io/address/xvs-usd.data.eth)|[yfi-eth](https://etherscan.io/address/yfi-eth.data.eth)|[yfi-usd](https://etherscan.io/address/yfi-usd.data.eth)|
|[yfii-eth](https://etherscan.io/address/yfii-eth.data.eth)|[ygg-eth](https://etherscan.io/address/ygg-eth.data.eth)|[zar-usd](https://etherscan.io/address/zar-usd.data.eth)|[zec-usd](https://etherscan.io/address/zec-usd.data.eth)|
|[zrx-eth](https://etherscan.io/address/zrx-eth.data.eth)|[zrx-usd](https://etherscan.io/address/zrx-usd.data.eth)|[aust-ust](https://etherscan.io/address/aust-ust.data.eth)|[scex-usd](https://etherscan.io/address/scex-usd.data.eth)|
|[sdefi-usd](https://etherscan.io/address/sdefi-usd.data.eth)|[susd-usd](https://etherscan.io/address/susd-usd.data.eth)|[](https://etherscan.io/address/.data.eth)|[](https://etherscan.io/address/.data.eth)|
| | | | |