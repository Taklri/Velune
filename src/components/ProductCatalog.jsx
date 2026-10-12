import { useMemo, useState } from 'react';
import PropTypes from 'prop-types';
import { Search } from 'lucide-react';
import ProductCard from './ProductCard';
import { Input } from './ui/input';
import { Select } from './ui/select';
import { Button } from './ui/button';

const PAGE_SIZE = 6;

function ProductCatalog({ products, onAddToBag, title = 'The collection', subtitle, showAllInitially = false }) {
  const initialVisibleCount = showAllInitially ? products.length : PAGE_SIZE;
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('All fragrances');
  const [visibleCount, setVisibleCount] = useState(initialVisibleCount);

  const categories = useMemo(
    () => ['All fragrances', ...new Set(products.map((product) => product.category))],
    [products],
  );

  const filteredProducts = useMemo(() => {
    const term = search.trim().toLowerCase();
    return products.filter((product) => {
      const matchesCategory = category === 'All fragrances' || product.category === category;
      const searchText = [product.name, product.category, product.description].join(' ').toLowerCase();
      return matchesCategory && (!term || searchText.includes(term));
    });
  }, [category, products, search]);

  const visibleProducts = filteredProducts.slice(0, visibleCount);

  const updateSearch = (event) => {
    setSearch(event.target.value);
    setVisibleCount(initialVisibleCount);
  };

  const updateCategory = (event) => {
    setCategory(event.target.value);
    setVisibleCount(initialVisibleCount);
  };

  return (
    <section className="catalog-section" id="collection">
      <div className="section-heading">
        <div>
          <p className="eyebrow">Made to be remembered</p>
          <h2 className="section-title">{title}</h2>
          {subtitle && <p className="section-intro">{subtitle}</p>}
        </div>
        <p className="catalog-count">
          {filteredProducts.length} {filteredProducts.length === 1 ? 'fragrance' : 'fragrances'}
        </p>
      </div>

      <div className="catalog-toolbar">
        <label className="search-field">
          <Search size={17} strokeWidth={1.6} aria-hidden="true" />
          <span className="sr-only">Search fragrances</span>
          <Input
            type="search"
            value={search}
            onChange={updateSearch}
            placeholder="Search the collection"
          />
        </label>
        <label className="filter-field">
          <span className="sr-only">Filter by fragrance family</span>
          <Select value={category} onChange={updateCategory}>
            {categories.map((item) => (
              <option key={item} value={item}>{item}</option>
            ))}
          </Select>
        </label>
      </div>

      {visibleProducts.length > 0 ? (
        <div className="product-grid">
          {visibleProducts.map((product) => (
            <ProductCard key={product.id} product={product} onAddToBag={onAddToBag} />
          ))}
        </div>
      ) : (
        <div className="empty-results">
          <p className="eyebrow">Nothing found</p>
          <h3>Try another search.</h3>
          <p>There are no fragrances in this category for that search.</p>
          <Button
            variant="text"
            onClick={() => {
              setSearch('');
              setCategory('All fragrances');
              setVisibleCount(initialVisibleCount);
            }}
          >
            Clear filters
          </Button>
        </div>
      )}

      {visibleCount < filteredProducts.length && (
        <div className="catalog-more">
          <Button
            variant="outline"
            size="large"
            onClick={() => setVisibleCount((count) => count + PAGE_SIZE)}
          >
            View more fragrances
          </Button>
        </div>
      )}
    </section>
  );
}

ProductCatalog.propTypes = {
  onAddToBag: PropTypes.func.isRequired,
  products: PropTypes.arrayOf(ProductCard.propTypes.product).isRequired,
  subtitle: PropTypes.string,
  title: PropTypes.string,
  showAllInitially: PropTypes.bool,
};

export default ProductCatalog;
