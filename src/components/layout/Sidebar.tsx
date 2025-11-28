// src/components/layout/Sidebar.tsx
import "../../assets/css/Layout.css";
import { Link, NavLink } from "react-router-dom";
import { Home, Package, Users, BarChart3, LogOut, Bolt, BellPlus, ShoppingBag, ShoppingBasket } from "lucide-react";
import { useLogout } from "../../hooks/useLogout";
// Versión mejorada del Sidebar con confirmación
import { useState } from "react";
import ConfirmDialog from "../common/ConfirmDialog";

const Sidebar = () => {
    const { logout } = useLogout();
    const [showConfirm, setShowConfirm] = useState(false);

    const handleLogoutClick = () => {
        setShowConfirm(true);
    };

    const handleConfirmLogout = async () => {
        setShowConfirm(false);
        await logout();
    };

    const handleCancelLogout = () => {
        setShowConfirm(false);
    };

    return (
        <>
            <aside className="sidebar">
                <h2 className="sidebar-title">Novalia</h2>

                <nav className="sidebar-nav">
                    <Link to="/" className="sidebar-link">
                        <Home size={18} /> Dashboard
                    </Link>
                    <Link to="/sale" className="sidebar-link">
                        <ShoppingBag size={18} /> Punto de Venta
                    </Link>
                    <Link to="/" className="sidebar-link">
                        <ShoppingBasket size={18} /> Para entregar
                    </Link>
                    <Link to="/products" className="sidebar-link">
                        <Package size={18} /> Productos
                    </Link>
                    <NavLink to="/suppliers" className={({isActive}) => isActive ? "sidebar-link active" : "sidebar-link"}>
                        <Users size={18} /> Proveedores
                    </NavLink>
                    <Link to="/reports" className="sidebar-link">
                        <BarChart3 size={18} /> Reportes
                    </Link>
                    <Link to="/notifications" className="sidebar-link">
                        <BellPlus size={18} /> Notificaciones
                    </Link>
                    <Link to="/settings" className="sidebar-link">
                        <Bolt size={18} /> Configuración
                    </Link>
                </nav>

                <div className="sidebar-footer">
                    <button
                        onClick={handleLogoutClick}
                        className="sidebar-link logout"
                        style={{
                            background: 'none',
                            border: 'none',
                            width: '100%',
                            textAlign: 'left',
                            cursor: 'pointer',
                            font: 'inherit',
                            color: 'inherit'
                        }}
                    >
                        <LogOut size={18} />
                        Cerrar sesión
                    </button>
                </div>
            </aside>

            <ConfirmDialog
                isOpen={showConfirm}
                title="Cerrar sesión"
                message="¿Estás seguro de que quieres cerrar sesión?"
                onConfirm={handleConfirmLogout}
                onCancel={handleCancelLogout}
                confirmText="Cerrar sesión"
                cancelText="Cancelar"
            />
        </>
    );
};

export default Sidebar;