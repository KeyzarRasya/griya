<script>
  import { goto } from '$app/navigation';
  import { formData, resetForm } from '$lib/stores/formStore.js';
  import PengantinForm from '$lib/components/PengantinForm.svelte';
  import OrangTuaForm from '$lib/components/OrangTuaForm.svelte';
  import RincianBiayaForm from '$lib/components/RincianBiayaForm.svelte';

  export let data;

  let activeTab = 'pengantin';
  let contactId = data.contactId;
  let eventId = data.eventId;
  let eventTypes = data.eventTypes || [];
  let isNewEvent = eventId === 'new';

  // Mock data
  let contact = {
    id: '1',
    name: 'Juni & Hermansyah',
    company: 'My Company',
    phone: '08999415758'
  };

  let event = {
    id: 'e1',
    name: 'Studio Kencana',
    date: '2025-12-15',
    status: 'Active',
    location: 'Jakarta',
    notes: 'VIP Package',
    eventTypes: eventTypes
  };

  // Update history mock data
  let updateHistory = [
    { date: '2025-10-20 14:30', document: 'Initial form created' },
    { date: '2025-10-21 09:15', document: 'Data Pengantin updated' },
    { date: '2025-10-22 16:45', document: 'Rincian Biaya updated' },
    { date: '2025-10-23 11:20', document: 'Data Orang Tua updated' },
    { date: '2025-10-24 13:50', document: 'Final review completed' }
  ];

  function handleUpdateForm() {
    const timestamp = new Date();
    const tabName = activeTab === 'pengantin' ? 'Data Pengantin' : 
                    activeTab === 'orangtua' ? 'Data Orang Tua' : 
                    'Rincian Biaya';
    
    updateHistory = [
      { 
        date: timestamp.toLocaleString('id-ID', { 
          year: 'numeric', 
          month: '2-digit', 
          day: '2-digit',
          hour: '2-digit',
          minute: '2-digit'
        }), 
        document: `${tabName} updated` 
      },
      ...updateHistory
    ];

    console.log('Form updated:', JSON.stringify($formData, null, 2));
    alert(`${tabName} berhasil diupdate!`);
  }

  function handleReset() {
    if (confirm('Apakah Anda yakin ingin mereset form?')) {
      resetForm();
      alert('Form telah direset');
    }
  }

  function goBackToContact() {
    goto(`/fitting/${contactId}`);
  }

  function formatDate(dateString) {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('id-ID', options);
  }

  function handleDelete() {
    if (confirm('Apakah Anda yakin ingin menghapus event ini?')) {
      alert('Event berhasil dihapus!');
      goto(`/fitting/${contactId}`);
    }
  }

  function handlePrint() {
    window.print();
  }
</script>

