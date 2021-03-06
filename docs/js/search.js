let searchArray = [];
let results = [];

init();                                                         // this function initializes all the values
let find = document.getElementById('header-buttons-search');
let searchResults = document.getElementById('searchResults');
let searchCross = document.getElementById('searchCross');
const isMoz = navigator.userAgent.indexOf("Firefox");
find.addEventListener("keyup",(event)=>{
    if(find.value.length > 0){
        showSearchResults();
        showSearchCross();
        removeSearchResults();
        search(find.value);
        if(event.keyCode == 13){
            find.blur();
        }
    }else{
        hideSearchResults();
        hideSearchCross();
    }
})

find.addEventListener("search", (event)=>{
    if(event.type === "search"){
        hideSearchResults();
    }
})

const showSearchResults = ()=>{
    searchResults.style.display = "block";
    const body = document.body;
    body.style.overflowY = 'hidden';
}

const hideSearchResults = ()=>{
    searchResults.style.display = "none";
    const body = document.body;
    body.style.overflowY = 'scroll';
}

const search = (searchString)=>{
    let index = searchString.length;
    results = [];
    switch(searchString){
        case "*":
            results = searchArray;
            break;
        default:
            for(let i=0;i<searchArray.length;i++){
                if(searchArray[i].toUpperCase().includes(searchString.toUpperCase())){
                    results.push(searchArray[i]);
                }
            }
            break;
    }
    // handling dynamic length
    if(results.length==0){                  // if no records come hide the results tab
        hideSearchResults();
    }
    else if(results.length > 5){
        searchResults.style.height="250px";
    }else{
        searchResults.style.height="";
    }
    render(results);
}

const render = (results)=>{
    // root - searchResults
    for(let i=0;i<results.length;i++){
        let div = document.createElement("div");
        div.setAttribute("class","searchResultsDiv");
        div.addEventListener('click',()=>{
            hideSearchResults();
            clearSearchField();
            hideSearchCross();
        });

        let a = document.createElement("a");
        let link = createPageLink(results[i]);
        a.setAttribute("href", link);
        a.setAttribute("class","searchResults-a");

        let text = document.createTextNode(results[i]);
        a.appendChild(text);
        
        div.appendChild(a);
        searchResults.appendChild(div);
    }
}

// this function will remove all the nodes from search results
const removeSearchResults = ()=>{
    let child = searchResults.lastElementChild;
    while(child){
        searchResults.removeChild(child);
        child = searchResults.lastElementChild;
    }
}

// this function creates the valid page link
const createPageLink = (result)=>{
    let link = "#";
    result = result.split(" ").join("-");
    link = link+result.toLowerCase()+"-hr";
    return link;
}

// this function clears the data of search field
const clearSearchField = ()=>{
    find.value = "";
}

const showSearchCross = ()=>{
    if(isMoz != -1){
        searchCross.style.display = "inline";
    }
}

const hideSearchCross = ()=>{
    if(isMoz != -1){
        searchCross.style.display = "none";
    }
}

searchCross.addEventListener('click', ()=>{
    hideSearchResults();
    clearSearchField();
    hideSearchCross();
})