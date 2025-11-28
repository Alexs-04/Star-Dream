// src/pages/ProductsPage.tsx - CORREGIDO
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import type { Product, ProductRequest } from "../types/product";
import { getProducts, createProduct, updateProduct, deleteProduct } from "../api/productApi";
import { getSuppliers } from "../api/supplierApi";
import type { Supplier } from "../types/supplier";
import ProductTable from "../components/products/ProductTable";
import ProductForm from "../components/products/ProductForm";
import ConfirmDialog from "../components/common/ConfirmDialog";
import "../assets/css/Products.css";

const ProductsPage = () => {
    const [products, setProducts] = useState<Product[]>([]);
    const [suppliers, setSuppliers] = useState<Supplier[]>([]);
    const [loading, setLoading] = useState(true);
    const [showForm, setShowForm] = useState(false);
    const [editingProduct, setEditingProduct] = useState<Product | null>(null);
    const [deleteConfirm, setDeleteConfirm] = useState<Product | null>(null);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        loadData();
    }, []);

    const getErrorMessage = (err: unknown) => {
        if (!err) return "Unknown error";
        if (typeof err === "string") return err;
        if (err instanceof Error) return err.message;
        // axios error shape
        try {
            const maybe = err as { response?: { data?: { message?: string } } };
            return maybe.response?.data?.message ?? JSON.stringify(maybe);
        } catch {
            return String(err);
        }
    };

    const loadData = async () => {
        try {
            setLoading(true);
            const [productsData, suppliersData] = await Promise.all([
                getProducts(),
                getSuppliers()
            ]);
            setProducts(productsData);
            setSuppliers(suppliersData);
        } catch (err: unknown) {
            const msg = getErrorMessage(err);
            setError("Error al cargar los datos: " + msg);
            console.error("Error loading data:", err);
        } finally {
            setLoading(false);
        }
    };

    const handleCreate = () => {
        if (suppliers.length === 0) {
            setError("Debe crear proveedores primero antes de agregar productos");
            return;
        }
        setEditingProduct(null);
        setShowForm(true);
    };

    const handleEdit = (product: Product) => {
        setEditingProduct(product);
        setShowForm(true);
    };

    const handleDelete = (product: Product) => {
        setDeleteConfirm(product);
    };

    const handleSubmit = async (productRequest: ProductRequest) => {
        try {
            if (editingProduct) {
                // Para edición, necesitas usar el endpoint correcto
                await updateProduct(editingProduct.barcode, productRequest);
            } else {
                await createProduct(productRequest);
            }
            setShowForm(false);
            setEditingProduct(null);
            await loadData();
        } catch (err: unknown) {
            const msg = getErrorMessage(err);
            setError(msg || "Error al guardar el producto");
            console.error("Error saving product:", err);
        }
    };

    const handleConfirmDelete = async () => {
        if (deleteConfirm) {
            try {
                const role = localStorage.getItem("role") || "USER";
                await deleteProduct(deleteConfirm.barcode, role);
                setDeleteConfirm(null);
                await loadData();
            } catch (err: unknown) {
                setError(getErrorMessage(err) || "Error al eliminar el producto");
            }
        }
    };

    if (loading) {
        return <div className="loading">Cargando productos...</div>;
    }

    return (
        <div className="products-page">
            <div className="page-header">
                <div>
                    <h1>Gestión de Productos</h1>
                    <p className="page-subtitle">
                        {products.length} productos registrados • {suppliers.length} proveedores disponibles
                    </p>
                </div>
                <button
                    className="btn-primary"
                    onClick={handleCreate}
                    disabled={suppliers.length === 0}
                >
                    + Nuevo Producto
                </button>
            </div>

            {suppliers.length === 0 && (
                <div className="warning-message">
                    <strong>⚠️ Atención:</strong> No hay proveedores registrados.
                    <Link to="/suppliers" style={{marginLeft: '5px', color: 'var(--accent-500)'}}>
                        Crear proveedor primero
                    </Link>
                </div>
            )}

            {error && (
                <div className="error-message">
                    <span>{error}</span>
                    <button onClick={() => setError(null)}>×</button>
                </div>
            )}

            <ProductTable
                products={products}
                onEdit={handleEdit}
                onDelete={handleDelete}
            />

            {showForm && (
                <ProductForm
                    product={editingProduct}
                    suppliers={suppliers}
                    onSubmit={handleSubmit}
                    onCancel={() => {
                        setShowForm(false);
                        setEditingProduct(null);
                    }}
                />
            )}

            {deleteConfirm && (
                <ConfirmDialog
                    isOpen={true}
                    title="Eliminar Producto"
                    message={`¿Estás seguro de que quieres eliminar el producto "${deleteConfirm.name}"?`}
                    onConfirm={handleConfirmDelete}
                    onCancel={() => setDeleteConfirm(null)}
                    confirmText="Eliminar"
                    cancelText="Cancelar"
                />
            )}
        </div>
    );
};

export default ProductsPage;