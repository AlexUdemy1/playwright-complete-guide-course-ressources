import { useEffect, useState } from 'react';

function ItemList() {
    const [error, setError] = useState('');
    const [itemList, setItemList] = useState([]);

    const handleItems = async () => {
        setError('');
        try {
            const response = await fetch('http://localhost:3001/items', {
                method: 'GET',
                headers: { 'Content-Type': 'application/json' },
            });
            if (!response.ok) {
                throw new Error(`Http error! Status: ${response.status}`);
            }
            const data = await response.json();
            setItemList(data);  // Setting state with the fetched items
        } catch (err) {
            setError(err.message);  // Handle error
        }
    };
    useEffect(() => {
        handleItems();
    },[]);

    console.log("Mes items", itemList)
    return (
    <div>
        <h2>List of Items from API</h2>
        {itemList.map((item, key) => (
            <ul key={key} class="m-4 p-4 w-2xl bg-white text-black">
                <li>{item.name}</li>
            </ul>
        ))}
        {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
    );
}

export default ItemList;