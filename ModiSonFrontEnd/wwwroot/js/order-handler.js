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
});