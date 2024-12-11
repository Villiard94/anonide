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
            component="div"
            color="primary"
            sx={{
              mr: 2,
              flexGrow: 1,
            }}
          >
            <A
              href="/"
              style={{
                "text-decoration": "none",
                "font-weight": "500",
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
