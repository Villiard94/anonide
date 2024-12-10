import { AppBar, Toolbar, Typography, TextField, IconButton, Box } from "@suid/material";
import SearchIcon from "@suid/icons-material/Search";
import CloseIcon from "@suid/icons-material/Close";
import FactCheckIcon from "@suid/icons-material/FactCheckOutlined";
import AddIcon from "@suid/icons-material/Add";
import { Component, Show } from "solid-js";
import { A, useLocation } from "@solidjs/router";
import { getAppState, setSearchExpanded, getSearchTerm, updateSearchTerm } from "../store/appState";

export const Header: Component = () => {
  const state = getAppState();
  const location = useLocation();

  const handleClear = () => {
    updateSearchTerm("");
    setSearchExpanded(false);
  };

  const showSearch = () => location.pathname === "/dictionary";

  return (
    <div>
      <AppBar position="static">
        <Toolbar>
          <Typography
            variant="h6"
            component="div"
            sx={{
              mr: 2,
              flexGrow: state.searchExpanded ? 0 : 1,
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

          <Show
            when={showSearch()}
            fallback={
              <Box sx={{ ml: "auto" }}>
                <A
                  href="/dictionary"
                  style={{
                    "text-decoration": "none",
                    color: "inherit",
                    "margin-right": "8px",
                  }}
                >
                  <IconButton color="inherit">
                    <FactCheckIcon />
                  </IconButton>
                </A>
                <A
                  href="/dictionary/add"
                  style={{
                    "text-decoration": "none",
                    color: "inherit",
                  }}
                >
                  <IconButton color="inherit">
                    <AddIcon />
                  </IconButton>
                </A>
              </Box>
            }
          >
            <Show
              when={state.searchExpanded}
              fallback={
                <Box sx={{ ml: "auto" }}>
                  <IconButton color="inherit" onClick={() => setSearchExpanded(true)}>
                    <SearchIcon />
                  </IconButton>
                  <A
                    href="/dictionary/add"
                    style={{
                      "text-decoration": "none",
                      color: "inherit",
                    }}
                  >
                    <IconButton color="inherit" sx={{ ml: 1 }}>
                      <AddIcon />
                    </IconButton>
                  </A>
                </Box>
              }
            >
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  flexGrow: 1,
                  maxWidth: "400px",
                  ml: "auto",
                }}
              >
                <TextField
                  size="small"
                  fullWidth
                  placeholder="Search dictionary..."
                  value={getSearchTerm()}
                  onChange={(e) => updateSearchTerm(e.target.value)}
                  sx={{
                    "& .MuiInputBase-root": {
                      color: "white",
                      "& fieldset": {
                        borderColor: "rgba(255, 255, 255, 0.23)",
                      },
                      "&:hover fieldset": {
                        borderColor: "rgba(255, 255, 255, 0.87)",
                      },
                      "&.Mui-focused fieldset": {
                        borderColor: "white",
                      },
                    },
                    "& .MuiInputBase-input::placeholder": {
                      color: "rgba(255, 255, 255, 0.7)",
                      opacity: 1,
                    },
                  }}
                />
                <IconButton color="inherit" onClick={handleClear} sx={{ ml: 1 }}>
                  <CloseIcon />
                </IconButton>
              </Box>
            </Show>
          </Show>
        </Toolbar>
      </AppBar>
    </div>
  );
};
