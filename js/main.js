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
  }
];

const projectGrid = document.getElementById("project-grid");

if (projectGrid) {
  projectGrid.innerHTML = myProjects
    .map(project => {
      const techTags = project.tech
        .map(item => `<span class="tag">${item}</span>`)
        .join("");

      const liveButton = project.live
        ? `<a href="${project.live}" class="btn btn-gold btn-sm" target="_blank" rel="noopener">Live Demo</a>`
        : "";

      return `
        <article class="project-card">
          <div class="project-image">
            <img src="${project.image}" alt="Screenshot of ${project.title}">
          </div>
          <div class="project-body">
            <h3>${project.title}</h3>
            <p>${project.description}</p>
            <div class="tag-list">${techTags}</div>
            <div class="project-links">
              ${liveButton}
              <a href="${project.github}" class="btn btn-outline btn-sm" target="_blank" rel="noopener">GitHub</a>
            </div>
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