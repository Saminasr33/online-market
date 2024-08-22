// open&close cart 
const carticon = document.querySelector('#cart-icon');
const cart = document.querySelector('.cart');
const closecart = document.querySelector('#cart-close');

carticon.addEventListener('click', () => {
    cart.classList.add('active')
});

closecart.addEventListener('click', () => {
    cart.classList.remove('active')
});

// start when the document is reading
if (document.readyState == 'loading') {
    document.addEventListener('DOMContentLoaded', start);
} else {
    start();
};

// ************start******
function start() {
    addevent();

};

// ***************update*******
function update() {
    addevent();
    updateTotal();
};

// ********* add event**********
function addevent() {
    // remove item from cart 
    let cartremove_btns = document.querySelectorAll('.cart-remove');
    console.log(cartremove_btns);
    cartremove_btns.forEach((btn) => {
        btn.addEventListener('click', hundle_removeCartItem)
    });

    // ***** change item quantity
    let cartQuantity_input = document.querySelectorAll('.cart-quantity');
    cartQuantity_input.forEach(input => {
        input.addEventListener("change", hundle_changeItemQuantity)
    });

    //add item to cart
    let addcart_btns = document.querySelectorAll('.add-cart');
    addcart_btns.forEach((btn) => {
        btn.addEventListener("click", hundle_addCartItem);
    });
    //buy order
    const buy_btn = document.querySelector('.btn-buy');
    buy_btn.addEventListener('click', hundle_buyOrder);


};


// ********************hundle events function
let itemsAdded = [];
function hundle_addCartItem() {
    let product = this.parentElement;
    let title = product.querySelector(".product-title").innerHTML;
    let price = product.querySelector(".product-price").innerHTML;
    let imgSrc = product.querySelector(".product-img").src;
    console.log(title, price, imgSrc);

    let newToAdd = {
        title,
        price,
        imgSrc,
    };

    // hundle item is alread exist
    if (itemsAdded.find((el) => el.title == newToAdd.title)) {
        alert("This Item Is Already Existl");
        return;
    } else {
        itemsAdded.push(newToAdd);
    }


    //add product to cart

    let cartBoxElement = cartBoxCompoment(title, price, imgSrc);
    let newMode = document.createElement('div');
    newMode.innerHTML = cartBoxElement;
    const cartContent = cart.querySelector('.cart-content');
    cartContent.appendChild(newMode);
    update();
}

function hundle_removeCartItem() {
    this.parentElement.remove();
    itemsAdded = itemsAdded.filter(el => el.title != this.parentElement.querySelector('.cart-product-title').innerHTML)
    update();
};
function hundle_changeItemQuantity() {
    if (isNaN(this.value) || this.value < 1) {
        this.value = 1;
    }
    this.value = Math.floor(this.value);  //to keep it integer
    update();
};

function hundle_buyOrder() {
    if (itemsAdded.length <= 0) {
        alert('There is No Order To Place Yet \nPlease Make On Order First.');
        return;
    }
    const cartContent = cart.querySelector('.cart-content');
    cartContent.innerHTML = '';
    alert('Your Order is Placed Sucsessfully :)');
    itemsAdded = [];
    update();
}

// ************ update Total
function updateTotal() {
    let cartBoxes = document.querySelectorAll('.cart-box');
    const totalElement = cart.querySelector('.total-price');
    let total = 0;
    cartBoxes.forEach((cartBox) => {
        let priceElement = cartBox.querySelector('.cart-price');
        let price = parseFloat(priceElement.innerHTML.replace("$", ""));
        let quantity = cartBox.querySelector('.cart-quantity').value;
        total += price * quantity;
    });
    //keep 2 digits after the decimal point
    total = total.toFixed(2);
    //or you can use also
    // total = Math.round(total * 100) / 100;

    totalElement.innerHTML = "$" + total;
}

// **************** html component 
function cartBoxCompoment(title, price, imgSrc) {
    return `
    <div class="cart-box">
    <img src=${imgSrc} class="cart-img">
        <div class="detail-box">
            <div class="cart-product-title">${title}</div>
            <div class="cart-price">${price}</div>
            <input type="number" value="1" class="cart-quantity">
        </div>
        <!-- remove cart  -->
        <i class='bx bxs-trash-alt cart-remove'></i>
    </div>`
};
