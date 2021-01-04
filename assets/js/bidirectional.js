(function(){


console.log('setting up bidirectional links')

fetch('/ops/references.json')
  .then(response => response.json())
  .then(data => {
     console.log(data)
     const toks = (window.location + '').split("/")
     const my_slug = toks[toks.length-2].toLowerCase()
     if (my_slug === 'ops') my_slug = 'index'
     const my_refs = data.refs[my_slug] || []
     const links_html = my_refs.map( ref => {
       return `<a href="https://${window.location.host + '/' + data.paths[ref]}">${ref}</a>`
     }).join("")
     const footer = document.querySelector('footer.page-footer')
     let ref_html = "<h3>Pages that link to this page:</h3><ol>" + links_html + "</ol>"
     footer.innerHTML += ref_html
});

})();
