// Inventory.tsx
import { Flex, Heading, Text, Icon } from '@chakra-ui/react';
import { GiBroadsword, GiVikingShield, GiStonePile, GiSkeletonKey, GiLockpicks, GiPowder, GiFlintSpark, GiChopsticks } from "react-icons/gi";
import { PiCoinsBold } from "react-icons/pi";
import { RiToolsLine } from "react-icons/ri";

interface InventoryProps {
    inventory: any;
}

function Inventory({ inventory }: InventoryProps) {
    const inventoryIcons = {
        "Master Key": <Icon as={GiSkeletonKey} />,
        "Sword": <Icon as={GiBroadsword} />,
        "Leather Shield": <Icon as={GiVikingShield} />,
        "Coins": <Icon as={PiCoinsBold} />,
        "Sharp Stone": <Icon as={GiStonePile} />,
        "Lockpicks": <Icon as={GiLockpicks} />,
        "Black Powder": <Icon as={GiPowder} />,
        "Flint and Steel": <Icon as={GiFlintSpark} />,
        "Metal Bar": <Icon as={GiChopsticks} />,
        "Guard's Key": <Icon as={GiSkeletonKey} />,
        "Crude Tools": <Icon as={RiToolsLine} />,
    };

    if (!inventory || typeof inventory !== 'object' || Object.keys(inventory).length === 0) {
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
                {Object.keys(inventory).map((item, index: number) => (
                    <Flex key={index} align="center" gap={2}>
                        {inventoryIcons[item as keyof typeof inventoryIcons] || null}
                        <Text>
                            {item} ({inventory[item]})
                        </Text>
                    </Flex>
                ))}
            </Flex>
        </Flex>
    );
}

export default Inventory;