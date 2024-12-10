import { Component, createSignal, createEffect } from "solid-js";
import { TextField, FormControlLabel, Checkbox, Grid, Box } from "@suid/material";
import { DictionaryItem } from "@anonide/models";

interface DictionaryFormProps {
  onChange: (item: DictionaryItem) => void;
}

const DictionaryForm: Component<DictionaryFormProps> = (props) => {
  const [formData, setFormData] = createSignal<DictionaryItem>({
    key: "",
    token: "",
    isRegex: false,
    caseSensitive: false,
    generateIndex: true,
  });

  // Notify parent component whenever form values change
  createEffect(() => {
    const currentData = formData();
    if (currentData.key || currentData.token) {
      props.onChange(currentData);
    }
  });

  const handleChange = (field: keyof DictionaryItem, value: string | boolean) => {
    setFormData((prev) => {
      const updated = { ...prev, [field]: value };
      return updated;
    });
  };

  return (
    <Box sx={{ py: 4 }}>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <TextField
            fullWidth
            label="Search for"
            value={formData().key}
            onChange={(e) => handleChange("key", e.target.value)}
            required
            size="small"
          />
        </Grid>

        <Grid item xs={12}>
          <TextField
            fullWidth
            label="Replace with"
            value={formData().token}
            onChange={(e) => handleChange("token", e.target.value)}
            required
            size="small"
          />
        </Grid>

        <Grid item xs={12} sm={6}>
          <FormControlLabel
            control={
              <Checkbox
                checked={formData().isRegex}
                onChange={(e) => handleChange("isRegex", e.target.checked)}
              />
            }
            label="Regular Expression"
          />
        </Grid>

        <Grid item xs={12} sm={6}>
          <FormControlLabel
            control={
              <Checkbox
                checked={formData().caseSensitive}
                onChange={(e) => handleChange("caseSensitive", e.target.checked)}
              />
            }
            label="Case Sensitive"
          />
        </Grid>

        <Grid item xs={12} sm={6}>
          <FormControlLabel
            control={
              <Checkbox
                checked={formData().generateIndex}
                onChange={(e) => handleChange("generateIndex", e.target.checked)}
              />
            }
            label="Generate Index"
          />
        </Grid>
      </Grid>
    </Box>
  );
};

export default DictionaryForm;
