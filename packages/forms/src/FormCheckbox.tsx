import { Checkbox } from "@suid/material";
import { CheckboxTypeMap } from "@suid/material/Checkbox";
import { FieldElement, FieldValues, FieldPath } from "@modular-forms/solid";
import { createEffect, createSignal } from "solid-js";
import { FormControlProps } from "./common";

/**
 * A wrapper component for SUID's TextField integrated with ModularForms.
 * It maps field properties and state from ModularForms to the TextField component.
 */
export const FormCheckbox = <
  TFieldValues extends FieldValues,
  TFieldName extends FieldPath<TFieldValues>,
>(
  props: FormControlProps<CheckboxTypeMap["selfProps"], TFieldValues, TFieldName>,
) => {
  // eslint-disable-next-line solid/reactivity
  const [v, setV] = createSignal(!!props.field.value);

  createEffect(() => {
    setV(!!props.field.value);
  });

  return (
    <Checkbox
      {...props}
      name={props.fieldProps.name}
      checked={v()}
      onChange={(e, checked) => {
        setV(checked);
        props.fieldProps.onChange(e);
        props.fieldProps.onInput(
          e as unknown as InputEvent & {
            currentTarget: FieldElement;
            target: Element;
          },
        );
      }}
      inputProps={{ "aria-label": "controlled" }}
    />
  );
};

export default FormCheckbox;
