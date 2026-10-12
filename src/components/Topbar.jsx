import { useState } from 'react';
import PropTypes from 'prop-types';
import { Menu, ShoppingBag, X } from 'lucide-react';
import { Link, NavLink } from 'react-router-dom';
import { Button } from './ui/button';

function Topbar({ bagCount }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const closeMenu = () => setMenuOpen(false);
  const linkClass = ({ isActive }) => 'nav-link' + (isActive ? ' nav-link-active' : '');

  return (
    <header className="site-header">
      <div className="topbar">
        <Link to="/home" className="brand-mark" aria-label="Velune home" onClick={closeMenu}>
          VELUNE<span className="brand-period">.</span>
        </Link>

        <nav className={'site-nav' + (menuOpen ? ' site-nav-open' : '')} aria-label="Main navigation">
          <NavLink to="/home" className={linkClass} onClick={closeMenu}>Home</NavLink>
          <NavLink to="/collections" className={linkClass} onClick={closeMenu}>Collections</NavLink>
          <NavLink to="/check-out" className={linkClass} onClick={closeMenu}>Checkout</NavLink>
        </nav>

        <div className="topbar-actions">
          <Link to="/your-bag" className="bag-link" aria-label={'Shopping bag with ' + bagCount + ' items'}>
            <ShoppingBag size={18} strokeWidth={1.5} aria-hidden="true" />
            <span>Bag</span>
            <span className="bag-count" aria-live="polite">{bagCount}</span>
          </Link>
          <Button
            className="menu-toggle"
            variant="ghost"
            size="icon"
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((open) => !open)}
          >
            {menuOpen ? <X size={20} /> : <Menu size={20} />}
          </Button>
        </div>
      </div>
    </header>
  );
}

Topbar.propTypes = {
  bagCount: PropTypes.number.isRequired,
};

export default Topbar;
