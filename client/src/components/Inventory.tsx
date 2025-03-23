import React from 'react';

interface InventoryProps {
    inventory: { [key: string]: number };
}

const Inventory: React.FC<InventoryProps> = ({ inventory }) => {
    return (
        <div>
        <h3>Inventory</h3>
        <p>{JSON.stringify(inventory)}</p>
        </div>
    );
};

export default Inventory;