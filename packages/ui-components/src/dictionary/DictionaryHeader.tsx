import { Component } from "solid-js";
import { TextField, Button, Paper, Box } from "@suid/material";
import AddIcon from "@suid/icons-material/Add";
import CloseIcon from "@suid/icons-material/Close";

interface DictionaryHeaderProps {
  searchTerm: string;
  showForm: boolean;
  onSearchChange: (value: string) => void;
  onToggleForm: () => void;
}

const DictionaryHeader: Component<DictionaryHeaderProps> = (props) => {
  return (
    <Paper elevation={1} sx={{ p: 2, mb: 2 }}>
      <Box sx={{ display: "flex", gap: 2, alignItems: "center" }}>
        <TextField
          size="small"
          fullWidth
          placeholder="Search dictionary..."
          value={props.searchTerm}
          onChange={(e) => props.onSearchChange(e.target.value)}
        />
        <Button
          variant="contained"
          startIcon={props.showForm ? <CloseIcon /> : <AddIcon />}
          onClick={() => props.onToggleForm()}
        >
          {props.showForm ? "Cancel" : "Add Item"}
        </Button>
      </Box>
    </Paper>
  );
};

export default DictionaryHeader;
