document.addEventListener("DOMContentLoaded", () => {

    document.getElementById("loadingSpinner").style.display = "block";

    const token = getAccessToken();
    if (!token) return;

    // Fetch orders from the API
    fetch("https://w7bvze42lk.execute-api.us-east-1.amazonaws.com/api/orders", {
        headers: { Authorization: `Bearer ${token}` }
    }).then(async res => {
        document.getElementById("loadingSpinner").style.display = "none";
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

        if (Array.isArray(orders)) {

            console.log("orders is:", orders);
            console.log("typeof orders:", typeof orders);
            console.log("Array.isArray(orders):", Array.isArray(orders));

            orders.forEach(order => {
                // Create a new row for each order
                const headerRow = document.createElement("tr");
                headerRow.innerHTML = `<td colspan="4"><strong>Order placed on ${new Date(order.orderDate).toLocaleString()}</strong></td>`;
                ordersTable.appendChild(headerRow);

                // Create a row for each item in the order
                order.forEach(item => {
                    let row = document.createElement("tr");
                    row.innerHTML = `
                <td>${item.productName}</td>
                <td>${item.quantity}</td>
                <td>${new Date(order.orderDate).toLocaleString()}</td>
                <td>${order.status}</td>
            `;
                    ordersTable.appendChild(row);
                });
            })
        }
    })
        .catch(error => {
            console.error("Failed to fetch orders:", error);
            document.getElementById("orderStatus").textContent = "Unable to load orders.";
        });
});