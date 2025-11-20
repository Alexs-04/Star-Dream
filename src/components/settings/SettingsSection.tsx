import type {FC, ReactNode} from "react";

interface Props {
    title: string;
    children: ReactNode;
}

export const SettingsSection: FC<Props> = ({title, children}) => {
    return (
        <section className="settings-section">
            <h2>{title}</h2>
            <div className="settings-content">{children}</div>
        </section>
    );
};
