import { useEffect, useMemo, useState } from 'react';
import { plants as seedPlants, plantFallbackImage } from './plants';

const CUSTOM_PLANTS_KEY = 'madhuban-custom-plants';
const PLANT_EVENT = 'madhuban-plants-updated';

export function getCustomPlants() {
  try {
    return JSON.parse(localStorage.getItem(CUSTOM_PLANTS_KEY) || '[]');
  } catch {
    return [];
  }
}

export function saveCustomPlants(plants) {
  localStorage.setItem(CUSTOM_PLANTS_KEY, JSON.stringify(plants));
  window.dispatchEvent(new Event(PLANT_EVENT));
}

export function getAllPlants() {
  return [...seedPlants, ...getCustomPlants()];
}

export function normalizeAdminPlant(plant) {
  const id = plant.id || `custom-${Date.now()}`;
  const image = plant.image || plantFallbackImage;
  const quantity = Number(plant.quantity || 0);
  const stockStatus = quantity <= 0 ? 'Out of Stock' : quantity <= 5 ? 'Limited Stock' : 'In Stock';

  return {
    id,
    name: plant.name || 'New Plant',
    botanicalName: plant.botanicalName || plant.scientificName || 'Botanical name pending',
    scientificName: plant.botanicalName || plant.scientificName || 'Botanical name pending',
    category: plant.category || 'indoor',
    price: Number(plant.price || 0),
    image,
    images: [image, plantFallbackImage],
    description: plant.description || 'Fresh plant available at Madhuban Nursery.',
    shortDescription: plant.description || 'Fresh plant available at Madhuban Nursery.',
    sunlight: plant.sunlight || 'Partial',
    watering: plant.watering || 'Moderate',
    water: plant.watering || 'Moderate',
    careLevel: plant.careLevel || 'Easy',
    stockStatus,
    stock: stockStatus,
    quantity,
    featured: Boolean(plant.featured),
    suitableFor: plant.suitableFor || ['Home', 'Garden'],
    potIncluded: plant.potIncluded ?? true,
    size: plant.size || '6-24 inches',
    careTips: plant.careTips || `${plant.sunlight || 'Partial'} light, ${(plant.watering || 'Moderate').toLowerCase()} watering, and ${(plant.careLevel || 'Easy').toLowerCase()} care.`,
    isCustom: true,
  };
}

export function usePlantCatalog() {
  const [customPlants, setCustomPlants] = useState(() => getCustomPlants());

  useEffect(() => {
    const sync = () => setCustomPlants(getCustomPlants());
    window.addEventListener(PLANT_EVENT, sync);
    window.addEventListener('storage', sync);
    return () => {
      window.removeEventListener(PLANT_EVENT, sync);
      window.removeEventListener('storage', sync);
    };
  }, []);

  return useMemo(() => [...seedPlants, ...customPlants], [customPlants]);
}

export function upsertCustomPlant(plant) {
  const nextPlant = normalizeAdminPlant(plant);
  const existing = getCustomPlants();
  const next = existing.some(item => item.id === nextPlant.id)
    ? existing.map(item => item.id === nextPlant.id ? nextPlant : item)
    : [nextPlant, ...existing];
  saveCustomPlants(next);
  return nextPlant;
}

export function deleteCustomPlant(id) {
  saveCustomPlants(getCustomPlants().filter(plant => plant.id !== id));
}

export function updateCustomQuantity(id, delta) {
  const existing = getCustomPlants();
  const next = existing.map(plant => {
    if (plant.id !== id) return plant;
    return normalizeAdminPlant({ ...plant, quantity: Math.max(0, Number(plant.quantity || 0) + delta) });
  });
  saveCustomPlants(next);
}
