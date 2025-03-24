import React from 'react';
import { Link } from 'react-router-dom';

const Home: React.FC = () => {
    return (
        <div>
        <h1>Welcome to Dungeon Crawler!</h1>
        <p>Create an account or login to embark on an epic adventure through the dungeons of Mythrodor.</p>
        <div>
            <Link to="/signup">Sign Up</Link>
            <Link to="/login">Login</Link>
        </div>
        </div>
    );
};

export default Home;