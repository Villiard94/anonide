import { Component, For } from "solid-js";
import { useNavigate, useLocation } from "@solidjs/router";
import { BottomNavigation, BottomNavigationAction, Box, Divider } from "@suid/material";
import { menuItems, getMenuItemFromPath } from "../Routes";

export const Footer: Component = () => {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <Box sx={{ width: 1 }}>
      <Divider />
      <BottomNavigation
        showLabels
        value={getMenuItemFromPath(location.pathname).index}
        onChange={(event, newValue) => {
          const menuItem = menuItems.find((item) => item.index === newValue);
          if (menuItem) {
            navigate(menuItem.path);
          }
        }}
      >
        <For each={menuItems}>
          {(item) => <BottomNavigationAction label={item.label} icon={<item.icon />} />}
        </For>
      </BottomNavigation>
    </Box>
  );
};
