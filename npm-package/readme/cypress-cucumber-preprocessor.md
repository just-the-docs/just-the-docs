[![styled with prettier](https://img.shields.io/badge/styled_with-prettier-ff69b4.svg)](https://github.com/prettier/prettier)
[![CircleCI](https://circleci.com/gh/TheBrainFamily/cypress-cucumber-preprocessor.svg?style=shield)](https://circleci.com/gh/TheBrainFamily/cypress-cucumber-preprocessor)

**This is a modified version of TheBrainFamily/cypress-cucumber-preprocessor. It runs scenario steps separately, not in batch anymore. So, the reports show each step separately and not the whole scenario as one step.**

# Run cucumber/gherkin-syntaxed specs with cypress.io

Follow the Setup steps, or if you prefer to hack on a working example, take a look at [https://github.com/TheBrainFamily/cypress-cucumber-example](https://github.com/TheBrainFamily/cypress-cucumber-example
)

## Setup

### Installation
Install this plugin:

```shell
npm install --save-dev cypress-cucumber-preprocessor
```

### Cypress Configuration
Add it to your plugins:

cypress/plugins/index.js
```javascript
const cucumber = require('cypress-cucumber-preprocessor').default
module.exports = (on, config) => {
  on('file:preprocessor', cucumber())
}
```

### Feature files

Put your feature files in cypress/integration/

Example: cypress/integration/Google.feature
```gherkin
Feature: The Facebook

  I want to open a social network page
  
  @focus
  Scenario: Opening a social network page
    Given I open Google page
    Then I see "google" in the title
```

(the @focus tag is not necessary, but we want to you to notice it so you look it up below. *It will speed up your workflow significantly*!)

### Step definitions

#### Cypress Cucumber Preprocessor Style (recommended!)

##### Step definitions unique for the feature

###### Configuration
First please use [cosmiconfig](https://github.com/davidtheclark/cosmiconfig) to create a configuration for the plugin, for example put this section:

```json
"cypress-cucumber-preprocessor": {
  "nonGlobalStepDefinitions": true
}
``` 
inside your package.json. (this will become the default option in a future version)

###### Step definitions creation
Then put your step definitions in cypress/integration with the folder name matching the .feature filename.
Easier to show than to explain, so, assuming the feature file is in cypress/integration/Google.feature , as proposed above, the preprocessor will read all the files inside cypress/integration/Google/, so: 

cypress/integration/Google/google.js (or any other .js file in the same path)
```javascript
import { Given } from "cypress-cucumber-preprocessor/steps";

const url = 'https://google.com'
Given('I open Google page', () => {
  cy.visit(url)
})
```

This is a good place to put before/beforeEach/after/afterEach hooks related to THAT PARTICULAR FEATURE. This is incredibly hard to get right with pure cucumber.  

##### Reusable step definitions

We also have a way to create reusable step definitions. Put them in cypress/integration/common/

Example:
cypress/integration/common/i_see_string_in_the_title.js
```javascript
import { Then } from "cypress-cucumber-preprocessor/steps";

Then(`I see {string} in the title`, (title) => {
  cy.title().should('include', title)
})
```

This is a good place to put global before/beforeEach/after/afterEach hooks. 

##### Why a new pattern?
The problem with the legacy structure is that everything is global. This is problematic for multiple reasons.
- It makes it harder to create .feature files that read nicely - you have to make sure you are not stepping on toes of already existing step definitions. You should be able to write your tests without worrying about reusability, complex regexp matches, or anything like that. Just write a story. Explain what you want to see without getting into the details. Reuse in the .js files, not in something you should consider an always up-to-date, human-readable documentation.
- The startup times get much worse - because we have to analyze all the different step definitions so we can match the .feature files to the test.
- Hooks are problematic. If you put before() in a step definition file, you might think that it will run only for the .feature file related to that step definition. You try the feature you work on, everything seems fine and you push the code. Here comes a surprise - it will run for ALL .feature files in your whole project. Very unintuitive. And good luck debugging problems caused by that! This problem was not unique to this plugin, bo to the way cucumberjs operates. 
 Let's look how this differs with the proposed structure. Assuming you want to have a hook before ./Google.feature file, just create a ./Google/before.js and put the hook there. This should take care of long requested feature - [https://github.com/TheBrainFamily/cypress-cucumber-preprocessor/issues/25](#25)

If you have a few tests the "oldschool" style is completely fine. But for a large enterprise-grade application, with hundreds or sometimes thousands of .feature files, the fact that everything is global becomes a maintainability nightmare. 

We suggest to put: 
```json
  "ignoreTestFiles": "*.js"
```
in your cypress.json to have a clean view of your tests in the cypress dashbord, and also so cypress doesn't try to run your step definition files as tests in CI. 

#### Oldschool/Legacy Cucumber style (please let us know if you decide to use it!)

##### Step Definition location configuration
Step definition files are by default in: cypress/support/step_definitions. If you want to put them somewhere please use [cosmiconfig](https://github.com/davidtheclark/cosmiconfig) format. For example, add to your package.json :

```javascript
  "cypress-cucumber-preprocessor": {
    "step_definitions": "cypress/support/step_definitions/"
  }
```

Follow your configuration or use the defaults and put your step definitions in cypress/support/step_definitions

Examples:
cypress/support/step_definitions/google.js
```javascript
import { Given } from "cypress-cucumber-preprocessor/steps";

const url = 'https://google.com'
Given('I open Google page', () => {
  cy.visit(url)
})
```

cypress/support/step_definitions/shared.js
```javascript
import { Then } from "cypress-cucumber-preprocessor/steps";

Then(`I see {string} in the title`, (title) => {
  cy.title().should('include', title)
})
```


#### Given/When/Then functions

Since Given/When/Then are on global scope please use
```javascript
/* global Given, When, Then */
```
to make IDE/linter happy

or import them directly as shown in the above examples

### Running

Run your cypress the way you would usually do, for example:

```bash
./node_modules/.bin/cypress open
```

click on a .feature file on the list of specs, and see the magic happening!

### Background section

Adding a background section to your feature will enable you to run steps before every scenario. For example, we have a counter that needs to be reset before each scenario. We can create a given step for resetting the counter. 

```javascript
let counter = 0;

Given("counter has been reset", () => {
  counter = 0;
});

When("counter is incremented", () => {
  counter += 1;
});

Then("counter equals {int}", value => {
  expect(counter).to.equal(value);
});
```

```gherkin
Feature: Background Section
  
   Background:
    Given counter has been reset

   Scenario: Basic example #1
     When counter is incremented
     Then counter equals 1
    
   Scenario: Basic example #2
     When counter is incremented
     When counter is incremented
     Then counter equals 2
```

### Sharing context

You can share context between step definitions using `cy.as()` alias.

Example:
```javascript
Given('I go to the add new item page', () => {
  cy.visit('/addItem');
});

When('I add a new item', () => { 
  cy.get('input[name="addNewItem"]').as('addNewItemInput');
  cy.get('@addNewItemInput').type('My item');
  cy.get('button[name="submitItem"]').click();
})

Then('I see new item added', () => {
  cy.get('td:contains("My item")');
});

Then('I can add another item', () => {
  expect(cy.get('@addNewItemInput').should('be.empty');
});

```

For more information please visit: https://docs.cypress.io/api/commands/as.html


### Tagging tests
You can use tags to select which test should run using [cucumber's tag expressions](https://github.com/cucumber/cucumber/tree/master/tag-expressions).
Keep in mind we are using newer syntax, eg. `'not @foo and (@bar or @zap)'`.
In order to initialize tests using tags you will have to run cypress and pass TAGS environment variable.

Example:
  ```cypress run -e TAGS='not @foo and (@bar or @zap)'```

### Smart tagging
Start your tests without setting any tags. And then put a @focus on the scenario (or scenarios) you want to focus on while development or bug fixing.

For example:
```gherkin
Feature: Smart Tagging

  As a cucumber cypress plugin which handles Tags
  I want to allow people to select tests to run if focused
  So they can work more efficiently and have a shorter feedback loop

  Scenario: This scenario should not run if @focus is on another scenario
    Then this unfocused scenario should not run

  @focus
  Scenario: This scenario is focused and should run
    Then this focused scenario should run

  @this-tag-affects-nothing
  Scenario: This scenario should also not run
    Then this unfocused scenario should not run

  @focus
  Scenario: This scenario is also focused and also should run
    Then this focused scenario should run
```

## Custom Parameter Type Resolves

Thanks to @Oltodo we can now use Custom Parameter Type Resolves. 
Here is an [example](cypress/support/step_definitions/customParameterTypes.js) with related [.feature file](cypress/integration/CustomParameterTypes.feature)

## Cucumber Expressions

We use https://docs.cucumber.io/cucumber/cucumber-expressions/ to parse your .feature file, please use that document as your reference 

## Development

Install all dependencies:
```bash
npm install
```

Link the package:
```bash
npm link 
npm link cypress-cucumber-preprocessor
```

Run tests:
```bash
npm test
```

## Disclaimer

Please let me know if you find any issues or have suggestions for improvements.

## WebStorm Support

If you want WebStorm to resolve your steps, use the capitalized Given/When/Then function names (instead of the initial given/when/then). 
Unfortunately, at this point WebStorm only understands regexp syntax:
 ```javascript
 Given(/^user navigated to the Start page?/, () => { });
```
Or a backtick syntax but without Cucumber Expressions :-(.
In other words, this works:
```javascript
Given(`user navigated to the start page`, () => { });
Then(/(.*?) is chosen/, choice => {})
```

But this doesn't:

```javascript
Then(`{word} is chosen`, choice => {})
```
 (See #56)


## TypeScript

If you want to use TypeScript put this in your plugins/index.js:

```javascript
const cucumber = require("cypress-cucumber-preprocessor").default;
const browserify = require("@cypress/browserify-preprocessor");

module.exports = (on) => {
  const options = browserify.defaultOptions;

  options.browserifyOptions.plugin.unshift(['tsify']);
  // Or, if you need a custom tsconfig.json for your test files:
  // options.browserifyOptions.plugin.unshift(['tsify', {project: 'path/to/other/tsconfig.json'}]);
  
  on("file:preprocessor", cucumber(options));
};
```

...and install tsify. I'm assuming you already have typescript installed. :-)

```bash
npm install tsify
```

Then in your .ts files you need to make sure you either require/import the functions defining step definitions, or declare them as global:

```typescript
declare const Given, When, Then;
// OR
import { Given, Then, When } from "cypress-cucumber-preprocessor/steps";
```

## Using Webpack

You can also use a Webpack loader to process feature files (TypeScript supported). To see how it is done please take 
a look here 
[cypress-cucumber-webpack-typescript-example](https://github.com/TheBrainFamily/cypress-cucumber-webpack-typescript-example)

## TODO

(Maybe?) Option to customize mocha template ( #3 )

## Credit where it's due!

Based/inspired on great work on https://github.com/sitegeist/gherkin-testcafe , although, with this package we don't have to run cypress programmatically - with an external runner, we can use cypress as we are used to :)

Thanks to the Cypress team for the fantastic work and very exciting tool! :-)

Thanks to @fcurella for fantastic work with making the preprocessor reactive to file changes. :-)
