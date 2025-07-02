document.addEventListener("DOMContentLoaded", () => {
    // Populate product list from API  
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


    // Add event listener for adding items to the order        
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

    // Handle order submission
    document.getElementById("orderForm").addEventListener("submit", function (e) {
        e.preventDefault();
        document.getElementById("orderForm").querySelector("button[type='submit']").disabled = true;

        if (!token) {
            document.getElementById("orderStatus").textContent = "Please sign in first.";
            return;
        }

        const customerName = document.getElementById("customerName").value;
        const itemsJson = document.getElementById("ItemsJson").value;

        if (!customerName || !itemsJson) {
            document.getElementById("orderStatus").textContent = "Please complete the order form.";
            return;
        }

        const payload = {
            order: {
                customerName: customerName
            },
            itemsJson: itemsJson
        };

        fetch("https://w7bvze42lk.execute-api.us-east-1.amazonaws.com/api/orders", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            },
            body: JSON.stringify(payload)
        })
            .then(res => {
                if (!res.ok) {
                    return res.text().then(text => { throw new Error(text); });
                }
                // Optional: show confirmation before redirect
                document.getElementById("orderStatus").textContent = "Order placed. Redirecting...";
                setTimeout(() => {
                    window.location.href = "CustomerOrderList.html";
                }, 1000);
            })
            .catch(err => {
                console.error(err);
                document.getElementById("orderStatus").textContent = "Failed to place order: " + err.message;
            });
    });
});

