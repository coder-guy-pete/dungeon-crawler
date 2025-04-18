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
    currentSegmentId: number;
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
    getSound: async (_parent: any, { soundQuery }: { soundQuery: string }) => {
      const apiKey = process.env.FREESOUND_API_KEY;
      if (!apiKey) {
        console.error('Freesound API key not configured on the server.');
        return null;
      }

      try {
        const response = await fetch(`https://freesound.org/apiv2/sounds/${soundQuery}/?token=${apiKey}`);
        const soundData = await response.json();
        if (soundData && soundData.previews) {
          return { url: soundData.previews['preview-hq-mp3'] };
        }
        return null;
      } catch (error) {
        console.error('Error fetching sound:', error);
        return null;
      }
    },
  },
  Mutation: {
    createUser: async (_parent: any, { input }: CreateUserArgs) => {
      const user = await User.create({ ...input,
        stats: {
          HP: 50,
          Strength: 4,
          Dexterity: 8,
          Wisdom: 5,
          Charm: 6,
          Luck: 8,
        },
      });

      const token = signToken(user.username, user.email, user._id as mongoose.Types.ObjectId);
      
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

      const token = signToken(user.username, user.email, user._id as mongoose.Types.ObjectId);

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

        let user = await User.findOne({ email: context.user.email });

        if (!user) {
          throw new Error('User not found');
        }

        if (choice.effects) {
          const { inventory, stats } = choice.effects;

          if (inventory) {
            for (const [key, value] of Object.entries(inventory)) {
              if (user.inventory && user.inventory[key]) {
                user.inventory[key] += value;
              } else {
                if (user.inventory) {
                  user.inventory[key] = value;
                } else {
                  user.inventory = { [key]: value };
                }
              }
            }
          }

          if (stats) {
            for (const [key, value] of Object.entries(stats)) {
              if (user.stats && user.stats[key]) {
                user.stats[key] += value;
              } else {
                if (user.stats) {
                  user.stats[key] = value;
                } else {
                  user.stats = { [key]: value };
                }
              }
            }
          }
        }

        if (choice.nextSegmentId) {
          user.currentSegmentId = choice.nextSegmentId
        }

        if (segment.win) {
          user.wins = Number(user.wins) + 1;
        }

        if (segment.loss) {
          user.losses = Number(user.losses) + 1;
        }

        await User.findOneAndUpdate({ email: context.user.email }, user);
        return nextSegment;
      }
      throw new AuthenticationError('You need to be logged in!');
    },
    resetGame: async (_parent: any, _args: any, context: AuthContext) => {
      if (context.user) {
        const user = await User.findOne({ email: context.user.email });

        if (!user) {
          throw new Error('User not found');
        }

        const reset = {
          stats: {
            HP: 50,
            Strength: 4,
            Dexterity: 8,
            Wisdom: 5,
            Charm: 6,
            Luck: 8,
          },
          inventory: {},
          currentSegmentId: 0,
        };

        const resetUser = await User.findOneAndUpdate({ email: context.user.email }, reset, { new: true });

        if (!resetUser) {
          throw new Error('Could not reset user');
        }
        return resetUser;
      }
      throw new AuthenticationError('You need to be logged in!');
    },
  },
};

export default resolvers;