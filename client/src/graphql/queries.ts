import { gql } from '@apollo/client';

export const GET_STORY_SEGMENT = gql`
    query GetStorySegment($segmentId: Int!) {
        getStorySegment(segmentId: $segmentId) {
        id
        segmentId
        text
        choices {
            text
            nextSegmentId
            soundEffect
            effects {
            inventory
            stats
            }
        }
        ending
        win
        loss
        backgroundImage
        }
    }
`;

export const ME = gql`
    query Me {
        me {
        id
        username
        email
        inventory
        stats
        currentSegmentId
        wins
        losses
        }
    }
`;

export const GET_SOUND = gql`
    query GetSound($soundQuery: String!) {
        getSound(soundQuery: $soundQuery) {
        url
        }
    }
`;