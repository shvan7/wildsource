import { displayModalUsers } from './modal-users-display.js'
import { displayModal } from './modal-display.js'

export function checkUser() {
    return fetch(`http://localhost:3030/route-session/secure`, {'credentials': 'include',})
    .then(res => res.json())
}
    
export const displayLinkManager = (res) => {

  if (typeof res === 'string') {
    window.location = 'index.html'
    return
  }
  if(res.username) {
    document.getElementById('session-display-name').innerHTML = res.username
    document.isAdminSecure = res.admin === 'true'
    if(res.admin === 'true') {
      document.getElementById('block-link-manage-admin').innerHTML = `
      <a id="link-manage-users" href="#">Manage Users</a>
      `
      // display modal Manage Users
      document.getElementById('link-manage-users').addEventListener('click', displayModalUsers)
    }
  }
}

export const setup = (res) => {
  
  if (res.admin === 'true') {
    const plusBlock = document.getElementById('block-plus')
    plusBlock.addEventListener('click', () => displayModal())
  } else {
    const blockTitleIcon = document.getElementsByClassName('block-title-icon')
    Array.from(blockTitleIcon).forEach(e => {
      e.style.paddingTop = "3%"
      e.style.marginTop = "3%"
    })
  }
}