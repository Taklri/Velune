import PropTypes from 'prop-types';
import { ArrowDown, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import ProductCatalog from '../components/ProductCatalog';
import { Button } from '../components/ui/button';
import heroImage from '../assets/HeroSection.jpg';
import releaseImage from '../assets/sec2.jpg';

function HomePage({ products, onAddToBag }) {
  return (
    <main>
      <section
        className="hero"
        style={{ backgroundImage: 'linear-gradient(90deg, rgba(16, 15, 14, .76) 0%, rgba(16, 15, 14, .28) 60%, rgba(16, 15, 14, .06) 100%), url(' + heroImage + ')' }}
        aria-label="Velune fragrance campaign"
      >
        <div className="hero-copy">
          <p className="eyebrow hero-eyebrow">An independent fragrance house</p>
          <h1>NOIR<br /><em>Nº 04</em></h1>
          <p className="hero-description">
            A deeper expression of time, memory, and quiet elegance. Crafted for those who leave a lasting impression.
          </p>
          <div className="hero-actions">
            <Button variant="outline" size="large" onClick={() => document.getElementById('collection')?.scrollIntoView({ behavior: 'smooth' })}>
              Discover the collection <ArrowRight size={16} />
            </Button>
            <Link to="/products/1" className="hero-detail-link">Explore Noir Nº 04</Link>
          </div>
        </div>
        <a className="hero-scroll" href="#collection">
          <span>Scroll to discover</span><ArrowDown size={15} />
        </a>
        <p className="hero-index">01 / 08</p>
      </section>

      <section className="manifesto-strip">
        <span>Quiet presence</span><i aria-hidden="true">✳</i>
        <span>Thoughtful composition</span><i aria-hidden="true">✳</i>
        <span>Made to be remembered</span>
      </section>

      <ProductCatalog
        products={products}
        onAddToBag={onAddToBag}
        title="A study in scent"
        subtitle="Eight distinct compositions. Find the one that feels like yours."
        showAllInitially
      />

      <section
        className="release-section"
        style={{ backgroundImage: 'linear-gradient(0deg, rgba(12, 12, 12, .52), rgba(12, 12, 12, .03) 68%), url(' + releaseImage + ')' }}
        aria-label="Velune fragrance campaign"
      >
        <div className="release-copy">
          <p className="eyebrow">The Velune point of view</p>
          <h2>Leave room<br /><em>for the feeling.</em></h2>
          <Link className="text-link text-link-light" to="/collections">Find your fragrance <ArrowRight size={16} /></Link>
        </div>
      </section>
    </main>
  );
}

HomePage.propTypes = {
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

export default HomePage;
