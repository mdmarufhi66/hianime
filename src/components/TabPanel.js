"use client";

import React, { useState, useEffect } from "react";
import CustomTabPanel from "./ui/CustomTabPanel";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { fetchAnime } from "@/app/action";

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}
const TabPanel = ({ order, setOrder }) => {
  const [value, setValue] = React.useState(0);
  const [tabData, setTabData] = useState([]);

  const handleChange = (event, newValue) => {
    setValue(newValue);

    if (newValue === 0) {
      setOrder("popularity");
    } else if (newValue === 1) {
      setOrder("rating");
    } else if (newValue === 2) {
      setOrder("released");
    } else {
      setOrder("defaultOrder");
    }
  };

  useEffect(() => {
    async function fetchData() {
      // Fetch data using the defined order
      const data = await fetchAnime(value + 1, order);
      console.log(data);
      setTabData(data);
    }
    fetchData();
  }, [order, setOrder, value]);

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
          <Tab sx={{ color: "white" }} label="Top Rated" {...a11yProps(1)} />
          <Tab sx={{ color: "white" }} label="Item Three" {...a11yProps(2)} />
        </Tabs>
      </Box>
      <CustomTabPanel className=" font-medium" value={value} index={0}>
        <div className="flex justify-center font-medium">Popular</div>
        <div className="grid grid-cols-4 ">{tabData}</div>
      </CustomTabPanel>
      <CustomTabPanel
        className="flex justify-center font-serif"
        value={value}
        index={1}
      >
        {tabData}
      </CustomTabPanel>
      <CustomTabPanel
        className="flex justify-center font-serif"
        value={value}
        index={2}
      >
        Item Three
      </CustomTabPanel>
    </Box>
  );
};

export default TabPanel;
