---
layout: default
title: Home
nav_order: 1
description: "Blogs by Harsh Mittal is a collection of all the blogs written by Harsh Mittal on various topics"
permalink: /
---

# Blogs By Harsh Mittal
{: .fs-9 }

Blogs by Harsh Mittal is a collection of all the blogs written by me on various topics. I hope you will enjoy the collection of different topics I have to speak about!!
{: .fs-6 .fw-300 }

[Portfolio][Portfolio_Website]{: .btn .btn-primary .fs-5 .mb-4 .mb-md-0 }
[About Me](#about-me){: .btn .fs-5 .mb-4 .mb-md-0 .mr-2 }

<button class="btn js-toggle-dark-mode">Switch to light mode</button>

<script>
const toggleDarkMode = document.querySelector('.js-toggle-dark-mode');

jtd.addEvent(toggleDarkMode, 'click', function(){
  if (jtd.getTheme() === 'dark') {
    jtd.setTheme('light');
    toggleDarkMode.textContent = 'Switch to dark mode';
  } else {
    jtd.setTheme('dark');
    toggleDarkMode.textContent = 'Switch to light mode';
  }
});
</script>

---

{: .important }
> Want to explore awesome tutorials written by me? Head out to [Harsh Mittal Tutorials][Harsh Mittal Tutorials]


## About Me


See [About Me]({%link about.md%}) for more details



[Portfolio_Website]: https://harshmittal.com
[Harsh Mittal Tutorials]: https://harshmittal.com/tutorials
