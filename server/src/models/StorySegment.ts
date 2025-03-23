import mongoose, { Schema, Document } from 'mongoose';

interface Choice {
    text: string;
    nextSegmentId: number | null;
    effects?: {
        inventory?: { [key: string]: number };
        stats?: {
            HP?: number;
            Strength?: number;
            Dexterity?: number;
            Wisdom?: number;
            Charm?: number;
            Luck?: number;
        };
    };
}

interface IStorySegment extends Document {
    _id: mongoose.Types.ObjectId;
    segmentId: number;
    text: string;
    choices: Choice[];
    ending?: boolean;
    win?: boolean;
    loss?: boolean;
}

const storySegmentSchema: Schema = new Schema({
    _id: { type: Schema.Types.ObjectId, required: true },
    segmentId: { type: Number, required: true, unique: true },
    text: { type: String, required: true },
    choices: [
        {
        text: { type: String, required: true },
        nextSegmentId: { type: Number, required: true },
        effects: {
            inventory: { type: Schema.Types.Mixed },
            stats: { type: Schema.Types.Mixed },
        },
        },
    ],
    ending: { type: Boolean, default: false },
    win: { type: Boolean, default: false },
    loss: { type: Boolean, default: false },
});

export default mongoose.model<IStorySegment>('StorySegment', storySegmentSchema);