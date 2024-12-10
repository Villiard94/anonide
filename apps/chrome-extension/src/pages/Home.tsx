import { Component } from "solid-js";
import { Container, Typography, Box } from "@suid/material";

const Home: Component = () => {
  return (
    <Container maxWidth="md" sx={{ p: 4 }}>
      <Box sx={{ textAlign: "center" }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Welcome to Anonide
        </Typography>
        <Typography variant="body1" paragraph>
          Manage your anonymization dictionary to protect sensitive information.
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Click the + icon to add new dictionary items, or view your existing dictionary.
        </Typography>
      </Box>
    </Container>
  );
};

export default Home;
