document.getElementById('login-form').addEventListener('submit', async (event) => {
    event.preventDefault();

    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    const response = await fetch('http://localhost:5000/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username, password })
    });

    if (response.ok) {
        alert('تسجيل الدخول ناجح!');
        window.location.href = 'index.html';
    } else {
        alert('اسم المستخدم أو كلمة المرور غير صحيحة.');
    }
});
