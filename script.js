let shoppingCart = [];

// traemos los elementos del html que vamos a usar
const storeContainer = document.getElementById('store');
const cartBody = document.getElementById('cart-body');
const emptyCartBtn = document.getElementById('btn-empty-cart');
const addArticleForm = document.getElementById('add-article-form');

// escuchamos los clicks en la tienda para que funcione con los articulos nuevos
storeContainer.addEventListener('click', (event) => {
    
    // miramos si le dieron click al boton de agregar
    if (event.target.classList.contains('btn-add')) {
        
        // sacamos la tarjeta entera del producto
        const card = event.target.closest('.product-card');
        
        // sacamos los datos que necesitamos de la tarjeta
        const name = card.querySelector('.product-name').innerText;
        const price = card.querySelector('.product-price').innerText;
        const image = card.querySelector('img').src;
        
        // mandamos los datos para meterlos al carrito
        addToCart(name, price, image);
    }
});

function addToCart(name, price, image) {
    // buscamos si el articulo ya esta en el carrito
    const existingItem = shoppingCart.find(item => item.name === name);
    
    if (existingItem) {
        // si ya esta, le sumamos 1 a la cantidad
        existingItem.quantity += 1;
    } else {
        // si es la primera vez, lo metemos con cantidad 1
        shoppingCart.push({
            name: name,
            price: price,
            image: image,
            quantity: 1
        });
    }
    
    // actualizamos la tabla para que se vea en pantalla
    renderCart();

    alert('El producto fue agregado correctamente');
}

function renderCart() {
    // limpiamos la tabla para volverla a pintar
    cartBody.innerHTML = '';
    
    // recorremos el carrito y metemos cada fila al html
    shoppingCart.forEach(item => {
        const row = document.createElement('tr');
        
        row.innerHTML = `
            <td><img src="${item.image}" alt="${item.name}" style="width: 50px; border-radius: 4px;"></td>
            <td>${item.name}</td>
            <td>${item.price}</td>
            <td>${item.quantity}</td>
        `;
        
        cartBody.appendChild(row);
    });
}

// boton para vaciar todo el carrito
emptyCartBtn.addEventListener('click', () => {
    // vaciamos la lista en javascript
    shoppingCart = [];
    
    // volvemos a pintar la tabla vacia en el html
    renderCart();
});

// logica para agregar un articulo nuevo
addArticleForm.addEventListener('submit', (event) => {
    // evitamos que la pagina se recargue al enviar el formulario
    event.preventDefault();
    
    // sacamos lo que el usuario escribio
    const name = document.getElementById('input-name').value;
    const numericPrice = parseFloat(document.getElementById('input-price').value);
    const image = document.getElementById('input-image').value;
    const description = document.getElementById('input-desc').value;
    const confusion = document.getElementById('input-confusion').value;
    const warning = document.getElementById('input-warning').value;
    
    // validamos que el precio no sea menor a 1000
    if (numericPrice < 1000) {
        alert('El precio del artículo no puede ser menor a 1.000');
        // cortamos aca para que no siga
        return; 
    }
    
    // le damos formato al precio para que se vea bien
    const formattedPrice = '$' + numericPrice.toLocaleString('es-CO');
    
    // creamos el elemento html para la tarjeta
    const newCard = document.createElement('article');
    newCard.classList.add('product-card');
    
    // le metemos toda la informacion al html de la tarjeta
    newCard.innerHTML = `
        <img src="${image}" alt="${name}">
        <h3 class="product-name">${name}</h3>
        <p class="product-price">${formattedPrice}</p>
        <div class="product-attributes">
            <p class="attr-desc"><strong>Descripción:</strong> ${description}</p>
            <p class="attr-confusion"><strong>Confusión:</strong> ${confusion}</p>
            <p class="attr-warning"><strong>Advertencia:</strong> ${warning}</p>
        </div>
        <button class="btn-add">Agregar al carrito</button>
    `;
    
    // pegamos la tarjeta nueva en la tienda
    storeContainer.appendChild(newCard);
    
    // limpiamos el formulario
    addArticleForm.reset();
});