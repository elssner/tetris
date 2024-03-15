function CheckReiheKomplett () {
    ReiheKomplett = true
    for (let xkommend = 0; xkommend <= 5 - 1; xkommend++) {
        if (!(led.point(xkommend, 4))) {
            ReiheKomplett = false
        }
    }
    if (ReiheKomplett) {
        pnt += 1
        for (let xnaechster = 0; xnaechster <= 5 - 1; xnaechster++) {
            led.unplot(xnaechster, 4)
        }
        for (let yy = 3; yy > 0; yy--) {
            for (let xx3 = 0; xx3 < 5; xx3++) {
                if (led.point(xx3, yy)) {
                    led.unplot(xx3, yy)
                    led.plot(xx3, yy + 1)
                }
            }
        }
    }
}
input.onButtonEvent(Button.A, ButtonEvent.Click, function () {
    led.unplot(xKoo, yKoo)
    if (xKoo > 0 && !(led.point(xKoo - 1, yKoo))) {
        xKoo = xKoo - 1
    }
    led.plot(xKoo, yKoo)
})
function startNummer () {
    basic.showString("#17")
    basic.pause(500)
    basic.clearScreen()
    basic.pause(200)
}
function Versuchzufallen () {
    nochplatz = yKoo < 4 && !(led.point(xKoo, yKoo + 1))
    if (nochplatz) {
        led.unplot(xKoo, yKoo)
        yKoo = yKoo + 1
        led.plot(xKoo, yKoo)
    } else {
        SpielEnde = yKoo == 0
    }
    if (SpielEnde) {
        basic.clearScreen()
        basic.showIcon(IconNames.No)
        basic.showNumber(pnt)
        basic.pause(1000)
        pnt = 0
        verzoegerung = 500
        nochplatz = true
        while (!(SpielEnde)) {
            yKoo = 0
            xKoo = randint(0, 4)
            nochplatz = true
            led.plot(xKoo, yKoo)
            while (nochplatz) {
                basic.pause(verzoegerung)
                Versuchzufallen()
            }
        }
        basic.showLeds(`
            . . . . .
            . . . . .
            . . . . .
            . . . . .
            . . . . .
            `)
        SpielEnde = false
    }
    CheckReiheKomplett()
}
input.onButtonEvent(Button.B, ButtonEvent.Click, function () {
    led.unplot(xKoo, yKoo)
    if (xKoo < 4 && !(led.point(xKoo + 1, yKoo))) {
        xKoo = xKoo + 1
    }
    led.plot(xKoo, yKoo)
})
let ReiheKomplett = false
let xKoo = 0
let yKoo = 0
let SpielEnde = false
let nochplatz = false
let verzoegerung = 0
let pnt = 0
pnt = 0
startNummer()
verzoegerung = 500
nochplatz = true
while (!(SpielEnde)) {
    yKoo = 0
    xKoo = randint(0, 4)
    nochplatz = true
    led.plot(xKoo, yKoo)
    while (nochplatz) {
        basic.pause(verzoegerung)
        Versuchzufallen()
    }
}
basic.showLeds(`
    . . . . .
    . . . . .
    . . . . .
    . . . . .
    . . . . .
    `)
