import { StorageService, BrowserStorageService } from "@anonide/browser-storage";
import { DictionaryItem } from "@anonide/models";

const storageService: StorageService = new BrowserStorageService();

export async function getStoredDictionary(): Promise<DictionaryItem[]> {
  const dictionary = await storageService.load<DictionaryItem[]>("dictionary");
  return dictionary || [];
}
export async function getStoredDictionaryWithIndeces(): Promise<DictionaryItem[]> {
  const items = await getStoredDictionary();
  const tokenCounts: { [token: string]: number } = {};

  return items.map((item) => {
    if (item.generateIndex !== false) {
      if (!tokenCounts[item.token]) {
        tokenCounts[item.token] = 1;
      }
      const index = tokenCounts[item.token]++;
      return {
        ...item,
        token: `${item.token}_${index}`,
      };
    }
    return item;
  });
}

export async function saveDictionary(dictionary: DictionaryItem[]): Promise<void> {
  await storageService.save("dictionary", dictionary);
}
