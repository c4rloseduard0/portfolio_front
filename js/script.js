
const linksInternos = document.querySelectorAll('.menu a[href^="#"]');

function scrollToSection(e) {
  e.preventDefault();
  const href = e.currentTarget.getAttribute('href');
  const section = document.querySelector(href)
  // Método scrollIntoView não é suportado por todos os browsers, olhar em: https://developer.mozilla.org/pt-BR/docs/Web/API/Element/scrollIntoView
  section.scrollIntoView({
    behavior: 'smooth',
    block: 'start'
  })
}

linksInternos.forEach((link) => {
  link.addEventListener('click', scrollToSection)
})

const sections = document.querySelectorAll('main section');

function animaTitulo() {
  sections.forEach((section) => {
    const topo = section.getBoundingClientRect().top - window.innerHeight * 0.6;
    if (topo < 0) {
      section.classList.add('ativo')
    } else {
      section.classList.remove('ativo')
    }
  })
}

window.addEventListener('scroll', animaTitulo)

function activeClassMenu() {
  const items = document.querySelectorAll('.menu li a');
  items.forEach((item) => {
    const section = document.querySelector(item.getAttribute('href'))
    
  })
}

window.addEventListener('scroll', activeClassMenu)
