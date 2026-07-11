// =========================
// 要素取得
// =========================

const savedLetterScene = document.getElementById("savedLetterScene");
const savedLetterPaper = document.getElementById("savedLetterPaper");
const savedLetterText = document.getElementById("savedLetterText");
const replyMessage = document.getElementById("replyMessage");

const letterScene = document.getElementById("letterScene");
const letterInput = document.getElementById("letterInput");
const letterCount = document.getElementById("letterCount");
const sendLetter = document.getElementById("sendLetter");

const startButton = document.getElementById("startButton");
const title = document.getElementById("title");
const ui =
    document.getElementById("ui");

const bgm = document.getElementById("bgm");
const bgm2 = document.getElementById("bgm2");

const voice1 = document.getElementById("voice1");
const voice2 = document.getElementById("voice2");

const messageBox = document.getElementById("messageBox");
const messageText = document.getElementById("messageText");
const nextMark = document.getElementById("nextMark");

const fadeScreen = document.getElementById("fadeScreen");
const fadeText = document.getElementById("fadeText");
const background = document.getElementById("background");

const hotspot1 = document.getElementById("hotspot1");
const object1 = document.getElementById("object1");

// 後でHTMLにhotspot2を追加する
const hotspot2 = document.getElementById("hotspot2");
const object2 = document.getElementById("object2");

const hotspot3 = document.getElementById("hotspot3");

const choiceBox = document.getElementById("choiceBox");
const burnButton = document.getElementById("burnButton");
const keepButton = document.getElementById("keepButton");

const fireVideo = document.getElementById("fireVideo");
const fireSound = document.getElementById("fireSound");

const endingPortrait =
    document.getElementById("endingPortrait");

    const finalScene =
    document.getElementById("finalScene");

const finalTitle =
    document.getElementById("finalTitle");

const shareButton =
    document.getElementById("shareButton");

    const secretHotspot =
    document.getElementById("secretHotspot");

const diaryScene =
    document.getElementById("diaryScene");

const diaryTitle =
    document.getElementById("diaryTitle");

const diaryPage =
    document.getElementById("diaryPage");

const diaryCover =
    document.getElementById("diaryCover");

const diaryImage =
    document.getElementById("diaryImage");

const diaryGuide =
    document.getElementById("diaryGuide");

const diaryBackButton =
    document.getElementById("diaryBackButton");

const pageSound =
    document.getElementById("pageSound");

const bgm3 =
    document.getElementById("bgm3");

    const passwordArea =
    document.getElementById("passwordArea");

const passwordInput =
    document.getElementById("passwordInput");

const passwordButton =
    document.getElementById("passwordButton");

const passwordMessage =
    document.getElementById("passwordMessage");

const drawerScene =
    document.getElementById("drawerScene");

const drawerBackButton =
    document.getElementById("drawerBackButton");

const galleryItems =
    document.querySelectorAll(".galleryItem");

const galleryModal =
    document.getElementById("galleryModal");

const galleryLargeImage =
    document.getElementById("galleryLargeImage");

const LETTER_ENDPOINT =
    "https://script.google.com/macros/s/AKfycbyO4bxnReGQeq5a-khoNhlvGkPlScClKFO1GPcP7qPd7uRadGuOfbwqmy2yJiFG6ffx/exec"

let letterSent = false;

const creditButton =
document.getElementById("creditButton");

const creditScene =
document.getElementById("creditScene");

const creditClose =
document.getElementById("creditClose");




// =========================
// ゲーム用変数
// =========================

let current = 0;
let savedLetter = "";
let scene = "opening";

let typing = false;
let typingTimer = null;
let typingGeneration = 0;

let diaryPageIndex = 0;

const diaryImages = [
    "assets/images/diary1.png",
    "assets/images/diary2.png",
    "assets/images/diary3.png"
];

burnButton.addEventListener("click", burnLetter);
keepButton.addEventListener("click", keepLetter);

const messages = [
    "あなたは【美波ハルヒ】のファンだ。",
    "彼女に向けて、手紙を書こう。",
    "なお、見られて困るようなことは書かないこと。",
    "これは事務所へ送るものだ。",
    "不特定多数の人間が見る。"
];

// =========================
// 共通関数
// =========================



function safePlay(audio) {

    if (!audio) {
        return;
    }

    const result = audio.play();

    if (result !== undefined) {

        result.catch((error) => {

            console.warn(
                "音声を再生できませんでした。",
                error
            );

        });

    }

}

function setMessages(newMessages, newScene) {

    // 前のタイプライター処理を停止
    typingGeneration++;

    clearTimeout(typingTimer);

    messages.length = 0;

    messages.push(...newMessages);

    current = 0;

    scene = newScene;

    messageBox.style.display = "block";

    messageText.textContent = "";

    nextMark.style.display = "none";

    showMessage();

}

