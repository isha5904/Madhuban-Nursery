import { useMemo, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FEATURE_FLAGS } from '../config/features';
import { business } from '../data/business';
import { categories, formatPrice, plantFallbackImage } from '../data/plants';
import { deleteCustomPlant, updateCustomQuantity, upsertCustomPlant, usePlantCatalog } from '../data/plantStore';
import { getCartItems } from '../components/AddToCartButton';
import { FloatingWhatsApp } from '../components/WhatsAppButton';
import './Phase2Page.css';

const pageCopy = {
  '/login': { title: 'Customer Login', label: 'Login / Account', desc: 'Customer account access for orders, wishlist and tracking.' },
  '/register': { title: 'Create Account', label: 'Register', desc: 'New customer registration for online nursery orders.' },
  '/cart': { title: 'Shopping Cart', label: 'Cart', desc: 'Review selected plants and accessories before checkout.' },
  '/checkout': { title: 'Checkout', label: 'Checkout', desc: 'Online order, delivery details and payment selection.' },
  '/wishlist': { title: 'Wishlist', label: 'Wishlist', desc: 'Save favorite plants for future purchase.' },
  '/orders': { title: 'Order Tracking', label: 'Orders', desc: 'Track online orders and delivery status.' },
  '/admin': { title: 'Admin Panel', label: 'Admin', desc: 'Manage plants, prices, stock, orders, coupons and reviews.', admin: true },
  '/admin/plants': { title: 'Manage Plants', label: 'Admin Plants', desc: 'Add, edit and delete plant listings.', admin: true },
  '/admin/orders': { title: 'Manage Orders', label: 'Admin Orders', desc: 'View and manage customer orders.', admin: true },
};

const mockOrders = [
  { id: 'MN-1001', customer: 'Demo Customer', total: 1197, status: 'Packed', payment: 'Cash on Delivery' },
  { id: 'MN-1002', customer: 'Landscape Inquiry', total: 2499, status: 'Pending Approval', payment: 'UPI' },
];

function LockedScreen({ page }) {
  return (
    <div className="phase2-page page-enter">
      <section className="phase2-hero">
        <div className="container">
          <span className="section__label">Phase 2 Locked</span>
          <h1 className="phase2-hero__title">{page.title}</h1>
          <p className="phase2-hero__subtitle">
            {page.admin
              ? 'Phase 2 requires approval. Contact developer to unlock this feature.'
              : 'This feature is coming soon. Please contact Madhuban Nursery for availability.'}
          </p>
          <div className="phase2-lock-card">
            <span className="phase2-lock-card__mark">M</span>
            <h2>{page.admin ? 'Requires Admin Approval' : 'Coming Soon'}</h2>
            <p>{page.desc}</p>
            <div className="phase2-lock-card__actions">
              <Link to="/plants" className="btn btn--primary">Browse Plants</Link>
              <Link to="/contact" className="btn btn--secondary">Contact Nursery</Link>
            </div>
          </div>
        </div>
      </section>
      <FloatingWhatsApp />
    </div>
  );
}

function AuthMock({ mode }) {
  return (
    <div className="phase2-panel">
      <h2>{mode === 'register' ? 'Create Customer Account' : 'Login to Customer Account'}</h2>
      <div className="phase2-form">
        {mode === 'register' && <input placeholder="Full name" />}
        <input placeholder="Phone number" defaultValue={business.phoneDisplay} />
        <input placeholder="Email address" />
        <input placeholder="Password" type="password" />
        <button className="btn btn--primary">{mode === 'register' ? 'Create Account' : 'Login'}</button>
      </div>
    </div>
  );
}

