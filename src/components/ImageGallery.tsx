import { useState } from "react";

export default function ImageGallery({ images, onDelete, readOnly }: { images: File[], onDelete: (file: File) => void, readOnly: boolean }) {
    const [currentIndex, setCurrentIndex] = useState<number>(0);

    if (images.length === 0) return <p>Nincs feltöltött kép</p>;

    const current = images[Math.min(currentIndex, images.length - 1)];

    function goNext() {
        setCurrentIndex(prev => (prev + 1) % images.length);
    }

    function goPrev() {
        setCurrentIndex(prev => (prev - 1 + images.length) % images.length);
    }

    return <>
        <button type="button" onClick={goPrev}>{"<"}</button>
        <img src={URL.createObjectURL(current)} alt={current.name} width={200} />
        <button type="button" onClick={goNext}>{">"}</button>
        {!readOnly && (
            <button type="button" onClick={() => onDelete(current)}>Delete</button>
        )}
    </>;
}