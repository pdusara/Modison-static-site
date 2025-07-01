document.addEventListener("DOMContentLoaded", () => {
    const token = getAccessToken();
    console.log("Token:", token);

    if (!token) return;

    fetch("https://8f3bppntic.execute-api.us-east-1.amazonaws.com/api/products", {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
        .then(res => {
            console.log("Status:", res.status);
            return res.json();
        })
        .then(products => {
            const productList = document.getElementById("productList");
            products.forEach(product => {
                const option = document.createElement("option");
                option.value = product.ProductName;
                option.textContent = product.ProductName;
                productList.appendChild(option);
            });
        })
        .catch(error => {
            console.error("Failed to fetch products:", error);
            document.getElementById("orderStatus").textContent = "Unable to load snacks.";
        });
});