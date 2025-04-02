import { Link } from 'react-router-dom';
import { Box, Flex, Button, Heading, Text } from "@chakra-ui/react";

function Home() {
    return (
        <Box backgroundImage="url('/imgs/dungeon_entrance.webp')" backgroundSize="contain" backgroundPosition="center" w="100vw" h="100vh" display="flex" justifyContent="center" alignItems="center">
            <Box display="flex" justifyContent="center" w={{base: "80%", smToMd: "80%", mdTo2xl: "50%" }} bg="gray" borderRadius={8} opacity={0.8} borderColor="black" borderWidth={2} borderStyle="groove" boxShadow="2xl">
                <Flex direction="column" justify="center" gap={4} align="center" p={4}>
                    <Heading size={{base: "xl", smToMd: "2xl", mdTo2xl: "4xl"}}>Welcome to Dungeon Crawler!</Heading>
                    <Text textAlign="center" fontWeight="medium">
                        In Dungeon Crawler you play as a thief who has been arrested and locked away deep in the confines of castle Mythrodor.
                        You start the game in a prison cell and quickly realize that you have been sentenced to death.
                        You must escape your cell, and navigate the perilous dungeon as you seek freedom.
                        You'll encounter many hazards along the way, most will lead to your demise.
                        Create an account or login if you dare.
                    </Text>
                    <Flex align="center" gap={4}>
                        <Button colorPalette="black" variant="solid" asChild><Link to="/signup">Sign Up</Link></Button>
                        <Button colorPalette="black" variant="solid" asChild><Link to="/login">Login</Link></Button>
                    </Flex>
                </Flex>
            </Box>
        </Box>
    );
};

export default Home;