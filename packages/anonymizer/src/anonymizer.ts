import { nanoid } from 'nanoid';
import type {
  AnonymizationConfig,
  AnonymizerOptions,
  DictionaryConfig,
  KeywordConfig,
  StorageService
} from './types';

const CONFIG_STORAGE_KEY = 'anonymizer:config';

export class Anonymizer {
  private config: AnonymizationConfig;
  private storage?: StorageService;

  constructor(options: AnonymizerOptions = {}) {
    this.config = options.defaultConfig || {
      type: 'dictionary',
      rules: {},
      caseSensitive: false
    };
    this.storage = options.storage;
    this.loadConfig();
  }

  private async loadConfig(): Promise<void> {
    if (!this.storage) return;
    
    const savedConfig = await this.storage.load<AnonymizationConfig>(CONFIG_STORAGE_KEY);
    if (savedConfig) {
      this.config = savedConfig;
    }
  }

  async saveConfig(config: AnonymizationConfig): Promise<void> {
    this.config = config;
    if (this.storage) {
      await this.storage.save(CONFIG_STORAGE_KEY, config);
    }
  }

  private anonymizeWithDictionary(text: string, config: DictionaryConfig): string {
    let result = text;
    const { rules, caseSensitive = false } = config;

    Object.entries(rules).forEach(([word, replacement]) => {
      const flags = caseSensitive ? 'g' : 'gi';
      const regex = new RegExp(word, flags);
      result = result.replace(regex, replacement);
    });

    return result;
  }

  private anonymizeWithKeywords(text: string, config: KeywordConfig): string {
    let result = text;
    
    config.rules.forEach(({ pattern, replacement }) => {
      const regex = typeof pattern === 'string' ? new RegExp(pattern, 'g') : pattern;
      result = result.replace(regex, replacement);
    });

    return result;
  }

  anonymize(text: string): string {
    if (this.config.type === 'dictionary') {
      return this.anonymizeWithDictionary(text, this.config);
    } else {
      return this.anonymizeWithKeywords(text, this.config);
    }
  }

  generateReplacement(): string {
    return nanoid(8);
  }

  getConfig(): AnonymizationConfig {
    return this.config;
  }
}
