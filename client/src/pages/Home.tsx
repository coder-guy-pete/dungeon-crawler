import { Link } from 'react-router-dom';
import { Button } from "@chakra-ui/react";

function Home() {
    return (
        <div>
            <h1>Welcome to Dungeon Crawler!</h1>
            <p>Create an account or login to embark on an epic adventure through the dungeons of Mythrodor.</p>
            <div>
                <Button colorPalette="teal" variant="solid"><Link to="/signup">Sign Up</Link></Button>
                <Link to="/login">Login</Link>
            </div>
        </div>
    );
};

export default Home;