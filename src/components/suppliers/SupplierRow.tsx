import React from "react";
import type { Supplier } from "../../types/supplier";

interface Props {
    supplier: Supplier;
    onDelete: (supplierId: number) => void;
}

const SupplierRow: React.FC<Props> = ({ supplier, onDelete }) => {
    return (
        <tr>
            <td>{supplier.name}</td>
            <td>{supplier.address}</td>
            <td>{supplier.phone}</td>
            <td>{supplier.email}</td>
            <td>
                <button className="btn-danger small" onClick={() => onDelete(supplier.supplierId)}>Eliminar</button>
            </td>
        </tr>
    );
};

export default SupplierRow;

