const fs = require("fs");
const { SupportedChainlinkPriceFeeds } = require("./index");

(function() {
    const feeds = SupportedChainlinkPriceFeeds;
    for (let i = 0; i < feeds.length % 4; i++) {
        feeds.push("");
    }
    const rows = ["| | | | |", "|---|---|---|---|"];
    for (let j = 0; j < feeds.length / 4; j++) {
        var row = feeds.slice(j * 4, (j*4) + 4);
        row = row.map(pair => `[${pair}](https://etherscan.io/address/${pair}.data.eth)`);
        rows.push("|" + row.join("|") + "|");
    }
    rows.push("| | | | |")
    
    fs.writeFileSync("../markdown_tables/Ethereum Feeds.md", rows.join("\n"));
}())