// ============================================================
//  おみくじアプリ ── 模範解答
//  学ぶこと: 変数 / 配列 / 関数 / ランダム / クリックイベント / 画面表示
//  （インターネット通信なし。パソコンの中だけで完結します）
// ============================================================

// --- HTML の要素を取り出しておく ---
const drawButton = document.getElementById("drawButton"); // ボタン
const result = document.getElementById("result");         // 結果を出す場所

// --- 運勢の一覧（配列） ---
const fortunes = ["大吉", "中吉", "小吉", "吉", "末吉", "凶"];

// --- ボタンが押されたときに動く関数 ---
function draw() {
    // 0 〜 (個数-1) の間で、ランダムな整数を1つ作る
    //   Math.random()        … 0以上1未満の小数（例 0.73）
    //   × fortunes.length    … 0以上6未満の小数
    //   Math.floor(...)      … 小数点以下を切り捨てて整数に（0〜5）
    const index = Math.floor(Math.random() * fortunes.length);

    // 配列から index 番目を取り出す
    const fortune = fortunes[index];

    // 画面に表示する
    result.textContent = fortune;
}

// --- ボタンがクリックされたら draw を実行する ---
drawButton.addEventListener("click", draw);
