import { getWhatsAppLink } from './business';

export const categories = [
  { id: 'indoor', name: 'Indoor Plants', image: '/images/plants/indoor-plant.svg', description: 'Air-purifying plants for homes, offices, counters and shaded spaces.' },
  { id: 'outdoor', name: 'Outdoor Plants', image: '/images/plants/outdoor-plant.svg', description: 'Hardy plants for gardens, entrances, patios and sunny balconies.' },
  { id: 'flowering', name: 'Flowering Plants', image: '/images/plants/flowering-plant.svg', description: 'Seasonal and evergreen flowering plants for color and fragrance.' },
  { id: 'medicinal', name: 'Medicinal Plants', image: '/images/plants/medicinal-plant.svg', description: 'Useful herbs and traditional plants for everyday kitchen gardens.' },
  { id: 'fruit', name: 'Fruit Plants', image: '/images/plants/fruit-plant.svg', description: 'Healthy saplings for Jaipur homes, farms and terrace gardens.' },
  { id: 'bonsai-decorative', name: 'Bonsai & Decorative Plants', image: '/images/plants/bonsai-decorative.svg', description: 'Premium bonsai, succulents and statement plants for gifting and decor.' },
  { id: 'pots-accessories', name: 'Pots & Gardening Accessories', image: '/images/plants/gardening-pots.svg', description: 'Planters, pots and useful gardening accessories for plant care.' },
];

export const careLevels = ['Easy', 'Medium', 'High'];
export const sunlightNeeds = ['Low', 'Partial', 'Bright Indirect', 'Full Sun'];
export const waterNeeds = ['Low', 'Moderate', 'High'];
export const suitableFor = ['Home', 'Office', 'Garden', 'Balcony'];
export const stockStatuses = ['In Stock', 'Limited Stock', 'Out of Stock'];
export const plantFallbackImage = '/images/plant-placeholder.jpg';

const categoryImages = {
  indoor: '/images/plants/indoor-plant.svg',
  outdoor: '/images/plants/outdoor-plant.svg',
  flowering: '/images/plants/flowering-plant.svg',
  medicinal: '/images/plants/medicinal-plant.svg',
  fruit: '/images/plants/fruit-plant.svg',
  'bonsai-decorative': '/images/plants/bonsai-decorative.svg',
  'pots-accessories': '/images/plants/gardening-pots.svg',
};

