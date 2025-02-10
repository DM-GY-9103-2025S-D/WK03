let mCamera;

let sentimentPipeline;
let captionPipeline;
let generatorPipeline;

async function preload() {
  mCamera = createCapture(VIDEO, { flipped: true });
  mCamera.hide();

  sentimentPipeline = await pipeline("sentiment-analysis", "thiagohersan/roberta-base-go_emotions");
  captionPipeline = await pipeline("image-to-text", "Xenova/vit-gpt2-image-captioning");
  generatorPipeline = await pipeline("text-generation", "Xenova/llama2.c-stories110M");
}

let mCanvas;
let results = {};

function setup() {
  mCanvas = createCanvas(windowWidth, windowHeight);
  textSize(20);
}

let modelsReady;
function draw() {
  background(220);

  modelsReady =
    typeof sentimentPipeline !== "undefined" &&
    typeof captionPipeline !== "undefined" &&
    typeof generatorPipeline !== "undefined";

  if (!modelsReady) {
    text("Loading !", 20, 40);
  } else {
    image(mCamera, 0, 0);
    text(results["caption"], 0, mCamera.height, width / 2, 22);
    text(results["story"], width / 2, 0, width / 2, 200);
    text(results["sentiment"], width / 2, mCamera.height, width / 2, 22);
  }
}

async function keyPressed() {
  if (!modelsReady) return;

  if (key === " ") {
    let canvasUrl = mCanvas.elt.toDataURL();
    let captions = await captionPipeline(canvasUrl);
    results["caption"] = captions[0].generated_text;

    let texts = await generatorPipeline(results["caption"], { max_new_tokens: 128 });
    results["story"] = texts[0].generated_text;

    let sentiments = await sentimentPipeline(results["story"]);
    results["sentiment"] = sentiments[0].label;
  }
}
