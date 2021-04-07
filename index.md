---
layout: default
title: Home
nav_order: 1
description: "Corticon empowers IT and business users to manage business rules outside the application—without coding.."
permalink: /
---

# Welcome to the Corticon Enablement Repository
{: .fs-9 }

Corticon empowers IT and business users to manage business rules outside the application—without coding {: .fs-6 .fw-300 }

---
# Corticon At a Glance

Corticon is a tool built for abstracting complex business logic from applications and data sources into a discrete business rules layer—without coding. It supports all aspects of the modeling process, from initial capture of business requirements through the testing of the decision against organizational data - delivering complete, deployment-ready decision services. Corticon &#39;rule modelers&#39; are commonly business analysts with expertise in the business domain and its policies, using Corticon Studio to define, author, analyze and test rules. Once satisfied, rules are then either

1. Deployed as Decision Services onto Corticon Server
2. Compiled into a JavaScript bundle, pre-configured for a variety of JavaScript platforms

[View it on GitHub](https://github.com/notedhelms/Corticon-Enablement-Repository){: .btn .fs-5 .mb-4 .mb-md-0 }


# Why Corticon?

Corticon Studio&#39;s model-driven BRMS delivers an accessible, Excel spreadsheet-like environment for business and IT users to manage decision logic. Natural language is used as the starting point for rule modelling, but the final representation uses a non-technical yet formal representation. In addition, we encourage business users to create Rule Vocabulary (defined below) entities and attribute names with business-friendly names. These vocabulary items can then be used during rule modelling and represent essentially the data inputs and outputs of the rule service modelled in Studio.

The most typical process for extracting business rules is to (a) copy the natural language rule descriptions from their original source and paste into Studio&#39;s rule statements, then (b) formally model rules expressed in the rule statements by dragging-and-dropping business terms and operators.

Corticon Studio is the only business rules modelling solution that does not generate a lower level technical language. Once modelled, verified, and tested, Corticon Studio produces an optimized, executable service ready for production automation into any application.

Many alternative BRMS solutions have limitations when it comes to rules expressiveness for which Corticon offers superior capabilities. Corticon has a level of sophistication unmatched by other vendors, but avoiding complexities in terms of setup, configuration, and use (e.g. other vendors require the setup of a BOM (Business Object Model) which requires significant technical expertise and may cause delays due to technical staff dependencies. In Corticon, this is all under the domain expert&#39;s control: Rule Vocabulary setup is quick and intuitive.

Likewise, other BRMS systems often have limited support to handle complex collections and their associations with other collections and so are often limited to reason just over single facts. Corticon allows for sophisticated collection handling and manipulation in the rules. Corticon rule authors can design highly complex rules with minimal effort and without ever having to descend in a programming language (e.g., building complex conditional iterations through collections). Another example is defining your rules in multiple languages and returning full traceability rule messages based on the user locale sent in the decision service request.

In summary, no programming skills are necessary to capture, validate, test, and manage decision-intensive business activities. You will not end up maintaining code when you anticipated working through a business-friendly interface.

# Corticon Studio

Corticon Studio is a standalone desktop environment to model, analyze, test, and save business rules as executable decision services. Corticon Studio is easy to learn and easy to use. With an intuitive spreadsheet-like interface, anyone can quickly learn how to model even the most sophisticated rules - with no programming. Key aspects of Corticon Studio include—

- Sophisticated, intuitive rule modelling, no coding required. Rule authoring environment designed to be used by business analysts (domain experts).
- Document all your rules in natural text for full transparency and business understanding. Generate decision traces in natural text with variable substitution to provide context, in multiple languages of your choice (depending on decision service locale in the request message).
- Advanced analysis tools for decision logic validation (eliminate all technical inconsistencies like rule conflicts, rule over/underlap, looping) during rule design.
- Comprehensive scenario-based model (use case) testing.
- Template-based reporting for documentation and audit.
- Includes code-free connectivity to external relational databases and REST endpoints made possible by embedded Progress DataDirect database
- Comprehensive service callout &amp; extended operator framework to write your own decision service extensions (such as data service binding service callouts, special mathematical operators (functions), etc.

There are four key components of rule authoring with Corticon Studio.

## Rule Modeling in Corticon Studio

### The Rule Vocabulary

The first step of the rule modeling process with Corticon is to build the &#39;dictionary&#39; of business terms used throughout the rules, the Rule Vocabulary. The rule vocabulary can be created manually, or it can be auto generated based on an external data source, the schema of any relational database, or the JSON structure of a REST endpoint.

The business terms, called **Entities** in Corticon, can be thought as the &#39;nouns&#39; of the business rules, for example _Family_ and _Patient_. The adjectives describing these nouns are called **Attributes**. Finally, we define the **Associations** between the entities, for example a one-to-many relationship between _Family_ and _Patient_.

When creating our Rule Vocabulary, we define the types of data that underlies each attribute. For example, an &#39;integer&#39; datatype for _Patient.age_ or a &#39;string&#39; datatype for _Patient.race_.

Note that the vocabulary includes every data point involved in the decision/calculation. Some of this data may be passed into the Decision Service when it is called by another application, some of this data may be retrieved by Corticon from an external data source and some of this data may be produced as a result of the rules themselves.

The acceptable types of data for a given attribute can be further defined using **Custom Data Types** We can specify a Custom Data Type for _raceType_ as shown.

### Rulesheets

**Rulesheets** are like Decision Tables. Users &#39;model&#39; the business rules by defining **actions** to take when specific **conditions** are met. The figure below shows some simple diabetes risk classification rules. Each of the numbered columns is a discrete rule, with any number of conditions producing any number of actions. Because _race_ is defined as a Custom Data Type rule modelers are shown a dropdown when defining the condition for that attribute.

Each rule is documented with **Rule Statements.** Rule Statements will be sent along with the new/changed data resulting from the rules in the response from Corticon back to the calling application. Rule statements will only be sent back to the calling application if that rule was triggered as part of that decision&#39;s execution.

Based upon the datatype, rule modelers will use the applicable **Rule Operators,** akin to Excel formula operators to specify the rules&#39; various conditions and actions to take when those conditions are met.

Rulesheets also provide rule modelers with multiple click-of-a-button **Logical Integrity Checks** which identify incompleteness, conflict between rules, and infinite loops. For example, in the same rulesheet previously shown, clicking the &#39;Check for Completeness&#39; button will populate all conditions that Corticon has inferred are possible, based on the rules we&#39;ve implemented thus far.

### Ruletests

Once the rules created in the rulesheet are satisfied, the first **Ruletest** in Corticon Studio can be created to run test data through the rules in the test server embedded in the local application. Similar to how the rule modeler dragged from the bucket of business terms in the Rule Vocabulary, we drag test instances of a _Patient_ into the Input column and enter our test data that conforms to the attributes&#39; respective data types, as shown below. Optionally, we can define the output that is expected as a result of executing the rules within the Expected column.

The test will then execute, shown below. The output shows the response from the rules and produces the same information that the rules would produce when deployed as a Decision Service. The Output column presents the new/changed values produced by the rules and the Rule Statement which was defined for that rule. Note that only the Rule Statement(s) for the rule(s) which has fired has been sent back, providing a readable audit log of each rule that has fired for a given Decision Service request. The differences between the expected and actual outputs are highlighted in red.

As mentioned, the Ruletest reproduces how the rules will behave once deployed as a decision service. Because decision service invocations can be in the form of SOAP/XML or REST/JSON, a fully formatted sample request in each form can be exported from the ruletest. This provides visibility to the data structure that Corticon expects and can also be copied into third party testing applications such as Postman, Insomnia, or SoapUI as test message parameters.

### Ruleflows

From here, you can continue adding more rules to the rulesheet, or more commonly, compartmentalize our rules into different rulesheets, and create a **Ruleflow** to specify the sequence from one rulesheet to another. When multiple Rulesheets are included in a Ruleflow, the Rulesheets will execute in a sequence determined by their Rulesheet order in the Ruleflow. With ruleflows, behavior like branching into separate rules for different scenarios can be defined and specify when the execution of a given Decision Service call that Corticon should retrieve additional data from external datasources. An example of a ruleflow is shown below.

As more rulesheets are added to our Ruleflow, Ruletests can be run against entire Ruleflows, instead of testing only the Rulesheets as they are developed. This enables you to test not only the rules as they are defined in the Rulesheet, but also how the Ruleflow works, and how the rules behave as part of the Ruleflow. This way, problems can be detected and fixed earlier in the lifecycle.

Ruleflows are the final step in the rule development process and are thus deployed as Decision Services. Ruleflows can always be versioned as well, with either a major/minor version tag or effective date range for which they will execute when invoked. The invocation (request) payload must contain a version number or data parameter to consume the desired &quot;versioned&quot; decision service.

# Architectural Choices for Runtime Corticon Decision Services

Corticon decision services can run anywhere. There are virtually no limitations as to where you want rules to be run: server (including a web-based Server Console to manage and monitor deployed Corticon Servers) or client side (e.g. browser, mobile app) are all supported options.

