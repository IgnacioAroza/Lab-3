let cartIcon = document.querySelector('#cart-icon');
let cart = document.querySelector('.cart');
let closeCart = document.querySelector('#close-cart');

// Open cart
cartIcon.onclick = () =>{
    cart.classList.add("active");
};
// Close cart
closeCart.onclick = () => {
    cart.classList.remove("active");
};

// Cart Working JS
if(document.readyState == 'loading'){
    document.addEventListener('DOMContentLoaded', ready);
}else{
    ready();
}

function ready(){
    //Remove Items From Cart
    var removeCartButtons = document.getElementsByClassName('cart-remove');
    console.log(removeCartButtons);
    for(var i = 0; i < removeCartButtons.length; i++){
        var button = removeCartButtons[i];
        button.addEventListener('click', removeCartItem);
    }
    // Quantity Changes
    var quantityInputs = document.getElementsByClassName('cart-quantity');
    for(var i = 0; i < quantityInputs.length; i++){
        var input = quantityInputs[i];
        input.addEventListener('change', quantityChanged);
    }
    // Add to Cart
    var addCart = document.getElementsByClassName('add-cart');
    for(var i = 0; i < addCart.length; i++){
        var button = addCart[i];
        button.addEventListener('click', addCartClicked);
    }
    // Buy Button Action
    document.getElementsByClassName('btn-buy')[0].addEventListener('click', buyButtonClicked);
};

// buy button
function buyButtonClicked(){
    alert('Su pedido fue realizado');
    var cartContent = document.getElementsByClassName('cart-content')[0];
    while(cartContent.hasChildNodes()){
        cartContent.removeChild(cartContent.firstChild);
    }
    updateTotal();
};

// Remove items fron cart
function removeCartItem(event){
    var buttonClicked = event.target;
    buttonClicked.parentElement.remove();
    updateTotal();
};

// Cambios de cantidad
function quantityChanged(event){
    var input = event.target;
    if(isNaN(input.value) || input.value <= 0){
        input.value = 1;
    }
    updateTotal();
};

// Añadir al carrito
function addCartClicked(event){
    var button = event.target;
    var shopProdcuts = button.parentElement;
    var title = shopProdcuts.getElementsByClassName('product-title')[0].innerText;
    var price = shopProdcuts.getElementsByClassName('price')[0].innerText;
    var productImg = shopProdcuts.getElementsByClassName('product-img')[0].src;

    addProductToCart(title, price, productImg);
    updateTotal();
};

function addProductToCart(title, price, productImg){
    var cartShopBox = document.createElement('div');
    cartShopBox.classList.add('cart-box');
    var cartItems = document.getElementsByClassName('cart-content')[0];
    var cartItemsNames = cartItems.getElementsByClassName('cart-product-title');

    for(var i = 0; i < cartItemsNames.length; i++){
        if(cartItemsNames[i].innerText == title){
            alert("El producto ya fue añadido al carro.")
            return;
        }
    }
    var cartBoxContent = `
            <img src="${productImg}" alt="" class="cart-img">
            <div class="detail-box">
                <div class="cart-product-title">${title}</div>
                <div class="cart-price">${price}</div>
                <input type="number" value="1" class="cart-quantity">
            </div>
            <!-- Remove Cart -->
            <i class='bx bxs-trash-alt cart-remove'></i>
    `;
    cartShopBox.innerHTML = cartBoxContent;
    cartItems.append(cartShopBox);
    cartShopBox.getElementsByClassName('cart-remove')[0].addEventListener('click', removeCartItem);
    cartShopBox.getElementsByClassName('cart-quantity')[0].addEventListener('change', quantityChanged);
};

// Update total
function updateTotal(){
    var cartContent = document.getElementsByClassName('cart-content')[0];
    var cartBoxes = cartContent.getElementsByClassName('cart-box');
    var total = 0;
    for(var i = 0; i < cartBoxes.length; i++){
        var cartBox = cartBoxes[i];
        var priceElement = cartBox.getElementsByClassName('cart-price')[0];
        var quantityElement = cartBox.getElementsByClassName('cart-quantity')[0];
        var price = parseFloat(priceElement.innerHTML.replace("$", ""));
        var quantity = quantityElement.value;
        total = total + (price * quantity);
    }
    // Si el precio contiene algún valor de centavos
    total = Math.round(total * 100) / 100;

    document.getElementsByClassName('total-price')[0].innerText = "$" + total;
};


// MOSTRAR LOS PRODUCTOS DESDE UN ARRAY

let productos = [
    {srcImagen: '../img/notebook.jpg', nombre: 'Notebook Lenovo', precio: '25'},
    {srcImagen: '../img/notebook.jpg', nombre: 'Notebook Lenovo', precio: '25'},
    {srcImagen: '../img/notebook.jpg', nombre: 'Notebook Lenovo', precio: '25'},
    {srcImagen: '../img/notebook.jpg', nombre: 'Notebook Lenovo', precio: '25'},
    {srcImagen: '../img/notebook.jpg', nombre: 'Notebook Lenovo', precio: '25'},
    {srcImagen: '../img/notebook.jpg', nombre: 'Notebook Lenovo', precio: '25'},
    {srcImagen: '../img/notebook.jpg', nombre: 'Notebook Lenovo', precio: '25'},
    {srcImagen: '../img/notebook.jpg', nombre: 'Notebook Lenovo', precio: '25'},
];

function mostrarProductos() {
    let productosContainer = document.getElementById('shop-content');

    for (let producto of productos) {
        let productoDiv = document.createElement('div');
        let link = document.createElement('a');
        link.setAttribute('href', '../page.html');
        let imagenProducto = document.createElement('img');
        imagenProducto.setAttribute('src', producto.srcImagen);
        imagenProducto.setAttribute('alt', producto.nombre);

        productoDiv.innerHTML = producto.nombre + ' - $' + producto.precio;
        link.appendChild(imagenProducto);
        productoDiv.appendChild(link);
        
        productoDiv.setAttribute('class', 'product-box');
        link.setAttribute('style', 'text-decoration: none');

        productosContainer.appendChild(productoDiv);
    }
}

mostrarProductos();

// Barra de busqueda
const form = document.querySelector('form');
const input = document.querySelector('#buscardor-input');
const list = document.querySelector('#shop-content');

form.addEventListener('submit', function(event) {
    event.preventDefault();
    const buscadorTerminos = input.value;

    // Obtener todos los elemetos
    const elementos = list.querySelectorAll('div');

    // Ocultar todos los elementos
    elementos.forEach(function(elemento) {
        elemento.style.display = 'none';
    });

    // Mostrar solo los elemnetos que coinciden con el termino buscado
    elementos.forEach(function(elemento) {
        const texto = elemento.textContent.toLocaleLowerCase();
        if(texto.includes(buscadorTerminos.toLocaleLowerCase())){
            elemento.style.display = 'block';
        }
    });
});