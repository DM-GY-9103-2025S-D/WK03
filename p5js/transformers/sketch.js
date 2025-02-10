let mCamera;
let mPipeline;

async function preload() {
  mCamera = createCapture(VIDEO, { flipped: true });
  mCamera.hide();

  mPipeline = await pipeline("image-to-text", "Xenova/vit-gpt2-image-captioning");
}

let mCanvas;
let mCaption;

function setup() {
  mCanvas = createCanvas(windowWidth, windowHeight);
  mCaption = "";
}

let modelReady;

function draw() {
  background(220);

  modelReady = typeof mPipeline !== "undefined";

  if (!modelReady) {
    text("Loading !", 20, 40);
  } else {
    image(mCamera, 0, 0);
    text(mCaption, 0, mCamera.height, width / 2, 22);
  }
}

async function keyPressed() {
  if (!modelReady) return;

  if (key === " ") {
    let canvasUrl = mCanvas.elt.toDataURL();
    let captions = await mPipeline(canvasUrl);
    mCaption = captions[0].generated_text;
  }
}
