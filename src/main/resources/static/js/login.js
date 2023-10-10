const registrationButton = document.getElementById("register-button");
const registerEmail = document.getElementById("login-email");
const registerPassword = document.getElementById("login-password");
//const registerRepeatPassword = document.getElementById("repeat-password");


registrationButton.addEventListener("click", e => {
    e.preventDefault();
    console.log("ik was hier");

        let email = registerEmail.value;
        let password = registerPassword.value;
        let admin = 1;

         let accountData = {
                email: email,
                password: password,
                admin: admin
            };


        console.log(JSON.stringify(accountData));
        fetch("/account/add", {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(accountData)
            })
            .then(response => {
                    if (!response.ok) {
                        throw new Error('Network response was not ok' + response.statusText);
                    }
                    return response.json();
                })
                .then(data => {
                    console.log('Success:', data);
                })
                .catch((error) => {
                    console.error('Error:', error);
                });


});