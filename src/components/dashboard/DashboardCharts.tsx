// src/components/dashboard/DashboardCharts.tsx
import {
    LineChart, Line,
    BarChart, Bar,
    PieChart, Pie, Cell,
    XAxis, YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    Legend
} from "recharts";

interface Props {
    monthlySales: { name: string; ventas: number }[];
    purchasesBySupplier: { name: string; total: number }[];
    systemDistribution: { name: string; value: number }[];
}

const PIE_COLORS = ["#6366f1", "#818cf8", "#a5b4fc"];

export const DashboardCharts = ({
                                    monthlySales,
                                    purchasesBySupplier,
                                    systemDistribution,
                                }: Props) => {
    return (
        <div className="charts-container">

            {/* Línea */}
            <div className="chart-card">
                <h3>Ventas Mensuales</h3>
                <ResponsiveContainer width="100%" height={260}>
                    <LineChart data={monthlySales}>
                        <CartesianGrid strokeDasharray="3 3"/>
                        <XAxis dataKey="name"/>
                        <YAxis/>
                        <Tooltip/>
                        <Line
                            type="monotone"
                            dataKey="ventas"
                            stroke="#6366f1"
                            strokeWidth={3}
                        />
                    </LineChart>
                </ResponsiveContainer>
            </div>

            {/* Barras */}
            <div className="chart-card">
                <h3>Compras por Proveedor</h3>
                <ResponsiveContainer width="100%" height={260}>
                    <BarChart data={purchasesBySupplier}>
                        <CartesianGrid strokeDasharray="3 3"/>
                        <XAxis dataKey="name"/>
                        <YAxis/>
                        <Tooltip/>
                        <Bar dataKey="total" fill="#8b5cf6" radius={[8, 8, 0, 0]}/>
                    </BarChart>
                </ResponsiveContainer>
            </div>

            {/* Pie */}
            <div className="chart-card">
                <h3>Distribución del Sistema</h3>
                <ResponsiveContainer width="100%" height={260}>
                    <PieChart>
                        <Pie
                            data={systemDistribution}
                            dataKey="value"
                            nameKey="name"
                            outerRadius={80}
                            paddingAngle={4}
                        >
                            {systemDistribution.map((_, i) => (
                                <Cell key={i} fill={PIE_COLORS[i]}/>
                            ))}
                        </Pie>
                        <Tooltip/>
                        <Legend/>
                    </PieChart>
                </ResponsiveContainer>
            </div>

        </div>
    );
};
