import { AppBar, Toolbar, Typography } from "@suid/material";
import { Component } from "solid-js";

export const Header: Component = () => {
  return (
    <div>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Anonide
          </Typography>
        </Toolbar>
      </AppBar>
    </div>
  );
};
