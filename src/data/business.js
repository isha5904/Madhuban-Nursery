export const business = {
  name: 'Madhuban Nursery',
  category: 'Plant Nursery',
  rating: 4.9,
  reviewCount: 137,
  address: 'GREEN VALLEY, 77-78, Shipra Path, behind SECTOR 153, near TAT PLANT, SMS Colony, Mansarovar, Jaipur, Rajasthan 302020',
  phoneDisplay: '063778 19570',
  phoneHref: '+916377819570',
  whatsAppPhone: '916377819570',
  status: 'Open, closes 6:30 PM',
  hours: 'Open daily, closes 6:30 PM',
};

export const directionsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
  business.address
)}`;

export const getWhatsAppLink = (plantName = 'your plants') => {
  const message = encodeURIComponent(
    `Hello Madhuban Nursery, I am interested in ${plantName}. Please share price and availability.`
  );
  return `https://wa.me/${business.whatsAppPhone}?text=${message}`;
};
