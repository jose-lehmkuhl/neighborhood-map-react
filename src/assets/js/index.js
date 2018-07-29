const tabHandler = (e) => { 
    const { keyCode, target } = e;   

    /* handles tabbing on the filter button */
    if(target === document.querySelector('.filter-button')) {
        if (e.shiftKey && keyCode === 9) { //focus page Header on shift tab
            e.preventDefault();
            document.querySelector('h1').focus();
        } else {
            if (keyCode === 9){ //focus show all button on tab
                e.preventDefault()
                document.querySelector('.show-all').focus();
            }
        }
    }
    /* handles tabbing on show all button */ 
    if(target === document.querySelector('.show-all')) {
        if (e.shiftKey && keyCode === 9) {  //focus filter button on shit tab
            e.preventDefault();
            document.querySelector('.filter-button').focus();
        }
    }

    /* Handles tabbing on aside elements , when aside is rendered */
    if(document.querySelector('aside')) {
        if(target === document.querySelector('aside').children[0]) { //checks if first list item is focused
            if (e.shiftKey && keyCode === 9) { //focus last item on shift tab
                e.preventDefault();
                document.querySelector('.close-list-button').focus();
            }
        }
        if(target === document.querySelector('.close-list-button')) {   //checks if last item is focused
            if (!e.shiftKey && keyCode === 9) {
                e.preventDefault();
                document.querySelector('aside').children[0] .focus(); //focus first item on tab
            }
        }
    }


    /* handles tabbing when infowindow is displayed */
    if (target === document.querySelector('.infowindow-link')) { //when infowindow link is focused
        if (!e.shiftKey && keyCode === 9) { //focus hidden close button on tab
            e.preventDefault();
            document.querySelector('.close-info').focus();
        }
    }

    if(target === document.querySelector('.infowindow-header')) { //when infowindow header is focused
        if (e.shiftKey && keyCode === 9) {  // focus hidden close button on shift tab
            e.preventDefault();
            document.querySelector('.close-info').focus();
        }
    } 
    if (target === document.querySelector('.close-info')) { //when close-button is focused
        if (e.shiftKey && keyCode === 9) { //focus infowindow link on shift tab
            e.preventDefault();
            document.querySelector('.infowindow-link').focus();
        }
        if (!e.shiftKey && keyCode === 9) { //focus infowindow header on tab
            e.preventDefault();
            document.querySelector('.infowindow-header').focus();
        }
    }

    /* handes tabbing for hidden element  after selecting a filter */
    if (target === document.querySelector('.pre-info')) { 
        if (keyCode === 9) { //focus infowindow header when tabbing or shift tabbing
            e.preventDefault();
            document.querySelector('.infowindow-header').focus();
        }
    }
}
export { tabHandler };