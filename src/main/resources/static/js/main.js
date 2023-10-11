import {StorageKeys} from "../ENUM/storageKeys";

let cartAmountElement = document.getElementById('cart-amount');
let cartLocalStorage;

if (localStorage.getItem(StorageKeys.CART) == null) {
    localStorage.setItem(StorageKeys.CART, '{"items":[]}');
}

cartLocalStorage = JSON.parse(localStorage.getItem(StorageKeys.CART));

updateCartNumber();

function addToCart(i) {
    if (!inArray(i, cartLocalStorage.items)) {
        cartLocalStorage.items.push(i);
        localStorage.setItem("cart", JSON.stringify(cartLocalStorage));
        console.log(cartLocalStorage.items);
        updateCartNumber();
        return true;
    } else {
        console.log("item already in cart");
        updateCartNumber();
        return false;
    }
}

function removeFromCart(i) {
    const cartItem = cartLocalStorage.items.indexOf(i);
    if (cartItem > -1) {
        cartLocalStorage.items.splice(cartItem, 1);
        localStorage.setItem("cart", JSON.stringify(cartLocalStorage));
        console.log(cartLocalStorage.items);
        // updateCartNumber();
        location.reload();
        return true;
    } else {
        console.log("item not in cart");
        updateCartNumber();
        return false;
    }
}

function emptyCart() {
    localStorage.setItem(StorageKeys.CART, '{"items":[]}');
}

function updateCartNumber() {
    cartAmountElement.textContent = cartLocalStorage.items.length;
}

function inArray(item, array) {
    let count = array.length;
    for (let i = 0; i < count; i++) {
        if (array[i] === item) {
            return true;
        }
    }
    return false;
}


console.log(JSON.parse(localStorage.getItem(StorageKeys.CART)));
// emptyCart();
// addToCart(1);
// addToCart(6);
// addToCart(8);
// removeFromCart(6);
// addToCart(16);
// removeFromCart(1);
// removeFromCart(99);