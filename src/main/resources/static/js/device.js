export class Device {

    constructor(outputElement) {
        //values of product
        this.id = "";
        this.type = "";
        this.status = "";
        this.name = "";
        this.description = "";
        this.details = "";
        this.contents = "";
        this.imageIds = [];
        this.imagePaths = [];

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
                this.type = jsonProduct.typeString;
                this.status = jsonProduct.statusString;
                this.imageIds = jsonProduct.imageIds;
                this.imagePaths = jsonProduct.imagePaths;
                console.log("Id: " + this.id +
                    "\nName: " + this.name +
                    "\nDescription: " + this.description +
                    "\nDetails: " +this.details +
                    "\nContents: " + this.contents +
                    "\nType: " + this.type +
                    "\nStatus: " + this.status +
                    "\nImageId: " + this.imageIds +
                    "\nImagePath: " + this.imagePaths
                );

            } else {
                console.log("Product; error retrieving from database" + responseProduct.status);
            }
        } catch (ex) {
            console.log("Something went wrong retrieving in fetch() Device.js . Exception message: '" + ex.message + "'");
        }
    }

    renderTile() {
        const tile = document.createElement("div");
        tile.classList.add("product");

        switch(this.status) {
            case "Op voorraad":
                tile.classList.add("available");
                break;
            case "In verwerking":
                tile.classList.add("processing");
                break;
            case "Goedgekeurd":
                tile.classList.add("processing");
               break;
            case "Uitgeleend":
                tile.classList.add("unavailable");
                break;
            case "Kwijt":
                tile.classList.add("unavailable");
                break;
        }

        const image = document.createElement("img");
        image.classList.add("product-image");
        image.src = this.imagePaths[0];
        tile.appendChild(image);


        const product_details = document.createElement("div");
        product_details.classList.add("product-text");

        const product_details_h1 = document.createElement("h1");
        product_details_h1.textContent = this.name;
        product_details.appendChild(product_details_h1);

        const product_details_p = document.createElement("p");
        product_details_p.textContent = this.description;
        product_details.appendChild(product_details_p);

        tile.appendChild(product_details);

        const status = document.createElement("div");
        status.classList.add("status");

        const status_background = document.createElement("div");
        status_background.classList.add("status-background");
        status.appendChild(status_background);

        const status_text = document.createElement("span");
        status_text.classList.add("status-text");
        status_text.textContent = this.status;
        status.appendChild(status_text);

        tile.appendChild(status);

        this.outputElement.appendChild(tile);
    }

    async renderPage() {
        const product_info = document.createElement("div");

        this.outputElement.appendChild(product_info);
    }
}
