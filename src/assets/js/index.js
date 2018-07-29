const tabHandler = (e) => { 
    const { keyCode, target } = e;   
    if(target === document.querySelector('.filter-button')) {
        if (e.shiftKey && keyCode === 9) {
            e.preventDefault();
            document.querySelector('h1').focus();
        } else {
        if (keyCode === 9){
            e.preventDefault()
            document.querySelector('.show-all').focus();
        }
        }
    }
    if(target === document.querySelector('.show-all')) {
        if (e.shiftKey && keyCode === 9) {
            e.preventDefault();
            document.querySelector('.filter-button').focus();
        }
    }
    if(document.querySelector('aside')) {
        if(target === document.querySelector('aside').children[0]) {
            if (e.shiftKey && keyCode === 9) {
                e.preventDefault();
                document.querySelector('.close-list-button').focus();
            }
        }
        if(target === document.querySelector('.close-list-button')) {
            if (!e.shiftKey && keyCode === 9) {
                e.preventDefault();
                document.querySelector('aside').children[0] .focus();
            }
        }
    }
    if (target === document.querySelector('.infowindow-link')) {
        if (!e.shiftKey && keyCode === 9) {
            e.preventDefault();
            document.querySelector('.close-info').focus();
        }
    }

    if(target === document.querySelector('.infowindow-header')) {
        if (e.shiftKey && keyCode === 9) {
            e.preventDefault();
            document.querySelector('.close-info').focus();
        }
    } 
    if (target === document.querySelector('.close-info')) {
        if (e.shiftKey && keyCode === 9) {
            e.preventDefault();
            document.querySelector('.infowindow-link').focus();
        }
        if (!e.shiftKey && keyCode === 9) {
            e.preventDefault();
            document.querySelector('.infowindow-header').focus();
        }
    }
    if (target === document.querySelector('.pre-info')) {
        if (keyCode === 9) {
            e.preventDefault();
            document.querySelector('.infowindow-header').focus();
        }
    }
}
export { tabHandler };