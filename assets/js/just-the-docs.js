---
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
      target.parentNode.classList.toggle('active');
    }
  });

  const siteNav = document.getElementById('site-nav');
  const mainHeader = document.getElementById('main-header');
  const menuButton = document.getElementById('menu-button');

  jtd.addEvent(menuButton, 'click', function(e){
    e.preventDefault();

    if (menuButton.classList.toggle('nav-open')) {
      siteNav.classList.add('nav-open');
      mainHeader.classList.add('nav-open');
    } else {
      siteNav.classList.remove('nav-open');
      mainHeader.classList.remove('nav-open');
    }
  });

  {% if site.search_enabled != false -%}
  const searchInput = document.getElementById('search-input');
  const searchButton = document.getElementById('search-button');

  jtd.addEvent(searchButton, 'click', function(e){
    e.preventDefault();

    mainHeader.classList.add('nav-open');
    searchInput.focus();
  });
  {%- endif %}
}

// Site search

{% if site.search_enabled != false -%}
function initSearch() {
  var request = new XMLHttpRequest();
  request.open('GET', '{{ "assets/js/search-data.json" | absolute_url }}', true);

  request.onload = function(){
    if (request.status >= 200 && request.status < 400) {
      // Success!
      var data = JSON.parse(request.responseText);
      
      {% if site.search_tokenizer_separator != nil %}
      lunr.tokenizer.separator = {{ site.search_tokenizer_separator }}
      {% else %}
      lunr.tokenizer.separator = /[\s\-/]+/
      {% endif %}
      
      var index = lunr(function () {
        this.ref('id');
        this.field('title', { boost: 200 });
        this.field('content', { boost: 2 });
        this.field('url');
        this.metadataWhitelist = ['position']

        for (var i in data) {
          this.add({
            id: i,
            title: data[i].title,
            content: data[i].content,
            url: data[i].url
          });
        }
      });

      searchResults(index, data);
    } else {
      // We reached our target server, but it returned an error
      console.log('Error loading ajax request. Request status:' + request.status);
    }
  };

  request.onerror = function(){
    // There was a connection error of some sort
    console.log('There was a connection error');
  };

  request.send();

  function searchResults(index, data) {
    var index = index;
    var docs = data;
    var searchInput = document.getElementById('search-input');
    var searchResults = document.getElementById('search-results');
    var mainContentWrap = document.getElementById('main-content-wrap');

    function hideResults() {
      searchResults.innerHTML = '';
      searchResults.classList.remove('active');
      mainContentWrap.classList.remove('blur');
    }

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

    jtd.addEvent(searchInput, 'keyup', function(e){
      switch (e.keyCode) {
        case 27: // When esc key is pressed, hide the results and clear the field
          hideResults();
          searchInput.value = '';
          return;
        case 38: // arrow up
        case 40: // arrow down
        case 13: // enter
          e.preventDefault();
          return;
      }

      hideResults();

      var input = this.value;
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

      if (results.length > 0) {
        searchResults.classList.add('active');
        mainContentWrap.classList.add('blur');
        var resultsList = document.createElement('ul');
        resultsList.classList.add('search-results-list');
        searchResults.appendChild(resultsList);

        for (var i in results) {
          var result = results[i];
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
          resultTitle.innerText = doc.title;
          resultLink.appendChild(resultTitle);

          var resultRelUrl = document.createElement('span');
          resultRelUrl.classList.add('search-result-rel-url');
          resultRelUrl.innerText = doc.relUrl;
          resultTitle.appendChild(resultRelUrl);

          var metadata = result.matchData.metadata;
          var contentFound = false;
          for (var j in metadata) {
            if (metadata[j].title) {
              var position = metadata[j].title.position[0];
              var start = position[0];
              var end = position[0] + position[1];
              resultTitle.innerHTML = doc.title.substring(0, start) + '<span class="search-result-highlight">' + doc.title.substring(start, end) + '</span>' + doc.title.substring(end, doc.title.length)+'<span class="search-result-rel-url">'+doc.relUrl+'</span>';

            } else if (metadata[j].content && !contentFound) {
              contentFound = true;

              var position = metadata[j].content.position[0];
              var start = position[0];
              var end = position[0] + position[1];
              var previewStart = start;
              var previewEnd = end;
              var ellipsesBefore = true;
              var ellipsesAfter = true;
              for (var k = 0; k < 3; k++) {
                var nextSpace = doc.content.lastIndexOf(' ', previewStart - 2);
                var nextDot = doc.content.lastIndexOf('.', previewStart - 2);
                if ((nextDot > 0) && (nextDot > nextSpace)) {
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
              for (var k = 0; k < 10; k++) {
                var nextSpace = doc.content.indexOf(' ', previewEnd + 1);
                var nextDot = doc.content.indexOf('.', previewEnd + 1);
                if ((nextDot > 0) && (nextDot < nextSpace)) {
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
              var preview = doc.content.substring(previewStart, start);
              if (ellipsesBefore) {
                preview = '... ' + preview;
              }
              preview += '<span class="search-result-highlight">' + doc.content.substring(start, end) + '</span>';
              preview += doc.content.substring(end, previewEnd);
              if (ellipsesAfter) {
                preview += ' ...';
              }

              var resultPreview = document.createElement('div');
              resultPreview.classList.add('search-result-preview');
              resultPreview.innerHTML = preview;
              resultLink.appendChild(resultPreview);
            }
          }
        }
      }
    });

    jtd.addEvent(searchInput, 'blur', function(){
      setTimeout(function(){ hideResults() }, 300);
    });
  }
}
{%- endif %}

// Focus

function pageFocus() {
  var mainWrap = document.getElementById('main-wrap');
  mainWrap.focus();
}

// Switch theme

jtd.getTheme = function() {
  var cssFileHref = document.querySelector('[rel="stylesheet"]').getAttribute('href');
  return cssFileHref.substring(cssFileHref.lastIndexOf('-') + 1, cssFileHref.length - 4);
}

jtd.setTheme = function(theme) {
  var cssFile = document.querySelector('[rel="stylesheet"]');
  cssFile.setAttribute('href', '{{ "assets/css/just-the-docs-" | absolute_url }}' + theme + '.css');
}

// Document ready

jtd.onReady(function(){
  initNav();
  pageFocus();
  {% if site.search_enabled != false -%}
  initSearch();
  {%- endif %}
});

})(window.jtd = window.jtd || {});

{% include js/custom.js %}
