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

        // bind html elements
        this.outputElement = outputElement;
    }

    async fetch() {
        try {
            const responseProduct = await fetch("/product/variables?index=" + this.index);
            console.log("Product: response is ok? " + responseProduct.ok + "Status code " + responseProduct.status);

            const jsonProduct = await responseProduct.json();
            console.log("Product: got a json response; " + JSON.stringify(jsonProduct));

            this.index += 1;

            if (responseProduct.ok) {
                this.id = jsonProduct.id;
                this.name = jsonProduct.name;
                this.type = jsonProduct.type;
                this.description = jsonProduct.description;
                this.details = jsonProduct.details;
                this.contents = jsonProduct.contents;

                //Retrieves the status of the product given the statusID
                const responseStatus = await fetch("/status/id?id=" + jsonProduct.statusId);
                console.log("Product status: response is ok? " + responseProduct.ok + "Status code " + responseProduct.status);

                const jsonStatus = await responseStatus.json();
                console.log("Product status: got a json response; " + JSON.stringify(jsonStatus));

                if (responseStatus.ok) {
                    this.status = jsonStatus.status;
                } else {
                    console.log("Product status: error retrieving from product" + responseStatus.status);
                }

                //Retrieves the type of the product given the typeId
                const responseType = await fetch("/type/id?id=" + jsonProduct.typeId);
                console.log("Product type: response is ok? " + responseProduct.ok + "Status code " + responseProduct.status);

                const jsonType = await responseType.json();
                console.log("Product type: got a json response; " + JSON.stringify(jsonType));

                if (responseType.ok) {
                    this.type = jsonType.type;
                } else {
                    console.log("Product type: error retrieving from database" + responseType.status);
                }

            } else {
                console.log("Product: error retrieving from database" + responseProduct.status);
            }
        } catch (ex) {
            console.log("Something went wrong retrieving in fetch() Device.js . Exception message is '" + ex.message + "'");
        }
    }

    render() {
        const tile = document.getElementById("tile");
        const h1 = document.createElement("h1");


        h1.textContent = this.id;
        tile.appendChild(h1);
        console.log(this.id);

        h1.textContent = this.name;
        tile.appendChild(h1);
        console.log(this.name);

        h1.textContent = this.status;
        tile.appendChild(h1);
        console.log(this.status);

        h1.textContent = this.type;
        tile.appendChild(h1);
        console.log(this.type);

        h1.textContent = this.description;
        tile.appendChild(h1);
        console.log(this.description);

        h1.textContent = this.details;
        tile.appendChild(h1);
        console.log(this.details);

        h1.textContent = this.contents;
        tile.appendChild(h1);
        console.log(this.contents);



        this.outputElement.appendChild(tile);
    }
}
