function NewCandy () {
    CandyPlaats = [
    0,
    1,
    2,
    3,
    4
    ]
    f = true
    while (f) {
        Candy_X = CandyPlaats._pickRandom()
        Candy_Y = CandyPlaats._pickRandom()
        if (Candy_X != SnakeHead_X && Candy_Y != SnakeHead_Y) {
            break;
        }
    }
}
input.onButtonPressed(Button.A, function () {
    Directie += -1
    if (Directie < 0) {
        Directie = 3
    }
})
input.onButtonPressed(Button.B, function () {
    Directie += 1
    if (Directie > 3) {
        Directie = 0
    }
})
function Dir () {
    music.playTone(139, music.beat(BeatFraction.Whole))
    if (Directie == 0) {
        SnakeHead_X += -1
    } else {
        if (Directie == 1) {
            SnakeHead_Y += -1
        } else {
            if (Directie == 2) {
                SnakeHead_X += 1
            } else {
                SnakeHead_Y += 1
            }
        }
    }
    if (SnakeHead_X > 4) {
        SnakeHead_X = 0
    }
    if (SnakeHead_X < 0) {
        SnakeHead_X = 4
    }
    if (SnakeHead_Y > 4) {
        SnakeHead_Y = 0
    }
    if (SnakeHead_Y < 0) {
        SnakeHead_Y = 4
    }
    for (let index = 0; index <= SnakeBodies_X.length - 2; index++) {
        if (SnakeHead_X == SnakeBodies_X[index] && SnakeHead_Y == SnakeBodies_Y[index]) {
            myImage = convertToText(0)
            music.startMelody(music.builtInMelody(Melodies.Wawawawaa), MelodyOptions.Once)
            game.gameOver()
        }
    }
    if (SnakeHead_X == Candy_X && SnakeHead_Y == Candy_Y) {
        SnakeBodies_X.unshift(SnakeHead_X)
        SnakeBodies_Y.unshift(SnakeHead_Y)
        music.startMelody(music.builtInMelody(Melodies.PowerUp), MelodyOptions.Once)
        game.addScore(1)
        NewCandy()
    }
}
let myImage = ""
let Candy_Y = 0
let Candy_X = 0
let f = false
let CandyPlaats: number[] = []
let SnakeBodies_Y: number[] = []
let SnakeBodies_X: number[] = []
let SnakeHead_Y = 0
let SnakeHead_X = 0
let Directie = 0
game.setScore(0)
basic.clearScreen()
Directie = 1
SnakeHead_X = 2
SnakeHead_Y = 3
SnakeBodies_X = []
SnakeBodies_Y = []
NewCandy()
loops.everyInterval(1000, function () {
    SnakeBodies_X.unshift(SnakeHead_X)
    SnakeBodies_Y.unshift(SnakeHead_Y)
    Dir()
    SnakeBodies_X.pop()
    SnakeBodies_Y.pop()
})
basic.forever(function () {
    basic.clearScreen()
    led.plotBrightness(Candy_X, Candy_Y, 100)
    led.plot(SnakeHead_X, SnakeHead_Y)
    for (let index2 = 0; index2 <= SnakeBodies_X.length - 1; index2++) {
        led.plotBrightness(SnakeBodies_X[index2], SnakeBodies_Y[index2], 255)
    }
})
