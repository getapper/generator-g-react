import React, { memo } from "react";
import { useAppTextField } from "./index.hooks";
import { TextFieldProps, TextField } from "@material-ui/core";
import { Controller } from "react-hook-form";

export type AppTextFieldProps = {
  control?: any;
  textFieldRef?: React.MutableRefObject<HTMLInputElement>;
} & TextFieldProps;

export const AppTextField = memo(
  ({
    control,
    InputProps,
    textFieldRef,
    inputRef,
    ...props
  }: AppTextFieldProps) => {
    const { InputPropsCombined } = useAppTextField({
      InputProps,
    });

    if (control) {
      const { name, onChange, ...otherProps } = props;
      return (
        <Controller
          control={control}
          name={name}
          render={({ onChange, onBlur, value, name, ref }) => {
            /**
             * The Controller helps us to switch from uncontrolled to controlled input.
             * The InputPropsCombined enhance the Input with custom styling.
             * The value and onChange are passed from the Controller and interact
             * directly with the react hook form control passed to the Input
             * The ref is both passed to the react hook form, and also to a custom
             * textFieldRef usefull to trigger some side effect like .focus()
             */
            return (
              <TextField
                name={name}
                variant="outlined"
                {...otherProps}
                InputProps={InputPropsCombined}
                onChange={(ev) => onChange(ev.target.value)}
                value={value ?? ""}
                inputRef={(e) => {
                  ref.current = e;
                  if (textFieldRef) {
                    textFieldRef.current = e;
                  }
                }}
                onBlur={onBlur}
              />
            );
          }}
        />
      );
    } else {
      return (
        <TextField
          variant="outlined"
          {...props}
          InputProps={InputPropsCombined}
          inputRef={
            inputRef
              ? inputRef
              : (e) => {
                  if (textFieldRef) {
                    textFieldRef.current = e;
                  }
                }
          }
        />
      );
    }
  },
);
