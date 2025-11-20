import "../../assets/css/Layout.css";
const role = localStorage.getItem("role");

const TopBar = () => {
    return (
        <header className="topbar">
            <div className="topbar-left">
                <h3>Panel de Control</h3>
            </div>

            <div className="topbar-right">
                <span className="user-badge">{role}</span>
            </div>
        </header>
    );
};

export default TopBar;
