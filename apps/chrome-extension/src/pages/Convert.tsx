import type { Component } from "solid-js";
import { createSignal } from "solid-js";
import { Box, Button, TextField, Stack } from "@suid/material";
import LockIcon from "@suid/icons-material/Lock";
import LockOpenIcon from "@suid/icons-material/LockOpen";
import { Anonymizer } from "@anonide/anonymizer";

const anonymizer = new Anonymizer();

const Convert: Component = () => {
  const [text, setText] = createSignal("");

  const handleAnonymize = async () => {
    // Placeholder for anonymize functionality
    console.log("Anonymize clicked");
    const v = await anonymizer.anonymize(text());
    setText(v);
  };

  const handleRestore = async () => {
    // Placeholder for restore functionality
    console.log("Restore clicked");
    const v = await anonymizer.restore(text());
    setText(v);
  };

  return (
    <Box
      sx={{
        p: 2,
        display: "flex",
        flexDirection: "column",
        gap: 2,
      }}
    >
      <TextField
        value={text()}
        onChange={(e) => setText(e.target.value)}
        multiline
        fullWidth
        rows={20}
        sx={{
          flex: 1,
          "& .MuiInputBase-root": {
            height: "400px",
          },
          "& .MuiInputBase-input": {
            height: "100% !important",
            resize: "none",
          },
        }}
      />
      <Stack direction="row" spacing={2} justifyContent="center">
        <Button variant="contained" startIcon={<LockIcon />} onClick={handleAnonymize}>
          Anonymize
        </Button>
        <Button variant="outlined" startIcon={<LockOpenIcon />} onClick={handleRestore}>
          Restore
        </Button>
      </Stack>
    </Box>
  );
};

export default Convert;