// =========================
// はじめる
// =========================

startButton.addEventListener("click", (event) => {
    

    event.stopPropagation();

    // 最初はBGM1を再生
    bgm.currentTime = 0;
    bgm.volume = 0.18;
    safePlay(bgm);

    ui.style.display = "none";
    scene = "opening";

    messageBox.style.display = "block";

    showMessage();

});

// =========================
// メッセージ表示
// =========================

function showMessage() {

    const text = messages[current];

    if (typeof text !== "string") {
        return;
    }

    // 前に残っているタイプライターを停止
    typingGeneration++;

    clearTimeout(typingTimer);

    const generation = typingGeneration;

    typing = true;

    nextMark.style.display = "none";

    messageText.textContent = "";

    typeWriter(
        text,
        0,
        generation
    );

}

function typeWriter(
    text,
    index,
    generation
) {

    // 古いタイプライター処理を無効化
    if (generation !== typingGeneration) {
        return;
    }

    if (index < text.length) {

        messageText.textContent +=
            text.charAt(index);

        typingTimer = setTimeout(() => {

            typeWriter(
                text,
                index + 1,
                generation
            );

        }, 40);

        return;

    }

    typing = false;

    nextMark.style.display = "block";

    // 「ひとつずつ、捨てていこう。」の表示完了後に光①を表示
    if (
        scene === "room" &&
        text === "ひとつずつ、捨てていこう。"
    ) {

        hotspot1.style.display = "block";

    }

    // オブジェクト1終了後に光②を出す準備
    if (
        scene === "afterObject1" &&
        text ===
        "まだ捨てなければいけないものがある。" &&
        hotspot2
    ) {

        hotspot2.style.display = "block";

    }

if (
    scene === "afterObject2" &&
    text === "まだ捨てなければいけないものがある。"
) {

    hotspot3.style.display = "block";

}

}

// =========================
// 画面クリックで文章を進める
// =========================

document.addEventListener("click", () => {

    // 暗転解除待ち
    if (scene === "transitionWait") {

        nextScene();

        return;

    }

    // エンディング文字のクリック待ち
    if (scene === "endingTextWait") {

    showEndingPortrait();

    return;

}

if (scene === "endingPortraitTransition") {

    // 立ち絵のフェード中はクリックを無視
    return;

}

if (scene === "endingPortraitWait") {

    showFinalScene();

    return;

}

    // 文字表示中の連打を無視
    if (typing) {
        return;
    }

    if (
        messageBox.style.display !== "block"
    ) {
        return;
    }

    if (
        nextMark.style.display === "none"
    ) {
        return;
    }

    current++;

    if (current < messages.length) {

        showMessage();

        return;

    }

    // オープニング終了
    if (scene === "opening") {

        scene = "letterInput";

        messageBox.style.display = "none";

        letterScene.style.display = "flex";

        return;

    }

    // 部屋の導入終了
    if (scene === "room") {

        // 光①をクリックするまで待つ
        return;

    }

    // オブジェクト1の説明終了
    if (scene === "object1") {

        scene = "object1Fading";

        messageBox.style.display = "none";

        fadeOutObject1();

        return;

    }

    // オブジェクト1後の文章終了
    if (scene === "afterObject1") {

        // 光②をクリックするまで待つ
        return;

    }

    if (scene === "object2") {

    scene = "object2Fading";

    messageBox.style.display = "none";

    fadeOutObject2();

    return;

}

if (scene === "afterObject2") {

    return;

}

if (scene === "letterObject") {

    messageBox.style.display = "none";
    nextMark.style.display = "none";

    scene = "letterChoice";

    choiceBox.style.display = "flex";

    return;

}

if (scene === "letterChoice") {

    // 選択肢を押すまで待つ
    return;

}

if (scene === "burning") {

    // 炎演出中はクリックを無視
    return;

}

if (scene === "keeping") {

    // フェードアウト中はクリックを無視
    return;

}

if (scene === "afterLetterChoice") {

    messageBox.style.display = "none";

    startEndingSequence();

    return;

}

});

// =========================
// 光①・オブジェクト1
// =========================

hotspot1.addEventListener(
    "click",
    showObject1
);

hotspot2.addEventListener(
    "click",
    showObject2
);

hotspot3.addEventListener(
    "click",
    showLetterObject
);

