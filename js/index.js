const urlAll = 'https://fakestoreapi.com/products'
const jeweleryUrl = 'https://fakestoreapi.com/products/category/jewelery'
const electronicUrl = 'https://fakestoreapi.com/products/category/electronics'
const womensUrl = `https://fakestoreapi.com/products/category/women's clothing`
const mensurl = `https://fakestoreapi.com/products/category/men's clothing`
let offcanvas = document.querySelector(".offcanvas-box")
let offcanvasBody = document.querySelector(".canvas-box-body")
let seeAll = document.querySelectorAll(".see-all")
let offcanvasCloseBtn = document.querySelector(".close-btn")
let cartCounter = document.querySelector("#cart-item-counter")
let reacteditem = document.querySelector("#reacted-item")
let boughtItem = document.querySelector(".buy")
let main = document.querySelector("main")

async function loadData(url) {
    const res = await fetch(url)
    const data = await res.json()

    return data;
}
offcanvasCloseBtn.addEventListener("click", function (e) {
    e.target.parentNode.style.display = "none"
})

function showCart() {
    offcanvas.style.display = "block"
}

function goBack() {
    location.reload()
}

function getCart() {
    let cart = localStorage.getItem("cart")
    let cartObj;
    if (cart) {
        cartObj = JSON.parse(cart)
    } else {
        cartObj = {};
    }
    return cartObj;
}


function displayItemFromCart() {
    const cart = getCart()
    let items = Object.keys(cart)
    items.forEach((item) => {
        let parsedItem = JSON.parse(item)
        displayAddItem(parsedItem.imgSrc, parsedItem.name, offcanvasBody)
        itemCounter(cartCounter);
    })
}
displayItemFromCart()
const Converter = input => parseInt(input);
let counter = 1;

function addremove(price, tax, deliveryCharge, total, itemNum, isIncrease) {
    let priceValue = Converter(price.innerText)
    let taxValue = Math.round(priceValue * (5 / 100));
    Math.round(priceValue * (5 / 100))
    let delivaryChargeValue = Converter(deliveryCharge.innerText)
    let totalValue = Converter(total.innerText)
    let itemNumber = Converter(itemNum.innerText)

    if (isIncrease == true) {
        if (counter > 1) {
            delivaryChargeValue = 0;
        }
        total.innerText = totalValue + priceValue + taxValue + delivaryChargeValue;;
        itemNum.innerText = counter;
        counter++;
    } else {

        if (totalValue > 0) {
            if (itemNumber == 1) {
                total.innerText = totalValue - priceValue - taxValue - 10;
                itemNum.innerText = itemNumber - 1;
            } else {

                total.innerText = totalValue - priceValue - taxValue;
                itemNum.innerText = itemNumber - 1;
            }

        }
        counter--;
    }


}

let box = document.createElement("div")
let classNames = ["d-flex", "justify-content-center", "align-items-center", "py-5", "my-4"]
box.classList.add(...classNames)

function displayBoughtItem(imgSrc, name) {
    let index = 1;
    main.innerHTML = ""
    box.innerHTML += `
    <div class="card mb-3 w-75 buy-cart">
    <button class="btn button-cart fs-3 text-decoration-underline text-danger button-back" onclick="goBack()">Go Back</button>
        <div class = "row g-0">
            <div class ="col-md-4">
               <img src="${imgSrc}" class="card-img-top" style="height:600px;" alt="image">    
             </div>
            <div class = "col-md-8">
                <div class="card-body">        
                    <div   class = "d-flex justify-content-center flex-column align-items-center w-50 mx-auto buy-item mt-5">
                        <p  class="text-center fs-3 text-bold ">Total Item:<span id="item-num" >00</span>
                        <P/>
                        <p   class="text-center fs-3 text-bold ">Price :$ <span id="text">234</span><P/>
                        <p   class="text-center fs-3 text-bold ">Tax : $ <span id="tax">5</span><P/> 
                        <p   class="text-center fs-3 text-bold ">Delivery-charge :$ <span id="delivery-charge">10</span><P/>
                        <p  class="text-center fs-3 text-bold ">Total : $ <span id="total" >00</span>
                    
                        <div class= "d-flex justify-content-center gap-2" >
                            <button  class=" btn bg-none border-0 fs-3 text-white bg-secondary"><i id="add"  class="add fa-solid fa-plus"></i></button>
                            <button  class="btn bg-none border-0 fs-3 text-white bg-secondary"><i id="remove" class="remove  fa-solid fa-minus"></i></button>
                        </div>
                        <button class="btn button-cart fs-1 text-decoration-underline"> Buy Now</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
    `
    main.append(box)
    let addbtn = document.querySelector("#add")
    let removebtn = document.querySelector("#remove")
    let price = document.querySelector("#text")
    let tax = document.querySelector("#tax")
    let deliveryCharge = document.querySelector("#delivery-charge")
    let total = document.querySelector("#total")
    let itemNum = document.querySelector("#item-num")

    addbtn.addEventListener("click", function () {
        addremove(price, tax, deliveryCharge, total, itemNum, true)
    })
    removebtn.addEventListener("click", function () {
        addremove(price, tax, deliveryCharge, total, itemNum, false)
    })
}

