export class Product {

    constructor() {
        //values of product
        this.id = "";
        this.type = "";
        this.name = "";
        this.description = "";
        this.details = "";
        this.contents = "";


        this.items = [];
        this.imagePaths = [];
        this.imageAltTexts = [];
    }

    setValuesFromJson(json) {
        this.id = json.id;
        this.type = json.type;
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

        this.printValues();
    }

    setValuesFromObject(data) {
        this.id = data.id;
        this.type = data.type;
        this.name = data.name;
        this.description = data.description;
        this.details = data.details;
        this.contents = data.contents;

        // Assuming 'items' and 'images' are arrays in the data object
        this.items = data.items || [];
        this.imagePaths = data.imagePaths || [];
        this.imageAltTexts = data.imageAltTexts || [];

        this.printValues();
    }

    async setValuesUsingFetchRequest(index) {
        try {
            console.log("----")
            console.log("product" + index)
            const responseProduct = await fetch("/product/" + index);
            console.log("Product; response is ok? " + responseProduct.ok + "Status code " + responseProduct.status);

            const jsonProduct = await responseProduct.json();
            console.log("Product; got a json response");
            JSON.stringify(jsonProduct);


            //retrieve data for the product from other tables using id's
            if (responseProduct.ok) {
                this.setValuesFromJson(jsonProduct);
                this.printValues();
            } else {
                console.log("Product; error retrieving from database" + responseProduct.status);
                console.log("JSON: " + jsonProduct);
            }
        } catch (ex) {
            console.log("Something went wrong retrieving in fetch() Product.js . Exception message: '" + ex.message + "'");
        }
    }

    generateProductTile () {
        return `
            <a href="/product?id=${this.id}" class="product">
            <img class="product-image" src="${this.imagePaths[0]}" alt="${this.imageAltTexts[0]}">
            <div class="product-text">
                <h1>${this.name}</h1>
                <p>${this.description}</p>
            </div>
            <button onclick="addToCart(${this.id})" class="cartDirectButton">
                <img src="./icons/cart-outline.svg" class="cartDirectImg" alt="Cart Icon">
            </button>
            </a>
        `;
    }

    generateProductInfoPage(){
        return `
            <div id="product" class="product">
                <div class="product-info-left">
                    <div class="title-container">
                        <h1 id="product-title">${this.name}</h1>
                    </div>
                    <div class="slideshow-container">
                        <div id="slides-container" class="slides-container"></div>
                        <a class="prev" onclick="plusSlides(-1)">❮</a>
                        <a class="next" onclick="plusSlides(1)">❯</a>
                        <div id="thumbnail-container" class="row"></div>
                    </div>
                    <div class="product-info-description">
                        <h2>Product omschrijving</h2>
                        <p id="description-text">${this.description}</p>
                    </div>
                </div>
                <div class="product-info-right">
                    <div class="product-details">
                        <h2>Product details</h2>
                        <p id="details-text">${this.details}</p>
                    </div>
                    <div class="product-contents">
                        <h2>Product inhoud</h2>
                        <p id="contents-text">${this.contents}</p>
                    </div>
                    <div class="add-to-cart">
                        <button onclick="addToCart(${this.id})" class="add-to-cart-button"><img src="./icons/cart-outline-white.svg" alt="Calender Icon"> Toevoegen aan mandje</button>
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
