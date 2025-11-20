import type {FC} from "react";
import { NotificationItem } from "./NotificationItem";
import {useNotifications} from "./NotificationContext";
import "../../assets/css/Notifications.css";

interface Props {
    open: boolean;
}

export const NotificationPanel: FC<Props> = ({ open }) => {
    const { notifications, clearNotifications } = useNotifications();

    return (
        <div className={`notif-panel ${open ? "open" : ""}`}>
            <div className="notif-header">
                <h3>Notificaciones</h3>
                <button onClick={clearNotifications}>Limpiar</button>
            </div>

            <div className="notif-list">
                {notifications.length === 0 ? (
                    <p className="notif-empty">Sin notificaciones</p>
                ) : (
                    notifications.map(n => <NotificationItem key={n.id} n={n} />)
                )}
            </div>
        </div>
    );
};
