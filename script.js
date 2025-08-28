document.addEventListener('DOMContentLoaded', function() {
  const links = document.querySelectorAll('.links a');
  const sections = [
    document.getElementById('home'),
    document.getElementById('about'),
    document.getElementById('skills'),
    document.getElementById('project'),
    document.getElementById('service'),
    document.getElementById('contact'),
    document.getElementById('loginForm'),
    document.getElementById('registerForm')
  ].filter(Boolean);

  function showOnlySection(sectionId) {
    sections.forEach(sec => {
      if (sec.id === sectionId) {
        sec.classList.remove('hidden');
      } else {
        sec.classList.add('hidden');
      }
    });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  function showAllSections() {
    sections.forEach(sec => sec.classList.remove('hidden'));
  }

  links.forEach(link => {
    link.addEventListener('click', function(e) {
      const href = this.getAttribute('href');
      if (href && href.startsWith('#')) {
        e.preventDefault();
        const sectionId = href.replace('#', '');
        if (sectionId === 'home') {
          showAllSections();
        } else {
          showOnlySection(sectionId);
        }
      }
    });
  });

  // On page load, show all sections
  showAllSections();

  // Project card entrance animation: first card slides in left, others bottom
  function animateProjectCards() {
    const cards = document.querySelectorAll('.project-card');
    if (!cards.length) return;
    // Remove any previous animation classes
    cards.forEach(card => {
      card.classList.remove('slide-in-left', 'slide-in-bottom');
    });
    // Animate first card from left, others from bottom
    if (cards[0]) {
      cards[0].classList.add('slide-in-left');
    }
    for (let i = 1; i < cards.length; i++) {
      cards[i].classList.add('slide-in-bottom');
    }
  }

  // Animate when project section is in view
  function onProjectSectionInView() {
    const projectSection = document.getElementById('project');
    if (!projectSection) return;
    const rect = projectSection.getBoundingClientRect();
    if (rect.top < window.innerHeight - 100) {
      animateProjectCards();
      window.removeEventListener('scroll', onProjectSectionInView);
    }
  }

  // Run on DOMContentLoaded and on scroll
  window.addEventListener('DOMContentLoaded', function() {
    onProjectSectionInView();
    window.addEventListener('scroll', onProjectSectionInView);
  });
});
