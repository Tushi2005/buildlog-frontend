import { useState } from "react";
import type { MaterialType } from "../../models/materialType";
import type { Material } from "../../models/material";
import type { Pattern } from "../../models/pattern";
import { useCrudList } from "../../hooks/useCrudList";

export default function Store({ materialType }: { materialType: MaterialType }) {
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const [isAddingOpen, setIsAddingOpen] = useState<boolean>(false);
    const [editingMaterial, setEditingMaterial] = useState<null | Material>(null);
    const [editingPattern, setEditingPattern] = useState<null | Pattern>(null);
    const [activeTab, setActiveTab] = useState<"material" | "pattern">("material");

    const { items: materials, add: addMaterial, remove: removeMaterial, update: updateMaterial } = useCrudList<Material>();
    const { items: patterns, add: addPattern, remove: removePattern, update: updatePattern } = useCrudList<Pattern>();

    return <>
        {materialTypeHeader(materialType)}
        {tabSwitch()}
        <ul>
            {isOpen && activeTab === "material" && materialsDisplay(materials)}
            {isOpen && activeTab === "pattern" && patternsDisplay(patterns)}
        </ul>
        {isAddingOpen && activeTab === "material" && onAddMaterial()}
        {isAddingOpen && activeTab === "pattern" && onAddPattern()}
    </>

    function materialTypeHeader(materialType: MaterialType) {
        let state = isOpen ? "Close" : "Open";
        return <>
            <h2>{materialType.name}</h2>
            <button onClick={handleIsOpen}>{state}</button>
            <button onClick={handleIsAddingOpen}>
                {activeTab === "material" ? "Add material" : "Add pattern"}
            </button>
        </>
    }

    function tabSwitch() {
        return <div>
            <button
                onClick={() => setActiveTab("material")}
                disabled={activeTab === "material"}
            >
                Materials
            </button>
            <button
                onClick={() => setActiveTab("pattern")}
                disabled={activeTab === "pattern"}
            >
                Patterns
            </button>
        </div>
    }

    function handleIsOpen() {
        setIsOpen(!isOpen);
    }

    function handleIsAddingOpen() {
        setIsAddingOpen(!isAddingOpen);
    }

    function materialsDisplay(materials: Material[]) {
        return materials.map((material, index) => (
            <li key={index}>
                <label htmlFor="">{material.name} {material.amount} {material.unit}</label>
                <button onClick={() => handleEditMaterial(material)}>Edit</button>
                <button onClick={() => removeMaterial(material.id)}>Delete</button>
            </li>
        ));
    }

    function patternsDisplay(patterns: Pattern[]) {
        return patterns.map((pattern, index) => (
            <li key={index}>
                <label htmlFor="">{pattern.name} - {pattern.description}</label>
                {pattern.file && (
                    <a href={URL.createObjectURL(pattern.file)} target="_blank" rel="noopener noreferrer">
                        Fájl megnyitása
                    </a>
                )}
                <button onClick={() => handleEditPattern(pattern)}>Edit</button>
                <button onClick={() => removePattern(pattern.id)}>Delete</button>
            </li>
        ));
    }

    function onAddMaterial() {
        return <dialog open={isAddingOpen}>
            <form onSubmit={handleMaterialSubmit}>
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
                    <button type="button" onClick={() => { handleIsAddingOpen(); setEditingMaterial(null); }}>Cancel</button>
                </div>
            </form>
        </dialog>
    }

    function onAddPattern() {
        return <dialog open={isAddingOpen}>
            <form onSubmit={handlePatternSubmit}>
                <label htmlFor="">Pattern name:
                    <input type="text" name="patternName" defaultValue={editingPattern?.name ?? ""} />
                </label>
                <label htmlFor="">Description:
                    <textarea name="patternDescription" defaultValue={editingPattern?.description ?? ""}></textarea>
                </label>
                <label htmlFor="">File (PDF):
                    <input type="file" name="patternFile" accept="application/pdf,image/*" />
                </label>
                <div>
                    <button type="submit">{editingPattern ? "Edit" : "Ok"}</button>
                    <button type="button" onClick={() => { handleIsAddingOpen(); setEditingPattern(null); }}>Cancel</button>
                </div>
            </form>
        </dialog>
    }

    function handleMaterialSubmit(e: any) {
        e.preventDefault();
        const formData = new FormData(e.target);
        const formJson = Object.fromEntries(formData.entries());

        if (editingMaterial) {
            updateMaterial({
                ...editingMaterial,
                amount: Number(formData.get("materialAmount")),
                name: formJson.materialName as string,
                unit: formJson.unit as string,
            });
            setEditingMaterial(null);
        } else {
            addMaterial({
                name: formJson.materialName as string,
                unit: formJson.unit as string,
                amount: Number(formData.get("materialAmount")),
            });
        }
        handleIsAddingOpen();
    }

    function handlePatternSubmit(e: any) {
        e.preventDefault();
        const formData = new FormData(e.target);
        const formJson = Object.fromEntries(formData.entries());
        const file = formData.get("patternFile") as File;

        if (editingPattern) {
            updatePattern({
                ...editingPattern,
                name: formJson.patternName as string,
                description: formJson.patternDescription as string,
                file: file.size > 0 ? file : editingPattern.file,
            });
            setEditingPattern(null);
        } else {
            addPattern({
                name: formJson.patternName as string,
                description: formJson.patternDescription as string,
                file: file.size > 0 ? file : undefined,
            });
        }
        handleIsAddingOpen();
    }

    function handleEditMaterial(material: Material) {
        setEditingMaterial(material);
        setIsAddingOpen(true);
    }

    function handleEditPattern(pattern: Pattern) {
        setEditingPattern(pattern);
        setIsAddingOpen(true);
    }
}