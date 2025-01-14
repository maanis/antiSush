let url = 'https://newsapi.org/v2/everything?q=keyword&apiKey=6947e50511f340feba0d0b9a0cad0e93'
const refreshBtn = document.querySelector('.refresh')
const dot = document.querySelectorAll('.dot')
const com = document.querySelectorAll('.facomentttt')
const dott = document.querySelectorAll('.dott')
const cancel = document.querySelectorAll('.cancel')
const cont = document.querySelectorAll('.ellipsisContainer')
const comm = document.querySelectorAll('.commentContainer')
const close = document.querySelectorAll('.closeComment')
let inp = document.querySelector('.inputVal')


dot.forEach((elem, id) => {
    elem.addEventListener('click', () => {
        // console.log(cont[id])
        cont[id].style.display = 'flex'
    })
})
cancel.forEach((elem, id) => {
    elem.addEventListener('click', () => {
        // console.log(cont[id])
        cont[id].style.display = 'none'
    })
})

com.forEach((e, id) => {
    console.log(id)
    e.addEventListener('click', () => {
        console.log(e)
        console.log(id)
        comm[id].style.display = 'flex'
    })
})


dott.forEach((elem, id) => {
    elem.addEventListener('click', () => {
        // console.log(cont[id])
        cont[id].style.display = 'flex'
        // console.log(elem)
        // console.log(id)
    })
})

close.forEach((elem, id) => {
    elem.addEventListener('click', () => {
        // console.log(cont[id])
        comm[id].style.display = 'none'
        // console.log(elem)
        // console.log(id)
    })
})



inp.addEventListener('input', () => {
    if (inp.value === '') {
        document.querySelector('.inp-cont').style.display = 'none'
        document.querySelector('.empty').style.display = 'flex'
        document.querySelector('.users').style.display = 'none'
    } else {
        document.querySelector('.inp-cont').style.display = 'block'
        document.querySelector('.empty').style.display = 'none'
        document.querySelector('.users').style.display = 'flex'
    }

    axios.get(`/search/${inp.value}`)
        .then((data) => {
            document.querySelector('.users').innerHTML = ''
            let clutter = ''
            data.data.forEach(e => {
                const buffer = new Uint8Array(e.pfp.data); // Convert the buffer to a typed array
                const base64Image = btoa(
                    buffer.reduce((data, byte) => data + String.fromCharCode(byte), '')
                );
                clutter += `<a href= '/profile/${e._id}' class="flex border-b-[1px] rounded-md p-2 border-zinc-500  cursor-pointer items-center gap-2 ">
                            <img loading='lazy' src='data:image/png;base64,${base64Image}' class="w-10 h-10 object-cover rounded-full" alt="">
                            <div>
                                <h2 class=' font-semibold'>${e.username}</h2>
                                <p class="text-[13px] text-zinc-300">${e.name}</p>
                            </div>
                        </a>`
            })
            document.querySelector('.users').innerHTML = clutter
        })
        
        
})



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


