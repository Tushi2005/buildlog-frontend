import { useState } from "react";
import Store from "./Store";
import type { MaterialType } from "../../models/materialType";


export default function StorePage() {
    const [materialTypes, setMaterialTypes] = useState<MaterialType[]>([]);
    const [isAddingOpen, setIsAddingOpen] = useState<boolean>(false);
    const [id, setId] = useState<number>(0);
    return <>
        <h1>Material types</h1>
        <button onClick={handleIsAddingOpen}>Add new type</button>
        {materialTypes.map(materialType => <Store materialType={materialType}></Store>)}
        {isAddingOpen && onNewType()}
    </>

    function onNewType() {
        return <>
            <dialog open={isAddingOpen}>
                <form onSubmit={handleSubmit}>
                    <div>
                        <label htmlFor="">New type:</label>
                        <input type="text" name="newType" />
                    </div>
                    <button type="submit">Ok</button>
                    <button type="button" onClick={handleIsAddingOpen}>Cancel</button>
                </form>
            </dialog>
        </>
    }

    function handleSubmit(e: any) {
        e.preventDefault();

        const form = e.target;
        const formData = new FormData(form);

        const formJson = Object.fromEntries(formData.entries());
        const newType: MaterialType = {
            id:id,
            name: formJson.newType as string
        };

        setId(id+1);
        setMaterialTypes([...materialTypes,newType]);
        handleIsAddingOpen();
    }

    function handleIsAddingOpen(){
        setIsAddingOpen(!isAddingOpen);
    }
}

