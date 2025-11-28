// src/main.tsx
import ReactDOM from "react-dom/client";
import "./index.css";


import {ThemeProvider} from "./context/ThemeContext";
import AppRouter from "./routes/AppRouter.tsx";
import { NotificationProvider } from "./components/notifications/NotificationContext";

ReactDOM.createRoot(document.getElementById("root")!).render(
    <ThemeProvider>
        <NotificationProvider>
            <AppRouter/>
        </NotificationProvider>
    </ThemeProvider>
);
