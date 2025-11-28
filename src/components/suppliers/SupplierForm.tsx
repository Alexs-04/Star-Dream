import React, {useState} from "react";
import type { SupplierDTO } from "../../types/supplier";

interface Props {
    onCreate: (dto: SupplierDTO) => Promise<void> | void;
}

const SupplierForm: React.FC<Props> = ({ onCreate }) => {
    const [name, setName] = useState("");
    const [address, setAddress] = useState("");
    const [phone, setPhone] = useState("");
    const [email, setEmail] = useState("");
    const [submitting, setSubmitting] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!name.trim()) return;
        const dto: SupplierDTO = { name: name.trim(), address: address.trim(), phone: phone.trim(), email: email.trim() };
        try {
            setSubmitting(true);
            await onCreate(dto);
            setName("");
            setAddress("");
            setPhone("");
            setEmail("");
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <form className="supplier-form" onSubmit={handleSubmit}>
            <div className="form-row">
                <input placeholder="Nombre" value={name} onChange={e => setName(e.target.value)} required />
                <input placeholder="Dirección" value={address} onChange={e => setAddress(e.target.value)} />
            </div>
            <div className="form-row">
                <input placeholder="Teléfono" value={phone} onChange={e => setPhone(e.target.value)} />
                <input placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} type="email" />
            </div>
            <div className="form-actions">
                <button type="submit" className="btn-primary" disabled={submitting}>{submitting ? "Creando..." : "Crear proveedor"}</button>
            </div>
        </form>
    );
};

export default SupplierForm;

