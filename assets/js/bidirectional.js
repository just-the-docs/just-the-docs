(function(){


console.log('setting up bidirectional links')

fetch('/ops/references.json')
  .then(response => response.json())
  .then(data => {
     console.log(data)
     const toks = (window.location + '').split("/").toLowerCase()
     const my_slug = toks[toks.length-1]
     if (my_slug === 'ops') my_slug = 'index'
     const footer = document.querySelector('footer.page-footer')
     footer.innerHTML += "<h3>references</h3><ol><li>" + (data[my_slug] || []).join('</li><li>') + "</li></ol>"
});

})();
