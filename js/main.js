
$(document).ready(function() {
  var numberSlides = 12;
  init();
  var currentSlide = $(".slide").first();
  var currentCircle = $(".circle").first();
  currentCircle.addClass("active-circle");
  currentSlide.show();
  $(".next-arrow").on("click", nextSlide);
  $(".prev-arrow").on("click", previousSlide);
  clickCircle();
  defaultAdvance();


  /* Function definitions */

  function init() {
    addSlides();
    addCircles();
    $(".slide").hide();
  }

  function addSlides() {
    for (var i = 1; i <= numberSlides; i++) {
      $(".slide-container").append("<div class='slide'><img src='images/" + i
                                    + ".jpg'></div>")
    }
  };

  function addCircles() {
    for (var i = 1; i <= numberSlides; i++) {
      $(".circles").append("<div class='circle'>" + i + "</div>");
    }
  };

  function nextSlide() {
    if (currentSlide.next().length != 0) {
      currentSlide.hide("slide", { direction: "left" }, 1000);
      currentCircle.removeClass("active-circle");
      currentSlide = currentSlide.next();
      currentCircle = currentCircle.next();
      currentCircle.addClass("active-circle");
      currentSlide.show("slide", { direction: "right" }, 1000);
    }
  };

  function previousSlide() {
    if (currentSlide.prev().length != 0) {
      currentSlide.hide("slide", { direction: "right" }, 1000);
      currentCircle.removeClass("active-circle");
      currentSlide = currentSlide.prev();
      currentCircle = currentCircle.prev();
      currentCircle.addClass("active-circle");
      currentSlide.show("slide", { direction: "left" }, 1000);
    }
  };

  function clickCircle() {
    $(".circle").on("click", function() {
      var prevSlideNumber = parseInt(currentCircle.text());
      currentCircle.removeClass("active-circle");
      currentCircle = $(this);
      currentCircle.addClass("active-circle");
      var currentSlideNumber = parseInt(currentCircle.text())
      var slideNumberDiff = currentSlideNumber - prevSlideNumber;
      if (slideNumberDiff > 0) {
        currentSlide.hide("slide", { direction: "left" }, 1000);
        currentSlide = $(".slide:nth-child(" + currentSlideNumber + ")")  
        currentSlide.show("slide", { direction: "right" }, 1000);
      }
      else {
        currentSlide.hide("slide", { direction: "right" }, 1000);
        currentSlide = $(".slide:nth-child(" + currentSlideNumber + ")")
        currentSlide.show("slide", { direction: "left" }, 1000);
      }
    });
  };

  function defaultAdvance() {
    setTimeout(function() {
      nextSlide();
      defaultAdvance();
    }, 5000);
  }
});