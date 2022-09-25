function doInit () {
    go = 0
    leftSpeed = 128
    rightSpeed = 128
}
input.onLogoEvent(TouchButtonEvent.LongPressed, function () {
    go = 1
})
input.onLogoEvent(TouchButtonEvent.Pressed, function () {
    go = (go + 1) % 2
})
function doUpdateSpeed () {
    maqueen.motorRun(maqueen.Motors.M1, maqueen.Dir.CW, leftSpeed * go)
    maqueen.motorRun(maqueen.Motors.M2, maqueen.Dir.CW, rightSpeed * go)
}
let rightSpeed = 0
let leftSpeed = 0
let go = 0
basic.showIcon(IconNames.Square)
basic.pause(100)
basic.showIcon(IconNames.SmallSquare)
basic.pause(100)
basic.showIcon(IconNames.SmallDiamond)
basic.pause(100)
doInit()
music.playSoundEffect(music.createSoundEffect(WaveShape.Square, 400, 600, 255, 0, 50, SoundExpressionEffect.Warble, InterpolationCurve.Linear), SoundExpressionPlayMode.UntilDone)
basic.forever(function () {
    doUpdateSpeed()
    basic.showIcon(IconNames.Yes)
    serial.writeLine("left: " + maqueen.readPatrol(maqueen.Patrol.PatrolLeft) + ", right: " + maqueen.readPatrol(maqueen.Patrol.PatrolRight) + ", front: " + maqueen.Ultrasonic(PingUnit.Centimeters))
    serial.writeLine("loud: " + input.soundLevel() + ", stop: " + go)
    if (maqueen.Ultrasonic(PingUnit.Centimeters) < 10) {
        go = 0
    }
})
