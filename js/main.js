const menuToggle = document.getElementById("menu-toggle");
const navLinks = document.getElementById("nav-links");

if (menuToggle && navLinks) {
  menuToggle.addEventListener("click", () => {
    navLinks.classList.toggle("open");
  });

  navLinks.querySelectorAll("a").forEach(link => {
    link.addEventListener("click", () => {
      navLinks.classList.remove("open");
    });
  });
}
const barFills = document.querySelectorAll(".bar-fill");

if (barFills.length > 0) {
  const barObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.width = entry.target.dataset.level + "%";
        barObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.4 });

  barFills.forEach(bar => barObserver.observe(bar));
}
const myProjects = [
  {
    title: "Car Rental Management System",
    description: "A responsive website where customers can browse available cars, view details and make rental bookings.",
    image: "images/car-rental.png",
    tech: ["HTML", "CSS", "JavaScript"],
    github: "https://github.com/Elizabeth-star-tech/car-rental-management-system",
    live: "https://elizabeth-star-tech.github.io/car-rental-management-system/"
  },
  {
    title: "Cafe Website",
    description: "A modern cafe website with a menu, photo gallery and contact section, designed to work on every screen size.",
    image: "images/cafe-website.png",
    tech: ["HTML", "CSS", "JavaScript"],
    github: "https://github.com/Elizabeth-star-tech/cafe-website",
    live: "https://elizabeth-star-tech.github.io/cafe-website/"
  },
  {
    title: "Event Booking Platform",
    description: "A platform where users can explore upcoming events and book their tickets through a simple booking form.",
    image: "images/event-booking.png",
    tech: ["HTML", "CSS", "JavaScript"],
    github: "https://github.com/Elizabeth-star-tech/event-booking-platform",
    live: "https://elizabeth-star-tech.github.io/event-booking-platform/"
  },
  {
    title: "FreelanceHub Marketplace",
    description: "A freelancing marketplace with project listings, freelancer profiles, live search and filters, a proposal form with validation, and a dashboard.",
    image: "images/freelancehub.png",
    tech: ["HTML", "CSS", "JavaScript", "LocalStorage"],
    github: "https://github.com/Elizabeth-star-tech/Freelance-marketing",
    live: "https://elizabeth-star-tech.github.io/Freelance-marketing/"
  },
    {
    title: "ÉLITE EATS",
    description: "A luxury-inspired food delivery website for Nairobi. Browse restaurants and dishes, search and filter by cuisine, rating, delivery time and price, manage a shopping bag with promo codes, and check out with validated delivery details.",
    image: "images/elite-eats.png",
    tech: ["React", "Vite", "JavaScript", "CSS"],
    github: "https://github.com/Elizabeth-star-tech/-LITE-EATS-website",
    live: "https://elizabeth-star-tech.github.io/-LITE-EATS-website/"
  },
  {
    title: "Multi-Vendor Marketplace",
    description: "A marketplace where several vendors list products, and customers can browse, filter and add items to a cart.",
    image: "images/multi-vendor.png",        // TODO: screenshot
    tech: ["HTML", "CSS", "JavaScript"],
    github: "https://github.com/Elizabeth-star-tech/TODO-repo-name",
    live: "https://elizabeth-star-tech.github.io/TODO-repo-name/"
  }
];

const projectGrid = document.getElementById("project-grid");

if (projectGrid) {
  projectGrid.innerHTML = myProjects
    .map((project, index) => {
      const techTags = project.tech
        .map(item => `<span class="tag">${item}</span>`)
        .join("");

      const liveButton = project.live
        ? `<a href="${project.live}" class="btn btn-gold btn-sm" target="_blank" rel="noopener">Live Demo</a>`
        : "";

           const number = String(index + 1).padStart(2, "0");

      return `
        <article class="project-row">
          <span class="project-number">${number}</span>
          <div class="project-info">
            <h3>${project.title}</h3>
            <p>${project.description}</p>
            <div class="tag-list">${techTags}</div>
            <div class="project-links">
              ${liveButton}
              <a href="${project.github}" class="btn btn-outline btn-sm" target="_blank" rel="noopener">GitHub</a>
            </div>
          </div>
          <div class="project-image">
            <img src="${project.image}" alt="Screenshot of ${project.title}">
          </div>
        </article>
      `;
      })
      .join("");
    }
const contactForm = document.getElementById("contact-form");