function CartMock({ checkout = false, plants }) {
  const items = getCartItems();
  const displayItems = items.length ? items : plants.slice(0, 3).map(p => ({ ...p, qty: 1 }));
  const total = displayItems.reduce((sum, item) => sum + item.price * item.qty, 0);

  return (
    <div className="phase2-grid">
      <div className="phase2-panel">
        <h2>{checkout ? 'Checkout Items' : 'Cart Items'}</h2>
        {displayItems.map(item => (
          <div className="phase2-line-item" key={item.id}>
            <img src={item.image} alt="" />
            <div>
              <strong>{item.name}</strong>
              <span>{item.qty} x {formatPrice(item.price)}</span>
            </div>
            <b>{formatPrice(item.price * item.qty)}</b>
          </div>
        ))}
      </div>
      <div className="phase2-panel">
        <h2>Order Summary</h2>
        <p>Plants total: {formatPrice(total)}</p>
        <p>Delivery charges: Rs. 99</p>
        <h3>Total: {formatPrice(total + 99)}</h3>
        {checkout ? (
          <div className="phase2-options">
            <label><input type="radio" name="payment" defaultChecked /> UPI / Card Payment</label>
            <label><input type="radio" name="payment" /> Cash on Delivery</label>
            <button className="btn btn--primary">Place Demo Order</button>
          </div>
        ) : (
          <Link to="/checkout" className="btn btn--primary">Proceed to Checkout</Link>
        )}
      </div>
    </div>
  );
}

function WishlistMock({ plants }) {
  return (
    <div className="grid grid--3">
      {plants.slice(0, 6).map(plant => (
        <div className="phase2-panel phase2-mini-card" key={plant.id}>
          <img src={plant.image} alt="" />
          <h3>{plant.name}</h3>
          <p>{formatPrice(plant.price)}</p>
          <button className="btn btn--secondary">Move to Cart</button>
        </div>
      ))}
    </div>
  );
}

function OrdersMock({ admin = false }) {
  return (
    <div className="phase2-panel">
      <h2>{admin ? 'Admin Order Management' : 'Order Tracking'}</h2>
      {mockOrders.map(order => (
        <div className="phase2-order" key={order.id}>
          <div><strong>{order.id}</strong><span>{admin ? order.customer : order.status}</span></div>
          <span>{formatPrice(order.total)}</span>
          <span className="badge badge--limited">{order.payment}</span>
          {admin && <button className="btn btn--outline btn--sm">Update Status</button>}
        </div>
      ))}
    </div>
  );
}

const emptyPlantForm = {
  name: '',
  botanicalName: '',
  category: 'indoor',
  price: '',
  quantity: 10,
  sunlight: 'Partial',
  watering: 'Moderate',
  careLevel: 'Easy',
  description: '',
  image: '',
  featured: false,
};

