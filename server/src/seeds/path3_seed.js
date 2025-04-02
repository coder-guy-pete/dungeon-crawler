import mongoose from "mongoose";

export const path3Segments = [
    {
        _id: new mongoose.Types.ObjectId(),
        segmentId: 3,
        text: "Your shouts echo through the dungeon. A guard appears at your cell door, looking angry. 'Silence!' he yells. What do you do?",
        choices: [
            {
                text: "Try to reason with the guard, explaining your situation.",
                nextSegmentId: 67,
                effects: { stats: { Charm: 1, Luck: -1 } },
                soundEffect: '641692',
            },
            {
                text: "Continue yelling, demanding to know why you're imprisoned.",
                nextSegmentId: 88,
                effects: { stats: { Strength: -1, Charm: -2 } },
                soundEffect: '493918',
            },
        ],
        ending: false,
        win: false,
        loss: false,
        backgroundImage: "./imgs/guard_grinning.png",
    },
    {
        _id: new mongoose.Types.ObjectId(),
        segmentId: 88,
        text: "You continue yelling, demanding answers. The guard's face turns red with anger. He unlocks the cell door and steps inside, grabbing you roughly. 'You want answers? I'll give you answers!' he growls. What do you do?",
        choices: [
            {
                text: "Try to fight back, despite being unarmed.",
                nextSegmentId: 89,
                effects: { stats: { Strength: 1, Luck: -2, HP: -20 } },
                soundEffect: '493918',
            },
            {
                text: "Try to reason with him again, even though he's clearly enraged.",
                nextSegmentId: 90,
                effects: { stats: { Charm: 1, Luck: -1 } },
                soundEffect: '493918',
            },
        ],
        ending: false,
        win: false,
        loss: false,
        backgroundImage: "./imgs/guard_grinning.png",
    },
    {
        _id: new mongoose.Types.ObjectId(),
        segmentId: 89,
        text: "You try to fight back, but the guard is stronger and more experienced. He easily overpowers you, throwing you to the ground. 'You should have listened,' he says, before kicking you in the stomach, breaking three of your ribs. He leaves you there in that cold dark cell, bleeding and in pain. What do you do?",
        choices: [
            {
                text: "Try to recover, and prepare for his return.",
                nextSegmentId: 61,
                effects: { stats: { Strength: -1 } },
                soundEffect: '493918',
            },
            {
                text: "Give up hope, and accept your fate.",
                nextSegmentId: 91,
                effects: { loss: true },
                soundEffect: '588284',
            }
        ],
        ending: false,
        win: false,
        loss: false,
        backgroundImage: "./imgs/guard_over_prisoner.png",
    },
    {
        _id: new mongoose.Types.ObjectId(),
        segmentId: 90,
        text: "You insist on knowing more, despite his warning. The guard sighs, clearly annoyed. 'You'll know soon enough,' he says. 'Now be quiet.' He leaves, slamming the door shut. What do you do?",
        choices: [
            {
                text: "Look around the cell for anything that might help you escape.",
                nextSegmentId: 1,
                effects: { stats: { Dexterity: 2, Luck: -1 } },
                soundEffect: '639086',
            },
            {
                text: "Wait and see what happens next.",
                nextSegmentId: 61,
                effects: { stats: { Wisdom: 1 } },
                soundEffect: '403184',
            },
        ],
        ending: false,
        win: false,
        loss: false,
        backgroundImage: "./imgs/guard_grinning.png",
    },
    {
        _id: new mongoose.Types.ObjectId(),
        segmentId: 91,
        text: "You give up hope, resigning yourself to your fate. The next day, the guard returns, dragging you out of the cell. 'Time to meet the king,' he says, a cruel smile on his face. You're taken to the throne room, where the king awaits. 'This is the one who dared to defy me,' the guard says, pushing you to your knees. The king looks down at you, his eyes cold and calculating. 'You will pay for your insolence,' he says. You are executed on the spot. Game over.",
        choices: [
            {
                text: "You Lose!",
                nextSegmentId: 0,
                effects: {},
                soundEffect: '533034',
            },
        ],
        ending: true,
        win: false,
        loss: true,
        backgroundImage: "./imgs/game_over.png",
    }
];