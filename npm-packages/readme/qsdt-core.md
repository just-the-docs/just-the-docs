# ![qsdt-logo](https://raw.githubusercontent.com/arthmoeros/qsdt-ui/master/src/assets/img/rsz_qsdt-logo.png)@qsdt/core

### QSDT's artifacts core generation service

<!--### Checkout Github's parsed README for a better visualization! -> https://github.com/arthmoeros/qsdt-core/-->

(If you are looking for the RESTful API, check [@qsdt/webapi](https://github.com/arthmoeros/qsdt-webapi)

#### What's this? - Intro
This is QSDT's core module (previously known as @qsdt/worker), it makes use of the template engine to build all the artifacts required via a Programmatic API. QSDT provides any necessary details about its current configuration via this same API. On an artifact generation request, QSDT will take its input and process it through its configuration, the outcome of this is a zip file, which is stored in a temporary folder until a get request is issued to retrieve this file.

This new version has its API Promisified for compatibility with other storage methods besides file system.

#### How do I use this?

This is available as a npm package
```bash
npm install @qsdt/core
```

By default the config and temp directories are within the core base folder, you can customize these paths using the environment variables *QSDT_CONFIG* and *QSDT_TMP*, here is a unix example:

```bash
# Default is ./config
export QSDT_CONFIG=/etc/qsdt_custom
# Default is ./tmp
export QSDT_TMP=/var/qsdt_custom
```

#### What's in here? - API
QSDT can be used as a Programmatic API, accesible via the QSDT class, which contains the following methods:

---------------------------------
#### Get Form Configurations list

Class Name | Method
---------- | ------
QSDT | #getForms(): Promise<string[]>

Retrieves a list of presumably valid form configurations ids on the configuration path of QSDT. It returns a string array containing each form configuration ID (file name without extension).

#### Get Form Configuration

Class Name | Method
---------- | ------
QSDT | #getForm(id: string): Promise<string>

Retrieves the contents of an identified form configuration file on QSDT as a generic object.

#### Request Artifact Generation

Class Name | Method
---------- | ------
QSDT | #requestArtifactGeneration(request: {}): Promise<string>

Requests an artifact generation and returns an uuid to retrieve the generated artifacts. 

#### Retrieve generated artifacts

Class Name | Method
---------- | ------
QSDT | #getGeneratedArtifacts(uuid: string): Buffer

Retrieves a generated artifact, once is retrieved it is deleted from the temp folder, any subsequent try to get the same artifact will result in a 404 not found error.

---------------------------------
#### How do I make a Form Configuration? - Form Configuration "Schema"
Form Configurations in QSDT are JSON files with expected properties to define how a client can request an artifact generation, this file will be explained using the sample configuration bundled with it.

##### Forms
The root of each Form Configuration is a forms array, each contains a name, description and input data required to be submitted.
A forms begins like this:

```js
{
    /* 
        A forms array, each one represent a possible input for a single blueprint and task,
        it is suggested that one group of forms = 1 blueprint.
    */
    "$forms": [ 
        {
            /*
                A display name and description for the Form
            */
            "$formName": "Sample Form 1",
            "$formDescription": "Blah blah blah...",
```

##### Request Schema
This is 'like' a Schema, and since there is no yet a single decent json schema parser in npm (and the specification is not finished), this one will do for now.
At its base has static data for internal referencing, such as its own form configuration json file name, generation name and its underlying task name, these must be provided as is in each request that uses this structure. QSDT expects this data to work.
The rest of the structure is what it should be expected when a request for artifact generation is submitted along with the before mentioned static data, except each last child in each hierarchy, which have a type definition and miscellaneous information, such as:

"Tag" | Meaning
----- | -------
@type | Describes the data/field type (string,number,date,array,choice)
@defaultValue | Default value provided by the configuration
@required | A flag that indicates that this value is required by the matching blueprint underlying templates
@options | Used by a 'choice' @type, must provide a string array for fixed options of this value
@item | Used by an 'array' @type, must provide a underlying element(s) with its own type and miscellaneous information

##### Input Display Data
Additional metadata for the input definition, this defines how can the input data be labeled and further supported, this information is essential for a better understanding of the data required by the form.

##### Declared Post Processors
Declared post processors for the submitted values, these are run by QSDT before any template processing, just after recieving the request.

QSDT for now supports these:
- string.allLowerCase
- string.allUpperCase
- string.startWithUpperCase
- string.startWithLowerCase
- string.blanksToCamelCase

#### I saw something about a Blueprint? - Blueprint "Schema"
Just like the Form Configuration json files, there are Blueprint json files, these contains tasks that can be executed for a corresponding artifact generation. There is a sample packaged with the application.

Each task can contain a subset of instructions for the internal blueprint processor to read and execute, these instructions have their underlying properties, can be nested and represent the outcoming structure of the artifacts generated for each task. Some properties uses the same template engine and request values for processing template'd values.

Instruction | Properties | Description
----------- | ---------- | -----------
rootContents | - | Array that describes the root point from where the outcome of the generation is output'd, is treated like a folder instruction
**folder** | **-** | **Outputs a folder**
\- | includeif | A mapped expression those result will be used as a boolean to determine if this element and its nested elements will be included in the generated artifacts
\- | targetName | A template name for the expected name of the folder
\- | contents | Nested instructions for more output elements
**atmpl** | **-** | **Outputs a file using an atmpl template file**
\- | includeif | A mapped expression those result will be used as a boolean to determine if this element will be included in the generated artifacts
\- | location | Path to look for the atmpl file, this is relative to the ***QSDT_CONFIG*/blueprint-material/<blueprint-name>** folder
\- | targetName | A template name for the expected name of the generated artifact
\- | parameters | Passed parameters to the Template Processor, for use with Parameterized Expressions
**static** | **-** | **Outputs a file in a static way, in other words, it just makes a copy of it**
\- | includeif | A mapped expression those result will be used as a boolean to determine if this element will be included in the generated artifacts
\- | location | Path to look for the static file, this is relative to the ***QSDT_CONFIG*/config/blueprint-material/<blueprint-name>** folder
\- | targetName | A template name for the expected name of the copied file
**foreach** | **-** | **Instruction to iterate a contained element given a specific array, if you wish to iterate more than one object, use a folder instruction**
\- | expression | A valid foreach expression, like *'item in items'*, within this instruction the 'item' value is available but must not override a existing property in the original request, otherwise it will throw an error
\- | *instruction* | A nested instruction (folder, atmpl or static), a nested foreach won't work, if you need to nest a foreach, use a folder and then a foreach
\- | includeif | A mapped expression those result will be used as a boolean to determine if this foreach will be processed

#### Anything else I should know? - Other info
Yes, the expected QSDT configuration must follow this structure:

- *QSDT_CONFIG* (default is './config')
    - blueprint-material
        - *blueprint-folder* (the matching folders names for each blueprint json, that contains all necessary templates and static files for each task of the blueprint)
    - blueprint
        - *blueprint-json* (blueprints json files, explained above)
    - form
        - *form-json* (form configuration json files, explained above too)

If you need an example for this structure and its files, check out the sample provided [here](https://github.com/arthmoeros/qsdt-core/tree/master/config), if you want a sample request from the sample request schema, check out [this json file](https://github.com/arthmoeros/qsdt-core/tree/master/test/request.json)

If you need an User Interface for this, use [@qsdt/ui](https://github.com/arthmoeros/qsdt-ui) in conjunction with [@qsdt/webapi](https://github.com/arthmoeros/qsdt-webapi) instead of this package alone

#### What's coming next? - Planned features for a future release
Not much, this is a second version and I already covered pretty much everything I wanted to achieve, it is still lacking a configuration validation check and maybe some queued generation with some queue framework, also I thought about a security layer and migrating the configuration storage to a MongoDB, if you have any other suggestion I would gladly hear you out, along with a use case.
