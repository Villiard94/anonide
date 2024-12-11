import { Component } from "solid-js";
import { FormControlLabel, Grid, Box, Button } from "@suid/material";
import { createForm, reset, SubmitHandler, zodForm } from "@modular-forms/solid";
import { z } from "zod";
import { FormCheckbox, FormTextField } from "@anonide/forms";

interface DictionaryItemFormProps {
  onSubmit: (item: DictionaryItemFormType) => void;
  initialItem?: DictionaryItemFormType;
}

export const DictionaryItemFormSchema = z.object({
  key: z.string().min(1).max(250),
  token: z.string().min(1).max(250),
  isRegex: z.boolean(),
  caseSensitive: z.boolean(),
  generateIndex: z.boolean().default(true),
});

export type DictionaryItemFormType = z.infer<typeof DictionaryItemFormSchema>;

const DictionaryItemForm: Component<DictionaryItemFormProps> = (props) => {
  const [form, { Form, Field }] = createForm<DictionaryItemFormType, undefined>({
    validate: zodForm(DictionaryItemFormSchema),
    initialValues: props.initialItem ?? {
      key: "",
      token: "",
      isRegex: false,
      caseSensitive: false,
      generateIndex: true,
    },
    validateOn: "touched",
  });

  const handleSubmit: SubmitHandler<DictionaryItemFormType> = (values) => {
    props.onSubmit({
      ...values,
    });
  };

  const handleReset = () => {
    reset(form);
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Box sx={{ py: 4 }}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Field name="key">
              {(field, fieldProps) => (
                <FormTextField
                  field={field}
                  fieldProps={fieldProps}
                  variant="outlined"
                  fullWidth
                  label="Search for"
                  size="small"
                  required
                />
              )}
            </Field>
          </Grid>
          <Grid item xs={12}>
            <Field name="token">
              {(field, fieldProps) => (
                <FormTextField
                  field={field}
                  fieldProps={fieldProps}
                  variant="outlined"
                  fullWidth
                  label="Replace with"
                  size="small"
                  required
                />
              )}
            </Field>
          </Grid>

          <Grid item xs={12} sm={6}>
            <Field name="isRegex" type="boolean">
              {(field, fieldProps) => (
                <FormControlLabel
                  control={<FormCheckbox field={field} fieldProps={fieldProps} />}
                  label="Regular Expression"
                />
              )}
            </Field>
          </Grid>

          <Grid item xs={12} sm={6}>
            <Field name="caseSensitive" type="boolean">
              {(field, fieldProps) => (
                <FormControlLabel
                  control={<FormCheckbox field={field} fieldProps={fieldProps} />}
                  label="Case Sensitive"
                />
              )}
            </Field>
          </Grid>

          <Grid item xs={12} sm={6}>
            <Field name="generateIndex" type="boolean">
              {(field, fieldProps) => (
                <FormControlLabel
                  control={<FormCheckbox field={field} fieldProps={fieldProps} />}
                  label="Generate Index"
                />
              )}
            </Field>
          </Grid>
        </Grid>
      </Box>

      <Box sx={{ display: "flex", justifyContent: "flex-end", mb: 2 }}>
        <Button type="submit" variant="contained">
          Submit
        </Button>
        <Button type="button" variant="outlined" onClick={handleReset} sx={{ ml: 1 }}>
          Reset
        </Button>
      </Box>
    </Form>
  );
};

export default DictionaryItemForm;
