import {Flex, Heading, Text, Icon } from '@chakra-ui/react';
import { GiStrongMan, GiClover, GiCharm } from "react-icons/gi";
import { GrSwift } from "react-icons/gr";
import { FaHeart, FaHatWizard } from "react-icons/fa";

interface StatsProps {
    stats: any;
}

function Stats({ stats }: StatsProps) {
    const statsIcons = {
        HP: <Icon as={FaHeart} color="red" />,
        Strength: <Icon as={GiStrongMan} size="md" color="red.800"/>,
        Dexterity: <Icon as={GrSwift} color="green.800"/>,
        Wisdom: <Icon as={FaHatWizard} color="blue"/>,
        Charm: <Icon as={GiCharm} color="pink.500"/>,
        Luck: <Icon as={GiClover} color="green" />,
    }

    if (!stats || typeof stats !== 'object' || Object.keys(stats).length === 0) {
        return (
            <Flex direction="column" gap={2}>
                <Heading size="lg">Stats:</Heading>
            </Flex>
        );
    }
    return (
        <Flex direction="column" gap={2}>
            <Heading size="lg">Stats:</Heading>
            <Flex direction="row" gap={2} wrap="wrap">
                {Object.keys(stats).map((stat, index: number) => (
                    <Flex key={index} align="center" gap={2}>
                        {statsIcons[stat as keyof typeof statsIcons] || null}
                        <Text>
                            {stat} ({stats[stat]})
                        </Text>
                    </Flex>
                ))}
            </Flex>
        </Flex>
    );
};

export default Stats;