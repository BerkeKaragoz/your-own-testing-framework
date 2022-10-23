import fetch from "node-fetch";

const BASE_URL = "http://localhost:3000";

const main = async () => {
  const contents = await fetch(BASE_URL).then((res) => res.text());

  console.log(contents);
};

main();
