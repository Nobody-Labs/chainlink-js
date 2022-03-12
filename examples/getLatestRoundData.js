const { formatUnits } = require("@ethersproject/units");
const { getChainlinkPriceFeed } = require("../index");
require("dotenv").config();

(async function() {

    const priceFeed = await getChainlinkPriceFeed({
        asset1: "eth",
        asset2: "usd",
        providerUrl: process.env.ETH_PROVIDER_URL
    });

    const {
        roundId,
        answer,
        startedAt,
        updatedAt,
        answeredInRound
    } = await priceFeed.latestRoundData();

    const decimals = await priceFeed.decimals();

    console.log(`roundId: ${roundId}`);
    console.log(`answer: ${answer}`);
    console.log(`startedAt: ${startedAt}`);
    console.log(`updatedAt: ${updatedAt}`);
    console.log(`answeredInRound: ${answeredInRound}`);

    console.log(`decimals answer: ${formatUnits(answer, decimals)}`);
}());