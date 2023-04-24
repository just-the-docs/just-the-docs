import "../../_site/assets/css/just-the-docs-default.css"

export const createButton = ({ variant = "default", label, size = "4" }) => {
  const btn = document.createElement("button")
  btn.type = "button"
  btn.innerText = label

  btn.className = ["btn", `btn-${variant}`, `fs-${size}`].join(" ")

  return btn
}
