// src/pages/DashboardPage.tsx
import { useEffect, useState } from "react";
import DashboardGrid from "../components/dashboard/DashboardGrid";
import api from "../api/axiosClient";

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
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchDashboard = async () => {
            try {
                console.log("=== CARGANDO DASHBOARD ===");

                const response = await api.get("/api/dashboard/data");

                console.log("Datos del dashboard recibidos:", response.data);
                setData(response.data);
                setError(null);

            } catch (err: any) {
                console.error("Error cargando dashboard:", err);

                if (err.response?.status === 401) {
                    setError("Sesión expirada. Redirigiendo al login...");
                    // El interceptor ya debería redirigir automáticamente
                } else if (err.response?.status === 403) {
                    setError("No tienes permisos para ver el dashboard");
                } else {
                    setError("Error al cargar los datos del dashboard");
                }
            } finally {
                setLoading(false);
            }
        };

        fetchDashboard();
    }, []);

    if (loading) {
        return (
            <div className="loading-container">
                <p>Cargando dashboard...</p>
            </div>
        );
    }

    if (error) {
        return (
            <div className="error-container">
                <p>{error}</p>
            </div>
        );
    }

    if (!data) {
        return (
            <div className="error-container">
                <p>No se pudieron cargar los datos del dashboard</p>
            </div>
        );
    }

    return <DashboardGrid data={data} />;
};

export default DashboardPage;