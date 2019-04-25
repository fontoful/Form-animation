function animatedForm() {
  const arrows = document.querySelectorAll(".fa-arrow-down");

  const inputs = document.querySelectorAll("input");

  inputs.forEach(input => {
    const inputLove = input.previousElementSibling;
    const parent = input.parentElement;
    const nextForm = parent.nextElementSibling;

    let keydownHandler = e => {
      if (e.keyCode === 13 && validateUser(input)) {
        nextSlide(inputLove, nextForm);
      } else if (e.keyCode === 13 && validateEmail(input)) {
        nextSlide(parent, nextForm);
      } else if (e.keyCode === 13 && validateUser(input)) {
        nextSlide(parent, nextForm);
      } else {
        parent.style.animation = "shake 0.5s ease";
      }
    };

    input.addEventListener("focus", () => {
      window.addEventListener("keydown", keydownHandler);
      console.log("Working");
    });

    input.addEventListener("blur", () => {
      window.removeEventListener("keydown", keydownHandler);
      console.log("Unfocused");
    });

    parent.addEventListener("animationend", () => {
      parent.style.animation = "";
    });
  });

  arrows.forEach(arrow => {
    arrow.addEventListener("click", () => {
      const input = arrow.previousElementSibling;
      const parent = arrow.parentElement;
      const nextForm = parent.nextElementSibling;

      // check for validation
      if (input.type === "text" && validateUser(input)) {
        nextSlide(parent, nextForm);
      } else if (input.type === "email" && validateEmail(input)) {
        nextSlide(parent, nextForm);
      } else if (input.type === "password" && validateUser(input)) {
        nextSlide(parent, nextForm);
      } else {
        parent.style.animation = "shake 0.5s ease";
      }

      // get rid of animation
      parent.addEventListener("animationend", () => {
        parent.style.animation = "";
      });
    });
  });
}

function validateUser(user) {
  if (user.value.length < 6) {
    console.log("not enough characters");
    error("rgb(189, 87, 87");
  } else {
    error("rgb(87, 189, 130");
    return true;
  }
}

function validateEmail(email) {
  const validation = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  if (validation.test(email.value)) {
    error("rgb(87, 189, 130"); // green
    return true;
  } else {
    error("rgb(189, 87, 87"); // red
  }
}

function error(color) {
  document.body.style.backgroundColor = color;
}

function nextSlide(parent, nextForm) {
  parent.classList.add("innactive");
  parent.classList.remove("active");
  nextForm.classList.add("active");
}

animatedForm();
