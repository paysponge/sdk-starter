import { config } from "dotenv";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const currentDir = dirname(fileURLToPath(import.meta.url));
config({ path: resolve(currentDir, "../../.env") });

export function requireEnv(name: string): string {
  const value = process.env[name];
  if (!value) {
    throw new Error(`Missing ${name}. Copy ../.env.example to ../.env and set ${name}.`);
  }
  return value;
}

export function spongeBaseUrl(): string | undefined {
  return process.env.SPONGE_API_URL;
}
