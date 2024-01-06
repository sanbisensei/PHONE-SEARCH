const loadPhone = async (searchPhone) => {
    const res = await fetch(`https://openapi.programming-hero.com/api/phones?search=${searchPhone}`)
    const data = await res.json();
    const phones = data.data
    
    displayPhones(phones);
}

const displayPhones = phones =>{
    
        // 1. get element by id
    const phoneContainer = document.getElementById('phone-container');

    // clear phone container cards before adding new cards
    phoneContainer.textContent = '';

    phones.forEach(phone => {
        
        // 2. create a div
        const phoneCard = document.createElement('div');

        phoneCard.classList = `card  bg-base-400 p-4 shadow-xl`;

        // 3. set innerHTML
        phoneCard.innerHTML = `
    <figure><img src="${phone.image}" alt="Shoes" /></figure>
                <div class="card-body flex justify-center items-center">
                    <h2 class="card-title text-2xl">${phone.phone_name}</h2>
                    
                    <div class="card-actions justify-end">
                    <button onclick="handleShowDetail('${phone.slug}')" class="btn btn-outline">Show details</button></button>
                    </div>
                </div>
        `;
        // 4. append child
        phoneContainer.appendChild(phoneCard);
    });

    //hide loading spinner
    toggleLoader(false);

}

// 
const handleShowDetail = async (id) =>{
    //load single phone data
    const res = await fetch(`https://openapi.programming-hero.com/api/phone/${id}`);
    const data = await res.json();
    const phone = data.data;

    showPhoneDetails(phone)
} 


const showPhoneDetails = (phone) =>{
    console.log(phone);
    const phoneName = document.getElementById('show-detail-phone-name');

    phoneName.innerText = phone.name;


    const showDetailContainer = document.getElementById('show-detail-container');

    showDetailContainer.innerHTML = `
    <img src="${phone.image}" />
    <p><span>Storage:</span>${phone.mainFeatures.storage} </p>
    
    `



    //show the modal
    show_details_modal.showModal();
}



//handle search button

const handleSearch  = () =>{
    
    toggleLoader(true)

    const searchField = document.getElementById('searchField');

    const searchText = searchField.value;

    loadPhone(searchText)

}

//loading spinner
const toggleLoader = (isLoading) => {
    const loader = document.getElementById('loader');
    if(isLoading){
        loader.classList.remove('hidden')
    }
    else{
        loader.classList.add('hidden');
    }
}


