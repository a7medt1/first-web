document.addEventListener('DOMContentLoaded', () => {
    const productsContainer = document.getElementById('products-container');
    const addProductForm = document.getElementById('add-product-form');

    // تحميل المنتجات من الخادم
    async function fetchProducts() {
        const response = await fetch('http://localhost:5000/products');
        const products = await response.json();
        displayProducts(products);
    }

    // عرض المنتجات
    function displayProducts(products) {
        productsContainer.innerHTML = '';
        products.forEach(product => {
            const productElement = document.createElement('div');
            productElement.classList.add('col-md-3');
            productElement.innerHTML = `
                <div class="card">
                    <img src="${product.image}" class="card-img-top" alt="${product.name}">
                    <div class="card-body">
                        <h5 class="card-title">${product.name}</h5>
                        <p class="card-text">${product.price} دولار</p>
                        <button class="btn btn-warning edit-product" data-id="${product._id}">تحرير</button>
                        <button class="btn btn-danger delete-product" data-id="${product._id}">حذف</button>
                    </div>
                </div>
            `;
            productsContainer.appendChild(productElement);
        });

        // إضافة مستمعات للأزرار
        document.querySelectorAll('.edit-product').forEach(button => {
            button.addEventListener('click', editProduct);
        });

        document.querySelectorAll('.delete-product').forEach(button => {
            button.addEventListener('click', deleteProduct);
        });
    }

    // إضافة منتج جديد
    addProductForm.addEventListener('submit', async (event) => {
        event.preventDefault();
        const name = document.getElementById('product-name').value;
        const price = document.getElementById('product-price').value;
        const image = document.getElementById('product-image').value;

        const response = await fetch('http://localhost:5000/products', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ name, price, image })
        });

        if (response.status === 201) {
            alert('تم إضافة المنتج بنجاح!');
            fetchProducts();
        } else {
            alert('حدث خطأ أثناء إضافة المنتج.');
        }
    });

    // تحرير منتج
    async function editProduct(event) {
        const productId = event.target.getAttribute('data-id');
        const newName = prompt('أدخل اسم المنتج الجديد:');
        const newPrice = prompt('أدخل سعر المنتج الجديد:');
        const newImage = prompt('أدخل رابط صورة المنتج الجديد:');

        if (newName && newPrice && newImage) {
            const response = await fetch(`http://localhost:5000/products/${productId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ name: newName, price: newPrice, image: newImage })
            });

            if (response.status === 200) {
                alert('تم تحديث المنتج بنجاح!');
                fetchProducts();
            } else {
                alert('حدث خطأ أثناء تحديث المنتج.');
            }
        }
    }

    // حذف منتج
    async function deleteProduct(event) {
        const productId = event.target.getAttribute('data-id');
        const confirmation = confirm('هل أنت متأكد أنك تريد حذف هذا المنتج؟');

        if (confirmation) {
            const response = await fetch(`http://localhost:5000/products/${productId}`, {
                method: 'DELETE'
            });

            if (response.status === 200) {
                alert('تم حذف المنتج بنجاح!');
                fetchProducts();
            } else {
                alert('حدث خطأ أثناء حذف المنتج.');
            }
        }
    }

    fetchProducts();
});
