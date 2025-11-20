import type {FC} from "react";
import "../../assets/css/Settings.css";

interface Props {
    label: string;
    value: boolean;
    onChange: (v: boolean) => void;
}

export const SettingsToggle: FC<Props> = ({label, value, onChange}) => {
    return (
        <label className="settings-toggle">
            <span>{label}</span>
            <input
                type="checkbox"
                checked={value}
                onChange={(e) => onChange(e.target.checked)}
            />
            <div className="slider"></div>
        </label>
    );
};
