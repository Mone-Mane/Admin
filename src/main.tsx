import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { RouterProvider } from "react-router-dom";
import { theme } from "./theme/theme";
import { CssBaseline, ThemeProvider } from "@mui/material";
import BreakpointsProvider from "./providers/BreakpointsProvider";
import router from "./routes/router";

const rootElement = document.getElementById("root");
if (rootElement) {
  ReactDOM.createRoot(rootElement).render(
    <React.StrictMode>
      <ThemeProvider theme={theme}>
        <BreakpointsProvider>
          <CssBaseline />
          <RouterProvider router={router} />
        </BreakpointsProvider>
      </ThemeProvider>
    </React.StrictMode>
  );
} else {
  console.error(
    "Failed to find the root element. Ensure there is an element with id 'root' in your index.html."
  );
}
