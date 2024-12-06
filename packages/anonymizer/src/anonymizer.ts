import type { DictionaryItem } from "./types";
import { getStoredDictionary, getStoredDictionaryWithIndeces } from "./dictionaryService";

export class Anonymizer {
  public async anonymize(text: string): Promise<string> {
    const dictionaryItems = await getStoredDictionaryWithIndeces();
    let result = text;

    for (const item of dictionaryItems) {
      const flags = item.caseSensitive ? "g" : "gi";
      const regex = new RegExp(item.key, flags);
      result = result.replace(regex, item.token);
    }

    return result;
  }

  async getConfig(): Promise<DictionaryItem[]> {
    const dictionaryItems = await getStoredDictionary();
    return dictionaryItems;
  }
}
