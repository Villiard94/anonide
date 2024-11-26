import { Component, Show } from "solid-js";
import { Card, CardContent, IconButton, Typography, Box, Chip, Stack } from "@suid/material";
import DeleteIcon from "@suid/icons-material/Delete";
import { DictionaryItem as DictionaryItemType } from "./types";

interface DictionaryItemProps {
  item: DictionaryItemType;
  onDelete: () => void;
}

const DictionaryItem: Component<DictionaryItemProps> = (props) => {
  return (
    <Card sx={{ mb: 2, position: "relative" }}>
      <CardContent>
        <Box sx={{ pr: 6 }}>
          <Typography variant="subtitle2" color="text.secondary" gutterBottom>
            Search for:
          </Typography>
          <Typography variant="body1" sx={{ mb: 1 }}>
            {props.item.key}
          </Typography>

          <Typography variant="subtitle2" color="text.secondary" gutterBottom>
            Replace with:
          </Typography>
          <Typography variant="body1" sx={{ mb: 2 }}>
            {props.item.token}
          </Typography>

          <Stack direction="row" spacing={1}>
            <Show when={props.item.isRegex}>
              <Chip label="Regex" size="small" color="primary" variant="outlined" />
            </Show>
            <Show when={props.item.caseSensitive}>
              <Chip label="Case Sensitive" size="small" color="primary" variant="outlined" />
            </Show>
          </Stack>
        </Box>

        <IconButton
          onClick={() => props.onDelete()}
          sx={{ position: "absolute", top: 8, right: 8 }}
          color="error"
          size="small"
        >
          <DeleteIcon />
        </IconButton>
      </CardContent>
    </Card>
  );
};

export default DictionaryItem;
