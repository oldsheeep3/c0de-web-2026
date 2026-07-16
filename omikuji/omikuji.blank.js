// ============================================================
//  おみくじアプリ ── 穴埋め問題
//  【　①　】〜【　④　】を埋めて、動くようにしよう！
//  学ぶこと: 変数 / 配列 / 関数 / ランダム / クリックイベント / 画面表示
// ============================================================

// --- HTML の要素を取り出しておく ---
// ヒント: document.getElementById("id名") で要素を取り出せる
const drawButton = document.getElementById("drawButton"); // ボタン
const result = document.getElementById("result");         // 結果を出す場所

// --- 運勢の一覧（配列） ---
const fortunes = ["大吉", "中吉", "小吉", "吉", "末吉", "凶"];

// --- ボタンが押されたときに動く関数 ---
function draw() {
    // 【 ① 】 0 〜 (個数-1) の間で、ランダムな整数を1つ作ろう
    //   ヒント: Math.floor(Math.random() * fortunes.length)
    const index = /* ここを埋める */;

    // 【 ② 】 配列 fortunes から index 番目を取り出そう
    //   ヒント: 配列[番号]  で取り出せる
    const fortune = /* ここを埋める */;

    // 【 ③ 】 result の中身を fortune に書き換えて、画面に表示しよう
    //   ヒント: result.textContent = ...
    result.textContent = /* ここを埋める */;
}

// 【 ④ 】 drawButton がクリックされたら draw を実行しよう
//   ヒント: 要素.addEventListener("click", 関数名)
//   ※ 関数名の後ろに () は付けない！
drawButton./* ここを埋める */;
