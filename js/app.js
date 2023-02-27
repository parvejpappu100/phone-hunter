const loadPhones = (searchText) =>{
    const url = `https://openapi.programming-hero.com/api/phones?search=${searchText}`;
    fetch(url)
    .then(res => res.json())
    .then(data => displayPhones(data.data))
}

const displayPhones = phones =>{
    const phonesContainer = document.getElementById("phones-container");
    phonesContainer.innerHTML = "";
    phones.forEach(phone =>{
        const phoneDive =document.createElement("div");
        phoneDive.classList.add("col");
        phoneDive.innerHTML =`
        <div class="card h-100">
            <img src="${phone.image}" class="card-img-top" alt="...">
            <div class="card-body">
                <h5 class="card-title">${phone.phone_name}</h5>
                <p class="card-text">This is a longer card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
            </div>
        </div>
        `;
        phonesContainer.appendChild(phoneDive);
    })
}


const searchPhones = () => {
    const searchText = document.getElementById("search-field").value ;
    loadPhones(searchText);
}   

loadPhones("phone");