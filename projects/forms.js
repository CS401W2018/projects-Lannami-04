document.getElementById("myForm").addEventListener("submit", function(event) {
    event.preventDefault();
    const first = document.getElementById("fname").value;
    const last = document.getElementById("lname").value;
    const dob = document.getElementById("dob").value;
    const phone = document.getElementById("phone").value;
    const email = document.getElementById("email").value;
    const pass = document.getElementById("pass").value;
    const gender = document.querySelector("input[name='gender']:checked")?.value;
    const history = document.getElementById("history").value;
    const insurance = document.getElementById("insurance").value;
    const agree = document.querySelector("input[name='agree']").checked;

    if (!first || !last || !email) {
        alert("First name, last name, and email are required.");
        return;
    }
    if (phone && !/^\d{10}$/.test(phone)) {
        alert("Phone number must be a valid 10-digit number.");
        return;
    }
    if (pass && pass.length < 6) {
        alert("Password must be at least 6 characters long.");
        return;
    }

    const formData = {
        fname: first,
        lname: last,
        dob: dob,
        phone: phone,
        email: email,
        password: pass,
        gender: gender,
        history: history,
        insurance: insurance,
        agree: agree
    };

    const xhr = new XMLHttpRequest();
    xhr.open("GET","submit.json", true);
    xhr.setRequestHeader("Content-Type","application/json;charset=UTF-8");
    xhr.onreadystatechange = function() {
        if (xhr.readyState === 4 && xhr.status === 200) {
            const response = JSON.parse(xhr.responseText);
            document.getElementById("message").innerHTML = response.message;
            document.getElementById("myForm").innerHTML = "";
        } else if (xhr.readyState === 4) {
            document.getElementById("message").innerHTML = "Error submitting form.";
        }
    }; 
    xhr.send();
    console.log(formData);
});