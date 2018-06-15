import { handleSubmit, render, formElement } from './modal-processing.js'
import { getRss } from './rss-get.js'
import { checkUser } from './secure.js'

const btnLogOut = document.getElementById('log-out-wild-source')

// simule admin behavior
const qs = new URLSearchParams(window.location.search)
document.isAdmin = qs.get('admin') === 'true'

const logOutWildSource = () => {
  fetch('http://localhost:3030/route-session/log-out', {'credentials': 'include',})
  .then(window.location = 'index.html')
}

btnLogOut.addEventListener('click', logOutWildSource)

// fetch module on get
const getModules = () => {
  return fetch('http://localhost:3030/route-module/blocks')
    .then(response => response.json())
}

// after DOM load => get module
window.addEventListener("DOMContentLoaded", () => {
  getModules().then(blocks => {
    checkUser().then(res => render(blocks, res))
  })
})
// when submit form
formElement.addEventListener('submit', handleSubmit)

const sizeFluxRss = () => {
  const blockPersonalHeight = document.getElementById('block-personal').offsetHeight
  const headerWildSource = document.getElementById('header-wild-source').offsetHeight
  const blockRss = document.getElementById('flux-rss')
  blockRss.style.height = (window.innerHeight - blockPersonalHeight - headerWildSource) + "px"
}

window.onload = sizeFluxRss()
getRss()