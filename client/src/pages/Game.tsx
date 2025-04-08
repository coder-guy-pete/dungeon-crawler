import { useState, useEffect } from 'react';
import { useQuery, useMutation } from '@apollo/client';
import { GET_STORY_SEGMENT, ME } from '../graphql/queries';
import { CHOOSE_PATH, RESET_GAME } from '../graphql/mutations';
import { useNavigate } from 'react-router-dom';
import { useAuthService } from '../utils/auth';
import { Box, Card, Button, Flex, Heading, Text, Spinner } from '@chakra-ui/react';
import Inventory from '../components/Inventory';
import Stats from '../components/Stats';

function Game() {
    const [segmentId, setSegmentId] = useState(0);
    const [isAudioPlaying, setIsAudioPlaying] = useState(false)
    const [isHovered, setIsHovered] = useState(false);
    const { loading, error, data } = useQuery<{ getStorySegment: { text: string; choices: { text: string, nextSegmentId: number, soundEffect: string }[], backgroundImage: string } }>(GET_STORY_SEGMENT, { variables: { segmentId } });
    const { loading: meLoading, error: meError, data: meData } = useQuery(ME);
    const [choosePath] = useMutation(CHOOSE_PATH, { refetchQueries: [{ query: ME }] });
    const [resetGame] = useMutation(RESET_GAME);
    const navigate = useNavigate();
    const authService = useAuthService();

    useEffect(() => {
        if (meData) {
            setSegmentId(meData.me.currentSegmentId);
        }
    }, [meData]);

    if (loading || meLoading) return (
    <Flex background="blackAlpha.900" justifyContent="center" alignItems="center" height="100vh">
        <Text>Loading Content...</Text>
        <Spinner size="xl" />
    </Flex>
    );
    
    if (error || meError) return <p>Error: {error?.message || meError?.message}</p>;

    const handleChoice = async (choiceIndex: number) => {
        try {
            const { data: choiceData } = await choosePath({ variables: { segmentId, choiceIndex } });

            if (data?.getStorySegment.choices[choiceIndex]?.soundEffect) {
                const soundQuery = data.getStorySegment.choices[choiceIndex].soundEffect;
                const apiKey = import.meta.env.VITE_FREESOUND_API_KEY;

                console.log(typeof apiKey);
                console.log(!!apiKey)
                
                if (apiKey) {
                    setIsAudioPlaying(true);
                    await fetch(`https://freesound.org/apiv2/sounds/${soundQuery}?token=${apiKey}`)
                    .then(response => response.json())
                    .then((soundData) => {
                        if (soundData && soundData.previews) {
                            const soundUrl = soundData.previews['preview-hq-mp3'];
                            const audio = new Audio(soundUrl);
                            const startTime = 0;
                            const endTime = 4;

                            audio.currentTime = startTime;
                            audio.play();

                            setTimeout(() => {
                                audio.pause();
                                setSegmentId(choiceData.choosePath.segmentId);
                                setIsAudioPlaying(false);
                            }, (endTime - startTime) * 1000);
                            
                            if (data?.getStorySegment.choices[choiceIndex]?.text === "You Win!" || data?.getStorySegment.choices[choiceIndex]?.text === "You Lose!") {
                                handleResetGame();;
                            }
                        }
                    });
                }
            } else {
                setSegmentId(choiceData.choosePath.segmentId);
                setIsAudioPlaying(false);
                if (data?.getStorySegment.choices[choiceIndex]?.text === "You Win!" || data?.getStorySegment.choices[choiceIndex]?.text === "You Lose!") {
                    handleResetGame();;
                }
            }
        } catch (err) {
        console.error(err);
        }
    };

    const handleResetGame = async () => {
        try {
        await resetGame();
        setSegmentId(0);
        } catch (err) {
        console.error(err);
        }
    };

    const handleLogout = () => {
        authService.logout();
        navigate('/');
    };

    return (
        <Box background="blackAlpha.900">
        <Flex
            data-testid="game-background" 
            background={`url('${data?.getStorySegment?.backgroundImage}') no-repeat center center`}
            w="100vw" h="100vh" direction="column" justifyContent="flex-end" alignItems="center" padding={6}>
            <Card.Root
                size="lg"
                width={['90%', '80%', '70%', '60%']}
                opacity={isHovered ? 0.9 : 0.6}
                onMouseOver={() => setIsHovered(true)}
                onMouseOut={() => setIsHovered(false)}
                tabIndex={0}>
                <Card.Body gap={4} backgroundColor="wheat" >
                    <Heading size="2xl">Dungeon Crawler</Heading>
                    {data?.getStorySegment && (
                        <Box>
                        <Text fontSize="md"> {data.getStorySegment.text}</Text>
                        <Flex direction="column" gap={4} justifyContent="space-between" mt={4}>
                        {data.getStorySegment.choices.map((choice, index) => (
                            <Button key={index} w="fit-content" whiteSpace="normal" onClick={() => handleChoice(index)} disabled={isAudioPlaying}>
                            {choice.text}
                            </Button>
                        ))}
                        </Flex>
                        {meData?.me && (
                            <Box display="flex" flexDirection="column" justifyContent="center" gap={4} mt={4}>
                                <Box display="flex" justifyContent="space-between" gap={4}>
                                    <Flex direction="column" gap={2} mt={4} w="50%">
                                    <Inventory inventory={meData?.me?.inventory || []} />
                                    </Flex>
                                    <Flex direction="column" gap={2} mt={4}>
                                        <Stats stats={meData?.me?.stats || []} />
                                    </Flex>
                                </Box>
                                <Flex gap={4} align="center" justifyContent="space-between" borderTop="dashed 1px" borderColor="blackAlpha.600" pt={4} pl={4} pr={4}>
                                    <Button w="fit-content" variant="surface" colorPalette="red" onClick={handleLogout}>Log Out</Button>
                                    <Flex gap={4} border="solid 1px" borderColor="blackAlpha.600" p={2} borderRadius="md">
                                        <Text>Wins: {meData?.me?.wins}</Text>
                                        <Text> | </Text>
                                        <Text>Losses: {meData?.me?.losses}</Text>
                                    </Flex>
                                </Flex>
                            </Box>
                        )}
                        </Box>
                    )}
                </Card.Body>
            </Card.Root>
        </Flex>
        </Box>
    );
};

export default Game;