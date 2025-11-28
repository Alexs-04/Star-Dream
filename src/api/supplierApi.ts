// src/api/supplierApi.ts - CORREGIDO
import api from "./axiosClient";
import type { Supplier, SupplierDTO } from "../types/supplier";

export async function getSuppliers(): Promise<Supplier[]> {
    const response = await api.get("/api/suppliers/all");
    return response.data;
}

export async function createSupplier(supplier: SupplierDTO): Promise<unknown> {
    const response = await api.post("/api/suppliers/add", supplier);
    return response.data;
}

export async function deleteSupplier(supplierDTO: SupplierDTO): Promise<unknown> {
    const response = await api.post("/api/suppliers/delete", supplierDTO);
    return response.data;
}

export async function deleteSupplierById(supplierId: number): Promise<unknown> {
    const response = await api.post("/api/suppliers/delete", { supplierId });
    return response.data;
}
