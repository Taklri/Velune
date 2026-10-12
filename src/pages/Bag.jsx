import PropTypes from 'prop-types';
import { ArrowRight, Minus, Plus, ShoppingBag, X } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '../components/ui/button';
import { Card } from '../components/ui/card';
import { formatPrice, getCartItems, getSubtotal } from '../lib/store';

function BagPage({ products, bag, onUpdateQuantity, onRemove }) {
  const items = getCartItems(products, bag);
  const subtotal = getSubtotal(products, bag);

  return (
    <main className="page-shell bag-page">
      <div className="page-heading-row">
        <div>
          <p className="eyebrow">Your selection</p>
          <h1>Your bag<span className="heading-period">.</span></h1>
        </div>
        <p className="bag-heading-count">{bag.reduce((count, item) => count + item.quantity, 0)} pieces</p>
      </div>

      {items.length === 0 ? (
        <section className="empty-state">
          <div className="empty-state-icon"><ShoppingBag size={22} strokeWidth={1.4} /></div>
          <p className="eyebrow">Nothing just yet</p>
          <h2>Your bag is waiting.</h2>
          <p>Find a fragrance that feels like yours.</p>
          <Button to="/collections" size="large">Explore the collection <ArrowRight size={16} /></Button>
        </section>
      ) : (
        <div className="bag-layout">
          <section className="bag-items" aria-label="Items in your bag">
            {items.map(({ product, quantity }) => (
              <Card className="bag-item" key={product.id}>
                <Link className="bag-item-image-link" to={'/products/' + product.id}>
                  <img src={product.image} alt={product.name} />
                </Link>
                <div className="bag-item-info">
                  <p className="eyebrow">{product.category}</p>
                  <Link className="bag-item-name" to={'/products/' + product.id}>{product.name}</Link>
                  <p className="bag-item-description">{product.description}</p>
                  <div className="bag-item-bottom">
                    <div className="quantity-control quantity-control-small">
                      <Button variant="ghost" size="icon" onClick={() => onUpdateQuantity(product.id, quantity - 1)} disabled={quantity <= 1} aria-label={'Decrease ' + product.name + ' quantity'}>
                        <Minus size={14} />
                      </Button>
                      <span aria-live="polite">{quantity}</span>
                      <Button variant="ghost" size="icon" onClick={() => onUpdateQuantity(product.id, quantity + 1)} disabled={quantity >= product.stock} aria-label={'Increase ' + product.name + ' quantity'}>
                        <Plus size={14} />
                      </Button>
                    </div>
                    <span className="bag-item-total">{formatPrice(product.price * quantity)}</span>
                  </div>
                </div>
                <Button
                  className="remove-item"
                  variant="ghost"
                  size="icon"
                  onClick={() => onRemove(product.id)}
                  aria-label={'Remove ' + product.name + ' from bag'}
                >
                  <X size={17} />
                </Button>
              </Card>
            ))}
            <Link className="continue-shopping" to="/collections">Continue exploring <ArrowRight size={15} /></Link>
          </section>

          <Card className="summary-card">
            <p className="eyebrow">Order summary</p>
            <h2>A considered choice.</h2>
            <div className="summary-line"><span>Subtotal</span><span>{formatPrice(subtotal)}</span></div>
            <div className="summary-total"><span>Total</span><span>{formatPrice(subtotal)}</span></div>
            <Button to="/check-out" size="large" className="summary-checkout">Continue to checkout <ArrowRight size={16} /></Button>
            <p className="summary-note">Payment is collected upon delivery.</p>
          </Card>
        </div>
      )}
    </main>
  );
}

BagPage.propTypes = {
  bag: PropTypes.arrayOf(
    PropTypes.shape({
      productId: PropTypes.number.isRequired,
      quantity: PropTypes.number.isRequired,
    }),
  ).isRequired,
  onRemove: PropTypes.func.isRequired,
  onUpdateQuantity: PropTypes.func.isRequired,
  products: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
      price: PropTypes.number.isRequired,
      category: PropTypes.string.isRequired,
      description: PropTypes.string.isRequired,
      stock: PropTypes.number.isRequired,
      image: PropTypes.string.isRequired,
    }),
  ).isRequired,
};

export default BagPage;
