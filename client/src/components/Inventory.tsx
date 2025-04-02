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
        "Master Key": <Icon as={GiSkeletonKey} color="yellow.800" />,
        "Sword": <Icon as={GiBroadsword} color="blue.700" />,
        "Leather Shield": <Icon as={GiVikingShield} color="chocolate" />,
        "Coins": <Icon as={PiCoinsBold} color="yellow.800" />,
        "Sharp Stone": <Icon as={GiStonePile} color="gray.600" />,
        "Lockpicks": <Icon as={GiLockpicks} color="yellow.800" />,
        "Black Powder": <Icon as={GiPowder} />,
        "Flint and Steel": <Icon as={GiFlintSpark} color="gray.500" />,
        "Metal Bar": <Icon as={GiChopsticks} color="gray.700" />,
        "Guard's Key": <Icon as={GiSkeletonKey} color="yellow.800" />,
        "Crude Tools": <Icon as={RiToolsLine} color="gray.500" />,
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
            <Flex direction="row" gap={2} wrap="wrap">
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