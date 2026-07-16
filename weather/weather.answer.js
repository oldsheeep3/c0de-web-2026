// ============================================================
//  お天気アプリ ── 模範解答
//  使用API: Open-Meteo（APIキー不要・無料）
//    1) ジオコーディングAPI : 都市名 → 緯度・経度
//    2) 天気API             : 緯度・経度 → 現在の天気
// ============================================================

// --- HTML の要素を取得しておく ---
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

    const response = await fetch(url);   // APIにお願いする
    const data = await response.json();  // 返ってきた文字列をJSON（オブジェクト）に変換

    // 見つからなかったら results が無い
    if (!data.results) {
        return null;
    }

    // 一番最初の候補を返す
    return data.results[0];
}

// ============================================================
//  ② 緯度・経度から現在の天気を取得する
// ============================================================
async function getWeather(latitude, longitude) {
    const url = "https://api.open-meteo.com/v1/forecast?latitude=" + latitude
        + "&longitude=" + longitude
        + "&current=temperature_2m,weather_code,wind_speed_10m";

    const response = await fetch(url);
    const data = await response.json();

    return data.current;  // { temperature_2m, weather_code, wind_speed_10m, ... }
}

// ============================================================
//  ③ 画面に表示する
// ============================================================
function showWeather(place, current) {
    const code = current.weather_code;
    result.innerHTML =
        "<h2>" + place.name + "（" + place.country + "）</h2>"
        + "<p class='temp'>" + current.temperature_2m + "℃</p>"
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
        const place = await getLocation(city);          // ① 座標を取得
        if (place === null) {
            result.innerHTML = "<p class='error'>都市が見つかりませんでした。</p>";
            return;
        }

        const current = await getWeather(place.latitude, place.longitude); // ② 天気を取得
        showWeather(place, current);                    // ③ 表示
    } catch (error) {
        // 通信エラーなど、途中で失敗したとき
        result.innerHTML = "<p class='error'>取得に失敗しました。時間をおいて試してください。</p>";
        console.error(error);
    }
}

// --- ボタンのクリックと Enter キーに反応させる ---
searchButton.addEventListener("click", search);
cityInput.addEventListener("keydown", function (event) {
    if (event.key === "Enter") {
        search();
    }
});
