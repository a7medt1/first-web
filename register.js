document.getElementById('register-form').addEventListener('submit', async (event) => {
    event.preventDefault();

    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    const email = document.getElementById('email').value;


    const response = await fetch('register.php', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username, password , email})
    });

    if (response.ok) {
        alert('تم التسجيل بنجاح!');
        window.location.href = 'login.html';
    } else {
        alert('حدث خطأ أثناء التسجيل.');
    }
});
