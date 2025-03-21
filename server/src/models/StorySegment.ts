import mongoose, { Schema, Document } from 'mongoose';

interface Choice {
    text: string;
    nextSegmentId: number | null;
    effects?: {
        inventory?: { [key: string]: number };
        stats?: { [key: string]: number };
    };
}

interface IStorySegment extends Document {
    segmentId: number;
    text: string;
    choices: Choice[];
    ending?: boolean;
    win?: boolean;
    loss?: boolean;
}

const storySegmentSchema: Schema = new Schema({
    segmentId: { type: Number, required: true, unique: true },
    text: { type: String, required: true },
    choices: [
        {
        text: { type: String, required: true },
        nextSegmentId: { type: Schema.Types.ObjectId, ref: 'StorySegment', required: true },
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