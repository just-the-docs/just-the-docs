export default class Modal {
  constructor(id) {
    this.modal = document.getElementById(id);

    this.modal.querySelector(".close").onclick = () => {
      this.hide();
    };
    window.addEventListener("click", (e) => {
      if (e.target === this.modal) this.hide();
    });

    document.querySelectorAll(`*[data-trigger='${id}']`).forEach((trigger) => {
      trigger.addEventListener("click", (e) => {
        this.show(e.target.dataset.tab);
      });
    });
  }

  show(tabID) {
    this.modal.style.display = "flex";
    this.modal.querySelector(`.tab-content > #${tabID}`).style.display =
      "block";
    this.modal.querySelector(`.tab-content > :not(#${tabID})`).style.display =
      "none";
    this.modal
      .querySelector(`.tabs a[data-tab='${tabID}']`)
      .classList.add("active");
    this.modal
      .querySelector(`.tabs a:not([data-tab='${tabID}'])`)
      .classList.remove("active");
  }

  hide() {
    this.modal.style.display = "none";
    this.modal.querySelectorAll("input").forEach((input) => (input.value = ""));
    this.modal.querySelectorAll(".errormsg").forEach((el) => el.remove());
  }
}
