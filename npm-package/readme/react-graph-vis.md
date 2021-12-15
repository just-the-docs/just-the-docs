# React graph vis

A React component to display beautiful network graphs using vis.js

Show, don't tell: [Demo](http://crubier.github.io/react-graph-vis/)

Make sure to visit [visjs.org](http://visjs.org) for more info.

Rendered graphs are scrollable, zoomable, retina ready, dynamic, and switch layout on double click.

![A graph rendered by vis js](example.png)

Due to the imperative nature of vis.js, updating graph properties causes complete redraw of graph and completely porting it to React is a big project itself!

This component takes three vis.js configuration objects as properties:  

- graph: contains two arrays { edges, nodes }
- options: normal vis.js options as described [here](http://visjs.org/docs/network/#options)
- events: an object that has [event name](http://visjs.org/docs/network/#Events) as keys and their callback as values

# Usage

```javascript
import React from "react";
import ReactDOM from "react-dom";
import Graph from "react-graph-vis";

import "./styles.css";
// need to import the vis network css in order to show tooltip
import "./network.css";

function App() {
  const graph = {
    nodes: [
      { id: 1, label: "Node 1", title: "node 1 tootip text" },
      { id: 2, label: "Node 2", title: "node 2 tootip text" },
      { id: 3, label: "Node 3", title: "node 3 tootip text" },
      { id: 4, label: "Node 4", title: "node 4 tootip text" },
      { id: 5, label: "Node 5", title: "node 5 tootip text" }
    ],
    edges: [
      { from: 1, to: 2 },
      { from: 1, to: 3 },
      { from: 2, to: 4 },
      { from: 2, to: 5 }
    ]
  };

  const options = {
    layout: {
      hierarchical: true
    },
    edges: {
      color: "#000000"
    },
    height: "500px"
  };

  const events = {
    select: function(event) {
      var { nodes, edges } = event;
    }
  };
  return (
    <Graph
      graph={graph}
      options={options}
      events={events}
      getNetwork={network => {
        //  if you want access to vis.js network api you can set the state in a parent component using this property
      }}
    />
  );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);

```











You can also check out the demo in the [`example`](https://github.com/crubier/react-graph-vis/tree/master/example) folder.
