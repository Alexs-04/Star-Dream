// src/components/products/ProductForm.tsx - CORREGIDO
import { useState, useEffect } from "react";
import { type Product, type ProductDTO, type ProductRequest, Category, CategoryLabels } from "../../types/product";
import type { Supplier } from "../../types/supplier";
import { X } from "lucide-react";

interface Props {
    product?: Product | null;
    suppliers: Supplier[];
    onSubmit: (productRequest: ProductRequest) => void;
    onCancel: () => void;
}

const ProductForm = ({ product, suppliers, onSubmit, onCancel }: Props) => {
    const [formData, setFormData] = useState({
        name: "",
        description: "",
        price: 0,
        barcode: "",
        category: Category.OTHER,
        supplierName: "", // Proveedor seleccionado
        supplierPrice: 0 // Precio del proveedor
    });

    useEffect(() => {
        if (product) {
            // Para edición, tomamos el primer proveedor (puedes mejorar esto para múltiples)
            const primarySupplier = product.suppliers?.[0];
            setFormData({
                name: product.name,
                description: product.description,
                price: product.price,
                barcode: product.barcode,
                category: product.category,
                supplierName: primarySupplier?.supplier?.name || "",
                supplierPrice: primarySupplier?.price || product.price
            });
        }
    }, [product]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        // Validar que se haya seleccionado un proveedor
        if (!formData.supplierName) {
            alert("Debe seleccionar un proveedor");
            return;
        }

        // Crear el ProductDTO
        const productDTO: ProductDTO = {
            name: formData.name,
            description: formData.description,
            price: formData.price,
            barcode: formData.barcode,
            category: formData.category
        };

        // Crear el ProductRequest que espera el backend
        const productRequest: ProductRequest = {
            productDTO: productDTO,
            supplierName: formData.supplierName,
            price: formData.supplierPrice
        };

        onSubmit(productRequest);
    };

    return (
        <div className="modal-overlay">
            <div className="modal">
                <div className="modal-header">
                    <h2>{product ? "Editar Producto" : "Nuevo Producto"}</h2>
                    <button onClick={onCancel} className="btn-icon">
                        <X size={20} />
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="product-form">
                    <div className="form-row">
                        <div className="form-group">
                            <label>Nombre *</label>
                            <input
                                type="text"
                                value={formData.name}
                                onChange={e => setFormData(prev => ({ ...prev, name: e.target.value }))}
                                required
                            />
                        </div>

                        <div className="form-group">
                            <label>Código de Barras *</label>
                            <input
                                type="text"
                                value={formData.barcode}
                                onChange={e => setFormData(prev => ({ ...prev, barcode: e.target.value }))}
                                required
                                disabled={!!product}
                            />
                        </div>
                    </div>

                    <div className="form-group">
                        <label>Descripción *</label>
                        <textarea
                            value={formData.description}
                            onChange={e => setFormData(prev => ({ ...prev, description: e.target.value }))}
                            required
                            rows={3}
                        />
                    </div>

                    <div className="form-row">
                        <div className="form-group">
                            <label>Precio de Venta *</label>
                            <input
                                type="number"
                                step="0.01"
                                min="0"
                                value={formData.price}
                                onChange={e => setFormData(prev => ({ ...prev, price: parseFloat(e.target.value) || 0 }))}
                                required
                            />
                        </div>

                        <div className="form-group">
                            <label>Categoría *</label>
                            <select
                                value={formData.category}
                                onChange={e => setFormData(prev => ({ ...prev, category: e.target.value as Category }))}
                                required
                            >
                                {Object.entries(CategoryLabels).map(([value, label]) => (
                                    <option key={value} value={value}>
                                        {label}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>

                    {/* Selección de Proveedor */}
                    <div className="form-row">
                        <div className="form-group">
                            <label>Proveedor *</label>
                            <select
                                value={formData.supplierName}
                                onChange={e => setFormData(prev => ({ ...prev, supplierName: e.target.value }))}
                                required
                            >
                                <option value="">Seleccionar proveedor</option>
                                {suppliers.map(supplier => (
                                    <option key={supplier.supplierId} value={supplier.name}>
                                        {supplier.name}
                                    </option>
                                ))}
                            </select>
                            {suppliers.length === 0 && (
                                <p className="form-hint">
                                    No hay proveedores disponibles.
                                    <a href="/suppliers" style={{marginLeft: '5px', color: 'var(--accent-500)'}}>
                                        Crear proveedor primero
                                    </a>
                                </p>
                            )}
                        </div>

                        <div className="form-group">
                            <label>Precio del Proveedor *</label>
                            <input
                                type="number"
                                step="0.01"
                                min="0"
                                value={formData.supplierPrice}
                                onChange={e => setFormData(prev => ({
                                    ...prev,
                                    supplierPrice: parseFloat(e.target.value) || 0
                                }))}
                                required
                            />
                        </div>
                    </div>

                    <div className="form-actions">
                        <button type="button" onClick={onCancel} className="btn-secondary">
                            Cancelar
                        </button>
                        <button
                            type="submit"
                            className="btn-primary"
                            disabled={suppliers.length === 0}
                        >
                            {product ? "Actualizar" : "Crear"} Producto
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default ProductForm;