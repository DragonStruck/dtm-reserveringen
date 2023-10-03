export class Device {

    constructor(outputElement) {
        //values of product
        this.id = "";
        this.type = "";
        this.name = "";
        this.description = "";
        this.details = "";
        this.contents = "";
        this.items = [];
        this.imagePaths = [];
        this.altTexts = [];

        // bind html elements
        this.outputElement = outputElement;
    }

    async fetch(index) {
        try {
            console.log("----")
            console.log("product" + index)
            const responseProduct = await fetch("/product/" + index);
            console.log("Product; response is ok? " + responseProduct.ok + "Status code " + responseProduct.status);

            const jsonProduct = await responseProduct.json();
            console.log("Product; got a json response; " + JSON.stringify(jsonProduct));

            //retrieve data for the product from other tables using id's
            if (responseProduct.ok) {
                this.id = jsonProduct.id;
                this.name = jsonProduct.name;
                this.description = jsonProduct.description;
                this.details = jsonProduct.details;
                this.contents = jsonProduct.contents;

                let imagesArray = jsonProduct.images;
                for (let i = 0; i < imagesArray.length; i++) {
                    let imagePath = imagesArray[i].imagePath;
                    if (imagePath === "") {
                        this.imagePaths[i] = null;
                        this.altTexts[i] = imagesArray[i].altText;
                    } else {
                        this.imagePaths[i] = imagePath;
                        this.altTexts[i] = null;
                    }
                }

                console.log("Id: " + this.id +
                    "\nName: " + this.name +
                    "\nDescription: " + this.description +
                    "\nDetails: " + this.details +
                    "\nContents: " + this.contents +
                    "\nImage Paths: " + this.imagePaths +
                    "\nAlt texts: " + this.altTexts
                );

            } else {
                console.log("Product; error retrieving from database" + responseProduct.status);
            }
        } catch (ex) {
            console.log("Something went wrong retrieving in fetch() Device.js . Exception message: '" + ex.message + "'");
        }
    }

    renderTile() {
        const tile = document.createElement("a");
        tile.href = "/product?id=" + this.id;
        tile.classList.add("product");

        if (this.imagePaths[0] != null) {
            const image = document.createElement("img");
            image.classList.add("product-image");
            image.src = "/images/" + this.imagePaths[0];
            tile.appendChild(image);
        } else {
            const altText = document.createElement("p");
            altText.textContent = this.altTexts[0];
        }

        const product_details = document.createElement("div");
        product_details.classList.add("product-text");


        const product_details_h1 = document.createElement("h1");
        product_details_h1.textContent = this.name;
        product_details.appendChild(product_details_h1);


        const product_details_p = document.createElement("p");
        product_details_p.textContent = this.description;
        product_details.appendChild(product_details_p);


        tile.appendChild(product_details);


        this.outputElement.appendChild(tile);
    }

    async renderInfo() {
        document.getElementById('product-title').textContent = this.name;

        const product = document.getElementById('product');

        const slides = document.getElementById('slides-container');
        const thumbnails = document.getElementById('thumbnail-container');

        for (let i = 0; i < this.imagePaths.length; i++) {
            const slide = document.createElement("div");
            slide.classList.add("slides");
            if (i === 0) {slide.style = "display: block;";}

            const slide_image = document.createElement("img");
            slide_image.src = this.imagePaths[i];
            slide_image.alt = this.altTexts[i];
            slide.appendChild(slide_image);
            slides.appendChild(slide);

            const thumbnail = document.createElement('div');
            thumbnail.classList.add('column');
            thumbnail.classList.add('cursor');
            thumbnail.addEventListener('click', () => {
                currentSlide(i+1)}
            );

            const thumbnail_image = document.createElement('img');
            thumbnail_image.classList.add('thumbnail');
            thumbnail_image.src = this.imagePaths[i];
            thumbnail_image.alt = this.altTexts[i];
            thumbnail.appendChild(thumbnail_image);
            thumbnails.appendChild(thumbnail);
        }

        document.getElementById('description-text').textContent = this.description;
        document.getElementById('details-text').textContent = this.details;
        document.getElementById('contents-text').textContent = this.contents;
    }
}
