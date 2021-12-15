# ngentest
Angular5,6,7,8+ Unit Test Generator For Components, Directive, Services, and Pipes

## Install & Run
```bash
$ npm install ngentest -g # to run this command anywhere
$ ngentest my.component.ts 
$ ngentest my.directive.ts -s # write unit test to my.directive.spec.ts
$ ngentest my.directive.ts -c ../ngentest.config.js # use the given config file.
```

To see the source file and generated examples, please take a look at examples directory.
https://github.com/allenhwkim/ngentest/tree/master/examples

## Config
You can override configuration by creating a file named as `ngentest.config.js` in your application directory and running ngentest from that directory. You can also provide a configuration file using `-c my.config.js`.

  * **framework**: `jest` or `karma`. The default is `jest`. This value determines how function mock and assert is to be done.

  * **templates**: template string for each type. Please specify your own template if you want to override
    the default template. There are five types;
    * klass: ejs template for an ES6 class without angular decorator.
    * component: ejs template for an Angular component.
    * directive: ejs template for an Angular directive.
    * injectable: ejs template for an Angular service.
    * pipe: ejs template for an Angular pipe.

    e.g., 
    ```javascript
    templates: {
      klass: myKlassTemplate,
      component: myComponentTemplate,
      directive: myDirectiveTemplate,
      injectable: myInjectableTemplate, 
      pipe: myPipeTemplate 
    }
    ```

  * **directives**: Array of diretive names, necessary for a component test. e.g., 
    ```javascript
    directives: ['myDirective']
    ```

  * **pipes**: Array of pipe names, necessary for a component test. e.g. 
    ```javascript
    pipes: ['translate', 'phoneNumber', 'safeHtml']
    ```

  * **replacements**: There are some codes, which causes error without proper environment. You need to replace these codes.
    You can specify `from` value with regular expression and `to` value with string.
    e.g. 
    ```javascript
    replacements: [
      { from: '^\\S+\\.define\\(.*\\);', to: ''}`
    ]
    ```

  * **providerMocks**: When the following class is used in a constructor parameter, create a mock class with the given statements.
    e.g.
    ```javascript
    providerMocks: {
      ElementRef: ['nativeElement = {};'],
      Router: ['navigate() {};'],
      Document: ['querySelector() {};'],
      HttpClient: ['post() {};'],
      TranslateService: ['translate() {};'],
      EncryptionService: [],
    }
    ```

  * **includeMatch**: When ngentest runs with a directory, include only these files. e.g.,
    ```javascript
    includeMatch: [/(component|directive|pipe|service).ts/],
    ````
  
  * **excludeMatch**: When ngentest runs with a directory, exclude these files. e.g., 
    ```javascript
    excludeMatch: [/.*module.ts$/]
    ```
  ### Full Example (https://github.com/allenhwkim/ngentest/blob/master/ngentest.config.js)
  ```javascript
  module.exports = {
    framework: 'karma', // or 'jest'
    templates: {
      klass: klassTemplate,  // ejs contents read from file
      component: componentTemplate,
      directive: directiveTemplate,
      injectable: injectableTemplate, 
      pipe: pipeTemplate 
    },
    // necessary directives used for a component test
    directives: [
      'oneviewPermitted'
    ], 
    // necessary pipes used for a component test
    pipes: [
      'translate', 'phoneNumber', 'safeHtml'
    ],
    // when convert to JS, some codes need to be replaced to work 
    replacements: [ // some 3rd party module causes an error
      { from: 'require\\("html-custom-element"\\)', to: '{}'}, 
      { from: '^\\S+\\.define\\(.*\\);', to: ''} // some commands causes error
    ],
    // when constructor param type is as following, create a mock class with this properties
    // e.g. @Injectable() MockElementRef { nativeElement = {}; }
    providerMocks: {
      ElementRef: ['nativeElement = {};'],
      Router: ['navigate() {};'],
      Document: ['querySelector() {};'],
      HttpClient: ['post() {};'],
      TranslateService: ['translate() {};'],
      EncryptionService: [],
    },
    // when ngentest runs with a directory, include only these files
    includeMatch: [/(component|directive|pipe|service).ts/],
    // when ngentest runs with a directory, exclude these files
    excludeMatch: []
  }
  ```

## How It works

1. Parse a Typescript file and find these info.

    * imports: imports statements info.
    * inputs: @Input statements info.
    * outputs: @Output statements info.
    * component provider: providers info used in @Component decorator.
    * selector: selector info used in @Component or @Directove decorator.

2. Compile Typescript to Javascript, then parse the Javascript, and get the following info.

    * constructor param data
    * provider mock data
    * accessor tests
    * function tests

3. build ejs data from #1 and #2, and generate test code.

## For Developers: To make it sure it does not break any feature

Genearate spec files for all examples and compare if there is any difference.
```bash
$ sh tools/all-examples.sh
$ git diff
```
