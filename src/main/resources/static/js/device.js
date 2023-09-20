export class Device {

    constructor(outputElement) {

        //used for generating all tiles
        this.index = 1;

        //values of product
        this.id = "";
        this.name = "";
        this.status = "";
        this.type = "";
        this.description = "";
        this.details = "";
        this.contents = "";
        this.imageId = [];
        this.imagePath = "";

        // bind html elements
        this.outputElement = outputElement;
    }

    async fetch() {
        try {
            console.log("----")
            console.log("product" + this.index)
            const responseProduct = await fetch("/product/" + this.index);
            console.log("Product: response is ok? " + responseProduct.ok + "Status code " + responseProduct.status);

            const jsonProduct = await responseProduct.json();
            console.log("Product: got a json response; " + JSON.stringify(jsonProduct));

            this.index += 1;

            //retrieve data for the product from other tables using id's
            if (responseProduct.ok) {
                this.id = jsonProduct.id;
                this.name = jsonProduct.name;
                this.type = jsonProduct.type;
                this.description = jsonProduct.description;
                this.details = jsonProduct.details;
                this.contents = jsonProduct.contents;

                //Retrieves the status of the product given the statusID
                console.log("----")
                console.log("product status")

                const responseStatus = await fetch("/status/" + jsonProduct.statusId);
                console.log("Product status: response is ok? " + responseProduct.ok + "Status code " + responseProduct.status);

                const jsonStatus = await responseStatus.json();
                console.log("Product status: got a json response; " + JSON.stringify(jsonStatus));

                if (responseStatus.ok) {
                    this.status = jsonStatus.status;
                } else {
                    console.log("Product status: error retrieving from product" + responseStatus.status);
                }

                //Retrieves the type of the product given the typeId
                console.log("----")
                console.log("product type")

                const responseType = await fetch("/type/" + jsonProduct.typeId);
                console.log("Product type: response is ok? " + responseProduct.ok + "Status code " + responseProduct.status);

                const jsonType = await responseType.json();
                console.log("Product type: got a json response; " + JSON.stringify(jsonType));

                if (responseType.ok) {
                    this.type = jsonType.type;
                } else {
                    console.log("Product type: error retrieving from database" + responseType.status);
                }

                //retrieves the imageID
                console.log("----")
                console.log("product image id")

                const responseImageID = await fetch("/imageId/" + this.id);
                console.log("Product ImageID: response is ok? " + responseImageID.ok + "Status code " + responseImageID.status);

                const jsonImageID = await responseImageID.json();
                console.log("Product ImageID: got a json response; " + JSON.stringify(jsonImageID));

                if (responseImageID.ok) {
                    const imageIdString = jsonImageID.imageId;
                    //the string in the database has multiple integers because a product can only refer to one other value in the database
                    this.imageId = imageIdString.split(",").map(function (item) {
                        return parseInt(item, 10); // 10 refers to the decimal system
                    });
                } else {
                    console.log("Product type: error retrieving from database" + responseImageID.status);
                }


                //retrieves the imagePath
                console.log("----")
                console.log("product image path")

                const responseImagePath = await fetch("/imagePath/" + this.imageId[0]);
                console.log("Product ImagePath: response is ok? " + responseImagePath.ok + "Status code " + responseImagePath.status);

                const jsonImagePath = await responseImagePath.json();
                console.log("Product imagePath: got a json response; " + JSON.stringify(jsonImagePath));

                if (responseImagePath.ok) {
                    //for when there is no image specified, give generic image not found
                    if (jsonImagePath.imagePath === "") {
                        this.imagePath = "image not found";
                    } else {
                        this.imagePath = jsonImagePath.imagePath;
                    }
                    console.log(this.imagePath);
                } else {
                    console.log("Product imagePath: error retrieving from database" + responseType.status);
                }

            } else {
                console.log("Product: error retrieving from database" + responseProduct.status);
            }
        } catch (ex) {
            console.log("Something went wrong retrieving in fetch() Device.js . Exception message is '" + ex.message + "'");
        }
    }

    render() {
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
        image.src = "images/" + this.imagePath;
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
}
