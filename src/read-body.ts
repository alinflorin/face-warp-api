import { Request } from "express";

export async function readBody(req: Request): Promise<Buffer> {
  return new Promise((resolve, reject) => {
    let buffers: Buffer[] = [];
    req.on("data", (chunk: string) => {
      buffers.push(Buffer.from(chunk));
    });
    req.on("end", () => resolve(Buffer.concat(buffers)));
    req.on("error", reject);
  });
}