function showObject1(event) {

    event.stopPropagation();

    hotspot1.style.display = "none";

    object1.style.display = "block";

    object1.style.opacity = "1";

    object1.style.pointerEvents = "none";

    setMessages(
        [
            "これはあなたが初めて買ったペンライトだ。",
            "あの頃、美波ハルヒはそれほど人気がなかった。",
            "数少ないピンク色のペンライトを見て、",
            "嬉しそうに指をさしてきたのを覚えている。",
            "……。",
            "しかし、もう必要ない。"
        ],
        "object1"
    );

}

function fadeOutObject1() {

    const animation = object1.animate(
        [
            {
                opacity: 1
            },
            {
                opacity: 0
            }
        ],
        {
            duration: 1000,
            fill: "forwards"
        }
    );

    animation.finished
        .catch(() => {})
        .finally(() => {

            object1.style.display = "none";

            object1.style.opacity = "1";

            afterObject1();

        });

}

function afterObject1() {

    setMessages(
        [
            "……。",
            "少し部屋が広くなった。",
            "まだ捨てなければいけないものがある。"
        ],
        "afterObject1"
    );

}

function showObject2(event) {

    event.stopPropagation();

    hotspot2.style.display = "none";

    object2.style.display = "block";
    object2.style.opacity = "1";
    object2.style.pointerEvents = "none";

    setMessages(
        [
            "これはあなたが初めて買ったCDだ。",
            "ハルヒが初めてセンターを務めた曲が収録されている。",
            "緊張でガチガチだったのか、",
            "曲が始まる前には死にそうな顔をしていた。",
            "……。",
            "しかし、もう必要ない。"
        ],
        "object2"
    );

}

function fadeOutObject2() {

    const animation = object2.animate(
        [
            {
                opacity: 1
            },
            {
                opacity: 0
            }
        ],
        {
            duration: 1000,
            fill: "forwards"
        }
    );

    animation.finished
        .catch(() => {})
        .finally(() => {

            object2.style.display = "none";
            object2.style.opacity = "1";

            afterObject2();

        });

}

function afterObject2() {

    setMessages(
        [
            "……。",
            "少し部屋が広くなった。",
            "まだ捨てなければいけないものがある。"
        ],
        "afterObject2"
    );

}

function showLetterObject(event) {

    event.stopPropagation();

    hotspot3.style.display = "none";

    // 前回の縮小状態を解除
    savedLetterPaper.classList.remove("small");

    // 保存していた手紙を表示
    showSavedLetter();

    // 部屋で見る手紙専用シーン
    scene = "letterObjectWaiting";

    // まだメッセージ欄は表示しない
    messageBox.style.display = "none";

}

// =========================
// 手紙入力
// =========================

letterInput.addEventListener("input", () => {

    // 50文字制限
    if (letterInput.value.length > 50) {

        letterInput.value =
            letterInput.value.substring(0, 50);

    }

    // 最大7行
    const lines =
        letterInput.value.split("\n");

    if (lines.length > 7) {

        letterInput.value =
            lines.slice(0, 7).join("\n");

    }

    letterCount.textContent =
        `${letterInput.value.length} / 50`;

});

// =========================
// 手紙送信
// =========================

sendLetter.addEventListener("click", (event) => {

    event.stopPropagation();

    const text =
        letterInput.value.trim();

    if (text === "") {

        alert("手紙を書いてください。");

        return;

    }

    savedLetter = text;
    sendLetterToSheet(savedLetter);

    scene = "letterSending";

    letterScene.style.pointerEvents =
        "none";

    const animation =
        letterScene.animate(

            [
                {
                    opacity: 1
                },
                {
                    opacity: 0
                }
            ],

            {
                duration: 1500,
                fill: "forwards"
            }

        );

    animation.finished
        .catch(() => {})
        .finally(() => {

            letterScene.style.display =
                "none";

            letterScene.style.opacity = "1";

            showSavedLetter();

        });

});

// =========================
// 保存した手紙表示
// =========================

function showSavedLetter() {

    savedLetterText.textContent =
        savedLetter;

    let reply =
        "お手紙ありがとう";

    if (

        savedLetter.includes("大好き") ||
        savedLetter.includes("好き") ||
        savedLetter.includes("だいすき") ||
        savedLetter.includes("すき") ||
        savedLetter.includes("すこ") ||
        savedLetter.includes("しゅき")

    ) {

        reply +=
            "\n私もだーいすき！";

    }

    if (

        savedLetter.includes("愛してる") ||
        savedLetter.includes("あいしてる")

    ) {

        reply +=
            "\n私も愛してる！";

    }

        if (

        savedLetter.includes("イヤー") 

    ) {

        reply +=
            "\nグワーッ！";

    }

            if (

        savedLetter.includes("カワイイヤッター") 

    ) {

        reply +=
            "\nハルヒは笑顔を作った！";

    }

                if (

        savedLetter.includes("33-4") 

    ) {

        reply +=
            "\nな阪関無～";

    }

        if (

        savedLetter.includes("古事記にもそう書かれている") 

    ) {

        reply +=
            "\nアイサツは大事！";

    }

            if (

        savedLetter.includes("かわいい") ||
        savedLetter.includes("可愛い")

    ) {

        reply +=
            "\n可愛い？えへへ～";

    }
    

    

    replyMessage.textContent =
        reply;

    savedLetterScene.style.opacity = "1";

    savedLetterScene.style.pointerEvents =
        "auto";

    savedLetterScene.style.display =
        "flex";

    scene = "savedLetter";

    requestAnimationFrame(() => {

        fitLetterText();

    });

}

