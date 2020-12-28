import React, { memo, ReactNode } from "react";
import cn from "classnames";
import useAppAlertBox from "./index.hooks";

export enum AlertTypes {
  success,
  info,
  error,
}

interface AlertBoxProps {
  containerClassName?: any;
  children?: ReactNode;
  type: AlertTypes;
}

const AppAlertBox = ({
  containerClassName,
  children,
  type,
  ...props
}: AlertBoxProps) => {
  const { styles } = useAppAlertBox();

  return (
    <div
      className={cn(styles.alertBox, containerClassName, {
        [styles.error]: type === AlertTypes.error,
        [styles.success]: type === AlertTypes.success,
        [styles.info]: type === AlertTypes.info,
      })}
      {...props}
    >
      {children}
    </div>
  );
};

export default memo(AppAlertBox);
