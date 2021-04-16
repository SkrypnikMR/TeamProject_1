if (window.location.pathname === "/about.html") {
  var slideContainer = document.querySelector(".slides-container");
  var slide = document.querySelector(".slides");
  var nextBtn = document.getElementById("next-btn");
  var prevBtn = document.getElementById("prev-btn");
  var interval = 5000;
  var slides = document.querySelectorAll(".slide");
  var index = 1;
  var slideId;
  var firstClone = slides[0].cloneNode(true);
  var lastClone = slides[slides.length - 1].cloneNode(true);
  firstClone.id = "first-clone";
  lastClone.id = "last-clone";
  slide.append(firstClone);
  slide.prepend(lastClone);
  /*     const slideWidth = slides[index].clientWidth; */
  slide.style.transform = `translateX(${-800 * index}px)`;
  slideContainer.addEventListener("mouseenter", () => {
    clearInterval(slideId);
  });
  slideContainer.addEventListener("mouseleave", function (event) {
      startSlide(function () {
          moveToNextSlide(slide);
      });
  });
  nextBtn.addEventListener("click", function (event) {
      moveToNextSlide(slide);
  });
  prevBtn.addEventListener("click", function (event) {
      moveToPreviousSlide(slide);
  });
  slide.addEventListener("transitionend", () => {
    slides = getSlides();
    if (slides[index].id === firstClone.id) {
      slide.style.transition = "none";
      index = 1;
      slide.style.transform = `translateX(${-800 * index}px)`;
    }

    if (slides[index].id === lastClone.id) {
      slide.style.transition = "none";
      index = slides.length - 2;
      slide.style.transform = `translateX(${-800 * index}px)`;
    }
  });
    startSlide(function () {
        moveToNextSlide(slide);
    });
}

export function startSlide(func) {
  var interval = 5000;
  slideId = setInterval(() => {
   return func(slide);
  }, interval);
}

export function getSlides() {
  return document.querySelectorAll(".slide");
}

export function moveToNextSlide(element) {
    slides = getSlides();
    if (index >= slides.length - 1) return startSlide();
    index++;
    element.style.transition = ".7s ease-out";
    element.style.transform = `translateX(${-800 * index}px)`;
}

export function moveToPreviousSlide(element) {
  if (index <= 0) return;
  index--;
    element.style.transition = ".7s ease-out";
    element.style.transform = `translateX(${-800 * index}px)`;
}
