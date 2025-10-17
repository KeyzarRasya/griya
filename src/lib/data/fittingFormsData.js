// src/lib/data/fittingFormsData.js

export const fittingFormsList = [
  {
    id: 1,
    marketingName: 'Siti Nurhaliza',
    namaPengantin: 'Budi & Ani',
    tanggalAcara: '2025-11-15',
    status: 'Draft',
    createdAt: '2025-10-10',
    lastUpdated: '2025-10-15'
  },
  {
    id: 2,
    marketingName: 'Siti Nurhaliza',
    namaPengantin: 'Doni & Sari',
    tanggalAcara: '2025-11-20',
    status: 'Completed',
    createdAt: '2025-10-08',
    lastUpdated: '2025-10-14'
  },
  {
    id: 3,
    marketingName: 'Dewi Lestari',
    namaPengantin: 'Eko & Dewi',
    tanggalAcara: '2025-11-25',
    status: 'In Progress',
    createdAt: '2025-10-12',
    lastUpdated: '2025-10-16'
  },
  {
    id: 4,
    marketingName: 'Dewi Lestari',
    namaPengantin: 'Fajar & Nina',
    tanggalAcara: '2025-12-01',
    status: 'Draft',
    createdAt: '2025-10-11',
    lastUpdated: '2025-10-13'
  },
  {
    id: 5,
    marketingName: 'Rina Kusuma',
    namaPengantin: 'Gani & Putri',
    tanggalAcara: '2025-12-05',
    status: 'Completed',
    createdAt: '2025-10-09',
    lastUpdated: '2025-10-15'
  },
  {
    id: 6,
    marketingName: 'Maya Sari',
    namaPengantin: 'Hadi & Sinta',
    tanggalAcara: '2025-12-10',
    status: 'In Progress',
    createdAt: '2025-10-14',
    lastUpdated: '2025-10-17'
  }
];

// Function to get forms by marketing name
export function getFormsByMarketing(marketingName) {
  if (!marketingName) return [];
  return fittingFormsList.filter(form => form.marketingName === marketingName);
}

// Function to get a single form by ID
export function getFormById(id) {
  return fittingFormsList.find(form => form.id === parseInt(id));
}

// Function to get next ID for new form
export function getNextFormId() {
  return Math.max(...fittingFormsList.map(f => f.id), 0) + 1;
}