let items = [];

const itemsDiv = document.getElementById("items")
const input = document.getElementById("itemInput")
const storageKey = "items";

function renderItems() {
    itemsDiv.innerHTML = null;

    for (const [idx, item] of Object.entries(items)) {
        const container = document.createElement("div")
        container.style.marginBottom = "10px"
        container.style.display = "flex"
        container.style.justifyContent = "center"
        container.style.alignItems = "center"
        
        const text = document.createElement("p")
        text.style.display = "inline"
        text.style.marginRight = "10px"
        text.textContent = item;
        text.style.color = "white"
        text.prepend(">      ")

        const button = document.createElement("button")
        button.onclick = () => removeItem(idx)
        button.textContent = "Delete"
        button.style.display = "none"; // Hide the button by default

        container.addEventListener("mouseover", () => {
          button.style.display = "block"; // Show the button when hovering over the text
        });
    
        container.addEventListener("mouseout", () => {
          button.style.display = "none"; // Hide the button when not hovering over the text
        });
    
        

        container.appendChild(text)
        container.appendChild(button)
        
        itemsDiv.appendChild(container)
    }
}

function loadItems() {
    const oldItems = localStorage.getItem(storageKey)
    if (oldItems) items = JSON.parse(oldItems)
    renderItems()
}

function saveItems() {
    const stringItems = JSON.stringify(items);
    localStorage.setItem(storageKey, stringItems)
}


function addItem() {
    const value = input.value;
    if (!value) {
        alert("You cannot add an empty item")
        return
    }
    items.push(value)
    renderItems()
    input.value = ""
    saveItems()
}

function removeItem(idx) {
    items.splice(idx, 1)
    renderItems()
    saveItems()
}

document.addEventListener("DOMContentLoaded", loadItems)