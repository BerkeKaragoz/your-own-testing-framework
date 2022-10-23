const assert = require("assert");

const BASE_URL = "http://localhost:3000";

const main = async () => {
  const { JSDOM } = await import("jsdom");

  const {
    window: { document },
  } = await JSDOM.fromURL(BASE_URL);

  const titleEl = document.querySelector("#title");
  const rootEl = document.querySelector("#root");

  assert.strictEqual(titleEl.textContent, "index.html", "Title is wrong.");

  assert.strictEqual(
    rootEl.textContent,
    "There should be an asserting error",
    "Expected error!"
  );
};

main();
