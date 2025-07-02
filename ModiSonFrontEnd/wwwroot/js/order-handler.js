document.addEventListener("DOMContentLoaded", () => {
    const token = getAccessToken();

    if (!token) return;

    fetch("https://8f3bppntic.execute-api.us-east-1.amazonaws.com/api/products", {
        headers: { Authorization: `Bearer ${token}` }
    })
        .then(async res => {
            if (!res.ok) {
                const errorBody = await res.text();
                throw new Error(`HTTP ${res.status}: ${errorBody}`);
            }

            const products = await res.json();

            if (!Array.isArray(products)) {
                throw new Error("Expected products to be an array.");
            }

            const productList = document.getElementById("productList");
            products.forEach(product => {
                const option = document.createElement("option");
                option.value = product.productName;
                option.textContent = product.productName;
                productList.appendChild(option);
            });
        })
        .catch(error => {
            console.error("Failed to fetch products:", error);
            document.getElementById("orderStatus").textContent = "Unable to load snacks.";
        });





    let orderItems = [];

    document.getElementById("addItem").addEventListener("click", function () {
        let productList = document.getElementById("productList");
        let quantity = document.getElementById("quantity").value;
        let selectedProduct = productList.options[productList.selectedIndex].text;

        if (selectedProduct && quantity > 0) {
            orderItems.push({ ProductName: selectedProduct, Quantity: parseInt(quantity) });

            // Display added items
            let orderItemsList = document.getElementById("orderItems");
            let newItem = document.createElement("li");
            newItem.innerText = `${selectedProduct} - Quantity: ${quantity}`;
            orderItemsList.appendChild(newItem);

            // Store JSON string for form submission
            document.getElementById("ItemsJson").value = JSON.stringify(orderItems);
        }
    });
});

