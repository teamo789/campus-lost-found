const form = document.getElementById("itemForm");
const container = document.getElementById("itemsContainer");
const search = document.getElementById("search");

let items = JSON.parse(localStorage.getItem("items")) || [];

function displayItems(list = items) {
    container.innerHTML = "";

    list.forEach((item, index) => {
        const card = document.createElement("div");

        card.className = "item-card";

        card.innerHTML = `
            <h3>${item.name}</h3>
            <p>${item.description}</p>
            <p>📍 ${item.location}</p>
            <p class="status">${item.status}</p>
            <button onclick="deleteItem(${index})">Delete</button>
        `;

        container.appendChild(card);
    });
}

form.addEventListener("submit", function(event) {
    event.preventDefault();

    const item = {
        name: document.getElementById("itemName").value,
        location: document.getElementById("location").value,
        status: document.getElementById("status").value,
        description: document.getElementById("description").value
    };

    items.unshift(item);

    localStorage.setItem("items", JSON.stringify(items));

    form.reset();
    displayItems();
});

function deleteItem(index) {
    items.splice(index, 1);

    localStorage.setItem("items", JSON.stringify(items));

    displayItems();
}

search.addEventListener("input", function() {
    const query = search.value.toLowerCase();

    const filtered = items.filter(item =>
        item.name.toLowerCase().includes(query)
    );

    displayItems(filtered);
});

displayItems();