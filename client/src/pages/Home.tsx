import React from 'react';
import { Link } from 'react-router-dom';

const Home: React.FC = () => {
    return (
        <div>
        <h1>Welcome to the Dungeon Crawler!</h1>
        <p>Embark on an epic adventure and forge your own destiny.</p>
        <div>
            <Link to="/signup">Sign Up</Link>
            <Link to="/login">Login</Link>
        </div>
        </div>
    );
};

export default Home;