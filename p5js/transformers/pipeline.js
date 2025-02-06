import { pipeline } from "https://cdn.jsdelivr.net/npm/@xenova/transformers@2.17.2";

const captioner = await pipeline(
  "image-to-text",
  "Xenova/vit-gpt2-image-captioning"
);

Object.defineProperty(window, "captioner", {
  get() { return captioner; },
});