// =========================
// 手紙を閉じる
// =========================

savedLetterScene.addEventListener(
    "click",
    (event) => {

        event.stopPropagation();

        // 最初に書いた手紙を閉じる
        if (scene === "savedLetter") {

            savedLetterScene.style.display = "none";
            savedLetterScene.style.opacity = "0";
            savedLetterScene.style.pointerEvents = "none";

            startTransition();

            return;
        }

        // 部屋で再発見した手紙をクリック
        if (scene === "letterObjectWaiting") {

            savedLetterScene.style.zIndex = "10";
            messageBox.style.zIndex = "100";

            savedLetterPaper.style.opacity = "0.8";
            savedLetterScene.style.pointerEvents = "none";

            setMessages(
                [
                    "……あなたの書いた手紙だ。",
                    "大切に保管していた。",
                    "しかし、ここに置いていくわけにはいかない。",
                    "もう必要ない。",
                    "必要ない……"
                ],
                "letterObject"
            );

            return;
        }

    }
);




// =========================
// 手紙の文字サイズ自動調整
// =========================

function fitLetterText() {

    const paper =
        document.getElementById(
            "savedLetterPaper"
        );

    let size = 27;

    savedLetterText.style.fontSize =
        size + "px";

    replyMessage.style.fontSize =
        size + "px";

    while (

        paper.scrollHeight >
            paper.clientHeight &&

        size > 16

    ) {

        size--;

        savedLetterText.style.fontSize =
            size + "px";

        replyMessage.style.fontSize =
            size + "px";

    }

}

// =========================
// 暗転・音声演出
// =========================

function startTransition() {

    scene = "transition";

    // BGMを一時停止
    bgm.pause();
    bgm.currentTime = 0;

    // 画面上の要素を隠す
    messageBox.style.display = "none";

    hotspot1.style.display = "none";

    object1.style.display = "none";

    savedLetterScene.style.display = "none";

    savedLetterScene.style.opacity = "0";

    savedLetterScene.style.pointerEvents = "none";

    // 暗転開始
    fadeScreen.style.opacity = "1";

    // 背景画像②
    setTimeout(() => {

        background.style.backgroundImage =
            'url("assets/bg/bg2.jpg")';

    }, 1500);

    // 背景画像③
    setTimeout(() => {

        background.style.backgroundImage =
            'url("assets/bg/bg3.jpg")';

    }, 1600);

    // 黒背景
    setTimeout(() => {

        background.style.backgroundImage =
            "none";

    }, 1700);

    // 2つの音声を再生
    setTimeout(() => {

        voice1.volume = 0.5;

        voice2.volume = 0.4;

        safePlay(voice1);

        safePlay(voice2);

        fadeAudio(
            voice1,
            3200
        );

        fadeAudio(
            voice2,
            3200
        );

    }, 1800);

    // 暗転中の白文字
    setTimeout(() => {

        fadeText.textContent =
            "くるしい";

        fadeText.style.opacity = "1";

    }, 1500);

        setTimeout(() => {

        fadeText.textContent =
            "忘れられないことがある";

        fadeText.style.opacity = "1";

    }, 2000);

        setTimeout(() => {

        fadeText.textContent =
            "あの海には……";

        fadeText.style.opacity = "1";

    }, 2500);

            setTimeout(() => {

        fadeText.textContent =
            "あのとき、自分は\nどう言えばよかったんだろう";

        fadeText.style.opacity = "1";

    }, 3000);

    // 白文字を消す
    setTimeout(() => {

        fadeText.style.opacity = "0";

    }, 3500);

    // 5秒後にクリック待ちへ
    setTimeout(() => {

        fadeText.textContent = "";

        showContinueMessage();

    }, 5000);

}

// =========================
// 音声を徐々に小さくする
// =========================

