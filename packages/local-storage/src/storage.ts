export interface StorageService {
  save<T>(key: string, value: T): Promise<void>;
  load<T>(key: string): Promise<T | null>;
}

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
    const finalKey = this.getKey(key);
    const item = localStorage.getItem(finalKey);
    if (item == null) {
      return null;
    }
    try {
      return JSON.parse(item) as T;
    } catch (e) {
      console.warn("Cannot deserialize from local storage.", e);
      return null;
    }
  }
}
