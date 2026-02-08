// Product objects
const products = [
    { id: 1, name: "Laptop", price: 999.99, image: "💻" },
    { id: 2, name: "Phone", price: 699.99, image: "📱" },
    { id: 3, name: "Headphones", price: 199.99, image: "🎧" },
    { id: 4, name: "Keyboard", price: 149.99, image: "⌨️" },
    { id: 5, name: "Mouse", price: 49.99, image: "🖱️" },
    { id: 6, name: "Monitor", price: 399.99, image: "🖥️" }
];

// Cart array to store cart items
let cart = [];

// Display products
function displayProducts() {
    const productsContainer = document.getElementById("products");
    productsContainer.innerHTML = "";
    
    products.forEach(product => {
        const productDiv = document.createElement("div");
        productDiv.className = "product-card";
        productDiv.innerHTML = `
            <div class="product-icon">${product.image}</div>
            <h3>${product.name}</h3>
            <p class="price">$${product.price.toFixed(2)}</p>
            <button onclick="addToCart(${product.id})">Add to Cart</button>
        `;
        productsContainer.appendChild(productDiv);
    });
}

// Add item to cart
function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    const cartItem = cart.find(item => item.id === productId);
    
    if (cartItem) {
        cartItem.quantity++;
    } else {
        cart.push({
            id: product.id,
            name: product.name,
            price: product.price,
            quantity: 1,
            image: product.image
        });
    }
    
    updateCart();
}

// Remove item from cart
function removeFromCart(productId) {
    cart = cart.filter(item => item.id !== productId);
    updateCart();
}

// Update quantity
function updateQuantity(productId, change) {
    const cartItem = cart.find(item => item.id === productId);
    
    if (cartItem) {
        cartItem.quantity += change;
        
        if (cartItem.quantity <= 0) {
            removeFromCart(productId);
        } else {
            updateCart();
        }
    }
}

// Update cart display
function updateCart() {
    const cartContainer = document.getElementById("cart");
    const totalElement = document.getElementById("total");
    
    if (cart.length === 0) {
        cartContainer.innerHTML = "<p class='empty-cart'>Your cart is empty</p>";
        totalElement.textContent = "0.00";
        return;
    }
    
    cartContainer.innerHTML = "";
    let total = 0;
    
    cart.forEach(item => {
        const itemTotal = item.price * item.quantity;
        total += itemTotal;
        
        const cartItemDiv = document.createElement("div");
        cartItemDiv.className = "cart-item";
        cartItemDiv.innerHTML = `
            <div class="item-icon">${item.image}</div>
            <div class="item-details">
                <h4>${item.name}</h4>
                <p class="item-price">$${item.price.toFixed(2)}</p>
            </div>
            <div class="quantity-controls">
                <button onclick="updateQuantity(${item.id}, -1)">-</button>
                <span class="quantity">${item.quantity}</span>
                <button onclick="updateQuantity(${item.id}, 1)">+</button>
            </div>
            <div class="item-total">
                <p>$${itemTotal.toFixed(2)}</p>
                <button onclick="removeFromCart(${item.id})" class="remove-btn">Remove</button>
            </div>
        `;
        cartContainer.appendChild(cartItemDiv);
    });
    
    totalElement.textContent = total.toFixed(2);
}

// Clear cart
function clearCart() {
    if (cart.length === 0) {
        alert("Cart is already empty!");
        return;
    }
    
    if (confirm("Are you sure you want to clear the cart?")) {
        cart = [];
        updateCart();
    }
}

// Initialize
displayProducts();
updateCart();
