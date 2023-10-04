import {Product} from "../classes/product.js";

let productContainer = document.getElementById("product-container");

function findGetParameter(parameterName) {
    var result = null,
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

const product = new Product(
    document.getElementById('product')

);

const productId = findGetParameter('id')

let productData = await product.fetch(productId);

if (productData != null) {
    // Generate product
    productContainer.innerHTML = product.generateProductInfoPage();
    document.getElementById('loader').style.display = "none";

    // Add product images
    const slides = document.getElementById('slides-container');
    const thumbnails = document.getElementById('thumbnail-container');

    for (let i = 0; i < productData.imagePaths.length; i++) {
        const slide = document.createElement("div");
        slide.classList.add("slides");
        if (i == 0) {slide.style = "display: block;";}

        const slide_image = document.createElement("img");
        slide_image.src = productData.imagePaths[i];
        slide_image.alt = productData.imageAltTexts[i];
        slide.appendChild(slide_image);
        slides.appendChild(slide);

        const thumbnail = document.createElement('div');
        thumbnail.classList.add('column');
        thumbnail.classList.add('cursor');
        thumbnail.addEventListener('click', () => {currentSlide(i+1)});

        const thumbnail_image = document.createElement('img');
        thumbnail_image.classList.add('thumbnail');
        thumbnail_image.src = productData.imagePaths[i];
        thumbnail_image.alt = productData.imageAltTexts[i];
        thumbnail.appendChild(thumbnail_image);
        thumbnails.appendChild(thumbnail);
    }

    // Add status backgound
    const product = document.getElementById('product');

    switch(productData.status) {
        case "Op voorraad":
            product.classList.add("available");
            break;
        case "In verwerking":
            product.classList.add("processing");
            break;
        case "Goedgekeurd":
            product.classList.add("processing");
        break;
        case "Uitgeleend":
            product.classList.add("unavailable");
            break;
        case "Kwijt":
            product.classList.add("unavailable");
            break;
    }

} else {
    console.log("No product found");
}