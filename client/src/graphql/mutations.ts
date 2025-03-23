import { gql } from '@apollo/client';

export const LOGIN_USER = gql`
    mutation Login($email: String!, $password: String!) {
        login(email: $email, password: $password) {
        token
        user {
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
    }
`;

export const SIGNUP_USER = gql`
    mutation CreateUser($username: String!, $email: String!, $password: String!) {
        createUser(input: { username: $username, email: $email, password: $password }) {
        token
        user {
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
    }
`;

export const CHOOSE_PATH = gql`
    mutation ChoosePath($segmentId: Int!, $choiceIndex: Int!) {
        choosePath(segmentId: $segmentId, choiceIndex: $choiceIndex) {
        id
        segmentId
        text
        choices {
            text
            nextSegmentId
            effects {
            inventory
            stats
            }
        }
        ending
        win
        loss
        }
    }
`;

export const RESET_GAME = gql`
    mutation ResetGame {
        resetGame {
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