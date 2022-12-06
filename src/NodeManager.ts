import { Node } from "./types/Node";
import { startAnvil } from "./utils/anvil";

class NodeManager {
  nodes: Node[] = [];
  // constuctor
  constructor() {
    // On process exit kill all node processes
    process.on("exit", () => {
      this.nodes.forEach((node) => {
        node.process.kill();
      });
    });
  }

  start = (port: number, forkBlock?: number, mnemonic?: string) => {
    const chilProcess = startAnvil(port, forkBlock, mnemonic);

    const id = Math.random().toString(36).substring(2, 22);

    this.nodes.push({
      process: chilProcess,
      port,
      // Random string of 20 characters
      id: id,
    });

    // TODO error handling
    return {
      error: null,
      id: id,
    };
  };

  kill(id: string) {
    const node = this.nodes.find((node) => node.id == id);
    if (node) {
      node.process.kill();
      this.nodes = this.nodes.filter((node) => node.id != id);
    }
  }

  getUrlById = (id: string) => {
    const node = this.nodes.find((node) => node.id == id);
    if (node) {
      return `http://localhost:${node.port}`;
    }
    return null;
  };

  getNodeById = (id: string) => {
    const node = this.nodes.find((node) => node.id == id);
    return node;
  };
}

export default NodeManager;
