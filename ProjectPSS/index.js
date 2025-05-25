class Ad {
    constructor(id, title, description, cost, imagePass) {
        this.id = id;
        this.title = title;
        this.description = description;
        this.cost = cost;
        this.imagePass = imagePass;
    }
}

document.addEventListener("DOMContentLoaded", function(){
    load();
});

let isOpen = false;
let ads = [new Ad(1, "Cannondale Trail 5", "Хороший велосипед", 3000, "./images/cube.jpg"),
    new Ad(2, "Gravel", "Хороший велосипед", 2000, "./images/gravel.jpg"),
    new Ad(3, "Городской велосипед", "Прекрасный велосипед", 1254, "./images/city_bike.jpg")
];
let adsInCart = [];

function submitAd() {
    let title = document.getElementById("title").value;
    let description = document.getElementById("description").value;
    let cost = document.getElementById("cost").value.trim();
    let isValid = true;

    document.querySelectorAll(".error").forEach(e => e.style.display = "none");

    if (!title) { document.getElementById("titleError").style.display = "block"; isValid = false; }
    if (!description) { document.getElementById("descError").style.display = "block"; isValid = false; }
    if (!cost || isNaN(cost) || cost <= 0) { document.getElementById("costError").style.display = "block"; isValid = false; }

    if (isValid) {
        id = ads[ads.length - 1].id + 1;
        let newAd = new Ad(id, title, description, cost, "./images/чиловый парень.jpg");
        ads.push(newAd);
        console.log("Объявление добавлено:", newAd);
        alert("Объявление успешно добавлено!");
        load();
    }
}

function openCart(){
    isOpen = !isOpen;
    const cartCont = document.getElementById("cart");
    cartCont.style.display = isOpen ? "block" : "none"; 
    if(isOpen == true){
        cartCont.innerHTML="";
        if(adsInCart.length === 0){
            cartCont.innerHTML=`<p><b>Корзина пуста</b></p>`;
        }
        else{
            let cost = 0;
            adsInCart.forEach(ad => {
                const adDiv = document.createElement("div");
                adDiv.classList.add("cartItem");
                adDiv.id = "cartItem";
                adDiv.innerHTML = `
                <img src="${ad.imagePass}">
                <h3>${ad.title}</h3>
                <p class="cost">${ad.cost}р.</p>
                `;
                cost+= parseInt(ad.cost);
                cartCont.appendChild(adDiv);
                });
            const resCost = document.createElement("div");
            resCost.className = "resultCost";
            resCost.innerHTML = `
            <p><b>Всего:</b></p>
            <p><b>${cost}р.</b></p>
            `;
            cartCont.appendChild(resCost);
        }
    }
    else{
        cartCont = document.getElementById("cart");
        cartCont.innerHTML = "";
    }
}

function addToCart(id){
    flag = false;
    adsInCart.forEach(ad=>{
        if(ad.id == id){
            flag = true;
        }
    });
    if(flag == false){
        adsInCart.push(ads[ads.findIndex(ad => ad.id == id)]);
    }
    console.log(adsInCart);
}

function reg(){
    alert('Вы зарегистрированы!');
}

function auth(){
    // window.location.href = "profile.html";
    alert('Вы авторизованы!');

}

function load(){
    const adsCont = document.getElementById("ads");
    adsCont.innerHTML="";
    ads.forEach(ad => {
        const adDiv = document.createElement("div");
        adDiv.classList.add("ad");
        adDiv.innerHTML = `
        <img src="${ad.imagePass}">
        <h3>${ad.title}</h3>
        <p class="description">${ad.description}</p>
        <div>
            <p class="cost">${ad.cost}р.</p>
            <button onclick="addToCart(${ad.id})">+</button>
        </div>  
        `;
        adsCont.appendChild(adDiv);

    });
    console.log(ads);
}