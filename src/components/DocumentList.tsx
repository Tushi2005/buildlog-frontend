export default function DocumentList({ documents, onDelete, readOnly }: { documents: File[], onDelete: (file: File) => void, readOnly: boolean }) {
    if (documents.length === 0) return null;

    return <ul>
        {documents.map((doc) => (
            <li key={`${doc.name}-${doc.lastModified}-${doc.size}`}>
                <a href={URL.createObjectURL(doc)} target="_blank" rel="noopener noreferrer">
                    {doc.name}
                </a>
                {!readOnly && (
                    <button type="button" onClick={() => onDelete(doc)}>Delete</button>
                )}
            </li>
        ))}
    </ul>;
}