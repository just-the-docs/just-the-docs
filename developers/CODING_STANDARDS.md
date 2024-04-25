---
layout: default
title: Coding Standards and Style
parent: Programming
nav_order: 2
---

# Coding Standards and Style

**Purpose**

Encourage consistent and effective coding practices in the team, arising out of specific cases where different conventions of developers caused us to waste time.

**Scope**

Covers principles of our coding standards, then branches out to specific language pages.

[Philosophy of Sofware Design](https://www.amazon.com/Philosophy-Software-Design-John-Ousterhout/dp/1732102201) is highly recommended reading. It's the book which will make you a better programming in the ways that matter most.

## Fundamentals

  ### Aim to understand
  Any code that you write, you should understand. If you wrote 10 lines to fix a bug, you should understand all 10 lines. Any code that is written without understanding, means you also don't understand what kind of bugs you may cause.
  - Don't copy and paste from stackoverflow/ChatGPT without first understanding it.
  - If you're on React, you're likely going to use `useEffect` hook often. Understand it => https://react.dev/reference/react/useEffect
  - Read relevant documentation on third party libraries before using it.

  ### Be Explicit
  
    Deterministic Is Good, Polymorphic is bad
  Be explicit with your code. Name your variables clearly. Name your functions clearly. Name your classes carefully. Take your time to think of good names. If you can't, ask the team. Every module, file, function, class and other component should have a clear "job" or clear set of related jobs. Someone who does not know the codebase should be able to deduce what a function is responsible fo.

  - Find the best abstraction. ie) Functional Programming for dealing with collections (advanced primitives). Inheritance for dealing with the relationships of real world objects.

  If your writing classes - following the SOLID principle helps you achieve this => https://www.freecodecamp.org/news/solid-principles-for-better-software-design/#:~:text=The%20SOLID%20acronym%20stands%20for,Interface%20Segregation%20Principle%20(ISP)

  If you're writing functions - some of the functional programming fundamentals help you achieve this => https://www.freecodecamp.org/news/functional-programming-in-javascript/


### Do not repeat yourself
Do not repeat yourself.
  - Use less code. Avoid repetition.
  - Reuse functions.

### Code for when things go wrong
Your features usually consist of a successful scenario, and a failure scenario and perhaps even more states in between. **The feature isn't done if you only cover the successful scenarios.** Wrap your code in a try catch, handle network errors from fetch, handle edge cases. **A feature is only complete if all scenarios are covered.**


### Test Your Code
If you can’t write unit tests for it, then test it manually. Test your code against different scenarios, parameters **manually** if you can’t write unit tests for it. **If you don’t even want to test your own code, who will?** And if you don’t want to test your own code, what are the chances that it’s poorly written? 

If you don’t test, guess who’s testing? Customers/Clients. Customers/Clients are not QA. They may have a play in testing ideas, but accuracy of the code isn’t something they shouldn’t have to be testing for you.

### Examples

```
fetch("https://myapi.com")
  .then((res) => res.json())
  .then((data) => {
    console.log("Hello World", data)
  }).catch((err) => {
    console.error(err)
  })
```

Let use this as one of the examples. First of all fetch this code will not throw an error and go to the catch block if it returns a 401. Far as fetch is concerned, that's still valid. How do you know this? **Before you use fetch, you look at the documentation and aim to understand https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Basic_concepts**. Once we have an understanding, we can write code to improve it.
```
fetch("https://myapi.com")
  .then((res) => {
      !res.ok && throw new Error("Failed tob fetch")
      return res.json()
    })
  .then((data) => {
    console.log("Hello World", data)
  }).catch((err) => {
    console.error(err)
  })
```
This is much better, but that's alot of boilerplate for something rather simple. You can use `async await` in javascript and surround this in a try catch instead or... we can get a bit more creative. Applying the "Be Explicit" principle above, we can improve this. You can refactor this by extracting frequently used functions. These 4 utility function can live in fetch utils file as an example.
```
const isResOk = (res) => {
    !res.ok && throw new Error("Failed tob fetch")
    return res  
}
const resToJSON = (res) => {
  return res.json()
}
const logError = (err) => {
  console.error(err)
}
const log => (data) => {
  console.log(data)
}
```
Then we can import these in our code and use it such as
```
fetch("https://myapi.com)
  .then(isResOk)
  .then(resToJSON)
  .then(log)
  .catch(logError)
```
You can see this almost reads like English. I don't even need to look at the individual functions to understand what it does.

