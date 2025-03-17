import mongoose from 'mongoose';
import { StorySegment } from '../models/index.js';
import db from '../config/connection.js';
import dotenv from 'dotenv';

dotenv.config();

const seedDB = async () => {
    try {
        await db();

        await StorySegment.deleteMany({});

        const storySegments = [
            { // Start
                _id: new mongoose.Types.ObjectId(),
                segmentId: 0,
                text: 'You wake up in a dark, cold cell. Your head throbs, and you can barely remember anything. What do you do?',
                choices: [
                    {
                        text: 'Feel around the room for anything useful',
                        nextSegmentId: 1,
                        effects: { inventory: { "Loose Stone": 1 }, stats: { Dexterity: 1 } },
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
    }
};