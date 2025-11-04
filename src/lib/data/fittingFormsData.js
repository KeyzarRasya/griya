// src/lib/data/fittingFormsData.js
import { getEventById } from "./events";

export const fittingFormsList = [
  {
    id: 1,
    marketingName: 'Siti Nurhaliza',
    namaPengantin: 'Budi & Ani',
    contacts: [
      {id: 1, name: 'Keyzar Rasya Athallah', phone: '0895365075059', keterangan: 'Kang Deploy'},
      {id:2, name: 'Athallah', phone: '080000000', keterangan: 'terlalu terang'}
    ],
    events: 1,
    stage: 'new',
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
      {id:3, name: 'Ibrohim Hasan', phone: '0895365075059', keterangan: 'Kang Deploy'},
      {id:4, name: 'Agung', phone: '080000000', keterangan: 'terlalu terang'}
    ],
    events: 1,
    stage: 'fitting',
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
      {id:5, name: 'Farhan', phone: '0895365075059', keterangan: 'Kang Deploy'},
      {id:6, name: 'Iksan', phone: '080000000', keterangan: 'terlalu terang'}
    ],
    events: 2,
    stage: 'finalization',
    status: 'In Progress',
    createdAt: '2025-10-12',
    lastUpdated: '2025-10-16',
    files: [
      'Invoice',
    ]
  },
  {
    id: 4,
    marketingName: 'Dewi Lestari',
    namaPengantin: 'Rudi & Maya',
    contacts: [
      {id:7, name: 'Rudi Hermawan', phone: '08123456789', keterangan: 'Pengantin Pria'},
      {id:8, name: 'Maya Sari', phone: '08987654321', keterangan: 'Pengantin Wanita'}
    ],
    events: 1,
    stage: 'preparation',
    status: 'In Progress',
    createdAt: '2025-10-05',
    lastUpdated: '2025-10-18',
    files: [
      'Invoice'
    ]
  },
  {
    id: 5,
    marketingName: 'Ahmad Rizky',
    namaPengantin: 'Andi & Sari',
    contacts: [
      {id:9, name: 'Andi Wijaya', phone: '08234567890', keterangan: 'Pengantin Pria'},
      {id:10, name: 'Sari Indah', phone: '08345678901', keterangan: 'Pengantin Wanita'}
    ],
    events: 2,
    stage: 'new',
    status: 'Draft',
    createdAt: '2025-10-20',
    lastUpdated: '2025-10-22',
    files: []
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

// Function to get fitting event with related events data
export function getFittingEvent(fittingId) {
  let fitting = fittingFormsList.find(e => e.id === fittingId);
  return getEventById(fitting?.events);
}

// Function to get nearest event date from fitting
export function getNearestEventDate(fittingId) {
  const fittingEvents = getFittingEvent(fittingId);
  if (!fittingEvents || !fittingEvents.events || fittingEvents.events.length === 0) {
    return null;
  }

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const nearestEvent = fittingEvents.events
    .map(event => ({
      ...event,
      dateObj: new Date(event.date)
    }))
    .sort((a, b) => {
      const diffA = Math.abs(a.dateObj - today);
      const diffB = Math.abs(b.dateObj - today);
      return diffA - diffB;
    })[0];

  return nearestEvent;
}

// Function to calculate days remaining or days passed
export function calculateDaysFromEvent(fittingId) {
  const nearestEvent = getNearestEventDate(fittingId);
  if (!nearestEvent) {
    return { text: 'No event', type: 'none' };
  }

  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const eventDate = new Date(nearestEvent.date);
  eventDate.setHours(0, 0, 0, 0);

  const diffTime = eventDate - today;
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

  if (diffDays > 0) {
    return { 
      text: `${diffDays} days remaining`, 
      type: 'remaining',
      days: diffDays,
      eventDate: nearestEvent.date
    };
  } else if (diffDays < 0) {
    return { 
      text: `${Math.abs(diffDays)} days passed`, 
      type: 'passed',
      days: Math.abs(diffDays),
      eventDate: nearestEvent.date
    };
  } else {
    return { 
      text: 'Today', 
      type: 'today',
      days: 0,
      eventDate: nearestEvent.date
    };
  }
}