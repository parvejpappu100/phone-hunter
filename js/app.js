const loadPhones = (searchText,dataLimit) =>{
    const url = `https://openapi.programming-hero.com/api/phones?search=${searchText}`;
    fetch(url)
    .then(res => res.json())
    .then(data => displayPhones(data.data , dataLimit))
}
const displayPhones = (phones,dataLimit) =>{
    const phonesContainer = document.getElementById("phones-container");
    phonesContainer.innerHTML = "";
    // * To display 9 items:
    const showAll = document.getElementById("show-all");
    if(dataLimit && phones.length > 9){
        phones = phones.slice(0,9);
        showAll.classList.remove("d-none");
    }
    else{
        showAll.classList.add("d-none");
    }
    // * Added no found message on display :
    const noPhones = document.getElementById("no-found-message");
    if (phones.length === 0){
        noPhones.classList.remove("d-none");
    }
    else{
        noPhones.classList.add("d-none");
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
                <button onclick="loadPhoneDetails('${phone.slug}')" href="#" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#phoneDetails">
                    Show Details
                </button>
            </div>
        </div>
        `;
        phonesContainer.appendChild(phoneDive);
    })
    // * Stop loder or spinner:
    toggleSpinner(false);
}

const searchProccess = (dataLimit) =>{
    const searchText = document.getElementById("search-field").value ;
    // * Start loder:
    toggleSpinner(true)
    loadPhones(searchText,dataLimit);
}

const searchPhones = () => {
    searchProccess(9);
}   

// * search input field enter key handler:
document.getElementById('search-field').addEventListener("keypress",function(event){
    if(event.key == "Enter"){
        searchProccess(9);
    }
})

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

// * Not the best way to load show all:
document.getElementById("show-all-btn").addEventListener("click",function(){
    searchProccess();
})

const loadPhoneDetails = (id) =>{
    const url =` https://openapi.programming-hero.com/api/phone/${id}`;
    fetch(url)
    .then(res => res.json())
    .then(data => displayPhoneDetails(data.data))
}

const displayPhoneDetails = (details) => {
    const phoneTitle = document.getElementById("phoneDetailsTitle");
    phoneTitle.innerText = details.name;

    const modalBody = document.getElementById("modal-body");
    modalBody.innerHTML = `
        <div class="d-flex gap-2 align-items-center">
            <div><img src="${details.image}"></div>
            <div>
                <h6>Brand : ${details.brand}</h6>
                <h6>Storage : ${details.mainFeatures.storage}</h6>
                <h6>Display Size : ${details.mainFeatures. displaySize}</h6>
                <h6>Memory : ${details.mainFeatures.memory}</h6>
            </div>
        </div>
    `;
    console.log(details.mainFeatures);
}

loadPhones("phone");