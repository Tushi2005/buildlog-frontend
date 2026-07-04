import { useState } from "react";
import type { MaterialType } from "../../models/materialType";
import type { Material } from "../../models/material";

export default function Store({ materialType }: { materialType: MaterialType }) {
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const [isAddingMaterial, setIsAddingMaterial] = useState<boolean>(false);
    const [materials, setMaterials] = useState<Material[]>([]);
    const [id, setId] = useState<number>(0);
    const [editingMaterial, setEditingMaterial] = useState<null | Material>(null);

    return <>
        {materialTypeHeader(materialType)}
        <ul>
            {isOpen && materialsDisplay(materials)}
        </ul>
        {isAddingMaterial && onAddMaterial()}
    </>

    function materialTypeHeader(materialType: MaterialType) {
        let state;
        isOpen ? state = "Close" : state = "Open";
        return <>
            <h2>{materialType.name}</h2>
            <button onClick={handleIsOpen}>{state}</button>
            <button onClick={handleIsAddingMaterial}>Add material</button>
        </>
    }

    function handleIsOpen() {
        setIsOpen(!isOpen);
    }

    function handleIsAddingMaterial() {
        setIsAddingMaterial(!isAddingMaterial);
    }

    function materialsDisplay(materials: Material[]) {
        function display(material: Material) {
            return <>
                <label htmlFor="">{material.name} {material.amount} {material.unit}</label>
                <button onClick={() => handleEditClick(material)}>Edit</button>
                <button onClick={() => handleDelete(material.id)}>Delete</button>
            </>
        }

        return materials.map((material, index) => <li key={index}>{display(material)}</li>);
    }

    function onAddMaterial() {
        return <>
            <dialog open={isAddingMaterial}>
                <form action="" onSubmit={handleSubmit}>
                    <label htmlFor="">Material name:
                        <input type="text" name="materialName" defaultValue={editingMaterial?.name ?? ""} />
                    </label>
                    <label htmlFor="">Material amount:
                        <input type="number" name="materialAmount" defaultValue={editingMaterial?.amount ?? ""} />
                    </label>
                    <label htmlFor="">Unit:
                        <select name="unit" defaultValue={editingMaterial?.unit ?? ""}>
                            <option value="kg">kg</option>
                            <option value="m">m</option>
                            <option value="db">db</option>
                        </select>
                    </label>
                    <div>
                        <button type="submit">{editingMaterial ? "Edit" : "Ok"}</button>
                        <button type="button" onClick={() => { handleIsAddingMaterial(); setEditingMaterial(null); }}>Cancel</button>
                    </div>
                </form>
            </dialog>
        </>
    }

    function handleSubmit(e: any) {

        e.preventDefault();

        const form = e.target;
        const formData = new FormData(form);

        const formJson = Object.fromEntries(formData.entries());

        if (editingMaterial) {
            const updatedMaterial: Material = {
                ...editingMaterial,
                amount: Number(formData.get("materialAmount")),
                name: formJson.materialName as string,
                unit: formJson.unit as string,
            };
            handleEditingMaterial(updatedMaterial);
            setEditingMaterial(null);
        } else {


            const newMaterial: Material = {
                id: id,
                name: formJson.materialName as string,
                unit: formJson.unit as string,
                amount: Number(formData.get("materialAmount")),
            };
            setId(id + 1);
            setMaterials([...materials, newMaterial]);
        }

        handleIsAddingMaterial();

    }

    function handleDelete(materialId: number) {
        setMaterials(materials.filter(material => material.id !== materialId))
    }

    function handleEditClick(material: Material) {
        setEditingMaterial(material);
        setIsAddingMaterial(true);
    }

    function handleEditingMaterial(material: Material) {
        setMaterials(
            materials.map(t => {
                if (t.id === material.id)
                    return material;
                else
                    return t;
            })
        )
    }

}