function fadeAudio(
    audio,
    duration
) {

    if (!audio) {
        return;
    }

    const interval = 100;

    const startVolume =
        audio.volume;

    const steps =
        Math.max(
            1,
            Math.ceil(
                duration / interval
            )
        );

    const step =
        startVolume / steps;

    const timer =
        setInterval(() => {

            audio.volume =
                Math.max(
                    0,
                    audio.volume - step
                );

            if (
                audio.volume <= 0
            ) {

                clearInterval(timer);

                audio.pause();

                audio.currentTime = 0;

                audio.volume =
                    startVolume;

            }

        }, interval);

}

// =========================
// 暗転解除待ち
// =========================

function showContinueMessage() {

    scene = "transitionWait";

    messageBox.style.display =
        "block";

    messageText.textContent =
        "……クリックしてください。";

    nextMark.style.display =
        "block";

    typing = false;

}

// =========================
// 背景4・部屋シーンへ
// =========================

function nextScene() {

    if (
        scene !== "transitionWait"
    ) {

        return;

    }

    scene = "room";

    // 手紙を完全に消す
    savedLetterScene.style.display =
        "none";

    savedLetterScene.style.opacity =
        "0";

    savedLetterScene.style.pointerEvents =
        "none";

    // 暗転解除
    fadeScreen.style.opacity =
        "0";

    // 背景4へ変更
    background.style.backgroundImage =
        'url("assets/bg/bg4.jpg")';

    // BGM再開
    // 念のためBGM1を停止
bgm.pause();
bgm.currentTime = 0;

// 部屋用のBGM2を再生
bgm2.currentTime = 0;
bgm2.volume = 0.5;
safePlay(bgm2);

    // 部屋の文章開始
    setMessages(
        [
            "……",
            "……おはよう。",
            "…………あなたは、短い夢を見ていたようだ。",
            "あなたは夢から覚めて、するべきことを思い出した。",
            "あなたは、この部屋のものを捨てなければならない。",
            "約束の場所へ行く前に。",
            "ひとつずつ、捨てていこう。"
        ],
        "room"
    );

}




function burnLetter(event) {

    event.stopPropagation();

    scene = "burning";

    choiceBox.style.display = "none";
    messageBox.style.display = "none";

    savedLetterScene.style.zIndex = "100";
    savedLetterScene.style.pointerEvents = "none";

    // 炎動画を初期化
    fireVideo.pause();
    fireVideo.currentTime = 0;
    fireVideo.style.display = "block";
    fireVideo.style.opacity = "1";

    // 炎音を初期化
    fireSound.pause();
    fireSound.currentTime = 0;
    fireSound.volume = 0.7;

    safePlay(fireVideo);
    safePlay(fireSound);

    // 手紙を燃えるように消す
    savedLetterScene.animate(
        [
            {
                opacity: 1,
                filter: "brightness(1)"
            },
            {
                opacity: 0.7,
                filter: "brightness(0.6)"
            },
            {
                opacity: 0,
                filter: "brightness(0)"
            }
        ],
        {
            duration: 3500,
            fill: "forwards"
        }
    );

    // 3秒後から炎動画と炎音をフェードアウト
    setTimeout(() => {

        fadeOutFireEffect(1200);

    }, 3000);

}

function fadeOutFireEffect(duration) {

    const interval = 50;
    const steps = Math.max(
        1,
        Math.ceil(duration / interval)
    );

    const videoStartOpacity = 1;
    const soundStartVolume = fireSound.volume;

    let currentStep = 0;

    const timer = setInterval(() => {

        currentStep++;

        const progress =
            currentStep / steps;

        fireVideo.style.opacity =
            Math.max(
                0,
                videoStartOpacity * (1 - progress)
            );

        fireSound.volume =
            Math.max(
                0,
                soundStartVolume * (1 - progress)
            );

        if (currentStep >= steps) {

            clearInterval(timer);

            fireVideo.pause();
            fireVideo.currentTime = 0;
            fireVideo.style.display = "none";
            fireVideo.style.opacity = "1";

            fireSound.pause();
            fireSound.currentTime = 0;
            fireSound.volume = soundStartVolume;

            savedLetterScene.style.display = "none";
            savedLetterScene.style.opacity = "0";

            afterLetterChoice("burn");

        }

    }, interval);

}


function keepLetter(event) {

    event.stopPropagation();

    scene = "keeping";

    choiceBox.style.display = "none";
    messageBox.style.display = "none";

    savedLetterScene.style.pointerEvents = "none";

    const animation = savedLetterScene.animate(
        [
            {
                opacity: 1
            },
            {
                opacity: 0
            }
        ],
        {
            duration: 1800,
            fill: "forwards"
        }
    );

    animation.finished
        .catch(() => {})
        .finally(() => {

            savedLetterScene.style.display = "none";
            savedLetterScene.style.opacity = "0";

            afterLetterChoice("keep");

        });

}