function AdminPlantsMock({ plants }) {
  const [form, setForm] = useState(emptyPlantForm);
  const customPlants = plants.filter(plant => plant.isCustom);

  const handleChange = (event) => {
    const { name, value, type, checked } = event.target;
    setForm(prev => ({ ...prev, [name]: type === 'checkbox' ? checked : value }));
  };

  const handleImageUpload = (event) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
      setForm(prev => ({ ...prev, image: reader.result }));
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    upsertCustomPlant(form);
    setForm(emptyPlantForm);
  };

  return (
    <div className="phase2-grid phase2-grid--admin">
      <div className="phase2-panel">
        <div className="phase2-panel__header">
          <h2>Add New Plant</h2>
          <span className="badge badge--instock">Live Admin</span>
        </div>
        <form className="admin-plant-form" onSubmit={handleSubmit}>
          <label>Plant Name<input name="name" value={form.name} onChange={handleChange} required /></label>
          <label>Botanical Name<input name="botanicalName" value={form.botanicalName} onChange={handleChange} required /></label>
          <label>Category
            <select name="category" value={form.category} onChange={handleChange}>
              {categories.map(category => <option key={category.id} value={category.id}>{category.name}</option>)}
            </select>
          </label>
          <label>Price<input name="price" type="number" value={form.price} onChange={handleChange} required /></label>
          <label>Quantity<input name="quantity" type="number" min="0" value={form.quantity} onChange={handleChange} /></label>
          <label>Sunlight
            <select name="sunlight" value={form.sunlight} onChange={handleChange}>
              <option>Low</option><option>Partial</option><option>Bright Indirect</option><option>Full Sun</option>
            </select>
          </label>
          <label>Watering
            <select name="watering" value={form.watering} onChange={handleChange}>
              <option>Low</option><option>Moderate</option><option>High</option>
            </select>
          </label>
          <label>Care Level
            <select name="careLevel" value={form.careLevel} onChange={handleChange}>
              <option>Easy</option><option>Medium</option><option>High</option>
            </select>
          </label>
          <label className="admin-plant-form__wide">Description<textarea name="description" value={form.description} onChange={handleChange} required /></label>
          <label className="admin-plant-form__wide">Upload Plant Image<input type="file" accept="image/*" onChange={handleImageUpload} /></label>
          <label className="admin-plant-form__check"><input type="checkbox" name="featured" checked={form.featured} onChange={handleChange} /> Featured plant</label>
          <div className="admin-plant-form__preview">
            <img src={form.image || plantFallbackImage} alt="Preview" />
            <button className="btn btn--primary" type="submit">Add Plant to Website</button>
          </div>
        </form>
      </div>

      <div className="phase2-panel">
        <div className="phase2-panel__header">
          <h2>Uploaded Plants</h2>
          <span>{customPlants.length} custom</span>
        </div>
        {customPlants.length === 0 && <p className="phase2-muted">No admin plants yet. Add one using the form.</p>}
        {customPlants.map(plant => (
          <div className="admin-plant-row" key={plant.id}>
            <img src={plant.image} alt="" />
            <div>
              <strong>{plant.name}</strong>
              <span>{formatPrice(plant.price)} | Qty: {plant.quantity} | {plant.stockStatus}</span>
            </div>
            <div className="admin-plant-row__actions">
              <button className="btn btn--outline btn--sm" onClick={() => updateCustomQuantity(plant.id, -1)}>-</button>
              <button className="btn btn--outline btn--sm" onClick={() => updateCustomQuantity(plant.id, 1)}>+</button>
              <button className="btn btn--outline btn--sm" onClick={() => setForm(plant)}>Edit</button>
              <button className="btn btn--outline btn--sm" onClick={() => deleteCustomPlant(plant.id)}>Remove</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function DashboardMock({ page, plants }) {
  if (page.label === 'Login / Account') return <AuthMock mode="login" />;
  if (page.label === 'Register') return <AuthMock mode="register" />;
  if (page.label === 'Cart') return <CartMock plants={plants} />;
  if (page.label === 'Checkout') return <CartMock checkout plants={plants} />;
  if (page.label === 'Wishlist') return <WishlistMock plants={plants} />;
  if (page.label === 'Orders') return <OrdersMock />;
  if (page.label === 'Admin') return <AdminPlantsMock plants={plants} />;
  if (page.label === 'Admin Plants') return <AdminPlantsMock plants={plants} />;
  if (page.label === 'Admin Orders') return <OrdersMock admin />;

  return (
    <div className="phase2-grid">
      <Link className="phase2-panel phase2-module" to="/admin/plants"><h2>Manage Plants</h2><p>Add, edit, delete, price and stock controls.</p></Link>
      <Link className="phase2-panel phase2-module" to="/admin/orders"><h2>Manage Orders</h2><p>Order tracking, delivery charges and status updates.</p></Link>
      <div className="phase2-panel phase2-module"><h2>Coupons & Reviews</h2><p>Coupons, discounts, customer reviews and ratings.</p></div>
    </div>
  );
}

export default function Phase2Page() {
  const location = useLocation();
  const page = useMemo(() => pageCopy[location.pathname] || pageCopy['/cart'], [location.pathname]);
  const plants = usePlantCatalog();

  if (!FEATURE_FLAGS.phase2Enabled) return <LockedScreen page={page} />;

  return (
    <div className="phase2-page page-enter">
      <section className="phase2-hero">
        <div className="container">
          <span className="section__label">Phase 2 Enabled</span>
          <h1 className="phase2-hero__title">{page.title}</h1>
          <p className="phase2-hero__subtitle">{page.desc}</p>
        </div>
      </section>
      <section className="section">
        <div className="container">
          <DashboardMock page={page} plants={plants} />
        </div>
      </section>
      <FloatingWhatsApp />
    </div>
  );
}
