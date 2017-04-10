
$(document).ready(function() {
  addSlides();
  $(".slide").hide();
  var current_slide = $(".slide").first();
  current_slide.show();
  $(".next-arrow").on("click", nextSlide);
  $(".prev-arrow").on("click", previousSlide);

  // setTimeout(function() {

  // }, 5000);

  function addSlides() {
    for (var i = 1; i <= 12; i++) {
      $(".slide-container").append("<div class='slide'><img src='images/" + i
                                    + ".jpg'></div>")
    };
  };

  function nextSlide() {
    if (current_slide.next().length != 0) {
      current_slide.hide("slide", { direction: "left" }, 1000);
      current_slide = current_slide.next();
      current_slide.show("slide", { direction: "right" }, 1000);
    }
  };

  function previousSlide() {
    if (current_slide.prev().length != 0) {
      current_slide.hide("slide", { direction: "right" }, 1000);
      current_slide = current_slide.prev();
      current_slide.show("slide", { direction: "left" }, 1000);
    }
  };
});