function afterLetterChoice(choice) {

    // 手紙表示を完全に消す
    savedLetterScene.style.display = "none";
    savedLetterScene.style.opacity = "0";
    savedLetterScene.style.pointerEvents = "none";

    // メッセージ枠を前面へ戻す
    messageBox.style.zIndex = "300";
    messageBox.style.opacity = "1";

    if (choice === "burn") {

        setMessages(
            [
                "手紙は、跡形もなく燃えてしまった。",
                "……。",
                "これでもう、この部屋には何もない。"
            ],
            "afterLetterChoice"
        );

        return;
    }

    setMessages(
        [
            "あなたは手紙を残すことにした。",
            "それでも、ここに留まることはできない。",
            "……。",
            "もう、行かなければならない。"
        ],
        "afterLetterChoice"
    );
}

// =========================
// エンディング開始
// =========================

function startEndingSequence() {

    fadeText.style.top = "50%";

    scene = "endingTransition";

    // 部屋用BGMを停止
    bgm2.pause();
    bgm2.currentTime = 0;

    // 残っている表示を消す
    choiceBox.style.display = "none";
    messageBox.style.display = "none";

    savedLetterScene.style.display = "none";
    fireVideo.style.display = "none";

    hotspot1.style.display = "none";
    hotspot2.style.display = "none";
    hotspot3.style.display = "none";

    object1.style.display = "none";
    object2.style.display = "none";

    // 黒背景にする
    fadeScreen.style.opacity = "1";
    fadeScreen.style.pointerEvents = "auto";

    // 元の背景も消す
    background.style.backgroundImage = "none";

    // 少し間を置いて文字を表示
    setTimeout(() => {

        fadeText.textContent =
            "……もう、会いに行かなきゃ。待たせてるから……";

        fadeText.style.opacity = "1";

    }, 1500);

    // 文字を読んだあと、クリック待ちにする
    setTimeout(() => {

        scene = "endingTextWait";

        nextMark.style.display = "none";

    }, 3500);

}

// =========================
// 最後の回想文
// =========================

function showEndingPortrait() {

    if (scene !== "endingTextWait") {
        return;
    }

    scene = "endingPortraitTransition";

    // 最初の文章をフェードアウト
    fadeText.style.opacity = "0";

    setTimeout(() => {

        // 立ち絵を準備
        endingPortrait.style.display = "block";
        endingPortrait.style.opacity = "0";

        // 文字は位置を動かさず、そのまま表示
        fadeText.textContent =
            "約束だよ。　　　　　　　　　ひとりはやだ。";

        fadeText.style.opacity = "0";

        // 少し待って立ち絵と文字を同時にフェードイン
        requestAnimationFrame(() => {

            requestAnimationFrame(() => {

                endingPortrait.style.opacity = "1";
                fadeText.style.opacity = "1";

            });

        });

    }, 800);

    // 立ち絵と文字を同時にフェードアウト
    setTimeout(() => {

        endingPortrait.style.opacity = "0";
        fadeText.style.opacity = "0";

    }, 4200);

    // フェード終了後に次のクリック待ち
    setTimeout(() => {

        endingPortrait.style.display = "none";
        fadeText.textContent = "";

        scene = "endingPortraitWait";

    }, 5800);

}



shareButton.addEventListener(
    "click",
    (event) => {

        event.stopPropagation();

        const shareText =
            "きっとまた会えるよ。お手紙すごくうれしかった！\n\n" +
            savedLetter +
            "\n\n" +
            "#またねの約束 #VRC_matane" +
            "\n\n" +
            window.location.href;

        const xUrl =
            "https://twitter.com/intent/tweet?text=" +
            encodeURIComponent(shareText);

        window.open(
            xUrl,
            "_blank",
            "noopener,noreferrer"
        );

    }
);

// =========================
// 春陽の日記
// =========================


secretHotspot.addEventListener(
    "click",
    openDiary
);

function openDiary(event) {

    event.preventDefault();
    event.stopPropagation();

    scene = "diary";

    // エンディング側を操作不能にする
    finalScene.style.pointerEvents = "none";
    finalScene.style.display = "none";

    creditButton.style.display = "none";
    shareButton.style.pointerEvents = "none";
    secretHotspot.style.display = "none";

    // 日記画面を有効にする
    diaryScene.style.display = "flex";
    diaryScene.style.opacity = "0";
    diaryScene.style.pointerEvents = "auto";

    diaryPageIndex = 0;

    passwordArea.style.display = "none";

    renderDiaryPage();

    requestAnimationFrame(() => {

        requestAnimationFrame(() => {

            diaryScene.style.opacity = "1";

        });

    });

}
diaryPage.addEventListener(
    "click",
    (event) => {

        event.stopPropagation();

        // 4ページ目では進めない
        if (diaryPageIndex >= 3) {
            return;
        }

        // ページをめくる音
        pageSound.pause();
        pageSound.currentTime = 0;
        pageSound.volume = 0.6;
        safePlay(pageSound);

        diaryPageIndex++;

        renderDiaryPage();

    }
);

