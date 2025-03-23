import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { LOGIN_USER } from '../graphql/mutations';
import { useNavigate } from 'react-router-dom';
import { useAuthService } from '../utils/auth';

const Login: React.FC = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
    const [loginUser, { error }] = useMutation(LOGIN_USER);
    const authService = useAuthService();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
        const { data } = await loginUser({ variables: { email, password } });
        authService.login(data.login.token);
        navigate('/');
        } catch (err) {
        console.error(err);
        }
    };

    return (
        <div>
        <h2>Login</h2>
        <form onSubmit={handleSubmit}>
            <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
            <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
            <button type="submit">Login</button>
        </form>
        {error && <p>Login failed: {error.message}</p>}
        </div>
    );
};

export default Login;