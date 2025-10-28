export function load({ params, url }) {
  const eventTypes = url.searchParams.get('eventTypes');
  
  return {
    contactId: params.id,
    eventId: params.eventId,
    eventTypes: eventTypes ? eventTypes.split(',') : []
  };
}