This quick example takes you through most of the fundamentals listed above. First, we aimed for understanding to understand fetch behaviour. Then we coded for when things go wrong. Then we improved its explicitness by extracting possible frequently used functions. Now, testing is easy and it's almost like it came for free. We can test individual functions easily, as well as the entire fetch operations if we wanted to.



## Coding Standards

  - Spend AT LEAST 10% of your time on writing tests and refactoring to reduce complexity.
  - Follow conventions. For projects that do not currently follow our standards (open source, or new projects shared with other dev teams) but follows a different one, stick with that project's conventions unless we make a conscious decision to refactor the whole thing. Don't mix conventions.
  - Make life easier for your team mates and future self by being consistent and thoughtful of what someone unfamiliar would think. The goal is your code should be obvious and easy to understand for a new programmer. Stick to conventions, and use comments to explain the story of your code, and why things are done a particular way.
  - Humans should not spend time thinking about whitespace formatting. We use auto-formatters in place of coding standards in every case possible.
  - Don't keep dead (unused) code. For example, if you copy code, never leave the old copy in GIT. For example, a file like `index.html.old` that isn't used.

## Literature

We are observe teh following literature.

  - [Domain Driven Design](https://en.wikipedia.org/wiki/Domain-driven_design) - We use Domain Modelling in our work
  - [12 factor App Methodology](https://12factor.net/) - We use Container based deployments
  - [Trunk based development](https://trunkbaseddevelopment.com/) - We use Trunk Based development
  - [Agile Manifesto](https://agilemanifesto.org/) - We use Scrum
  - [Clean Code](https://www.oreilly.com/library/view/clean-code/9780136083238/) - We write readable code
  - [A Philisophy of Software Design](https://www.amazon.ca/Philosophy-Software-Design-John-Ousterhout/dp/1732102201) - We build for the long term

## Names

This section refers to the names of variables, database columns, classes, and any other case where a name is chosen in code.

Variables should hint what their data types are: in one glimpse I should be able to tell if a variable is e.g. a Boolean, string, etc.

Consider the book [Clean Code](https://www.oreilly.com/library/view/clean-code/9780136083238/) on
this topic and on writing short functions.

  - Names should indicate *what* a function does in *business domain language* (see "Ubiquitous Language" in Domain Driven Design).
  - Name length should be proportional to the variable's scope size. `x` is ok in a one liner, but not a global.
  - When an industry jargon (domain language) term is available, use that.
  - ClassNames - Classes should use an upper camel case string of nouns.
  - CONSTANT\_NAMES - Constants should be uppercase with underscores.

## Files

  - Filenames should be lowercase with dashes (NOT SPACES) to separate words *except* for Python, which uses underscores in place of dashes.
  - The purpose, and contents of any file should be as obvious as possible by its filename and location. **Throw in an example**
  - Avoid repeated or unnecessary code, except where doing so is much more clear. Keep in mind less code is actually easier to understand, all other things being equal. So, it bears repeating, use the minimum amount of code in declarative domain language. Using the wrong abstraction can be worse than repeated code.
  - Consider organizing by [colocation](https://povio.com/blog/maintainability-with-colocation/)

## Locality

  - Components don't know about each other.
  - Simplify/minimize interfaces and consider Bounded contexts (DDD).
  - Use pure functions where practical, and avoid side effects and global state.
  - Modules should be responsible for a specific task or set of RELATED tasks.
  - Modules should communicate through easily testable interfaces. A huge hierarchy of objects shouldn't be required to test a single method, because the method should only take arguments it actually uses (not a big tree which happens to contain those)

## Error Handling

  - Error messages must be uniquly identifiable so the root cause in code can be traced. They should contain unique text.

  - The developer must differentiate between failures of our system and failures of other systems, because they are handled very differently.

  - When our system behaves incorrect, there should be a "500" error (often a stack trace), and it should be sent to a high urgency tracker like Sentry. These errors are a system design flaw that should always be fixed by us permanently. We should never 'expect' anything to appear in Sentry. We should be willing to bet it will always be empty.

  - By contrast, when external systems fail (users enter something invalid, an external API rejects data, etc), these failures should result in a "400" error. They often will not require a code change by us, and should not be tracked in Sentry. They can generally be tracked in our application logs at the WARNING or ERROR level, and where possible, give feedback directly to the failed system (ie, tell the user their data is invalid).
 
  - When we are in an invalid state, it's better to throw an exception and avoid corrupting data or causing more confusing downstream issues. Catch errors early and loudly.

  - Use [HTTP Error codes correctly](https://developer.mozilla.org/en-US/docs/Web/HTTP/Status). For example, for an unauthorized error, return 401, not 400 or 500.

## Comments

  - Do not comment what is obvious from the code. "\# Increment the variable." is not a good comment.
  - Do Document the rationale "why", the reason behind an implementation choice.
  - Use TODO comments to indicate your intent for future work.
  - Comment beside anything that's unintutive or unexpected to another reader.
  - Do not leave actual code commented out unless you have a good reason. If you do have one, document that reason as a comment as well.
  - See [this excellent guide from Stack Overflow's team](https://stackoverflow.blog/2021/07/05/best-practices-for-writing-code-comments/).


## No tabs

We are a Python shop, and so observance of
[PEP 8](https://www.python.org/dev/peps/pep-0008/) leads us to use 4 spaces for indentation.

We carry this convention to other languages when possible, but some will use a different number of spaces. **We never use the tab character.**

HTML and JavaScript files should use 2 spaces for indentation, following popular convention.

### Docker

Use [Docker](devops/DOCKER/) for any web application project (and other projects where applicable). 

It should be possible to bring up a new environment by only the following for any of our projects.

    git clone <repo>
    cd <project folder>
    cp docker-compose.override.yml.dev.template docker-compose.override.yml
    docker-compose up

TODO
{: .label .label-yellow }

Write a dotfiles script that does all the following with
`getproject <project slug>`.

And browsing to [localhost](http://localhost)

Of course, to see anything meaningful you may need to restore a database to your `db` container.

## Code Quality

Tested tricks for having good code you like to work on in the long term.

 - Assume you’ll still be working on any project 10 years from now, and cultivate a culture with a long-term viewpoint. 
   - We hire for this trait and use code reviews as well as weekly developer training workshops to improve maintainability together. 
   - This seems expensive but has paid enormous dividends in reduced technical debt. 
   - Reviewers have fresh eyes and can see what’s missing more easily than the original developer. 
   - These discussions form an evolving standard and reinforce a culture of quality and continuous learning.
 - Decouple core business logic from framework-specific code and views. Code that is close to the presentation layer will be forced by front-end libraries, web browsers and marketing needs to evolve quickly.
 - Auto-formatters. We prefer code standards which have an auto-formatter because it lets makes our code perfectly consistent at a syntax level with zero effort.
 - Document rationale. Comments should answer “why” code was written a certain way. The code itself should document “what” it is.
 - Use “TODO” comments to document future intent of the code.
 - Code reviews - for learning and establishing standards. The code reviews become a living history of the project’s standards. While standards should be documented in one place concisely, it’s in the code reviews that all the small subtleties will be discovered. The reviewer can ask the question “would I like reading this code and having to modify it myself?” since they have fresh eyes. They can see what’s missing more easily than the original developer. These discussions lead to an evolving standard, and a culture of quality and continuous learning.
 - Declarative Style - Anything you do a lot of should be *declarative style* to the extent possible (as opposed to imperative style), meaning define what you want and not the order it is created.
 - Do not leave old files with filenames like "base\_old" in the tree. Just delete the old one, commit to refactor, and communicate the change to your team.

Consistency and quality can be further improved by proactively managing technical debt. While we do avoid needless technical debt, it can be taken on strategically. 

For example, prototyping a solution can be a cheap way to get information and save cost overall, as long as you don’t neglect to refactor or rewrite the prototype if you decide to keep the code.

## Performance Tuning

  * Optimize for subjective performance. (Usability tests, perceived wait time). Don't optimize what users won't notice.
  * Be frugal with load times. Aim for an order of magnitude (10x) faster than necessary. (A good UX is 1s load time, aim for 100ms).
  * When slow performance is perceived, try (or get help finding) the bottleneck. Or most helpful sufficient cause. Look at load time breakdown in network panel.
  * Caching probably isn't the first resort, but caching a very short time can be safe. Carefully consider the implications and worst case of stale cache data.
  * Webpages should load in 2 seconds, and make less than 50 queries as a rule of thumb.
  * If you notice a slow user experience, ask for help! Someone on the team is an expert in your bottleneck.

## Coding Standards for Specific Languages

Check out the individual pages for [HTML/CSS](HTML_CSS.md),
[Javascript](JAVASCRIPT.md), and [Python](PYTHON.md) for more
specific coding standards.