import { AppBar, Toolbar, Typography, TextField, IconButton, Box } from "@suid/material";
import SearchIcon from "@suid/icons-material/Search";
import CloseIcon from "@suid/icons-material/Close";
import AddIcon from "@suid/icons-material/Add";
import SaveIcon from "@suid/icons-material/Save";
import { Component, Show } from "solid-js";
import {
  getAppState,
  setView,
  setSearchExpanded,
  getSearchTerm,
  updateSearchTerm,
  handleSave,
} from "../store/appState";

export const Header: Component = () => {
  const state = getAppState();

  const handleClear = () => {
    updateSearchTerm("");
    setSearchExpanded(false);
  };

  const handleAddClick = () => {
    setView("add-item");
  };

  const handleCancelAdd = () => {
    setView("list");
  };

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
            Anonide
          </Typography>

          <Show
            when={state.currentView === "list"}
            fallback={
              <Box sx={{ ml: "auto" }}>
                <IconButton
                  color="inherit"
                  onClick={handleSave}
                  disabled={!state.pendingItem?.key || !state.pendingItem?.token}
                  sx={{ mr: 1 }}
                >
                  <SaveIcon />
                </IconButton>
                <IconButton color="inherit" onClick={handleCancelAdd}>
                  <CloseIcon />
                </IconButton>
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
                  <IconButton color="inherit" onClick={handleAddClick} sx={{ ml: 1 }}>
                    <AddIcon />
                  </IconButton>
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