function renderDiaryPage() {

    // 1ページ目：表紙
    if (diaryPageIndex === 0) {

        diaryTitle.textContent =
            "春陽の日記";

        diaryCover.style.display =
            "block";

        diaryImage.style.display =
            "none";

        diaryGuide.style.display =
            "block";

        diaryGuide.textContent =
            "クリックで次のページへ";

        diaryBackButton.style.display =
            "none";

        passwordArea.style.display = "none";

        return;
    }

    // 2～4ページ目
    diaryCover.style.display =
        "none";
    
    passwordArea.style.display = "none";

    diaryImage.style.display =
        "block";

    diaryImage.src =
        diaryImages[diaryPageIndex - 1];

    // 最後のページ
if (diaryPageIndex === 3) {

    diaryGuide.style.display = "none";
    diaryBackButton.style.display = "flex";

    passwordArea.style.display = "flex";
    passwordArea.style.visibility = "visible";
    passwordArea.style.opacity = "1";

    passwordInput.value = "";
    passwordMessage.textContent = "";

    // 入力欄が画面外なら自動で見える位置へ移動
    setTimeout(() => {

        passwordArea.scrollIntoView({
            behavior: "smooth",
            block: "center"
        });

    }, 100);

    return;
}

    diaryGuide.style.display =
        "block";

    diaryGuide.textContent =
        "クリックで次のページへ";

    diaryBackButton.style.display =
        "none";
}

function showFinalScene(immediate = false) {

    // 通常進行では立ち絵終了後だけ実行
    // 次回アクセス時は immediate=true で直接開く
    if (
        !immediate &&
        scene !== "endingPortraitWait"
    ) {
        return;
    }

    scene = "finalTransition";

    // クリア情報を保存
    localStorage.setItem(
        "mataneFinished",
        "true"
    );

    // BGM1・BGM2を停止
    bgm.pause();
    bgm.currentTime = 0;

    bgm2.pause();
    bgm2.currentTime = 0;

    // BGM3を開始
    bgm3.pause();
    bgm3.currentTime = 0;
    bgm3.volume = 0.45;
    safePlay(bgm3);

    // ほかの画面を隠す
    title.style.display = "none";
    startButton.style.display = "none";
    messageBox.style.display = "none";
    letterScene.style.display = "none";
    savedLetterScene.style.display = "none";
    choiceBox.style.display = "none";
    diaryScene.style.display = "none";

    hotspot1.style.display = "none";
    hotspot2.style.display = "none";
    hotspot3.style.display = "none";

    object1.style.display = "none";
    object2.style.display = "none";

    fireVideo.style.display = "none";

    fadeText.style.opacity = "0";
    endingPortrait.style.opacity = "0";

    const delay = immediate ? 0 : 1500;

    setTimeout(() => {

        endingPortrait.style.display = "none";
        fadeText.textContent = "";

        fadeScreen.style.opacity = "0";
        fadeScreen.style.pointerEvents = "none";

        background.style.backgroundImage =
            'url("assets/bg/bg5.jpg")';

        background.style.opacity = "1";

finalScene.style.display = "flex";
finalScene.style.opacity = "0";
finalScene.style.pointerEvents = "auto";

if (creditButton) {
    creditButton.style.display = "flex";
    creditButton.style.pointerEvents = "auto";
}

        secretHotspot.style.display = "block";

        requestAnimationFrame(() => {

            requestAnimationFrame(() => {

                finalScene.style.opacity = "1";

            });

        });

    }, delay);

    setTimeout(() => {

        scene = "finalScene";

    }, delay + 1900);

}

diaryBackButton.addEventListener(
    "click",
    (event) => {

        event.preventDefault();
        event.stopPropagation();

        scene = "finalScene";

        // 日記画面のクリックをすぐ無効化
        diaryScene.style.pointerEvents = "none";
        diaryScene.style.opacity = "0";

        setTimeout(() => {

            // 透明な日記画面を完全に消す
            diaryScene.style.display = "none";

            // エンディング画面を再表示
            finalScene.style.display = "flex";
            finalScene.style.opacity = "1";
            finalScene.style.pointerEvents = "auto";

            // Xシェアボタンを有効化
            shareButton.style.display = "flex";
            shareButton.style.pointerEvents = "auto";

            // Creditボタンを有効化
            creditButton.style.display = "flex";
            creditButton.style.pointerEvents = "auto";

            // 隠しボタンを有効化
            secretHotspot.style.display = "block";
            secretHotspot.style.pointerEvents = "auto";

        }, 1000);

    }
);

