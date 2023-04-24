import "../../_site/assets/css/just-the-docs-default.css"

export const createLabel = ({ variant = "default", label, size = "4" }) => {
  const btn = document.createElement("span")
  btn.innerText = label

  btn.className = ["label", `label-${variant}`, `fs-${size}`].join(" ")

  return btn
}
