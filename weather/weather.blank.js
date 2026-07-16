// ============================================================
//  お天気アプリ ── 穴埋め問題
//  【　①　】〜【　⑦　】を埋めて、動くようにしよう！
//  使用API: Open-Meteo（APIキー不要・無料）
//    1) ジオコーディングAPI : 都市名 → 緯度・経度
//    2) 天気API             : 緯度・経度 → 現在の天気
// ============================================================

// --- HTML の要素を取得しておく ---
// ヒント: document.getElementById("id名") で要素を取り出せる
const cityInput = document.getElementById("cityInput");
const searchButton = document.getElementById("searchButton");
const result = document.getElementById("result");

// --- WMO天気コード → 日本語（よく使うものだけ） ---
const weatherText = {
    0: "快晴 ☀️",
    1: "晴れ 🌤",
    2: "一部くもり ⛅",
    3: "くもり ☁️",
    45: "霧 🌫",
    48: "霧 🌫",
    51: "弱い霧雨 🌦",
    53: "霧雨 🌦",
    55: "強い霧雨 🌧",
    61: "弱い雨 🌦",
    63: "雨 🌧",
    65: "強い雨 🌧",
    71: "弱い雪 🌨",
    73: "雪 ❄️",
    75: "強い雪 ❄️",
    80: "にわか雨 🌦",
    81: "にわか雨 🌧",
    82: "激しいにわか雨 ⛈",
    95: "雷雨 ⛈",
};

// ============================================================
//  ① 都市名から緯度・経度を取得する
// ============================================================
async function getLocation(city) {
    const url = "https://geocoding-api.open-meteo.com/v1/search?name="
        + encodeURIComponent(city) + "&count=1&language=ja&format=json";

    // 【 ① 】 url にリクエストを送り、結果（response）を受け取ろう
    //   ヒント: await fetch(url)
    const response = /* ここを埋める */;

    // 【 ② 】 response を JSON（オブジェクト）に変換して data に入れよう
    //   ヒント: await response.json()
    const data = /* ここを埋める */;

    if (!data.results) {
        return null;
    }
    return data.results[0];
}

// ============================================================
//  ② 緯度・経度から現在の天気を取得する
// ============================================================
async function getWeather(latitude, longitude) {
    const url = "https://api.open-meteo.com/v1/forecast?latitude=" + latitude
        + "&longitude=" + longitude
        + "&current=temperature_2m,weather_code,wind_speed_10m";

    // 【 ③ 】 getLocation と同じように、fetch して json に変換しよう
    const response = /* ここを埋める */;
    const data = /* ここを埋める */;

    // 【 ④ 】 現在の天気は data の「current」の中に入っている。data の何を返す？
    return /* ここを埋める */;
}

// ============================================================
//  ③ 画面に表示する
// ============================================================
function showWeather(place, current) {
    const code = current.weather_code;

    // 【 ⑤ 】 result の中身（HTML）を書き換えて、天気を表示しよう
    //   ヒント: result.innerHTML = "..." に文字列を入れる
    //   気温は current.temperature_2m、天気は weatherText[code] で取り出せる
    result.innerHTML =
        "<h2>" + place.name + "（" + place.country + "）</h2>"
        + "<p class='temp'>" + /* ここを埋める（気温） */ + "℃</p>"
        + "<p>" + (weatherText[code] || "不明") + "</p>"
        + "<p>風速: " + current.wind_speed_10m + " m/s</p>";
}

// ============================================================
//  ④ ボタンが押されたときの一連の流れ
// ============================================================
async function search() {
    const city = cityInput.value.trim();

    if (city === "") {
        result.innerHTML = "<p class='error'>都市名を入力してください。</p>";
        return;
    }

    result.innerHTML = "<p>検索中...</p>";

    try {
        // 【 ⑥ 】 ①座標を取得 → ②天気を取得 → ③表示 の順に呼び出そう
        const place = await getLocation(city);
        if (place === null) {
            result.innerHTML = "<p class='error'>都市が見つかりませんでした。</p>";
            return;
        }

        const current = await getWeather(place.latitude, place.longitude);
        showWeather(/* ここを埋める（引数は place と current） */);
    } catch (error) {
        result.innerHTML = "<p class='error'>取得に失敗しました。時間をおいて試してください。</p>";
        console.error(error);
    }
}

// --- ボタンのクリックと Enter キーに反応させる ---
// 【 ⑦ 】 searchButton がクリックされたら search を実行しよう
//   ヒント: 要素.addEventListener("click", 関数名)
searchButton./* ここを埋める */;

cityInput.addEventListener("keydown", function (event) {
    if (event.key === "Enter") {
        search();
    }
});
