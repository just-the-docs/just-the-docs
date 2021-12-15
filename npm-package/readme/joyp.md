# Joyp #

A javascript utility for polling the state of the joypads/gamepads.

### Usage ###

For any given frame of your game loop, you can poll if a button was pressed using `Joyp.wasJustPressed(gamepadIndex, buttonKey)`:

```js
if(Joyp.wasJustPressed(0, "left-trigger")) {
    player.shootGun()
}
```

For the button key, you can use either a [standard button code](https://www.w3.org/TR/gamepad/#remapping) or a human-readable button name, pictured here:

![](diagram.png)

You can also poll the axes of the stick using `Joy.getAxis(gamepadIndex, axisKey)`:

```js
position.x += Joy.getAxis(0, "left-stick-x")
position.y += Joy.getAxis(0, "left-stick-y")
```

### License ###

This project is licensed under the MIT license.
