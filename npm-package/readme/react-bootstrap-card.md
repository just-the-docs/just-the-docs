# react-bootstrap-card
React Card wrapper for bootstrap 3 from Reactstrap

Its JSX only component, if you need CSS, look here:

https://github.com/martinbean/bootstrap-3-card

`npm i bootstrap-3-card`

## Using

Documentation here https://reactstrap.github.io/components/card/
```js
const card = (
  <Card>
    <CardBlock>
      <CardTitle>
        Some Title
      </CardTitle>
      Some body
    </CardBlock>
    <CardFooter className="text-xs-center">
      Some Footer
    </CardFooter>
  </Card>
);
```

## Import

You can export Cards direct from `react-bootstrap-card`
```js
import {
  Card,
  CardBlock,
  CardFooter,
  CardTitle,
  CardText,
} from 'react-bootstrap-card';
import {
  Col,
  Row,
} from 'react-bootstrap';
```

Or use polyfill and then export Card from `react-bootstrap`
```js
import 'react-bootstrap-card/react-bootstrap-polyfill';
import {
  Card,
  CardBlock,
  CardFooter,
  CardTitle,
  CardText,
  Col,
  Row,
} from 'react-bootstrap';
```
