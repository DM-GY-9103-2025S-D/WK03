let mCamera;
function preload() {
  mCamera = createCapture(VIDEO, { flipped: true });
  mCamera.hide();
}

let mCanvas;
let mCaption = "";
function setup() {
  mCanvas = createCanvas(windowWidth, windowHeight);
  mCaption = "";
  textSize(20);
}

function draw() {
  background(220);
  image(mCamera, 0, 0);
  text(mCaption, 10, mCamera.height, mCamera.width, 100);
}

let mSound;
function playSound() {
  mSound.rate(0.9);
  mSound.play();
}

async function captionBlob(blob) {
  let captionRes = await predict("/predict", { img: blob });
  mCaption = captionRes.data[0];

  let generateRes = await predict("/predict_1", { txt: mCaption });
  let mGenerate = generateRes.data[0];
  print(mGenerate);

  let audioRes = await predict("/predict_2", { txt: mGenerate });
  let audioUrl = audioRes.data[0].url;

  mSound = loadSound(audioUrl, playSound);
}

async function keyPressed() {
  if (key === " ") {
    mCanvas.elt.toBlob(captionBlob);
  }
}
