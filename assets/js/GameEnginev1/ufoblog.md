---
layout: post 
title: Timmy123's Crash Landing Blog
permalink: /Athreeblog
hide: true
show_reading_time: false
---
By Salma Zaghloul and Sophie Haas
# Formative Assessment 1 - Mini Game Configuration (Individual)
### Objective: Demonstrate correct file structure and asset integration practices by adding a new asset to the GameLevelUfo level.
#### S4 Salma Z – Asset Management

<img width="808" height="411" alt="Image" src="https://github.com/user-attachments/assets/1e301c25-c114-477a-9408-cb4fa292f39e" />

## Game Concept:
Lost on the Moon is a space-themed mini game set on a mysterious alien planet. The player pilots a UFO that has crash-landed near a stranded astronaut named Timmy123. As Timmy123 desperately scours the moon for signs of hope, he comes across another astronaut, named Tommy123. The two then watch shooting stars pass by Earth,
<img width="72" height="57" alt="Image" src="https://github.com/user-attachments/assets/b0f87a9e-a981-4d9c-b83e-35075a0e626b" />

<img width="317" height="111" alt="Image" src="https://github.com/user-attachments/assets/ba9b74e1-37ca-4e80-bcd4-8316fe39c4fa" />


## Asset Added

Shooting Star — a small cartoon star with a trail added as a passive NPC/Sprite to the UFO level. It passes by at random intervals.
Additionally, secondary Ufos pass by, behaving the s

Asset file name: shootingstar.png
Asset type: sprite
Purpose in game: Glides across the screen at a fast pace to and scenery and wonder

## File Path and Directory Placement
The asset was saved to the following location in the repository:
images/gamebuilder/sprites/shootingstar.png
This follows the correct GameBuilder directory structure where all sprite assets are stored under images/gamebuilder/sprites/.

## Configuration Updates
The following reference was added to GameLevelUfo.js to integrate the new asset:
javascript//  const npcData3 = {
            id: 'shootingstar',
            greeting: 'wee!',
            src: path + "/images/gamebuilder/sprites/shootingstar.png",  // 

## What exactly was added?
We made use of x and y velocity, as well as positions and animation rate to create a moving and passive asset.

```js
const npcData3 = {
            id: 'shootingstar',
            greeting: 'wee!',
            src: path + "/images/gamebuilder/sprites/shootingstar.png",
            SCALE_FACTOR: 7,
            ANIMATION_RATE: 50,
            INIT_POSITION: { x: 800, y: 400 },
            pixels: { height: 512, width: 384 },
            orientation: { rows: 4, columns: 3 },
            down: { row: 0, start: 0, columns: 3 },
            right: { row: 1, start: 0, columns: 3 },
            left: { row: 2, start: 0, columns: 3 },
            up: { row: 3, start: 0, columns: 3 },
            hitbox: { widthPercentage: 0.4, heightPercentage: 0.3 },
            dialogues: ['Greetings, earthling!'],
            reaction: function() { console.log(this.greeting); },
            interact: function() { console.log('Alien says hi!'); },
            xVelocity: 1.5,  // Move right at 1.5 pixels per frame
            yVelocity: 0
        };
```

## Why This Directory?
The images/gamebuilder/sprites/ folder is the correct location for character and object sprites used by the GameEngine. Placing assets here ensures the path variable in the game constructor can resolve the file correctly.

# Commit Link
(Paste commit link here after pushing)