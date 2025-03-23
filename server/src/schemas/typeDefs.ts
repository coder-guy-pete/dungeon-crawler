const typeDefs = `
  type StorySegment {
    id: ID!
    segmentId: Int!
    text: String!
    choices: [Choice!]!
    ending: Boolean
    win: Boolean
    loss: Boolean
  }

  type Choice {
    text: String!
    nextSegmentId: Int!
    effects: Effects
  }

  type Effects {
    inventory: JSON
    stats: JSON
  }

  type User {
    id: ID!
    username: String!
    email: String!
    password: String!
    wins: Int
    losses: Int
    currentSegmentId: Int!
    inventory: JSON
    stats: JSON
  }
  
  input UserInput {
    username: String!
    email: String!
    password: String!
  }

  type Auth {
    token: String!
    user: User!
  }

  scalar JSON

  type Query {
    getStorySegment(segmentId: Int!): StorySegment
    me: User
  }

  type Mutation {
    createUser(input: UserInput!): Auth
    login(email: String!, password: String!): Auth
    choosePath(segmentId: Int!, choiceIndex: Int!): StorySegment
    resetGame: User
  }
`;

export default typeDefs;
