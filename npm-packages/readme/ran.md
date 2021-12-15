[![Build Status](https://img.shields.io/travis/synesenom/ran/master.svg)](https://travis-ci.org/synesenom/ran)
[![Coverage Status](https://coveralls.io/repos/github/synesenom/ran/badge.svg?branch=master)](https://coveralls.io/github/synesenom/ran?branch=master)
[![npm](https://img.shields.io/npm/v/ranjs.svg)](https://www.npmjs.com/package/ranjs)
[![David](https://img.shields.io/david/synesenom/ranjs.svg)](https://david-dm.org/synesenom/ran)
[![David](https://img.shields.io/david/dev/synesenom/ranjs.svg)](https://david-dm.org/synesenom/ran)
[![Inline docs](http://inch-ci.org/github/synesenom/ran.svg?branch=master)](http://inch-ci.org/github/synesenom/ran)
[![License](https://img.shields.io/npm/l/ranjs.svg)](https://www.npmjs.com/package/ranjs)
[![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

# ranjs

Statistical library for generating various seeded random variates, calculating likelihood functions and testing hypotheses (and much more).

The library includes:

1. Statistical metrics and tests: a variety of central tendency, dispersion and shape statistics as well as statistical tests.
2. Probability distributions: more than [130 continuous and discrete distributions](https://synesenom.github.io/ran/#dist.Distribution) (and counting), each tested rigorously for statistical correctness over a variety of parameters. Every distribution comes with the following methods:

    2.1 fast and robust sampler.  
    2.2 probability density/mass function.  
    2.3 cumulative distribution function.  
    2.4 quantile function.  
    2.5 survival, hazard and cumulative hazard functions.  
    2.6 likelihood and AIC/BIC methods.  
    2.7 test method that uses Kolmogorov-Smirnov test for continuous or chi2 tests for discrete distributions.

    Also, every distribution can be individually seeded.

## install

### browser

Just include the [minified version](https://unpkg.com/ranjs@1.19.2/dist/ranjs.min.js) and add

```
<script type="text/javascript" src="ran.min.js"></script>
```
The module will be exported under `ranjs`.

### node

```
npm install ranjs
```

## usage

### distributions

```
const ran = require('ranjs')

// Create a new generator for Skellam distribution with mu1 = 1 and mu2 = 3
const skellam = new ran.dist.Skellam(1, 3)

// Generate 10K variates
let values = skellam.sample(1e4)

// Test if samples indeed follow the specified distribution
console.log(skellam.test(values))
// => { statistics: 14.025360669436635, passed: true }

// Evaluate PMF/CDF ...
for (let k = -10; k <= 10; k++) {
    console.log(k, skellam.pdf(k), skellam.cdf(k))
}
// => -4 0.10963424740027695 0.21542206959904264
//    -3 0.1662284357019246 0.38165050508716936
//    -2 0.20277318483535026 0.5844236896611729
//    ...

// ... or higher level statistical functions
for (let k = -4; k <= 4; k++) {
    console.log(k, skellam.hazard(k), skellam.cHazard(k))
}
// => -4 0.13973659359019766 0.24260937407418487
//    -3 0.26882602325948046 0.4807014556249526
//    -2 0.487932492278074 0.8780890224913454
//    ...


// Create another distribution and check their AIC
const skellam2 = new ran.dist.Skellam(1.2, 7.5)
console.log(`Skellam(1, 3):     ${skellam.aic(values)}`)
// => Skellam(1, 3):     41937.67252974663

console.log(`Skellam(1.2, 7.5): ${skellam2.aic(values)}`)
// => Skellam(1.2, 7.5): 66508.74299363888
```

## demo

A demo observable notebook is available [here](https://beta.observablehq.com/@synesenom/ranjs-demo) to play around with the library.

## API and documentation

For the full API and documentation, see: [https://synesenom.github.io/ran/](https://synesenom.github.io/ran/)

