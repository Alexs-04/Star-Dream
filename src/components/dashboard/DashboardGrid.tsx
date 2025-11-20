// src/components/dashboard/DashboardGrid.tsx
import DashboardCard from "./DashboardCard";
import { Package, ShoppingCart, Users, DollarSign } from "lucide-react";
import { DashboardCharts } from "./DashboardCharts";

interface Props {
    data: {
        totalProducts: number;
        salesToday: number;
        totalSuppliers: number;
        totalOrders: number;

        monthlySales: any[];
        purchasesBySupplier: any[];
        systemDistribution: any[];
    };
}

const DashboardGrid = ({ data }: Props) => {
    return (
        <div className="dash-grid">
            <DashboardCard
                title="Productos"
                value={data.totalProducts}
                icon={<Package size={26} />}
            />

            <DashboardCard
                title="Ventas hoy"
                value={`$${data.salesToday}`}
                icon={<DollarSign size={26} />}
            />

            <DashboardCard
                title="Proveedores"
                value={data.totalSuppliers}
                icon={<Users size={26} />}
            />

            <DashboardCard
                title="Órdenes"
                value={data.totalOrders}
                icon={<ShoppingCart size={26} />}
            />

            <DashboardCharts
                monthlySales={data.monthlySales}
                purchasesBySupplier={data.purchasesBySupplier}
                systemDistribution={data.systemDistribution}
            />
        </div>
    );
};

export default DashboardGrid;