<div class="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
  <div class="max-w-7xl mx-auto">
    <!-- Header -->
    <div class="bg-white rounded-lg shadow-sm p-6 mb-8">
      <div class="flex items-center justify-between mb-4">
        <button on:click={goBackToContact} class="flex items-center text-gray-600 hover:text-gray-800 transition duration-200">
          <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path>
          </svg>
          Back to Contact
        </button>
        <h1 class="text-3xl font-bold text-gray-800">
          {isNewEvent ? 'New Event' : 'Event Details'}
        </h1>
      </div>

      <div class="flex items-center justify-between">
        <button on:click={handlePrint} class="flex items-center gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded transition duration-200">
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z"></path>
          </svg>
          Print
        </button>
        {#if !isNewEvent}
          <div class="flex items-center gap-2">
            <div class="text-right">
              <p class="text-sm text-gray-500">Event Date</p>
              <p class="text-sm font-semibold text-gray-800">{formatDate(event.date)}</p>
            </div>
            <span class="px-3 py-1 text-xs font-medium rounded-full bg-green-100 text-green-800">
              {event.status}
            </span>
          </div>
        {/if}
      </div>
    </div>

    <!-- Event Info Card -->
    <div class="bg-gray-50 rounded-lg p-6 border border-gray-200 mb-8">
      <div class="grid grid-cols-1 md:grid-cols-5 gap-4">
        <div>
          <p class="text-sm text-gray-500 mb-1">Contact Name</p>
          <p class="font-semibold text-gray-800">{contact.name}</p>
        </div>
        <div>
          <p class="text-sm text-gray-500 mb-1">Company</p>
          <p class="font-semibold text-gray-800">{contact.company}</p>
        </div>
        <div>
          <p class="text-sm text-gray-500 mb-1">Phone</p>
          <p class="font-semibold text-gray-800">{contact.phone}</p>
        </div>
        {#if !isNewEvent}
          <div>
            <p class="text-sm text-gray-500 mb-1">Location</p>
            <p class="font-semibold text-gray-800">{event.location}</p>
          </div>
          <div>
            <p class="text-sm text-gray-500 mb-1">Event Types</p>
            <div class="flex flex-wrap gap-1">
              {#each eventTypes as eventType}
                <span class="px-2 py-1 text-xs font-medium rounded-full bg-blue-100 text-blue-800">
                  {eventType}
                </span>
              {/each}
            </div>
          </div>
        {/if}
      </div>
    </div>

    <!-- Tabs -->
    <div class="border-b border-gray-200 mb-8">
      <nav class="flex space-x-8">
        <button
          on:click={() => activeTab = 'pengantin'}
          class="py-4 px-1 border-b-2 font-medium text-sm {activeTab === 'pengantin' 
            ? 'border-rose-400 text-rose-600' 
            : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'} transition duration-200"
        >
          Data Pengantin
        </button>
        <button
          on:click={() => activeTab = 'orangtua'}
          class="py-4 px-1 border-b-2 font-medium text-sm {activeTab === 'orangtua' 
            ? 'border-rose-400 text-rose-600' 
            : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'} transition duration-200"
        >
          Data Orang Tua
        </button>
        <button
          on:click={() => activeTab = 'rincian'}
          class="py-4 px-1 border-b-2 font-medium text-sm {activeTab === 'rincian' 
            ? 'border-rose-400 text-rose-600' 
            : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'} transition duration-200"
        >
          Rincian Biaya
        </button>
        <button
          on:click={() => activeTab = 'history'}
          class="py-4 px-1 border-b-2 font-medium text-sm {activeTab === 'history' 
            ? 'border-rose-400 text-rose-600' 
            : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'} transition duration-200"
        >
          Update History
        </button>
      </nav>
    </div>

    <!-- Tab Content -->
    <div class="min-h-[500px]">
      {#if activeTab === 'pengantin'}
        <PengantinForm adatOptions={eventTypes} />
      {:else if activeTab === 'orangtua'}
        <OrangTuaForm eventTypes={eventTypes} />
      {:else if activeTab === 'rincian'}
        <RincianBiayaForm />
      {:else if activeTab === 'history'}
        <!-- Update History Table -->
        <div class="bg-white border border-gray-200 rounded-lg overflow-hidden">
          <div class="px-6 py-4 bg-gray-50 border-b border-gray-200">
            <h3 class="text-lg font-semibold text-gray-800">Update History</h3>
            <p class="text-sm text-gray-600 mt-1">Riwayat perubahan dokumen</p>
          </div>
          
          <table class="w-full">
            <thead class="bg-gray-50 border-b border-gray-200">
              <tr>
                <th class="px-6 py-4 text-left text-sm font-semibold text-gray-700 w-1/3">Date</th>
                <th class="px-6 py-4 text-left text-sm font-semibold text-gray-700 w-2/3">Document</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-gray-200">
              {#each updateHistory as update}
                <tr class="hover:bg-gray-50">
                  <td class="px-6 py-4 text-sm text-gray-700">{update.date}</td>
                  <td class="px-6 py-4 text-sm text-gray-700">{update.document}</td>
                </tr>
              {/each}
            </tbody>
          </table>
        </div>
      {/if}
    </div>

    <!-- Action Buttons -->
    <div class="flex justify-between items-center mt-8 pt-8 border-t border-gray-200">
      <button on:click={handleReset} class="px-6 py-3 bg-gray-500 hover:bg-gray-600 text-white rounded-lg transition duration-200 font-medium">
        Reset Form
      </button>
      
      <div class="flex gap-4">
        {#if !isNewEvent}
          <button on:click={handleDelete} class="px-6 py-3 bg-red-500 hover:bg-red-600 text-white rounded-lg transition duration-200 font-medium">
            Delete Event
          </button>
        {/if}
        <button on:click={handleUpdateForm} class="px-6 py-3 bg-rose-400 hover:bg-rose-500 text-white rounded-lg transition duration-200 font-medium">
          {isNewEvent ? 'Create Event' : 'Update Form'}
        </button>
      </div>
    </div>
  </div>
</div>