function displayAddItem(imgSrc, name, show) {
    show.innerHTML += `
    <div id="this" class="card off-card p-2 mb-4 pb-3 mx-3 mt-0" style="width: 18rem;">
    <a href="#"  class="button-cart button-cart-flash mb-3 text-white p-2 ms-auto">Price : $45</a>
    <img src="${imgSrc}" class="card-img-top mx-auto" alt="..." style= "height:150px; width:150px;">
    <div class="card-body text-center">
      <p class="card-title text-center">${name}</p>
      <a href="#this" class="button-cart" onclick ="displayBoughtItem('${imgSrc}','${name}')" >Place Order</a> 
    </div>    
    </div>
    `
}

function itemCounter(input) {
    let itemNumber = +(input.innerText)
    input.innerText = itemNumber + 1;
    return (parseInt(input.innerText))
}

function addProducttoCart(imgSrc, name) {
    const number = itemCounter(cartCounter)
    let cart = getCart()
    let item = {
        name,
        imgSrc,
        number,
    }
    let itemJson = JSON.stringify(item)
    cart[itemJson] = 1;
    displayAddItem(imgSrc, name, offcanvasBody)
    localStorage.setItem("cart", JSON.stringify(cart))
    offcanvas.style.display = "block"
}

function all(url, show) {
    const data = loadData(url)

    data.then(res => {
        let classN = ["d-flex", "justify-content-center", "align-items-center", "flex-wrap"]
        let div = document.createElement("div")
        div.classList.add(...classN)
        let newItem = res.slice(4, res.length)
        newItem.forEach(product => {
            console.log(res)
            div.innerHTML += `
        <div id="this" class="card p-2 mx-3 mt-3 mt-xl-0" style="width: 18rem;">
        <img src="${product.image}" class="card-img-top mx-auto" alt="..." style= "height:150px; width:150px;">
        <div class="card-body">
          <p class="card-title text-center">${product.title.slice(0,13)}</p>
        </div>
        <button class="button-love"><i class="fa-solid fa-heart"></i></button>
        <div class = "d-flex justify-content-between align-items-center">
        <a href="#this"  class="button-cart" onclick="addProducttoCart(('${product.image}'),('${product.title.slice(2,30)}'))">Add to cart</a>            
        <a href="#" class="button-cart" onclick ="displayBoughtItem('${product.image}','${product.title}')">Buy now</a>            
        </div>
        `


        })

        show.append(div)
    })


}


