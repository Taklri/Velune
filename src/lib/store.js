export const formatPrice = (amount) =>
  new Intl.NumberFormat('en-PH', {
    style: 'currency',
    currency: 'PHP',
    maximumFractionDigits: 0,
  }).format(amount);

export const getCartItems = (products, bag) =>
  bag
    .map((item) => ({
      ...item,
      product: products.find((product) => product.id === item.productId),
    }))
    .filter((item) => item.product);

export const getSubtotal = (products, bag) =>
  getCartItems(products, bag).reduce((total, item) => total + item.product.price * item.quantity, 0);
