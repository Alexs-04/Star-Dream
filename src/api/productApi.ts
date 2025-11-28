// src/api/productApi.ts - CORREGIDO
import api from "./axiosClient";
import type { Product, ProductRequest } from "../types/product";

export async function getProducts(): Promise<Product[]> {
    const response = await api.get("/api/products/all");
    return response.data;
}

export async function createProduct(productRequest: ProductRequest): Promise<any> {
    const response = await api.post("/api/products/add", productRequest);
    return response.data;
}

export async function updateProduct(barcode: string, changes: any): Promise<any> {
    const response = await api.post(`/api/products/edit?barcode=${barcode}`, changes);
    return response.data;
}

export async function deleteProduct(barcode: string, role: string): Promise<any> {
    const response = await api.post(`/api/products/delete?role=${role}`, { barcode });
    return response.data;
}

