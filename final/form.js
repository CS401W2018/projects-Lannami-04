document.getElementById('myForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const skinType = document.getElementById('skin-type').value;
    const concerns = document.querySelector('input[name="concern"]:checked')?.value;
    const products = Array.from(document.querySelectorAll('input[name="products[]"]:checked')).map(
        (checkbox) => checkbox.value
    );

    const comments = document.getElementById('comments').value;

    if (!name || !email || !skinType || !concerns || products.length === 0) {
        alert("All fields are required.");
        return;
    }

    const formData = {
        name: name,
        email: email,
        skinType: skinType,
        concerns: concerns,
        products: products,
        comments: comments,
    };

    const xhr = new XMLHttpRequest();
    xhr.open("GET", "submit.json", true);
    xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    xhr.onreadystatechange = function() {
        if (xhr.readyState === 4 && xhr.status === 200) {
            const response = JSON.parse(xhr.responseText);
            document.getElementById('message').innerHTML = `<p>${response.message}</p>`;
            document.getElementById('myForm').reset();
            alert('Form submitted successfully');
        } else if (xhr.readyState === 4) {
            alert('Error submitting form.');
        }
    };
    xhr.send(JSON.stringify(formData));
    console.log('Form data submitted:', formData);
});
