import mongoose from 'mongoose';
import { StorySegment } from '../models/index.js';
import db from '../config/connection.js';
import dotenv from 'dotenv';
import { path1Segments } from './path1_seed.js';
import { path2Segments } from './path2_seed.js';
import { path3Segments } from './path3_seed.js';

dotenv.config();

interface Choice {
    text: string;
    nextSegmentId: number | null;
    effects?: {
        inventory?: { [key: string]: number };
        stats?: { [key: string]: number }
    }
};

interface IStorySegment {
    _id: mongoose.Types.ObjectId;
    segmentId: number;
    text: string;
    choices: Choice[];
    ending?: boolean;
    win?: boolean;
    loss?: boolean;
}

const seedDB = async () => {
    try {
        await db();

        await StorySegment.deleteMany({});

        const baseStorySegment: IStorySegment[] = [
            { // Start
                _id: new mongoose.Types.ObjectId(),
                segmentId: 0,
                text: 'You wake up in a dark, cold cell. Your head throbs, and you can barely remember anything. What do you do?',
                choices: [
                    {
                        text: 'Feel around the room for anything useful',
                        nextSegmentId: 1,
                        effects: { inventory: { "Sharp Stone": 1 }, stats: { Dexterity: 1 } },
                    },
                    {
                        text: 'Try to calm down and wait for your eyes to adjust',
                        nextSegmentId: 2,
                        effects: { stats: { Wisdom: 1 } },
                    },
                    {
                        text: 'Panic and start yelling for help!!',
                        nextSegmentId: 3,
                        effects: { stats: { Charm: -1 } },
                    }
                ],
                ending: false,
                win: false,
                loss: false,
            },
        ];
        const allSegments = baseStorySegment.concat(path1Segments, path2Segments, path3Segments);
        await StorySegment.insertMany(allSegments);

        console.log('Data imported successfully');
        process.exit(0);
    } catch (error) {
        console.error('Error importing data:', error);
        process.exit(1);
    }
};

seedDB();