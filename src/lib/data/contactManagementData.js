// Mock data for Contact Management
export let thirdParties = [
  {
    id: 1,
    name: 'PT. Elegant Decor',
    email: 'contact@elegantdecor.com',
    phone: '081234567890',
    address: 'Jl. Sudirman No. 123, Jakarta Pusat',
    type: 'WO',
    packages: [
      { id: 1, packageName: 'Paket Basic WO', price: 5000000 },
      { id: 2, packageName: 'Paket Premium WO', price: 10000000 }
    ]
  },
  {
    id: 2,
    name: 'Royal Catering Services',
    email: 'royal@catering.com',
    phone: '081234567891',
    address: 'Jl. Gatot Subroto No. 45, Jakarta Selatan',
    type: 'Catering',
    packages: [
      { id: 1, packageName: 'Paket Silver', price: 50000 },
      { id: 2, packageName: 'Paket Gold', price: 75000 }
    ]
  }
];

export let vendors = [
  {
    id: 1,
    name: 'Kain Batik Indonesia',
    email: 'batik@indonesia.com',
    phone: '082345678901',
    address: 'Jl. Pramuka No. 12, Jakarta Timur',
    type: 'Supplier Kain'
  },
  {
    id: 2,
    name: 'Jahit Kebaya Express',
    email: 'jahit@express.com',
    phone: '082345678902',
    address: 'Jl. Sudirman No. 234, Jakarta Pusat',
    type: 'Jahit Kebaya'
  }
];

export let teams = [
  {
    id: 1,
    name: 'Sarah Beauty',
    email: 'sarah@beauty.com',
    phone: '084567890123',
    type: 'MUA',
    services: [
      { id: 1, serviceName: 'Makeup Pengantin', price: 2000000 },
      { id: 2, serviceName: 'Makeup Bridesmaid', price: 500000 }
    ]
  },
  {
    id: 2,
    name: 'Linda Hairdo',
    email: 'linda@hairdo.com',
    phone: '084567890124',
    type: 'Hairdo',
    services: [
      { id: 1, serviceName: 'Hairdo Pengantin', price: 1500000 },
      { id: 2, serviceName: 'Hairdo Akad', price: 1000000 }
    ]
  }
];

// Package data from existing system
export const packageList = [
  { id: 1, name: 'Paket Silver', category: 'Catering' },
  { id: 2, name: 'Paket Gold', category: 'Catering' },
  { id: 3, name: 'Paket Platinum', category: 'Catering' },
  { id: 4, name: 'Paket Basic WO', category: 'WO' },
  { id: 5, name: 'Paket Premium WO', category: 'WO' },
  { id: 6, name: 'Paket Luxury WO', category: 'WO' }
];

// Helper functions
export function getNextId(array) {
  return array.length > 0 ? Math.max(...array.map(item => item.id)) + 1 : 1;
}

export function addThirdParty(data) {
  const newItem = {
    id: getNextId(thirdParties),
    ...data,
    packages: data.packages || []
  };
  thirdParties = [...thirdParties, newItem];
  return newItem;
}

export function addVendor(data) {
  const newItem = {
    id: getNextId(vendors),
    ...data
  };
  vendors = [...vendors, newItem];
  return newItem;
}

export function addTeam(data) {
  const newItem = {
    id: getNextId(teams),
    ...data,
    services: data.services || []
  };
  teams = [...teams, newItem];
  return newItem;
}

export function deleteContact(type, id) {
  switch(type) {
    case 'third-party':
      thirdParties = thirdParties.filter(item => item.id !== id);
      break;
    case 'vendor':
      vendors = vendors.filter(item => item.id !== id);
      break;
    case 'team':
      teams = teams.filter(item => item.id !== id);
      break;
  }
}