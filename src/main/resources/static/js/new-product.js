const newProduct = document.getElementById("form-new-product");

newProduct.addEventListener("submit", (e) => {
    e.preventDefault();
    let correctForm = true;
    const form = new FormData(document.getElementById("form-new-product"));

    //checks if all fields are filled in
    for (let field of form.entries()) {
        console.log(`Key: ${field[0]}, Value: ${field[1]}`);
        if (field[1] === "") {
            correctForm = false;
        }
    }

    if (correctForm) {
        const form = new FormData(document.getElementById("form-new-product"));
        console.log(form);
        fetch("/api/product/add", {
            method: "POST",
            body: form
        })
            .then(response => response.json())
            .then(data => {
                console.log(data);
            })
            .catch(error => {
                console.error("Error trying to add product to db: " + error)
            });
    } else {

    }
});