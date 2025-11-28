import React, {useEffect, useState, useCallback} from "react";
import { getSuppliers, createSupplier, deleteSupplierById } from "../api/supplierApi";
import type { Supplier, SupplierDTO } from "../types/supplier";
import SupplierTable from "../components/suppliers/SupplierTable";
import SupplierForm from "../components/suppliers/SupplierForm";
import { useNotifications } from "../components/notifications/NotificationContext";
import ConfirmDialog from "../components/common/ConfirmDialog";
import "../assets/css/Supplier.css";

const SuppliersPage: React.FC = () => {
    const [suppliers, setSuppliers] = useState<Supplier[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [confirmOpen, setConfirmOpen] = useState(false);
    const [toDeleteId, setToDeleteId] = useState<number | null>(null);

    const { addNotification } = useNotifications();

    const fetchSuppliers = useCallback(async () => {
        setLoading(true);
        try {
            const data = await getSuppliers();
            setSuppliers(data);
        } catch (err: unknown) {
            console.error("Error cargando proveedores", err);
            addNotification({ title: "Error cargando proveedores", description: (err as Error)?.message ?? String(err), type: "error" });
        } finally {
            setLoading(false);
        }
    }, [addNotification]);

    useEffect(() => {
        void fetchSuppliers();
    }, [fetchSuppliers]);

    const handleCreate = async (dto: SupplierDTO) => {
        try {
            await createSupplier(dto);
            addNotification({ title: "Proveedor creado", type: "success" });
            void fetchSuppliers();
        } catch (err: unknown) {
            console.error("Error creando proveedor", err);
            addNotification({ title: "Error creando proveedor", description: (err as Error)?.message ?? String(err), type: "error" });
        }
    };

    const requestDelete = (supplierId: number) => {
        setToDeleteId(supplierId);
        setConfirmOpen(true);
    };

    const handleConfirmDelete = async () => {
        if (toDeleteId == null) return;
        setConfirmOpen(false);
        try {
            await deleteSupplierById(toDeleteId);
            addNotification({ title: "Proveedor eliminado", type: "success" });
            void fetchSuppliers();
        } catch (err: unknown) {
            console.error("Error eliminando proveedor", err);
            addNotification({ title: "Error eliminando proveedor", description: (err as Error)?.message ?? String(err), type: "error" });
        } finally {
            setToDeleteId(null);
        }
    };

    const handleCancelDelete = () => {
        setConfirmOpen(false);
        setToDeleteId(null);
    };

    return (
        <div className="page suppliers-page">
            <h1>Proveedores</h1>

            <section className="suppliers-actions">
                <SupplierForm onCreate={handleCreate} />
            </section>

            <section className="suppliers-list">
                <SupplierTable suppliers={suppliers} loading={loading} onDelete={requestDelete} />
            </section>

            <ConfirmDialog
                isOpen={confirmOpen}
                title="Eliminar proveedor"
                message="¿Estás seguro de que quieres eliminar este proveedor?"
                onConfirm={handleConfirmDelete}
                onCancel={handleCancelDelete}
                confirmText="Eliminar"
                cancelText="Cancelar"
            />
        </div>
    );
};

export default SuppliersPage;
