import Game from './Game'
import { mount } from 'cypress/react'

import { MockedProvider } from '@apollo/client/testing'
import { MemoryRouter } from 'react-router-dom'
import { Provider } from '../components/ui/provider'
import { ME, GET_STORY_SEGMENT } from '../graphql/queries'
import { CHOOSE_PATH, RESET_GAME } from '../graphql/mutations'

const meQueryMockInitial = {
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

const meQueryMock_Segment1 = {
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
          "Sharp Stone": 1,
        },
        stats: {
          "HP": 50,
          "Strength": 4,
          "Dexterity": 11,
          "Wisdom": 5,
          "Charm": 6,
          "Luck": 8
        },
        wins: 0,
        losses: 12,
        currentSegmentId: 1
      },
    },
  },
};

const meQueryMock_Segment2_Lose = {
  request: {
    query: ME,
  },
  result: {
    data: {
      me: {
        __typename: 'User',
        id: 'testUserId',
        username: 'testuser',
        email: 'test@email.com',
        inventory: { "Item1": 1, "Item2": 1 },
        stats: { "Stat1": 1, "Stat2": 1 },
        wins: 0,
        losses: 0,
        currentSegmentId: 2
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

const getStorySegmentMock_Segment1 = {
  request: {
    query: GET_STORY_SEGMENT,
    variables: {
      segmentId: 1
    },
  },
  result: {
    data: {
      getStorySegment: {
        __typename: 'StorySegment',
        segmentId: 1,
        text: "You find a loose stone on the floor. It's surprisingly sharp.",
        choices: [
          {
            __typename: 'Choice',
            nextSegmentId: 2,
            text: "Examine the stone more closely",
            effects: {
              __typename: 'Effects',
              inventory: null,
              stats: null
            },
            soundEffect: "123456"
          }
        ],
        ending: false,
        win: false,
        loss: false,
        backgroundImage: "/imgs/stone_floor.webp"
      },
    },
  },
};

const getStorySegmentMock_Segment2_Lose = {
  request: {
    query: GET_STORY_SEGMENT,
    variables: {
      segmentId: 2
    },
  },
  result: {
    data: {
      getStorySegment: {
        __typename: 'StorySegment',
        segmentId: 2,
        text: "The lock is too tough. You've been caught!",
        choices: [],
        ending: true,
        win: false,
        loss: true,
        backgroundImage: "/imgs/caught.webp"
      },
    },
  },
};

const choosePathMock_Segment0 = {
  request: {
    query: CHOOSE_PATH,
    variables: {
      segmentId: 0,
      choiceIndex: 0
    }
  },
  result: {
    data: {
      choosePath: {
        __typename: 'User',
        segmentId: 1
      }
    }
  }
};

const choosePathMock_Segment1 = {
  request: {
    query: CHOOSE_PATH,
    variables: {
      segmentId: 1,
      choiceIndex: 0
    }
  },
  result: {
    data: {
      choosePath: {
        __typename: 'User',
        segmentId: 2
      }
    }
  }
};

const initialRenderMocks = [
  meQueryMockInitial,
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

    // Check if the loading message is displayed initially
    cy.get('p').contains('Loating Content...').should('not.exist');

    // Check if background image is displayed
    cy.get('[data-testid="game-background"]').should('have.css', 'background-image').and('contain', 'prison_cell_closed.webp');
    
    // Check if game card is displayed properly
    cy.get('h2').contains('Dungeon Crawler').should('exist');
    cy.get('p').contains('You wake up in a dark, cold cell. Your head throbs, and you can barely remember anything. What do you do?').should('exist');
    cy.get('button').contains('Feel around the room for anything useful').should('exist');
    cy.get('button').contains('Try to calm down and wait for your eyes to adjust').should('exist');
    cy.get('button').contains('Panic and start yelling for help!!').should('exist');
    cy.get('h2').contains('Inventory').should('exist');
    cy.get('p').contains('Loose Stone (1)').should('exist');
    cy.get('h2').contains('Stats').should('exist');
    cy.get('p').contains('HP (50)').should('exist');
    cy.get('button').contains('Log Out').should('exist');
    cy.get('p').contains('Wins: 0').should('exist');
    cy.get('p').contains('Losses: 12').should('exist');
  })

  it('should load the next segment when an option is selected', () => {
    const nextSegmentMocks = [
      meQueryMockInitial,
      getStorySegmentMock_Segment0,
      choosePathMock_Segment0,
      meQueryMock_Segment1,
      getStorySegmentMock_Segment1,
    ];

    mount(
      <MockedProvider mocks={nextSegmentMocks} addTypename={true}>
        <MemoryRouter>
          <Provider>
            <Game />
          </Provider>
          </MemoryRouter>
        </MockedProvider>
    );

    // Intercept the audio request
    cy.intercept('GET', 'https://freesound.org/apiv2/sounds/660335?token=*', {
      fixture: 'audio_data.json'
    }).as('getSoundData');

    // Stub the Audio constructor and its play method
    cy.window().then((win) => {
      cy.stub(win, 'Audio').returns({
        play: cy.stub().as('audioPlay'),
        pause: cy.stub().as('audioPause'),
        currentTime: 0,
      });
    });

    // Click the first choice button to go to the next segment
    cy.get('button').contains('Feel around the room for anything useful').click();

    // Wait for the sound data to be fetched and played
    cy.wait('@getSoundData');
    cy.get('@audioPlay').should('have.been.calledOnce');

    // Check if the background image is updated
    cy.get('[data-testid="game-background"]').should('have.css', 'background-image').and('contain', 'stone_floor.webp');

    // Check if the new story segment text is displayed
    cy.get('p').contains('You find a loose stone on the floor. It\'s surprisingly sharp.').should('exist');

    // Check if inventory and stats are updated
    cy.get('p').contains('Sharp Stone (1)').should('exist');
    cy.get('p').contains('Dexterity (11)').should('exist');
  })

  it('should navigate through segments and end with "You Lose!"', () => {
    const endingMocks = [
      meQueryMockInitial,
      getStorySegmentMock_Segment0,
      choosePathMock_Segment0,
      meQueryMock_Segment1,
      getStorySegmentMock_Segment1,
      choosePathMock_Segment1,
      meQueryMock_Segment2_Lose,
      getStorySegmentMock_Segment2_Lose,
    ];

    mount(
      <MockedProvider mocks={endingMocks} addTypename={true}>
        <MemoryRouter>
          <Provider>
            <Game />
          </Provider>
          </MemoryRouter>
        </MockedProvider>
    );

    // Intercept the audio request
    cy.intercept('GET', 'https://freesound.org/apiv2/sounds/660335?token=*', {
      fixture: 'audio_data.json'
    }).as('getSoundData');

    // Stub the Audio constructor and its play method
    cy.window().then((win) => {
      cy.stub(win, 'Audio').returns({
        play: cy.stub().as('audioPlay'),
        pause: cy.stub().as('audioPause'),
        currentTime: 0,
      });
    });

    // Initial segment loads and user selects an option
    cy.get('p').contains('You wake up in a dark, cold cell. Your head throbs, and you can barely remember anything. What do you do?').should('exist');
    cy.get('button').contains('Feel around the room for anything useful').click();

    // Next segment loads and user selects an option
    cy.get('p').contains('You find a loose stone on the floor. It\'s surprisingly sharp.').should('exist');
    cy.get('button').contains('Examine the stone more closely').click();

    // Ending segment loads and user has lost
    cy.get('p').contains('The lock is too tough. You\'ve been caught!').should('exist');
  })
})