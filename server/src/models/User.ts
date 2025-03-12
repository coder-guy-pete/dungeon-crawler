// server/src/models/User.ts
import mongoose, { Schema, Document } from 'mongoose';
import bcrypt from 'bcrypt';

interface UserDocument extends Document {
    username: string;
    email: string;
    password?: string;
    inventory?: { [key: string]: number };
    stats?: { [key: string]: number };
    comparePassword(password: string): Promise<boolean>;
}

const userSchema: Schema = new Schema({
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    inventory: { type: Schema.Types.Mixed },
    stats: { type: Schema.Types.Mixed },
});

userSchema.pre<UserDocument>('save', async function (next) {
    if (!this.isModified('password')) return next();
    try {
        const salt = await bcrypt.genSalt(10);
        if (!this.password) {
            return next(new Error('Password is required'));
        }
        const hashedPassword = await bcrypt.hash(this.password, salt);
        this.password = hashedPassword;
        return next();
    } catch (err) {
        return next(err as Error);
    }
});

userSchema.methods.comparePassword = async function (password: string): Promise<boolean> {
    return bcrypt.compare(password, this.password as string);
};

export default mongoose.model<UserDocument>('User', userSchema);