import { DeckInfo } from "./deck-info.js";

export class DeckDistributionMap {
    // マップの順番
    static #DECK_DEF = 0;
    static #NUMBER = 1;

    /**
     * <デッキ定義, 数>
     * @type {Map<DeckDef, number>}
     */
    #map = new Map();

    /**
     * その他のデッキの数
     */
    #othersNum = 0;
    getOthersNum() {
        return this.#othersNum;
    }

    /**
     * デッキ数を初期化
     * @param {Array<DeckDef>} deckDefs 表示したい名前を指定する。
     */
    constructor(deckDefs) {
        if (!deckDefs) {
            return;
        }

        for (const deckDef of deckDefs) {
            this.#map.set(deckDef, 0);
        }
    }

    /**
     * デッキを数える
     * @param {DeckInfo} deckInfo
     */
    count(deckInfo) {
        if (!deckInfo) {
            return;
        }

        
        // 定義とマッチすれば +1
        for(const deckDef of this.#map.keys()) {
            if (deckDef.match(deckInfo)) {
                this.#map.set(deckDef, this.#map.get(deckDef) + 1);
                return;
            }
        }
        
        // 全くマッチしなければその他を増やす
        ++this.#othersNum;

        // その他に分類されたデッキのログをとる
        console.log("その他 " + deckInfo.url);
    }

    /**
     * デッキを数える
     * @param {Array<DeckInfo>} deckInfos
     */
    countArray(...deckInfos) {
        for(const deckInfo of deckInfos) {
            this.count(deckInfo);
        }
    }

    /**
     * デッキ数の降順に処理
     * @param {(deckDef: DeckDef, num: number) => void} handler 各デッキの処理
     */
    desc(handler) {
        // 降順に並べて順番に処理
        for(const entry of [...this.#map].sort((a, b) => b[DeckDistributionMap.#NUMBER] - a[DeckDistributionMap.#NUMBER])) {
            handler(entry[DeckDistributionMap.#DECK_DEF], entry[DeckDistributionMap.#NUMBER]);
        }
    }



}