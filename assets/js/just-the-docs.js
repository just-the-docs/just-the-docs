---
layout: null
---
(function (jtd, undefined) {

// Event handling

jtd.addEvent = function(el, type, handler) {
  if (el.attachEvent) el.attachEvent('on'+type, handler); else el.addEventListener(type, handler);
}
jtd.removeEvent = function(el, type, handler) {
  if (el.detachEvent) el.detachEvent('on'+type, handler); else el.removeEventListener(type, handler);
}
jtd.onReady = function(ready) {
  // in case the document is already rendered
  if (document.readyState!='loading') ready();
  // modern browsers
  else if (document.addEventListener) document.addEventListener('DOMContentLoaded', ready);
  // IE <= 8
  else document.attachEvent('onreadystatechange', function(){
      if (document.readyState=='complete') ready();
  });
}

// Show/hide mobile menu

function initNav() {
  jtd.addEvent(document, 'click', function(e){
    var target = e.target;
    while (target && !(target.classList && target.classList.contains('nav-list-expander'))) {
      target = target.parentNode;
    }
    if (target) {
      e.preventDefault();
      target.ariaPressed = target.parentNode.classList.toggle('active');
    }
  });

  const siteNav = document.getElementById('site-nav');
  const mainHeader = document.getElementById('main-header');
  const menuButton = document.getElementById('menu-button');

  disableHeadStyleSheets();

  jtd.addEvent(menuButton, 'click', function(e){
    e.preventDefault();

    if (menuButton.classList.toggle('nav-open')) {
      siteNav.classList.add('nav-open');
      mainHeader.classList.add('nav-open');
      menuButton.ariaPressed = true;
    } else {
      siteNav.classList.remove('nav-open');
      mainHeader.classList.remove('nav-open');
      menuButton.ariaPressed = false;
    }
  });

  {%- if site.search_enabled != false and site.search.button %}
  const searchInput = document.getElementById('search-input');
  const searchButton = document.getElementById('search-button');

  jtd.addEvent(searchButton, 'click', function(e){
    e.preventDefault();

    mainHeader.classList.add('nav-open');
    searchInput.focus();
  });
  {%- endif %}
}

function isOutOfViewport(el, checkTop = false) {
  const rect = el.getBoundingClientRect();
  return (
    (rect.bottom < 0 && checkTop) || // Element is above the viewport
    rect.top > window.innerHeight || // Element is below the viewport
    rect.right < 0 || // Element is left of the viewport
    rect.left > window.innerWidth // Element is right of the viewport
  );
}

function initToC() {
  const toc = document.querySelector("aside.__container"); // Table of Contents side panel
  const toggleToc = document.querySelector('#__aside'); // ToC toggle checkbox
  const toggleTocButtons = document.querySelectorAll('.__aside-btn'); // ToC toggle buttons
  const toggleTocBanner = document.querySelector('.toc-btn-sm'); // toggle banner at the top of the page
  const skipToC = document.querySelector('.skip-to-main[href="#toc"]'); // skip ToC link at the top of the page
  if (!toc || !toggleToc || !toggleTocBanner || !skipToC) return; // If ToC sidebar or toggle banner is not present, exit

  // previousScrollY determines the last scroll position of the page => display the ToC banner when scrolling up
  let previousScrollY = 0;

  try {
    toggleToc.hidden = true; // Hide the ToC toggle checkbox
    for (var element of toggleTocButtons) {
      element.hidden = false; // Show the ToC toggle buttons
    }

    jtd.addEvent(skipToC, 'keydown', (e) => {
      const isEnter = e.key === 'Enter' || e.keyCode === 13;
      const isSpace = e.key === ' ' || e.keyCode === 32;

      if ((isEnter || isSpace) && !toggleToc.checked) {
        e.preventDefault();
        skipToC.blur(); // Remove focus from the skip link
        toggleToc.checked = true; // Open the ToC sidebar
        toc.querySelectorAll('[aria-expanded]').forEach(function(element) {
          element.setAttribute('aria-expanded', 'true');
        });
        // Scroll to the ToC sidebar panel
        if (CSS && CSS.supports && CSS.supports('scroll-behavior', 'smooth')) {
          toc.scrollIntoView({ behavior: 'smooth', block: 'start' });
        } else {
          toc.scrollIntoView();
        }
        // If the user pressed Tab, focus on the first ToC item
        const firstTocItem = toc.querySelector('.__item');
        if (firstTocItem) firstTocItem.focus();
      }
    });

    jtd.addEvent(document.body, 'keydown', (e) => {
      const isEsc = e.key === 'Escape' || e.keyCode === 27;

      if (isEsc) {
        e.preventDefault();
        toc.blur(); // Remove focus from the ToC sidebar
        toggleToc.checked = false; // Close the ToC sidebar
        toc.querySelectorAll('[aria-expanded]').forEach(function(element) {
          element.setAttribute('aria-expanded', 'false');
        });
      }
    });

    {%- if site.toc.shortcut %}
    // Add event listener for the ToC toggle shortcut key
    jtd.addEvent(document, 'keydown', function (e) {
      const isShortcutKey =
        e.key.toLowerCase() === '{{ site.toc.shortcut.key | downcase | default: 't' }}' &&
        {{ site.toc.shortcut.ctrl_meta | default: false }} === !!(e.ctrlKey || e.metaKey) &&
        {{ site.toc.shortcut.alt | default: false }} === !!e.altKey &&
        {{ site.toc.shortcut.shift | default: false }} === !!e.shiftKey;

      if (isShortcutKey) { // Check for Ctrl or Cmd key
        e.preventDefault();
        toggleToc.checked = !toggleToc.checked; // Open the ToC sidebar
        toc.querySelectorAll('[aria-expanded]').forEach(function(element) {
          element.setAttribute('aria-expanded', toggleToc.checked ? 'true' : 'false');
        });
        // Scroll to the ToC sidebar panel
        if (CSS && CSS.supports && CSS.supports('scroll-behavior', 'smooth')) {
          toc.scrollIntoView({ behavior: 'smooth', block: 'start' });
        } else {
          toc.scrollIntoView();
        }
        // If the user pressed Tab, focus on the first ToC item
        const firstTocItem = toc.querySelector('.__item');
        if (firstTocItem) firstTocItem.focus();
      }
    });
    {%- endif %}

    for (var button of toggleTocButtons) {
      jtd.addEvent(button, 'click', function(e) {
        e.preventDefault();
        toggleToc.checked = !toggleToc.checked; // Toggle the ToC sidebar
        toc.querySelectorAll('[aria-expanded]').forEach(function(element) {
          element.setAttribute('aria-expanded', toggleToc.checked ? 'true' : 'false');
        });
      });
    }

    // Close the ToC panel if user clicks outside the ToC sidebar (xs -> lg)
    jtd.addEvent(document, 'click', function (e) {
      // If the ToC toggle is checked and the click is outside the ToC sidebar and toggle banner
      if (
        !toc.contains(e.target) &&
        !toggleToc.contains(e.target) &&
        !e.target.closest('.toggle-toc') &&
        !e.target.closest('.aside-overlay')
      ) {
        toggleToc.checked = false; // Uncheck the ToC toggle checkbox
        toc.querySelectorAll('[aria-expanded]').forEach(function(element) {
          element.setAttribute('aria-expanded', 'false');
        });
      }
    });

    // Close the panel once the user clicks on a ToC item
    // Do not display the heading banner for a short time after a ToC item is clicked
    if (window.innerWidth <= 800 || toc.classList.contains('side')) {
      for (var element of toc.querySelectorAll('.__item, a.back-to-top')) {
        jtd.addEvent(element, 'click', function(e) {
          toggleToc.checked = false;
          toc.querySelectorAll('[aria-expanded]').forEach(function(element) {
            element.setAttribute('aria-expanded', 'false');
          });
          toggleTocBanner.classList.add('hidden');
        });
      }
    }

    // Double-clicking the ToC opener button to scroll back to top (md and lg)
    jtd.addEvent(document.querySelector('.toc-btn-md'), 'dblclick', () => {
      if (CSS && CSS.supports && CSS.supports('scroll-behavior', 'smooth')) {
        window.scrollTo({top: 0, behavior: 'smooth'});
      } else {
        window.scrollTo(0, 0);
      }
    });
  } catch (e) {
    console.error("initToC: An error occurred when attempting to attach click events for Table of Contents sidebar: " + e);
  }

  // Highlight ToC items in view. Kudos to JohnD/Tyler2P - https://stackoverflow.com/a/75346369
  const anchors = document.querySelectorAll('#main-content h1, #main-content h2, #main-content h3, #main-content h4, #main-content h5, #main-content h6');
  const tocLinks = toc.querySelectorAll('.__item');

  // Map all heading anchors which have links in the ToC
  let tocAnchors = [];
  for (var link of tocLinks) {
    for (var anchor of anchors) {
      try {
        if (anchor.querySelector('a.anchor-heading') && link.getAttribute('href') === anchor.querySelector('a.anchor-heading').getAttribute('href')) {
          tocAnchors.push(anchor);
          break;
        }
      } catch (e) {
        console.error("initToC: An error occurred when matching ToC links with heading anchors: " + e);
      }
    }
  }

  // Use Arrow Down and Arrow Up keys to navigate through the ToC links
  if (tocLinks.length > 0) {
    jtd.addEvent(toc, 'keydown', function(e) {
      const currentIndex = Array.from(tocLinks).indexOf(document.activeElement);

      if (e.key === 'ArrowDown') {
        e.preventDefault();
        const nextIndex = (currentIndex + 1) % tocLinks.length;
        tocLinks[nextIndex].focus();
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        const prevIndex = (currentIndex - 1 + tocLinks.length) % tocLinks.length;
        tocLinks[prevIndex].focus();
      }
    });
  }

  {% if site.toc.highlight_active == true and site.toc.highlight %}
  const offset = {{ site.toc.highlight.offset | default: 'null' }} || window.innerHeight / 2;
  jtd.addEvent(window, 'scroll', function() {
    if (typeof (tocAnchors) != 'undefined' && tocAnchors != null && typeof (tocLinks) != 'undefined' && tocLinks != null) {
      for (var i = 0; i < tocAnchors.length; i++) {
        {% if site.toc.highlight.in_view == true %}
        /* Highlight all current ToC items in the viewport */
        if (window.scrollY > tocAnchors[i].offsetTop - offset) {
          if (window.innerWidth <= 800) {
            toggleTocBanner.querySelector('.current-heading').innerHTML = tocAnchors[i].innerText;
          }
          for (var k = 0; k < i; k++) {
            tocLinks[k].classList.remove('active');
            tocLinks[k].removeAttribute('aria-current');
          }
        }
        for (var a = i; a < tocAnchors.length; a++) {
          if (!isOutOfViewport(tocAnchors[a], false)) {
            tocLinks[a].classList.add('active');
            tocLinks[a].setAttribute('aria-current', 'true');
            tocLinks[a].parentElement.scrollIntoView({ block: 'nearest', inline: 'nearest' });
          } else {
            tocLinks[a].classList.remove('active');
            tocLinks[a].removeAttribute('aria-current');
          }
        }
        {% elsif site.toc.highlight.in_view == false %}
        if (!isOutOfViewport(tocAnchors[i], false) && window.scrollY > tocAnchors[i].offsetTop - offset &&
            (i === 0 || i > 0 && isOutOfViewport(tocAnchors[i-1], true))) {
          if (window.innerWidth <= 800) {
            toggleTocBanner.querySelector('.current-heading').innerHTML = tocAnchors[i].innerText;
          }
          for (var k = 0; k !== i && k < tocAnchors.length; k++) {
            tocLinks[k].classList.remove('active');
            tocLinks[k].removeAttribute('aria-current');
          }
          tocLinks[i].classList.add('active');
          tocLinks[i].setAttribute('aria-current', 'true');
          tocLinks[i].parentElement.scrollIntoView({ block: 'nearest', inline: 'nearest' });
        } else {
          tocLinks[i].classList.remove('active');
          tocLinks[i].removeAttribute('aria-current');
        }
        {% endif %}
      }
    }

    if (window.innerWidth <= 800) {
      if (tocAnchors && tocAnchors.length) {
        if (window.scrollY < tocAnchors[0].offsetTop) {
          toggleTocBanner.querySelector('.current-heading').innerHTML = "";
        }
      }
      // Hide the heading banner when scrolling down and show when scrolling up
      if (window.scrollY - previousScrollY > 15) {
        toggleTocBanner.classList.add('hidden');
      } else if (previousScrollY - window.scrollY > 15 || window.scrollY < 108) {
        toggleTocBanner.classList.remove('hidden');
      }
      previousScrollY = window.scrollY;
    }
  });
  {%- endif %}
}

// The <head> element is assumed to include the following stylesheets:
// - a <link> to /assets/css/just-the-docs-head-nav.css,
//             with id 'jtd-head-nav-stylesheet'
// - a <style> containing the result of _includes/css/activation.scss.liquid.
// To avoid relying on the order of stylesheets (which can change with HTML
// compression, user-added JavaScript, and other side effects), stylesheets
// are only interacted with via ID

function disableHeadStyleSheets() {
  const headNav = document.getElementById('jtd-head-nav-stylesheet');
  if (headNav) {
    headNav.disabled = true;
  }

  const activation = document.getElementById('jtd-nav-activation');
  if (activation) {
    activation.disabled = true;
  }
}

{%- if site.search_enabled != false %}
// Site search

function initSearch() {
  var request = new XMLHttpRequest();
  request.open('GET', '{{ "assets/js/search-data.json" | relative_url }}', true);

  request.onload = function(){
    if (request.status >= 200 && request.status < 400) {
      var docs = JSON.parse(request.responseText);

      lunr.tokenizer.separator = {{ site.search.tokenizer_separator | default: site.search_tokenizer_separator | default: "/[\s\-/]+/" }}

      var index = lunr(function(){
        this.ref('id');
        this.field('title', { boost: 200 });
        this.field('content', { boost: 2 });
        {%- if site.search.rel_url != false %}
        this.field('relUrl');
        {%- endif %}
        this.metadataWhitelist = ['position']

        for (var i in docs) {
          {% include lunr/custom-index.js %}
          this.add({
            id: i,
            title: docs[i].title,
            content: docs[i].content,
            {%- if site.search.rel_url != false %}
            relUrl: docs[i].relUrl
            {%- endif %}
          });
        }
      });

      searchLoaded(index, docs);
    } else {
      console.log('Error loading ajax request. Request status:' + request.status);
    }
  };

  request.onerror = function(){
    console.log('There was a connection error');
  };

  request.send();
}

function searchLoaded(index, docs) {
  var index = index;
  var docs = docs;
  var searchInput = document.getElementById('search-input');
  var searchResults = document.getElementById('search-results');
  var mainHeader = document.getElementById('main-header');
  var currentInput;
  var currentSearchIndex = 0;

  {%- if site.search.focus_shortcut_key %}
  // add event listener on ctrl + <focus_shortcut_key> for showing the search input
  jtd.addEvent(document, 'keydown', function (e) {
    if ((e.ctrlKey || e.metaKey) && e.key === '{{ site.search.focus_shortcut_key }}') {
      e.preventDefault();

      mainHeader.classList.add('nav-open');
      searchInput.focus();
    }
  });
  {%- endif %}

  function showSearch() {
    document.documentElement.classList.add('search-active');
  }

  function hideSearch() {
    document.documentElement.classList.remove('search-active');
  }

  function update() {
    currentSearchIndex++;

    var input = searchInput.value;
    if (input === '') {
      hideSearch();
    } else {
      showSearch();
      // scroll search input into view, workaround for iOS Safari
      window.scroll(0, -1);
      setTimeout(function(){ window.scroll(0, 0); }, 0);
    }
    if (input === currentInput) {
      return;
    }
    currentInput = input;
    searchResults.innerHTML = '';
    if (input === '') {
      return;
    }

    var results = index.query(function (query) {
      var tokens = lunr.tokenizer(input)
      query.term(tokens, {
        boost: 10
      });
      query.term(tokens, {
        wildcard: lunr.Query.wildcard.TRAILING
      });
    });

    if ((results.length == 0) && (input.length > 2)) {
      var tokens = lunr.tokenizer(input).filter(function(token, i) {
        return token.str.length < 20;
      })
      if (tokens.length > 0) {
        results = index.query(function (query) {
          query.term(tokens, {
            editDistance: Math.round(Math.sqrt(input.length / 2 - 1))
          });
        });
      }
    }

    if (results.length == 0) {
      var noResultsDiv = document.createElement('div');
      noResultsDiv.classList.add('search-no-result');
      noResultsDiv.innerText = 'No results found';
      searchResults.appendChild(noResultsDiv);

    } else {
      var resultsList = document.createElement('ul');
      resultsList.classList.add('search-results-list');
      searchResults.appendChild(resultsList);

      addResults(resultsList, results, 0, 10, 100, currentSearchIndex);
    }

    function addResults(resultsList, results, start, batchSize, batchMillis, searchIndex) {
      if (searchIndex != currentSearchIndex) {
        return;
      }
      for (var i = start; i < (start + batchSize); i++) {
        if (i == results.length) {
          return;
        }
        addResult(resultsList, results[i]);
      }
      setTimeout(function() {
        addResults(resultsList, results, start + batchSize, batchSize, batchMillis, searchIndex);
      }, batchMillis);
    }

    function addResult(resultsList, result) {
      var doc = docs[result.ref];

      var resultsListItem = document.createElement('li');
      resultsListItem.classList.add('search-results-list-item');
      resultsList.appendChild(resultsListItem);

      var resultLink = document.createElement('a');
      resultLink.classList.add('search-result');
      resultLink.setAttribute('href', doc.url);
      resultsListItem.appendChild(resultLink);

      var resultTitle = document.createElement('div');
      resultTitle.classList.add('search-result-title');
      resultLink.appendChild(resultTitle);

      // note: the SVG svg-doc is only loaded as a Jekyll include if site.search_enabled is true; see _includes/icons/icons.html
      var resultDoc = document.createElement('div');
      resultDoc.classList.add('search-result-doc');
      resultDoc.innerHTML = '<svg viewBox="0 0 24 24" class="search-result-icon"><use xlink:href="#svg-doc"></use></svg>';
      resultTitle.appendChild(resultDoc);

      var resultDocTitle = document.createElement('div');
      resultDocTitle.classList.add('search-result-doc-title');
      resultDocTitle.innerHTML = doc.doc;
      resultDoc.appendChild(resultDocTitle);
      var resultDocOrSection = resultDocTitle;

      if (doc.doc != doc.title) {
        resultDoc.classList.add('search-result-doc-parent');
        var resultSection = document.createElement('div');
        resultSection.classList.add('search-result-section');
        resultSection.innerHTML = doc.title;
        resultTitle.appendChild(resultSection);
        resultDocOrSection = resultSection;
      }

      var metadata = result.matchData.metadata;
      var titlePositions = [];
      var contentPositions = [];
      for (var j in metadata) {
        var meta = metadata[j];
        if (meta.title) {
          var positions = meta.title.position;
          for (var k in positions) {
            titlePositions.push(positions[k]);
          }
        }
        if (meta.content) {
          var positions = meta.content.position;
          for (var k in positions) {
            var position = positions[k];
            var previewStart = position[0];
            var previewEnd = position[0] + position[1];
            var ellipsesBefore = true;
            var ellipsesAfter = true;
            for (var k = 0; k < {{ site.search.preview_words_before | default: 5 }}; k++) {
              var nextSpace = doc.content.lastIndexOf(' ', previewStart - 2);
              var nextDot = doc.content.lastIndexOf('. ', previewStart - 2);
              if ((nextDot >= 0) && (nextDot > nextSpace)) {
                previewStart = nextDot + 1;
                ellipsesBefore = false;
                break;
              }
              if (nextSpace < 0) {
                previewStart = 0;
                ellipsesBefore = false;
                break;
              }
              previewStart = nextSpace + 1;
            }
            for (var k = 0; k < {{ site.search.preview_words_after | default: 10 }}; k++) {
              var nextSpace = doc.content.indexOf(' ', previewEnd + 1);
              var nextDot = doc.content.indexOf('. ', previewEnd + 1);
              if ((nextDot >= 0) && (nextDot < nextSpace)) {
                previewEnd = nextDot;
                ellipsesAfter = false;
                break;
              }
              if (nextSpace < 0) {
                previewEnd = doc.content.length;
                ellipsesAfter = false;
                break;
              }
              previewEnd = nextSpace;
            }
            contentPositions.push({
              highlight: position,
              previewStart: previewStart, previewEnd: previewEnd,
              ellipsesBefore: ellipsesBefore, ellipsesAfter: ellipsesAfter
            });
          }
        }
      }

      if (titlePositions.length > 0) {
        titlePositions.sort(function(p1, p2){ return p1[0] - p2[0] });
        resultDocOrSection.innerHTML = '';
        addHighlightedText(resultDocOrSection, doc.title, 0, doc.title.length, titlePositions);
      }

      if (contentPositions.length > 0) {
        contentPositions.sort(function(p1, p2){ return p1.highlight[0] - p2.highlight[0] });
        var contentPosition = contentPositions[0];
        var previewPosition = {
          highlight: [contentPosition.highlight],
          previewStart: contentPosition.previewStart, previewEnd: contentPosition.previewEnd,
          ellipsesBefore: contentPosition.ellipsesBefore, ellipsesAfter: contentPosition.ellipsesAfter
        };
        var previewPositions = [previewPosition];
        for (var j = 1; j < contentPositions.length; j++) {
          contentPosition = contentPositions[j];
          if (previewPosition.previewEnd < contentPosition.previewStart) {
            previewPosition = {
              highlight: [contentPosition.highlight],
              previewStart: contentPosition.previewStart, previewEnd: contentPosition.previewEnd,
              ellipsesBefore: contentPosition.ellipsesBefore, ellipsesAfter: contentPosition.ellipsesAfter
            }
            previewPositions.push(previewPosition);
          } else {
            previewPosition.highlight.push(contentPosition.highlight);
            previewPosition.previewEnd = contentPosition.previewEnd;
            previewPosition.ellipsesAfter = contentPosition.ellipsesAfter;
          }
        }

        var resultPreviews = document.createElement('div');
        resultPreviews.classList.add('search-result-previews');
        resultLink.appendChild(resultPreviews);

        var content = doc.content;
        for (var j = 0; j < Math.min(previewPositions.length, {{ site.search.previews | default: 3 }}); j++) {
          var position = previewPositions[j];

          var resultPreview = document.createElement('div');
          resultPreview.classList.add('search-result-preview');
          resultPreviews.appendChild(resultPreview);

          if (position.ellipsesBefore) {
            resultPreview.appendChild(document.createTextNode('... '));
          }
          addHighlightedText(resultPreview, content, position.previewStart, position.previewEnd, position.highlight);
          if (position.ellipsesAfter) {
            resultPreview.appendChild(document.createTextNode(' ...'));
          }
        }
      }

      {%- if site.search.rel_url != false %}
      var resultRelUrl = document.createElement('span');
      resultRelUrl.classList.add('search-result-rel-url');
      resultRelUrl.innerText = doc.relUrl;
      resultTitle.appendChild(resultRelUrl);
      {%- endif %}
    }

    function addHighlightedText(parent, text, start, end, positions) {
      var index = start;
      for (var i in positions) {
        var position = positions[i];
        var span = document.createElement('span');
        span.innerHTML = text.substring(index, position[0]);
        parent.appendChild(span);
        index = position[0] + position[1];
        var highlight = document.createElement('span');
        highlight.classList.add('search-result-highlight');
        highlight.innerHTML = text.substring(position[0], index);
        parent.appendChild(highlight);
      }
      var span = document.createElement('span');
      span.innerHTML = text.substring(index, end);
      parent.appendChild(span);
    }
  }

  jtd.addEvent(searchInput, 'focus', function(){
    setTimeout(update, 0);
  });

  jtd.addEvent(searchInput, 'keyup', function(e){
    switch (e.keyCode) {
      case 27: // When esc key is pressed, hide the results and clear the field
        searchInput.value = '';
        break;
      case 38: // arrow up
      case 40: // arrow down
      case 13: // enter
        e.preventDefault();
        return;
    }
    update();
  });

  jtd.addEvent(searchInput, 'keydown', function(e){
    switch (e.keyCode) {
      case 38: // arrow up
        e.preventDefault();
        var active = document.querySelector('.search-result.active');
        if (active) {
          active.classList.remove('active');
          if (active.parentElement.previousSibling) {
            var previous = active.parentElement.previousSibling.querySelector('.search-result');
            previous.classList.add('active');
          }
        }
        return;
      case 40: // arrow down
        e.preventDefault();
        var active = document.querySelector('.search-result.active');
        if (active) {
          if (active.parentElement.nextSibling) {
            var next = active.parentElement.nextSibling.querySelector('.search-result');
            active.classList.remove('active');
            next.classList.add('active');
          }
        } else {
          var next = document.querySelector('.search-result');
          if (next) {
            next.classList.add('active');
          }
        }
        return;
      case 13: // enter
        e.preventDefault();
        var active = document.querySelector('.search-result.active');
        if (active) {
          active.click();
        } else {
          var first = document.querySelector('.search-result');
          if (first) {
            first.click();
          }
        }
        return;
    }
  });

  jtd.addEvent(document, 'click', function(e){
    if (e.target != searchInput) {
      hideSearch();
    }
  });
}
{%- endif %}

// Switch theme

jtd.getTheme = function() {
  var cssFileHref = document.querySelector('[rel="stylesheet"]').getAttribute('href');
  return cssFileHref.substring(cssFileHref.lastIndexOf('-') + 1, cssFileHref.length - 4);
}

jtd.setTheme = function(theme) {
  var cssFile = document.querySelector('[rel="stylesheet"]');
  cssFile.setAttribute('href', '{{ "assets/css/just-the-docs-" | relative_url }}' + theme + '.css');
}

// Note: pathname can have a trailing slash on a local jekyll server
// and not have the slash on GitHub Pages

function navLink() {
  var pathname = document.location.pathname;

  var navLink = document.getElementById('site-nav').querySelector('a[href="' + pathname + '"]');
  if (navLink) {
    return navLink;
  }

  // The `permalink` setting may produce navigation links whose `href` ends with `/` or `.html`.
  // To find these links when `/` is omitted from or added to pathname, or `.html` is omitted:

  if (pathname.endsWith('/') && pathname != '/') {
    pathname = pathname.slice(0, -1);
  }

  if (pathname != '/') {
    navLink = document.getElementById('site-nav').querySelector('a[href="' + pathname + '"], a[href="' + pathname + '/"], a[href="' + pathname + '.html"]');
    if (navLink) {
      return navLink;
    }
  }

  return null; // avoids `undefined`
}

// Scroll site-nav to ensure the link to the current page is visible

function scrollNav() {
  const targetLink = navLink();
  if (targetLink) {
    try {
      targetLink.scrollIntoView({ block: "center" });
    } catch (e) {
      targetLink.scrollIntoView();
    }
    targetLink.removeAttribute('href');
  }
}

// Find the nav-list-link that refers to the current page
// then make it and all enclosing nav-list-item elements active.

function activateNav() {
  var target = navLink();
  if (target) {
    target.classList.toggle('active', true);
  }
  while (target) {
    while (target && !(target.classList && target.classList.contains('nav-list-item'))) {
      target = target.parentNode;
    }
    if (target) {
      target.classList.toggle('active', true);
      target = target.parentNode;
    }
  }
}

// Document ready

jtd.onReady(function(){
  if (document.getElementById('site-nav')) {
    initNav();
    activateNav();
    scrollNav();
  }
  {%- if site.toc_enabled != false %}
  initToC();
  {%- endif %}
  {%- if site.search_enabled != false %}
  initSearch();
  {%- endif %}
});

// Copy button on code


{%- if site.enable_copy_code_button != false %}

jtd.onReady(function(){

  if (!window.isSecureContext) {
    console.log('Window does not have a secure context, therefore code clipboard copy functionality will not be available. For more details see https://web.dev/async-clipboard/#security-and-permissions');
    return;
  }

  var codeBlocks = document.querySelectorAll('div.highlighter-rouge, div.listingblock > div.content, figure.highlight');

  // note: the SVG svg-copied and svg-copy is only loaded as a Jekyll include if site.enable_copy_code_button is true; see _includes/icons/icons.html
  var svgCopied =  '<svg viewBox="0 0 24 24" class="copy-icon"><use xlink:href="#svg-copied"></use></svg>';
  var svgCopy =  '<svg viewBox="0 0 24 24" class="copy-icon"><use xlink:href="#svg-copy"></use></svg>';

  for (var codeBlock of codeBlocks) {
    var copyButton = document.createElement('button');
    var timeout = null;
    copyButton.type = 'button';
    copyButton.ariaLabel = 'Copy code to clipboard';
    copyButton.innerHTML = svgCopy;
    codeBlock.append(copyButton);

    copyButton.addEventListener('click', function () {
      if(timeout === null) {
        var code = (codeBlock.querySelector('pre:not(.lineno, .highlight)') || codeBlock.querySelector('code')).innerText;
        window.navigator.clipboard.writeText(code);

        copyButton.innerHTML = svgCopied;

        var timeoutSetting = 4000;

        timeout = setTimeout(function () {
          copyButton.innerHTML = svgCopy;
          timeout = null;
        }, timeoutSetting);
      }
    });
  }

});

{%- endif %}

})(window.jtd = window.jtd || {});

{% include js/custom.js %}