if (contactForm) {
  const formStatus = document.getElementById("form-status");

  function setFieldError(fieldId, message) {
    const field = document.getElementById(fieldId);
    const error = document.getElementById(fieldId + "-error");
    error.textContent = message;
    field.classList.toggle("invalid", message !== "");
    return message === "";
  }

  contactForm.addEventListener("submit", function (event) {
    event.preventDefault();

    const name = document.getElementById("contact-name").value.trim();
    const email = document.getElementById("contact-email").value.trim();
    const subject = document.getElementById("contact-subject").value.trim();
    const message = document.getElementById("contact-message").value.trim();

    const nameOk = setFieldError(
      "contact-name",
      name.length < 3 ? "Please enter your name (at least 3 characters)." : ""
    );
    const emailOk = setFieldError(
      "contact-email",
      /^\S+@\S+\.\S+$/.test(email) ? "" : "Please enter a valid email address."
    );
    const subjectOk = setFieldError(
      "contact-subject",
      subject.length < 3 ? "Please enter a subject." : ""
    );
    const messageOk = setFieldError(
      "contact-message",
      message.length < 20 ? "Your message must be at least 20 characters." : ""
    );

    if (!(nameOk && emailOk && subjectOk && messageOk)) {
      formStatus.textContent = "";
      return;
    }

    const body = message + "\n\nFrom: " + name + " (" + email + ")";
    const mailtoLink =
      "mailto:nangilae038@gmail.com" +
      "?subject=" + encodeURIComponent(subject) +
      "&body=" + encodeURIComponent(body);

    formStatus.textContent = "Thank you! Opening your email app to send the message...";
    window.location.href = mailtoLink;
    contactForm.reset();
  });
}
// Smooth scrolling (Lenis) wired into GSAP
gsap.registerPlugin(ScrollTrigger);

const lenis = new Lenis();
lenis.on("scroll", ScrollTrigger.update);
gsap.ticker.add((time) => lenis.raf(time * 1000));
gsap.ticker.lagSmoothing(0);
// Hero entrance animation
const heroTl = gsap.timeline({ defaults: { ease: "power4.out" } });

heroTl
  .from(".hero-greeting", { y: 20, opacity: 0, duration: 0.6 })
  .from(".hero-name .word", { yPercent: 110, duration: 1.1, stagger: 0.15 }, "-=0.3")
  .from(".hero-image", { scale: 0.6, opacity: 0, duration: 1 }, "-=0.8")
  .from(".hero-info > *", { y: 30, opacity: 0, duration: 0.8, stagger: 0.12 }, "-=0.5");
  // Section titles: reveal on scroll
document.querySelectorAll(".section-title").forEach((title) => {
  gsap.from(title, {
    yPercent: 60,
    opacity: 0,
    filter: "blur(12px)",
    duration: 1.1,
    ease: "power4.out",
    scrollTrigger: {
      trigger: title,
      start: "top 85%",                       // when the title's top hits 85% down the screen
      onEnter: () => title.classList.add("in-view")
    }
  });
});

// Section content: gentle fade-up
document.querySelectorAll(".section > *:not(.section-title)").forEach((block) => {
  gsap.from(block, {
    y: 60,
    opacity: 0,
    duration: 1,
    ease: "power3.out",
    scrollTrigger: { trigger: block, start: "top 88%" }
  });
});

// Recalculate trigger positions once images have loaded
window.addEventListener("load", () => ScrollTrigger.refresh());
// Flip page to light theme while a [data-theme="light"] section is on screen
document.querySelectorAll('[data-theme="light"]').forEach((section) => {
  ScrollTrigger.create({
    trigger: section,
    start: "top 55%",      // section top reaches just past the middle of the screen
    end: "bottom 55%",     // section bottom leaves the middle of the screen
    onToggle: (self) => document.body.classList.toggle("light", self.isActive)
  });
});
// Closing section reveal
gsap.from(".cta-line", {
  yPercent: 110,
  duration: 1.1,
  stagger: 0.15,
  ease: "power4.out",
  scrollTrigger: { trigger: ".cta", start: "top 75%" }
});

// Nav links scroll smoothly through Lenis
document.querySelectorAll('a[href^="#"]').forEach((link) => {
  link.addEventListener("click", (e) => {
    const target = document.querySelector(link.getAttribute("href"));
    if (target) {
      e.preventDefault();
      lenis.scrollTo(target, { offset: -70 });   // leaves room for the sticky nav bar
    }
  });
});