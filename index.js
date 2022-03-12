const {
    Contract
} = require('@ethersproject/contracts');
const {
    getDefaultProvider,
    JsonRpcProvider
} = require('@ethersproject/providers');

const SupportedChainlinkPriceFeeds = require("./ethereum-feeds.json").map(feed => feed.pair);

function getProvider(providerUrl) {
    return providerUrl ? new JsonRpcProvider(providerUrl) : getDefaultProvider();
};

async function getPairAddressFromChain({ asset1, asset2, provider }) {
    let ensName = `${asset1}-${asset2}.data.eth`;
    let resolvedAddress = await provider.resolveName(ensName);
    if (!resolvedAddress)
        throw new Error(`Invalid asset pair (non-existent ENS record for ${ensName}).`);
    return resolvedAddress;
};

async function getChainlinkPriceFeed({ asset1, asset2, providerUrl }) {
    const provider = getProvider(providerUrl);
    const network = await provider.getNetwork();
    if (!network.chainId || network.chainId !== 1)
        throw new Error(`Use Ethereum mainnet only. Invalid network: ${network}.`);

    // Throws an error if the pair doesn't exist.
    const resolvedAddress = await getPairAddressFromChain({asset1, asset2, provider});

    return new Contract(
        resolvedAddress,
        [
            "function decimals() public view returns (uint8)",
            "function latestAnswer() public view returns (int256)",
            "function description() public view returns (string memory)",
            "function latestTimestamp() public view returns (uint256)",
            "function latestRoundData() public view returns (uint80 roundId, int256 answer, uint256 startedAt, uint256 updatedAt, uint80 answeredInRound)"
        ],
        provider
    );
};

async function getLatestRoundData({ asset1, asset2, providerUrl }) {
    const feed = await getChainlinkPriceFeed({ asset1, asset2, providerUrl });
    return await feed.latestRoundData();
};

module.exports = {
    SupportedChainlinkPriceFeeds,
    getChainlinkPriceFeed,
    getLatestRoundData,
    getPairAddressFromChain,
    getProvider
};