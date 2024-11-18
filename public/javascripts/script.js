let url = 'https://newsapi.org/v2/everything?q=keyword&apiKey=6947e50511f340feba0d0b9a0cad0e93'
const refreshBtn = document.querySelector('.refresh')
const dot = document.querySelectorAll('.dot')
const cancel = document.querySelectorAll('.cancel')
const cont = document.querySelectorAll('.ellipsisContainer')

dot.forEach((elem, id) => {
    elem.addEventListener('click', () => {
        console.log(cont[id])
        cont[id].style.display = 'flex'
    })
})
cancel.forEach((elem, id) => {
    elem.addEventListener('click', () => {
        console.log(cont[id])
        gsap.to(cont[id], {
            display: 'none',

        })
    })
})

// function hide() {
//     cont.forEach(e => {
//         e.style.display = 'none'
//     })
// }

// async function main() {
//     let res = await fetch(url)
//     let data = await res.json()
//     return data
// }

// refreshBtn.addEventListener('click', async () => {
//     let data = await main()
//     const num = Math.floor(Math.random() * 100) + 1;


//     console.log(data)
//     let elem = document.createElement('a')
//     elem.innerHTML = `<div class="e h-full bg-zinc-800 rounded-md p-2 w-full">
//                     <div class="img h-[45%]">
//                         <img src="${data.articles[num].urlToImage}" class="w-full h-full object-cover" alt="">
//                     </div>
//                     <p class="w-full text-[16px] mt-2">${data.articles[num].content}</p>
//                 </div>`
//     elem.href = data.articles[num].url

//     let article = document.querySelector('.article')
//     article.innerHTML = ''
//     article.appendChild(elem)

// })


