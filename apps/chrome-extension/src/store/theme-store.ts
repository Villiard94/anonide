import { createSignal } from "solid-js";
import { LocalStorageService } from "@anonide/local-storage";

const THEME_KEY = "theme";
const storage = new LocalStorageService();

export type Theme = {
  darkMode: boolean;
};

let loaded = false;
const [theme, setTheme] = createSignal<Theme>({ darkMode: false });

export const loadTheme = async () => {
  if (loaded) {
    return;
  }
  const savedTheme = await storage.load<Theme>(THEME_KEY);
  if (savedTheme) {
    setTheme(savedTheme);
    loaded = true;
  }
};

export const saveTheme = async (newTheme: Theme) => {
  await storage.save(THEME_KEY, newTheme);
  setTheme(newTheme);
};

export { theme };
