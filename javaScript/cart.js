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

function getCartFromStorage() {
	const cartFromStorage = localStorage.getItem("cart");
	let cart = cartFromStorage ? JSON.parse(cartFromStorage) : [];
}

const btnBack = document.getElementById("btnBack");
btnBack.addEventListener("click", () => {
	if (btnBack.textContent !== "Salir") {
		localStorage.removeItem("cart");
	}
});

/**
 * Función principal para renderizar el carrito en la página
 */
function renderCart() {
	const cartItemsContainer = document.getElementById("cart-items");
	const cartSummaryContainer = document.getElementById("cart-summary");

	// Obtener los datos del carrito de `localStorage` de manera local para la función
	const cartFromStorage = localStorage.getItem("cart");
	// Si no hay nada, el carrito es un array vacío
	const cart = cartFromStorage ? JSON.parse(cartFromStorage) : [];

	// Limpia el contenedor para evitar duplicados
	cartItemsContainer.innerHTML = "";

	if (cart.length === 0) {
		cartItemsContainer.innerHTML = "<p>Tu carrito está vacío.</p>";
		cartSummaryContainer.innerHTML = "";
		btnBack.textContent = "Salir";
		localStorage.removeItem(cart);
		return;
	}

	// Muestra los productos en el HTML
	cart.forEach((item) => {
		// Crea el contenedor principal del ítem
		const itemDiv = document.createElement("div");
		itemDiv.className = "cart-item";

		// Crea los elementos para los detalles del producto de forma segura
		const detailsSpan = document.createElement("span");
		detailsSpan.textContent = `${item.quantity} x ${
			item.name
		} ($${item.price.toFixed(2)})`;

		const totalSpan = document.createElement("span");
		totalSpan.textContent = `Total: $${item.totalprice.toFixed(2)}`;

		const btnDelete = document.createElement("button");
		btnDelete.textContent = "X";
		btnDelete.className = "btn-Delete";
		btnDelete.setAttribute("data-name", item.name);
		btnDelete.setAttribute("data-qty", item.quantity);

		itemDiv.appendChild(detailsSpan);
		itemDiv.appendChild(totalSpan);
		itemDiv.appendChild(btnDelete);

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

	// Lógica para el botón de eliminar
	const deleteButtons = document.querySelectorAll(".btn-Delete");
	deleteButtons.forEach((button) => {
		button.addEventListener("click", (e) => {
			const itemRemove = e.target.getAttribute("data-name");
			const itemQty = e.target.getAttribute("data-qty");

			// Obtener el estado actual del carrito
			let Cart = JSON.parse(localStorage.getItem("cart"));
			let products = JSON.parse(localStorage.getItem("products"));

			//vuelvo a sumar los productos eliminados del carrito al stock.
			let product = products.find((item) => item.name === itemRemove);
			product.stock = product.stock + parseInt(itemQty);

			// Filtrar el carrito para eliminar el ítem
			Cart = Cart.filter((item) => item.name !== itemRemove);

			// Guardar el carrito actualizado
			localStorage.setItem("cart", JSON.stringify(Cart));
			localStorage.setItem("products", JSON.stringify(products));

			// Volver a renderizar la vista
			renderCart();
		});
	});
}

// Llama a la función `renderCart` cuando la página se carga
document.addEventListener("DOMContentLoaded", renderCart);
