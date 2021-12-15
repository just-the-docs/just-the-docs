# superframe

A super collection of A-Frame components.

[VIEW DEMOS](https://supermedium.com/superframe/)

## Components

See documentation for individual components:

- [aabb-collider](https://github.com/supermedium/superframe/tree/master/components/aabb-collider/) - An axis-aligned bounding box component for A-Frame.
- [animation](https://github.com/supermedium/superframe/tree/master/components/animation/) - Animations in A-Frame using anime.js
- [animation-timeline](https://github.com/supermedium/superframe/tree/master/components/animation-timeline/) - A timeline component to use with the A-Frame animation component.
- [atlas-uvs](https://github.com/supermedium/superframe/tree/master/components/atlas-uvs/) - An A-Frame component to set UVs onto a plane geometry given a gridded texture atlas.
- [audioanalyser](https://github.com/supermedium/superframe/tree/master/components/audioanalyser/) - Audio visualizations in A-Frame using Web Audio (AnalyserNode)
- [broadcast](https://github.com/supermedium/superframe/tree/master/components/broadcast/) - Multi-user in A-Frame using raw websockets
- [camera-recorder](https://github.com/supermedium/superframe/tree/master/components/camera-recorder/) - A component to film and record A-Frame scenes with a controlled camera (pans, dollies, tilts).
- [debug-cursor](https://github.com/supermedium/superframe/tree/master/components/debug-cursor/) - A component to pretty-log cursor events.
- [entity-generator](https://github.com/supermedium/superframe/tree/master/components/entity-generator/) - Generate a number of entities in A-Frame given a mixin
- [event-set](https://github.com/supermedium/superframe/tree/master/components/event-set/) - Set properties in response to events in A-Frame
- [firebase](https://github.com/supermedium/superframe/tree/master/components/firebase/) - Multi-user in A-Frame using Firebase
- [fps-counter](https://github.com/supermedium/superframe/tree/master/components/fps-counter/) - A simple FPS counter component to measure performance in VR for A-Frame.
- [geometry-merger](https://github.com/supermedium/superframe/tree/master/components/geometry-merger/) - An A-Frame component to merge geometries to reduce draw calls.
- [gltf-part](https://github.com/supermedium/superframe/tree/master/components/gltf-part/) - A component to extract parts from a GLTF model into their own A-Frame entities.
- [haptics](https://github.com/supermedium/superframe/tree/master/components/haptics/) - A controller haptics (vibrations) component for A-Frame.
- [layout](https://github.com/supermedium/superframe/tree/master/components/layout/) - Position and layout child entities in 3D space for A-Frame
- [log](https://github.com/supermedium/superframe/tree/master/components/log/) - In-VR console logs for A-Frame.
- [look-at](https://github.com/supermedium/superframe/tree/master/components/look-at/) - Rotate an entity to face towards another entity in A-Frame
- [mountain](https://github.com/supermedium/superframe/tree/master/components/mountain/) - Mountain terrain in A-Frame using randomly-generated height maps
- [orbit-controls](https://github.com/supermedium/superframe/tree/master/components/orbit-controls/) - Orbit controls component for A-Frame.
- [proxy-event](https://github.com/supermedium/superframe/tree/master/components/proxy-event/) - A component to declaratively proxy events for A-Frame.
- [randomizer](https://github.com/supermedium/superframe/tree/master/components/randomizer/) - Randomize color, position, rotation, and scale in A-Frame
- [render-order](https://github.com/supermedium/superframe/tree/master/components/render-order/) - A component that enables sorting and manually defining render order for transparent objects.
- [state](https://github.com/supermedium/superframe/tree/master/components/state/) - State management for A-Frame using single global state modified through actions. State flows down to application via declarative binding.
- [sun-sky](https://github.com/supermedium/superframe/tree/master/components/sun-sky/) - Gradient sky with adjustable sun in A-Frame
- [template](https://github.com/supermedium/superframe/tree/master/components/template/) - Encapsulate groups of entities, use templating engines, and do string interpolations in A-Frame
- [text-geometry](https://github.com/supermedium/superframe/tree/master/components/text-geometry/) - Geometry-based text for A-Frame
- [thumb-controls](https://github.com/supermedium/superframe/tree/master/components/thumb-controls/) - An A-Frame component that provides and normalizes directional events for thumbpads and thumbsticks.


## Local Installation

Go to the folder of the component or scene you wish to develop and check out
its README. The steps generally involve:

```bash
git clone git@github.com:supermedium/superframe && cd superframe
# Head to the folder to develop (e.g., `cd components/foo`, `cd scenes/foo`).
npm install
npm run dev  # (or sometimes `npm run start`)
```

A page should open in your browser. You can develop on the source code and the
server will handle live compilation and bundling.
