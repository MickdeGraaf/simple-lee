import axios from "axios";
import express from "express";

import NodeManager from "./NodeManager";

require("dotenv").config();

const app = express();
const nodeManager = new NodeManager();
app.use(require("body-parser").json());

app.get("/", (req, res) => {
  res.send(`
    <pre>
    Inspired by Alexintosh's Cheaperdly
    https://github.com/Alexintosh/Cheapderly
    
    ---> /start <-- Starts a node
    1. /rpc mirrors all rpc calls
    </pre>
    `);
});

app.all("/rpc/:id", async (req, res, next) => {
  console.log(req.params);
  // const rpc = nodeManager.getUrlById(req.params.id);
  const node = nodeManager.getNodeById(req.params.id);

  if (!node) {
    next(new Error("Node not found"));
    return;
  }

  console.log("node port");
  console.log(node.port);
  console.log(req.body);
  console.log(`http://localhost:${node.port}`);

  const response = await axios.post(`http://localhost:${node.port}`, req.body);

  console.log(response.data);

  res.send(response.data);

  // res.send("ok");
});

app.get("/start", (req, res) => {
  const result = nodeManager.start(
    // random port in range
    Math.floor(Math.random() * (65535 - 49152) + 49152),
    // @ts-ignore
    req.query.forkBlock ? parseInt(req.query.forkBlock) : undefined,
    // @ts-ignore
    req.query.mnemonic,
  );
  // const result = nodeManager.start(8545);
  res.send(result);
});

app.get("/kill/:id", (req, res) => {
  nodeManager.kill(req.params.id);
  res.send("Killed");
});

app.listen(process.env.PORT, () => {
  console.log(`Server listening on port ${process.env.PORT}`);
  console.log(`Accessible at http://localhost:${process.env.PORT}`);
});
