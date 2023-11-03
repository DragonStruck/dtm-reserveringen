export class Product {

    constructor(id, items, name, description, details, contents, imagePaths, imageAltTexts) {
        //values of product
        //pipes(||) makes it possible to create a product without all the parameters
        this.id = id || 0;
        this.name = name || "";
        this.description = description || "";
        this.details = details || "";
        this.contents = contents || "";

        this.items = items || [];
        this.imagePaths = imagePaths || [];
        this.imageAltTexts = imageAltTexts || [];
    }

    setValuesFromDbJson(json) {
        this.id = json.id;
        this.name = json.name;
        this.description = json.description;
        this.details = json.details;
        this.contents = json.contents;

        const itemValues = Object.values(json.items);
        itemValues.map(item => {
            this.items.push(item.id);
        });

        const imagesValues = Object.values(json.images);
        imagesValues.map(image => {
            this.imagePaths.push("/images/" + image.imagePath);
            this.imageAltTexts.push(image.imageAltText);
        });
    }

    setValuesFromObject(data) {
        this.id = data.id;
        this.name = data.name;
        this.description = data.description;
        this.details = data.details;
        this.contents = data.contents;

        // Assuming 'items' and 'images' are arrays in the data object
        this.items = data.items || [];
        this.imagePaths = data.imagePaths || [];
        this.imageAltTexts = data.imageAltTexts || [];
    }

    generateProductTile() {
        return `
            <a href="/product?id=${this.id}" class="product">
                <img class="product-image" src="${this.imagePaths[0]}" alt="${this.imageAltTexts[0]}">
                <div class="product-text">
                    <h1>${this.name}</h1>
                    <p>${this.description}</p>
                </div>
                <button class="cartDirectButton">
                    <img src="./icons/add-outline-white.svg" class="cartDirectImg" alt="Cart Icon">
                </button>
            </a>
        `;
    }

    generateProductInfoPage(){
        return `
            <div id="product" class="product">
                <div class="title-container">
                    <a href="./">
                        <button>❮</button>
                    </a>
                    <h1 id="product-title">${this.name}</h1>
                </div>
                <div class="product-info-left">
                    <div class="slideshow-container">
                        <div id="slides-container" class="slides-container"></div>
                        <a class="prev" onclick="plusSlides(-1)">❮</a>
                        <a class="next" onclick="plusSlides(1)">❯</a>
                        <div id="thumbnail-container" class="row"></div>
                    </div>
                    <div class="product-section">
                        <h2>Product omschrijving</h2>
                        <p id="description-text">${this.description}</p>
                    </div>
                    <div class="product-section">
                        <h2>Product details</h2>
                        <p id="details-text">${this.details}</p>
                    </div>
                </div>
                <div class="product-info-right">
                    <div class="product-section">
                        <h2>Product inhoud</h2>
                        <p id="contents-text">${this.contents}</p>
                    </div>
                    <div class="product-section">
                        <button id="info-page-add-to-cart-button" class="add-to-cart-button"><img src="./icons/add-outline-white.svg" alt="Calender Icon"> Toevoegen *</button>
                        <p><strong>* maximaal 3 dagen per keer reserveren</strong></p>
                    </div>
                </div>
            </div>
        `;
    }

    printValues() {
        console.log("Id: " + this.id +
            "\nName: " + this.name +
            "\nDescription: " + this.description +
            "\nDetails: " + this.details +
            "\nContents: " + this.contents +
            "\nItems: " + this.items +
            "\nImage Paths: " + this.imagePaths +
            "\nAlt texts: " + this.imageAltTexts
        );
    }
}
