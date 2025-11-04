// src/lib/data/fittingFormsData.js
import { getEventById } from "./events";

export const fittingFormsList = [
  {
    id: 1,
    marketingName: 'Siti Nurhaliza',
    namaPengantin: 'Budi & Ani',
    contacts: [
      {name: 'Keyzar Rasya Athallah', phone: '0895365075059', keterangan: 'Kang Deploy'},
      {name: 'Athallah', phone: '080000000', keterangan: 'terlalu terang'}
    ],
    events: 1,
    tanggalAcara: '2025-11-15',
    status: 'Draft',
    createdAt: '2025-10-10',
    lastUpdated: '2025-10-15',
    files: [
      'Invoice',
      'Kwitansi'
    ]
  },
  {
    id: 2,
    marketingName: 'Siti Nurhaliza',
    namaPengantin: 'Ibrohim & Agung',
    contacts: [
      {name: 'Ibrohim Hasan', phone: '0895365075059', keterangan: 'Kang Deploy'},
      {name: 'Agung', phone: '080000000', keterangan: 'terlalu terang'}
    ],
    events:1,
    tanggalAcara: '2025-11-20',
    status: 'Completed',
    createdAt: '2025-10-08',
    lastUpdated: '2025-10-14',
    files: [
      'Invoice',
      'Kwitansi'
    ]
  },
  {
    id: 3,
    marketingName: 'Dewi Lestari',
    namaPengantin: 'Farhan & Iksan',
    contacts: [
      {name: 'Farhan', phone: '0895365075059', keterangan: 'Kang Deploy'},
      {name: 'Iksan', phone: '080000000', keterangan: 'terlalu terang'}
    ],
    events:2,
    tanggalAcara: '2025-11-25',
    status: 'In Progress',
    createdAt: '2025-10-12',
    lastUpdated: '2025-10-16',
    files: [
      'Invoice',
    ]
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

export function getFittingEvent(fittingId) {
  let fitting = fittingFormsList.find(e => e.id === fittingId);
  return getEventById(fitting?.events)
}