// =========================
// ページ読み込み時の初期表示
// =========================

window.addEventListener(
    "load",
    () => {

        const finished =
            localStorage.getItem(
                "mataneFinished"
            );

        if (finished === "true") {

            // 初期タイトル画面を先に消す
            ui.style.display = "none";

            // FinalSceneを直接表示
            showFinalScene(true);

        } else {

            // 初回はタイトル画面を表示
            ui.style.display = "flex";

        }

        // 表示する画面が決まってから全体を見せる
        document.body.classList.remove(
            "loading"
        );

        document.body.classList.add(
            "ready"
        );

        // 自動再生が止められた場合のBGM3再開
        document.addEventListener(
            "click",
            () => {

                if (
                    scene === "finalScene" &&
                    bgm3.paused
                ) {

                    bgm3.volume = 0.45;

                    safePlay(bgm3);

                }

            },
            {
                once: true
            }
        );

    }
);
// =========================
// 春陽の引き出し
// =========================

passwordButton.addEventListener(
    "click",
    checkPassword
);

passwordInput.addEventListener(
    "keydown",
    (event) => {

        if (event.key === "Enter") {
            checkPassword();
        }

    }
);

function checkPassword() {

    const value =
        passwordInput.value.trim();

    if (value !== "さくらいろ") {

        passwordMessage.textContent =
            "パスワードが違います。";

        return;
    }

    passwordMessage.textContent = "";

    openDrawer();

}

function openDrawer() {

    scene = "drawer";

    diaryScene.style.display = "none";

    drawerScene.style.display = "flex";

}

drawerBackButton.addEventListener(
    "click",
    (event) => {

        event.stopPropagation();

        scene = "diary";

        drawerScene.style.display = "none";

        diaryScene.style.display = "flex";

        diaryPageIndex = 3;

        renderDiaryPage();

    }
);

galleryItems.forEach(
    (item) => {

        item.addEventListener(
            "click",
            (event) => {

                event.stopPropagation();

                const imagePath =
                    item.dataset.image;

                galleryLargeImage.src =
                    imagePath;

                galleryModal.style.display =
                    "flex";

            }
        );

    }
);

galleryModal.addEventListener(
    "click",
    (event) => {

        event.stopPropagation();

        galleryModal.style.display =
            "none";

        galleryLargeImage.src = "";

    }
);

// =========================
// 手紙をスプレッドシートへ送信
// =========================

async function sendLetterToSheet(letter) {

    if (letterSent) {
        return;
    }

    if (
        typeof letter !== "string" ||
        letter.trim() === ""
    ) {
        return;
    }

    const safeLetter =
        letter
            .trim()
            .slice(0, 50);

    const body =
        new URLSearchParams();

    body.set(
        "letter",
        safeLetter
    );

    try {

        await fetch(
            LETTER_ENDPOINT,
            {
                method: "POST",

                headers: {
                    "Content-Type":
                        "application/x-www-form-urlencoded;charset=UTF-8"
                },

                body: body.toString(),

                mode: "no-cors"
            }
        );

        letterSent = true;

        console.log(
            "手紙を送信しました。"
        );

    } catch (error) {

        console.warn(
            "手紙を送信できませんでした。",
            error
        );

    }

}

// =========================
// クレジット
// =========================

function openCredit(event) {

    event.preventDefault();
    event.stopPropagation();

    if (
        scene !== "finalScene" &&
        scene !== "finalTransition"
    ) {
        return;
    }

    creditScene.style.display = "flex";

    requestAnimationFrame(() => {

        creditScene.classList.add("open");

    });

}

function closeCredit(event) {

    if (event) {
        event.preventDefault();
        event.stopPropagation();
    }

    creditScene.classList.remove("open");

    setTimeout(() => {

        creditScene.style.display = "none";

    }, 350);

}

if (
    creditButton &&
    creditScene &&
    creditClose
) {

    creditButton.addEventListener(
        "click",
        openCredit
    );

    creditClose.addEventListener(
        "click",
        closeCredit
    );

    creditScene.addEventListener(
        "click",
        (event) => {

            event.stopPropagation();

            if (event.target === creditScene) {

                closeCredit(event);

            }

        }
    );

} else {

    console.error(
        "Credit用HTMLのIDを確認。"
    );

}