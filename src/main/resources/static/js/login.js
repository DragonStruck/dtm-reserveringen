const registrationButton = document.getElementById("login-button");
const registerEmail = document.getElementById("login-email");
const registerPassword = document.getElementById("login-password");
//const registerRepeatPassword = document.getElementById("repeat-password");



registrationButton.addEventListener("click", e => {
    e.preventDefault();

   // if (registerPassword.text === registerRepeatPassword.text) {
        let registerArray = [];
        let id = 2;
        let email = registerEmail.value;
        let password = registerPassword.value;
        let admin = 1;


        registerArray.push(id);
        registerArray.push(email);
        registerArray.push(password);
        registerArray.push(admin);

        console.log(JSON.stringify(registerArray));
        fetch("/account/add", {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: registerArray
            }).catch(rej => console.log(rej));
   // }

})