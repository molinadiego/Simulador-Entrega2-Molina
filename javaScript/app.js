//const TAX = 1.084;
//const DISCOUNT = 0.1;
let cart = [];
let tax = 0;
let priceTotal = 0;
let priceTotalWithTax = 0;
let priceWithDiscount = 0;

let products = [
	{
		id: 1,
		name: "Unanime",
		description: "Vino",
		price: 23,
		stock: 25,
	},
	{
		id: 2,
		name: "Catena Zapata",
		description: "Vino",
		price: 34,
		stock: 25,
	},
	{
		id: 3,
		name: "Norton",
		description: "Vino",
		price: 17,
		stock: 25,
	},
	{
		id: 4,
		name: "Phebus",
		description: "Vino",
		price: 10,
		stock: 25,
	},
	{
		id: 5,
		name: "Ed Edmundo",
		description: "Vino",
		price: 12,
		stock: 25,
	},
	{
		id: 6,
		name: "Chivas Regal 12 Years",
		description: "Whisky",
		price: 40,
		stock: 25,
	},
	{
		id: 7,
		name: "Chivas Regal 18 Years",
		description: "Whisky",
		price: 165,
		stock: 25,
	},
	{
		id: 8,
		name: "Johnnie Walker Black Label",
		description: "Whisky",
		price: 33,
		stock: 25,
	},
	{
		id: 9,
		name: "Johnnie Walker Green Label",
		description: "Whisky",
		price: 61,
		stock: 25,
	},
	{
		id: 10,
		name: "Johnnie Walker Blue Label",
		description: "Whisky",
		price: 175,
		stock: 25,
	},
];

// Simulador entrega #1.
const btnAddCart = document.querySelectorAll(".add-to-cart-btn");
const cartQty = document.querySelector(".cart-btn");
const cartBtn = document.querySelector(".cart-btn");
let qty = 0;

getproductsFromStorage();
getCartFromStorage();

function getproductsFromStorage() {
	const productsFromStorage = localStorage.getItem("products");
	if (productsFromStorage) {
		products = JSON.parse(productsFromStorage);
	}
}

function getCartFromStorage() {
	const cartFromStorage = localStorage.getItem("cart");

	if (cartFromStorage) {
		cart = JSON.parse(cartFromStorage);
		for (item of cart) {
			qty = item.quantity + qty;
		}
		cartQty.textContent = "🛒 (" + qty + ")";
	}
}

cartBtn.addEventListener("click", () => {
	if (qty !== 0) {
		window.open("./cart.html");
		qty = 0;
		cartQty.textContent = "🛒 (" + qty + ")";
		cart = [];
	}
});

btnAddCart.forEach((btn) => {
	btn.addEventListener("click", (e) => {
		const productSeleted = e.target.closest(".product-card");
		const productName =
			productSeleted.querySelector(".product-title").textContent;
		const has = fillCart(productName, 1);
		if (has !== -1) {
			qty += 1;
			cartQty.textContent = "🛒 (" + qty + ")";
			localStorage.setItem("cart", JSON.stringify(cart));
			localStorage.setItem("products", JSON.stringify(products));
		}
	});
});

/**
 *
 * @param {Array} products
 */
function listProducts(products) {
	console.log("***** LISTA DE PRODUCTOS *****");
	for (let product of products) {
		console.log(
			`ID ${product.id} -- ${product.description} -- ${product.name} -- U$S ${product.price} -- STOCK ${product.stock}`
		);
	}
}

/**
 *
 * @param {Array} products
 */
function listProductsPrompt(products) {
	let lista = "";
	lista = lista + "***** LISTA DE PRODUCTOS *****\n";
	for (let product of products) {
		lista =
			lista +
			`ID ${product.id} -- ${product.description} -- ${product.name} -- U$S ${product.price} -- STOCK ${product.stock}\n`;
	}
	return lista;
}

/**
 *
 * @param {Array} cart
 */
function listCart(cart) {
	console.log("***** LISTA DEL CARRITO *****");
	for (let item of cart) {
		console.log(
			`Producto - ${item.description} -- ${item.name} -- Qty- ${item.quantity} -- Precio Unidad - ${item.price} -- Precio total -${item.totalprice}`
		);
	}
}

/**
 *
 * @param {String} name
 * @param {Number} quantity
 */
function fillCart(name, quantity) {
	const exist = cart.some((item) => item.name === name);
	const product = products.find((product) => product.name === name);
	if (product === undefined) {
		alert("Codigo de producto no encontrado.");
		return;
	}
	if (exist && product.stock >= quantity) {
		const productExist = cart.find((product) => product.name === name);
		productExist.quantity += quantity;
		productExist.totalprice = productExist.price * productExist.quantity;
		product.stock = product.stock - quantity;
		return;
	}

	if (product.stock >= quantity) {
		let description = product.description;
		let name = product.name;
		let price = product.price;
		let totalprice = price * quantity;
		cart.push({
			description: description,
			name: name,
			quantity: quantity,
			price: price,
			totalprice: totalprice,
		});
		product.stock = product.stock - quantity;
	} else {
		alert("Transaccion cancelada. no tenemos suficientes productos.");
		return -1;
	}
}

/*
function ticket(cart) {
	let productQty = 0;
	let groceryList = "***** Ticket *****\n";
	for (let item of cart) {
		groceryList += `\n${item.quantity} - ${item.name} - Unidad $:${item.price} - Total $:${item.totalprice}`;
		productQty += item.quantity;
		priceTotal += item.totalprice;
	}
	groceryList += `\n Precio total de la compra sin TAX. : $ ${priceTotal}`;
	priceTotalWithTax = plusTax(priceTotal, TAX);
	groceryList += `\n Precio total con 8.4% del TAX.     : $ ${priceTotalWithTax.toFixed(
		2
	)}`;
	if (productQty >= 5) {
		priceWithDiscount = applyDiscount(priceTotalWithTax, DISCOUNT);
		groceryList += `\n Descuento de 10% (5 productos o mas) -- Total a pagar $:${priceWithDiscount.toFixed(
			2
		)}`;
	}
	return groceryList;
}
*/
/*
/**
 *
 * @param {Number} priceTotal
 * @param {Number} TAX
 * @returns {Number}

*/
/*
const plusTax = (priceTotal, TAX) => {
	return priceTotal * TAX;
};
*/
/*
/**
 *
 * @param {Number} priceTotalWithTax
 * @param {Number} DISCOUNT
 * @returns
 * 
 */
/*
const applyDiscount = (priceTotalWithTax, DISCOUNT) => {
	return priceTotalWithTax - priceTotalWithTax * DISCOUNT;
};

*/
