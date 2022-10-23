import fs from "fs";
import path from "path";
import { WebSocketServer } from "ws";

const PUBLIC_DIR = "./public";

const wss = new WebSocketServer({
  port: 30000,
});

const connections = [];

wss.on("connection", (con, req) => {
  connections.push(con);
  console.info("Opened client from:", req.socket.remoteAddress);
});

fs.readdirSync(PUBLIC_DIR).forEach((filename) => {
  fs.watchFile(path.resolve(PUBLIC_DIR, filename), (curr) => {
    console.log("Changes:", curr.atime);

    for (let i = 0; i < connections.length; i++)
      connections[i].send(JSON.stringify(curr));
  });
});
