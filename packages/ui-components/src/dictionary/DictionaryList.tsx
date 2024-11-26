import { Component, For, Show } from "solid-js";
import { List, Typography, Box } from "@suid/material";
import DictionaryItem from "./DictionaryItem";
import { DictionaryItem as DictionaryItemType } from "./types";

interface DictionaryListProps {
  items: DictionaryItemType[];
  onDeleteItem: (index: number) => void;
}

const DictionaryList: Component<DictionaryListProps> = (props) => {
  return (
    <Box sx={{ mt: 2 }}>
      <Show
        when={props.items.length > 0}
        fallback={
          <Typography variant="body1" color="text.secondary" sx={{ textAlign: "center", py: 4 }}>
            No dictionary items found
          </Typography>
        }
      >
        <List sx={{ p: 0 }}>
          <For each={props.items}>
            {(item, index) => (
              <DictionaryItem item={item} onDelete={() => props.onDeleteItem(index())} />
            )}
          </For>
        </List>
      </Show>
    </Box>
  );
};

export default DictionaryList;
