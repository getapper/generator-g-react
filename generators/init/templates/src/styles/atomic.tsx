import { createStyles } from "@material-ui/core/styles";
import { makeStyles } from "@material-ui/styles";

const styles: any = {};

const props: { [key: string]: string } = {
  M: "margin",
  P: "padding",
  B: "border",
};
const positions: { [key: string]: string } = {
  T: "top",
  R: "right",
  B: "bottom",
  L: "left",
};

Object.keys(props).forEach((prop) => {
  for (let i = 1; i <= 100; i++) {
    styles[`${prop}${i}`] = {
      [props[prop]]: i,
    };
  }
});

Object.keys(props).forEach((prop) => {
  Object.keys(positions).forEach((position) => {
    for (let i = 1; i <= 100; i++) {
      styles[`${prop}${position}${i}`] = {
        [`${props[prop]}-${positions[position]}`]: i,
      };
    }
  });
});

const singleProps: { [key: string]: string } = {
  W: "width",
  FS: "font-size",
};

Object.keys(singleProps).forEach((prop) => {
  for (let i = 1; i <= 100; i++) {
    styles[`${prop}${i}`] = {
      [singleProps[prop]]: i,
    };
  }
});

const percentageProps: { [key: string]: string } = {
  W: "width",
};

Object.keys(percentageProps).forEach((prop) => {
  for (let i = 1; i <= 100; i++) {
    styles[`${prop}${i}p`] = {
      [percentageProps[prop]]: `${i}%`,
    };
  }
});

styles.DF = {
  display: "flex",
};
styles.FDC = {
  flexDirection: "column",
};

for (let i = 1; i <= 100; i++) {
  styles[`F${i}`] = {
    flex: `${i}`,
  };
}

export default makeStyles(() => createStyles(styles));
