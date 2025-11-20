// src/pages/DashboardPage.tsx
import { useEffect, useState } from "react";
import DashboardGrid from "../components/dashboard/DashboardGrid";

interface DashboardData {
    totalProducts: number;
    salesToday: number;
    totalSuppliers: number;
    totalOrders: number;

    monthlySales: { name: string; ventas: number }[];
    purchasesBySupplier: { name: string; total: number }[];
    systemDistribution: { name: string; value: number }[];
}

const DashboardPage = () => {
    const [data, setData] = useState<DashboardData | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchDashboard = async () => {
            try {
                const token = localStorage.getItem("token");

                const res = await fetch("http://localhost:8080/api/dashboard/data", {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });

                const json = await res.json();
                setData(json);
            } catch (err) {
                console.error("Error cargando dashboard:", err);
            } finally {
                setLoading(false);
            }
        };

        fetchDashboard();
    }, []);

    if (loading) return <p>Cargando dashboard...</p>;
    if (!data) return <p>Error al cargar datos.</p>;

    return <DashboardGrid data={data} />;
};

export default DashboardPage;