const rawPlants = [
  ['Snake Plant', 'Dracaena trifasciata', 'indoor', 299, 'Hardy upright plant for bedrooms and offices.', 'Low', 'Low', 'Easy', 'In Stock', true],
  ['Peace Lily', 'Spathiphyllum wallisii', 'indoor', 349, 'Elegant foliage with white spathes for shaded interiors.', 'Low', 'Moderate', 'Easy', 'In Stock', true],
  ['Money Plant', 'Epipremnum aureum', 'indoor', 199, 'Fast-growing trailing plant for shelves, bottles and hanging pots.', 'Partial', 'Moderate', 'Easy', 'In Stock', true],
  ['Areca Palm', 'Dypsis lutescens', 'indoor', 599, 'Soft tropical palm that adds height and freshness indoors.', 'Bright Indirect', 'Moderate', 'Medium', 'In Stock', true],
  ['Rubber Plant', 'Ficus elastica', 'indoor', 449, 'Glossy statement foliage plant for premium corners.', 'Bright Indirect', 'Moderate', 'Easy', 'In Stock', false],
  ['Spider Plant', 'Chlorophytum comosum', 'indoor', 199, 'Beginner-friendly hanging plant with arching striped leaves.', 'Partial', 'Moderate', 'Easy', 'In Stock', false],
  ['Jade Plant', 'Crassula ovata', 'indoor', 249, 'Compact succulent known for thick glossy leaves and easy care.', 'Bright Indirect', 'Low', 'Easy', 'In Stock', false],
  ['Syngonium', 'Syngonium podophyllum', 'indoor', 249, 'Soft arrowhead foliage for tabletops and shaded balconies.', 'Partial', 'Moderate', 'Easy', 'In Stock', false],
  ['Aglaonema', 'Aglaonema commutatum', 'indoor', 499, 'Premium patterned foliage plant for low-light rooms.', 'Low', 'Moderate', 'Easy', 'Limited Stock', true],
  ['Fern', 'Nephrolepis exaltata', 'indoor', 299, 'Lush green fern for humid shaded corners and hanging baskets.', 'Partial', 'High', 'Medium', 'In Stock', false],
  ['ZZ Plant', 'Zamioculcas zamiifolia', 'indoor', 399, 'Low-maintenance glossy plant for offices and darker rooms.', 'Low', 'Low', 'Easy', 'In Stock', true],
  ['Lucky Bamboo', 'Dracaena sanderiana', 'indoor', 299, 'Decorative water-grown plant for desks and gifting.', 'Low', 'Moderate', 'Easy', 'In Stock', false],
  ['Anthurium', 'Anthurium andraeanum', 'indoor', 699, 'Premium indoor flowering plant with glossy heart-shaped blooms.', 'Bright Indirect', 'Moderate', 'Medium', 'Limited Stock', true],
  ['Bamboo Palm', 'Chamaedorea seifrizii', 'indoor', 549, 'Airy palm for elegant indoor greenery.', 'Bright Indirect', 'Moderate', 'Medium', 'In Stock', false],
  ['Philodendron', 'Philodendron hederaceum', 'indoor', 349, 'Heart-leaf trailing foliage for shelves and moss poles.', 'Partial', 'Moderate', 'Easy', 'In Stock', false],
  ['Dracaena', 'Dracaena fragrans', 'indoor', 499, 'Tall architectural indoor plant with refined foliage.', 'Bright Indirect', 'Low', 'Easy', 'In Stock', false],
  ['Calathea', 'Goeppertia ornata', 'indoor', 599, 'Decorative patterned leaves for plant lovers who enjoy care rituals.', 'Bright Indirect', 'Moderate', 'High', 'Limited Stock', false],
  ['Money Plant Marble Queen', 'Epipremnum aureum Marble Queen', 'indoor', 299, 'Variegated money plant with creamy marble-patterned leaves.', 'Bright Indirect', 'Moderate', 'Easy', 'In Stock', false],
  ['Aloe Vera', 'Aloe barbadensis miller', 'medicinal', 199, 'Useful succulent with fleshy leaves, ideal for sunny windows.', 'Full Sun', 'Low', 'Easy', 'In Stock', true],
  ['Tulsi', 'Ocimum tenuiflorum', 'medicinal', 99, 'Sacred Indian herb for homes, courtyards and daily puja use.', 'Full Sun', 'Moderate', 'Easy', 'In Stock', true],
  ['Neem Plant', 'Azadirachta indica', 'medicinal', 249, 'Hardy medicinal tree sapling for outdoor planting.', 'Full Sun', 'Low', 'Easy', 'In Stock', false],
  ['Curry Leaf Plant', 'Murraya koenigii', 'medicinal', 199, 'Essential kitchen herb with aromatic leaves for Indian cooking.', 'Full Sun', 'Moderate', 'Easy', 'In Stock', true],
  ['Ajwain Plant', 'Plectranthus amboinicus', 'medicinal', 149, 'Aromatic medicinal herb with thick leaves and quick growth.', 'Partial', 'Moderate', 'Easy', 'In Stock', false],
  ['Mint Plant', 'Mentha', 'medicinal', 99, 'Fresh kitchen herb for drinks, chutneys and balcony gardens.', 'Partial', 'High', 'Easy', 'In Stock', false],
  ['Lemongrass', 'Cymbopogon citratus', 'medicinal', 149, 'Fragrant herb for tea, borders and natural freshness.', 'Full Sun', 'Moderate', 'Easy', 'In Stock', false],
  ['Rose', 'Rosa', 'flowering', 249, 'Classic flowering plant available in popular garden colors.', 'Full Sun', 'Moderate', 'Medium', 'In Stock', true],
  ['Hibiscus', 'Hibiscus rosa-sinensis', 'flowering', 299, 'Large tropical blooms for sunny gardens and entrances.', 'Full Sun', 'Moderate', 'Easy', 'In Stock', true],
  ['Bougainvillea', 'Bougainvillea glabra', 'flowering', 349, 'Drought-tolerant climber with vibrant papery bracts.', 'Full Sun', 'Low', 'Easy', 'In Stock', true],
  ['Jasmine', 'Jasminum sambac', 'flowering', 249, 'Fragrant white flowers for balconies and garden corners.', 'Full Sun', 'Moderate', 'Medium', 'In Stock', false],
  ['Marigold', 'Tagetes erecta', 'flowering', 79, 'Bright seasonal flowers for beds, borders and festive decor.', 'Full Sun', 'Moderate', 'Easy', 'In Stock', false],
  ['Ixora', 'Ixora coccinea', 'flowering', 279, 'Clusters of colorful blooms on a compact shrub.', 'Full Sun', 'Moderate', 'Easy', 'In Stock', false],
  ['Champa', 'Plumeria rubra', 'flowering', 499, 'Fragrant tropical flowers and sculptural outdoor form.', 'Full Sun', 'Low', 'Medium', 'Limited Stock', false],
  ['Mogra', 'Jasminum sambac', 'flowering', 249, 'Highly fragrant jasmine variety loved for evening fragrance.', 'Full Sun', 'Moderate', 'Medium', 'In Stock', true],
  ['Kaner', 'Nerium oleander', 'flowering', 199, 'Hardy flowering shrub for sunny outdoor landscapes.', 'Full Sun', 'Low', 'Easy', 'In Stock', false],
  ['Aparajita', 'Clitoria ternatea', 'flowering', 149, 'Blue flowering creeper for fences, balcony grills and trellis.', 'Full Sun', 'Moderate', 'Easy', 'In Stock', false],
  ['Petunia', 'Petunia hybrida', 'flowering', 99, 'Seasonal flowering plant for hanging baskets and color beds.', 'Full Sun', 'Moderate', 'Medium', 'In Stock', false],
  ['Dahlia', 'Dahlia pinnata', 'flowering', 149, 'Showy seasonal blooms for garden color and display.', 'Full Sun', 'Moderate', 'Medium', 'Limited Stock', false],
  ['Chrysanthemum', 'Chrysanthemum morifolium', 'flowering', 149, 'Popular winter flowering plant with dense colorful blooms.', 'Full Sun', 'Moderate', 'Easy', 'In Stock', false],
  ['Ashoka Plant', 'Polyalthia longifolia', 'outdoor', 349, 'Tall elegant tree for boundaries and landscape lines.', 'Full Sun', 'Moderate', 'Easy', 'In Stock', false],
  ['Croton', 'Codiaeum variegatum', 'outdoor', 349, 'Colorful foliage shrub for bright garden accents.', 'Full Sun', 'Moderate', 'Medium', 'In Stock', false],
  ['Lemon Plant', 'Citrus limon', 'fruit', 399, 'Citrus sapling for sunny terrace gardens and home orchards.', 'Full Sun', 'Moderate', 'Medium', 'In Stock', true],
  ['Guava Plant', 'Psidium guajava', 'fruit', 349, 'Hardy fruit plant suitable for gardens and larger containers.', 'Full Sun', 'Moderate', 'Easy', 'In Stock', false],
  ['Mango Plant', 'Mangifera indica', 'fruit', 499, 'Healthy mango sapling for outdoor planting in sunny spots.', 'Full Sun', 'Moderate', 'Medium', 'Limited Stock', true],
  ['Pomegranate Plant', 'Punica granatum', 'fruit', 399, 'Attractive fruit plant with orange-red flowers and edible fruit.', 'Full Sun', 'Low', 'Easy', 'In Stock', false],
  ['Papaya Plant', 'Carica papaya', 'fruit', 299, 'Fast-growing tropical fruit plant for warm sunny gardens.', 'Full Sun', 'Moderate', 'Easy', 'In Stock', false],
  ['Chiku Plant', 'Manilkara zapota', 'fruit', 449, 'Sapota fruit sapling for gardens and farmhouses.', 'Full Sun', 'Moderate', 'Medium', 'Limited Stock', false],
  ['Bonsai Ficus', 'Ficus retusa', 'bonsai-decorative', 1299, 'Living art bonsai, ideal for gifting and premium decor.', 'Bright Indirect', 'Moderate', 'Medium', 'Limited Stock', true],
  ['Cactus', 'Cactaceae', 'bonsai-decorative', 199, 'Desert-style decorative plant for sunny windows and tabletops.', 'Full Sun', 'Low', 'Easy', 'In Stock', false],
  ['Succulent', 'Echeveria and Sedum mix', 'bonsai-decorative', 199, 'Compact decorative succulent for desks, gifts and mini gardens.', 'Bright Indirect', 'Low', 'Easy', 'In Stock', false],
  ['Gardening Pots', 'Assorted planters', 'pots-accessories', 149, 'Durable pots and planters for indoor and outdoor plants.', 'Partial', 'Low', 'Easy', 'In Stock', false],
];

