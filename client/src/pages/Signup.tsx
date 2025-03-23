import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { SIGNUP_USER } from '../graphql/mutations';
import { useNavigate } from 'react-router-dom';
import { useAuthService } from '../utils/auth';

const Signup: React.FC = () => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
    const [signupUser, { error }] = useMutation(SIGNUP_USER);
    const authService = useAuthService();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
        const { data } = await signupUser({ variables: { username, email, password } });
        authService.login(data.createUser.token);
        navigate('/');
        } catch (err) {
        console.error(err);
        }
    };

    return (
        <div>
        <h2>Signup</h2>
        <form onSubmit={handleSubmit}>
            <input type="text" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} />
            <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
            <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
            <button type="submit">Signup</button>
        </form>
        {error && <p>Signup failed: {error.message}</p>}
        </div>
    );
};

export default Signup;