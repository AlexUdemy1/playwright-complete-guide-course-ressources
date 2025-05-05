
export async function getItems() {
    try {
      const res = await fetch("http://localhost:3001/items");
      if (!res.ok) throw new Error("Failed to fetch items");
  
      const data = await res.json();
      return data;
    } catch (error: any) {
        console.error('Error Getting the cart:', error);
    }
  }