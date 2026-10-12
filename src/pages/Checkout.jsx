import { useState } from 'react';
import PropTypes from 'prop-types';
import { ArrowLeft, ArrowRight, Check } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '../components/ui/button';
import { Card } from '../components/ui/card';
import { Input } from '../components/ui/input';
import { Select } from '../components/ui/select';
import { Textarea } from '../components/ui/textarea';
import { formatPrice, getCartItems, getSubtotal } from '../lib/store';

const emptyForm = {
  fullName: '',
  email: '',
  phone: '',
  deliveryAddress: '',
  paymentMethod: 'Cash on Delivery',
};

function validateForm(form) {
  const errors = {};
  if (form.fullName.trim().length < 2) errors.fullName = 'Enter your full name.';
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(form.email.trim())) {
    errors.email = 'Enter a valid email address.';
  }
  if (!/^(09\d{9}|\+639\d{9})$/.test(form.phone.replace(/[\s()-]/g, ''))) {
    errors.phone = 'Enter a valid Philippine mobile number, such as 09171234567.';
  }
  if (form.deliveryAddress.trim().length < 8) {
    errors.deliveryAddress = 'Enter a complete delivery address.';
  }
  return errors;
}

function CheckoutPage({ products, bag, onPlaceOrder }) {
  const [form, setForm] = useState(emptyForm);
  const [errors, setErrors] = useState({});
  const [placedOrder, setPlacedOrder] = useState(null);
  const items = getCartItems(products, bag);
  const subtotal = getSubtotal(products, bag);

  const updateField = (event) => {
    const { name, value } = event.target;
    setForm((current) => ({ ...current, [name]: value }));
    setErrors((current) => ({ ...current, [name]: '' }));
  };

  const handleInvalid = (event) => {
    const { name, validity } = event.target;
    let message = 'Please complete this field.';
    if (validity.typeMismatch) message = 'Enter a valid email address.';
    if (validity.patternMismatch) message = 'Enter a valid Philippine mobile number.';
    setErrors((current) => ({ ...current, [name]: message }));
    event.preventDefault();
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const nextErrors = validateForm(form);
    setErrors(nextErrors);
    if (Object.values(nextErrors).some(Boolean)) {
      document.getElementById(Object.keys(nextErrors)[0])?.focus();
      return;
    }

    const order = onPlaceOrder({
      ...form,
      fullName: form.fullName.trim(),
      email: form.email.trim(),
      phone: form.phone.trim(),
      deliveryAddress: form.deliveryAddress.trim(),
    });
    if (order) setPlacedOrder(order);
  };

  if (placedOrder) {
    return (
      <main className="page-shell checkout-page">
        <section className="order-success" role="status">
          <div className="success-icon"><Check size={24} strokeWidth={1.5} /></div>
          <p className="eyebrow">Order received</p>
          <h1>Thank you,<br /><em>{placedOrder.customer.fullName.split(' ')[0]}.</em></h1>
          <p className="success-copy">Your fragrance is being prepared. Payment will be collected when your order arrives.</p>
          <div className="success-order-number">
            <span>Order reference</span>
            <strong>{placedOrder.id}</strong>
          </div>
          <Card className="success-summary">
            <p className="eyebrow">Order summary</p>
            {placedOrder.items.map((item) => (
              <div className="success-item" key={item.productId}>
                <span>{item.name} <small>× {item.quantity}</small></span>
                <span>{formatPrice(item.price * item.quantity)}</span>
              </div>
            ))}
            <div className="success-total"><span>Total</span><strong>{formatPrice(placedOrder.total)}</strong></div>
            <p className="success-payment">Cash on Delivery</p>
          </Card>
          <Button to="/collections" variant="outline" size="large">Continue exploring <ArrowRight size={16} /></Button>
        </section>
      </main>
    );
  }

  if (items.length === 0) {
    return (
      <main className="page-shell checkout-page">
        <section className="empty-state">
          <p className="eyebrow">Your next chapter</p>
          <h1>Your bag is empty.</h1>
          <p>Add a fragrance before continuing to checkout.</p>
          <Button to="/collections" size="large">Explore the collection <ArrowRight size={16} /></Button>
        </section>
      </main>
    );
  }

  return (
    <main className="page-shell checkout-page">
      <Link className="back-link" to="/your-bag"><ArrowLeft size={15} /> Return to your bag</Link>
      <div className="page-heading-row checkout-heading">
        <div>
          <p className="eyebrow">Almost yours</p>
          <h1>Checkout<span className="heading-period">.</span></h1>
        </div>
        <p className="checkout-step">01 <span>/</span> 02 &nbsp; Delivery details</p>
      </div>

      <div className="checkout-layout">
        <form className="checkout-form" onSubmit={handleSubmit} onInvalid={handleInvalid}>
          <section className="form-section">
            <div className="form-section-heading">
              <span className="form-number">01</span>
              <div><h2>Delivery details</h2><p>Where should we send your fragrance?</p></div>
            </div>

            <div className="form-grid">
              <div className="form-field form-field-full">
                <label htmlFor="fullName">Full name</label>
                <Input id="fullName" name="fullName" autoComplete="name" value={form.fullName} onChange={updateField} onInvalid={handleInvalid} required aria-invalid={Boolean(errors.fullName)} aria-describedby={errors.fullName ? 'fullName-error' : undefined} />
                {errors.fullName && <p className="field-error" id="fullName-error">{errors.fullName}</p>}
              </div>
              <div className="form-field">
                <label htmlFor="email">Email address</label>
                <Input id="email" name="email" type="email" autoComplete="email" value={form.email} onChange={updateField} onInvalid={handleInvalid} required aria-invalid={Boolean(errors.email)} aria-describedby={errors.email ? 'email-error' : undefined} />
                {errors.email && <p className="field-error" id="email-error">{errors.email}</p>}
              </div>
              <div className="form-field">
                <label htmlFor="phone">Phone number</label>
                <Input id="phone" name="phone" type="tel" inputMode="tel" autoComplete="tel" placeholder="0917 123 4567" pattern="(09[0-9 ]{9,12}|[+]639[0-9 ]{9,12})" value={form.phone} onChange={updateField} onInvalid={handleInvalid} required aria-invalid={Boolean(errors.phone)} aria-describedby={errors.phone ? 'phone-error phone-hint' : 'phone-hint'} />
                <p className="field-hint" id="phone-hint">Use 09XXXXXXXXX or +639XXXXXXXXX.</p>
                {errors.phone && <p className="field-error" id="phone-error">{errors.phone}</p>}
              </div>
              <div className="form-field form-field-full">
                <label htmlFor="deliveryAddress">Delivery address</label>
                <Textarea id="deliveryAddress" name="deliveryAddress" autoComplete="street-address" rows="4" value={form.deliveryAddress} onChange={updateField} onInvalid={handleInvalid} required aria-invalid={Boolean(errors.deliveryAddress)} aria-describedby={errors.deliveryAddress ? 'deliveryAddress-error' : undefined} />
                {errors.deliveryAddress && <p className="field-error" id="deliveryAddress-error">{errors.deliveryAddress}</p>}
              </div>
            </div>
          </section>

          <section className="form-section payment-section">
            <div className="form-section-heading">
              <span className="form-number">02</span>
              <div><h2>Payment method</h2><p>Simple, secure, and collected at your door.</p></div>
            </div>
            <div className="form-field">
              <label htmlFor="paymentMethod">Choose a method</label>
              <Select id="paymentMethod" name="paymentMethod" value={form.paymentMethod} onChange={updateField} required>
                <option value="Cash on Delivery">Cash on Delivery</option>
              </Select>
            </div>
          </section>

          <Button type="submit" size="large" className="place-order-button">Place order <ArrowRight size={16} /></Button>
          <p className="checkout-terms">By placing your order, you agree to receive your selection at the address provided.</p>
        </form>

        <aside className="checkout-summary">
          <Card className="summary-card">
            <p className="eyebrow">In your bag</p>
            <h2>Your selection</h2>
            <div className="checkout-items">
              {items.map(({ product, quantity }) => (
                <div className="checkout-item" key={product.id}>
                  <img src={product.image} alt="" />
                  <div className="checkout-item-copy">
                    <span>{product.name}</span>
                    <small>Qty {quantity}</small>
                  </div>
                  <span>{formatPrice(product.price * quantity)}</span>
                </div>
              ))}
            </div>
            <div className="summary-line"><span>Subtotal</span><span>{formatPrice(subtotal)}</span></div>
            <div className="summary-total"><span>Total due on delivery</span><span>{formatPrice(subtotal)}</span></div>
            <p className="summary-note">Cash on Delivery</p>
          </Card>
        </aside>
      </div>
    </main>
  );
}

CheckoutPage.propTypes = {
  bag: PropTypes.arrayOf(
    PropTypes.shape({
      productId: PropTypes.number.isRequired,
      quantity: PropTypes.number.isRequired,
    }),
  ).isRequired,
  onPlaceOrder: PropTypes.func.isRequired,
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

export default CheckoutPage;
