import { useState } from "react"
import type { Phase } from "../../models/phase";
import Timer from "../../components/Timer";
import FileInput from "../../components/FileInput";
import ImageGallery from "../../components/ImageGallery";
import DocumentList from "../../components/DocumentList";

export default function PhaseElement({ phase, readOnly = false }: { phase: Phase, readOnly: boolean }) {
    const [isOpened, setOpen] = useState<boolean>(false);
    const [images, setImages] = useState<File[]>([]);
    const [documents, setDocuments] = useState<File[]>([]);

    function handleNewFiles(newFileList: FileList) {
        const newFiles = Array.from(newFileList);
        const newImages = newFiles.filter(f => f.type.startsWith("image/"));
        const newDocs = newFiles.filter(f => !f.type.startsWith("image/"));

        setImages([...images, ...newImages]);
        setDocuments([...documents, ...newDocs]);
        console.log(images.length)
    }

    function handleImageDelete(image: File) {
        setImages(images.filter(i => i !== image));
    }

    function handleDocumentDelete(doc: File) {
        setDocuments(documents.filter(d => d !== doc));
    }

    if (isOpened) {
        return <>
            <PhaseHeader></PhaseHeader>
            <article>
                {readOnly ? (
                    <p>Duration: {phase.time} hours</p>
                ) : (
                    <Timer></Timer>
                )}

                {!readOnly && <FileInput
                    fileList={[...images, ...documents]}
                    onChange={handleNewFiles}
                />}

                <ImageGallery images={images} onDelete={handleImageDelete} readOnly={readOnly} />
                <DocumentList documents={documents} onDelete={handleDocumentDelete} readOnly={readOnly} />

                <p>{phase.description}</p>
                <ul>
                    {phase.materials.map((material, index) => material === "" ? "" : <li key={index}> {material}</li>)}
                </ul>
            </article>
        </>
    } else {
        return <PhaseHeader></PhaseHeader>;
    }

    function handleOpening() {
        setOpen(!isOpened);
    }

    function PhaseHeader() {
        let state = isOpened ? "Close" : "Open";
        return <>
            <h3>{phase.name}</h3>
            <p>{phase.type}</p>
            <button onClick={handleOpening}>{state}</button>
            <br />
        </>
    }
}