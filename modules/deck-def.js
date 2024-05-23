import { Card } from "./card.js";

/**
 * デッキ定義
 */
export class DeckDef {
    /**
     * デッキ名
     * @type {string}
     */
    name;

    /**
     * カード
     * @type {Array<Card>}
     */
    cards = [];

    /**
     * デッキ画像(URL)
     * @type {string}
     */
    image;

    /**
     * 正規表現初期化
     * （インスタンス生成後に呼び出す必要がある）
     */
    initRegExp() {
        for(const card of this.cards) {
            card.initRegExp();
        }
    }

    /**
     * デッキが定義とマッチするか
     * @param {DeckInfo} deckInfo デュエプレのデッキURL
     * @returns {boolean}
     */
    match(deckInfo) {
        // 全てのカードが存在すればtrue
        for(const card of this.cards) {
            if(!card.match(deckInfo)) {
                return false;
            }
        }
        return true;
    }


    /**
     * JSONからインスタンスを生成
     * @param {string} json JSONから生成されたオブジェクト（値のみ）
     * @returns {DeckDef}
     */
    // JSONからちゃんとデシリアライズするライブラリを使えばこの辺は不要
    static fromJSON(json) {
        const instance = new DeckDef();
        instance.name = json.name;
        instance.image = json.image;
        for(const e of json.cards) {
            instance.cards.push(Card.fromJSON(e));
        }

        return instance;
    }
}