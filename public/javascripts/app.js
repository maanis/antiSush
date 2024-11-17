const tl = gsap.timeline()
const post = document.querySelectorAll('.createPost')
console.log(post)
post.forEach(e => {
    e.addEventListener('click', () => {
        tl.to('.postSmt', {
            display: 'flex',
            opacity: 1,
            duration: .2
        }).to('.postContainer', {
            scale: 1,
            duration: .3
        })
    })
})

document.querySelector('.fa-xmark').addEventListener('click', () => {
    gsap.to('.postContainer', {
        scale: 0,
    })
    gsap.to('.postSmt', {
        opacity: 0,
        display: 'none'
    })
})