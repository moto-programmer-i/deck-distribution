export class HTMLUtils {
    /**
     * tbodyに行を追加
     * @param {HTMLTableElement} table 
     * @param {Array<string>} row 
     */
    static appendTBody(table, ...row) {
        if(!table || !row) {
            return;
        }

        // tbodyがなければ作成
        if (table.tBodies.length <= 0) {
            table.createTBody();
        }

        // 行を追加
        const rowElement = table.tBodies[0].insertRow();
        for(const col of row) {
            rowElement.insertCell().textContent = col;
        }
    }

    /**
     * 
     * @param {HTMLTableElement} table 
     */
    static refreshTBody(table) {
        // tbodyがなければなにもしない
        if (table.tBodies.length <= 0) {
            return;
        }

        // tbodyを再生成
        table.removeChild(table.tBodies[0]);
        table.createTBody();
    }
}

