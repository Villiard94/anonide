import { FieldStore, FieldElementProps, FieldValues, FieldPath } from "@modular-forms/solid";

export type FormControlProps<
  TControlProps,
  TFieldValues extends FieldValues,
  TFieldName extends FieldPath<TFieldValues>,
> = TControlProps & {
  field: FieldStore<TFieldValues, TFieldName>;
  fieldProps: FieldElementProps<TFieldValues, TFieldName>;
};
