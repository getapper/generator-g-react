import React, { memo, ReactNode } from "react";
import cn from "classnames";
import { useAppAlertBox } from "./index.hooks";

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
    const { styles } = useAppAlertBox();

    return (
      <div
        className={cn(styles.alertBox, containerClassName, {
          [styles.error]: type === AlertTypes.Error,
          [styles.success]: type === AlertTypes.Success,
          [styles.info]: type === AlertTypes.Info,
        })}
        {...props}
      >
        {children}
      </div>
    );
  },
);
