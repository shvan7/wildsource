const renderCss = (objRss) => {
    document.getElementById('flux-rss').innerHTML += `
    <div class="block-rss">
        <p class="link-rss"><a href="${objRss.link}" target="_blank">${objRss.title}</a></p>
    </div>
    `
}

const sortRss = (obj) => {
    const items = obj.items
    document.getElementById('flux-rss').innerHTML = ""
    items.forEach(e => {
        renderCss(e)
    })
}

export const getRss = () => {
    fetch('http://localhost:3030/route-rss/get-rss')
        .then(res => res.json())
        .then(res => {
            sortRss(res)
        })
}