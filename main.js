
import { HTMLUtils } from "./modules/html-utils.js";
import { DeckDef } from "./modules/deck-def.js";
import { DeckDistributionMap } from "./modules/deck-distribution-map.js";
import { DeckInfo } from "./modules/deck-info.js";

const deckInfoTextarea = document.getElementById("deck-info");
const deckDefTextarea = document.getElementById("deck-def");
const distributionButton = document.getElementById("distribution-button");
const distributionTable = document.getElementById("distribution");
main();

async function main() {
    // デッキ情報読み込み
    const deckInfoResponse = await fetch("./deck-info.txt");
    deckInfoTextarea.value = await deckInfoResponse.text();

    // デッキ定義読み込み
    const deckDefResponse = await fetch("./deck-def.json");
    deckDefTextarea.value = await deckDefResponse.text();
}

// moduleスコープだとHTMLからは見えないらしい
// 参考　https://stackoverflow.com/a/44591205
distributionButton.addEventListener("click", createDistribution);

export function createDistribution() {
    // デッキ情報読み込み
    const deckInfos = deckInfoTextarea.value.split("\n")
        // 空行は省く
        .filter(url => url)
        .map(url => DeckInfo.fromDeckUrl(url));
    
    // デッキ定義読み込み
    const deckDefs = [];
    try {
        // Javascriptだとクラスをデシリアライズしてるわけではないので、インスタンスに値をコピー
        for (const deckJSON of JSON.parse(deckDefTextarea.value)) {
            deckDefs.push(DeckDef.fromJSON(deckJSON));
        }
    } catch (error) {
        alert("デッキ定義読み込みエラー\n" + error);
        return;
    }

    // デッキ数を数える
    const deckDistributionMap = new DeckDistributionMap(deckDefs);
    deckDistributionMap.countArray(...deckInfos);

    // 表を作成
    deckDistributionMap.desc((deckDef, num) => {
        if (num <= 0) {
            return;
        }

        appendRow(deckDef.name, num, deckInfos.length, deckDef.image);
    });
    appendRow("その他", deckDistributionMap.getOthersNum(), deckInfos.length);
}

function appendRow(name, num, sum, image) {
    // デッキ名、数、%、画像URL
    HTMLUtils.appendBody(distributionTable, name, num, Math.round(num * 100/ sum), image);
}
