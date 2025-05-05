
export async function searchItem(query: string) {
    try {
        const res = await fetch(`http://localhost:3001/search?q=${query}`);
        const data = await res.json();
        return data;
    } catch (error) {
        console.error("Error fetching autocomplete results:", error);
        return [];
    }
}