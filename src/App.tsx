import { CssBaseline, ThemeProvider } from "@mui/material";
import { lightTheme } from "./theme/theme";
import Home from "./pages/Home/Home";
import { Toast } from "./components/SnackBar";

function App() {
  return (
    <ThemeProvider theme={lightTheme}>
      <CssBaseline />
      <Home />
      <Toast />
    </ThemeProvider>
  );
}

export default App;
