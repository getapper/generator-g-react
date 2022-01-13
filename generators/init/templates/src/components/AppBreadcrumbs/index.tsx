import React, { memo } from "react";
import {
  Breadcrumbs,
  BreadcrumbsProps,
  Link,
  Typography,
} from "@material-ui/core";
import { useAppBreadcrumbs } from "./index.hooks";

export type AppBreadcrumbsItem = {
  label: string;
  url: string;
};

type AppBreadcrumbsProps = {
  items: ReadonlyArray<AppBreadcrumbsItem>;
} & BreadcrumbsProps;

export const AppBreadcrumbs = memo(
  ({ items, ...props }: AppBreadcrumbsProps) => {
    const { styles, classes, atomicStyles } = useAppBreadcrumbs();

    return (
      <Breadcrumbs {...props}>
        {items.map((item, index) => {
          if (index < items.length - 1) {
            return (
              <Link key={item.label} href={item.url}>
                {item.label}
              </Link>
            );
          }
          return null;
        })}
        {Boolean(items.length) && (
          <Typography color="textPrimary">
            {items[items.length - 1].label}
          </Typography>
        )}
      </Breadcrumbs>
    );
  },
);
