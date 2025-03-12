import { config } from 'dotenv';

config();

export class EnvironmentConfig {
  private static secretsCache: Map<string, string> = new Map();

  constructor() {
    this.loadSecretFromENV();
  }

  loadSecretFromENV() {
    for (const key in process.env) {
      if (Object.prototype.hasOwnProperty.call(process.env, key)) {
        if (process.env[key] !== undefined) {
          EnvironmentConfig.secretsCache.set(key, process.env[key]);
        }
      }
    }
  }

  getSecret(key: string): string {
    const secret = EnvironmentConfig.secretsCache.get(key);
    if (!secret) {
      throw new Error(`${key} is not found in ENV`);
    }
    return secret;
  }
}
