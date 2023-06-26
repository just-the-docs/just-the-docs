---
layout: default
title: Javascript
parent: Programming
nav_order: 10
---

# Javascript

**Purpose**

Document our coding standards and best practices for the Javascript language ecosystem.

**Scope**

Covers the specifics of multiple tools and frameworks.

## General Javascript Standards

  - Prefer ES6 template strings to other methods of string concatenation.

Use the [Prettier autoformatter and standard](https://github.com/prettier/prettier).

For projects using node, and supported editors (like VS Code) you can
have a `.prettierrc.js` in your project root, like this.

    {
          semi: false,
          singleQuote: true,
          tabWidth: 2
    }

Alternatively, in VS Code, you can do `ctrl-,` to open settings, and search for "prettier". 

Scroll down to change the above settings manually.

## Library preferences

Use smaller and fewer libraries where possible, and recognize the many costs of adding libraries.

These are the most preferred libraries, but if the project is heavily invested in something else it may not be worth switching right away. Use your judgement.
  * Preact > React > Vue > Riot > Angular > jQuery
  * MobX > Reducers > Redux
  * Fetch > Axios

## Performance

ie) We should use Fetch if possible because it saves 50KB. This may not sound like much but makes a big difference in the long run. Most web apps take 5 seconds to load on an average connection becasue of devs making many small decisions to add size to the bundle which hits our load time both in terms of bundle transfer but in JS parsing, and this leads to a mediocre experience. When a busy (and perhaps, highly paid) person is in a hurry, it's excruciating to wait a few extra seconds. This is made far worse for browser extensions which have to load IN ADDITION to the base website and all the other extensions so they especially need to be lean. What is the rationale for using Axios? (edited) 



**When traversing the DOM many times, load one into memory first\!**

    <div id="one">
      <div id="two">
        <div id="three">
          <div id="four">
          <div>
        <div>
      <div>
    <div>

