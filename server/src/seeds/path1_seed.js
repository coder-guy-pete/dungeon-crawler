import mongoose from "mongoose";

export const path1Segments = [
    {
        _id: new mongoose.Types.ObjectId(),
        segmentId: 1,
        text: 'Your fingers brush against a loose stone in the wall. You manage to pry it loose. What do you do?',
        choices: [
            {
                text: 'Try to use the stone to pick the lock.',
                nextSegmentId: 4,
                effects: { stats: { Dexterity: 2 } },
            },
            {
                text: 'Keep the stone as a potential weapon.',
                nextSegmentId: 5,
                effects: { inventory: { "Sharp Stone": 1 } },
            },
        ],
        ending: false,
        win: false,
        loss: false,
    },
    {
        _id: new mongoose.Types.ObjectId(),
        segmentId: 4,
        text: 'Using the sharp stone, you carefully work on the lock. After some time, you hear a click! The door is unlocked, but the stone gets jammed in the lock and is no longer of use to you. What do you do?',
        choices: [
            {
                text: 'Slowly open the door and sneak out.',
                nextSegmentId: 6,
                effects: { inventory: { "Loose Stone": -1 }, stats: { Dexterity: 2, Luck: 1 } },
            },
            {
                text: 'Burst out of the cell, ready to fight.',
                nextSegmentId: 7,
                effects: { stats: { Strength: 1, Luck: -1 } },
            },
        ],
        ending: false,
        win: false,
        loss: false,
    },
    {
        _id: new mongoose.Types.ObjectId(),
        segmentId: 6,
        text: "Very carefully, you open the door and creep into the hallway. It's dark and difficult to see. In one direction you see a faint light coming from around the bend of the hallway, in the other all you can see is total darkness. Which way do you go?",
        choices: [
            {
                text: 'Head towards the light.',
                nextSegmentId: 8,
                effects: {},
            },
            {
                text: 'Head into the darkness.',
                nextSegmentId: 9,
                effects: {},
            },
        ],
        ending: false,
        win: false,
        loss: false,
    },
    {
        _id: new mongoose.Types.ObjectId(),
        segmentId: 8,
        text: 'You make your way down the hallway towards the light. As you approach the bend, you hear voices. What do you do?',
        choices: [
            {
                text: 'Try to eavesdrop on the conversation.',
                nextSegmentId: 10,
                effects: { stats: { Wisdom: 1 } },
            },
            {
                text: 'Quickly turn back and head into the darkness.',
                nextSegmentId: 9,
                effects: { stats: { Dexterity: 1 } },
            },
        ],
        ending: false,
        win: false,
        loss: false,
    },
    {
        _id: new mongoose.Types.ObjectId(),
        segmentId: 10,
        text: 'You carefully creep closer and listen. The voices are guards, discussing the prisoner who is to be executed in the morning. They mention a key hanging in the guard room. What do you do?',
        choices: [
            {
                text: 'Try to sneak into the guard room and steal the key.',
                nextSegmentId: 11,
                effects: { stats: { Dexterity: 2, Luck: 1 } },
            },
            {
                text: 'Continue down the hallway, hoping to find another way out.',
                nextSegmentId: 12,
                effects: {},
            },
        ],
        ending: false,
        win: false,
        loss: false,
    },
    {
        _id: new mongoose.Types.ObjectId(),
        segmentId: 11,
        text: 'You carefully slip into the guard room. The guards are preoccupied. You spot the key and grab it. It seems to be a master key. What do you do?',
        choices: [
            {
                text: 'Try to unlock a nearby door.',
                nextSegmentId: 13,
                effects: { inventory: { "Master Key": 1 } },
            },
            {
                text: 'Leave the guard room and continue down the hallway.',
                nextSegmentId: 14,
                effects: {},
            },
        ],
        ending: false,
        win: false,
        loss: false,
    },
    {
        _id: new mongoose.Types.ObjectId(),
        segmentId: 14,
        text: "You leave the guard room and move further down the hallway. The light grows stronger. You reach a T intersection, to the right, you hear running water, and to the left, you see a wooden door.",
        choices: [
            {
                text: "Go Right towards the running water.",
                nextSegmentId: 15,
                effects: {}
            },
            {
                text: "Go Left and through the wooden door.",
                nextSegmentId: 16,
                effects: {}
            }
        ],
        ending: false,
        win: false,
        loss: false,
    },
    {
        _id: new mongoose.Types.ObjectId(),
        segmentId: 16,
        text: "You use the master key to unlock a door. Inside, you find a dimly lit armory. Racks of weapons line the walls. What do you do?",
        choices: [
            {
                text: "Grab a sword.",
                nextSegmentId: 17,
                effects: {inventory: {"Sword": 1}, stats: {Strength: 1}}
            },
            {
                text: "Search for a set of lockpicks.",
                nextSegmentId: 18,
                effects: {inventory: {"Lockpicks": 1}, stats: {Dexterity: 1}}
            },
            {
                text: "Leave the armory and continue down the hallway.",
                nextSegmentId: 38,
                effects: {}
            }
        ],
        ending: false,
        win: false,
        loss: false,
    },
    {
        _id: new mongoose.Types.ObjectId(),
        segmentId: 17,
        text: 'You heft the sword. It feels surprisingly well-balanced. With a weapon in hand, you feel more confident. What do you do?',
        choices: [
            {
                text: 'Carefully explore the rest of the armory.',
                nextSegmentId: 20,
                effects: { stats: { Wisdom: 1 } },
            },
            {
                text: 'Leave the armory and continue down the hallway.',
                nextSegmentId: 21,
                effects: {},
            },
        ],
        ending: false,
        win: false,
        loss: false,
    },
    {
        _id: new mongoose.Types.ObjectId(),
        segmentId: 20,
        text: 'You search the armory thoroughly. You find a leather sheath for your sword and a small pouch containing a few coins. What do you do?',
        choices: [
            {
                text: 'Equip the sheath and pouch and leave the armory.',
                nextSegmentId: 22,
                effects: { inventory: { "Leather Sheath": 1, "Coins": 3 } },
            },
            {
                text: 'Continue searching for more useful items.',
                nextSegmentId: 23,
                effects: { stats: { Luck: -1 } },
            },
        ],
        ending: false,
        win: false,
        loss: false,
    },
    {
        _id: new mongoose.Types.ObjectId(),
        segmentId: 23,
        text: 'You rummage through the remaining crates and barrels, but find nothing of immediate use. Suddenly, you hear the sound of approaching footsteps. What do you do?',
        choices: [
            {
                text: 'Quickly hide behind a rack of weapons.',
                nextSegmentId: 24,
                effects: { stats: { Dexterity: 2 } },
            },
            {
                text: 'Prepare to fight.',
                nextSegmentId: 25,
                effects: { stats: { Strength: 1 } },
            },
        ],
        ending: false,
        win: false,
        loss: false,
    },
    {
        _id: new mongoose.Types.ObjectId(),
        segmentId: 24,
        text: 'You manage to conceal yourself just as a guard enters the armory. He seems to be checking the inventory. After a moment, he leaves. What do you do?',
        choices: [
            {
                text: 'Carefully leave the armory and continue down the hallway.',
                nextSegmentId: 26,
                effects: {},
            },
            {
                text: 'Head back towards the T intersection.',
                nextSegmentId: 14,
                effects: { stats: { Dexterity: 2, Luck: 1 } },
            },
        ],
        ending: false,
        win: false,
        loss: false,
    },
    {
        _id: new mongoose.Types.ObjectId(),
        segmentId: 25,
        text: 'You take a swing at the guard. He parries your attack effortlessly and draws his own sword. With a menacing grin on his face he takes the stance of a seasoned warrior. What do you do?',
        choices: [
            {
                text: 'Fight!',
                nextSegmentId: 28,
                effects: { stats: { HP: -5 } },
            },
            {
                text: 'Try to disarm him.',
                nextSegmentId: 29,
                effects: { stats: { Dexterity: 2, Strength: -1 } },
            },
            {
                text: "Try to run away.",
                nextSegmentId: 30,
                effects: {stats: {Dexterity: 2, Luck: -1}}
            }
        ],
        ending: false,
        win: false,
        loss: false,
    },
    {
        _id: new mongoose.Types.ObjectId(),
        segmentId: 28,
        text: 'You ready yourself to fight, but it is over before it even began. The guard\'s skill is unmatched. You fall to the ground, defeated. What do you do?',
        choices: [
            {
                text: 'Submit to your fate.',
                nextSegmentId: 31,
                effects: { stats: { HP: -5 } },
            },
            {
                text: 'Make a final desperate attack.',
                nextSegmentId: 32,
                effects: { stats: { Dexterity: 2, Strength: -1 } },
            },
        ],
        ending: false,
        win: false,
        loss: false,
    },
    {
        _id: new mongoose.Types.ObjectId(),
        segmentId: 31,
        text: 'You close your eyes, accepting the inevitable. The guard binds your hands and drags you back to your cell. "You should have stayed where you were," he sneers. You are left alone, bruised and defeated, to await your execution. The end.',
        choices: [
            {
                text: 'End Game.',
                nextSegmentId: 0,
                effects: {},
            },
        ],
        ending: true,
        win: false,
        loss: true,
    },
    {
        _id: new mongoose.Types.ObjectId(),
        segmentId: 32,
        text: 'With a surge of adrenaline, you lunge at the guard, swinging your sword wildly. He easily sidesteps your attack and delivers a swift merciful blow to your head. You collapse, your vision fading to black. You are dead.',
        choices: [
            {
                text: "End Game.",
                nextSegmentId: 0,
                effects: {}
            }
        ],
        ending: true,
        win: false,
        loss: true,
    },
    {
        _id: new mongoose.Types.ObjectId(),
        segmentId: 30,
        text: 'You turn and sprint down the hallway, but the guard quickly shouts an alarm. Within moments, you hear the heavy footsteps of approaching guards. You are surrounded and dragged back to your cell. Your escape attempt has failed. Game over.',
        choices: [
            {
                text: "End Game.",
                nextSegmentId: 0,
                effects: {}
            }
        ],
        ending: true,
        win: false,
        loss: true,
    },
    {
        _id: new mongoose.Types.ObjectId(),
        segmentId: 29,
        text: 'You attempt to disarm the guard, but he anticipates your move. He delivers a swift blow to your gut, knocking the wind out of you. You fall to your knees, ready for the worst. The guard laughs menacingly, annoyed that you would even attempt such a move. You notice a sand-like substance on the ground that must have spilled from the barrels you were searching. What do you do?',
        choices: [
            {
                text: 'Accept your fate.',
                nextSegmentId: 33,
                effects: { stats: { HP: -3 } },
            },
            {
                text: 'Throw the sand-like substance into the guard\'s face.',
                nextSegmentId: 34,
                effects: { stats: { Dexterity: 2, Luck: 1 } },
            },
        ],
        ending: false,
        win: false,
        loss: false,
    },
    {
        _id: new mongoose.Types.ObjectId(),
        segmentId: 33,
        text: 'You bow your head, bracing for the final blow. The guard, still chuckling, binds your hands and roughly shoves you back towards your cell. "Learn your place," he snarls. You are left alone, defeated and humiliated, awaiting your execution.',
        choices: [
            {
                text: 'End Game.',
                nextSegmentId: 0,
                effects: {},
            },
        ],
        ending: true,
        win: false,
        loss: true,
    },
    {
        _id: new mongoose.Types.ObjectId(),
        segmentId: 34,
        text: 'With a desperate lunge, you scoop up a handful of the sand-like substance and fling it into the guard\'s face. He roars in surprise and pain, momentarily blinded. What do you do?',
        choices: [
            {
                text: 'Grab the guard\'s sword and attack.',
                nextSegmentId: 35,
                effects: { stats: { Strength: 2, Luck: 1 } },
            },
            {
                text: 'Use the distraction to flee.',
                nextSegmentId: 36,
                effects: { stats: { Dexterity: 2 } },
            },
        ],
        ending: false,
        win: false,
        loss: false,
    },
    {
        _id: new mongoose.Types.ObjectId(),
        segmentId: 36,
        text: 'You use the distraction to make a break for it. The guard, still reeling, is unable to stop you. You sprint down the hallway, heart pounding. But your escape is short-lived. You run straight into a group of guards who have been alerted to your presence. You are quickly overpowered and dragged back to your cell. Game over.',
        choices: [
            {
                text: 'End Game.',
                nextSegmentId: 0,
                effects: {},
            },
        ],
        ending: true,
        win: false,
        loss: true,
    },
    {
        _id: new mongoose.Types.ObjectId(), 
        segmentId: 35,
        text: 'You seize the opportunity, grabbing the guard\'s sword. He stumbles, trying to clear his vision. You swing the sword, and deliver a powerful blow. The guard falls, defeated. What do you do?',
        choices: [
            {
                text: 'Hide the guard\'s body.',
                nextSegmentId: 37, 
                effects: { stats: { Dexterity: -1, Luck: -2 } }, 
            },
            {
                text: 'Continue through the hallway.',
                nextSegmentId: 38,
                effects: {},
            },
        ],
        ending: false,
        win: false,
        loss: false,
    },
    {
        _id: new mongoose.Types.ObjectId(),
        segmentId: 37,
        text: 'You attempt to drag the guard\'s body into a nearby alcove, but the task proves more difficult than anticipated. While you are struggling, you hear the sound of approaching guards. They discover you hiding the body. You are swiftly captured and dragged back to your cell. Game over.',
        choices: [
            {
                text: 'End Game.',
                nextSegmentId: 0,
                effects: {},
            },
        ],
        ending: true,
        win: false,
        loss: true,
    },
    {
        _id: new mongoose.Types.ObjectId(),
        segmentId: 38,
        text: 'You continue through the hallway, navigating the twists and turns. The dead guard\'s body is eventually discovered, but it draws attention away from the direction you\'ve taken. They don\'t suspect you\'ve made it this far. You near what appears to be an exit. What do you do?',
        choices: [
            {
                text: 'Carefully approach the exit.',
                nextSegmentId: 39,
                effects: { stats: { Dexterity: 1, Wisdom: 1 } },
            },
            {
                text: 'Search the immediate area for any signs of danger.',
                nextSegmentId: 40,
                effects: { stats: { Wisdom: 2 } },
            },
        ],
        ending: false,
        win: false,
        loss: false,
    },
    {
        _id: new mongoose.Types.ObjectId(),
        segmentId: 39,
        text: 'You slowly creep towards the exit. It appears to be a heavy wooden door. You listen carefully, but hear no sounds. What do you do?',
        choices: [
            {
                text: 'Try to open the door.',
                nextSegmentId: 41,
                effects: { stats: { Strength: 1, Luck: 1 } },
            },
            {
                text: 'Search for another way out.',
                nextSegmentId: 42,
                effects: { stats: { Wisdom: 1 } },
            },
        ],
        ending: false,
        win: false,
        loss: false,
    },
    {
        _id: new mongoose.Types.ObjectId(),
        segmentId: 42,
        text: 'You carefully examine the area around the exit. You notice a small sewer entrance hidden behind some crates. It might be a tight squeeze, but it could offer an alternate escape route. What do you do?',
        choices: [
            {
                text: 'Try to squeeze through the sewer entrance',
                nextSegmentId: 43,
                effects: { stats: { Dexterity: 2, Luck: 1 } },
            },
            {
                text: 'Try to open the wooden door.',
                nextSegmentId: 41,
                effects: { stats: { Strength: 1, Luck: 1 } },
            },
        ],
        ending: false,
        win: false,
        loss: false,
    },
    {
        _id: new mongoose.Types.ObjectId(),
        segmentId: 41,
        text: 'You open the door with your master key, but are face to face with a battalion of guards. This was not the path to your freedom, but rather your doom. You\'re dragged all the way back to your cell to await your execution. Game Over.',
        choices: [
            {
                text: 'End Game.',
                nextSegmentId: 0,
                effects: {},
            },
        ],
        ending: true,
        win: false,
        loss: true,
    },
    {
        _id: new mongoose.Types.ObjectId(),
        segmentId: 40,
        text: 'You carefully examine the area around the exit. You notice a small sewer entrance hidden behind some crates. It might be a tight squeeze, but it could offer an alternate escape route. What do you do?',
        choices: [
            {
                text: 'Try the sewer entrance.',
                nextSegmentId: 43,
                effects: { stats: { Dexterity: 2, Luck: 1, HP: -2 } },
            },
            {
                text: 'Try to open the wooden door.',
                nextSegmentId: 41,
                effects: {},
            },
        ],
        ending: false,
        win: false,
        loss: false,
    },
    {
        _id: new mongoose.Types.ObjectId(),
        segmentId: 43,
        text: 'It\'s disgusting, and smells more abhorrent than anything you could have possibly imagined. It\'s dark, it\'s cold, and the long tunnel passage seems to go on endlessly. Just when you have given up all hope, and think you might die there in that tunnel, you reach the end of the tunnel. It lets out into a river bank. You are free! far from the reaches of the castle.',
        choices: [
            {
                text: 'You Win!',
                nextSegmentId: 0,
                effects: {},
            },
        ],
        ending: true,
        win: true,
        loss: false,
    },
    {
        _id: new mongoose.Types.ObjectId(),
        segmentId: 26,
        text: 'You leave the armory and continue down the hallway. Navigating the twists and turns of the dungeon is disorienting, but you eventually come across what appears to be an exit. What do you do?',
        choices: [
            {
                text: 'Carefully approach the exit.',
                nextSegmentId: 39,
                effects: { stats: { Dexterity: 1, Wisdom: 1 } },
            },
            {
                text: 'Search the immediate area for any signs of danger.',
                nextSegmentId: 40,
                effects: { stats: { Wisdom: 2 } },
            },
        ],
        ending: false,
        win: false,
        loss: false,
    },
    {
        _id: new mongoose.Types.ObjectId(),
        segmentId: 22,
        text: 'You equip the sheath and pouch and leave the armory. You continue down the hallway, navigating the twists and turns of the dungeon. Eventually, you come across what appears to be an exit. What do you do?',
        choices: [
            {
                text: 'Carefully approach the exit.',
                nextSegmentId: 39,
                effects: { stats: { Dexterity: 1, Wisdom: 1 } },
            },
            {
                text: 'Search the immediate area for any signs of danger.',
                nextSegmentId: 40,
                effects: { stats: { Wisdom: 2 } },
            },
        ],
        ending: false,
        win: false,
        loss: false,
    },
    {
        _id: new mongoose.Types.ObjectId(),
        segmentId: 21,
        text: 'You leave the armory and continue down the hallway. Navigating the twists and turns of the dungeon is disorienting, but you eventually come across what appears to be an exit. What do you do?',
        choices: [
            {
                text: 'Carefully approach the exit.',
                nextSegmentId: 39,
                effects: { stats: { Dexterity: 1, Wisdom: 1 } },
            },
            {
                text: 'Search the immediate area for any signs of danger.',
                nextSegmentId: 40,
                effects: { stats: { Wisdom: 2 } },
            },
        ],
        ending: false,
        win: false,
        loss: false,
    },
    {
        _id: new mongoose.Types.ObjectId(),
        segmentId: 15,
        text: 'You head towards the sound of running water. As you approach, you see that it is large sewage pipe flowing down in a large stream. What do you do?',
        choices: [
            {
                text: 'Try to follow the stream to see where it leads.',
                nextSegmentId: 44,
                effects: {},
            },
            {
                text: 'Turn back and head towards the wooden door.',
                nextSegmentId: 16,
                effects: { stats: { Dexterity: 1 } },
            },
        ],
        ending: false,
        win: false,
        loss: false,
    },
    {
        _id: new mongoose.Types.ObjectId(),
        segmentId: 44,
        text: 'You follow the stream, as you do the heavy flow of water subsides, it is no longer a raging river of water but a steady stream. As you do, the fresh water gets dirtier and dirtier. It stinks of death, and bile. What do you do?',
        choices: [
            {
                text: 'Keep following the stream.',
                nextSegmentId: 45,
                effects: {},
            },
            {
                text: 'Turn back and head towards the wooden door.',
                nextSegmentId: 16,
                effects: { stats: { Dexterity: 1 } },
            },
        ],
        ending: false,
        win: false,
        loss: false,
    },
    {
        _id: new mongoose.Types.ObjectId(),
        segmentId: 45,
        text: 'You continue to follow the stream, until it leads to what appears to be a cliff. The drop off is steep and dark, but you think you can see a landing below. What do you do?',
        choices: [
            {
                text: 'Jump down to the landing.',
                nextSegmentId: 46,
                effects: { stats: { Dexterity: 2, Luck: 1 } },
            },
            {
                text: 'Turn back and head towards the wooden door.',
                nextSegmentId: 16,
                effects: { stats: { Dexterity: 1 } },
            },
        ],
        ending: false,
        win: false,
        loss: false,
    },
    {
        _id: new mongoose.Types.ObjectId(),
        segmentId: 46,
        text: 'You take a deep breath and jump... the fall is steeper than you thought and you land with a mighty thud and badly hurt your ankle. You can no longer stand. There\'s no going back now. You must press on. You find yourself in a dark cavern. What do you do?',
        choices: [
            {
                text: 'Drag yourself deeper into the cavern.',
                nextSegmentId: 47,
                effects: {},
            },
            {
                text: 'Give up.',
                nextSegmentId: 48,
                effects: {},
            },
        ],
        ending: false,
        win: false,
        loss: false,
    },
    {
        _id: new mongoose.Types.ObjectId(),
        segmentId: 47,
        text: 'You grit your teeth and start dragging yourself deeper into the darkness. It is pitch black, you can\'t even see your hands directly in front of you. Fear and panic are setting in. Did you make a grave mistake?',
        choices: [
            {
                text: 'Keep going.',
                nextSegmentId: 49,
                effects: {},
            },
            {
                text: 'Give up.',
                nextSegmentId: 48,
                effects: {},
            },
        ],
        ending: false,
        win: false,
        loss: false,
    },
    {
        _id: new mongoose.Types.ObjectId(),
        segmentId: 48,
        text: 'Cold, hurt, scared and alone. You realize that you have freed yourself from your captors but at what cost? Instead of a swift death, you wait many days for starvation and disease to take you. What a way to go...Game Over.',
        choices: [
            {
                text: 'End Game.',
                nextSegmentId: 0,
                effects: {},
            },
        ],
        ending: true,
        win: false,
        loss: true,
    },
    {
        _id: new mongoose.Types.ObjectId(),
        segmentId: 49,
        text: 'You keep dragging yourself through the darkness. You can feel the walls closing in on you. You can hear the sound of water dripping. You can feel the cold seeping into your bones. You can feel the fear creeping up your spine. But you remind yourself that it is better to die fighting than to die waiting. You crawl and you crawl until eventually you see a light. You see the light of day. You see freedom. You see the end of the tunnel. You are free!',
        choices: [
            {
                text: 'You Win!',
                nextSegmentId: 0,
                effects: {},
            },
        ],
        ending: true,
        win: true,
        loss: false,
    },
    {
        _id: new mongoose.Types.ObjectId(),
        segmentId: 18,
        text: 'You search the armory for a set of lockpicks. You find a small set in a drawer. They look well-used, but still functional. What do you do?',
        choices: [
            {
                text: 'Continue searching the armory for more useful items.',
                nextSegmentId: 50,
                effects: { inventory: { "Lockpicks": 1 }, stats: { Dexterity: 1 } },
            },
            {
                text: 'Leave the armory and continue down the hallway.',
                nextSegmentId: 38,
                effects: {},
            },
        ],
        ending: false,
        win: false,
        loss: false,
    },
    {
        _id: new mongoose.Types.ObjectId(),
        segmentId: 50,
        text: 'You continue to rummage through the remaining crates and barrels, but find nothing of immediate use. Suddenly, you hear the sound of approaching footsteps, What do you do?',
        choices: [
            {
                text: 'Quickly hide behind a rack of weapons.',
                nextSegmentId: 24,
                effects: { stats: { Dexterity: 2 } },
            },
            {
                text: 'Prepare to fight.',
                nextSegmentId: 51,
                effects: { stats: { Strength: 1 } },
            },
        ],
        ending: false,
        win: false,
        loss: false,
    },
    {
        _id: new mongoose.Types.ObjectId(),
        segmentId: 51,
        text: 'You ready yourself to fight, but as the guard enters the room with his sword brandished you quickly realize that you are no match for him. You are quickly overpowered and dragged back to your cell. Game over.',
        choices: [
            {
                text: 'End Game.',
                nextSegmentId: 0,
                effects: {},
            },
        ],
        ending: true,
        win: false,
        loss: true,
    },
    {
        _id: new mongoose.Types.ObjectId(),
        segmentId: 13,
        text: 'You use the master key to unlock a nearby door. Inside, you find a small storeroom. It is filled with crates and barrels that are loaded with a black powder like substance. What do you do?',
        choices: [
            {
                text: 'Search the room for anything useful.',
                nextSegmentId: 52,
                effects: { inventory: { "Black Powder": 1 }, stats: { Wisdom: 1 } },
            },
            {
                text: 'Leave the room and continue down the hallway.',
                nextSegmentId: 14,
                effects: {},
            },
        ],
        ending: false,
        win: false,
        loss: false,
    },
    {
        _id: new mongoose.Types.ObjectId(),
        segmentId: 52,
        text: 'In the storeroom you find flint and steel. You realize that the black powder is gunpowder. What do you do?',
        choices: [
            {
                text: 'Take the flint and steel and leave',
                nextSegmentId: 14,
                effects: { inventory: { "Flint and Steel": 1 }, stats: { Wisdom: 1 } }
            },
            {
                text: 'Light the gunpowder and make a run for it.',
                nextSegmentId: 53,
                effects: { stats: { Luck: 2 } }
            }
        ],
        ending: false,
        win: false,
        loss: false,
    },
    {
        _id: new mongoose.Types.ObjectId(),
        segmentId: 53,
        text: 'You light a spark and run to exit the room, but you gravely underestimated how large the stockpile was. The explosion  can be seen from several miles away and causes a large part of the castle to cave in. Burying you and the guards in the dungeon alive. Game Over.',
        choices: [
            {
                text: 'End Game.',
                nextSegmentId: 0,
                effects: {}
            }
        ],
        ending: true,
        win: false,
        loss: true
    },
    {
        _id: new mongoose.Types.ObjectId(),
        segmentId: 12,
        text: 'You continue down the hallway, navigating the twists and turns of the dungeon. Eventually, you come across what appears to be an exit, but the door is locked. What do you do?',
        choices: [
            {
                text: 'Go back and try to steal the key from the guard room.',
                nextSegmentId: 11,
                effects: {},
            },
            {
                text: 'Search for another way out.',
                nextSegmentId: 40,
                effects: {},
            },
        ],
    },
    {
        _id: new mongoose.Types.ObjectId(),
        segmentId: 9,
        text: 'You head into the darkness. It is difficult to see, but you continue on, feeling your hand along the wall to guide you. After a few moments, you come to a dead end. What do you do?',
        choices: [
            {
                text: 'Turn back and head towards the light.',
                nextSegmentId: 54,
                effects: {},
            },
            {
                text: 'Search the wall for any hidden passages.',
                nextSegmentId: 55,
                effects: { stats: { Wisdom: 1 } },
            },
        ],
        ending: false,
        win: false,
        loss: false,
    },
    {
        _id: new mongoose.Types.ObjectId(),
        segmentId: 54,
        text: 'You turn around to go back, but as you do, you hear foot steps heading your way. What do you do?',
        choices: [
            {
                text: 'Hide in the shadows.',
                nextSegmentId: 56,
                effects: { stats: { Dexterity: 2 } },
            },
            {
                text: 'Prepare to fight.',
                nextSegmentId: 57,
                effects: { stats: { Strength: 1 } },
            },
        ],
        ending: false,
        win: false,
        loss: false,
    },
    {
        _id: new mongoose.Types.ObjectId(),
        segmentId: 56,
        text: 'You quickly duck into the shadows, hoping to avoid detection. The footsteps grow closer and closer, until finally they pass by. You breathe a sigh of relief. What do you do?',
        choices: [
            {
                text: 'Turn back and head towards the light.',
                nextSegmentId: 8,
                effects: { stats: { Dexterity: 1 } },
            },
        ],
        ending: false,
        win: false,
        loss: false,
    },
    {
        _id: new mongoose.Types.ObjectId(),
        segmentId: 57,
        text: 'You prepare to fight, but as the guard rounds the corner, you realize that you are no match for him. You are quickly overpowered and dragged back to your cell. Game over.',
        choices: [
            {
                text: 'End Game.',
                nextSegmentId: 0,
                effects: {},
            },
        ],
        ending: true,
        win: false,
        loss: true,
    },
    {
        _id: new mongoose.Types.ObjectId(),
        segmentId: 55,
        text: 'You search the walls for any hidden passages, but find nothing. You turn back to head towards the light, but as you do, you hear footsteps approaching. What do you do?',
        choices: [
            {
                text: 'Hide in the shadows.',
                nextSegmentId: 56,
                effects: { stats: { Dexterity: 2 } },
            },
            {
                text: 'Prepare to fight.',
                nextSegmentId: 57,
                effects: { stats: { Strength: 1 } },
            },
        ],
        ending: false,
        win: false,
        loss: false,
    },
    {
        _id: new mongoose.Types.ObjectId(),
        segmentId: 7,
        text: 'You burst out of the cell, ready to fight. The guards are taken by surprise, but quickly recover. They swiftly overpower you and drag you back to your cell. You are left alone, defeated and humiliated. Game over.',
        choices: [
            {
                text: 'End Game.',
                nextSegmentId: 0,
                effects: {},
            },
        ],
        ending: true,
        win: false,
        loss: true,
    },
    {
        _id: new mongoose.Types.ObjectId(),
        segmentId: 5,
        text: 'You keep the sharp stone. It feels reassuring in your hand. What do you do?',
        choices: [
            {
                text: 'Wait and listen for any sounds outside the cell.',
                nextSegmentId: 58,
                effects: { inventory: { "Sharp Stone": 1 }, stats: { Wisdom: 1 } },
            },
            {
                text: 'Try to find another loose stone',
                nextSegmentId: 59,
                effects: { inventory: { "Sharp Stone": 1 }, stats: { Dexterity: 1 } },
            },
        ],
        ending: false,
        win: false,
        loss: false,
    },
    {
        _id: new mongoose.Types.ObjectId(),
        segmentId: 58,
        text: 'You listen carefully. The footsteps are rhythmic and heavy, likely a guard. You hear them approaching your cell. What do you do?',
        choices: [
            {
                text: 'Hide the sharp stone and pretend to be asleep.',
                nextSegmentId: 60,
                effects: { stats: { Dexterity: 1 } },
            },
            {
                text: 'Prepare to fight.',
                nextSegmentId: 57,
                effects: { stats: { Strength: 1 } },
            },
        ],
        ending: false,
        win: false,
        loss: false,
    },
    {
        _id: new mongoose.Types.ObjectId(),
        segmentId: 60,
        text: 'You hide the stone and pretend to be asleep. The guard cracks the door open just slightly. "Huh, still sleeping. Well won\'t be much longer now". The door slams shut and you are alone once again. What do you do?',
        choices: [
            {
                text: 'Wait for the guard to return.',
                nextSegmentId: 61,
                effects: {},
            },
            {
                text: 'Try to use the sharp stone to pick the lock.',
                nextSegmentId: 4,
                effects: { stats: { Dexterity: 1 } },
            },
        ],
        ending: false,
        win: false,
        loss: false,
    },
    {
        _id: new mongoose.Types.ObjectId(),
        segmentId: 61,
        text: 'You wait for the guard to return, but by then it is too late. They have come to escort you to your execution. Game Over.',
        choices: [
            {
                text: 'End Game.',
                nextSegmentId: 0,
                effects: {},
            },
        ],
        ending: true,
        win: false,
        loss: true,
    },
    {
        _id: new mongoose.Types.ObjectId(),
        segmentId: 59,
        text: 'You search for another loose stone, but find nothing. The footsteps are growing louder. What do you do?',
        choices: [
            {
                text: 'Hide the sharp stone and pretend to be asleep.',
                nextSegmentId: 60,
                effects: { stats: { Dexterity: 1 } },
            },
            {
                text: 'Prepare to fight.',
                nextSegmentId: 57,
                effects: { stats: { Strength: 1 } },
            },
        ],
        ending: false,
        win: false,
        loss: false,
    },
];