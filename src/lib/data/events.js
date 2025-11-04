export const eventsData = [
    {
        id: 1,
        events: [
            { 
                id: 'e1', 
                eventTypes: ['Akad', 'Resepsi'],
                date: '2025-12-15', 
                status: 'Active',
                location: 'Jakarta',
                notes: 'VIP Package'
            },
            { 
                id: 'e2', 
                eventTypes: ['Siraman'],
                date: '2025-12-20', 
                status: 'Active',
                location: 'Bandung',
                notes: 'Standard Package'
            }
        ]
    },

    {
        id:2,
        events: [
            { 
                id: 'e3', 
                eventTypes: ['Akad', 'Siraman'],
                date: '2025-12-20', 
                status: 'Active',
                location: 'Bandung',
                notes: 'VIP Package'
            },
        ]
    }
]

export function getEventById(id) {
    return eventsData.find(e => e.id === id)
}