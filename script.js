const hamburger = document.querySelector(".hamburger");
const navigation = document.querySelector(".navigation");
const focusableNavElements = navigation.querySelectorAll("a[href]");

const mq = window.matchMedia("(min-width: 700px)");

function windowResizeSync() {
  const desktopSize = mq.matches;
  if (desktopSize) {
    hamburger.removeAttribute("aria-label");
    navigation.removeAttribute("hidden");
    navigation.classList.remove("open");
    hamburger.removeAttribute("aria-expanded");
  } else {
    hamburger.setAttribute("aria-label", "Open navigation");
    navigation.setAttribute("hidden", "");
    hamburger.setAttribute("aria-expanded", "false");
  }
}

windowResizeSync();

mq.addEventListener("change", windowResizeSync);

//==================================================================
//Hamburger menu click class and attribute toggle
//==================================================================
hamburger.addEventListener("click", function () {
  if (mq.matches) return;
  const isOpen = hamburger.classList.toggle("open");
  if (isOpen) {
    navigation.removeAttribute("hidden");
    hamburger.setAttribute("aria-expanded", "true");
    hamburger.setAttribute("aria-label", "Close navigation");
  } else {
    navigation.setAttribute("hidden", "");
    hamburger.setAttribute("aria-expanded", "false");
    hamburger.setAttribute("aria-label", "Open navigation");
  }
  focusableNavElements[0].focus();
});

//===========================================
//Navigation focus trapping
//===========================================

document.addEventListener("keydown", function (e) {
  if (!hamburger.classList.contains("open")) return;
  if (
    document.activeElement === focusableNavElements[0] &&
    e.key === "Tab" &&
    e.shiftKey
  ) {
    e.preventDefault();
    focusableNavElements[focusableNavElements.length - 1].focus();
  } else if (
    document.activeElement ===
      focusableNavElements[focusableNavElements.length - 1] &&
    e.key === "Tab" &&
    !e.shiftKey
  ) {
    e.preventDefault();
    focusableNavElements[0].focus();
  } else if (e.key === "Escape") {
    hamburger.classList.remove("open");
    hamburger.setAttribute("aria-expanded", "false");
    navigation.setAttribute("hidden", "");
    hamburger.setAttribute("aria-label", "Open navigation");
    hamburger.focus();
  }
});

//===========================================
//Handling animation flicker on screen resize
//===========================================
let resizeTimer;
window.addEventListener("resize", () => {
  document.body.classList.add("resize-animation-stopper");
  clearTimeout(resizeTimer);
  resizeTimer = setTimeout(() => {
    document.body.classList.remove("resize-animation-stopper");
  }, 400);
});
