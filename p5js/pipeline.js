let pipeline;

async function loadModule() {
  try {
    const module = await import("https://cdn.jsdelivr.net/npm/@xenova/transformers@2.17.2");
    pipeline = module.pipeline;
  } catch (error) {
    console.error("Failed to load module:", error);
  }
}

loadModule();
