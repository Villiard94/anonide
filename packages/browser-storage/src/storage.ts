import browser from "webextension-polyfill";

export interface StorageService {
  save<T>(key: string, value: T): Promise<void>;
  load<T>(key: string): Promise<T | null>;
}

export class BrowserStorageService implements StorageService {
  private prefix: string;

  constructor(prefix: string = "anonide:") {
    this.prefix = prefix;
  }

  private getKey(key: string): string {
    return `${this.prefix}${key}`;
  }

  async save<T>(key: string, value: T): Promise<void> {
    const serialized = JSON.stringify(value);
    return browser.storage.local.set({
      [this.getKey(key)]: serialized,
    });
  }

  async load<T>(key: string): Promise<T | null> {
    const finalKey = this.getKey(key);
    const record = await browser.storage.local.get(finalKey);
    if (!record || !record[finalKey]) return null;

    try {
      return JSON.parse(record[finalKey] as string) as T;
    } catch {
      return null;
    }
  }
}
