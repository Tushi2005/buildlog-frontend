import { useState } from "react";

export function useCrudList<T extends { id: number }>() {
    const [items, setItems] = useState<T[]>([]);
    const [nextId, setNextId] = useState<number>(0);

    function add(itemWithoutId: Omit<T, "id">) {
        const newItem = { ...itemWithoutId, id: nextId } as T;
        setNextId(nextId + 1);
        setItems([...items, newItem]);
    }

    function remove(id: number) {
        setItems(items.filter(item => item.id !== id));
    }

    function update(updated: T) {
        setItems(items.map(item => item.id === updated.id ? updated : item));
    }

    return { items, add, remove, update };
}