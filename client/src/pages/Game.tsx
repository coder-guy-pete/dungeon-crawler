import React, { useState, useEffect } from 'react';
import { useQuery, useMutation } from '@apollo/client';
import { GET_STORY_SEGMENT, ME } from '../graphql/queries';
import { CHOOSE_PATH, RESET_GAME } from '../graphql/mutations';
// import { useNavigate } from 'react-router-dom';

const Game: React.FC = () => {
    // const navigate = useNavigate();
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
        <div>
        <h1>Dungeon Crawler</h1>
        {data?.getStorySegment && (
            <div>
            <p>{data.getStorySegment.text}</p>
            {data.getStorySegment.choices.map((choice, index) => (
                <button key={index} onClick={() => handleChoice(index)}>
                {choice.text}
                </button>
            ))}
            {meData?.me && (
                <div>
                <p>Inventory: {JSON.stringify(meData.me.inventory)}</p>
                <p>Stats: {JSON.stringify(meData.me.stats)}</p>
                <button onClick={handleResetGame}>Reset Game</button>
                </div>
            )}
            </div>
        )}
        </div>
    );
};

export default Game;