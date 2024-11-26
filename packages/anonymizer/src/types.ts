export type AnonymizationRule = {
  pattern: string | RegExp;
  replacement: string;
};

export type DictionaryConfig = {
  type: "dictionary";
  rules: Record<string, string>;
  caseSensitive?: boolean;
};

export type KeywordConfig = {
  type: "keyword";
  rules: AnonymizationRule[];
};

export type AnonymizationConfig = DictionaryConfig | KeywordConfig;

export interface StorageService {
  save<T>(key: string, value: T): Promise<void>;
  load<T>(key: string): Promise<T | null>;
}

export interface AnonymizerOptions {
  storage?: StorageService;
  defaultConfig?: AnonymizationConfig;
}
