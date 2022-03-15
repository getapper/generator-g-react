import React, { memo } from "react";
import { useAppSelect } from "./index.hooks";
import {
  FormControl,
  FormControlProps,
  InputLabel,
  MenuItem,
  Select,
} from "@mui/material";
import { Controller } from "react-hook-form";

export type AppSelectProps = {
  control?: any;
  options: {
    value: number | string;
    label: number | string;
  }[];
  label?: string;
  className?: string;
  selectClassName?: string;
  name?: string;
  value?: any;
  onChange?: any;
} & FormControlProps;

export const AppSelect = memo(
  ({
    control,
    options,
    label,
    className,
    selectClassName,
    name,
    value,
    onChange,
    ...props
  }: AppSelectProps) => {
    const {} = useAppSelect();

    const renderSelect = (value1, onChange1) => {
      return (
        <FormControl variant="outlined" className={className} {...props}>
          {label && (
            <InputLabel id={`mui-select-${name.trim()}`}>{label}</InputLabel>
          )}
          <Select
            className={selectClassName}
            labelId={label ? `mui-select-${name.trim()}` : null}
            value={value1}
            onChange={(ev) => onChange1(ev.target.value as number | string)}
            variant="outlined"
            name={name}
            label={label}
          >
            {options.map((option) => (
              <MenuItem value={option.value} key={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      );
    };

    if (!control) {
      return renderSelect(value, onChange);
    }
    return (
      <Controller
        control={control}
        name={name}
        render={({ onChange, value, name, ref }) =>
          renderSelect(value, onChange)
        }
      />
    );
  },
);
