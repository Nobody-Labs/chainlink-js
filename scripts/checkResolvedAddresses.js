const { getProvider } = require("./index");
require("dotenv").config();
// I used this file to check the resolved addresses of the fixed json files.
// There were three discrepancies from ENS subdomains that I corrected:
//   1. ohmv1-eth became ohm-eth
//   2. dpi-eth-index became dpi-eth
//   3. dpi-usd-index became dpi-usd

(async function() {
    const feedsData = require("../feeds/ethereum.json");
    const provider = getProvider(process.env.ETH_PROVIDER_URL);
    feedsData.map(async feed => {
        const addr = await provider.resolveName(`${feed.pair}.data.eth`);
        if (!addr) {
            console.log(feed.pair);
        }
    })
}());