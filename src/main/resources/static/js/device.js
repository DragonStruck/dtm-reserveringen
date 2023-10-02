export class Device {

    constructor() {
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
        this.imageAltTexts = [];
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
                this.imageAltTexts = jsonProduct.imageAltTexts;
                console.log("Id: " + this.id +
                    "\nName: " + this.name +
                    "\nDescription: " + this.description +
                    "\nDetails: " +this.details +
                    "\nContents: " + this.contents +
                    "\nType: " + this.type +
                    "\nStatus: " + this.status +
                    "\nImageId: " + this.imageIds +
                    "\nImagePaths: " + this.imagePaths +
                    "\nImageAltTexts: " + this.imageAltTexts
                );
                return this;
            } else {
                console.log("Product; error retrieving from database" + responseProduct.status);
                return null;
            }
        } catch (ex) {
            console.log("Something went wrong retrieving in fetch() Device.js . Exception message: '" + ex.message + "'");
        }
    }
}
