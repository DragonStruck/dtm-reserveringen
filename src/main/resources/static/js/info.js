import {Device} from "./device.js";

let productContainer = document.getElementById("product-container");

function findGetParameter(parameterName) {
    var result = null,
        tmp = [];
    location.search
        .substr(1)
        .split("&")
        .forEach(function (item) {
            tmp = item.split("=");
            if (tmp[0] === parameterName) result = decodeURIComponent(tmp[1]);
        });
    return result;
}

const device = new Device(
    document.getElementById('product')
);

const product = findGetParameter('id')

let productData = await device.fetch(product);
// device.renderInfo();


// Show Products

let generateProduct =()=>{
    return productContainer.innerHTML = `
        <div id="product" class="product">
            <div class="product-info-left">
                <div class="title-container">
                    <h1 id="product-title">${productData.name}</h1>
                    <div class="status">
                        <div class="status-background"></div>
                        <span id="status-text" class="status-text">${productData.status}</span>
                    </div>
                </div>
                <div class="slideshow-container">
                    <div id="slides-container" class="slides-container"></div>
                    <a class="prev" onclick="plusSlides(-1)">❮</a>
                    <a class="next" onclick="plusSlides(1)">❯</a>
                    <div id="thumbnail-container" class="row"></div>
                </div>
                <div class="product-info-description">
                    <h2>Product omschrijving</h2>
                    <p id="description-text">${productData.description}</p>
                </div>
            </div>
            <div class="product-info-right">
                <div class="product-details">
                    <h2>Product details</h2>
                    <p id="details-text">${productData.details}</p>
                </div>
                <div class="product-contents">
                    <h2>Product inhoud</h2>
                    <p id="contents-text">${productData.contents}</p>
                </div>
                <div class="add-to-cart">
                    <button onclick="addToCart(${productData.id})" class="add-to-cart-button"><img src="./icons/cart-outline-white.svg" alt="Calender Icon"> Toevoegen aan mandje</button>
                </div>
            </div>
        </div>
        `;
}

if (productData != null) {

    // Generate product
    generateProduct();

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


// if (productData != null) {





    
//     document.getElementById('product-title').textContent = productData.name;

//     const product = document.getElementById('product');

//     switch(productData.status) {
//         case "Op voorraad":
//             product.classList.add("available");
//             break;
//         case "In verwerking":
//             product.classList.add("processing");
//             break;
//         case "Goedgekeurd":
//             product.classList.add("processing");
//            break;
//         case "Uitgeleend":
//             product.classList.add("unavailable");
//             break;
//         case "Kwijt":
//             product.classList.add("unavailable");
//             break;
//     }

//     document.getElementById('status-text').textContent = productData.status;

//     const slides = document.getElementById('slides-container');
//     const thumbnails = document.getElementById('thumbnail-container');

//     for (let i = 0; i < productData.imagePaths.length; i++) {
//         const slide = document.createElement("div");
//         slide.classList.add("slides");
//         if (i == 0) {slide.style = "display: block;";}

//         const slide_image = document.createElement("img");
//         slide_image.src = productData.imagePaths[i];
//         slide_image.alt = productData.imageAltTexts[i];
//         slide.appendChild(slide_image);
//         slides.appendChild(slide);

//         const thumbnail = document.createElement('div');
//         thumbnail.classList.add('column');
//         thumbnail.classList.add('cursor');
//         thumbnail.addEventListener('click', () => {currentSlide(i+1)});

//         const thumbnail_image = document.createElement('img');
//         thumbnail_image.classList.add('thumbnail');
//         thumbnail_image.src = productData.imagePaths[i];
//         thumbnail_image.alt = productData.imageAltTexts[i];
//         thumbnail.appendChild(thumbnail_image);
//         thumbnails.appendChild(thumbnail);
//     }

//     document.getElementById('description-text').textContent = productData.description;
//     document.getElementById('details-text').textContent = productData.details;
//     document.getElementById('contents-text').textContent = productData.contents;
// }