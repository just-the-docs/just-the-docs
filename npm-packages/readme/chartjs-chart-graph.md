# Chart.js Graphs

[![NPM Package][npm-image]][npm-url] [![Github Actions][github-actions-image]][github-actions-url]

Chart.js module for charting graphs. Adding new chart types: `graph`, `forceDirectedGraph`, `dendogram`, and `tree`.

![force](https://user-images.githubusercontent.com/4129778/65398353-9bc03f80-dd84-11e9-8f14-339635c1ba4e.png)

![dend_h](https://user-images.githubusercontent.com/4129778/65398352-9bc03f80-dd84-11e9-9197-ecb66a872736.png)

![tree_v](https://user-images.githubusercontent.com/4129778/65398350-9bc03f80-dd84-11e9-8c94-e93c07040ee7.png)

![radial](https://user-images.githubusercontent.com/4129778/65398354-9bc03f80-dd84-11e9-9633-c4c80bd9c384.png)

Works great with https://github.com/chartjs/chartjs-plugin-datalabels or https://github.com/chrispahm/chartjs-plugin-dragdata

![data label](https://user-images.githubusercontent.com/4129778/65398517-a0392800-dd85-11e9-800a-144a13ad2ba1.png)

[![Open in CodePen][codepen]](https://codepen.io/sgratzl/pen/vYNVbgd)

## Related Plugins

Check out also my other chart.js plugins:

- [chartjs-chart-boxplot](https://github.com/sgratzl/chartjs-chart-boxplot) for rendering boxplots and violin plots
- [chartjs-chart-error-bars](https://github.com/sgratzl/chartjs-chart-error-bars) for rendering errors bars to bars and line charts
- [chartjs-chart-geo](https://github.com/sgratzl/chartjs-chart-geo) for rendering map, bubble maps, and choropleth charts
- [chartjs-chart-pcp](https://github.com/sgratzl/chartjs-chart-pcp) for rendering parallel coordinate plots
- [chartjs-chart-venn](https://github.com/sgratzl/chartjs-chart-venn) for rendering venn and euler diagrams
- [chartjs-chart-wordcloud](https://github.com/sgratzl/chartjs-chart-wordcloud) for rendering word clouds
- [chartjs-plugin-hierarchical](https://github.com/sgratzl/chartjs-plugin-hierarchical) for rendering hierarchical categorical axes which can be expanded and collapsed

## Install

```bash
npm install --save chart.js chartjs-chart-graph
```

## Usage

see [Samples](https://github.com/sgratzl/chartjs-chart-graph/tree/master/samples) on Github

CodePens

- [Force Directed Layout](https://codepen.io/sgratzl/pen/mdezvmL)
- [Tree Layouts](https://codepen.io/sgratzl/pen/jObedwg)
- [Tree With Data Labels](https://codepen.io/sgratzl/pen/vYNVbgd)

## Graphviz Dot File Parsing

A Graphviz Dot File parsing package is located at https://github.com/sgratzl/chartjs-chart-graph-dot-parser.
It creates compatible data structures to be consumed by this plugin.

## Styling

The new chart types are based on the existing `line` controller. Tho, instead of showing a line per dataset it shows edges as lines. Therefore, the styling options for points and lines are the same. See also https://www.chartjs.org/docs/latest/charts/line.html. However, to avoid confusion, the line options have a default `line` prefix, e..g `lineBorderColor` to specify the edge border color and `pointBorderColor` to specify the node border color.

## Data Structure

```js
data: {
  labels: ['A', 'B', 'C'], // node labels
  datasets: [{
    data: [ // nodes as objects
      { x: 1, y: 2 }, // x, y will be set by the force directed graph and can be omitted
      { x: 3, y: 1 },
      { x: 5, y: 3 }
    ],
    edges: [ // edge list where source/target refers to the node index
      { source: 0, target: 1},
      { source: 0, target: 2}
    ]
  }]
},
```

Alternative structure for trees

```js
data: {
  labels: ['A', 'B', 'C'], // node labels
  datasets: [{
    data: [ // nodes as objects
      { x: 1, y: 2 }, // x, y will be set by the force directed graph and can be omitted
      { x: 3, y: 1, parent: 0 },
      { x: 5, y: 3, parent: 0 }
    ]
  }]
},
```

## Force Directed Graph

chart type: `forceDirectedGraph`

Computes the x,y position of nodes based on a force simulation. It is based on https://github.com/d3/d3-force/.

![force](https://user-images.githubusercontent.com/4129778/65398353-9bc03f80-dd84-11e9-8f14-339635c1ba4e.png)

[![Open in CodePen][codepen]](https://codepen.io/sgratzl/pen/mdezvmL)

### Options

## Dendogram, Tree

chart types: `dendogram`, `tree`

The tree and dendograms layouts are based on https://github.com/d3/d3-hierarchy.

**Dendogram Horizontal**

![dend_h](https://user-images.githubusercontent.com/4129778/65398352-9bc03f80-dd84-11e9-9197-ecb66a872736.png)

[![Open in CodePen][codepen]](https://codepen.io/sgratzl/pen/jObedwg)

**Dendogram Vertical**

![dend_v](https://user-images.githubusercontent.com/4129778/65398355-9bc03f80-dd84-11e9-9ea3-9501a79491fb.png)

[![Open in CodePen][codepen]](https://codepen.io/sgratzl/pen/jObedwg)

**Dendogram Radial**

![radial](https://user-images.githubusercontent.com/4129778/65398460-581a0580-dd85-11e9-93b6-b70946f1155f.png)

[![Open in CodePen][codepen]](https://codepen.io/sgratzl/pen/jObedwg)

**Tidy Tree Horizontal**

![tree_h](https://user-images.githubusercontent.com/4129778/65398351-9bc03f80-dd84-11e9-83f9-50b454fa6929.png)

[![Open in CodePen][codepen]](https://codepen.io/sgratzl/pen/jObedwg)

**Tidy Tree Vertical**

![tree_v](https://user-images.githubusercontent.com/4129778/65398350-9bc03f80-dd84-11e9-8c94-e93c07040ee7.png)

[![Open in CodePen][codepen]](https://codepen.io/sgratzl/pen/jObedwg)

**Tidy Tree Radial**

![radial](https://user-images.githubusercontent.com/4129778/65398354-9bc03f80-dd84-11e9-9633-c4c80bd9c384.png)

[![Open in CodePen][codepen]](https://codepen.io/sgratzl/pen/jObedwg)

### Options

### ESM and Tree Shaking

The ESM build of the library supports tree shaking thus having no side effects. As a consequence the chart.js library won't be automatically manipulated nor new controllers automatically registered. One has to manually import and register them.

Variant A:

```js
import { Chart, LinearScale, Point } from 'chart.js';
import { ForceDirectedGraphController, EdgeLine } from 'chartjs-chart-graph';

// register controller in chart.js and ensure the defaults are set
Chart.register(ForceDirectedGraphController, EdgeLine, LinearScale, Point);
...

new Chart(ctx, {
  type: ForceDirectedGraphController.id,
  data: [...],
});
```

Variant B:

```js
import { ForceDirectedGraphChart } from 'chartjs-chart-graph';

new ForceDirectedGraphChart(ctx, {
  data: [...],
});
```

## Development Environment

```sh
npm i -g yarn
yarn install
yarn sdks vscode
```

### Building

```sh
yarn install
yarn build
```

[npm-image]: https://badge.fury.io/js/chartjs-chart-graph.svg
[npm-url]: https://npmjs.org/package/chartjs-chart-graph
[github-actions-image]: https://github.com/sgratzl/chartjs-chart-graph/workflows/ci/badge.svg
[github-actions-url]: https://github.com/sgratzl/chartjs-chart-graph/actions
[codepen]: https://img.shields.io/badge/CodePen-open-blue?logo=codepen
