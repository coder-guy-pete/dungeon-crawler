import mongoose from "mongoose";

const path1Segments = [
    { // Path 1: Feel around for anything useful
        _id: new mongoose.Types.ObjectId(),
        text: 'Your fingers brush against a loose stone in the wall. You manage to pry it loose. What do you do?',
        choices: [
            {
                text: 'Try to use the stone to pick the lock.',
                nextSegmentId: new mongoose.Types.ObjectId(),
                effects: { stats: { Dexterity: 2 } },
            },
            {
                text: 'Keep the stone as a potential weapon.',
                nextSegmentId: new mongoose.Types.ObjectId(),
                effects: { inventory: { "Sharp Stone": 1 } },
            },
        ],
        ending: false,
        win: false,
        loss: false,
    },
    { // Path 1.1: Using the stone to pick the lock
        _id: new mongoose.Types.ObjectId(),
        text: 'Using the sharp stone, you carefully work on the lock. After some time, you hear a click! The door is unlocked, but the stone gets jammed in the lock and is no longer of use to you. What do you do?',
        choices: [
            {
                text: 'Slowly open the door and sneak out.',
                nextSegmentId: new mongoose.Types.ObjectId(),
                effects: { inventory: { "Loose Stone": -1 }, stats: { Dexterity: 2, Luck: 1 } },
            },
            {
                text: 'Burst out of the cell, ready to fight.',
                nextSegmentId: new mongoose.Types.ObjectId(),
                effects: { stats: { Strength: 1, Luck: -1 } },
            },
        ],
        ending: false,
        win: false,
        loss: false,
    },
    { // Path 1.1.1: Slowly open the door and sneak out
        _id: new mongoose.Types.ObjectId(),
        text: "Very carefully, you open the door and creep into the hallway. It's dark and difficult to see. In one direction you see a faint light coming from around the bend of the hallway, in the other all you can see is total darkness. Which way do you go?",
        choices: [
            {
                text: 'Head towards the light.',
                nextSegmentId: new mongoose.Types.ObjectId(),
                effects: {},
            },
            {
                text: 'Head into the darkness.',
                nextSegmentId: new mongoose.Types.ObjectId(),
                effects: {},
            },
        ],
        ending: false,
        win: false,
        loss: false,
    },
    { // Path 1.1.1.1: Head towards the light
        _id: new mongoose.Types.ObjectId(),
        text: 'You make your way down the hallway towards the light. As you approach the bend, you hear voices. What do you do?',
        choices: [
            {
                text: 'Try to eavesdrop on the conversation.',
                nextSegmentId: new mongoose.Types.ObjectId(),
                effects: { stats: { Wisdom: 1 } },
            },
            {
                text: 'Quickly turn back and head into the darkness.',
                nextSegmentId: new mongoose.Types.ObjectId(),
                effects: { stats: { Dexterity: 1 } },
            },
        ],
        ending: false,
        win: false,
        loss: false,
    },
    { // Path 1.1.1.1.1: Eavesdrop
        _id: new mongoose.Types.ObjectId(),
        text: 'You carefully creep closer and listen. The voices are guards, discussing the prisoner who is to be executed in the morning. They mention a key hanging in the guard room. What do you do?',
        choices: [
            {
                text: 'Try to sneak into the guard room and steal the key.',
                nextSegmentId: new mongoose.Types.ObjectId(),
                effects: { stats: { Dexterity: 2, Luck: 1 } },
            },
            {
                text: 'Continue down the hallway, hoping to find another way out.',
                nextSegmentId: new mongoose.Types.ObjectId(),
                effects: {},
            },
        ],
        ending: false,
        win: false,
        loss: false,
    },
    { // Path 1.1.1.1.1.1: Steal the key
        _id: new mongoose.Types.ObjectId(),
        text: 'You carefully slip into the guard room. The guards are preoccupied. You spot the key and grab it. It seems to be a master key. What do you do?',
        choices: [
            {
                text: 'Try to unlock a nearby door.',
                nextSegmentId: new mongoose.Types.ObjectId(),
                effects: { inventory: { "Master Key": 1 } },
            },
            {
                text: 'Leave the guard room and continue down the hallway.',
                nextSegmentId: new mongoose.Types.ObjectId(),
                effects: {},
            },
        ],
        ending: false,
        win: false,
        loss: false,
    },
    { // Path 1.1.1.1.1.1.2: Continue down the hallway
        _id: new mongoose.Types.ObjectId(),
        text: "You leave the guard room and move further down the hallway. The light grows stronger. You reach a T intersection, to the right, you hear running water, and to the left, you see a wooden door.",
        choices: [
            {
                text: "Go Right towards the running water.",
                nextSegmentId: new mongoose.Types.ObjectId(),
                effects: {}
            },
            {
                text: "Go Left and through the wooden door.",
                nextSegmentId: new mongoose.Types.ObjectId(),
                effects: {}
            }
        ],
        ending: false,
        win: false,
        loss: false,
    },
    { // Path 1.1.1.1.1.1.2.2: Go Left and through the wooden door
        _id: new mongoose.Types.ObjectId(),
        text: "You use the master key to unlock a door. Inside, you find a dimly lit armory. Racks of weapons line the walls. What do you do?",
        choices: [
            {
                text: "Grab a sword.",
                nextSegmentId: new mongoose.Types.ObjectId(),
                effects: {inventory: {"Sword": 1}, stats: {Strength: 1}}
            },
            {
                text: "Search for a set of lockpicks.",
                nextSegmentId: new mongoose.Types.ObjectId(),
                effects: {inventory: {"Lockpicks": 1}, stats: {Dexterity: 1}}
            },
            {
                text: "Leave the armory and continue down the hallway.",
                nextSegmentId: new mongoose.Types.ObjectId(),
                effects: {}
            }
        ],
        ending: false,
        win: false,
        loss: false,
    },
    { // Path 1.1.1.1.1.1.2.2.1: Grab a sword
        _id: new mongoose.Types.ObjectId(),
        text: 'You heft the sword. It feels surprisingly well-balanced. With a weapon in hand, you feel more confident. What do you do?',
        choices: [
            {
                text: 'Carefully explore the rest of the armory.',
                nextSegmentId: new mongoose.Types.ObjectId(),
                effects: { stats: { Wisdom: 1 } },
            },
            {
                text: 'Leave the armory and continue down the hallway.',
                nextSegmentId: new mongoose.Types.ObjectId(),
                effects: {},
            },
        ],
        ending: false,
        win: false,
        loss: false,
    },
    { // Path 1.1.1.1.1.1.2.2.1.1: Carefully explore the rest of the armory
        _id: new mongoose.Types.ObjectId(),
        text: 'You search the armory thoroughly. You find a leather sheath for your sword and a small pouch containing a few coins. What do you do?',
        choices: [
            {
                text: 'Equip the sheath and pouch and leave the armory.',
                nextSegmentId: new mongoose.Types.ObjectId(),
                effects: { inventory: { "Leather Sheath": 1, "Coins": 3 } },
            },
            {
                text: 'Continue searching for more useful items.',
                nextSegmentId: new mongoose.Types.ObjectId(),
                effects: { stats: { Luck: -1 } },
            },
        ],
        ending: false,
        win: false,
        loss: false,
    },
    { // Path 1.1.1.1.1.1.2.2.1.1.2: Continue searching for more useful items
        _id: new mongoose.Types.ObjectId(),
        text: 'You rummage through the remaining crates and barrels, but find nothing of immediate use. Suddenly, you hear the sound of approaching footsteps. What do you do?',
        choices: [
            {
                text: 'Quickly hide behind a rack of weapons.',
                nextSegmentId: new mongoose.Types.ObjectId(),
                effects: { stats: { Dexterity: 2 } },
            },
            {
                text: 'Prepare to fight.',
                nextSegmentId: new mongoose.Types.ObjectId(),
                effects: { stats: { Strength: 1 } },
            },
        ],
        ending: false,
        win: false,
        loss: false,
    },
    { // Path 1.1.1.1.1.1.2.2.1.1.2.1: Quickly hide
        _id: new mongoose.Types.ObjectId(),
        text: 'You manage to conceal yourself just as a guard enters the armory. He seems to be checking the inventory. After a moment, he leaves. What do you do?',
        choices: [
            {
                text: 'Carefully leave the armory.',
                nextSegmentId: new mongoose.Types.ObjectId(),
                effects: {},
            },
            {
                text: 'Try to sneak up behind the guard and knock him unconscious.',
                nextSegmentId: new mongoose.Types.ObjectId(),
                effects: { stats: { Dexterity: 2, Luck: 1 } },
            },
        ],
        ending: false,
        win: false,
        loss: false,
    },
    { // Path 1.1.1.1.1.1.2.2.1.1.2.2: Prepare to fight
        _id: new mongoose.Types.ObjectId(),
        text: 'You take a swing at the guard. He parries your attack effortlessly and draws his own sword. With a menacing grin on his face he takes the stance of a seasoned warrior. What do you do?',
        choices: [
            {
                text: 'Fight!',
                nextSegmentId: new mongoose.Types.ObjectId(),
                effects: { stats: { HP: -5 } },
            },
            {
                text: 'Try to disarm him.',
                nextSegmentId: new mongoose.Types.ObjectId(),
                effects: { stats: { Dexterity: 2, Strength: -1 } },
            },
            {
                text: "Try to run away.",
                nextSegmentId: new mongoose.Types.ObjectId(),
                effects: {stats: {Dexterity: 2, Luck: -1}}
            }
        ],
        ending: false,
        win: false,
        loss: false,
    },
    { // Path 1.1.1.1.1.1.2.2.1.1.2.2.1: Fight!
        _id: new mongoose.Types.ObjectId(),
        text: 'You ready yourself to fight, but it is over before it even began. The guard\'s skill is unmatched. You fall to the ground, defeated. What do you do?',
        choices: [
            {
                text: 'Submit to your fate.',
                nextSegmentId: new mongoose.Types.ObjectId(),
                effects: { stats: { HP: -5 } },
            },
            {
                text: 'Make a final desperate attack.',
                nextSegmentId: new mongoose.Types.ObjectId(),
                effects: { stats: { Dexterity: 2, Strength: -1 } },
            },
        ],
        ending: false,
        win: false,
        loss: false,
    },
    { // Path 1.1.1.1.1.1.2.2.1.1.2.2.1.1: Submit to your fate
        _id: new mongoose.Types.ObjectId(),
        text: 'You close your eyes, accepting the inevitable. The guard binds your hands and drags you back to your cell. "You should have stayed where you were," he sneers. You are left alone, bruised and defeated, to await your execution. The end.',
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
    { // Path 1.1.1.1.1.1.2.2.1.1.2.2.1.2: Make a final desperate attack
        _id: new mongoose.Types.ObjectId(),
        text: 'With a surge of adrenaline, you lunge at the guard, swinging your sword wildly. He easily sidesteps your attack and delivers a swift merciful blow to your head. You collapse, your vision fading to black. You are dead.',
        choices: [
            {
                text: "End Game.",
                nextSegmentId: null,
                effects: {}
            }
        ],
        ending: true,
        win: false,
        loss: true,
    },
    { // Path 1.1.1.1.1.1.2.2.1.1.2.2.2: Flee
        _id: new mongoose.Types.ObjectId(),
        text: 'You turn and sprint down the hallway, but the guard quickly shouts an alarm. Within moments, you hear the heavy footsteps of approaching guards. You are surrounded and dragged back to your cell. Your escape attempt has failed. Game over.',
        choices: [
            {
                text: "End Game.",
                nextSegmentId: null,
                effects: {}
            }
        ],
        ending: true,
        win: false,
        loss: true,
    },
    { // Path 1.1.1.1.1.1.2.2.1.1.2.2.2: Disarm the guard
        _id: new mongoose.Types.ObjectId(),
        text: 'You attempt to disarm the guard, but he anticipates your move. He delivers a swift blow to your gut, knocking the wind out of you. You fall to your knees, ready for the worst. The guard laughs menacingly, annoyed that you would even attempt such a move. You notice a sand-like substance on the ground that must have spilled from the barrels you were searching. What do you do?',
        choices: [
            {
                text: 'Accept your fate.',
                nextSegmentId: new mongoose.Types.ObjectId(),
                effects: { stats: { HP: -3 } },
            },
            {
                text: 'Throw the sand-like substance into the guard\'s face.',
                nextSegmentId: new mongoose.Types.ObjectId(),
                effects: { stats: { Dexterity: 2, Luck: 1 } },
            },
        ],
        ending: false,
        win: false,
        loss: false,
    },
    { // Path 1.1.1.1.1.1.2.2.1.1.2.2.2.1: Accept your fate
        _id: new mongoose.Types.ObjectId(),
        text: 'You bow your head, bracing for the final blow. The guard, still chuckling, binds your hands and roughly shoves you back towards your cell. "Learn your place," he snarls. You are left alone, defeated and humiliated, awaiting your execution.',
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
    { // Path 1.1.1.1.1.1.2.2.1.1.2.2.2.1: Disarm the guard
        _id: new mongoose.Types.ObjectId(),
        text: 'With a desperate lunge, you scoop up a handful of the sand-like substance and fling it into the guard\'s face. He roars in surprise and pain, momentarily blinded. What do you do?',
        choices: [
            {
                text: 'Grab the guard\'s sword and attack.',
                nextSegmentId: new mongoose.Types.ObjectId(),
                effects: { stats: { Strength: 2, Luck: 1 } },
            },
            {
                text: 'Use the distraction to flee.',
                nextSegmentId: new mongoose.Types.ObjectId(),
                effects: { stats: { Dexterity: 2 } },
            },
        ],
        ending: false,
        win: false,
        loss: false,
    },
    { // Path 1.1.1.1.1.1.2.2.1.1.2.2.2.1.2: Flee using the distraction
        _id: new mongoose.Types.ObjectId(),
        text: 'You use the distraction to make a break for it. The guard, still reeling, is unable to stop you. You sprint down the hallway, heart pounding. But your escape is short-lived. You run straight into a group of guards who have been alerted to your presence. You are quickly overpowered and dragged back to your cell. Game over.',
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
    { // Path 1.1.1.1.1.1.2.2.1.1.2.2.2.1.1: Grab the guard's sword and attack
        _id: new mongoose.Types.ObjectId(), 
        text: 'You seize the opportunity, grabbing the guard\'s sword. He stumbles, trying to clear his vision. You swing the sword, and deliver a powerful blow. The guard falls, defeated. What do you do?',
        choices: [
            {
                text: 'Hide the guard\'s body.',
                nextSegmentId: new mongoose.Types.ObjectId(), 
                effects: { stats: { Dexterity: -1, Luck: -2 } }, 
            },
            {
                text: 'Continue through the hallway.',
                nextSegmentId: new mongoose.Types.ObjectId(),
                effects: {},
            },
        ],
        ending: false,
        win: false,
        loss: false,
    },
    { // Path 1.1.1.1.1.1.2.2.1.1.2.2.2.1.1.1: Hide the guard's body
        _id: new mongoose.Types.ObjectId(),
        text: 'You attempt to drag the guard\'s body into a nearby alcove, but the task proves more difficult than anticipated. While you are struggling, you hear the sound of approaching guards. They discover you hiding the body. You are swiftly captured and dragged back to your cell. Game over.',
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
    { // Path 1.1.1.1.1.1.2.2.1.1.2.2.2.1.1.2: Continue through the hallway
        _id: new mongoose.Types.ObjectId(),
        text: 'You continue through the hallway, navigating the twists and turns. The dead guard\'s body is eventually discovered, but it draws attention away from the direction you\'ve taken. They don\'t suspect you\'ve made it this far. You near what appears to be an exit. What do you do?',
        choices: [
            {
                text: 'Carefully approach the exit.',
                nextSegmentId: new mongoose.Types.ObjectId(),
                effects: { stats: { Dexterity: 1, Wisdom: 1 } },
            },
            {
                text: 'Search the immediate area for any signs of danger.',
                nextSegmentId: new mongoose.Types.ObjectId(),
                effects: { stats: { Wisdom: 2 } },
            },
        ],
        ending: false,
        win: false,
        loss: false,
    },
    { // Path 1.1.1.1.1.1.2.2.1.1.2.2.2.1.1.2.1: Approach the exit
        _id: new mongoose.Types.ObjectId(),
        text: 'You slowly creep towards the exit. It appears to be a heavy wooden door. You listen carefully, but hear no sounds. What do you do?',
        choices: [
            {
                text: 'Try to open the door.',
                nextSegmentId: new mongoose.Types.ObjectId(),
                effects: { stats: { Strength: 1, Luck: 1 } },
            },
            {
                text: 'Search for another way out.',
                nextSegmentId: new mongoose.Types.ObjectId(),
                effects: { stats: { Wisdom: 1 } },
            },
        ],
        ending: false,
        win: false,
        loss: false,
    },
    { // Path 1.1.1.1.1.1.2.2.1.1.2.2.2.1.1.2.2: Search the immediate area for any signs of danger
        _id: new mongoose.Types.ObjectId(),
        text: 'You carefully examine the area around the exit. You notice a small sewer entrance hidden behind some crates. It might be a tight squeeze, but it could offer an alternate escape route. What do you do?',
        choices: [
            {
                text: 'Try to squeeze through the sewer entrance',
                nextSegmentId: new mongoose.Types.ObjectId(),
                effects: { stats: { Dexterity: 2, Luck: 1 } },
            },
            {
                text: 'Try to open the wooden door.',
                nextSegmentId: new mongoose.Types.ObjectId(),
                effects: { stats: { Strength: 1, Luck: 1 } },
            },
        ],
        ending: false,
        win: false,
        loss: false,
    },
    { // Path 1.1.1.1.1.1.2.2.1.1.2.2.2.1.1.2.1.1: Try the door
        _id: new mongoose.Types.ObjectId(),
        text: 'You open the door with your master key, but are face to face with a battalion of guards. This was not the path to your freedom, but rather your doom. You\'re dragged all the way back to your cell to await your execution. Game Over.',
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
    { // Path 1.1.1.1.1.1.2.2.1.1.2.2.2.1.1.2.1.1: Try the sewer entrance
        _id: new mongoose.Types.ObjectId(),
        text: 'You carefully examine the area around the exit. You notice a small sewer entrance hidden behind some crates. It might be a tight squeeze, but it could offer an alternate escape route. What do you do?',
        choices: [
            {
                text: 'Try the sewer entrance.',
                nextSegmentId: new mongoose.Types.ObjectId(),
                effects: { stats: { Dexterity: 2, Luck: 1, HP: -2 } },
            },
            {
                text: 'Try to open the wooden door.',
                nextSegmentId: new mongoose.Types.ObjectId(),
                effects: {},
            },
        ],
        ending: false,
        win: false,
        loss: false,
    },
    { // Path 1.1.1.1.1.1.2.2.1.1.2.2.2.1.1.2.1.1.1: Sewer exit ending
        _id: new mongoose.Types.ObjectId(),
        text: 'It\'s disgusting, and smells more abhorrent than anything you could have possibly imagined. It\'s dark, it\'s cold, and the long tunnel passage seems to go on endlessly. Just when you have given up all hope, and think you might die there in that tunnel, you reach the end of the tunnel. It lets out into a river bank. You are free! far from the reaches of the castle.',
        choices: [
            {
                text: 'You Win.',
                nextSegmentId: null,
                effects: {},
            },
        ],
        ending: true,
    },
];

export default path1Segments;