import { useMemo } from "react";
import { OutlinedInputProps, useTheme } from "@material-ui/core";
import { createStyles, makeStyles } from "@material-ui/core/styles";
import { Theme } from "@material-ui/core";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    inputNotchedOutline: {
      borderColor: "#878E95",
      borderRadius: 5,
    },
  }),
);

export const useAppTextField = ({ InputProps }) => {
  const theme = useTheme();
  const styles = useStyles(theme);
  const classes = useMemo(
    () => ({
      input: {
        notchedOutline: styles.inputNotchedOutline,
      },
    }),
    [styles],
  );

  const InputPropsCombined = useMemo<OutlinedInputProps>(
    () => ({
      classes: classes.input,
      ...(InputProps ?? {}),
    }),
    [classes, InputProps],
  );

  return {
    styles,
    classes,
    InputPropsCombined,
  };
};
