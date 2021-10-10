import { useMemo } from "react";
import { useTheme } from "@material-ui/core";
import { createStyles, makeStyles } from "@material-ui/core/styles";
import { Theme } from "@material-ui/core";
import { useAtomicStyles } from "styles";
import { useDispatch } from "react-redux";
import { push } from "connected-react-router";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({}),
);

export const useAppButton = (path: string, onClick?: any) => {
  const theme = useTheme();
  const styles = useStyles(theme);
  const classes = useMemo(() => ({}), []);
  const atomicStyles = useAtomicStyles();
  const dispatch = useDispatch();

  const onButtonClicked = useMemo(
    () => (path ? () => dispatch(push(path)) : onClick),
    [dispatch, path, onClick],
  );

  return {
    styles,
    classes,
    atomicStyles,
    onButtonClicked,
  };
};
