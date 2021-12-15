# Cranbee Template Engine
This is a library for working with Cranbee Templates.

## Introduction
Let's start with an example.

This is how a **template** may look like:

```html
<!-- This is a test template -->
<div class="prodlist">
    <div each="{item in items}" class="prodlist__item {item.mods}">
        <img if="{item.imageUrl}" src="{item.imageUrl}"/>
        <div fi="{item.imageUrl}" class="prodlist__noimage"></div>
        <a href="{item.url}" class="prodlist__title">{item.title}</a>
        <div class="prodlist__brand">{item.brand}</div>
        <div if="{item.isAvailable}" class="prodlist__price">€ {item.price}</div>
        <button if="{item.isAvailable}" class="prodlist__add">Add to cart</button>
        <div fi="{item.isAvailable}" class="prodlist_na">Not available</div>
    </div>
</div>
```

Syntax looks like HTML, but the library does not know about HTML. There are just tags, texts and some special stuff.

Also let's introduce some **data**:

```js
{
    items: [
        {
            title: "Product A-1",
            brand: "Brand A",
            price: "9.90",
            url: "/products/a-1.html",
            imageUrl: "/images/products/a-1.jpg",
            isAvailable: true,
            mods: "_av"
        },
        {
            title: "Product Z-2",
            brand: "Brand Z",
            url: "/products/z-2.html",
            isAvailable: false,
            mods: "_na"
        }
    ]
}
```

Then we can run the Template Engine and get a **result**:

```
result = f(template, data);
```

The **result** for the **template** and **data** above will be:

```js
[
    {
        type: "div",
        props: { class: "prodlist" },
        children: [
            {
                type: "div",
                props: { class: "prodlist__item _av" },
                children: [
                    {
                        type: "img",
                        props: { src: "/images/products/a-1.jpg" },
                        children: []
                    },
                    {
                        type: "a",
                        props: { href: "/products/a-1.html", class: "prodlist__title" },
                        children: [{ type: "#", text: "Product A-1" }]
                    },                    
                    {
                        type: "div",
                        props: { class: "prodlist__brand" },
                        children: [{ type: "#", text: "Brand A" }]
                    },
                    {
                        type: "div",
                        props: { class: "prodlist__price" },
                        children: [{ type: "#", text: "€ 9.90" }]
                    },
                    {
                        type: "button",
                        props: { class: "prodlist__add" },
                        children: [{ type: "#", text: "Add to cart" }]
                    }
                ]
            },            
            {
                type: "div",
                props: { class: "prodlist__item _na" },
                children: [
                    {
                        type: "div",
                        props: { class: "prodlist__noimage" },
                        children: []
                    },
                    {
                        type: "a",
                        props: { href: "/products/z-2.html", class: "prodlist__title" },
                        children: [{ type: "#", text: "Product Z-2" }]
                    },
                    {
                        type: "div",
                        props: { class: "prodlist__brand" },
                        children: [{ type: "#", text: "Brand Z" }]
                    },
                    {
                        type: "div",
                        props: { class: "prodlist_na" },
                        children: [{ type: "#", text: "Not available" }]
                    }
                ]
            }
        ]
    }
]
```

The library lets you get this tree and does not care what you are going to do with it.

## Nodes
A **template** and a **result** are arrays of nodes. And there are 2 kinds of nodes.

(1) Text nodes:

```js
{
    type: "#",
    text: string
}
```

(2) Tag nodes:

```js
{
    type: string,   // tag name
    props: object,  // tag properties
    children: array // array of child nodes
}
```

## Installation
```bash
$ npm install @cranbee/template
```

## Library API
### parse(text: string): array
Parses the template source and returns an array of nodes.

### execute(template: array, data: object): array
Executes the template with the data and returns an array of nodes.

### pack(template: array): array
Packs the template to a compact view.

### unpack(packet: array): array
Unpacks the template.

## Example
```js
let Template = require("@cranbee/template");

let source = '<a href="{url}">{title}</a>';
let data = { url: "https://example.com", title: "Example" };

let template = Template.parse(source);
let result = Template.execute(template, data);

console.log("Template nodes:")
console.log(JSON.stringify(template));
console.log();
console.log("Result nodes:")
console.log(JSON.stringify(result));
```

Output:

```
Template nodes:
[{"type":"a","props":{"href":"{url}"},"children":[{"type":"#","text":"{title}"}]}]

Result nodes:
[{"type":"a","props":{"href":"https://example.com"},"children":[{"type":"#","text":"Example"}]}]
```

## Tests
To run the test suite, first install the dependencies, then run `npm test`:

```bash
$ npm install
$ npm test
```

## License
MIT
