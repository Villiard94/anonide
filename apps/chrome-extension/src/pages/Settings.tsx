import { Component, onCleanup, onMount } from "solid-js";
import { FormControlLabel, Box, Button, Divider } from "@suid/material";
import { createForm, zodForm, SubmitHandler, reset } from "@modular-forms/solid";
import { z } from "zod";
import { FormSwitch } from "@anonide/forms";
import { theme, loadTheme, saveTheme } from "../store/theme-store";
import { clearToolbarTitle, setToolbarTitle } from "../store/toolbar-store";

const SettingsFormSchema = z.object({
  darkMode: z.boolean().default(false),
});

type SettingsFormType = z.infer<typeof SettingsFormSchema>;

const Settings: Component = () => {
  onMount(() => {
    loadTheme();
    setToolbarTitle("Settings");
  });

  onCleanup(() => {
    clearToolbarTitle();
  });

  const [form, { Form, Field }] = createForm<SettingsFormType>({
    validate: zodForm(SettingsFormSchema),
    initialValues: {
      darkMode: theme().darkMode,
    },
  });

  const handleSubmit: SubmitHandler<SettingsFormType> = (values) => {
    saveTheme({ darkMode: values.darkMode });
  };

  const handleReset = () => {
    reset(form);
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Box sx={{ p: 2 }}>
        <Field name="darkMode" type="boolean">
          {(field, fieldProps) => (
            <FormControlLabel
              control={<FormSwitch field={field} fieldProps={fieldProps} />}
              label="Dark Mode"
            />
          )}
        </Field>
      </Box>
      <Divider />

      <Box sx={{ display: "flex", justifyContent: "flex-end", m: 2 }}>
        <Button type="submit" variant="contained">
          Save
        </Button>
        <Button type="button" variant="outlined" onClick={handleReset} sx={{ ml: 1 }}>
          Reset
        </Button>
      </Box>
    </Form>
  );
};

export default Settings;
