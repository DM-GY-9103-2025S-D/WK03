let mCamera;
function preload() {
  mCamera = createCapture(VIDEO, { flipped: true });
  mCamera.hide();
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
    typeof analyzer !== "undefined" &&
    typeof captioner !== "undefined" &&
    typeof generator !== "undefined";

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
    let captions = await captioner(canvasUrl);
    results["caption"] = captions[0].generated_text;

    let texts = await generator(results["caption"], { max_new_tokens: 128 });
    results["story"] = texts[0].generated_text;

    let sentiments = await analyzer(results["story"]);
    results["sentiment"] = sentiments[0].label;
  }
}
