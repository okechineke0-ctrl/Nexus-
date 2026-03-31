document.addEventListener('DOMContentLoaded', () => {

  // Password Toggle
  const togglePasswordBtn = document.getElementById('togglePassword');
  if (togglePasswordBtn) {
    const passwordInput = document.getElementById('password');
    const eyeIcon = document.getElementById('eyeIcon');

    togglePasswordBtn.addEventListener('click', () => {
      if (passwordInput.type === 'password') {
        passwordInput.type = 'text';
        eyeIcon.classList.remove('fa-eye');
        eyeIcon.classList.add('fa-eye-slash');
      } else {
        passwordInput.type = 'password';
        eyeIcon.classList.remove('fa-eye-slash');
        eyeIcon.classList.add('fa-eye');
      }
    });
  }

  // LOGIN FORM
  const loginForm = document.getElementById('loginForm');
  if (loginForm) {
    loginForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const email = document.getElementById('email').value.trim();
      const password = document.getElementById('password').value.trim();

      if (!email || !password) {
        alert("Please enter email and password");
        return;
      }

      const btnText = document.getElementById('btnText');
      const btnSpinner = document.getElementById('btnSpinner');
      if (btnText) btnText.classList.add('hidden');
      if (btnSpinner) btnSpinner.classList.remove('hidden');

      setTimeout(() => {
        const storedEmail = localStorage.getItem('userEmail');
        const storedPassword = localStorage.getItem('userPassword');

        if (email === storedEmail && password === storedPassword) {
          localStorage.setItem('isLoggedIn', 'true');
          alert(`✅ Login successful!\nWelcome back, ${email.split('@')[0]}!`);
          window.location.href = "home.html";
        } else {
          alert("❌ Invalid email or password. Please try again.");
          if (btnText) btnText.classList.remove('hidden');
          if (btnSpinner) btnSpinner.classList.add('hidden');
        }
      }, 1400);
    });
  }

  // REGISTER FORM
  const registerForm = document.getElementById('registerForm');
  if (registerForm) {
    registerForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const firstName = document.getElementById('firstName')?.value.trim();
      const email = document.getElementById('email').value.trim();
      const password = document.getElementById('password').value.trim();

      if (!firstName || !email || !password) {
        alert("Please fill in all fields");
        return;
      }

      const btnText = document.getElementById('btnText');
      const btnSpinner = document.getElementById('btnSpinner');
      if (btnText) btnText.classList.add('hidden');
      if (btnSpinner) btnSpinner.classList.remove('hidden');

      setTimeout(() => {
        localStorage.setItem('isLoggedIn', 'true');
        localStorage.setItem('userEmail', email);
        localStorage.setItem('userPassword', password);
        localStorage.setItem('userName', firstName);

        alert(`✅ Account created successfully!\nWelcome, ${firstName}!`);
        window.location.href = "home.html";
      }, 1600);
    });
  }

  // SSO Handler
  window.handleSSO = function(provider) {
    alert(`🔄 Redirecting to ${provider} sign-in...`);

    setTimeout(() => {
      localStorage.setItem('isLoggedIn', 'true');
      localStorage.setItem('userEmail', `user@${provider.toLowerCase()}.com`);
      localStorage.setItem('userPassword', 'demo123');
      localStorage.setItem('userName', provider + " User");
      window.location.href = "home.html";
    }, 1200);
  };

  // Home Page Protection
  if (window.location.pathname.includes('home.html') || 
      window.location.pathname.endsWith('/') || 
      window.location.pathname.endsWith('index.html')) {
    
    const isLoggedIn = localStorage.getItem('isLoggedIn');
    if (!isLoggedIn) {
      window.location.href = "register.html";
      return;
    }
  }

  // Logout
  window.logout = function() {
    if (confirm("Are you sure you want to logout?")) {
      localStorage.clear();
      window.location.href = "index.html";
    }
  };

  // Mobile Menu
  const mobileMenuBtn = document.getElementById('mobileMenuBtn');
  const mobileMenu = document.getElementById('mobileMenu');
  const closeMenuBtn = document.getElementById('closeMenuBtn');

  if (mobileMenuBtn && mobileMenu) {
    mobileMenuBtn.addEventListener('click', () => {
      mobileMenu.classList.remove('hidden');
      mobileMenu.classList.add('flex');
    });
  }

  if (closeMenuBtn && mobileMenu) {
    closeMenuBtn.addEventListener('click', () => {
      mobileMenu.classList.add('hidden');
      mobileMenu.classList.remove('flex');
    });
  }

  document.querySelectorAll('#mobileMenu a').forEach(link => {
    link.addEventListener('click', () => {
      if (mobileMenu) {
        mobileMenu.classList.add('hidden');
        mobileMenu.classList.remove('flex');
      }
    });
  });

  // Hero Slider
  const sliderTrack = document.getElementById('sliderTrack');
  if (sliderTrack) {
    let currentSlide = 0;
    const totalSlides = 3;
    const dots = document.querySelectorAll('.slider-dot');

    const slideContents = [
      { title: "Reliable Global Logistics,<br>Delivered with Precision", subtitle: "From ocean freight to express delivery — we move your business forward with speed, security, and unmatched reliability." },
      { title: "Sustainable Shipping.<br>Smarter Supply Chains.", subtitle: "Carbon tracking, green routing, and responsible logistics solutions." },
      { title: "Real-Time Visibility.<br>Zero Surprises.", subtitle: "Advanced tracking platform with predictive alerts and full transparency." }
    ];

    function showSlide(n) {
      sliderTrack.style.transform = `translateX(-${n * 100}%)`;
      dots.forEach((dot, i) => dot.classList.toggle('active', i === n));

      const contentDiv = document.getElementById('slideContent');
      contentDiv.style.opacity = '0';

      setTimeout(() => {
        contentDiv.innerHTML = `
          <h1 class="heading-font text-5xl md:text-6xl font-bold leading-tight mb-6">
            ${slideContents[n].title}
          </h1>
          <p class="text-zinc-300 text-lg md:text-xl mb-10">
            ${slideContents[n].subtitle}
          </p>
          <div class="flex flex-col sm:flex-row gap-4">
            <a href="#" onclick="quickTrack()" class="bg-white text-zinc-900 font-semibold px-9 py-4 rounded-2xl flex items-center justify-center gap-3 hover:bg-zinc-100 transition">
              <i class="fa-solid fa-magnifying-glass"></i> Track Shipment
            </a>
            <a href="register.html" class="border border-white/70 hover:bg-white/10 font-semibold px-9 py-4 rounded-2xl flex items-center justify-center gap-3 transition">
              Start Shipping Now <i class="fa-solid fa-arrow-right"></i>
            </a>
          </div>
        `;
        contentDiv.style.opacity = '1';
      }, 300);

      currentSlide = n;
    }

    window.nextSlide = () => showSlide((currentSlide + 1) % totalSlides);
    window.prevSlide = () => showSlide((currentSlide - 1 + totalSlides) % totalSlides);
    window.goToSlide = (n) => showSlide(n);

    setInterval(() => nextSlide(), 6500);
    showSlide(0);
  }

  // Animated Counters
  function animateCounter(id, target, suffix = '', duration = 2000) {
    let start = 0;
    const increment = target / (duration / 16);
    const element = document.getElementById(id);

    const timer = setInterval(() => {
      start += increment;
      if (start >= target) {
        element.textContent = target + suffix;
        clearInterval(timer);
      } else {
        element.textContent = Math.floor(start) + (suffix.includes('%') ? '' : '');
      }
    }, 16);
  }

  const statsObserver = new IntersectionObserver((entries) => {
    if (entries[0].isIntersecting) {
      animateCounter('onTime', 98.7, '%');
      animateCounter('countries', 200, '+');
      animateCounter('shipments', 1.2, 'M');
      animateCounter('support', 24);
      statsObserver.disconnect();
    }
  }, { threshold: 0.6 });

  const statsSection = document.querySelector('.grid.grid-cols-2');
  if (statsSection) statsObserver.observe(statsSection);

  // Quick Track
  window.quickTrack = function() {
    const input = document.getElementById('trackInput')?.value.trim() || "NFX-987654321";
    alert(`Tracking ${input}\n\nStatus: In Transit\nLocation: Lagos Port → Port Harcourt\nETA: April 5, 2026`);
  };

  // Testimonials
  if (document.getElementById('testimonialSlider')) {
    const testimonials = [
      { text: "Nexus Freight has transformed our supply chain.", name: "Aisha Okoro", role: "Supply Chain Director" },
      { text: "Excellent service and real-time visibility.", name: "Emmanuel Adebayo", role: "Logistics Manager" }
    ];

    let tIndex = 0;
    const container = document.getElementById('testimonialSlider');

    function showTestimonial() {
      container.innerHTML = `
        <div class="text-center">
          <p class="text-2xl italic text-zinc-300 mb-8">"${testimonials[tIndex].text}"</p>
          <div class="font-semibold">${testimonials[tIndex].name}</div>
          <div class="text-sm text-zinc-400">${testimonials[tIndex].role}</div>
        </div>
      `;
      tIndex = (tIndex + 1) % testimonials.length;
    }

    setInterval(showTestimonial, 7000);
    showTestimonial();
  }

});