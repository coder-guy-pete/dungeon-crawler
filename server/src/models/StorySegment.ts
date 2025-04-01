import mongoose, { Schema, Document } from 'mongoose';

interface Choice {
    text: string;
    nextSegmentId: number | null;
    effects?: {
        inventory?: { [key: string]: number };
        stats?: { [key: string]: number };
    },
    soundEffect?: string;
}

interface IStorySegment extends Document {
    _id: mongoose.Types.ObjectId;
    segmentId: number;
    text: string;
    choices: Choice[];
    ending?: boolean;
    win?: boolean;
    loss?: boolean;
    backgroundImage?: string;
}

const storySegmentSchema: Schema = new Schema({
    _id: { type: Schema.Types.ObjectId, required: true },
    segmentId: { type: Number, required: true, unique: true },
    text: { type: String, required: true },
    choices: [
        {
        text: { type: String, required: true },
        nextSegmentId: { type: Number },
        effects: {
            inventory: { type: Schema.Types.Mixed },
            stats: { type: Schema.Types.Mixed },
        },
        soundEffect: { type: String },
        },
    ],
    ending: { type: Boolean, default: false },
    win: { type: Boolean, default: false },
    loss: { type: Boolean, default: false },
    backgroundImage: { type: String },
    soundEffect: { type: String },
});

export default mongoose.model<IStorySegment>('StorySegment', storySegmentSchema);