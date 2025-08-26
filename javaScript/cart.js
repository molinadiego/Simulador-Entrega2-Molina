const TAX = 1.084;
const DISCOUNT = 0.1;

const plusTax = (priceTotal, TAX) => priceTotal * TAX;
const applyDiscount = (priceTotalWithTax, DISCOUNT) =>
	priceTotalWithTax * (1 - DISCOUNT);

/**
 * Calcula el ticket de la compra.
 * @param {Array} cart - El array del carrito.
 * @returns {object} - Un objeto con los totales de la compra.
 */
function calculateTicket(cart) {
	let priceTotal = 0;
	let productQty = 0;

	for (const item of cart) {
		priceTotal += item.totalprice;
		productQty += item.quantity;
	}

	const priceTotalWithTax = plusTax(priceTotal, TAX);
	let priceWithDiscount = priceTotalWithTax;

	if (productQty >= 5) {
		priceWithDiscount = applyDiscount(priceTotalWithTax, DISCOUNT);
	}

	return {
		priceTotal: priceTotal.toFixed(2),
		priceTotalWithTax: priceTotalWithTax.toFixed(2),
		priceWithDiscount: priceWithDiscount.toFixed(2),
		productQty: productQty,
	};
}

const btnBack = document.getElementById("btnBack");
btnBack.addEventListener("click", () => localStorage.removeItem("cart"));

/**
 * Función principal para renderizar el carrito en la página
 */
function renderCart() {
	const cartItemsContainer = document.getElementById("cart-items");
	const cartSummaryContainer = document.getElementById("cart-summary");

	const cartFromStorage = localStorage.getItem("cart");
	let cart = cartFromStorage ? JSON.parse(cartFromStorage) : [];

	// Limpia el contenedor para evitar duplicados
	cartItemsContainer.innerHTML = "";

	if (cart.length === 0) {
		cartItemsContainer.innerHTML = "<p>Tu carrito está vacío.</p>";
		cartSummaryContainer.innerHTML = "";
		return;
	}

	// Muestra los productos en el HTML
	cart.forEach((item) => {
		const itemDiv = document.createElement("div");
		itemDiv.className = "cart-item";
		itemDiv.innerHTML = `
            <span>${item.quantity} x ${item.name} ($${item.price.toFixed(
			2
		)})</span>
            <span>Total: $${item.totalprice.toFixed(2)}</span>
        `;
		cartItemsContainer.appendChild(itemDiv);
	});

	// Calcula y muestra el resumen de la compra
	const summary = calculateTicket(cart);
	let summaryHTML = `<p><strong>Precio Total:</strong> $${summary.priceTotal}</p>`;
	summaryHTML += `<p><strong>Total con Impuestos (8.4%):</strong> $${summary.priceTotalWithTax}</p>`;

	if (summary.productQty >= 5) {
		summaryHTML += `<p><strong>Total a Pagar (con 10% de descuento):</strong> $${summary.priceWithDiscount}</p>`;
	}

	cartSummaryContainer.innerHTML = summaryHTML;
}

// Llama a la función `renderCart` cuando la página se carga
document.addEventListener("DOMContentLoaded", renderCart);
