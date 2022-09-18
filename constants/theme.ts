import { createTheme } from "@mui/material/styles";

export const Colors = {
  palette: {
    Primary: "#4880EE",
    Red: "#E84118",
    Gray: "##DADADA",
    LightGray: "#F2F4F6",
    White: "#FFFFFF",
    Black: "#222222",
  },
  text: {
    Primary: "#353C49",
    Secondary: "#6D7582",
    Subtitle: "#8D94A0",
  },
};

const theme = createTheme({
  palette: {
    primary: {
      main: Colors.palette.Primary,
    },
    secondary: {
      main: Colors.palette.Primary,
    },
    error: {
      main: Colors.palette.Red,
    },
  },
  typography: {
    fontFamily: [
      "-apple-system",
      "BlinkMacSystemFont",
      "Apple SD Gothic Neo",
      "Pretendard",
      "Roboto",
      "Noto Sans KR",
      "Segoe UI",
      "Malgun Gothic",
      "Apple Color Emoji",
      "Segoe UI Emoji",
      "Segoe UI Symbol",
      "sans-serif",
    ].join(","),
  },
});

export default theme;