It is better to query the DOM once, cache it then use the `find` method to grab elements. See cache.find [performance test here](https://jsperf.com/selector-vs-find-again/11)


TODO
{: .label .label-yellow }

The above performance test link is broken, can't find a replacement via search.
Need technical eyes to find & suggest a good replacement.


    // BAD
    const one = $("#one");
    const two = $("#two");
    const three = $("#three");
    const four = $("#four");
    
    // GOOD
    const one = $("#one);
    const two = one.find("#two");
    const three = one.find("#three");
    const four = one.find("#four");

## You can do PubSub with jQuery

    // not ideal
    $('#myButton').on('click', update_ui())
    $('#myButton').on('click', update_ui2()) // elsewhere in code
    $('#myButton').on('click', get_new_data()) // in another component
    
    // It's better to use this method to trigger and listen to custom events, than to have many primary event handlers. This way, updates can be centralized.
    $('#myButton').on('click', function() {
      $(document).trigger('testEvent', 'Hello World');
    });
    $(document).on('testEvent', function(e, data) { 
        update_ui()
    });
    $(document).on('testEvent', update_ui());
    $(document).on('testEvent', function(e, data) { 
        get_new_data()
    });

## Prefer Event Delegation in jQuery

Event delegation means you'll never have bugs with event handlers being created too late or being lost due to dom updates.

    // It's bad to do this, particularly if #confirm_popup_button might not exist.
    $('#confirm_popup_btn').click(function () {...})
    
    // Better to use event delegation, because it will work even if #confirm_popup_btn is created later.
    $('body').on('click', '#confirm_popup_btn', function () {...})

# Vue and React

  - Instead of returning functions that render a component, prefer to return functions that return the necessary information to render a component. In the first we are instructing what to do(render precisely this thing), while in the second we’re just returning some information (use this information to do something).
  - Communicating between siblings, instead of through components. Try to only communicate with other components through props.
  - Use pure functional components where possible. Because these components don’t have lifecycle methods, they require you to rely on a declarative, props-based approach.
  - Use useQuery for async data loading

# Error Handling
Good error handling can save tremendous amounts of time for your team.
 - Display useful diagnostic info on failures in the console and on the screen.
 - Make errors specific to the operation being performed. You can have nexted try/catch blocks as needed to attain this.
 - Consider that when your application fails, users will probably send you a screenshot. You want to make sure that screenshot contains the information to debug the issue.
 - Your error message to the user should explain how it affects them and what steps to take if possible.
 - Put context variables in your error string (no personal health info of course). `Failed to save user ID ${user.id}`
```
// Good example: display a user profile.
try {
  await fetch(URL), {...})
  if (!response.ok) {
     const errText=response.text()
     setError(`Failed to load user details for ${user.id}. Status=${resposne.status} Message=${errText}`)
  }
} catch (e) {
  setError('We failed to display your user. This may be a configuration issue, please email this message to help@organization.com');
  console.trace() // Now we can debug much more easily if we get
  console.error(e)
}
```

```
// Not ideal.
setError(`operation failed`)

// Better. Include info for debugging later. Let the user know what to do.
setError(`Failed to load user ${user.id} with code {rsp.status}. Please report this to help@organization.com`)

// Better, centralize error handling to keep it consistent for network and other cases.
setHttpError(`Failed to load user ${user.id}`, rsp)
const setHttpError = (msg, rsp) => {
  setError(msg + `with code {rsp.status}. Please report this to help@organization.com`)
}

```

## window.onerror
```
// This can be a good practice (setError displays this error message on the screen, visible but unobtrusively).
// However, extensions can sometimes trigger this, so it's preferable to just try / catch at various levels in the application.
window.onerror = function(message, url, linenumber) {
	setError('Unexpected error: ' + message + ' on line ' + linenumber + ' for ' + url + '. Please send a screenshot to help@organization.com');
}
```

# jQuery

While we won't normally use jQuery for a new project at Countable, several older projects do use it. 

jQuery has been unpopular for large software projects due to maintainability issues, and those concerns are founded. 

However, taking some care in how you use the library helps keep jQuery projects maintainable.

Most of the problems maintaining jQuery apps come from [DOM Manipulation](https://api.jquery.com/category/manipulation/) which leads to needlessly complex state. To minimize this, here are some guidelines to use where possible.

Where possible, just `.hide()` and `.show()` different pieces of pre-defined content instead of creating it on the fly. eg:

    // bad
    $(".some-selector").append("<a id='abc_error_message' class='error hidden'>error message here</a>")
    
    // better
    // <a id='abc_error_message' class='error hidden'>error message here</a> <!--already in index-->
    $("#abc_error_message").show()

If you must dynamically generate HTML, `` and `.text` for setting a large block of generated information, with ES6 strings.

    $("#parent_id")(`<b> here is a dynamic fragment. ${variable} ${variable}</b>`)

To make small changes to how something looks, animate it, open/close, etc. use `addClass` and `removeClass`.

    // bad
    $("#accordion").css('height', '25px')
    
    // better
    // define the actual CSS in the .open-accordion class.
    $("#accordion").addClass('open-accordion')

Use ID instead of class for selecting items in jQuery:

    // bad
    $(".next")
    
    // better
    $("#main-modal-next-button")

This prevents surprising behaviour for people maintaining the code later: changing a CSS class should not cause JavaScript behaviour to change, and changing an ID should not cause CSS styling to change.

When manipulating the DOM, as in
`https://api.jquery.com/category/manipulation/`, prefer:

  - `.hide()`, `.show()`, `.addClass()`, `.removeClass()`,
    `.toggleClass()`, `.val()`

if needed, use:

  - `.text()`, `()`

avoid:

  - `.after()`, `.append()`, `.attr()`, `.before()`, `.clone()`,
    `.css()`, `.remove()`, and everything else.

## References

\[1\] [Declarative vs Imperative Programming](https://codeburst.io/declarative-vs-imperative-programming-a8a7c93d9ad2)
