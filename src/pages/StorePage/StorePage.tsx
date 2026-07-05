import { useState } from "react";
import Store from "./Store";
import type { MaterialType } from "../../models/materialType";
import { useCrudList } from "../../hooks/useCrudList";


export default function StorePage() {
    const [isAddingOpen, setIsAddingOpen] = useState<boolean>(false);
    const [editingMaterialType, setEditingMaterialType] = useState<null | MaterialType>(null)
    const { items: materialTypes, add: addMaterialType, remove: removeMaterialType, update: updateMaterialType } = useCrudList<MaterialType>();
    return <>
        <h1>Material types</h1>
        <button onClick={handleIsAddingOpen}>Add new type</button>
        {materialTypes.map((materialType, index) => {
            return <div key={index}>
                <button onClick={() => { removeMaterialType(materialType.id) }}>Delete</button>
                <button onClick={() => {
                    setEditingMaterialType(materialType),
                        setIsAddingOpen(true)
                }}>Edit </button>
                <Store materialType={materialType} ></Store>
            </div>
        })}
        {isAddingOpen && onNewType()}
    </>

    function onNewType() {
        return <>
            <dialog open={isAddingOpen}>
                <form onSubmit={handleSubmit}>
                    <div>
                        <label htmlFor="">{editingMaterialType ? "Edit type:" : "New type:"}</label>
                        <input type="text" name="newType" defaultValue={editingMaterialType?.name ?? ""} />
                    </div>
                    <button type="submit">{editingMaterialType ? "Edit" : "Ok"}</button>
                    <button type="button" onClick={() => {
                        handleIsAddingOpen();
                        setEditingMaterialType(null);
                    }}>Cancel</button>
                </form>
            </dialog>
        </>
    }

    function handleSubmit(e: any) {
        e.preventDefault();

        const form = e.target;
        const formData = new FormData(form);

        const formJson = Object.fromEntries(formData.entries());

        if (editingMaterialType) {
            updateMaterialType({
                ...editingMaterialType,
                name: formJson.newType as string
            });
            setEditingMaterialType(null);
        } else {
            addMaterialType({
                name: formJson.newType as string
            });
        }
        handleIsAddingOpen();
    }

    function handleIsAddingOpen() {
        setIsAddingOpen(!isAddingOpen);
    }

}

