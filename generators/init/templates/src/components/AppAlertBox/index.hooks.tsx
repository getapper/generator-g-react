import { useTheme } from "@mui/material";

export const useAppAlertBox = () => {
  const theme = useTheme();

  return {
    theme,
  };
};
