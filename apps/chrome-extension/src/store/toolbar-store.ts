import { JSX } from "solid-js";
import { createStore } from "solid-js/store";

export interface ToolbarItem {
  id: string;
  component: JSX.Element;
  order?: number;
}

interface ToolbarState {
  items: ToolbarItem[];
}

const [state, setState] = createStore<ToolbarState>({
  items: [],
});

export const getToolbarState = () => state;

export const setToolbarItems = (items: ToolbarItem[]) => {
  // Sort items by order if specified
  const sortedItems = [...items].sort((a, b) => {
    if (a.order === undefined && b.order === undefined) return 0;
    if (a.order === undefined) return 1;
    if (b.order === undefined) return -1;
    return a.order - b.order;
  });
  setState("items", sortedItems);
  return items.map((x) => x.id);
};

export const addToolbarItem = (item: ToolbarItem) => {
  setState("items", (items) => {
    const newItems = [...items, item];
    return newItems.sort((a, b) => {
      if (a.order === undefined && b.order === undefined) return 0;
      if (a.order === undefined) return 1;
      if (b.order === undefined) return -1;
      return a.order - b.order;
    });
  });
};

export const removeToolbarItem = (itemId: string) => {
  setState("items", (items) => items.filter((item) => item.id !== itemId));
};

export const removeToolbarItems = (itemIds: string[]) => {
  setState("items", (items) => items.filter((item) => !itemIds.includes(item.id)));
};

export const clearToolbarItems = () => {
  setState("items", []);
};
