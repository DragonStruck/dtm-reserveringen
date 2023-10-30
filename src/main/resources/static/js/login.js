const registrationButton = document.getElementById("register-button");
const registerEmail = document.getElementById("login-email");
const registerPassword = document.getElementById("login-password");
const registerRepeatPassword = document.getElementById("repeat-password");


registrationButton.addEventListener("click", e => {
    e.preventDefault();
        let email = registerEmail.value;
        let password = registerPassword.value;
        let confirmPassword = registerRepeatPassword.value;
        let admin = 1;

            if (!validateEmail(email)) {
                alert("Voer een geldig e-mailadres in.");
                return;
            }

            if (!validatePassword(password)) {
                alert("Voer een wachtwoord in van minimaal 8 tekens + een cijfer.");
                return;
            }

            if (password !== confirmPassword) {
                alert("Wachtwoorden komen niet overeen.");
                return;
            }

        let accountData = {
            email: email,
            password: password,
            admin: admin
        };

        console.log(JSON.stringify(accountData));
        fetch("/api/account/add", {
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

function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
}

function validatePassword(password) {
    const re = /^(?=.*[0-9])[a-zA-Z0-9!@#$%^&*]{8,16}$/;
    return re.test(password);
    }