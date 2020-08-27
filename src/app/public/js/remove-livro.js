let tabelaLivros = document.querySelector("#livros")
tabelaLivros.addEventListener('click', (ev)=>{
    let clickedElement = ev.target

    if(clickedElement.dataset.type == 'remocao'){
        let livroId = clickedElement.dataset.ref
        fetch(`http://localhost:3000/livros/${livroId}`, {method: 'DELETE'})
        .then(resp =>{
            let tr = clickedElement.closest(`#livro_${livroId}`)
            tr.remove()
        })
        .catch(err => console.log(err))
    }
})