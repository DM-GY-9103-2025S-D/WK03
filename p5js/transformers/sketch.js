let mCamera;
function preload() {
  mCamera = createCapture(VIDEO, { flipped: true });
  mCamera.hide();
}

let mCanvas;
let mCaption;

function setup() {
  mCanvas = createCanvas(windowWidth, windowHeight);
  caption = "";
}

let modelReady;

function draw() {
  background(220);

  modelReady = typeof captioner !== "undefined";

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
    let captions = await captioner(canvasUrl);
    mCaption = captions[0].generated_text;
  }
}
