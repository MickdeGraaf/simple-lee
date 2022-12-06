import { ChildProcessWithoutNullStreams } from "child_process";

export interface Node {
  process: ChildProcessWithoutNullStreams;
  port: number;
  id: string;
}
