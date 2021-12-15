# Material-UI Tree View

A React tree view for material-ui with TypeScript support.

See the demo at https://hassanali.me/material-ui-treeview.

## Getting started

```
# If using Yarn:
yarn add material-ui-treeview @material-ui/core

# If using npm:
npm install --save material-ui-treeview @material-ui/core
```

### Usage

After importing the component, it can be rendered with the required `tree` prop:

#### Import

```js
import MuiTreeView from 'material-ui-treeview';

// using require
const MuiTreeView = require('material-ui-treeview').default;
```

#### Example

```jsx
import React from 'react';
import { render } from 'react-dom';
import MuiTreeView from 'material-ui-treeview';

const tree = [
  {
    value: 'Parent A',
    nodes: [{ value: 'Child A' }, { value: 'Child B' }],
  },
  {
    value: 'Parent B',
    nodes: [
      {
        value: 'Child C',
      },
      {
        value: 'Parent C',
        nodes: [
          { value: 'Child D' },
          { value: 'Child E' },
          { value: 'Child F' },
        ],
      },
    ],
  },
];

render((
  <MuiTreeView tree={tree} />
), document.getElementById('root'));
```

### Props


| Property | Type | Required? | Description |
| --- | --- | --- | --- |
| tree | object | yes | The data to render as a tree view |
| onLeafClick | function | no | Callback function fired when a tree leaf is clicked. |
| onParentClick | function | no | Callback function fired when a tree parent node is clicked. |
| onEmptySearch | node | no | If `searchTerm` or `softSearch` is provided and the filtered tree is empty then `onEmptySearch` will render. This is used to render something other than an empty tree.  |
| searchTerm | string | no | A search term to refine the tree. |
| softSearch | boolean | no | Given a `searchTerm`, a subtree will be shown if any parent node higher up in the tree matches the search term. Defaults to `false`. |
| expansionPanelSummaryProps | object | no | Properties applied to the [ExpansionPanelSummary](https://material-ui.com/api/expansion-panel-summary) element. | 
| expansionPanelDetailsProps | object | no | Properties applied to the [ExpansionPanelDetails](https://material-ui.com/api/expansion-panel-details) element. |
| listItemProps | object | no | Properties applied to the [ListItem](https://material-ui.com/api/list-item) element. |
| caseSensitiveSearch | boolean | no | If true, search is case sensitive. Defaults to false. |
| Link | node | no | A React Router Link node to use. _Required_ when a leaf node has an href value. |

## Development and Contributing

* Fork and clone this repo.
* Install the dependencies with yarn.
* Start the
    - development server with yarn start. Open a browser to http://localhost:5000.
    - styleguide with yarn start:styleguide. Open a browser to http://localhost:6060.

Feel free to open an issue, submit a pull request, or contribute however you would like.
Understand that this documentation is still a work in progress, so file an issue or submit a PR
to ask questions or make improvements. Thanks!
