import { TextField } from "@suid/material";
import { TextFieldProps } from "@suid/material/TextField";
import { FieldElement, FieldValues, FieldPath } from "@modular-forms/solid";
import { FormControlProps } from "./common";

/**
 * A wrapper component for SUID's TextField integrated with ModularForms.
 * It maps field properties and state from ModularForms to the TextField component.
 */
export const FormTextField = <
  TFieldValues extends FieldValues,
  TFieldName extends FieldPath<TFieldValues>,
>(
  props: FormControlProps<TextFieldProps, TFieldValues, TFieldName>,
) => {
  return (
    <TextField
      {...props}
      name={props.fieldProps.name}
      value={props.field.value}
      onChange={(e) =>
        props.fieldProps.onInput(
          e as unknown as InputEvent & {
            currentTarget: FieldElement;
            target: Element;
          },
        )
      }
      onBlur={props.fieldProps.onBlur}
      autoFocus={props.fieldProps.autofocus}
      error={Boolean(props.field.error)}
      helperText={props.field.error || props.helperText}
    />
  );
};

export default FormTextField;
