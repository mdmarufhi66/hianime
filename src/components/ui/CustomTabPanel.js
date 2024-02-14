"use client";

import * as React from "react";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";

function CustomTabPanel(props) {
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

CustomTabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

// export default function BasicTabs() {
//   const [value, setValue] = React.useState(0);

//   const handleChange = (event, newValue) => {
//     setValue(newValue);
//   };

//   return (
//     <Box sx={{ width: "100%" }}>
//       <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
//         <Tabs
//           value={value}
//           onChange={handleChange}
//           aria-label="basic tabs example"
//           sx={{
//             "& .MuiTabs-flexContainer": {
//               justifyContent: "center",
//             },
//           }}
//         >
//           <Tab sx={{ color: "white" }} label="Popular" {...a11yProps(0)} />
//           <Tab sx={{ color: "white" }} label="Top Rated" {...a11yProps(1)} />
//           <Tab sx={{ color: "white" }} label="Item Three" {...a11yProps(2)} />
//         </Tabs>
//       </Box>
//       <CustomTabPanel
//         className="flex justify-center font-medium"
//         value={value}
//         index={0}
//       >
//         Popular
//       </CustomTabPanel>
//       <CustomTabPanel
//         className="flex justify-center font-serif"
//         value={value}
//         index={1}
//       >
//         Item Two
//       </CustomTabPanel>
//       <CustomTabPanel
//         className="flex justify-center font-serif"
//         value={value}
//         index={2}
//       >
//         Item Three
//       </CustomTabPanel>
//     </Box>
//   );
// }

export default CustomTabPanel;
