
$(document).ready(function() {
  var numberSlides = 12;
  init();
  var currentSlide = $(".slide").first();
  var currentCircle = $(".circle").first();
  currentCircle.addClass("active-circle");
  currentSlide.show();
  defaultAdvance();
  userInput();

  /* Function definitions */

  function userInput() {
    clickCircle();
    $(".next-arrow").on("click", nextSlide);
    $(".prev-arrow").on("click", previousSlide);
    $(".prev-arrow").hover(function() {
      previewShow("prev");
    }, previewHide)
    $(".next-arrow").hover(function() {
      previewShow("next");
    }, previewHide)
  };

  function init() {
    addSlides();
    addCircles();
    $(".slide").hide();
  }

  function addSlides() {
    for (var i = 1; i <= numberSlides; i++) {
      $(".slide-container").append("<div class='slide'><img src='images/" + i
                                    + ".jpg'><p>" + i + "</p></div>")
    }
  };

  function addCircles() {
    for (var i = 1; i <= numberSlides; i++) {
      $(".circles").append("<div class='circle'>" + i + "</div>");
    }
  };

  function nextSlide() {
    currentSlide.hide("slide", { direction: "left" }, 1000);
    currentCircle.removeClass("active-circle");
    if (currentSlide.next().length != 0) {
      currentSlide = currentSlide.next();
      currentCircle = currentCircle.next();
    }
    else {
      currentSlide = $(".slide:first-child");
      currentCircle = $(".circle:first-child");
    }
    currentCircle.addClass("active-circle");
    currentSlide.show("slide", { direction: "right" }, 1000);
  };

  function previousSlide() {
    currentSlide.hide("slide", { direction: "right" }, 1000);
    currentCircle.removeClass("active-circle");
    if (currentSlide.prev().length != 0) {
      currentSlide = currentSlide.prev();
      currentCircle = currentCircle.prev();
    }
    else { 
      currentSlide = $(".slide:last-child");
      currentCircle = $(".circle:last-child");
    }
    currentCircle.addClass("active-circle");
    currentSlide.show("slide", { direction: "left" }, 1000);
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

  function newSlideNumber(type, slideNumber) {
    if (type === "prev") {
      return (slideNumber === 1) ? 12 : slideNumber - 1
    }
    else {
      return (slideNumber === 12) ? 1 : slideNumber + 1
    }
  };

  function previewShow(type) {
    var slideNumber = parseInt(currentSlide.find("p").text());
    var prevSlideNumber = newSlideNumber(type, slideNumber)
    $("<div class='preview-slide'><img src='images/" + prevSlideNumber 
       + ".jpg'></div>").appendTo(".preview").hide().fadeIn(500);
    if (type === "prev") {
      $(".preview-slide").addClass("prev-preview-slide");
    } else {
      $(".preview-slide").addClass("next-preview-slide");
    }
  };

  function previewHide() {
    $(".preview-slide").fadeOut(500, function() {
        $(this).remove()
    });
  };

  function defaultAdvance() {
    setTimeout(function() {
      nextSlide();
      defaultAdvance();
    }, 5000);
  }

});