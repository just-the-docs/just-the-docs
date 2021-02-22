---
layout: default
title: Callouts
parent: Color
grand_parent: Tests Home
---

# Callouts

The configuration of the callouts shown below is in [`_config_tests.yml`](https://github.com/pdmosses/just-the-docs/blob/callouts/_config_tests.yml).

<button class="btn js-toggle-dark-mode">Preview dark color scheme</button>

<script>
const toggleDarkMode = document.querySelector('.js-toggle-dark-mode');

jtd.addEvent(toggleDarkMode, 'click', function(){
  if (jtd.getTheme() === 'dark') {
    jtd.setTheme('light');
    toggleDarkMode.textContent = 'Preview dark color scheme';
  } else {
    jtd.setTheme('dark');
    toggleDarkMode.textContent = 'Return to the light side';
  }
});
</script>

## Admonition

{: .admonition }
A paragraph

## Attention

{: .attention }
A paragraph

## Caution

{: .caution }
A paragraph

## Custom

{: .custom }
A paragraph

## Danger

{: .danger }
A paragraph

## Error

{: .error }
A paragraph

## Highlight

{: .highlight }
A paragraph

## Hint

{: .hint }
A paragraph

## Important

{: .important }
A paragraph

## Note

{: .note }
A paragraph

## Tip

{: .tip }
A paragraph

## Warning

{: .warning }
A paragraph

## Multi-paragraph callouts

{: .warning }
> A paragraph
>
> Another paragraph
>
> The last paragraph

## Indented callouts

> {: .warning }
  A paragraph

  
## Indented multi-paragraph callouts

> {: .warning }
> > A paragraph
> >
> > Another paragraph
> >
> > The last paragraph

## Nested callouts

{: .important }
> <div markdown="block">
> {: .warning }
> A paragraph
> </div>

With opaque background (using HTML):

{: .important }
> {: .opaque }
> <div markdown="block">
> {: .warning }
> A paragraph
> </div>
