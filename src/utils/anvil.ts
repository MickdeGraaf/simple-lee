import { spawn } from "child_process";

export const startAnvil = (port: number, forkBlock?: number, mnemonic?: string) => {
  const params = [];

  if (forkBlock && process.env.MAINNET_RPC) {
    params.push("--fork-block-number", forkBlock.toString());
    params.push("-f", process.env.MAINNET_RPC);
  }

  if (mnemonic) {
    params.push("-m", mnemonic);
  }

  params.push("-p", port.toString());
  params.push("--host", "0.0.0.0");

  const childProcess = spawn("anvil", params);

  childProcess.stdout.on("data", (data) => {
    // console.log(`stdout: ${data}`);
  });

  childProcess.stderr.on("data", function (data) {
    // console.log('stderr: ' + data);
  });

  childProcess.on("exit", function (code) {
    // console.log('Exited with code:' + code);
  });

  return childProcess;
};
