//src/components/dashboard/DashboarCard.tsx
import React from "react";
import "../../assets/css/Dashboard.css";

interface Props {
    title: string;
    value: string | number;
    icon: React.ReactNode;
}

const DashboardCard: React.FC<Props> = ({title, value, icon}) => {
    return (
        <div className="dash-card">
            <div className="dash-icon">{icon}</div>

            <div className="dash-content">
                <span className="dash-title">{title}</span>
                <span className="dash-value">{value}</span>
            </div>
        </div>
    );
};

export default DashboardCard;
