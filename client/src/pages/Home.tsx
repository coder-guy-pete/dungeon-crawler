import { Link } from 'react-router-dom';
import { Flex, Button } from "@chakra-ui/react";

function Home() {
    return (
        <Flex direction="column" justify="center" gap={4} align="center" w="100vw" h="100vh">
            <h1>Welcome to Dungeon Crawler!</h1>
            <p>Create an account or login to embark on an epic adventure through the dungeons of Mythrodor.</p>
            <Flex align="center" gap={4}>
                <Button colorPalette="teal" variant="solid"><Link to="/signup">Sign Up</Link></Button>
                <Button colorPalette="teal" variant="solid"><Link to="/login">Login</Link></Button>
            </Flex>
        </Flex>
    );
};

export default Home;