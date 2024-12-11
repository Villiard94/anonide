import { Component, Show } from "solid-js";
import { IconButton, Typography, Box, Chip, Stack } from "@suid/material";
import { grey } from "@suid/material/colors";
import DeleteIcon from "@suid/icons-material/DeleteForeverOutlined";
import EditIcon from "@suid/icons-material/EditOutlined";
import ArrowRightIcon from "@suid/icons-material/ArrowRightAlt";
import { DictionaryItem as DictionaryItemType } from "@anonide/models";

interface DictionaryItemProps {
  item: DictionaryItemType;
  onEdit: () => void;
  onDelete: () => void;
}

const DictionaryItem: Component<DictionaryItemProps> = (props) => {
  return (
    <Box sx={{ p: 2, position: "relative" }}>
      <Box sx={{ pr: 6 }}>
        <Stack direction="row" alignContent="center" sx={{ mb: 1 }}>
          <Typography variant="body1" sx={{ mr: 1 }}>
            {props.item.key}
          </Typography>
          <ArrowRightIcon sx={{ mr: 1, color: grey[600] }} />
          <Typography variant="body1">{props.item.token}</Typography>
        </Stack>

        <Stack direction="row" spacing={1}>
          <Show when={props.item.isRegex}>
            <Chip label="Regex" size="small" color="success" variant="outlined" />
          </Show>
          <Show when={props.item.caseSensitive}>
            <Chip label="Case Sensitive" size="small" color="warning" variant="outlined" />
          </Show>
          <Show when={props.item.generateIndex !== false}>
            <Chip label="Indexed" size="small" color="info" variant="outlined" />
          </Show>
        </Stack>
      </Box>

      <IconButton
        onClick={() => props.onEdit()}
        sx={{ position: "absolute", top: 8, right: 44 }}
        size="small"
      >
        <EditIcon />
      </IconButton>

      <IconButton
        onClick={() => props.onDelete()}
        sx={{ position: "absolute", top: 8, right: 8 }}
        size="small"
      >
        <DeleteIcon />
      </IconButton>
    </Box>
  );
};

export default DictionaryItem;
