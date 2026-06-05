import { categories, careLevels, seasons } from '../data/plants';

export { categories, careLevels, seasons };

export const priceRange = [
  { value: '0-200', label: 'Under Rs. 200' },
  { value: '200-400', label: 'Rs. 200 to Rs. 400' },
  { value: '400-700', label: 'Rs. 400 to Rs. 700' },
  { value: '700+', label: 'Above Rs. 700' },
];

export const suggestions = [
  { value: 'easy-growth', label: 'Easy Growth' },
  { value: 'limited-budget', label: 'Limited Budget' },
  { value: 'less-care', label: 'Less Care' },
];
