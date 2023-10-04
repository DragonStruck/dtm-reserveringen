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
        this.imageAltTexts = [];

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
                    this.imagePaths[i] = "/images/" + imagesArray[i].imagePath;
                    this.imageAltTexts[i] = imagesArray[i].altText;
                }

                console.log("Id: " + this.id +
                    "\nName: " + this.name +
                    "\nDescription: " + this.description +
                    "\nDetails: " + this.details +
                    "\nContents: " + this.contents +
                    "\nImage Paths: " + this.imagePaths +
                    "\nAlt texts: " + this.imageAltTexts
                );
                return this;
            } else {
                console.log("Product; error retrieving from database" + responseProduct.status);
            }
        } catch (ex) {
            console.log("Something went wrong retrieving in fetch() Device.js . Exception message: '" + ex.message + "'");
        }
    }
}
