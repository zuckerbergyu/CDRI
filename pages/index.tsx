import * as React from "react";
import type { NextPage } from "next";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Search from "../components/Search";
import Favorite from "../components/Favorite";
import { Colors } from "../constants/theme";

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}
function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}
function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

const Home: NextPage = () => {
  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <Container maxWidth="lg">
      <Box>
        <Box sx={{ width: "100%", marginBottom: "80px" }}>
          <Tabs value={value} onChange={handleChange} centered>
            <Tab
              sx={{
                fontSize: "20px",
                fontWeight: 500,
                color: Colors.palette.Black,
              }}
              label="도서 검색"
            />
            <Tab
              sx={{
                fontSize: "20px",
                fontWeight: 500,
                color: Colors.palette.Black,
              }}
              label="내가 찜한 책"
            />
          </Tabs>
        </Box>
        <TabPanel value={value} index={0}>
          <Search />
        </TabPanel>
        <TabPanel value={value} index={1}>
          <Favorite />
        </TabPanel>
      </Box>
    </Container>
  );
};
export default Home;
