import {Cart} from "../classes/cart.js";
import {StorageManager} from "../classes/storageManager.js";

let productContainer = document.getElementById("product-container");
const cart = await Cart.getCart();

function findGetParameter(parameterName) {
    let result = null,
        tmp = [];
    location.search
        .substr(1)
        .split("&")
        .forEach(function (item) {
            tmp = item.split("=");
            if (tmp[0] === parameterName) {
                result = decodeURIComponent(tmp[1]);
            }
        });
    return result;
}

try {
    const productId = Number.parseInt(findGetParameter('id'));
    const product = await StorageManager.getProduct(productId);
    console.log(product);

    productContainer.innerHTML = product.generateProductInfoPage();

    const cartButton = document.getElementById("info-page-add-to-cart-button");
    cartButton.addEventListener("click", async e => {
        e.preventDefault();
        console.log("fired");
        await cart.addToCart(productId);
    });

    document.getElementById('loader').style.display = "none";

    // Add product images
    const slides = document.getElementById('slides-container');
    const thumbnails = document.getElementById('thumbnail-container');

    for (let i = 0; i < product.imagePaths.length; i++) {
        const slide = document.createElement("div");
        slide.classList.add("slides");
        if (i === 0) {
            slide.style.display = "block";
        }

        const slide_image = document.createElement("img");
        slide_image.src = product.imagePaths[i];
        slide_image.alt = product.imageAltTexts[i];
        slide.appendChild(slide_image);
        slides.appendChild(slide);

        const thumbnail = document.createElement('div');
        thumbnail.classList.add('column');
        thumbnail.classList.add('cursor');
        thumbnail.addEventListener('click', () => {
            currentSlide(i + 1)
        });

        const thumbnail_image = document.createElement('img');
        thumbnail_image.classList.add('thumbnail');
        thumbnail_image.src = product.imagePaths[i];
        thumbnail_image.alt = product.imageAltTexts[i];
        thumbnail.appendChild(thumbnail_image);
        thumbnails.appendChild(thumbnail);
    }
} catch (error) {
    console.log("something went wrong when trying to display product info: " + error);
}