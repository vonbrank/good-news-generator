import { CssBaseline, ThemeProvider } from "@mui/material";
import { lightTheme } from "./theme/theme";
import Home from "./pages/Home/Home";

function App() {
  return (
    <ThemeProvider theme={lightTheme}>
      <CssBaseline />
      <Home />
    </ThemeProvider>
  );
}

export default App;
