import { ArrowUpRight } from 'lucide-react';
import { Link } from 'react-router-dom';

function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="footer-main">
        <div>
          <Link to="/home" className="footer-brand">VELUNE.</Link>
          <p className="footer-note">Fragrance, composed with intention.</p>
        </div>
        <div className="footer-links">
          <Link to="/collections">Explore the collection <ArrowUpRight size={14} /></Link>
          <Link to="/your-bag">Your bag <ArrowUpRight size={14} /></Link>
        </div>
      </div>
      <div className="footer-bottom">
        <span>© 2026 Velune Fragrance</span>
        <span>Considered in every note.</span>
      </div>
    </footer>
  );
}

export default SiteFooter;
