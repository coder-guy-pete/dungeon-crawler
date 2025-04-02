import { useState } from 'react';
import { useMutation } from '@apollo/client';
import { LOGIN_USER } from '../graphql/mutations';
import { useNavigate } from 'react-router-dom';
import { useAuthService } from '../utils/auth';
import { Flex, Image, Heading, Box, Input, Button } from '@chakra-ui/react';

function Login() {
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
        <Flex bg="blackAlpha.900" w="100vw" h="100vh" direction="row" justifyContent="center" alignItems="center">
            <Image src = "/imgs/torch.gif" alt="Animated Torch" h="200px" hideBelow="md" />
            <Box background="url('/imgs/scroll.png') no-repeat center center" backgroundSize=" 100% 100%" w="100%" maxW="500px" h="auto" minH="600px" display="flex" flexDirection="column" justifyContent="center" alignItems="center" opacity={0.8}>
            <Heading size="4xl" pb={4}>Login</Heading>
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <Input type="email" placeholder="Email" variant="subtle" backgroundColor="wheat" borderColor="black" value={email} onChange={(e) => setEmail(e.target.value)} />
                <Input type="password" placeholder="Password" variant="subtle" backgroundColor="wheat" borderColor="black" value={password} onChange={(e) => setPassword(e.target.value)} />
                <Flex justifyContent="space-between" gap={4} mt={4}>
                <Button type="submit">Login</Button>
                <Button onClick={() => navigate('/')}>Home</Button>
                </Flex>
            </form>
            {error && <p>Login failed: {error.message}</p>}
            </Box>
            <Image src = "/imgs/torch.gif" alt="Animated Torch" h="200px" hideBelow="md" />
        </Flex>
    );
};

export default Login;