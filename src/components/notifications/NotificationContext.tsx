import { createContext, useContext, useState, type FC, type ReactNode } from "react";

export interface Notification {
    id: string;
    title: string;
    description?: string;
    type: "success" | "warning" | "error" | "info";
    createdAt: Date;
    read: boolean;
}

interface NotificationContextValue {
    notifications: Notification[];
    addNotification: (n: Omit<Notification, "id" | "createdAt" | "read">) => void;
    markAsRead: (id: string) => void;
    clearNotifications: () => void;
}

const NotificationContext = createContext<NotificationContextValue | null>(null);

export const useNotifications = () => {
    const ctx = useContext(NotificationContext);
    if (!ctx) throw new Error("useNotifications must be inside provider");
    return ctx;
};


export const NotificationProvider: FC<{ children: ReactNode }> = ({ children }) => {
    const [notifications, setNotifications] = useState<Notification[]>([]);

    const addNotification = (n: Omit<Notification, "id" | "createdAt" | "read">) => {
        const newNotification: Notification = {
            ...n,
            id: crypto.randomUUID(),
            createdAt: new Date(),
            read: false
        };
        setNotifications(prev => [newNotification, ...prev]);
    };

    const markAsRead = (id: string) => {
        setNotifications(prev =>
            prev.map(n => (n.id === id ? { ...n, read: true } : n))
        );
    };

    const clearNotifications = () => setNotifications([]);

    return (
        <NotificationContext.Provider value={{ notifications, addNotification, markAsRead, clearNotifications }}>
            {children}
        </NotificationContext.Provider>
    );
};
