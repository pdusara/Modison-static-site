document.addEventListener("DOMContentLoaded", () => {

    const token = getAccessToken();
    if (!token) return;

    // Fetch orders from the API
    fetch("https://w7bvze42lk.execute-api.us-east-1.amazonaws.com/api/orders", {
        headers: { Authorization: `Bearer ${token}` }
    }).then(async res => {
        if (!res.ok) {
            const errorBody = await res.text();
            throw new Error(`HTTP ${res.status}: ${errorBody}`);
        }

        const orders = await res.json();
        const ordersTable = document.getElementById("ordersTable");

        if (orders.length === 0) {
            document.getElementById("noOrders").style.display = "block";
            return;
        }

        orders.forEach(order => {
            order.Items.forEach(item => {
                let row = document.createElement("tr");
                row.innerHTML = `
                <td>${item.ProductName}</td>
                <td>${item.Quantity}</td>
                <td>${new Date(order.OrderDate).toLocaleString()}</td>
                <td>${order.Status}</td>
            `;

                ordersTable.appendChild(row);
            });
        })
    })
        .catch(error => {
            console.error("Failed to fetch orders:", error);
            document.getElementById("orderStatus").textContent = "Unable to load orders.";
        });
});