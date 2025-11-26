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

const PIE_COLORS = ["#6366f1", "#818cf8", "#a5b4fc", "#c7d2fe", "#e0e7ff"];

export const DashboardCharts = ({
                                    monthlySales = [],
                                    purchasesBySupplier = [],
                                    systemDistribution = []
                                }: Props) => {
    // Datos por defecto si vienen vacíos
    const defaultMonthlySales = monthlySales.length > 0 ? monthlySales : [
        { name: 'Sin datos', ventas: 0 }
    ];

    const defaultPurchases = purchasesBySupplier.length > 0 ? purchasesBySupplier : [
        { name: 'Sin datos', total: 0 }
    ];

    const defaultDistribution = systemDistribution.length > 0 ? systemDistribution : [
        { name: 'Sin datos', value: 100 }
    ];

    // @ts-ignore
    return (
        <div className="charts-container">

            {/* Gráfico de Línea - Ventas Mensuales */}
            <div className="chart-card">
                <h3>Ventas Mensuales</h3>
                <ResponsiveContainer width="100%" height={260}>
                    <LineChart data={defaultMonthlySales}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#f3f4f6" />
                        <XAxis
                            dataKey="name"
                            stroke="#6b7280"
                            fontSize={12}
                        />
                        <YAxis
                            stroke="#6b7280"
                            fontSize={12}
                        />
                        <Tooltip
                            contentStyle={{
                                backgroundColor: 'white',
                                border: '1px solid #e5e7eb',
                                borderRadius: '8px'
                            }}
                        />
                        <Line
                            type="monotone"
                            dataKey="ventas"
                            stroke="#6366f1"
                            strokeWidth={3}
                            dot={{ fill: '#6366f1', strokeWidth: 2, r: 4 }}
                            activeDot={{ r: 6, fill: '#818cf8' }}
                        />
                    </LineChart>
                </ResponsiveContainer>
            </div>

            {/* Gráfico de Barras - Compras por Proveedor */}
            <div className="chart-card">
                <h3>Compras por Proveedor</h3>
                <ResponsiveContainer width="100%" height={260}>
                    <BarChart data={defaultPurchases}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#f3f4f6" />
                        <XAxis
                            dataKey="name"
                            stroke="#6b7280"
                            fontSize={12}
                            angle={-45}
                            textAnchor="end"
                            height={80}
                        />
                        <YAxis
                            stroke="#6b7280"
                            fontSize={12}
                        />
                        <Tooltip
                            contentStyle={{
                                backgroundColor: 'white',
                                border: '1px solid #e5e7eb',
                                borderRadius: '8px'
                            }}
                        />
                        <Bar
                            dataKey="total"
                            fill="#8b5cf6"
                            radius={[4, 4, 0, 0]}
                        />
                    </BarChart>
                </ResponsiveContainer>
            </div>

            {/* Gráfico de Pie - Distribución del Sistema */}

            <div className="chart-card">
                <h3>Distribución del Sistema</h3>
                <ResponsiveContainer width="100%" height={260}>
                    <PieChart>
                        <Pie
                            data={defaultDistribution}
                            dataKey="value"
                            nameKey="name"
                            outerRadius={80}
                            paddingAngle={2}
                            label={({ name, percent }) =>
                                `${name} (${(percent * 100).toFixed(0)}%)`
                            }
                            labelLine={false}
                        >
                            {defaultDistribution.map((_, index) => (
                                <Cell
                                    key={`cell-${index}`}
                                    fill={PIE_COLORS[index % PIE_COLORS.length]}
                                />
                            ))}
                        </Pie>
                        <Tooltip
                            formatter={(value) => [`${value}`, 'Valor']}
                            contentStyle={{
                                backgroundColor: 'white',
                                border: '1px solid #e5e7eb',
                                borderRadius: '8px'
                            }}
                        />
                        <Legend />
                    </PieChart>
                </ResponsiveContainer>
            </div>

        </div>
    );
};