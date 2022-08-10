"use strict";

const date = () => {
  const date = new Date();

  let time = date.toLocaleTimeString(); // "12:00:00"
  time = time.replace(/:/g, ""); // "120000"
  return time;
};

const startClock = () => {
  const time = date();
  const digits = document.querySelectorAll(`.digit`);

  digits.forEach((digit, index) => {
    const currDigit = Number(time[index]);
    const cardFaceContainer = digit.children[0].children;

    Object.keys(cardFaceContainer).forEach((key) => {
      const cardFace = cardFaceContainer[key];
      cardFace.textContent = currDigit;
    });
  });
};

const updateClock = () => {
  const time = date();
  const digits = document.querySelectorAll(`.digit`);

  digits.forEach((digit, index) => {
    const currDigit = Number(time[index]);
    const cardFaceContainer = document.querySelectorAll(`.card`);
    const checkCard = cardFaceContainer[index];
    if (checkCard.children[0].textContent != currDigit) {
      const cardTop =
        cardFaceContainer[index].getElementsByClassName("card-face-front")[0];
      const cardBottom =
        cardFaceContainer[index].getElementsByClassName("card-face-back")[0];
      const cardMid =
        cardFaceContainer[index].getElementsByClassName("card-face-mid")[0];
      const cloneTop = cardTop.cloneNode(true);
      const cloneMid = cardMid.cloneNode(true);

      cardTop.textContent = currDigit;
      cloneTop.textContent = currDigit;
      cloneMid.textContent = currDigit + 1;

      cardTop.addEventListener("transitionend", () => {
        cloneTop.textContent = currDigit;
        cardMid.classList.add("flipped-back");
        cardTop.remove();
      });

      cardMid.addEventListener("transitionend", () => {
        cardBottom.textContent = currDigit;
        cardMid.remove();
      });

      digit.children[0].appendChild(cloneTop);
      digit.children[0].appendChild(cloneMid);

      cardTop.classList.add("flipped-front");
    }
  });
};

startClock();

setInterval(updateClock, 1000);
