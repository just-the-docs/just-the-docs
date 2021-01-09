window.addEventListener("load", () => {
  document.querySelectorAll(".tabs a").forEach((tab) => {
    tab.addEventListener("click", () => {
      document.querySelector(
        `.tab-content > #${tab.dataset.tab}`
      ).style.display = "block";
      document.querySelector(
        `.tab-content > :not(#${tab.dataset.tab}`
      ).style.display = "none";

      tab.classList.add("active");
      document
        .querySelector(
          ".tabs .tab-link:not([data-tab=" + tab.dataset.tab + "])"
        )
        .classList.remove("active");
    });
  });
});
