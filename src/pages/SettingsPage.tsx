import {useState} from "react";
import {SettingsSection} from "../components/settings/SettingsSection";
import {SettingsToggle} from "../components/settings/SettingsToggle";
import {SettingsSelect} from "../components/settings/SettingsSelect";
import "../assets/css/Settings.css";

export const Settings = () => {
    // Estados que luego irán al backend
    const [darkMode, setDarkMode] = useState(false);
    const [notifications, setNotifications] = useState(true);
    const [language, setLanguage] = useState("Español");
    const [currency, setCurrency] = useState("MXN");

    return (
        <div className="settings-page">
            <h1>Configuración</h1>

            {/* Preferencias visuales */}
            <SettingsSection title="Apariencia">
                <SettingsToggle
                    label="Modo oscuro automático"
                    value={darkMode}
                    onChange={setDarkMode}
                />
            </SettingsSection>

            {/* Notificaciones */}
            <SettingsSection title="Notificaciones">
                <SettingsToggle
                    label="Activar notificaciones"
                    value={notifications}
                    onChange={setNotifications}
                />
            </SettingsSection>

            {/* Idioma */}
            <SettingsSection title="Idioma y región">
                <SettingsSelect
                    label="Idioma"
                    value={language}
                    options={["Español", "Inglés"]}
                    onChange={setLanguage}
                />

                <SettingsSelect
                    label="Moneda"
                    value={currency}
                    options={["MXN", "USD", "EUR"]}
                    onChange={setCurrency}
                />
            </SettingsSection>
        </div>
    );
};

export default Settings;
