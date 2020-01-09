$(function() {
  let prevIndex = 0;
  let currentIndex = 1;
  let nextIndex = 2;
  let lastIndex = $("#quotes-carousel").find(".quote").length - 1;

  $("#quotes-carousel").on("click", ".previous", showQuote);
  $("#quotes-carousel").on("click", ".next", showQuote);
  $("#quotes-carousel-pips").on("click", ".pip", showFromPip);

  generatePips();
  setLeftClass();

  let carouselRunning = true;
  let carouselRestartTimeout;

  let interval = setInterval(() => {
    if (carouselRunning) {
      showNextQuote();
    }
  }, 4000);

  // Show next quote when carousel is running automatically
  function showNextQuote() {
    if (currentIndex === lastIndex) {
      currentIndex = 0;
    } else {
      currentIndex++;
    }
    updateState(currentIndex);
  }

  // Show quote selected by clicking or tapping
  function showQuote(event) {
    let target;
    if ($(event.target).hasClass("quote")) {
      target = $(event.target);
    } else {
      target = $(event.target).parent();
    }
    const index = $(".quote").index(target);
    updateState(index);

    clearTimeout(carouselRestartTimeout);
    carouselRunning = false;
    carouselRestartTimeout = setTimeout(() => {
      carouselRunning = true;
    }, 10000);
  }

  function updateState(index) {
    prevIndex = index === 0 ? lastIndex : index - 1;
    currentIndex = index;
    nextIndex = index === lastIndex ? 0 : index + 1;

    updateCarouselPosition();
    setLeftClass();
    updatePips();
  }

  function updateCarouselPosition() {
    $("#quotes-carousel")
      .find(".previous")
      .removeClass("previous");
    $("#quotes-carousel")
      .find(".current")
      .removeClass("current");
    $("#quotes-carousel")
      .find(".next")
      .removeClass("next");

    const allQuotes = $("#quotes-carousel").find(".quote");
    $(allQuotes[prevIndex]).addClass("previous");
    $(allQuotes[currentIndex]).addClass("current");
    $(allQuotes[nextIndex]).addClass("next");
  }

  function generatePips() {
    const listContainer = $("#quotes-carousel-pips").find("ul");
    for (let i = lastIndex; i >= 0; i--) {
      let newPip = $('<li class="pip"></li>');
      $(listContainer).append(newPip);
    }
    updatePips();
  }

  function updatePips() {
    $("#quotes-carousel-pips")
      .find(".previous")
      .removeClass("previous");
    $("#quotes-carousel-pips")
      .find(".current")
      .removeClass("current");
    $("#quotes-carousel-pips")
      .find(".next")
      .removeClass("next");
    const allPips = $("#quotes-carousel-pips").find(".pip");
    $(allPips[prevIndex]).addClass("previous");
    $(allPips[currentIndex]).addClass("current");
    $(allPips[nextIndex]).addClass("next");
  }

  function showFromPip(event) {
    const index = $("#quotes-carousel-pips li").index(event.target);
    updateState(index);
  }

  function setLeftClass() {
    const allQuotes = $("#quotes-carousel").find(".quote");
    $(".quote.left").removeClass("left");
    let index;
    if (prevIndex > 0) {
      index = prevIndex - 1;
      $(allQuotes[index]).addClass("left");
    } else {
      $(allQuotes[lastIndex]).addClass("left");
    }
  }

  document.addEventListener("visibilitychange", () => {
    if (document.hidden) {
      carouselRunning = false;
    } else {
      carouselRunning = true;
    }
  });
});
