import PropTypes from 'prop-types';
import ProductCatalog from '../components/ProductCatalog';

function CollectionsPage({ products, onAddToBag }) {
  return (
    <main className="page-shell collections-page">
      <section className="page-intro">
        <p className="eyebrow">The house collection</p>
        <h1>Find your<br /><em>signature.</em></h1>
        <p>Considered fragrances for every version of you.</p>
      </section>
      <ProductCatalog products={products} onAddToBag={onAddToBag} title="All fragrances" />
    </main>
  );
}

CollectionsPage.propTypes = {
  onAddToBag: PropTypes.func.isRequired,
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

export default CollectionsPage;
