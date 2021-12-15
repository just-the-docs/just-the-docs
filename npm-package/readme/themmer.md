# Themmer

[![Greenkeeper badge](https://badges.greenkeeper.io/elcoosp/themmer.svg)](https://greenkeeper.io/)
[![Build Status](https://travis-ci.org/elcoosp/themmer.svg?branch=master)](https://travis-ci.org/elcoosp/themmer) [![style: styled-components](https://img.shields.io/badge/style-%F0%9F%92%85%20styled--components-orange.svg?colorB=daa357&colorA=db748e)](https://github.com/styled-components/styled-components)

Easily access theme prop in styled-components

## Install

`npm i -S themmer`

## Why

```javascript
// Quite ugly theme accessing
const UglyComponent = styled.div`
  background-color: ${props => props.theme.color.main.light};
  color: ${props => props.theme.color.main.dark};
`
```

## What

```javascript
import tm from 'themmer'
// Less ugly theme accessing
const LessUglyComponent = styled.div`
  background-color: ${tm`color.main.light`};
  color: ${tm`color.main.dark`};
`
```