function displayData(show, urls) {
    const data = loadData(urls)
    data.then(res => {
        if (res.length > 10) {
            res = res.slice(12, 16);
            res.forEach(product => {

                show.innerHTML += `
                <div id="${urls}" class="card flash-card p-2 mx-3 mt-3 mt-xl-0" style="width: 18rem;">
                <a href="#"  class="button-cart button-cart-flash mb-3 text-white p-2 ms-auto" onclick ="displayBoughtItem('${product.image}','${product.title}')">shop now</a> 
                <img src="${product.image}" class="card-img-top mx-auto" alt="..." style= "height:150px; width:150px;">
                <div class="card-body">
                  <p class="card-title text-center">${product.title.slice(0,60)}</p>
                </div>
                  <p class="card-title text-center fs-2 fw-bold text-danger">$50</p>
                  <p class="card-title text-center text-decoration-line-through fs-3">$199</p>
                </div>
                <button class="button-love"><i class="fa-solid fa-heart"></i></button>                          
              </div>  
                `
            })
        } else {
            res.forEach((product, index) => {
                if (index < 4) {
                    show.innerHTML += `                   
    <div id="${urls}" class="card p-2 mx-3 mt-3 mt-xl-0" style="width: 18rem;"> 
    <img src="${product.image}" class="card-img-top mx-auto" alt="..." style= "height:150px; width:150px;">
    <div class="card-body">
      <p class="card-title text-center">${product.title.slice(0,13)}</p>
    </div>
    <button class="button-love"><i class="fa-solid fa-heart"></i></button> 
    <div class = "d-flex justify-content-between align-items-center">
    <a href="#this" class="button-cart"  onclick="addProducttoCart(('${product.image}'),('${product.title.slice(0,10)}'))">Add to cart</a>            
    <a href="#" class="button-cart" onclick ="displayBoughtItem('${product.image}','${product.title}')">Buy now</a>            
    </div>
  </div>  

    `
                }
            })
        }


        let buttonLove = document.querySelectorAll(".button-love")
        buttonLove.forEach((button) => {
            button.addEventListener("click", function (e) {
                e.stopImmediatePropagation();
                e.target.style.color = "red"
                e.target.style.fontSize = "2rem"
                console.log(e.target)
                itemCounter(reacteditem)
            })
        })
    });

}
let show;
seeAll.forEach(btn => {
    btn.addEventListener("click", function (e) {
        show = e.target.parentNode.nextElementSibling;
        let url = e.target.parentNode.nextElementSibling.lastElementChild.id;
        all(url, show)
    })
})



let products = document.querySelector(".products")
displayData(products, urlAll)
let jewelery = document.querySelector(".jewellery")
displayData(jewelery, jeweleryUrl)
let electronics = document.querySelector(".electronics")
displayData(electronics, electronicUrl)
let womens = document.querySelector(".womens")
displayData(womens, womensUrl)
let mens = document.querySelector(".mens")
displayData(mens, mensurl)



let hour = document.querySelector("#day");
let min = document.querySelector("#hour");
let sec = document.querySelector("#sec");


function converter(input) {
    let value = parseInt(input.innerText)
    if (value == 60) {
        value = 1;
    }
    input.innerText = value + 1;

}
let number = 6;

setInterval(() => {
    let value = parseInt(hour.innerText)
    if (value == 0) {
        value = 6;
    }
    hour.innerText = number - 1;
}, 36000000);
setInterval(() => {
    converter(min)
}, 60000);
setInterval(() => {
    converter(sec)
}, 1000);


let deal = document.querySelector("#deal")
document.querySelector("#dataForm").addEventListener("submit", function (e) {
    e.preventDefault();
})

function data() {
    let namePass = localStorage.getItem("namepass");
    let namePassObj;
    if (namePass) {
        namePassObj = JSON.parse(namePass)
    } else {
        namePassObj = {}
    }
    return namePassObj;

}

function sentData() {
    let nameValue = document.querySelector("#name").value;
    let passValue = document.querySelector("#pass").value;
    let namePass = data();

    let namePassvalue = {
        nameValue,
        passValue,
    }
    if (nameValue == '' || passValue == '') {
        return;
    } else {
        let namePassvalueJson = JSON.stringify(namePassvalue);
        namePass[namePassvalueJson] = 1;
        localStorage.setItem("namepass", JSON.stringify(namePass))
        document.querySelector("#name").value = '';
        document.querySelector("#pass").value = '';
        document.querySelector("#dataForm").innerHTML = `<p class="text-center text-danger text-bold fs-2">Congratulations For opennig account</p>`
    }


}

let logIn = document.querySelector("#login-button")
logIn.addEventListener("click", function () {
    let namePass = data()
    let value = Object.keys(namePass)
    value.forEach(item => {
        let jsonItem = JSON.parse(item)
        if (jsonItem.nameValue && jsonItem.nameValue) {
            
        }
    })
})
// fetch('https://fakestoreapi.com/carts?sort=pant')
//     .then(res => res.json())
//     .then(json => console.log(json))