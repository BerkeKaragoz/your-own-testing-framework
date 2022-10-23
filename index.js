const BASE_URL = "http://localhost:3000";

const main = async () => {
  const { JSDOM } = await import("jsdom");
  const {
    window: { document },
  } = await JSDOM.fromURL(BASE_URL);

  const titleEl = document.querySelector("#title");

  console.log("title", titleEl.textContent);
};

main();
