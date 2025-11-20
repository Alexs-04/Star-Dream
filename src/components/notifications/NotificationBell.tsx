import type {FC} from "react";
import {useNotifications} from "./NotificationContext";
import "../../assets/css/Notifications.css";

interface Props {
    onClick: () => void;
}

export const NotificationBell: FC<Props> = ({ onClick }) => {
    const { notifications } = useNotifications();
    const unreadCount = notifications.filter(n => !n.read).length;

    return (
        <button className="notif-bell" onClick={onClick}>
            <span className="material-icons">notifications</span>

            {unreadCount > 0 && (
                <span className="notif-badge">{unreadCount}</span>
            )}
        </button>
    );
};
