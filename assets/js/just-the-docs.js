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

function isOutOfViewport(el) {
  const rect = el.getBoundingClientRect();
  return (
      // rect.bottom < 0 || // Element is above the viewport
      rect.top > window.innerHeight || // Element is below the viewport
      rect.right < 0 || // Element is left of the viewport
      rect.left > window.innerWidth // Element is right of the viewport
  );
}

function initToC(retries = 3, delay = 300) {
  const toc = document.querySelector("aside.toc"); // Table of Contents sidebar panel
  const toggleTocBanner = document.querySelector('a.toc-banner'); // toggle banner at the top of the page

  // previousScrollY determines the last scroll position of the page => display the ToC banner when scrolling up
  // tocItemClicked detects if a ToC item is clicked => close the ToC panel
  let previousScrollY = 0, tocItemClicked = false;

  // If toc or toggleTocBanner is not on screen, retry after a 300ms delay
  if (!toc || !toggleTocBanner || typeof jtd === 'undefined') {
    if (retries > 0) {
      setTimeout(function() { initToC(retries - 1, delay); }, delay);
    } else {
      console.warn("initToC: Table of Contents panel, banner or jtd object not found after multiple attempts.");
    }
    return;
  }

  try {
    // Close the ToC panel if user clicks outside the ToC sidebar (xs -> lg)
    jtd.addEvent(document, 'click', function(e) {
      if (!toc.contains(e.target) && !e.target.classList.contains('js-toggle-toc')) {
        toc.classList.add('closed');
      }
    });
    jtd.addEvent(toc, 'focusout', function(e) {
      if (!toc.contains(e.relatedTarget)) {
        toc.classList.add('closed');
      }
    });
    // On xs and sm screens, as the ToC panel occupies the entire screen real estate, close the panel if user clicks on a ToC item
    // Do not display the heading banner for a short time after a ToC item is clicked
    if (window.innerWidth <= 800) {
      for (var element of toc.querySelectorAll('a.toc-item-link, a.back-to-top')) {
        jtd.addEvent(element, 'click', (e) => {
          toc.classList.add('closed');
          toggleTocBanner.classList.add('hidden');
          tocItemClicked = true;
          setTimeout(() => { tocItemClicked = false; }, 500);
        });
      }
    }
    // Buttons to open the ToC sidebar/top panel
    for (var element of document.querySelectorAll('.js-toggle-toc')) {
      jtd.addEvent(element, 'click', (e) => {
        toc.classList.toggle('closed');
        e.currentTarget.setAttribute("aria-expanded",
          e.currentTarget.getAttribute('aria-expanded') === 'true' ? 'false' : 'true');
      });
    }
    // Double-clicking the ToC opener button to scroll back to top (md and lg)
    jtd.addEvent(document.querySelector('.btn.js-toggle-toc'), 'dblclick', () => {
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
  const tocLinks = toc.querySelectorAll('a.toc-item-link');

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

  jtd.addEvent(window, 'scroll', () => {
    if (typeof (tocAnchors) != 'undefined' && tocAnchors != null && typeof (tocLinks) != 'undefined' && tocLinks != null) {
      for (var i = 0; i < tocAnchors.length; i++) {
        // Once a heading anchor passes the top of the viewport, remove the .active class from the ToC links of all previous anchors above.
        // Making sure that if there's still a portion of the last section on screen, the ToC item for that remains highlighted.
        if (window.scrollY > tocAnchors[i].offsetTop - 10) { // Offset for checking the heading against top of viewport is 10px
          if (window.innerWidth <= 800) {
            toggleTocBanner.innerHTML = tocAnchors[i].innerText;
          }
          for (var k = 0; k < i; k++) {
            tocLinks[k].classList.remove('active');
          }
        }
        // Highlight the current ToC item and subsequent items in the viewport, if any
        for (var a = i; a < tocAnchors.length; a++) {
          if (!isOutOfViewport(tocAnchors[a])) {
            tocLinks[a].classList.add('active');
          } else {
            tocLinks[a].classList.remove('active');
          }
        }
      }
    }

    if (window.innerWidth <= 800) {
      if (tocAnchors && tocAnchors.length) {
        if (window.scrollY < tocAnchors[0].offsetTop) {
          toggleTocBanner.innerText = "";
        }
      }
      // Hide the heading banner when scrolling down and show when scrolling up
      if (!tocItemClicked) {
        if (window.scrollY - previousScrollY > 15) {
          toggleTocBanner.classList.add('hidden');
        } else if (previousScrollY - window.scrollY > 15 || window.scrollY < 108) {
          toggleTocBanner.classList.remove('hidden');
        }
      }
      previousScrollY = window.scrollY;
    }
  });
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
