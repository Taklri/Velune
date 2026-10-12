import { useEffect, useState } from 'react';
import { BrowserRouter, Navigate, Route, Routes, useLocation } from 'react-router-dom';
import Topbar from './components/Topbar';
import SiteFooter from './components/SiteFooter';
import HomePage from './pages/HomePage';
import CollectionsPage from './pages/Collections';
import ProductDetailsPage from './pages/ProductDetails';
import BagPage from './pages/Bag';
import CheckoutPage from './pages/Checkout';
import noirImage from './assets/products/image 3.jpg';
import solaraImage from './assets/products/image 4.jpg';
import roseEclatImage from './assets/products/image 5.jpg';
import verdantImage from './assets/products/image 6.jpg';
import blancheImage from './assets/products/image 7.jpg';
import boisAmbreImage from './assets/products/image 8.jpg';
import citrisVerteImage from './assets/products/image 9.jpg';
import rivageImage from './assets/products/image 10.jpg';
import { getCartItems, getSubtotal } from './lib/store';
import './App.css';

const startingProducts = [
  { id: 1, name: 'NOIR Nº 04', price: 4999, category: 'Woody', description: 'A dark and sophisticated woody fragrance.', fullDescription: 'A deeper expression of time and memory. Smoked woods meet a soft, warm finish in a fragrance made for evenings that linger.', stock: 12, image: noirImage },
  { id: 2, name: 'RIVAGE', price: 4599, category: 'Fresh', description: 'A luminous scent inspired by the movement of the coast.', fullDescription: 'Bright, clear, and quietly sensual. Rivage captures the cool air along the shoreline with a fresh opening and a smooth, mineral finish.', stock: 8, image: rivageImage },
  { id: 3, name: 'ROSÉ ÉCLAT', price: 4999, category: 'Floral', description: 'Radiant rose softened by warm, elegant woods.', fullDescription: 'A modern floral with a confident point of view. Luminous rose petals settle into warm woods for a finish that feels refined rather than sweet.', stock: 7, image: roseEclatImage },
  { id: 4, name: 'VERDANT Nº 03', price: 4599, category: 'Green', description: 'A vibrant green fragrance with citrus leaves and botanicals.', fullDescription: 'Crisp green leaves and vivid citrus create an impression of open air and fresh beginnings. A clean, composed scent for everyday wear.', stock: 15, image: verdantImage },
  { id: 5, name: 'BLANCHE Nº 01', price: 4599, category: 'Floral', description: 'A clean, luminous floral with a soft and airy finish.', fullDescription: 'Light moves through delicate white florals in this quiet, graceful composition. Blanche leaves a soft impression close to the skin.', stock: 10, image: blancheImage },
  { id: 6, name: 'BOIS AMBRÉ', price: 4999, category: 'Woody', description: 'Warm ambered woods with a deep, resinous character.', fullDescription: 'A generous blend of amber warmth and dark woods. Bois Ambré is enveloping and polished, with a lasting presence for the evening.', stock: 6, image: boisAmbreImage },
  { id: 7, name: 'CITRIS VERTE', price: 4599, category: 'Citrus', description: 'Bright citrus layered with green leaves and blossoms.', fullDescription: 'Fresh citrus and green leaves create a sparkling first impression, softened by delicate blossoms. Lively, balanced, and easy to wear.', stock: 9, image: citrisVerteImage },
  { id: 8, name: 'SOLARA', price: 4599, category: 'Citrus', description: 'Sunlit citrus blended with smooth, delicate spice.', fullDescription: 'A warm, golden fragrance that pairs bright citrus with a gentle trace of spice. Solara brings the ease of late afternoon into every season.', stock: 13, image: solaraImage },
];

function ScrollToTop() {
  const location = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'auto' });
  }, [location.pathname]);

  return null;
}

function App() {
  const [products, setProducts] = useState(startingProducts);
  const [bag, setBag] = useState([]);
  const [orders, setOrders] = useState([]);

  const addToBag = (productId, quantity = 1) => {
    const product = products.find((item) => item.id === Number(productId));
    if (!product || product.stock < 1) return;

    setBag((currentBag) => {
      const existingItem = currentBag.find((item) => item.productId === product.id);
      if (existingItem) {
        return currentBag.map((item) =>
          item.productId === product.id
            ? { ...item, quantity: Math.min(product.stock, item.quantity + quantity) }
            : item,
        );
      }
      return [...currentBag, { productId: product.id, quantity: Math.min(product.stock, quantity) }];
    });
  };

  const updateBagQuantity = (productId, quantity) => {
    const product = products.find((item) => item.id === Number(productId));
    if (!product) return;
    setBag((currentBag) =>
      currentBag
        .map((item) =>
          item.productId === product.id
            ? { ...item, quantity: Math.min(product.stock, Math.max(1, quantity)) }
            : item,
        )
        .filter((item) => item.quantity > 0),
    );
  };

  const removeFromBag = (productId) => {
    setBag((currentBag) => currentBag.filter((item) => item.productId !== Number(productId)));
  };

  const placeOrder = (customer) => {
    if (bag.length === 0) return null;
    const items = getCartItems(products, bag).map(({ product, quantity }) => ({
      productId: product.id,
      name: product.name,
      price: product.price,
      quantity,
      image: product.image,
    }));
    const order = {
      id: 'VL-' + String(orders.length + 1).padStart(4, '0'),
      customer,
      items,
      total: getSubtotal(products, bag),
      paymentMethod: 'Cash on Delivery',
      placedAt: new Date().toISOString(),
    };

    setOrders((currentOrders) => [...currentOrders, order]);
    setProducts((currentProducts) =>
      currentProducts.map((product) => {
        const orderedItem = bag.find((item) => item.productId === product.id);
        return orderedItem
          ? { ...product, stock: Math.max(0, product.stock - orderedItem.quantity) }
          : product;
      }),
    );
    setBag([]);
    return order;
  };

  const bagCount = bag.reduce((count, item) => count + item.quantity, 0);

  return (
    <BrowserRouter>
      <ScrollToTop />
      <Topbar bagCount={bagCount} />
      <Routes>
        <Route path="/" element={<Navigate to="/home" replace />} />
        <Route path="/home" element={<HomePage products={products} onAddToBag={addToBag} />} />
        <Route path="/collections" element={<CollectionsPage products={products} onAddToBag={addToBag} />} />
        <Route path="/products/:productId" element={<ProductDetailsPage products={products} onAddToBag={addToBag} />} />
        <Route
          path="/your-bag"
          element={<BagPage products={products} bag={bag} onUpdateQuantity={updateBagQuantity} onRemove={removeFromBag} />}
        />
        <Route path="/check-out" element={<CheckoutPage products={products} bag={bag} onPlaceOrder={placeOrder} />} />
        <Route path="*" element={<Navigate to="/home" replace />} />
      </Routes>
      <SiteFooter />
    </BrowserRouter>
  );
}

export default App;
