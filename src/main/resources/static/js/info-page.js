import {Product} from "../classes/product.js";

let productContainer = document.getElementById("product-container");

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
    const product = new Product();
    const productId = findGetParameter('id');
    await product.fetch(productId);

    productContainer.innerHTML = product.generateProductInfoPage();
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
    console.log("something went wrong when tring to display product info: " + error);
}


if (product == null) {
    console.log("No product found");
} else {
    // Generate product

}