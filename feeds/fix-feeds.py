import os
import json

def main(fname):
    with open(fname, 'r') as f:
        data = f.readlines()
    pairsInfo = []
    for line in data:
        feedName, decimals, resolvedAddress = line.split("\t")
        if "/" in feedName:
            pairsInfo.append(
                {
                    "pair": "-".join([x.strip().lower() for x in feedName.split("/")]).replace(" ", "-"),
                    "decimals": int(decimals.strip()),
                    "address": resolvedAddress
                }
            )
    with open(fname.replace(".txt", ".json"), "w+") as f:
        json.dump(pairsInfo, f, indent=4)

fnames = os.listdir(os.curdir)
for fname in fnames:
    if ".txt" in fname:
        try:
            print(f"Parsing {fname}")
            main(fname)
        except:
            print(f"Failed to parse feed data from file: {fname}")
print("Done!")