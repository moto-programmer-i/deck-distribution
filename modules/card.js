import { DeckInfo } from "./deck-info.js";

/**
 * デッキ定義に必要なカード
 */
export class Card {
    /**
     * カード名
     * @type {string}
     */
    name;


    /**
     * キー
     * （カード名だけでキーになれるなら不要）
     * このプログラムの例だと必要なため、仕方なく用意している。
     * @type {string}
     */
    key;

    /**
     * 枚数
     * @type {number}
     */
    num;

    /**
     * 正規表現
     * @type {RegExp}
     */
    regExp;

    /**
     * 正規表現初期化
     * （インスタンス生成後に呼び出す必要がある）
     */
    initRegExp() {
        this.regExp = new RegExp(this.key, "g");
    }

    /**
     * デッキが定義とマッチするか
     * @param {DeckInfo} deckInfo デュエプレのデッキURL
     * @returns {boolean}
     */
    match(deckInfo) {
        if (!deckInfo) {
            return false;
        }
        const result = deckInfo.url.match(this.regExp);
        // マッチなしの場合はnull
        if (result === null) {
            return false;
        }

        return result.length >= this.num;
    }

    /**
     * JSONからインスタンスを生成
     * @param {string} json JSONから生成されたオブジェクト（値のみ）
     * @returns {Card}
     */
    // JSONからちゃんとデシリアライズするライブラリを使えばこの辺は不要
    static fromJSON(json) {
        const instance = new Card();
        Object.assign(instance, json);
        instance.initRegExp();
        return instance;
    }
}