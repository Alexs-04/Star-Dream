import "../../assets/css/Layout.css";
import {Link} from "react-router-dom";
import {Home, Package, Users, BarChart3, LogOut, Bolt, BellPlus, ShoppingBag} from "lucide-react";

const Sidebar = () => {
    return (
        <aside className="sidebar">
            <h2 className="sidebar-title">Novalia</h2>

            <nav className="sidebar-nav">
                <Link to="/" className="sidebar-link">
                    <Home size={18}/> Dashboard
                </Link>
                <Link to="/sale" className="sidebar-link">
                    <ShoppingBag size={18}/> Punto de Venta
                </Link>
                <Link to="/products" className="sidebar-link">
                    <Package size={18}/> Productos
                </Link>
                <Link to="/suppliers" className="sidebar-link">
                    <Users size={18}/> Proveedores
                </Link>
                <Link to="/reports" className="sidebar-link">
                    <BarChart3 size={18}/> Reportes
                </Link>
                <Link to="/notifications" className="sidebar-link">
                    <BellPlus size={18}/> Notificaciones
                </Link>
                <Link to="/settings" className="sidebar-link">
                    <Bolt size={18}/> Configuración
                </Link>
            </nav>

            <div className="sidebar-footer">
                <a href="#" className="sidebar-link logout">
                    <LogOut size={18}/>
                    Cerrar sesión
                </a>
            </div>
        </aside>
    );
};

export default Sidebar;
