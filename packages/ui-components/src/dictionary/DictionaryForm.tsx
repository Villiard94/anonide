import { Component, createSignal } from "solid-js";
import { Paper, TextField, FormControlLabel, Checkbox, Button, Grid, Box } from "@suid/material";
import SaveIcon from "@suid/icons-material/Save";
import { DictionaryItem } from "./types";

interface DictionaryFormProps {
  onSubmit: (item: DictionaryItem) => void;
}

const DictionaryForm: Component<DictionaryFormProps> = (props) => {
  const [newItem, setNewItem] = createSignal<DictionaryItem>({
    key: "",
    token: "",
    isRegex: false,
    caseSensitive: false,
  });

  const handleSubmit = (e: Event) => {
    e.preventDefault();
    if (newItem().key && newItem().token) {
      props.onSubmit(newItem());
      setNewItem({
        key: "",
        token: "",
        isRegex: false,
        caseSensitive: false,
      });
    }
  };

  return (
    <Paper elevation={2} sx={{ p: 3, mb: 3 }}>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Search for"
              value={newItem().key}
              onChange={(e) => setNewItem({ ...newItem(), key: e.target.value })}
              required
              size="small"
            />
          </Grid>

          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Replace with"
              value={newItem().token}
              onChange={(e) => setNewItem({ ...newItem(), token: e.target.value })}
              required
              size="small"
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <FormControlLabel
              control={
                <Checkbox
                  checked={newItem().isRegex}
                  onChange={(e) => setNewItem({ ...newItem(), isRegex: e.target.checked })}
                />
              }
              label="Regular Expression"
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <FormControlLabel
              control={
                <Checkbox
                  checked={newItem().caseSensitive}
                  onChange={(e) => setNewItem({ ...newItem(), caseSensitive: e.target.checked })}
                />
              }
              label="Case Sensitive"
            />
          </Grid>

          <Grid item xs={12}>
            <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
              <Button
                type="submit"
                variant="contained"
                startIcon={<SaveIcon />}
                disabled={!newItem().key || !newItem().token}
              >
                Add Dictionary Item
              </Button>
            </Box>
          </Grid>
        </Grid>
      </form>
    </Paper>
  );
};

export default DictionaryForm;
