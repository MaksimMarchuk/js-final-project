(() => {
  const refs = {
    openModalBtn: document.querySelector("[data-open-modal]"),
    closeModalBtns: document.querySelectorAll("[data-close-modal]"),
    modal: document.querySelector("[data-modal]") || document.getElementById("mainModal"),
  };

  if (refs.openModalBtn && refs.modal) {
    refs.openModalBtn.addEventListener("click", toggleModal);
  }

  refs.closeModalBtns.forEach(btn => {
    btn.addEventListener("click", toggleModal);
  });

  function toggleModal() {
    if (refs.modal) {
      refs.modal.classList.toggle("is-hidden");
      document.body.classList.toggle("no-scroll");
    }
  }
})();



(() => {
  const refs = {
    openModalBtn: document.querySelector("[data-open-modal-form]"),
    closeModalBtn: document.querySelector("[data-close-modal-form]"),
    modal: document.querySelector("[data-modal-form]"),
  };

  refs.openModalBtn.addEventListener("click", toggleModal);
  refs.closeModalBtn.addEventListener("click", toggleModal);

  function toggleModal() {
    refs.modal.classList.toggle("is-hidden");
    document.body.classList.toggle("no-scroll");
  }
})();