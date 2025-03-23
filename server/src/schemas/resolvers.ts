import mongoose from 'mongoose';
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

interface StorySegmentArgs {
  segmentId: number;
}

interface ChoosePathArgs {
  segmentId: number;
  choiceIndex: number;
}

interface AuthContext {
  user?: {
    _id: mongoose.Types.ObjectId;
    username: string;
    email: string;
    wins: number;
    losses: number;
    inventory?: { [key: string]: number };
    stats?: { [key: string]: number };
  }
}

const resolvers = {
  Query: {
    me: async (_parent: any, _args: any, context: AuthContext) => {
      if (context.user) {
        return User.findOne({ _id: context.user._id });
      }
      throw new AuthenticationError('You need to be logged in!');
    },
    getStorySegment: async (_parent: any, { segmentId }: StorySegmentArgs) => {
      return StorySegment.findOne({ segmentId });
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
    choosePath: async (_parent: any, { segmentId, choiceIndex }: ChoosePathArgs, context: AuthContext) => {
      if (context.user) {
        const segment = await StorySegment.findOne({ segmentId });
        
        if (!segment) {
          throw new Error('Segment not found');
        }
        const choice = segment.choices[choiceIndex];
        const nextSegment = await StorySegment.findOne({ segmentId: choice.nextSegmentId });

        if (choice.effects) {
          const { inventory, stats } = choice.effects;

          if (inventory) {
            for (const [key, value] of Object.entries(inventory)) {
              if (context.user.inventory) {
                context.user.inventory[key] = (context.user.inventory[key] || 0) + value;
              } else {
                context.user.inventory = { [key]: value };
              }
            }
          }

          if (stats) {
            for (const [key, value] of Object.entries(stats)) {
              if (context.user.stats) {
                context.user.stats[key] = (context.user.stats[key] || 0) + value;
              } else {
                context.user.stats = { [key]: value };
              }
            }
          }
        }
        await User.findByIdAndUpdate(context.user._id, { inventory: context.user.inventory, stats: context.user.stats });

        return nextSegment;
      }
      throw new AuthenticationError('You need to be logged in!');
    },
  },
};

export default resolvers;