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

    setValues(json) {
        this.id = json.id;
        this.type = json.type;
        this.name = json.name;
        this.description = json.description;
        this.details = json.details;
        this.contents = json.contents;

        let itemValues = Object.values(json.items);
        itemValues.map(item => {
            this.items.push(item);
        });

        let imagesValues = Object.values(json.images);
        imagesValues.map(image => {
            this.imagePaths.push("/images/" + image.imagePath);
            this.imageAltTexts.push(image.imageAltText);
        });
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
            if (!responseProduct.ok) {
                console.log("Product; error retrieving from database" + responseProduct.status);
            } else {
                this.setValues(jsonProduct);

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

            return this;
        } catch (ex) {
            console.log("Something went wrong retrieving in fetch() Product.js . Exception message: '" + ex.message + "'");
        }
    }
}
