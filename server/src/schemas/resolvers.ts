import { UserInputError } from 'apollo-server-express';
import { User, StorySegment } from '../models/index.js';
import { signToken, AuthenticationError } from '../utils/auth.js';

interface ChoiceArgs {
  text: string;
  nextSegmentId: string;
  effects?: {
    inventory?: { [key: string]: number };
    stats?: { [key: string]: number };
  };
}

interface StorySegmentArgs {
  id: string;
  text: string;
  choices: ChoiceArgs[];
  ending?: boolean;
}

interface ChoosePathArgs {
  segmentId: string;
  choiceIndex: number;
}

interface UserArgs {
  username: string;
  email: string;
  password: string;
  inventory?: { [key: string]: number };
  stats?: { [key: string]: number };
}

interface Auth {
  token: string;
  user: typeof User;
}

interface AuthContext {
  user?: typeof User;
}

const resolvers = {
    Query: {
      getStorySegment: async (_: any, { id }: { id: string }): Promise<IStorySegment | null> => {
        return await StorySegment.findById(id);
      },
      me: async (_: any, __: any, context: any): Promise<IUser | null> => {
        if (context.user) {
          return await User.findById(context.user._id);
        }
        throw new AuthenticationError('Not logged in');
      },
    },
    Mutation: {
      createUser: async (_: any, { username, email, password }: any) => {
        const user = await User.create({ username, email, password });
        const token = signToken(user.username, user.email, user._id);
        return { token, user };
      },
      login: async (_: any, { email, password }: any): Promise<Auth> => {
        const user = await User.findOne({ email });
        if (!user) {
          throw new AuthenticationError('Incorrect credentials');
        }
        const correctPw = await user.comparePassword(password);
        if (!correctPw) {
          throw new AuthenticationError('Incorrect credentials');
        }
        const token = signToken(user.username, user.email, user._id);
        return { token, user };
      },
      choosePath: async (_: any, { segmentId, choiceIndex }: ChoosePathArgs, context: any): Promise<IStorySegment | null> => {
        if (!context.user) {
          throw new AuthenticationError('Not logged in');
        }
        const currentSegment = await StorySegment.findById(segmentId);
        if (!currentSegment || !currentSegment.choices[choiceIndex]) {
          throw new UserInputError('Invalid segment or choice');
        }
        const choice = currentSegment.choices[choiceIndex];
        const nextSegment = await StorySegment.findById(choice.nextSegmentId);
        if (!nextSegment) {
          throw new UserInputError('Invalid next segment ID');
        }
        if (choice.effects) {
          const user = await User.findById(context.user._id);
          if (user) {
            if (choice.effects.inventory) {
              for (const item in choice.effects.inventory) {
                if (user.inventory && user.inventory[item]) {
                  user.inventory[item] += choice.effects.inventory[item];
                } else if (user.inventory) {
                  user.inventory[item] = choice.effects.inventory[item];
                } else {
                  user.inventory = {[item]: choice.effects.inventory[item]};
                }
              }
            }
            if (choice.effects.stats) {
              for (const stat in choice.effects.stats) {
                if (user.stats && user.stats[stat]) {
                  user.stats[stat] += choice.effects.stats[stat];
                } else if (user.stats) {
                  user.stats[stat] = choice.effects.stats[stat];
                } else {
                  user.stats = {[stat]: choice.effects.stats[stat]};
                }
              }
            }
  
            await user.save();
          }
        }
  
        return nextSegment;
      },
    },
  };
  
  export default resolvers;