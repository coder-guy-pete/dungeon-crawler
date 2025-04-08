import React from 'react'
import Game from './Game'
import { mount } from 'cypress/react'

import { MockedProvider } from '@apollo/client/testing'
import { MemoryRouter } from 'react-router-dom'
import { Provider } from '../components/ui/provider'
import { ME, GET_STORY_SEGMENT } from '../graphql/queries'

const meQueryMock = {
  request: {
    query: ME,
  },
  result: {
    data: {
      me: {
        __typename: 'User',
        id: '67e0646b102f77c7b79751b9',
        username: 'testuser1',
        email: 'test@email.com',
        inventory: {
          "Loose Stone": 1,
          "Sharp Stone": 2
        },
        stats: {
          "HP": 50,
          "Strength": 4,
          "Dexterity": 10,
          "Wisdom": 5,
          "Charm": 6,
          "Luck": 8
        },
        wins: 0,
        losses: 12,
        currentSegmentId: 0
      },
    },
  },
};

const getStorySegmentMock_Segment0 = {
  request: {
    query: GET_STORY_SEGMENT,
    variables: {
      segmentId: 0
    },
  },
  result: {
    data: {
      getStorySegment: {
        __typename: 'StorySegment',
        segmentId: 0,
        text: "You wake up in a dark, cold cell. Your head throbs, and you can barely remember anything. What do you do?",
        choices: [
          {
            __typename: 'Choice',
            nextSegmentId: 1,
            text: "Feel around the room for anything useful",
            effects: {
              __typename: 'Effects',
              inventory: {
                "Sharp Stone": 1
              },
              stats: {
                "Dexterity": 1
              }
            },
            soundEffect: "660335"
          },
          {
            __typename: 'Choice',
            nextSegmentId: 2,
            text: "Try to calm down and wait for your eyes to adjust",
            effects: {
              __typename: 'Effects',
              inventory: null,
              stats: {
                "Wisdom": 1
              }
            },
            soundEffect: "682879"
          },
          {
            __typename: 'Choice',
            nextSegmentId: 3,
            text: "Panic and start yelling for help!!",
            effects: {
              __typename: 'Effects',
              inventory: null,
              stats: {
                "Charm": -1
              }
            },
            soundEffect: "351598"
          }
        ],
        ending: false,
        win: false,
        loss: false,
        backgroundImage: "/imgs/prison_cell_closed.webp"
      },
    },
  },
};

const initialRenderMocks = [
  meQueryMock,
  getStorySegmentMock_Segment0
];

describe('<Game /> Component Tests', () => {
  it('should render initial user data and story segment correctly', () => {
    mount(
      <MockedProvider mocks={initialRenderMocks} addTypename={true}>
        <MemoryRouter>
          <Provider>
            <Game />
          </Provider>
          </MemoryRouter>
        </MockedProvider>
    );

    cy.contains('Loading Content...').should('not.exist');
  })
})