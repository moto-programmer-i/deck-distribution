/**
 * デッキ情報
 */
export class DeckInfo {
    // 外部からだとデッキURLしか使える情報がないため。
    // 本当はここがDBから取得した情報などになる。
    
    /**
     * @type {string} デュエプレのデッキURL
     */
    url;

    /**
     * デッキURLからインスタンス生成
     * @param {string} url デッキURL
     * @returns {DeckInfo}
     */
    static fromDeckUrl(url) {
        const instance = new DeckInfo();
        instance.url = url;
        return instance;
    }
}