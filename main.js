
const deckInfoTextarea = document.getElementById("deck-info");
main();

async function main() {
    // デッキ情報読み込み
    const deckInfoResponse = await fetch("./deck-info.txt");
    deckInfoTextarea.value = await deckInfoResponse.text();
}
