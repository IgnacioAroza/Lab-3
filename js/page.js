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
    // console.log(removeCartButtons);
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
    var addCart = document.getElementsByClassName('btn-cart');
    for(var i = 0; i < addCart.length; i++){
        var button = addCart[i];
        button.addEventListener('click', addCartClicked);
    }
    // Buy Button Action
    document.getElementsByClassName('btn-buy')[0].addEventListener('click', buyButtonClicked);
    document.getElementsByClassName('btn-buy2')[0].addEventListener('click', buyButtonClicked);
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
    var title = shopProdcuts.getElementsByClassName('title')[0].innerText;
    var price = shopProdcuts.getElementsByClassName('precio')[0].innerText;
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


// AGREGAR COMENTARIOS
function agregarComentario(evento) {
    // Evito que recargue la pagina
}
function agregarComentario(evento) {
    evento.preventDefault();

    // Obtengo los valores ingresados
    let textoComentario = document.getElementById('texto-comentario').value;
    let puntaje = document.getElementById('puntaje-feedback').value;

    // Agrego el feedback a la pagina
    let texto = document.createTextNode(textoComentario + ' - ' + puntaje + '/5');
    let parrafo = document.createElement('p');
    parrafo.appendChild(texto);

    document.getElementById('coments').appendChild(parrafo);

    // Reinicio los valores del input

    document.getElementById('listado-comentarios').appendChild(parrafo);

    // Reinicio los valores de los input

    document.getElementById('texto-comentario').value = '';
    document.getElementById('puntaje-feedback').value = '1';
}

document.getElementById('boton-enviar-comentario').addEventListener('click', agregarComentario);

// Mostrar todo desde la API
async function cargalUrl(url){
    let respuesta = await fetch(url);
    return respuesta.json();
}
async function cargarJson2(){
    let json = await cargalUrl('https://my-json-server.typicode.com/agustinruatta/fake_json_server_db/products/1');
    // console.log(json);

    // Imagen
    const productImg = document.getElementById('img');
    let img = document.createElement('img');
    img.classList.add('product-img');
    img.src = json.image_url;
    productImg.appendChild(img);

    // Titulo
    const title = document.querySelector('.title');
    title.innerHTML = json.title;

    // Precio
    const price = document.getElementById('price');
    // Titulo del precio
    let precio = document.createElement('h3');
    precio.classList.add('precio');
    // Select
    let ramSelect = document.createElement('select');
    ramSelect.classList.add('ramSelect');
    let opcion = document.createElement('option');
    opcion.value = ' ';
    opcion.textContent = 'Seleccione una opcion';
    ramSelect.appendChild(opcion);
    let opcion8gb = document.createElement('option');
    opcion8gb.value = '8';
    opcion8gb.textContent = '8GB Ram';
    ramSelect.appendChild(opcion8gb);
    let opcion16gb = document.createElement('option');
    opcion16gb.value = '16';
    opcion16gb.textContent = '16GB Ram';
    ramSelect.appendChild(opcion16gb);
    price.appendChild(ramSelect);
    
    // Seleccionar precio
    ramSelect.addEventListener('change', () => {
        if(ramSelect.value === '8'){
            precio.textContent = '$' + json.notebooksTypes[0].price;
            // console.log(precio.textContent);
        }else if(ramSelect.value === '16'){
            precio.textContent = '$' + json.notebooksTypes[1].price;
            // console.log(precio.textContent);
        }
        price.appendChild(precio);
    });
    
    // URL fabricante
    let fabricanteUrl = document.createElement('a');
    fabricanteUrl.classList.add('link');
    fabricanteUrl.href = json.factory_url;
    fabricanteUrl.textContent = "Sitio del fabricante";
    const fabricante = document.getElementById('fabricante');
    fabricante.appendChild(fabricanteUrl);

    // Descripcion
    const descripcion = document.getElementById('descrip');
    descripcion.innerText = json.description;
}
cargarJson2();

// const productImg = document.getElementById('img');
// let jsonProducto = fetch('https://my-json-server.typicode.com/agustinruatta/fake_json_server_db/products')
// .then(response => response.json())
// .then(data =>{
//     data.forEach(function(item) {
//     // Imagen
//     let img = crearElemento('img', 'product-img');
//     // img.classList.add('product-img');
//     img.src = item.image_url;
//     productImg.appendChild(img);

//     // Titulo
//     const title = document.querySelector('.title');
//     title.innerHTML = item.title;

//     // Precio
//     const price = document.getElementById('price');
//     // Titulo del precio
//     let precio = crearElemento('h3', 'precio');
//     // precio.classList.add('precio');
//     // Select
//     let ramSelect = crearElemento('select', 'ramSelect');
//     // ramSelect.classList.add('ramSelect');
//     let opcion = crearElemento('option', 'opcion');
//     opcion.value = ' ';
//     opcion.textContent = 'Seleccione una opcion';
//     ramSelect.appendChild(opcion);
//     let opcion8gb = document.createElement('option');
//     opcion8gb.value = '8';
//     opcion8gb.textContent = '8GB Ram';
//     ramSelect.appendChild(opcion8gb);
//     let opcion16gb = document.createElement('option');
//     opcion16gb.value = '16';
//     opcion16gb.textContent = '16GB Ram';
//     ramSelect.appendChild(opcion16gb);
//     price.appendChild(ramSelect);
    
//     // Seleccionar precio
//     ramSelect.addEventListener('change', () => {
//         if(ramSelect.value === '8'){
//             precio.textContent = '$' + item.notebooksTypes[0].price;
//             // console.log(precio.textContent);
//         }else if(ramSelect.value === '16'){
//             precio.textContent = '$' + item.notebooksTypes[1].price;
//             // console.log(precio.textContent);
//         }
//         price.appendChild(precio);
//     });
    
//     // URL fabricante
//     let fabricanteUrl = crearElemento('a', 'link');
//     // fabricanteUrl.classList.add('link');
//     fabricanteUrl.href = item.factory_url;
//     fabricanteUrl.textContent = "Sitio del fabricante";
//     const fabricante = document.getElementById('fabricante');
//     fabricante.appendChild(fabricanteUrl);

//     // Descripcion
//     const descripcion = document.getElementById('descrip');
//     descripcion.innerText = item.description;
//     });
// })
// .catch(error => error);

function crearElemento(tag, className){
    let elemento = document.createElement(tag);
    if(className){
        elemento.classList.add(className);
    }
    return elemento;
}