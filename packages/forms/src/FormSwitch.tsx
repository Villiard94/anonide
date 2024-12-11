import { Switch } from "@suid/material";
import { SwitchTypeMap } from "@suid/material/Switch";
import { FieldElement, FieldValues, FieldPath } from "@modular-forms/solid";
import { createEffect, createSignal } from "solid-js";
import { FormControlProps } from "./common";

/**
 * A wrapper component for SUID's Switch integrated with ModularForms.
 * It maps field properties and state from ModularForms to the Switch component.
 */
export const FormSwitch = <
  TFieldValues extends FieldValues,
  TFieldName extends FieldPath<TFieldValues>,
>(
  props: FormControlProps<SwitchTypeMap["selfProps"], TFieldValues, TFieldName>,
) => {
  // eslint-disable-next-line solid/reactivity
  const [v, setV] = createSignal(!!props.field.value);

  createEffect(() => {
    setV(!!props.field.value);
  });

  return (
    <Switch
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

export default FormSwitch;
