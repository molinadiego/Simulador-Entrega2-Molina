let cart = [];
let tax = 0;
let priceTotal = 0;
let priceTotalWithTax = 0;
let priceWithDiscount = 0;

let products = [
	{
		id: 1,
		name: "Unanime",
		image: "images/unanime.webp",
		description: "Vino",
		price: 23,
		stock: 25,
	},
	{
		id: 2,
		name: "Catena Zapata",
		image: "images/catena-zapata.webp",
		description: "Vino",
		price: 34,
		stock: 25,
	},
	{
		id: 3,
		name: "Norton",
		image: "images/norton.webp",
		description: "Vino",
		price: 17,
		stock: 25,
	},
	{
		id: 4,
		name: "Phebus",
		image: "images/phebus.webp",
		description: "Vino",
		price: 10,
		stock: 25,
	},
	{
		id: 5,
		name: "Ed Edmundo",
		image: "images/ed-edmundo.webp",
		description: "Vino",
		price: 12,
		stock: 25,
	},
	{
		id: 6,
		name: "Chivas Regal 12 Years",
		image: "images/chivas12.webp",
		description: "Whisky",
		price: 40,
		stock: 25,
	},
	{
		id: 7,
		name: "Chivas Regal 18 Years",
		image: "images/chivas18.jpg",
		description: "Whisky",
		price: 165,
		stock: 25,
	},
	{
		id: 8,
		name: "Johnnie Walker Black Label",
		image: "images/johnnie-black.webp",
		description: "Whisky",
		price: 33,
		stock: 25,
	},
	{
		id: 9,
		name: "Johnnie Walker Green Label",
		image: "images/johnnie-green.webp",
		description: "Whisky",
		price: 61,
		stock: 25,
	},
	{
		id: 10,
		name: "Johnnie Walker Blue Label",
		image: "images/johnnie-blue.webp",
		description: "Whisky",
		price: 175,
		stock: 25,
	},
];

// Simulador entrega #1.
//const btnAddCart = document.querySelectorAll(".add-to-cart-btn");
const cartQty = document.querySelector(".cart-btn");
const cartBtn = document.querySelector(".cart-btn");
const txtSearch = document.getElementById("txtSearch");
const btnSearch = document.getElementById("btnSearch");

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

//Funcion eventlistener.
function setupEventListeners() {
	const productContainerVino = document.querySelector(".product-grid-vino");
	const productContainerWhisky = document.querySelector(".product-grid-whisky");
	const handleProductClick = (e) => {
		//verifico si el elemento clickeado es un boton agregar al carrito.
		if (e.target.classList.contains("add-to-cart-btn")) {
			const productCard = e.target.closest(".product-card");
			const productName =
				productCard.querySelector(".product-title").textContent;

			//llama a la funcion para llenar el carrito.
			const has = fillCart(productName, 1);
			if (has !== -1) {
				qty += 1;
				cartQty.textContent = "🛒 (" + qty + ")";
				localStorage.setItem("cart", JSON.stringify(cart));
				localStorage.setItem("products", JSON.stringify(products));
			}
			renderProducts(products);
		}
	};
	productContainerVino.addEventListener("click", handleProductClick);
	productContainerWhisky.addEventListener("click", handleProductClick);
}

//renderizando los productos.

function renderProducts(productsParam) {
	const productContainerVino = document.querySelector(".product-grid-vino");
	const productContainerWhisky = document.querySelector(".product-grid-whisky");
	productContainerVino.innerHTML = "";
	productContainerWhisky.innerHTML = "";

	productsParam.forEach((item) => {
		const img = document.createElement("img");
		img.setAttribute("src", item.image);
		img.setAttribute("alt", item.description + " " + item.name);

		const productCard = document.createElement("div");
		productCard.className = "product-card";

		const productInfo = document.createElement("div");
		productInfo.className = "product-info";

		const productName = document.createElement("h3");
		productName.className = "product-title";
		productName.textContent = item.name;

		const productDescription = document.createElement("p");
		productDescription.className = "product-description";
		productDescription.textContent = item.description;

		const productPrecio = document.createElement("p");
		productPrecio.className = "product-price";
		productPrecio.textContent = "$ " + item.price;

		const productStock = document.createElement("p");
		productStock.className = "product-stock";
		productStock.textContent = "Cantidad disponible: " + item.stock;

		const btnAddCart = document.createElement("button");
		btnAddCart.className = "add-to-cart-btn";
		btnAddCart.textContent = "Agregar al carrito";

		productInfo.appendChild(productName);
		productInfo.appendChild(productDescription);
		productInfo.appendChild(productPrecio);
		productInfo.appendChild(productStock);
		productInfo.appendChild(btnAddCart);

		productCard.appendChild(img);
		productCard.appendChild(productInfo);

		if (item.description === "Vino") {
			productContainerVino.appendChild(productCard);
		} else {
			productContainerWhisky.appendChild(productCard);
		}
	});
}

btnSearch.addEventListener("click", (e) => {
	const search = txtSearch.value;
	const productSearch = products.filter((item) =>
		item.name.toLowerCase().includes(search.toLowerCase())
	);
	txtSearch.value = "";
	renderProducts(productSearch);
});

cartBtn.addEventListener("click", () => {
	if (qty !== 0) {
		window.location.href = "cart.html";
		qty = 0;
		cartQty.textContent = "🛒 (" + qty + ")";
		cart = [];
	}
});

// Llama a esta función una vez al inicio de tu script
document.addEventListener("DOMContentLoaded", () => {
	// Asume que 'products' está cargado aquí
	renderProducts(products);
	setupEventListeners(); // Llama a la función para configurar el listener
});
