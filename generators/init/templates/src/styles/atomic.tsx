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
      [props[prop]]: `${i}px !important`,
    };
  }
});

Object.keys(props).forEach((prop) => {
  Object.keys(positions).forEach((position) => {
    for (let i = 1; i <= 100; i++) {
      styles[`${prop}${position}${i}`] = {
        [`${props[prop]}-${positions[position]}`]: `${i}px !important`,
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
      [singleProps[prop]]: `${i}px !important`,
    };
  }
});

const percentageProps: { [key: string]: string } = {
  W: "width",
};

Object.keys(percentageProps).forEach((prop) => {
  for (let i = 1; i <= 100; i++) {
    styles[`${prop}${i}p`] = {
      [percentageProps[prop]]: `${i}% !important`,
    };
  }
});
styles.DB = {
  display: "block",
};
styles.DN = {
  display: "none",
};
styles.DF = {
  display: "flex",
};
for (let i = 1; i <= 100; i++) {
  styles[`F${i}`] = {
    flex: i,
  };
}

styles.FDC = {
  flexDirection: "column",
};
styles.FDR = {
  flexDirection: "row",
};
styles.AIC = {
  alignItems: "center",
};
styles.AIFS = {
  alignItems: "flex-start !important",
};
styles.AIFE = {
  alignItems: "flex-end !important",
};
styles.JCC = {
  justifyContent: "center !important",
};
styles.JCFS = {
  justifyContent: "flex-start !important",
};
styles.JCFE = {
  justifyContent: "flex-end !important",
};
styles.JCSA = {
  justifyContent: "space-around !important",
};
styles.JCSB = {
  justifyContent: "space-between !important",
};

styles.WSNW = {
  whiteSpace: "nowrap",
};
styles.TOE = {
  textOverflow: "ellipsis",
};
styles.OH = {
  overflow: "hidden",
};

styles.CA = {
  color: "#D23715",
};
styles.CG = {
  color: "#878E95",
};

styles.M0A = {
  margin: "0 auto",
};

styles.PR = {
  position: "relative",
};

for (let i = 1; i <= 100; i++) {
  styles[`F${i}`] = {
    flex: `${i} !important`,
  };
}

export default makeStyles(() => createStyles(styles));
