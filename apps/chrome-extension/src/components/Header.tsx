import { AppBar, Toolbar, Typography } from "@suid/material";
import { Component, For } from "solid-js";
import { A } from "@solidjs/router";
import { ThemedLogo } from "./icons/ThemedLogo";
import { getToolbarState } from "../store/toolbar-store";

export const Header: Component = () => {
  return (
    <div>
      <AppBar position="static">
        <Toolbar>
          <Typography
            component="div"
            color="primary"
            sx={{
              mr: 2,
            }}
          >
            <A
              href="/"
              style={{
                "text-decoration": "none",
                "font-weight": "500",
                color: "inherit",
                display: "flex",
              }}
            >
              <ThemedLogo size={36} />
            </A>
          </Typography>
          <Typography
            component="div"
            variant="h6"
            sx={{
              flexGrow: 1,
            }}
          >
            {getToolbarState().title}
          </Typography>
          <For each={getToolbarState().items}>{(item) => item.component}</For>
        </Toolbar>
      </AppBar>
    </div>
  );
};
