
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
  const items = document.querySelectorAll('.menu li a');
  sections.forEach((section) => {
    const topo = section.getBoundingClientRect().top - window.innerHeight * 0.6;
    if (topo < 0) {
      section.classList.add('ativo')
      items.forEach(item => item.classList.remove('ativo'))
      document.querySelector(`a[href="#${section.id}"]`).classList.add('ativo')
    } else {
      section.classList.remove('ativo')
      // document.querySelector(`a[href="#${section.id}"]`).classList.remove('ativo')
    }
  })
}

window.addEventListener('scroll', animaTitulo)

// slide
const wrapper = document.querySelector('#portfolio .conteudo')
const slide = document.querySelector('.slide')
console.log(slide.children);
const distMove = {
  posicaoInicial: 0,
  posicaoFinal: 0,
  distancia: 0,
}
const slideFilhos = [...slide.children].map((element) => {
  const position = centralizarSlide(element)
  return {
    position, element
  }
})

function centralizarSlide(el) {
  const margin = (wrapper.offsetWidth - el.offsetWidth) / 2;
  console.log(wrapper.offsetWidth, el.offsetWidth, el.offsetLeft);

  return -(el.offsetLeft - margin)
}

function updatePosition(clientX) {
  distMove.distancia =( distMove.posicaoInicial - clientX) * 1.6;
  return distMove.posicaoFinal - distMove.distancia
}

function moveSlide(x) {
  distMove.movePosition = x
  slide.style.transform = `translate3d(${x}px, 0, 0)`
}

function mudaSlide(index) {
  moveSlide(slideFilhos[index].position)
}

function iniciaMouseClick(e) {
  e.preventDefault()
  distMove.posicaoInicial = e.clientX;
  wrapper.addEventListener('mousemove', iniciaMouseMove)
}

function terminaMouseClick() {
  distMove.posicaoFinal = distMove.movePosition;
  wrapper.removeEventListener('mousemove', iniciaMouseMove)
}

function iniciaMouseMove(e) {
  const posicaoFinal = updatePosition(e.clientX)
  moveSlide(posicaoFinal)
}

iniciaMouseMove = iniciaMouseMove.bind(slide)

wrapper.addEventListener('mousedown', iniciaMouseClick.bind(slide))
wrapper.addEventListener('mouseup', terminaMouseClick.bind(slide))
