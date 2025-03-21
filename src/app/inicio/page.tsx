"use client";
import { useState } from "react";
import Image from "next/image";
import "../globals.css";

// Definimos la estructura del producto
interface Product {
  id: number;
  name: string;
  description: string;
  price: string;
  image: string;
  quantity: number; // Añadimos la cantidad al producto
}

export default function Inicio() {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [cart, setCart] = useState<Product[]>([]);
  const [zoom, setZoom] = useState<boolean>(false);
  const [zoomPosition, setZoomPosition] = useState<{ x: number; y: number }>({ x: 50, y: 50 });
  const [quantity, setQuantity] = useState<number>(1); // Variable para la cantidad seleccionada

  const products: Product[] = [
    { id: 1, name: "Camiseta Premium", description: "Camiseta de algodón orgánico con estampado exclusivo.", price: "29,99€", image: "/images/Backside T-Shirt Mockup.png", quantity: 1 },
    { id: 2, name: "Sudadera de Lujo", description: "Sudadera cómoda y elegante para cualquier ocasión.", price: "49,99€", image: "/images/Backside T-Shirt Mockup.png", quantity: 1 },
    { id: 3, name: "Pantalones Clásicos", description: "Pantalones de diseño moderno y versátil.", price: "39,99€", image: "/images/Backside T-Shirt Mockup.png", quantity: 1 },
    { id: 4, name: "Gorra Exclusiva", description: "Gorra de alta calidad con diseño único.", price: "19,99€", image: "/images/Backside T-Shirt Mockup.png", quantity: 1 }
  ];

  const openModal = (product: Product) => setSelectedProduct(product);
  const closeModal = () => {
    setSelectedProduct(null);
    setZoom(false);
  };

  const addToCart = (product: Product) => {
    const productWithQuantity = { ...product, quantity }; // Añadimos la cantidad seleccionada
    setCart((prevCart) => [...prevCart, productWithQuantity]);
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const { left, top, width, height } = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - left) / width) * 100;
    const y = ((e.clientY - top) / height) * 100;
    setZoomPosition({ x, y });
  };

  // Cerrar modal si clicamos fuera del contenido modal
  const handleOverlayClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      closeModal();
    }
  };

  // Función para actualizar la cantidad seleccionada
  const handleQuantityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newQuantity = Math.max(1, parseInt(e.target.value)); // Evita cantidades negativas o cero
    setQuantity(newQuantity);
  };

  return (
    <main>
      {/* HEADER */}
      <header className="header">
        <Image
          src="/images/Logo_pasteles_1.png"
          alt="Logo"
          width={50}
          height={50}
          className="logo"
          priority
        />
        <nav>
          <ul className="nav-links">
            <li><a href="/inicio">Inicio</a></li>
            <li><a href="#">Tienda</a></li>
            <li><a href="#">Nosotros</a></li>
            <li><a href="#">Contacto</a></li>
            <li className="relative">
              <a href="/carrito" className="flex items-center">
                🛒 <span className="ml-1">Carrito ({cart.length})</span>
              </a>
            </li>
          </ul>
        </nav>
      </header>

      {/* HERO SECTION */}
      <section className="hero">
        <div className="hero-content">
          <div className="hero-text">
            <h2>Descubre el estilo de 2CabrasConTraje</h2>
            <p>Moda exclusiva para quienes buscan algo único.</p>
            <p className="highlight">&quot;Rompe con la norma o ponle los cuernos&quot;</p>
            <a href="#" className="btn">Ver Colección</a>
          </div>
          <div className="hero-video">
            <video autoPlay muted loop playsInline className="w-full h-auto">
              <source src="/videos/Proyecto de vídeo 7.mp4" type="video/mp4" />
              Tu navegador no soporta video HTML5
            </video>
          </div>
        </div>
      </section>

      {/* PRODUCTOS DESTACADOS */}
      <section className="products">
        <h2 className="text-center text-3xl font-bold my-6">Nuestros Productos Destacados</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 p-4">
          {products.map((product) => (
            <div key={product.id} className="product-card bg-white p-4 rounded-lg shadow-md">
              <Image
                src={product.image}
                alt={product.name}
                width={300}
                height={300}
                className="cursor-pointer rounded-md transition-transform hover:scale-105"
                onClick={() => openModal(product)}
              />
              <h3 className="text-lg font-semibold mt-2">{product.name}</h3>
              <p className="text-gray-600">{product.price}</p>
              <button
                className="btn mt-3 w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700"
                onClick={() => openModal(product)}
              >
                Ver Producto
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* FOOTER */}
      <footer>
        <div className="social-links">
          <a href="#">Facebook</a>
          <a href="#">Instagram</a>
          <a href="#">Twitter</a>
        </div>
        <p>© 2025 2CabrasConTraje. Todos los derechos reservados.</p>
      </footer>

      {/* MODAL - Detalles del producto */}
      {selectedProduct && (
        <div className="fixed inset-0 flex justify-center items-center" onClick={handleOverlayClick}>
          {/* Contenedor del modal */}
          <div className="absolute bg-black bg-opacity-200 w-[80%] sm:w-[60%] h-[70%] sm:h-[80%] rounded-lg"></div>

          {/* Contenedor del modal */}
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-3xl w-full relative z-10 flex">
            <button onClick={closeModal} className="absolute top-4 right-4 text-2xl hover:text-red-800 hover:scale-120 transition-all duration-300 rounded-full p-1">✖</button>

            {/* Modal Content */}
            <div className="flex items-center space-x-6">
              {/* Imagen */}
              <div className="relative overflow-hidden group">
                <Image
                  src={selectedProduct.image}
                  alt={selectedProduct.name}
                  width={400}
                  height={400}
                  className={`rounded-md transition-transform duration-300 cursor-crosshair ${zoom ? "scale-[2]" : "scale-100"}`}
                  onMouseEnter={() => setZoom(true)}
                  onMouseLeave={() => setZoom(false)}
                  onMouseMove={handleMouseMove}
                  style={{
                    transformOrigin: `${zoomPosition.x}% ${zoomPosition.y}%`,
                  }}
                />
              </div>

              {/* Texto de producto */}
              <div className="flex flex-col space-y-4 w-1/2">
                <h2 className="text-2xl font-bold">{selectedProduct.name}</h2>
                <p className="text-gray-600">{selectedProduct.description}</p>
                <p className="text-xl font-bold">{selectedProduct.price}</p>

                {/* Campo de cantidad */}
                <div className="flex items-center space-x-4">
                  <label htmlFor="quantity" className="text-lg">Cantidad:</label>
                  <input
                    type="number"
                    id="quantity"
                    value={quantity}
                    onChange={handleQuantityChange}
                    min="1"
                    className="w-16 p-2 border rounded-md text-center"
                  />
                </div>

                <button
                  className="btn mt-4 bg-green-600 text-white py-2 rounded-md hover:bg-green-700"
                  onClick={() => addToCart(selectedProduct)}
                >
                  Añadir a la cesta 🛒
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
