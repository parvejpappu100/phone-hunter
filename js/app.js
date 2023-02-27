const loadPhones = (searchText) =>{
    const url = `https://openapi.programming-hero.com/api/phones?search=${searchText}`;
    fetch(url)
    .then(res => res.json())
    .then(data => displayPhones(data.data))
}
const displayPhones = phones =>{
    const phonesContainer = document.getElementById("phones-container");
    phonesContainer.innerHTML = "";
    // * To display 9 items:
    phones = phones.slice(0,9);
    // * Added no found message:
    const noPhones = document.getElementById("no-found-message");
    const showAllButton = document.getElementById("show-all-phone");
    if (phones.length === 0){
        noPhones.classList.remove("d-none");
        showAllButton.classList.add("d-none");
    }
    else{
        noPhones.classList.add("d-none");
        showAllButton.classList.remove("d-none");
    }
    // * display phones
    phones.forEach(phone =>{
        const phoneDive =document.createElement("div");
        phoneDive.classList.add("col");
        phoneDive.innerHTML =`
        <div class="card h-100">
            <img class="w-50 mx-auto p-2" src="${phone.image}" class="card-img-top" alt="...">
            <div class="card-body">
                <h5 class="card-title">${phone.phone_name}</h5>
                <p class="card-text">This is a longer card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
            </div>
        </div>
        `;
        phonesContainer.appendChild(phoneDive);
    })
    // * Stop loder or spinner:
    toggleSpinner(false);
}


const searchPhones = () => {
    const searchText = document.getElementById("search-field").value ;
    // * Start loder:
    toggleSpinner(true)
    loadPhones(searchText);
}   

// * Set Loder or Spinner:
const toggleSpinner = isLoding =>{
    const loderSection = document.getElementById("loder");
    if(isLoding){
        loderSection.classList.remove("d-none");
    }
    else{
        loderSection.classList.add("d-none");
    }
}

loadPhones("phone");