import React from "react";
import type { Supplier } from "../../types/supplier";
import SupplierRow from "./SupplierRow";

interface Props {
    suppliers: Supplier[];
    loading?: boolean;
    onDelete: (supplierId: number) => void;
}

const SupplierTable: React.FC<Props> = ({ suppliers, loading = false, onDelete }) => {
    if (loading) return <div>Cargando proveedores...</div>;
    if (!suppliers || suppliers.length === 0) return <div>No hay proveedores registrados.</div>;

    return (
        <table className="table suppliers-table">
            <thead>
            <tr>
                <th>Nombre</th>
                <th>Dirección</th>
                <th>Teléfono</th>
                <th>Email</th>
                <th>Acciones</th>
            </tr>
            </thead>
            <tbody>
            {suppliers.map(s => (
                <SupplierRow key={s.supplierId} supplier={s} onDelete={onDelete} />
            ))}
            </tbody>
        </table>
    );
};

export default SupplierTable;

