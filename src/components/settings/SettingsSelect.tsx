import type {FC} from "react";

interface Props {
    label: string;
    value: string;
    options: string[];
    onChange: (v: string) => void;
}

export const SettingsSelect: FC<Props> = ({label, value, options, onChange}) => {
    return (
        <div className="settings-select">
            <span>{label}</span>
            <select value={value} onChange={(e) => onChange(e.target.value)}>
                {options.map((o) => (
                    <option key={o} value={o}>
                        {o}
                    </option>
                ))}
            </select>
        </div>
    );
};
