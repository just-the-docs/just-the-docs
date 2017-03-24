// Event handling

function addEvent(el, type, handler) {
    if (el.attachEvent) el.attachEvent('on'+type, handler); else el.addEventListener(type, handler);
}
function removeEvent(el, type, handler) {
    if (el.detachEvent) el.detachEvent('on'+type, handler); else el.removeEventListener(type, handler);
}

// Show/hide mobile menu

function toggleNav(){
  const nav = document.querySelector('.js-main-nav');
  const navTrigger = document.querySelector('.js-main-nav-trigger');


  addEvent(navTrigger, 'click', function(){
    var text = navTrigger.innerText;
    var textToggle = navTrigger.getAttribute('data-text-toggle');

    nav.classList.toggle('nav-open');
    navTrigger.classList.toggle('nav-open');
    navTrigger.innerText = textToggle;
    navTrigger.setAttribute('data-text-toggle', text);
    textToggle = text;
  })
}

// Site search

function initSearch() {
  var index = lunr(function () {
    this.ref('id');
    this.field('title');
    this.field('content', { boost: 10 });
    this.field('url');
  });

  // Get the generated search_data.json file so lunr.js can search it locally.

  var request = new XMLHttpRequest();
  request.open('GET', '/search-data.json', true);

  request.onload = function() {
    if (request.status >= 200 && request.status < 400) {
      // Success!
      var data = JSON.parse(request.responseText);
      var keys = Object.keys(data);

      for(var i in data) {
        index.add({
          id: data[i].id,
          title: data[i].title,
          content: data[i].content,
          url: data[i].url
        });
      }
      searchResults(data);
    } else {
      // We reached our target server, but it returned an error
      console.log('Error loading ajax request. Request status:' + request.status);
    }
  };

  request.onerror = function() {
    // There was a connection error of some sort
    console.log('There was a connection error');
  };

  request.send();

  function searchResults(dataStore) {
    var searchInput = document.querySelector('.js-search-input');
    var searchResults = document.querySelector('.js-search-results');
    var store = dataStore;

    addEvent(searchInput, 'keyup', function(){
        var query = this.value;

        searchResults.innerHTML = '';

        if (query === '') {
          searchResults.innerHTML = '';
        } else {
          var results = index.search(query);
          for (var i in results) {
            var resultsList = document.createElement("ul");
            var resultsListItem = document.createElement("li");
            var resultsLink = document.createElement("a");
            var resultsUrl = store[results[i].ref].url;
            var resultsTitle = store[results[i].ref].title;

            resultsLink.setAttribute("href", store[results[i].ref].url);
            resultsLink.innerText = resultsTitle;

            resultsList.classList.add("search-results-list");
            searchResults.appendChild(resultsList);
            resultsList.appendChild(resultsListItem);
            resultsListItem.appendChild(resultsLink)
          }
        }
    });

    addEvent(searchInput, 'blur', function(){
      setTimeout(function(){searchResults.innerHTML = '';}, 300);
    });
  }
}


// Document ready

function ready(){
  toggleNav();
  initSearch();
}

// in case the document is already rendered
if (document.readyState!='loading') ready();
// modern browsers
else if (document.addEventListener) document.addEventListener('DOMContentLoaded', ready);
// IE <= 8
else document.attachEvent('onreadystatechange', function(){
    if (document.readyState=='complete') ready();
});
