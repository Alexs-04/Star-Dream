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

                // No manejes 401 aquí, el interceptor lo hace
                if (err.response?.status === 403) {
                    setError("No tienes permisos para ver el dashboard");
                } else if (err.code === 'NETWORK_ERROR' || !err.response) {
                    setError("Error de conexión. Verifica tu internet.");
                } else if (err.response?.status !== 401) {
                    // Solo muestra error si no es 401 (el interceptor maneja 401)
                    setError("Error al cargar los datos del dashboard");
                }
                // Si es 401, el interceptor ya maneja la redirección
            } finally {
                setLoading(false);
            }
        };

        fetchDashboard();
    }, []);
    const StateContainer = ({ children }: { children: React.ReactNode }) => (
        <div style={{ padding: '2rem' }}>
            {/* Ocupa el 100% del ancho del contenedor principal del layout */}
            <div className="state-full-container">
                {children}
            </div>
        </div>
    );


    if (loading) {
        return (
            <StateContainer>
                <div className="loading-container">
                    <p>Cargando dashboard...</p>
                </div>
            </StateContainer>
        );
    }

    if (error && !loading) {
        return (
            <StateContainer>
                <div className="error-container">
                    <p>{error}</p>
                    <button
                        onClick={() => window.location.reload()}
                        className="retry-button"
                    >
                        Reintentar
                    </button>
                </div>
            </StateContainer>
        );
    }

    if (!data && !loading) {
        return (
            <StateContainer>
                <div className="error-container">
                    <p>No se pudieron cargar los datos del dashboard</p>
                    <button
                        onClick={() => window.location.reload()}
                        className="retry-button"
                    >
                        Reintentar
                    </button>
                </div>
            </StateContainer>
        );
    }

    return data ? <DashboardGrid data={data} /> : null;
};

export default DashboardPage;