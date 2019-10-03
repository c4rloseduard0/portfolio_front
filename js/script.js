
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
    } else if(section.getBoundingClientRect().top > window.innerHeight) {
      section.classList.remove('ativo')
      // document.querySelector(`a[href="#${section.id}"]`).classList.remove('ativo')
    }
  })
}

window.addEventListener('scroll', animaTitulo)

// slide
const wrapper = document.querySelector('#portfolio .conteudo')
const slide = document.querySelector('.slide')
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

const index = {
  prev: 0,
  atual: 0,
  next: 0,
}

function slideIndexNav(i) {
  const last = slideFilhos.length - 1;
  index.prev = i ? i - 1 : undefined
  index.atual = i
  index.next = i === last ? undefined : i + 1
}

function centralizarSlide(el) {
  const margin = (wrapper.offsetWidth - el.offsetWidth) / 2;
  return -(el.offsetLeft - margin)
}

function irProProximo() {
  if(index.next !== undefined) {
    mudaSlide(index.next)
  }
}

function irProAnterior() {
  if(index.prev !== undefined) {
    mudaSlide(index.prev)
  }
}

function updatePosition(clientX) {
  distMove.distancia = ( distMove.posicaoInicial - clientX) * 1.6;
  return distMove.posicaoFinal - distMove.distancia
}

function moveSlide(x) {
  distMove.movePosition = x
  slide.style.transform = `translate3d(${x}px, 0, 0)`
}

function mudaSlide(i) {
  moveSlide(slideFilhos[i].position)
  distMove.posicaoFinal = slideFilhos[i].position
  slideIndexNav(i)
  slideFilhos.forEach((item) => {item.element.classList.remove('ativo')})
  slideFilhos[index.atual].element.classList.add('ativo')
}

function iniciaMouseClick(e) {
  e.preventDefault()
  distMove.posicaoInicial = e.clientX;
  wrapper.addEventListener('mousemove', iniciaMouseMove)
}

function terminaMouseClick() {
  distMove.posicaoFinal = distMove.movePosition;
  if(distMove.distancia > 120 && index.next !== undefined) {
    irProProximo()
  } else if(distMove.distancia < -120 && index.prev !== undefined) {
    irProAnterior()
  } else {
    mudaSlide(index.atual)
  }
  wrapper.removeEventListener('mousemove', iniciaMouseMove)
}

function iniciaMouseMove(e) {
  const posicaoFinal = updatePosition(e.clientX)
  moveSlide(posicaoFinal)
}

function criarControles() {
  const control = document.createElement('ul');
  control.dataset.control = 'slide'
  slideFilhos.forEach((item, i) => {
    control.innerHTML += `<li><a href="#slide${i + 1}">${i + 1}</a></li>`
  })
  wrapper.appendChild(control)
}

const controle = document.querySelectorAll('[data-control="slide"] li')
console.log(controle);

  let contaSlide = 0
  const intervaloMov = setInterval(() => {
    mudaSlide(contaSlide)
    contaSlide++
    if(contaSlide > 5) contaSlide = 0
  }, 2000)
mudaSlide(0)
criarControles()
iniciaMouseMove = iniciaMouseMove.bind(slide)

wrapper.addEventListener('mousedown', iniciaMouseClick.bind(slide))
wrapper.addEventListener('mouseup', terminaMouseClick.bind(slide))
