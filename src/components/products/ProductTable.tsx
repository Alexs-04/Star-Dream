// src/components/products/ProductTable.tsx - MEJORADO
import { type Product, CategoryLabels } from "../../types/product";
import { Edit, Trash2, Package, User } from "lucide-react";

interface Props {
    products: Product[];
    onEdit: (product: Product) => void;
    onDelete: (product: Product) => void;
}

const ProductTable = ({ products, onEdit, onDelete }: Props) => {
    if (products.length === 0) {
        return (
            <div className="empty-state">
                <Package size={48} />
                <h3>No hay productos</h3>
                <p>Comienza agregando tu primer producto</p>
            </div>
        );
    }

    return (
        <div className="table-container">
            <table className="data-table">
                <thead>
                <tr>
                    <th>Código</th>
                    <th>Nombre</th>
                    <th>Categoría</th>
                    <th>Precio Venta</th>
                    <th>Proveedores</th>
                    <th>Acciones</th>
                </tr>
                </thead>
                <tbody>
                {products.map((product) => (
                    <tr key={product.id}>
                        <td className="barcode">{product.barcode}</td>
                        <td className="name">
                            <div>
                                <strong>{product.name}</strong>
                                <div className="description">{product.description}</div>
                            </div>
                        </td>
                        <td>
                            <span className="category-badge">
                                {CategoryLabels[product.category]}
                            </span>
                        </td>
                        <td className="price">${product.price.toFixed(2)}</td>
                        <td>
                            <div className="suppliers-list">
                                {product.suppliers?.map((supplierRelation, index) => (
                                    <div key={index} className="supplier-item">
                                        <User size={12} />
                                        <span>{supplierRelation.supplier.name}</span>
                                        <span className="supplier-price">
                                            ${supplierRelation.price.toFixed(2)}
                                        </span>
                                    </div>
                                ))}
                                {(!product.suppliers || product.suppliers.length === 0) && (
                                    <span className="no-suppliers">Sin proveedores</span>
                                )}
                            </div>
                        </td>
                        <td className="actions">
                            <button
                                onClick={() => onEdit(product)}
                                className="btn-icon edit"
                                title="Editar"
                            >
                                <Edit size={16} />
                            </button>
                            <button
                                onClick={() => onDelete(product)}
                                className="btn-icon delete"
                                title="Eliminar"
                            >
                                <Trash2 size={16} />
                            </button>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
};

export default ProductTable;