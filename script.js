/* ==========================================================================
   ALVES BARBEARIA - INTERACTIVE JAVASCRIPT
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  // Elements
  const header = document.getElementById('mainHeader');
  const mobileToggle = document.getElementById('mobileToggle');
  const navMenu = document.getElementById('navMenu');
  const navLinks = document.querySelectorAll('.nav-link');
  const bookingForm = document.getElementById('bookingForm');

  // --- 1. Header Scroll Shrink & Glass Effect ---
  const handleHeaderScroll = () => {
    if (window.scrollY > 40) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  };

  window.addEventListener('scroll', handleHeaderScroll);
  handleHeaderScroll(); // Initial check

  // --- 2. Mobile Menu Toggle ---
  if (mobileToggle && navMenu) {
    mobileToggle.addEventListener('click', () => {
      mobileToggle.classList.toggle('active');
      navMenu.classList.toggle('open');
      document.body.classList.toggle('no-scroll');
    });

    // Close menu when link clicked
    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        mobileToggle.classList.remove('active');
        navMenu.classList.remove('open');
        document.body.classList.remove('no-scroll');
      });
    });
  }

  // --- 3. Active Nav Link on Scroll ---
  const sections = document.querySelectorAll('section[id]');
  
  const highlightNavOnScroll = () => {
    const scrollY = window.pageYOffset;

    sections.forEach(current => {
      const sectionHeight = current.offsetHeight;
      const sectionTop = current.offsetTop - 120;
      const sectionId = current.getAttribute('id');
      const navLink = document.querySelector(`.nav-menu a[href*="#${sectionId}"]`);

      if (navLink) {
        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
          navLink.classList.add('active');
        } else {
          navLink.classList.remove('active');
        }
      }
    });
  };

  window.addEventListener('scroll', highlightNavOnScroll);

  // --- 4. WhatsApp Booking Form Handler ---
  if (bookingForm) {
    bookingForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const name = document.getElementById('clientName').value.trim();
      const phone = document.getElementById('clientPhone').value.trim();
      const service = document.getElementById('clientService').value;
      const date = document.getElementById('clientDate').value;
      const time = document.getElementById('clientTime').value;
      const notes = document.getElementById('clientNotes').value.trim();

      if (!name || !phone || !service) {
        alert('Por favor, preencha nome, telefone e o serviço desejado.');
        return;
      }

      // Format WhatsApp Message
      let message = `Olá, Alves Barbearia! Gostaria de agendar um horário:\n\n`;
      message += `👤 *Nome:* ${name}\n`;
      message += `📱 *Telefone:* ${phone}\n`;
      message += `✂️ *Serviço:* ${service}\n`;
      if (date) message += `📅 *Data:* ${date}\n`;
      if (time) message += `⏰ *Horário:* ${time}\n`;
      if (notes) message += `📝 *Observação:* ${notes}\n`;

      // WhatsApp API Link (Barbearia official phone number)
      const whatsappNumber = '5581984710683';
      const encodedMessage = encodeURIComponent(message);
      const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodedMessage}`;

      // Open WhatsApp in new window
      window.open(whatsappUrl, '_blank');
    });
  }

  // --- 5. Smooth Scroll for Anchor Buttons ---
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;
      
      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        e.preventDefault();
        const headerOffset = 80;
        const elementPosition = targetElement.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
      }
    });
  });
});
