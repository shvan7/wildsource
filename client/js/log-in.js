const logInForm = document.getElementById('log-in-form')
// export document.isSecure = 

const processAuth = (res) => {
	
	const username = res.username
	const admin = res.admin
	const sessionID = res.sessionID

	if (username !== undefined) {
		window.location = `/homepage.html?admin=${admin}&username=${username}`
	}
	else {
		const errorLogin = document.getElementById('error-login')
		const logInForm = document.getElementById('log-in-form')
		logInForm.reset()
		errorLogin.innerHTML = res
	}
}

logInForm.addEventListener('submit', e => {
	e.preventDefault()
	
	const username = document.getElementById('username')
	const password = document.getElementById('password')

	const form = {
		username: username.value,
		password: password.value,
	}

	fetch('http://localhost:3030/route-session/log-in', {
		method: 'post',
		headers: { 'Content-Type': 'application/json' },
		'credentials': 'include',
		body: JSON.stringify(form)
	})
	.then(res => res.json())
	.then(processAuth)
})