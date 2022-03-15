import React, { memo, ReactNode } from "react";
import { useAppAlertBox } from "./index.hooks";
import { Box } from "@mui/material";

export enum AlertTypes {
  Success,
  Info,
  Error,
}

interface AlertBoxProps {
  containerClassName?: any;
  children?: ReactNode;
  type: AlertTypes;
}

export const AppAlertBox = memo(
  ({ containerClassName, children, type, ...props }: AlertBoxProps) => {
    const { theme } = useAppAlertBox();

    return (
      <Box
        sx={{
          border: "1px solid #726C91",
          borderRadius: 3,
          padding: "19px 37px 19px 27px",
          display: "flex",
          flexDirection: "row",
          background:
            type === AlertTypes.Info
              ? "#DFDFEB 0% 0% no-repeat padding-box"
              : type === AlertTypes.Success
              ? `${theme.palette.success.main} 0% 0% no-repeat padding-box`
              : "#C42727 0% 0% no-repeat padding-box",
          color:
            type === AlertTypes.Success || type === AlertTypes.Error
              ? "white"
              : undefined,
        }}
        {...props}
      >
        {children}
      </Box>
    );
  },
);
