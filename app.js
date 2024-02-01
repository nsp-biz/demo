(async function () {
  const resourcePath = "https://nsp-biz.github.io/demo/resources/";
  let currentStep = 0;

  const res = await fetch("./config.json");
  let options = await res.json();

  options = options.map((el, i) => ({
    ...el,
    imagePath: `${resourcePath}${i}.png`,
  }));

  // ------ DOM ELEMENTS ------

  const nextSlideBtn = document.getElementById("nextSlideBtn");
  const startTourBtn = document.getElementById("startTour");
  const backBtn = document.getElementById("backBtn");

  const image = document.getElementById("demoImage");
  const overlap = document.getElementById("tourOverlap");

  const tooltip = document.getElementById("imageTooltip");
  const title = document.getElementById("imageTitle");

  const fullScreenBtn = document.getElementById("fullScreen");
  const demoConatiner = document.getElementById("demoConatiner");

  // ------ DOM ADJUSTMENTS METHODS ------

  const displayOverlap = (show) => {
    overlap.style.display = show ? "block" : "none";
  };

  const displayNextSlideBtn = (show) => {
    nextSlideBtn.style.display = show ? "block" : "none";
  };

  const showNextSlideBtn = (show) => {
    nextSlideBtn.style.visibility = show ? "visible" : "hidden";
  };

  const showBackBtn = (show) => {
    backBtn.style.visibility = show ? "visible" : "hidden";
  };

  // ------ UTILS ------

  const isNotFullScreenMode = () => {
    return (
      !document.fullscreenElement &&
      !document.mozFullScreenElement &&
      !document.webkitFullscreenElement &&
      !document.msFullscreenElement
    );
  };

  const updateNextStepBtn = (properties) => {
    nextSlideBtn.style.width = properties.width;
    nextSlideBtn.style.height = properties.height;
    nextSlideBtn.style.top = properties.top;
    nextSlideBtn.style.left = properties.left;
  };

  const updateNextStep = () => {
    updateNextStepBtn(options[currentStep]);
    image.src = options[currentStep].imagePath;
    tooltip.innerText = options[currentStep].tooltip;
    title.innerText = options[currentStep].title;
  };

  // ------ HANDLERS ------

  const nextStepHandler = (reset) => {
    if (reset) {
      displayOverlap(true);
      displayNextSlideBtn(false);
      showBackBtn(false);

      currentStep = 0;
    } else {
      showBackBtn(true);
    }

    updateNextStep();
  };

  // ------ EVENTS ------

  backBtn.addEventListener("click", () => {
    currentStep--;
    nextStepHandler(currentStep < 0);
  });

  nextSlideBtn.addEventListener("click", () => {
    currentStep++;

    showNextSlideBtn(false);

    nextStepHandler(currentStep >= options.length);

    setTimeout(() => {
      showNextSlideBtn(true);
    }, 200);
  });

  startTourBtn.addEventListener("click", () => {
    displayOverlap(false);
    displayNextSlideBtn(true);
    showBackBtn(true);
  });

  document.addEventListener("fullscreenchange", () => {
    demoConatiner.classList.toggle("full-screen-mode");
    fullScreenBtn.classList.toggle("expand-icon");
    fullScreenBtn.classList.toggle("collapse-icon");
  });

  fullScreenBtn.addEventListener("click", () => {
    if (isNotFullScreenMode()) {
      demoConatiner.requestFullscreen();
    } else {
      document.exitFullscreen();
    }
  });

  // ------ INIT ------

  nextStepHandler(true);
})();
