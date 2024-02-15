"use client";

import React from "react";
import CustomTabPanel from "./ui/CustomTabPanel";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}
const TabPanel = ({ setOrder }) => {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);

    if (newValue === 0) {
      setOrder("popularity");
    } else if (newValue === 1) {
      setOrder("ranked");
    } else if (newValue === 2) {
      setOrder("created_at");
    }
  };

  return (
    <Box sx={{ width: "100%" }}>
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="basic tabs example"
          sx={{
            "& .MuiTabs-flexContainer": {
              justifyContent: "center",
            },
          }}
        >
          <Tab sx={{ color: "white" }} label="Popular" {...a11yProps(0)} />
          <Tab sx={{ color: "white" }} label="Ranked" {...a11yProps(1)} />
          <Tab
            sx={{ color: "white" }}
            label="Recently Released"
            {...a11yProps(2)}
          />
        </Tabs>
      </Box>
      <CustomTabPanel className=" font-medium" value={value} index={0} />
      <CustomTabPanel
        className="flex justify-center font-serif"
        value={value}
        index={1}
      />
      <CustomTabPanel
        className="flex justify-center font-serif"
        value={value}
        index={2}
      />
    </Box>
  );
};

export default TabPanel;
