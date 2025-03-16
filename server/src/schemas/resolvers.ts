import { User, StorySegment } from '../models/index.js';
import { signToken, AuthenticationError } from '../utils/auth.js';

interface CreateUserArgs {
  input: {
    username: string;
    email: string;
    password: string;
  }
}

interface LoginArgs {
  email: string;
  password: string;
}

interface UserArgs {
  id: string;
}

const resolvers = {
  Query: {
    me: async (_parent: any, _args: any, context: any) => {
      if (context.user) {
        return User.findOne({ _id: context.user._id });
      }
      throw new AuthenticationError('You need to be logged in!');
    },
    getStorySegment: async (_parent: any, { id }: UserArgs) => {
      return StorySegment.findById(id);
    },
  },
  Mutation: {
    createUser: async (_parent: any, { input }: CreateUserArgs) => {
      const user = await User.create({ ...input });
      const token = signToken(user.username, user.email, user._id);
      
      return { token, user };
    },
    login: async (_parent: any, { email, password }: LoginArgs) => {
      const user = await User.findOne({ email });

      if (!user) {
        throw new AuthenticationError('Incorrect credentials');
      }

      const correctPw = await user.comparePassword(password);

      if (!correctPw) {
        throw new AuthenticationError('Could not authenticate user');
      }

      const token = signToken(user.username, user.email, user._id);

      return { token, user };
    },
    choosePath: async (_parent: any, { segmentId, choiceIndex }: any, context: any) => {
      if (context.user) {
        const segment = await StorySegment.findById(segmentId);
        
        if (!segment) {
          throw new Error('Segment not found');
        }
        const choice = segment.choices[choiceIndex];
        const nextSegment = await StorySegment.findById(choice.nextSegmentId);

        if (choice.effects) {
          if (choice.effects.inventory) {
            for (const [key, value] of Object.entries(choice.effects.inventory)) {
              context.user.inventory[key] += value;
            }
          }
          if (choice.effects.stats) {
            for (const [key, value] of Object.entries(choice.effects.stats)) {
              context.user.stats[key] += value;
            }
          }
        }

        return nextSegment;
      }
      throw new AuthenticationError('You need to be logged in!');
    },
  },
};

export default resolvers;