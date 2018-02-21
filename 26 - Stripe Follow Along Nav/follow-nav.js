const FollowNav = (function() {

  //reference vars
  let triggers;
  let background;
  let nav;
  let isMenuBeingUsed;

  function handleEnter() {
    // get the dropdown associated with the mouseenter event
    const dropdown = this.querySelector('.dropdown');

    // start the drop down animation
    this.classList.add('trigger-enter');
    // create a delayed addition of the active class
    setTimeout(() => this.classList.contains('trigger-enter') &&
      this.classList.add('trigger-enter-active'), 150);

    // get reference coords
    const dropdownCoords = dropdown.getBoundingClientRect();
    const navCoords = nav.getBoundingClientRect();

    // calculate the coords of the background
    const coords = {
      height: dropdownCoords.height,
      width: dropdownCoords.width,
      top: dropdownCoords.top - navCoords.top,
      left: dropdownCoords.left - navCoords.left
    };

    // keep track of global menu state
    isMenuBeingUsed = true;

    // // set the postion / size
    // document.documentElement.style.setProperty("--dropdown-left", `${coords.left}px`);
    // document.documentElement.style.setProperty("--dropdown-top", `${coords.top}px`);

    // document.documentElement.style.setProperty("--dropdown-width", `${coords.width}px`);
    // document.documentElement.style.setProperty("--dropdown-height", `${coords.height}px`);

    nav.style.setProperty("--dropdown-left", `${coords.left}px`);
    nav.style.setProperty("--dropdown-top", `${coords.top}px`);

    nav.style.setProperty("--dropdown-width", `${coords.width}px`);
    nav.style.setProperty("--dropdown-height", `${coords.height}px`);

    // create a delayed addition of the open/active classes, allows for instantaneous
    // transition the first time, but then a smooth translation from between the 
    // menu options for the times thereafter.
    setTimeout(() => isMenuBeingUsed && background.classList.add('open', 'active'), 30);

  }

  function handleLeave() {
    // remove the dropdown enter and active classes
    this.classList.remove('trigger-enter', 'trigger-enter-active');

    // keep track of the global menu state
    isMenuBeingUsed = false;
    // remove the active class to hide the background
    setTimeout(() => !isMenuBeingUsed && background.classList.remove('active'), 30);
    // remove the open class to make it so that when mouse re-enters it will just appear 
    // where it needs to without the translation transformation 
    setTimeout(() => !isMenuBeingUsed && background.classList.remove('open'), 200);
  }

  function init(config) {
    config = config || {};
    config.triggerSelector = config.triggerSelector || '.cool > li';
    config.backgroundSelector = config.backgroundSelector || '.dropdownBackground';
    config.navSelector = config.navSelector || '.top';

    triggers = document.querySelectorAll(config.triggerSelector);
    background = document.querySelector(config.backgroundSelector);
    nav = document.querySelector(config.navSelector);

    isMenuBeingUsed = false;


    nav.style.setProperty("--dropdown-left", `0px`);
    nav.style.setProperty("--dropdown-top", `0px`);

    nav.style.setProperty("--dropdown-width", `0px`);
    nav.style.setProperty("--dropdown-height", `0px`);

    triggers.forEach(trigger => {
      trigger.addEventListener('mouseenter', handleEnter);
      trigger.addEventListener('mouseleave', handleLeave);
    });
  }

  return {
    init
  };
}());