import { AppBar, Toolbar, Typography } from "@suid/material";
import { Component, For } from "solid-js";
import { A } from "@solidjs/router";
import { getToolbarState } from "../store/toolbar-store";

export const Header: Component = () => {
  return (
    <div>
      <AppBar position="static">
        <Toolbar>
          <Typography
            variant="h6"
            component="div"
            sx={{
              mr: 2,
              flexGrow: 1,
            }}
          >
            <A
              href="/"
              style={{
                "text-decoration": "none",
                color: "inherit",
              }}
            >
              Anonide
            </A>
          </Typography>
          <For each={getToolbarState().items}>{(item) => item.component}</For>
        </Toolbar>
      </AppBar>
    </div>
  );
};
