import type { MenuItem, TeamMember } from '@/types';

export const menuItems: MenuItem[] = [
  {
    id: '1',
    name: 'Antipasti della Casa',
    description: 'Selection of cured meats, artisanal cheeses, olives, and grilled vegetables',
    price: 28,
    image: '/images/menu_antipasti.jpg',
    category: 'antipasti',
  },
  {
    id: '2',
    name: 'Tagliatelle al Tartufo',
    description: 'Fresh handmade pasta with black truffle, butter, and aged Parmigiano',
    price: 42,
    image: '/images/menu_pasta_plate.jpg',
    category: 'pasta',
  },
  {
    id: '3',
    name: 'Risotto allo Zafferano',
    description: 'Creamy saffron risotto with bone marrow and gold leaf',
    price: 38,
    image: '/images/menu_risotto.jpg',
    category: 'pasta',
  },
  {
    id: '4',
    name: 'Tagliata di Manzo',
    description: 'Grilled Wagyu beef tagliata with rosemary, sea salt, and arugula',
    price: 56,
    image: '/images/menu_steak.jpg',
    category: 'secondi',
  },
  {
    id: '5',
    name: 'Branzino in Crosta',
    description: 'Mediterranean sea bass with herbs, lemon, and white wine sauce',
    price: 48,
    image: '/images/menu_seafood.jpg',
    category: 'secondi',
  },
  {
    id: '6',
    name: 'Tiramisù della Nonna',
    description: 'Classic Italian dessert with mascarpone, espresso, and cocoa',
    price: 16,
    image: '/images/menu_tiramisu.jpg',
    category: 'dolci',
  },
];

export const teamMembers: TeamMember[] = [
  {
    id: '1',
    name: 'Marco Rossi',
    role: 'Executive Chef',
    image: '/images/chef_kitchen_portrait.jpg',
    bio: 'With over 20 years of experience in Michelin-starred kitchens across Italy and New York, Chef Marco brings authentic Italian flavors with a modern twist.',
  },
  {
    id: '2',
    name: 'Alessandro Conti',
    role: 'Head Sommelier',
    image: '/images/team_sommelier.jpg',
    bio: 'Alessandro curates our award-winning wine cellar, featuring over 500 labels from Italy\'s finest vineyards and hidden gems.',
  },
  {
    id: '3',
    name: 'Giuseppe Romano',
    role: 'Restaurant Manager',
    image: '/images/team_manager.jpg',
    bio: 'Giuseppe ensures every guest experiences the warmth of Italian hospitality, overseeing our dedicated team of service professionals.',
  },
];
