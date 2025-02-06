import { pipeline } from "https://cdn.jsdelivr.net/npm/@xenova/transformers@2.17.2";

const analyzer = await pipeline(
  "sentiment-analysis",
  "thiagohersan/roberta-base-go_emotions"
);

const generator = await pipeline(
  "text-generation",
  "Xenova/llama2.c-stories110M"
)

const captioner = await pipeline(
  "image-to-text",
  "Xenova/vit-gpt2-image-captioning"
);

Object.defineProperty(window, "analyzer", {
  get() { return analyzer; },
});

Object.defineProperty(window, "generator", {
  get() { return generator; },
});

Object.defineProperty(window, "captioner", {
  get() { return captioner; },
});
