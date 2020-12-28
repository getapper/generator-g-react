import { useTheme } from "@material-ui/core";
import { createStyles, makeStyles } from "@material-ui/core/styles";
import { Theme } from "@material-ui/core";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    alertBox: {
      border: "1px solid #726C91",
      borderRadius: 3,
      padding: "19px 37px 19px 27px",
      display: "flex",
      flexDirection: "row",
    },
    info: {
      background: "#DFDFEB 0% 0% no-repeat padding-box",
    },
    success: {
      background: `${theme.palette.success.main} 0% 0% no-repeat padding-box`,
      color: "white !important",
    },
    error: {
      background: `#C42727 0% 0% no-repeat padding-box`,
      color: "white !important",
    },
  })
);

const useAppAlertBox = () => {
  const theme = useTheme();
  const styles = useStyles(theme);

  return {
    styles,
  };
};

export default useAppAlertBox;
