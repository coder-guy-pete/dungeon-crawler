import { useState } from 'react';
import { useMutation } from '@apollo/client';
import { SIGNUP_USER } from '../graphql/mutations';
import { useNavigate } from 'react-router-dom';
import { useAuthService } from '../utils/auth';
import { Flex, Heading, Field, Input, Button } from '@chakra-ui/react';

function Signup() {
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
        <Flex bg="blackAlpha.800" w="100vw" h="100vh" direction="column" justifyContent="center" alignItems="center" gap={4}>
        <Heading size="4xl" color="whitesmoke">Signup</Heading>
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '10px', backgroundColor: 'lightgray', padding: '2rem', borderRadius: '8px', opacity: 0.8 }}>
            <Field.Root required>
                <Field.Label>Username <Field.RequiredIndicator /></Field.Label>
            </Field.Root>
            <Input type="text" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} />
            <Field.Root required>
                <Field.Label>Email <Field.RequiredIndicator /></Field.Label>
            </Field.Root>
            <Input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
            <Field.Root required>
                <Field.Label>Password <Field.RequiredIndicator /></Field.Label>
            </Field.Root>
            <Input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
            <Button type="submit">Signup</Button>
            <Button onClick={() => navigate('/')}>Home</Button>
        </form>
        {error && <p>Signup failed: {error.message}</p>}
        </Flex>
    );
};

export default Signup;