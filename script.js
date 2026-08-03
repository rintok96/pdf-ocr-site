const imageInput = document.getElementById("imageInput");
const previewImage = document.getElementById("previewImage");
const ocrButton = document.getElementById("ocrButton");
const result = document.getElementById("result");
const copyButton = document.getElementById("copyButton");

let selectedImage = null;

// 画像プレビュー
imageInput.addEventListener("change", (e) => {
    selectedImage = e.target.files[0];

    if (!selectedImage) return;

    previewImage.src = URL.createObjectURL(selectedImage);
    previewImage.style.display = "block";
});

// OCR実行
ocrButton.addEventListener("click", async () => {

    if (!selectedImage) {
        alert("画像を選択してください。");
        return;
    }

    result.value = "文字を読み取っています...\nしばらくお待ちください。";

    const { data } = await Tesseract.recognize(
        selectedImage,
        "jpn+eng"
    );

    result.value = data.text;

});

// コピー
copyButton.addEventListener("click", async () => {

    if(result.value==="") return;

    await navigator.clipboard.writeText(result.value);

    alert("コピーしました！");

});