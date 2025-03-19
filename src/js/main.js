// Initialize AOS (Animate On Scroll)
AOS.init({
    duration: 600,
    delay: 100,
    once: false,
    mirror: false
});

// Animation on scroll
const animatedElements = document.querySelectorAll('.animate-on-scroll');

const options = {
    root: null,
    threshold: 0.1,
    rootMargin: '0px'
};

const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
        }
    });
}, options);

animatedElements.forEach(element => {
    observer.observe(element);
});

/* ========================= */
/* SCROLLING SECTION */
/* ========================= */

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollTop = 0;
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Navbar scroll effect
window.addEventListener('scroll', function() {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.style.background = 'rgba(10, 10, 10, 0.98)';
    } else {
        navbar.style.background = 'rgba(10, 10, 10, 0.95)';
    }
});

document.querySelector('.logo').addEventListener('click', function (e) {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: 'smooth' });
});


/* ========================= */
/* HERO SECTION */
/* ========================= */

// Text scramble effect for hero heading
class TextScramble {
    constructor(el) {
        this.el = el;
        this.chars = '!<>-_\\/[]{}—=+*^?#________';
        this.update = this.update.bind(this);
    }
    setText(newText) {
        const oldText = this.el.innerText;
        const length = Math.max(oldText.length, newText.length);
        const promise = new Promise((resolve) => this.resolve = resolve);
        this.queue = [];
        for (let i = 0; i < length; i++) {
            const from = oldText[i] || '';
            const to = newText[i] || '';
            const start = Math.floor(Math.random() * 40);
            const end = start + Math.floor(Math.random() * 40);
            this.queue.push({ from, to, start, end });
        }
        cancelAnimationFrame(this.frameRequest);
        this.frame = 0;
        this.update();
        return promise;
    }
    update() {
        let output = '';
        let complete = 0;
        for (let i = 0, n = this.queue.length; i < n; i++) {
            let { from, to, start, end, char } = this.queue[i];
            if (this.frame >= end) {
                complete++;
                output += to;
            } else if (this.frame >= start) {
                if (!char || Math.random() < 0.28) {
                    char = this.randomChar();
                    this.queue[i].char = char;
                }
                output += `<span class="text-glitch">${char}</span>`;
            } else {
                output += from;
            }
        }
        this.el.innerHTML = output;
        if (complete === this.queue.length) {
            this.resolve();
        } else {
            this.frameRequest = requestAnimationFrame(this.update);
            this.frame++;
        }
    }
    randomChar() {
        return this.chars[Math.floor(Math.random() * this.chars.length)];
    }
}

// Initialize text scramble effect
const phrases = ['Crafting Digital Excellence', 'Building Future Tech', 'Creating Experiences'];
const el = document.querySelector('.hero-content h1');
const fx = new TextScramble(el);

let counter = 0;
const next = () => {
    fx.setText(phrases[counter]).then(() => {
        setTimeout(next, 3000);
    });
    counter = (counter + 1) % phrases.length;
};

next();

/* ========================= */
/* CONTACT US SECTION */
/* ========================= */

// Form submission handler
document.getElementById('contact-form').addEventListener('submit', function (e) {
    e.preventDefault();

    let formData = new FormData(this);

    fetch('submit-form.php', {
        method: 'POST',
        body: formData
    })
    .then(response => response.json())
    .then(data => {
        alert(data.message);
        document.getElementById('contact-form').reset();

        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    })
    .catch(error => console.error('Error:', error));
});


document.addEventListener("DOMContentLoaded", function () {
    const messageField = document.getElementById("message");
    const charCounter = document.getElementById("char-counter");
    const maxChars = 300;

    messageField.addEventListener("input", function () {
        let charCount = messageField.value.length;

        if (charCount > maxChars) {
            messageField.value = messageField.value.substring(0, maxChars);
            charCount = maxChars;
        }

        charCounter.textContent = `${charCount} / ${maxChars} characters`;

        if (charCount > maxChars - 50) {
            charCounter.classList.add("warning");
        } else {
            charCounter.classList.remove("warning");
        }
    });
});

