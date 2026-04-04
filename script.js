document.addEventListener("DOMContentLoaded", function () {
  // ---- Sticky Header (NEW HEADER) ----
const header = document.getElementById("mainHeader");
if (header) {
  window.addEventListener("scroll", function () {
    if (window.scrollY > 80) {
      header.classList.add("header--scrolled");
    } else {
      header.classList.remove("header--scrolled");
    }
  });
}

// ---- Mobile Menu  ----
const hamburger = document.getElementById("hamburger");
const mainNav = document.getElementById("mainNav");

if (hamburger && mainNav) {
  hamburger.addEventListener("click", function () {
    mainNav.classList.toggle("open");
    hamburger.classList.toggle("open");
  });
}

// ---- Mobile dropdown + mega toggle (NEW STRUCTURE) ----
const mobileDropdownItems = document.querySelectorAll(
  ".nav__item--drop, .nav__item--mega"
);

mobileDropdownItems.forEach(function (item) {
  const link = item.querySelector(".nav__link");

  if (link) {
    link.addEventListener("click", function (e) {
      if (window.innerWidth <= 991) {
        e.preventDefault();
        item.classList.toggle("open");
      }
    });
  }
});
 
 

  // ---- Back to Top ----
  const backToTop = document.getElementById("backToTop");
  if (backToTop) {
    window.addEventListener("scroll", function () {
      if (window.scrollY > 400) {
        backToTop.classList.add("visible");
      } else {
        backToTop.classList.remove("visible");
      }
    });
    backToTop.addEventListener("click", function (e) {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  }

  // ---- Testimonials Slider ----
  const slider = document.getElementById("testimSlider");
  if (slider) {
    const items = slider.querySelectorAll(".testimonial-item");
    const dots = document.querySelectorAll(".slider-dots .dot");
    let current = 0;
    let autoplay;

    function showSlide(idx) {
      items.forEach(function (item) {
        item.classList.remove("active");
      });
      dots.forEach(function (dot) {
        dot.classList.remove("active");
      });
      items[idx].classList.add("active");
      dots[idx].classList.add("active");
      current = idx;
    }

    dots.forEach(function (dot) {
      dot.addEventListener("click", function () {
        showSlide(parseInt(this.dataset.idx));
        resetAutoplay();
      });
    });

    function nextSlide() {
      showSlide((current + 1) % items.length);
    }

    function resetAutoplay() {
      clearInterval(autoplay);
      autoplay = setInterval(nextSlide, 4000);
    }

    autoplay = setInterval(nextSlide, 4000);
  }

  // ---- Counter Animation ----
  const counters = document.querySelectorAll(".counter-num");
  if (counters.length > 0) {
    const counterSection = document.querySelector(".counter-section");
    let counted = false;

    function animateCounters() {
      counters.forEach(function (counter) {
        const target = parseInt(counter.dataset.target);
        const duration = 2000;
        const step = target / (duration / 16);
        let current = 0;

        const timer = setInterval(function () {
          current += step;
          if (current >= target) {
            counter.textContent = target + (target >= 100 ? "+" : "");
            clearInterval(timer);
          } else {
            counter.textContent =
              Math.floor(current) + (target >= 100 ? "+" : "");
          }
        }, 16);
      });
    }

    const observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting && !counted) {
            counted = true;
            animateCounters();
          }
        });
      },
      { threshold: 0.3 },
    );

    if (counterSection) observer.observe(counterSection);
  }

  // ---- Course Tabs Filter ----
  const tabBtns = document.querySelectorAll(".tab-btn");
  const courseCards = document.querySelectorAll(".course-card");

  tabBtns.forEach(function (btn) {
    btn.addEventListener("click", function () {
      tabBtns.forEach(function (b) {
        b.classList.remove("active");
      });
      this.classList.add("active");

      const cat = this.dataset.tab;
      courseCards.forEach(function (card) {
        if (cat === "all" || card.dataset.cat === cat) {
          card.style.display = "block";
          card.style.animation = "fadeIn 0.3s ease";
        } else {
          card.style.display = "none";
        }
      });
    });
  });

  // ---- Scroll Animations ----
  const animateEls = document.querySelectorAll(
    ".course-card, .cat-item, .instructor-card, .blog-card, .mission-card",
  );
  const animObserver = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.style.opacity = "1";
          entry.target.style.transform = "translateY(0)";
          animObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.1 },
  );

  animateEls.forEach(function (el) {
    el.style.opacity = "0";
    el.style.transform = "translateY(20px)";
    el.style.transition = "opacity 0.5s ease, transform 0.5s ease";
    animObserver.observe(el);
  });

  // ---- Newsletter Form ----
  const newsletterBtn = document.querySelector(".newsletter-form button");
  if (newsletterBtn) {
    newsletterBtn.addEventListener("click", function () {
      const input = document.querySelector(".newsletter-form input");
      if (input && input.value) {
        alert("Thank you for subscribing! You will receive our latest news.");
        input.value = "";
      } else {
        alert("Please enter a valid email address.");
      }
    });
  }


});

// Hero Slider
document.addEventListener("DOMContentLoaded", function () {
  const slides = document.querySelectorAll(".hero-slide");
  let index = 0;

  function showSlide(i) {
    slides.forEach((s) => s.classList.remove("active"));
    slides[i].classList.add("active");
  }

  document.querySelector(".hero-next").onclick = () => {
    index = (index + 1) % slides.length;
    showSlide(index);
  };

  document.querySelector(".hero-prev").onclick = () => {
    index = (index - 1 + slides.length) % slides.length;
    showSlide(index);
  };

  setInterval(() => {
    index = (index + 1) % slides.length;
    showSlide(index);
  }, 5000);
});

const targetDate = new Date();
targetDate.setDate(targetDate.getDate() + 60); // 60 days from now

function updateCountdown() {
  const now = new Date();
  const diff = targetDate - now;

  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((diff / (1000 * 60)) % 60);
  const seconds = Math.floor((diff / 1000) % 60);

  document.querySelectorAll(".time-box span")[0].innerText = days;
  document.querySelectorAll(".time-box span")[1].innerText = hours;
  document.querySelectorAll(".time-box span")[2].innerText = minutes;
  document.querySelectorAll(".time-box span")[3].innerText = seconds;
}

setInterval(updateCountdown, 1000);
updateCountdown();
