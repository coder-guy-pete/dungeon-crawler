import { Schema, model, Document } from 'mongoose';
import bcrypt from 'bcrypt';

interface IUser extends Document {
    username: string;
    email: string;
    password?: string;
    inventory?: { [key: string]: number };
    stats?: { [key: string]: number };
    comparePassword(password: string): Promise<boolean>;
}

const userSchema = new Schema<IUser>({
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true, match: [/.+@.+\..+/, 'Must match an email address!'] },
    password: { type: String, required: true, minlength: 8 },
    inventory: { type: Schema.Types.Mixed },
    stats: { type: Schema.Types.Mixed },
});

userSchema.pre<IUser>('save', async function (next) {
    if (this.isNew || this.isModified('password')) {
        const saltRounds = 10;
        this.password = await bcrypt.hash(this.password as string, saltRounds);
    }

    next();
});

userSchema.methods.comparePassword = async function (password: string): Promise<boolean> {
    return bcrypt.compare(password, this.password as string);
};

export default model<IUser>('User', userSchema);