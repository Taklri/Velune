import { useState } from 'react';
import PropTypes from 'prop-types';
import { ArrowLeft, Minus, Plus, ShoppingBag } from 'lucide-react';
import { Link, useParams } from 'react-router-dom';
import { Button } from '../components/ui/button';
import { formatPrice } from '../lib/store';

function ProductDetailsPage({ products, onAddToBag }) {
  const { productId } = useParams();
  const product = products.find((item) => item.id === Number(productId));
  const [quantity, setQuantity] = useState(1);

  if (!product) {
    return (
      <main className="page-shell not-found-page">
        <p className="eyebrow">A scent not found</p>
        <h1>This page has drifted away.</h1>
        <Link className="text-link" to="/collections">Return to the collection <ArrowLeft size={16} /></Link>
      </main>
    );
  }

  const changeQuantity = (amount) => {
    setQuantity((current) => Math.max(1, Math.min(product.stock, current + amount)));
  };

  return (
    <main className="page-shell product-detail-page">
      <Link className="back-link" to="/collections"><ArrowLeft size={15} /> Back to collection</Link>
      <div className="product-detail-layout">
        <div className="product-detail-image-wrap">
          <img className="product-detail-image" src={product.image} alt={product.name} />
          <span className="detail-image-caption">VELUNE — PARFUMS</span>
        </div>
        <div className="product-detail-copy">
          <p className="eyebrow">{product.category} fragrance</p>
          <h1>{product.name}</h1>
          <p className="detail-price">{formatPrice(product.price)}</p>
          <div className="detail-rule" />
          <p className="detail-description">{product.fullDescription}</p>
          <div className="detail-availability">
            <span className={product.stock > 0 ? 'stock-dot' : 'stock-dot stock-dot-empty'} />
            {product.stock > 0
              ? product.stock <= 3
                ? 'Only ' + product.stock + ' remaining'
                : 'In stock — ' + product.stock + ' available'
              : 'Currently unavailable'}
          </div>
          {product.stock > 0 && (
            <>
              <div className="detail-purchase-row">
                <div className="quantity-control" aria-label="Choose quantity">
                  <Button variant="ghost" size="icon" onClick={() => changeQuantity(-1)} disabled={quantity <= 1} aria-label="Decrease quantity">
                    <Minus size={15} />
                  </Button>
                  <span aria-live="polite">{quantity}</span>
                  <Button variant="ghost" size="icon" onClick={() => changeQuantity(1)} disabled={quantity >= product.stock} aria-label="Increase quantity">
                    <Plus size={15} />
                  </Button>
                </div>
                <Button className="detail-add-button" size="large" onClick={() => onAddToBag(product.id, quantity)}>
                  <ShoppingBag size={17} /> Add to bag
                </Button>
              </div>
            </>
          )}
          <div className="detail-note">
            <span className="eyebrow">The composition</span>
            <p>{product.description}</p>
          </div>
        </div>
      </div>
    </main>
  );
}

ProductDetailsPage.propTypes = {
  onAddToBag: PropTypes.func.isRequired,
  products: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
      price: PropTypes.number.isRequired,
      category: PropTypes.string.isRequired,
      description: PropTypes.string.isRequired,
      fullDescription: PropTypes.string.isRequired,
      stock: PropTypes.number.isRequired,
      image: PropTypes.string.isRequired,
    }),
  ).isRequired,
};

export default ProductDetailsPage;
