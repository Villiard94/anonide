import { DictionaryItem } from "./types";
import { LocalStorageService } from "./storage";

const storageService = new LocalStorageService();

export async function getStoredDictionary(): Promise<DictionaryItem[]> {
  const dictionary = await storageService.load<DictionaryItem[]>("dictionary");
  return dictionary || [];
}

export async function saveDictionary(dictionary: DictionaryItem[]): Promise<void> {
  await storageService.save("dictionary", dictionary);
}
