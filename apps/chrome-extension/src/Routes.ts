import type { Component } from "solid-js";
import MenuBook from "@suid/icons-material/MenuBook";
import Transform from "@suid/icons-material/Transform";
import SettingsIcon from "@suid/icons-material/Settings";
import Dictionary from "./pages/Dictionary";
import AddDictionary from "./pages/AddDictionary";
import Convert from "./pages/Convert";
import Settings from "./pages/Settings";
import EditDictionaryItem from "./pages/EditDictionaryItem";

export interface RouteConfig {
  path: string;
  component: Component;
}

export interface MenuItem {
  path: string;
  label: string;
  icon: typeof MenuBook;
  index: number;
}

export const routes: RouteConfig[] = [
  { path: "/", component: Dictionary },
  { path: "/dictionary", component: Dictionary },
  { path: "/dictionary/add", component: AddDictionary },
  { path: "/dictionary/:id", component: EditDictionaryItem },
  { path: "/convert", component: Convert },
  { path: "/settings", component: Settings },
];

export const menuItems: MenuItem[] = [
  {
    path: "/dictionary",
    label: "Dictionary",
    icon: MenuBook,
    index: 0,
  },
  {
    path: "/convert",
    label: "Convert",
    icon: Transform,
    index: 1,
  },
  {
    path: "/settings",
    label: "Settings",
    icon: SettingsIcon,
    index: 2,
  },
];

export const getMenuItemFromPath = (path: string): MenuItem => {
  if (path === "/" || path.startsWith("/dictionary")) {
    return menuItems[0];
  }
  return menuItems.find((item) => path === item.path) || menuItems[0];
};
