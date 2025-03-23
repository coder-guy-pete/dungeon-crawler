import mongoose from "mongoose";

export const path2Segments = [
    {
        _id: new mongoose.Types.ObjectId(),
        segmentId: 2,
        text: "As your eyes adjust, you notice a faint sliver of light coming from under the door. You also hear the distant sound of footsteps. What do you do?",
        choices: [
            {
                text: "Carefully approach the door and try to peek under it.",
                nextSegmentId: 62,
                effects: { stats: { Dexterity: 1, Wisdom: 1 } },
            },
            {
                text: "Stay quiet and listen to the footsteps, trying to determine their direction.",
                nextSegmentId: 63,
                effects: { stats: { Wisdom: 2 } },
            },
        ],
        ending: false,
        win: false,
        loss: false,
    },
    {
        _id: new mongoose.Types.ObjectId(),
        segmentId: 62,
        text: "You carefully approach the door and peek under it. You see a dimly lit hallway and a guard walking past. What do you do?",
        choices: [
            {
                text: "Wait for the guard to pass and then try to open the door.",
                nextSegmentId: 64,
                effects: {},
            },
            {
                text: "Try to get the guard's attention without making too much noise.",
                nextSegmentId: 65,
                effects: { stats: { Charm: 1, Luck: -1 } },
            },
        ],
        ending: false,
        win: false,
        loss: false,
    },
    {
        _id: new mongoose.Types.ObjectId(),
        segmentId: 63,
        text: "You listen carefully to the footsteps. They seem to be coming from down the hallway, moving away from your cell. What do you do?",
        choices: [
            {
                text: "Wait a few moments and then try to open the door.",
                nextSegmentId: 64,
                effects: {},
            },
            {
                text: "Try to find something in the cell that you can use as a weapon.",
                nextSegmentId: 66,
                effects: { inventory: { "Makeshift Weapon": 1 }, stats: { Strength: 1 } },
            },
        ],
        ending: false,
        win: false,
        loss: false,
    },
    {
        _id: new mongoose.Types.ObjectId(),
        segmentId: 64,
        text: "You try to open the door, but it's locked. What do you do?",
        choices: [
            {
                text: "Try to find something in the cell that you can use as a weapon.",
                nextSegmentId: 66,
                effects: { stats: { Strength: 1 } },
            },
            {
                text: "Feel around the room for anything useful.",
                nextSegmentId: 1,
                effects: { stats: { Dexterity: 1 } },
            },
        ],
        ending: false,
        win: false,
        loss: false,
    },
    {
        _id: new mongoose.Types.ObjectId(),
        segmentId: 65,
        text: "You try to get the guard's attention without making too much noise. He turns and looks directly at you. What do you do?",
        choices: [
            {
                text: "Try to explain your situation and ask for help.",
                nextSegmentId: 67,
                effects: { stats: { Charm: 1, Luck: -2 } },
            },
            {
                text: "Instigate a fight with the guard.",
                nextSegmentId: 68,
                effects: { stats: { Strength: 1 } },
            },
        ],
        ending: false,
        win: false,
        loss: false,
    },
    {
        _id: new mongoose.Types.ObjectId(),
        segmentId: 66,
        text: "You find a loose metal bar on the floor. It looks like it could be used as a weapon. You grab it. What do you do?",
        choices: [
            {
                text: "Wait for the guard to return and then try to use the bar to defend yourself.",
                nextSegmentId: 69,
                effects: { inventory: { "Metal Bar": 1 }, stats: { Strength: 2 } },
            },
            {
                text: "Try to use the bar to pry open the door.",
                nextSegmentId: 70,
                effects: {},
            },
        ],
        ending: false,
        win: false,
        loss: false,
    },
    {
        _id: new mongoose.Types.ObjectId(),
        segmentId: 67,
        text: "You try to explain your situation to the guard. After a long pause, he begins to laugh menacingly. `You think I'm going to help you? You're in no position to make demands. Tomorrow you will meet your fate.` What do you do?",
        choices: [
            {
                text: "Wait for the guard to leave and then look around the room for another way out.",
                nextSegmentId: 1,
                effects: { stats: { Wisdom: 1 } },
            },
            {
                text: "Instigate a fight with the guard.",
                nextSegmentId: 68,
                effects: { stats: { Strength: 1 } },
            },
        ],
        ending: false,
        win: false,
        loss: false,
    },
    {
        _id: new mongoose.Types.ObjectId(),
        segmentId: 68,
        text: "You spit in the guard's face and call him all sorts of profanities. He looks at you with a mix of anger and amusement. `You're going to regret that, scum.` What do you do?",
        choices: [
            {
                text: "Continue to provoke the guard.",
                nextSegmentId: 71,
                effects: { stats: { Strength: 2, Luck: -1, HP: -10 } },
            },
            {
                text: "Try to reason with the guard.",
                nextSegmentId: 67,
                effects: { stats: { Charm: 2, Luck: -2 } },
            },
        ],
        ending: false,
        win: false,
        loss: false,
    },
    {
        _id: new mongoose.Types.ObjectId(),
        segmentId: 69,
        text: "The guard returns and is peering through the small window in the door, but hasn't opened it yet. What do you do?",
        choices: [
            {
                text: "Hide in shadows and wait for the guard to open the door.",
                nextSegmentId: 72,
                effects: { stats: { Wisdom: 1 } },
            },
            {
                text: "Provoke the guard to open the door.",
                nextSegmentId: 73,
                effects: { stats: { Strength: 1 } },
            },
        ],
        ending: false,
        win: false,
        loss: false,
    },
    {
        _id: new mongoose.Types.ObjectId(),
        segmentId: 70,
        text: "After several attempts, you manage to pry open the door. What do you do?",
        choices: [
            {
                text: "Slowly open the door and sneak out into the hallway.",
                nextSegmentId: 6,
                effects: {},
            },
            {
                text: "Burst out of the cell, ready for a fight.",
                nextSegmentId: 7,
                effects: { stats: { Strength: 1 } },
            },
        ],
        ending: false,
        win: false,
        loss: false,
    },
    {
        _id: new mongoose.Types.ObjectId(),
        segmentId: 71,
        text: "I've had just about enough of you, scum! The guard opens the door and quickly subdues you. You're lying on the floor of the cell bloody and bruised. The guard, satisfied with his work, is ready to leave you there. What do you do?",
        choices: [
            {
                text: `"Is that all you've got?" you manage to say through strained breaths.`,
                nextSegmentId: 74,
                effects: { stats: { Charm: 1, HP: -10 } },
            },
            {
                text: "Accept your fate and wait for the guard to leave.",
                nextSegmentId: 61,
                effects: {},
            },
        ],
        ending: false,
        win: false,
        loss: false,
    },
    {
        _id: new mongoose.Types.ObjectId(),
        segmentId: 72,
        text: "The guard opens the door and cautiously enters the room, looking around. What do you do?",
        choices: [
            {
                text: "Wait for the guard to turn his back and then attack him.",
                nextSegmentId: 75,
                effects: { stats: { Strength: 2 } },
            },
            {
                text: "Charge at the guard and try to overpower him.",
                nextSegmentId: 76,
                effects: { stats: { Strength: 1 } },
            },
        ],
        ending: false,
        win: false,
        loss: false,
    },
    {
        _id: new mongoose.Types.ObjectId(),
        segmentId: 73,
        text: "You start yelling and banging on the door, demanding the guard to open it. He seems annoyed and opens the door. What do you do?",
        choices: [
            {
                text: "Try to overpower the guard and escape.",
                nextSegmentId: 76,
                effects: { stats: { Strength: 1 } },
            },
        ],
        ending: false,
        win: false,
        loss: false,
    },
    {
        _id: new mongoose.Types.ObjectId(),
        segmentId: 74,
        text: `The guard looks at you with anger and frustration. But then, a disturbing smile appears on his face. As if a he just had the best idea. "We were supposed to leave you till morning, but I think I'll have some fun with you now.". The guard binds your hands and your feet and drags you out of your cell and down the hallway.`,
        choices: [
            {
                text: "it's too late to fight back now. You'll have to wait for another opportunity.",
                nextSegmentId: 77,
                effects: {},
            }
        ],
        ending: false,
        win: false,
        loss: false,
    },
    {
        _id: new mongoose.Types.ObjectId(),
        segmentId: 75,
        text: "You wait for the guard to turn his back and then attack him. You manage to overpower him and knock him out. What do you do?",
        choices: [
            {
                text: "Take the guard's keys and try to find a way out.",
                nextSegmentId: 6,
                effects: { inventory: { "Guard's Keys": 1 }, stats: { Strength: 2 } },
            },
        ],
        ending: false,
        win: false,
        loss: false,
    },
    {
        _id: new mongoose.Types.ObjectId(),
        segmentId: 76,
        text: "You charge at the guard and try to overpower him. The guard is taken by surprise for a moment, but quickly regains his composure and subdues you. What do you do?",
        choices: [
            {
                text: "Accept your fate and wait for the guard to leave.",
                nextSegmentId: 61,
                effects: {},
            },
            {
                text: "Try to reason with the guard.",
                nextSegmentId: 67,
                effects: { stats: { Charm: 2, Luck: -2 } },
            },
        ],
        ending: false,
        win: false,
        loss: false,
    },
    {
        _id: new mongoose.Types.ObjectId(),
        segmentId: 77,
        text: "The guard takes you down winding hallways and stairs, until you reach a dimly lit room. There are other prisoners here, some of them look at you with pity, others with fear. The guard throws you on the ground and leaves, locking the door behind him. What do you do?",
        choices: [
            {
                text: "Try to talk to the other prisoners and gather information.",
                nextSegmentId: 78,
                effects: { stats: { Charm: 1 } },
            },
            {
                text: "Look around the room for anything useful.",
                nextSegmentId: 79,
                effects: { stats: { Dexterity: 1 } },
            },
        ],
        ending: false,
        win: false,
        loss: false,
    },
    {
        _id: new mongoose.Types.ObjectId(),
        segmentId: 78,
        text: "You approach the prisoners, trying to project an air of confidence you don't feel. They tell you this place is a forgotten holding cell, meant for those the castle wants to 'disappear'. They speak of a desperate plan to break free.",
        choices: [
            {
                text: "Join their prison break effort, and work together.",
                nextSegmentId: 80,
                effects: { stats: { Charm: 2 } },
            },
            {
                text: "Listen to their plan, but plot your own escape using their chaos as a cover.",
                nextSegmentId: 81,
                effects: { stats: { Wisdom: 1 } },
            },
        ],
        ending: false,
        win: false,
        loss: false,
    },
    {
        _id: new mongoose.Types.ObjectId(),
        segmentId: 79,
        text: "You search the room. You find a loose stone in the wall, and a few rusted metal scraps. With some effort, you can turn these into crude tools.",
        choices: [
            {
                text: "Use the tools to aid the prisoners in their escape.",
                nextSegmentId: 80,
                effects: { inventory: { "Crude Tools": 1 }, stats: { Dexterity: 2 } },
            },
            {
                text: "Keep the tools hidden, and use them for your own escape attempt.",
                nextSegmentId: 81,
                effects: { inventory: { "Crude Tools": 1 }, stats: { Dexterity: 1, Wisdom: 1 } },
            },
        ],
        ending: false,
        win: false,
        loss: false,
    },
    {
        _id: new mongoose.Types.ObjectId(),
        segmentId: 80,
        text: "You join the prisoners' plan. You work together, using your combined strength and skills to create a diversion and break down a weak section of the wall. The chaos erupts as you and the others flood the castle hallways.",
        choices: [
            {
                text: "Lead the prisoners in a loud, coordinated escape, using the chaos to your advantage.",
                nextSegmentId: 82,
                effects: { stats: { Charm: 2, Strength: 1 } },
            },
            {
                text: "The chaos is too much. Try to find a way out on your own.",
                nextSegmentId: 83,
                effects: { stats: { Wisdom: -1, Dexterity: 1 } },
            },
        ],
        ending: false,
        win: false,
        loss: false,
    },
    {
        _id: new mongoose.Types.ObjectId(),
        segmentId: 81,
        text: "You listen to the prisoners' plan, but you see it as a chance to slip away unnoticed. You prepare to use the confusion as a cover.",
        choices: [
            {
                text: "Wait for the right moment, and then slip away from the group.",
                nextSegmentId: 84,
                effects: { stats: { Dexterity: 2, Luck: 1 } },
            },
            {
                text: "Change your mind, and help the other prisoners escape.",
                nextSegmentId: 82,
                effects: { stats: { Charm: 1 } },
            },
        ],
        ending: false,
        win: false,
        loss: false,
    },
    {
        _id: new mongoose.Types.ObjectId(),
        segmentId: 82,
        text: "You lead the prisoners in a loud, coordinated escape. The guards are overwhelmed, and you manage to make it to the castle gates. Many of the other prisoners have died to make it this far. What do you do?",
        choices: [
            {
                text: "Continue onward, you're almost free!",
                nextSegmentId: 85,
                effects: { stats: { Charm: 3 }, win: true },
            },
            {
                text: "The guards are starting to regroup. Leave the other prisoners, and make your own escape.",
                nextSegmentId: 83,
                effects: { stats: { Wisdom: -1, Dexterity: 1 } },
            },
        ],
        ending: false,
        win: true,
        loss: false,
    },
    {
        _id: new mongoose.Types.ObjectId(),
        segmentId: 83,
        text: "The chaos is intense. You try to slip away, but the guards are closing in. You did not anticipate the level of security in the castle and are ill prepared for a solo escape. Without you leading them, the other prisoners are quickly captured and you are discovered shortly after that. You are dragged back to the cell. Game over.",
        choices: [
            {
                text: 'End Game.',
                nextSegmentId: null,
                effects: {},
            },
        ],
        ending: true,
        win: false,
        loss: true,
    },
    {
        _id: new mongoose.Types.ObjectId(),
        segmentId: 84,
        text: "After waiting for the right moment, you slip away from the group unnoticed. You manage to make it to a guard tower that appears to exit the castle and it seems completely deserted. All of the guards seem preoccupied at the main gate subduing the other prisoners. What do you do?",
        choices: [
            {
                text: "Make a run for it and try to escape through the guard tower.",
                nextSegmentId: 86,
                effects: { stats: { Dexterity: 2, Luck: 1 } },
            },
            {
                text: "Go back and help the other prisoners escape.",
                nextSegmentId: 87,
                effects: { stats: { Charm: 1 } },
            },
        ],
        ending: false,
        win: false,
        loss: false,
    },
    {
        _id: new mongoose.Types.ObjectId(),
        segmentId: 85,
        text: "You press through the castle gates, overwhelming the guards with your determination and the chaos of the escape. You and a handful of other prisoners make it to the forest beyond the castle walls. You are free. Congratulations, you have escaped the castle!",
        choices: [
            {
                text: 'End Game.',
                nextSegmentId: null,
                effects: {},
            },
        ],
        ending: true,
        win: true,
        loss: false,
    },
    {
        _id: new mongoose.Types.ObjectId(),
        segmentId: 86,
        text: "You make a run for it, and manage to escape through the guard tower. You find yourself in the forest beyond the castle walls. You are free, but at the cost of leaving abandoning the other prisoners. Congratulations, you have escaped the castle!",
        choices: [
            {
                text: 'End Game.',
                nextSegmentId: null,
                effects: {},
            },
        ],
        ending: true,
        win: true,
        loss: false,
    },
    {
        _id: new mongoose.Types.ObjectId(),
        segmentId: 87,
        text: "You try to go back and help the other prisoners escape, but the guards have already regrouped and are on high alert. You are quickly captured and dragged back to the cell. Game over.",
        choices: [
            {
                text: 'End Game.',
                nextSegmentId: null,
                effects: {},
            },
        ],
        ending: true,
        win: false,
        loss: true,
    },
];