export const plants = rawPlants.map(([name, botanicalName, category, price, description, sunlight, watering, careLevel, stockStatus, featured], index) => ({
  id: index + 1,
  name,
  botanicalName,
  scientificName: botanicalName,
  category,
  price,
  image: categoryImages[category],
  images: [categoryImages[category], plantFallbackImage, categoryImages[category]],
  description,
  shortDescription: description,
  sunlight,
  watering,
  water: watering,
  careLevel,
  stockStatus,
  stock: stockStatus,
  featured,
  suitableFor: category === 'fruit' || category === 'outdoor' || category === 'flowering' ? ['Garden', 'Balcony'] : ['Home', 'Office'],
  potIncluded: category !== 'pots-accessories',
  size: category === 'fruit' || category === 'outdoor' ? '2-5 feet' : '6-24 inches',
  careTips: `${sunlight} light, ${watering.toLowerCase()} watering, and ${careLevel.toLowerCase()} care. Visit Madhuban Nursery for plant-specific guidance before planting.`,
}));

export const getPlantById = (id) => plants.find(p => p.id === parseInt(id, 10));
export const getPlantsByCategory = (categoryId) => plants.filter(p => p.category === categoryId);
export const getFeaturedPlants = () => plants.filter(p => p.featured);
export const formatPrice = (price) => `Rs. ${price.toLocaleString('en-IN')}`;
export { getWhatsAppLink };

export const getCategoryName = (categoryId) => categories.find(c => c.id === categoryId)?.name || categoryId;

export const getStockBadgeClass = (stock) => {
  switch (stock) {
    case 'In Stock': return 'badge--instock';
    case 'Limited Stock': return 'badge--limited';
    case 'Out of Stock': return 'badge--outofstock';
    default: return '';
  }
};

export const getCareLevelBadgeClass = (level) => {
  switch (level) {
    case 'Easy': return 'badge--easy';
    case 'Medium': return 'badge--medium';
    case 'High': return 'badge--high';
    default: return '';
  }
};

export const getPriceRange = () => {
  const prices = plants.map(p => p.price);
  return { min: Math.min(...prices), max: Math.max(...prices) };
};
