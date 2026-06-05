import { LockedAction } from './LockedFeature';

const CART_KEY = 'madhuban-cart';

export function addPlantToCart(plant) {
  const existing = JSON.parse(localStorage.getItem(CART_KEY) || '[]');
  const found = existing.find(item => item.id === plant.id);
  const next = found
    ? existing.map(item => item.id === plant.id ? { ...item, qty: item.qty + 1 } : item)
    : [...existing, { ...plant, qty: 1 }];
  localStorage.setItem(CART_KEY, JSON.stringify(next));
  window.dispatchEvent(new Event('madhuban-cart-updated'));
}

export function getCartItems() {
  return JSON.parse(localStorage.getItem(CART_KEY) || '[]');
}

export default function AddToCartButton({ plant, className = 'btn btn--outline btn--sm' }) {
  return (
    <LockedAction
      className={className}
      enabledAction={() => {
        addPlantToCart(plant);
        alert(`${plant.name} added to cart.`);
      }}
    >
      Add to Cart
    </LockedAction>
  );
}
