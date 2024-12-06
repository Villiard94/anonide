import { AppBar, Toolbar, Typography, TextField, IconButton, Box } from "@suid/material";
import SearchIcon from "@suid/icons-material/Search";
import CloseIcon from "@suid/icons-material/Close";
import { Component, createSignal, Show } from "solid-js";

interface HeaderProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
}

export const Header: Component<HeaderProps> = (props) => {
  const [isSearchExpanded, setIsSearchExpanded] = createSignal(false);

  const handleClear = () => {
    props.onSearchChange("");
    setIsSearchExpanded(false);
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
              flexGrow: isSearchExpanded() ? 0 : 1,
            }}
          >
            Anonide
          </Typography>

          <Show
            when={isSearchExpanded()}
            fallback={
              <IconButton
                color="inherit"
                onClick={() => setIsSearchExpanded(true)}
                sx={{ ml: "auto" }}
              >
                <SearchIcon />
              </IconButton>
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
                value={props.searchTerm}
                onChange={(e) => props.onSearchChange(e.target.value)}
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
        </Toolbar>
      </AppBar>
    </div>
  );
};
