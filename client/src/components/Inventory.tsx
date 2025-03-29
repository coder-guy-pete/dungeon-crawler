// Inventory.tsx
import { Flex, Heading, Text, Icon } from '@chakra-ui/react';
import { FaKey, FaGem } from 'react-icons/fa';
import { GiBroadsword, GiVikingShield } from "react-icons/gi";

interface InventoryProps {
    inventory: any;
}

function Inventory({ inventory }: InventoryProps) {
    const inventoryIcons = {
        key: <Icon as={FaKey} />,
        sword: <Icon as={GiBroadsword} />,
        shield: <Icon as={GiVikingShield} />,
        gem: <Icon as={FaGem} />,
    };

    if (!Array.isArray(inventory)) {
        return (
            <Flex direction="column" gap={2}>
                <Heading size="lg">Inventory:</Heading>
            </Flex>
        );
    }

    return (
        <Flex direction="column" gap={2}>
            <Heading size="lg">Inventory:</Heading>
            <Flex direction="column" gap={2}>
                {inventory.map((item: string, index: number) => (
                    <Flex key={index} align="center" gap={2}>
                        {inventoryIcons[item as keyof typeof inventoryIcons] || null}
                        <Text>{item}</Text>
                    </Flex>
                ))}
            </Flex>
        </Flex>
    );
}

export default Inventory;