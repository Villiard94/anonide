import { createSignal } from "solid-js";
import { createStore } from "solid-js/store";
import { DictionaryItem } from "@anonide/anonymizer";

export type View = "list" | "add-item";

interface AppState {
  currentView: View;
  searchExpanded: boolean;
  pendingItem: DictionaryItem | null;
}

const [state, setState] = createStore<AppState>({
  currentView: "list",
  searchExpanded: false,
  pendingItem: null,
});

export const getAppState = () => state;

export const setView = (view: View) => {
  setState("currentView", view);
};

export const setSearchExpanded = (expanded: boolean) => {
  setState("searchExpanded", expanded);
};

// Search term state
const [searchTerm, setSearchTerm] = createSignal("");

export const getSearchTerm = () => searchTerm();
export const updateSearchTerm = (term: string) => setSearchTerm(term);

// Form submission handling
export const setPendingItem = (item: DictionaryItem | null) => {
  setState("pendingItem", item);
};

// Event handlers for form actions
const [onSave, setOnSave] = createSignal<((item: DictionaryItem) => void) | null>(null);

export const registerSaveHandler = (handler: (item: DictionaryItem) => void) => {
  setOnSave(() => handler);
};

export const handleSave = () => {
  const saveHandler = onSave();
  if (saveHandler && state.pendingItem) {
    saveHandler(state.pendingItem);
    setPendingItem(null);
    setView("list");
  }
};
