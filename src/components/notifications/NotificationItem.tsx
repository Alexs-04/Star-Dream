import {type FC } from "react";
import {type Notification, useNotifications} from "./NotificationContext";

interface Props {
    n: Notification;
}

export const NotificationItem: FC<Props> = ({ n }) => {
    const { markAsRead } = useNotifications();

    return (
        <div
            className={`notif-item ${n.read ? "read" : ""}`}
            onClick={() => markAsRead(n.id)}
        >
            <div className={`notif-icon ${n.type}`}></div>

            <div className="notif-content">
                <strong>{n.title}</strong>
                {n.description && <p>{n.description}</p>}
                <span className="notif-time">
                    {n.createdAt.toLocaleTimeString()}
                </span>
            </div>
        </div>
    );
};
