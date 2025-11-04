// src/lib/data/marketingData.js

export const marketingStaffList = [
  {
    id: 1,
    name: 'Siti Nurhaliza',
    email: 'siti.nurhaliza@griyaaristy.com',
    phone: '08123456789',
    role: 'Senior Marketing',
    joinDate: '2023-01-15',
    isActive: true
  },
  {
    id: 2,
    name: 'Dewi Lestari',
    email: 'dewi.lestari@griyaaristy.com',
    phone: '08234567890',
    role: 'Marketing',
    joinDate: '2023-06-20',
    isActive: true
  },
  {
    id: 3,
    name: 'Ahmad Rizky',
    email: 'ahmad.rizky@griyaaristy.com',
    phone: '08345678901',
    role: 'Marketing',
    joinDate: '2024-02-10',
    isActive: true
  },
  {
    id: 4,
    name: 'Administrator',
    email: 'admin@griyaaristy.com',
    phone: '08111222333',
    role: 'Admin',
    joinDate: '2022-01-01',
    isActive: true
  }
];

// Function to get all active marketing staff
export function getActiveMarketingStaff() {
  return marketingStaffList.filter(staff => staff.isActive);
}

// Function to get marketing staff by ID
export function getMarketingById(id) {
  return marketingStaffList.find(staff => staff.id === parseInt(id));
}

// Function to get marketing staff by name
export function getMarketingByName(name) {
  return marketingStaffList.find(staff => staff.name === name);
}

// Function to get all marketing staff names
export function getAllMarketingNames() {
  return marketingStaffList.filter(staff => staff.isActive).map(staff => staff.name);
}