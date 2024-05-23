export class HTMLUtils {
    /**
     * tbodyに行を追加
     * @param {HTMLTableElement} table 
     * @param {Array<string>} row 
     */
    static appendBody(table, ...row) {
        if(!table || !row) {
            return;
        }

        const rowElement = table.createTBody().insertRow();
        for(const col of row) {
            rowElement.insertCell().textContent = col;
        }
    }
}

