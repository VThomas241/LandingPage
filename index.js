/* 
    Adding table row nodes from array
*/

const tbody = document.querySelector('tbody')
const tdMenuHTML = `<button aria-controls="action-1" class="action-btn"><i class="fa-solid fa-ellipsis" style="color: #000000;"></i></button>
    <ul id="action-1" class="action-menu">
        <li><button><i class="fa-solid fa-pen-to-square" style="color: #000000;"></i></button></li>
        <li><button><i class="fa-solid fa-trash" style="color: #000000;"></i></button></li>
    </ul>`

const decksArray = ['hello','new','goodbye','soccer','sleep']

decksOut = decksArray.map(el=>{
    let tr = document.createElement('tr')

    td_name = document.createElement('td')
    td_menu = document.createElement('td')

    td_name.textContent = el
    td_menu.classList.add('action-cell')
    td_menu.innerHTML = tdMenuHTML
    
    tr.append(document.createElement('td'))
    tr.append(td_name)
    tr.append(td_menu)

    return tr
})


decksOut.forEach(el=>{
    tbody.append(el)
})


/*
    Adding functionality to decks
*/

const decks = document.querySelectorAll('tbody > tr')
const deckActionMenus = [...decks].map(el=>el.children[2].children[1])


decks.forEach(el=>{

    const elName = el.children[1];
    const elMenu = el.children[2];
    const elMenuBtn = elMenu.children[0];
    const elMenuCtxt = elMenu.children[1];
    const elMenuCtxtEdit = elMenuCtxt.children[0];
    const elMenuCtxtDelete = elMenuCtxt.children[1];

    /* 
        Opening context menu with menu button
    */
    elMenuBtn.addEventListener('click', e=>{
        /* 
            Click event is prevented from propagation 
            to avoid the document event listener
            catching it
        */
        e.stopPropagation()

        /*
            Closing any other open context menus
            before opening th current one
        */
        deckActionMenus.forEach(elMenu=>{
            elMenu.classList.remove('active')
        })
        elMenuCtxt.classList.toggle('active')
    })

    /* 
        Making the name editable on clicking
        the edit button
    */
    elMenuCtxtEdit.addEventListener('click', e=>{
        /* 
            Click event is prevented from propagation 
            to avoid the document event listener
            catching it
        */
        e.stopPropagation()
        elName.setAttribute('contenteditable','')
        
        var range = document.createRange()
        var sel = window.getSelection()
        
        // Setting cursor at the end of deck name
        range.setStart(elName.childNodes[0], elName.innerText.length)
        range.collapse(true)
        
        sel.removeAllRanges()
        sel.addRange(range)

        elName.focus()
    })
    /*
        Making the name uneditable on unfocus
    */
    elName.addEventListener('focusout',e=>{
        elName.setAttribute('contenteditable','false')
    })
    elName.addEventListener('keydown',e=>{
        if (e.key === 'Enter'){
            elName.setAttribute('contenteditable','false')
            elName.blur()
        }
    })

    /* 
        Deleting the deck on clicking the delete button
    */  
    elMenuCtxtDelete.addEventListener('click', e=>{
        /* 
            Click event is prevented from propagation 
            to avoid the document event listener
            catching it
        */
        e.stopPropagation()
        el.remove()
    })


})

document.addEventListener('click', e=>{
    deckActionMenus.forEach(el=>{
        el.classList.remove('active')
    })
})