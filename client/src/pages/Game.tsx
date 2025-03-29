import { useState, useEffect } from 'react';
import { useQuery, useMutation } from '@apollo/client';
import { GET_STORY_SEGMENT, ME } from '../graphql/queries';
import { CHOOSE_PATH, RESET_GAME } from '../graphql/mutations';
import { Box, Card, Button, Flex, Heading, Text } from '@chakra-ui/react';
import Inventory from '../components/Inventory';

function Game() {
    const [segmentId, setSegmentId] = useState(0); 
    const { loading, error, data } = useQuery<{ getStorySegment: { text: string; choices: { text: string, nextSegmentId: number }[] } }>(GET_STORY_SEGMENT, { variables: { segmentId } });
    const { loading: meLoading, error: meError, data: meData } = useQuery(ME);
    const [choosePath] = useMutation(CHOOSE_PATH, { refetchQueries: [{ query: ME }] });
    const [resetGame] = useMutation(RESET_GAME);

    useEffect(() => {
        if (meData) {
            setSegmentId(meData.me.currentSegmentId);
        }
    }, [meData]);

    if (loading || meLoading) return <p>Loading...</p>;
    if (error || meError) return <p>Error: {error?.message || meError?.message}</p>;

    const handleChoice = async (choiceIndex: number) => {
        try {
            const { data: choiceData } = await choosePath({ variables: { segmentId, choiceIndex } });
            setSegmentId(choiceData.choosePath.segmentId);
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

    return (
        <Box background="blackAlpha.900">
        <Box background="url('/imgs/prison_cell_closed.webp') no-repeat center center" w="100vw" h="100vh" display="flex" direction="row" justifyContent="center" alignItems="center">
            <Card.Root size="lg" opacity={0.8}>
                <Card.Body gap={4} backgroundColor="wheat" >
                    <Heading size="2xl">Dungeon Crawler</Heading>
                    {data?.getStorySegment && (
                        <Box maxW="600px">
                        <Text fontSize="md">{data.getStorySegment.text}</Text>
                        <Flex direction="column" gap={4} justifyContent="space-between" mt={4}>
                        {data.getStorySegment.choices.map((choice, index) => (
                            <Button key={index} w="fit-content" onClick={() => handleChoice(index)}>
                            {choice.text}
                            </Button>
                        ))}
                        </Flex>
                        {meData?.me && (
                            <Box display="flex" flexDirection="column" justifyContent="center" gap={4} mt={4}>
                                <Box display="flex" justifyContent="space-between" gap={4}>
                                    <Flex direction="column" gap={2} mt={4} w="50%">
                                        {meData.me.inventory && (<Inventory inventory={meData.me.inventory} />)}
                                    </Flex>
                                    <Flex direction="column" gap={2} mt={4} w="50%">
                                        <Heading size="lg">Stats:</Heading>
                                        <Text>{JSON.stringify(meData.me.stats)}</Text>
                                    </Flex>
                                </Box>
                                <Button w="fit-content" variant="surface" colorPalette="yellow" onClick={handleResetGame}>Reset Game</Button>
                            </Box>
                        )}
                        </Box>
                    )}
                </Card.Body>
            </Card.Root>
        </Box>
        </Box>
    );
};

export default Game;