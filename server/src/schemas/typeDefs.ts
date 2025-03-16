const typeDefs = `
  type StorySegment {
    id: ID!
    text: String!
    choices: [Choice!]!
    ending: Boolean
  }

  type Choice {
    text: String!
    nextSegmentId: ID!
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
    inventory: JSON
    stats: JSON
  }

  type Auth {
    token: String!
    user: User!
  }

  scalar JSON

  type Query {
    getStorySegment(id: ID!): StorySegment
    me: User
  }

  type Mutation {
    createUser(username: String!, email: String!, password: String!): Auth
    login(email: String!, password: String!): Auth
    choosePath(segmentId: ID!, choiceIndex: Int!): StorySegment
  }
`;

export default typeDefs;
