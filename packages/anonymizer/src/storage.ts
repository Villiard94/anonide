import { StorageService } from "./types";

export class LocalStorageService implements StorageService {
  private prefix: string;

  constructor(prefix: string = "anonide:") {
    this.prefix = prefix;
  }

  private getKey(key: string): string {
    return `${this.prefix}${key}`;
  }

  async save<T>(key: string, value: T): Promise<void> {
    const serialized = JSON.stringify(value);
    localStorage.setItem(this.getKey(key), serialized);
  }

  async load<T>(key: string): Promise<T | null> {
    const serialized = localStorage.getItem(this.getKey(key));
    if (!serialized) return null;

    try {
      return JSON.parse(serialized) as T;
    } catch {
      return null;
    }
  }
}
