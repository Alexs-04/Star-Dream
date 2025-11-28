// src/types/product.ts - CORREGIDO
import type {Supplier} from "./supplier.ts";

export interface Product {
    id: number;
    name: string;
    description: string;
    price: number;
    barcode: string;
    category: Category;
    urlImg?: string;
    suppliers: ProductSupplier[];
}

export interface ProductSupplier {
    id: ProductSupplierId;
    product: Product;
    supplier: Supplier;
    price: number;
}

export interface ProductSupplierId {
    productId: number;
    supplierId: number;
}

// DTO para crear/editar productos
export interface ProductDTO {
    name: string;
    description: string;
    price: number;
    barcode: string;
    category: Category;
    urlImg?: string;
}

// Request para crear producto (según tu backend)
export interface ProductRequest {
    productDTO: ProductDTO;
    supplierName: string;
    price: number;
}

// @ts-ignore
export enum Category {
    OTHER = "OTHER",
    SODA = "SODA",
    BEER = "BEER",
    COOKIES = "COOKIES",
    CRISPY_POTATOES = "CRISPY_POTATOES",
    CHOCOLATE = "CHOCOLATE",
    CANDY = "CANDY",
    ALCOHOL = "ALCOHOL",
    WATER = "WATER",
    ENERGY_DRINK = "ENERGY_DRINK",
    SUGAR_DRINK = "SUGAR_DRINK",
    HYGIENE = "HYGIENE",
    MEDICAL = "MEDICAL",
    DAIRY = "DAIRY",
    CANNED = "CANNED"
}

export const CategoryLabels: Record<Category, string> = {
    [Category.OTHER]: "Otros",
    [Category.SODA]: "Refresco",
    [Category.BEER]: "Cerveza",
    [Category.COOKIES]: "Galletas",
    [Category.CRISPY_POTATOES]: "Papas crujientes",
    [Category.CHOCOLATE]: "Chocolate",
    [Category.CANDY]: "Dulces",
    [Category.ALCOHOL]: "Alcohol",
    [Category.WATER]: "Agua",
    [Category.ENERGY_DRINK]: "Bebida energética",
    [Category.SUGAR_DRINK]: "Bebida azucarada",
    [Category.HYGIENE]: "Higiene",
    [Category.MEDICAL]: "Médica",
    [Category.DAIRY]: "Lácteo",
    [Category.CANNED]: "Enlatado"
};

