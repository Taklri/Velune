import PropTypes from 'prop-types';
import { ArrowUpRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { formatPrice } from '../lib/store';

function ProductCard({ product, onAddToBag }) {
  return (
    <Card className="product-card">
      <Link className="product-card-image-link" to={'/products/' + product.id}>
        <img className="product-card-image" src={product.image} alt={product.name} loading="lazy" />
        <span className="product-card-image-mark" aria-hidden="true">
          <ArrowUpRight size={17} strokeWidth={1.5} />
        </span>
      </Link>
      <div className="product-card-copy">
        <div className="product-card-meta">
          <span className="eyebrow">{product.category}</span>
          <span className="product-stock">{product.stock > 0 ? 'In stock' : 'Sold out'}</span>
        </div>
        <Link className="product-card-name" to={'/products/' + product.id}>
          {product.name}
        </Link>
        <p className="product-card-description">{product.description}</p>
        <div className="product-card-footer">
          <span className="price">{formatPrice(product.price)}</span>
          <Button
            variant="outline"
            size="small"
            disabled={product.stock === 0}
            onClick={() => onAddToBag(product.id)}
            aria-label={'Add ' + product.name + ' to bag'}
          >
            {product.stock > 0 ? 'Add to bag' : 'Sold out'}
          </Button>
        </div>
      </div>
    </Card>
  );
}

ProductCard.propTypes = {
  onAddToBag: PropTypes.func.isRequired,
  product: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    category: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    stock: PropTypes.number.isRequired,
    image: PropTypes.string.isRequired,
  }).isRequired,
};

export default ProductCard;
