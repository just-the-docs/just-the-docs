document.addEventListener("DOMContentLoaded", function () {
  const toggleDarkMode = document.querySelector(".js-toggle-dark-mode")
  const cssFile = document.querySelector('[rel="stylesheet"]')
  const originalCssRef = cssFile.getAttribute("href")
  const darkModeCssRef = originalCssRef.replace(
    "just-the-docs.css",
    "dark-mode-preview.css"
  )
  const buttonText = {
    dark: "Preview dark color scheme",
    light: "Return to the light side",
  }
  const updateButtonText = function (toggleDarkMode) {
    toggleDarkMode.textContent === buttonText.light
      ? (toggleDarkMode.textContent = buttonText.dark)
      : (toggleDarkMode.textContent = buttonText.light)
  }

  jtd.addEvent(toggleDarkMode, "click", function () {
    if (cssFile.getAttribute("href") === originalCssRef) {
      cssFile.setAttribute("href", darkModeCssRef)
      updateButtonText(toggleDarkMode)
    } else {
      cssFile.setAttribute("href", originalCssRef)
      updateButtonText(toggleDarkMode)
    }
  })
})
