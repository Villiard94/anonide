import { getStoredDictionary, saveDictionary } from "@anonide/anonymizer";
import { Component, createSignal, onMount, onCleanup } from "solid-js";
import { DictionaryList } from "@anonide/ui-components";
import { DictionaryItem } from "@anonide/models";
import { A, useNavigate } from "@solidjs/router";
import { Box, IconButton, TextField } from "@suid/material";
import CloseIcon from "@suid/icons-material/Close";
import AddIcon from "@suid/icons-material/Add";
import { removeToolbarItems, setToolbarItems } from "../store/toolbar-store";

interface SearchToolbarItemProps {
  updateSearchTerm: (searchTerm: string) => void;
}

const SearchToolbarItem: Component<SearchToolbarItemProps> = (props) => {
  const [searchTerm, setSearchTerm] = createSignal("");

  const updateSearchTerm = (term: string) => {
    setSearchTerm(term);
    props.updateSearchTerm(term);
  };

  const handleClear = () => {
    updateSearchTerm("");
  };

  return (
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
        value={searchTerm()}
        autoFocus={true}
        onChange={(e) => updateSearchTerm(e.target.value)}
        InputProps={{
          endAdornment: (
            <IconButton color="inherit" onClick={handleClear} sx={{ ml: 1 }}>
              <CloseIcon />
            </IconButton>
          ),
        }}
      />
    </Box>
  );
};

const Dictionary: Component = () => {
  const [items, setItems] = createSignal<DictionaryItem[]>([]);
  const [searchTerm, setSearchTerm] = createSignal<string>("");
  const navigator = useNavigate();

  onMount(async () => {
    const savedItems = await getStoredDictionary();
    if (savedItems) {
      setItems(savedItems);
    }
  });

  const toolbarIds = setToolbarItems([
    {
      id: "search-dictionary",
      order: 0,
      component: <SearchToolbarItem updateSearchTerm={(term) => setSearchTerm(term)} />,
    },
    {
      id: "add-dictionary-item",
      order: 1,
      component: (
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
      ),
    },
  ]);

  onCleanup(() => {
    removeToolbarItems(toolbarIds);
  });

  const filteredItems = () =>
    items().filter(
      (item) =>
        item.key.toLowerCase().includes(searchTerm().toLowerCase()) ||
        item.token.toLowerCase().includes(searchTerm().toLowerCase()),
    );

  const handleDeleteItem = (id: string) => {
    const currentItems = items();
    const itemToDelete = currentItems.find((i) => i.id === id);
    if (!itemToDelete) {
      console.error("Cannot find item to delete", id);
      return;
    }
    const newItems = currentItems.filter(
      (item) => item.key !== itemToDelete.key || item.token !== itemToDelete.token,
    );
    setItems(newItems);
    saveDictionary(newItems);
  };

  const handleEditItem = (id: string) => {
    navigator(`/dictionary/${id}`);
  };

  return (
    <DictionaryList
      items={filteredItems()}
      onDeleteItem={handleDeleteItem}
      onEditItem={handleEditItem}
    />
  );
};

export default Dictionary;
