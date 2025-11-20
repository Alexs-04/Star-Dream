// src/main.tsx
import ReactDOM from "react-dom/client";
import "./index.css";


import {ThemeProvider} from "./context/ThemeContext";
import AppRouter from "./routes/AppRouter.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
    <ThemeProvider>
        <AppRouter/>
    </ThemeProvider>
);
