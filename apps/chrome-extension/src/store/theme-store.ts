import { createSignal } from "solid-js";
import { LocalStorageService } from "@anonide/local-storage";

const THEME_KEY = "theme";
const storage = new LocalStorageService();

export type Theme = {
  darkMode: boolean;
};

const [theme, setTheme] = createSignal<Theme>({ darkMode: false });

export const loadTheme = async () => {
  const savedTheme = await storage.load<Theme>(THEME_KEY);
  if (savedTheme) {
    setTheme(savedTheme);
  }
};

export const saveTheme = async (newTheme: Theme) => {
  await storage.save(THEME_KEY, newTheme);
  setTheme(newTheme);
};

export { theme };
