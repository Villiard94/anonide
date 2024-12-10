import type { Component } from "solid-js";
import { Box, Typography } from "@suid/material";

const Settings: Component = () => {
  return (
    <Box sx={{ p: 2 }}>
      <Typography variant="h5">Settings</Typography>
      <Typography>Settings page content will go here</Typography>
    </Box>
  );
};

export default Settings;
