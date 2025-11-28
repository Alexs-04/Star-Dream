// src/types/supplier.ts - CORREGIDO
import type {ProductSupplier} from "./product.ts";

export interface Supplier {
    supplierId: number;
    name: string;
    address: string;
    phone: string;
    email: string;
    products: ProductSupplier[];
}

export interface SupplierDTO {
    name: string;
    address: string;
    phone: string;
    email: string;
}