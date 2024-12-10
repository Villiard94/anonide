import { Component, For, Show } from "solid-js";
import { List, Typography, Box, Divider } from "@suid/material";
import { DictionaryItem as DictionaryItemType } from "@anonide/models";
import DictionaryItem from "./DictionaryItem";

interface DictionaryListProps {
  items: DictionaryItemType[];
  onDeleteItem: (itemId: string) => void;
  onEditItem: (itemId: string) => void;
}

const DictionaryList: Component<DictionaryListProps> = (props) => {
  return (
    <Box>
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
              <Box>
                <Show when={index() !== 0}>
                  <Divider />
                </Show>
                <DictionaryItem
                  item={item}
                  onDelete={() => props.onDeleteItem(item.id)}
                  onEdit={() => props.onEditItem(item.id)}
                />
              </Box>
            )}
          </For>
        </List>
      </Show>
    </Box>
  );
};

export default DictionaryList;
