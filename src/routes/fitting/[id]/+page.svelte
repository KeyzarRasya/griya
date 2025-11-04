<script>
  import { page } from '$app/stores';
  import { goto } from '$app/navigation';
  import { onMount } from 'svelte';
  import {fittingFormsList, getFittingEvent} from '$lib/data/fittingFormsData'
  import {getEventById} from '$lib/data/events'

  let contactId = $page.params.id;
  let isNewContact = contactId === 'new';
  let fitting = null

  if (!isNewContact) {
    fitting = fittingFormsList.find(e => e.id == parseInt(contactId))
    console.log(fitting)
  }

  $: contacts = fitting?.contacts || [
    { name: '', phone: '', keterangan: '' }
  ];

  console.log(getFittingEvent(fitting.id)?.events)

  // Event options for multiselect
  const eventOptions = ['Akad', 'Resepsi', 'Siraman'];

  // Mock contact data
  let contact = {
    id: '1',
    name: 'Juni & Hermansyah',
    company: 'My Company',
    phone: '08999415758',
    salesperson: 'Administrator',
    stage: 'new',
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
  };

  // Form for new contact
  let newContact = {
    name: '',
    company: '',
    phone: '',
    salesperson: 'Administrator'
  };

  // State for adding new event
  let isAddingEvent = false;
  let newEvent = {
    eventTypes: [],
    date: '',
    location: '',
    notes: ''
  };
  let showEventDropdown = false;

  function goBack() {
    goto('/fitting');
  }

  function removeContactRow(index) {
    contacts = contacts.filter((_, i) => i !== index);
  }

  function addContactRow() {
    contacts = [...contacts, { name: '', phone: '', keterangan: '' }];
  }

  function openEventDetails(event) {
    const eventTypesParam = event.eventTypes.join(',');
    goto(`/fitting/${contactId}/event/${event.id}?eventTypes=${eventTypesParam}`);
  }

  function deleteEvent(eventId) {
    if (confirm('Apakah Anda yakin ingin menghapus event ini?')) {
      contact.events = contact.events.filter(e => e.id !== eventId);
      alert('Event berhasil dihapus');
    }
  }

  function startAddingEvent() {
    isAddingEvent = true;
    newEvent = {
      eventTypes: [],
      date: '',
      location: '',
      notes: ''
    };
  }

  function cancelAddingEvent() {
    isAddingEvent = false;
    newEvent = {
      eventTypes: [],
      date: '',
      location: '',
      notes: ''
    };
    showEventDropdown = false;
  }

  function toggleEventType(eventType, event) {
    event.stopPropagation();
    const index = newEvent.eventTypes.indexOf(eventType);
    if (index > -1) {
      newEvent.eventTypes = newEvent.eventTypes.filter(e => e !== eventType);
    } else {
      newEvent.eventTypes = [...newEvent.eventTypes, eventType];
    }
  }

  function saveNewEvent() {
    if (newEvent.eventTypes.length === 0) {
      alert('Pilih minimal satu tipe event');
      return;
    }
    if (!newEvent.date) {
      alert('Tanggal event harus diisi');
      return;
    }

    const eventId = 'e' + Date.now();
    contact.events = [...contact.events, {
      id: eventId,
      eventTypes: [...newEvent.eventTypes],
      date: newEvent.date,
      status: 'Active',
      location: newEvent.location || '-',
      notes: newEvent.notes || '-'
    }];

    cancelAddingEvent();
    alert('Event berhasil ditambahkan!');
  }

  function formatDate(dateString) {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('id-ID', options);
  }

  function getInitials(name) {
    const names = name.split(' ');
    if (names.length >= 2) {
      return names[0][0] + names[names.length - 1][0];
    }
    return name.substring(0, 2);
  }

  function saveNewContact() {
    if (!newContact.name || !newContact.phone) {
      alert('Mohon isi nama dan nomor telepon');
      return;
    }
    
    console.log('Saving new contact:', newContact);
    alert('Contact baru berhasil disimpan!');
    goto('/fitting');
  }

  function handleClickOutside(event) {
    const dropdown = document.querySelector('.event-dropdown-container');
    if (dropdown && !dropdown.contains(event.target)) {
      showEventDropdown = false;
    }
  }

  onMount(() => {
    document.addEventListener('click', handleClickOutside);
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  });
</script>

<div class="bg-white rounded-lg shadow-md p-8 border-t-4 border-rose-300">
  <!-- Header with Back Button -->
  <div class="flex items-center justify-between mb-8">
    <div class="flex items-center gap-4">
      <button
        on:click={goBack}
        class="p-2 hover:bg-gray-100 rounded-lg transition duration-200"
        title="Kembali ke kanban"
      >
        <svg class="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"></path>
        </svg>
      </button>
      <div>
        <h2 class="text-3xl font-serif text-gray-800">
          {isNewContact ? 'Contact Baru' : fitting?.namaPengantin}
        </h2>
        <p class="text-gray-600 mt-1">
          {isNewContact ? 'Tambah contact baru' : 'Detail contact dan list of events'}
        </p>
      </div>
    </div>
  </div>

  {#if isNewContact}
    <!-- New Contact Form -->
    <div class="bg-gray-50 rounded-lg p-6 border border-gray-200">
      <h3 class="text-xl font-semibold text-gray-800 mb-6">Informasi Contact</h3>
      
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2">
            Nama <span class="text-red-500">*</span>
          </label>
          <input
            bind:value={newContact.name}
            type="text"
            placeholder="Nama pengantin"
            class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-300 focus:border-transparent outline-none"
          />
        </div>

        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2">
            Phone <span class="text-red-500">*</span>
          </label>
          <input
            bind:value={newContact.phone}
            type="tel"
            placeholder="08xxx"
            class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-300 focus:border-transparent outline-none"
          />
        </div>

        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2">
            Salesperson
          </label>
          <select 
            bind:value={newContact.salesperson}
            class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-300 focus:border-transparent outline-none"
          >
            <option value="Administrator">Administrator</option>
            <option value="Marketing A">Marketing A</option>
            <option value="Marketing B">Marketing B</option>
          </select>
        </div>
      </div>

      <div class="mt-8 flex items-center gap-4">
        <button
          on:click={saveNewContact}
          class="bg-rose-400 hover:bg-rose-500 text-white font-medium py-3 px-8 rounded-lg transition duration-200"
        >
          Simpan Contact
        </button>
        <button
          on:click={goBack}
          class="bg-gray-200 hover:bg-gray-300 text-gray-700 font-medium py-3 px-8 rounded-lg transition duration-200"
        >
          Batal
        </button>
      </div>
    </div>
  {:else}
    <!-- Contact Details -->
    <div class="bg-gray-50 rounded-lg p-6 border border-gray-200 mb-8">

      <!-- Opportunity & Salesperson -->
      <div class="grid grid-cols-2 gap-4 mb-5">
          <div>
            <label for="opportunity" class="block text-sm font-medium text-gray-700 mb-2">Opportunity Name</label>
            <input type="text" placeholder="Enter opportunity name" class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-rose-300">
          </div>

          <div>
            <label for="sales" class="block text-sm font-medium text-gray-700 mb-2">Salesperson</label>
            <select name="salesperson" id="salesperson" class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-rose-300">
              <option value="">Choose Salesperson</option>
              <option value="jamal">Jamal</option>
              <option value="abdul">Abdul</option>
              <option value="saepuding">Saepudin</option>
            </select>
          </div>
      </div>

      <div class="overflow-x-auto">
        <table class="min-w-full border border-gray-300">
          <thead class="bg-gray-50">
            <tr>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b">Nama</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b">Phone Number</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b">Keterangan</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b">Action</th>
            </tr>
          </thead>
          <tbody class="bg-white divide-y divide-gray-200">
            {#each contacts as contact, index}
              <tr>
                <td class="px-6 py-4">
                      <input
                        type="text"
                        bind:value={contact.name}
                        class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500"
                        placeholder="Enter name"
                      />
                    </td>
                    <td class="px-6 py-4">
                      <input
                        type="tel"
                        bind:value={contact.phone}
                        class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500"
                        placeholder="Enter phone"
                      />
                    </td>
                    <td class="px-6 py-4">
                      <input
                        type="text"
                        bind:value={contact.keterangan}
                        class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500"
                        placeholder="Enter notes"
                      />
                    </td>
                    <td class="px-6 py-4">
                      <button
                        on:click={() => removeContactRow(index)}
                        class="text-red-500 hover:text-red-700"
                      >
                        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                      </button>
                    </td>  
              </tr>
            {/each}
          </tbody>
        </table>
      </div>

      <button
        on:click={addContactRow}
        class="mt-4 px-4 py-2 font-bold text-rose-400 rounded-md hover:bg-amber-50 transition-colors"
        >
        Add Row
      </button>

    </div>

    <!-- List of Events -->
    <div>
      <h3 class="text-xl font-semibold text-gray-800 mb-4">List of Event</h3>

      <div class="bg-white border border-gray-200 rounded-lg overflow-hidden">
        <div class="overflow-x-auto">
          <table class="w-full">
            <thead class="bg-gray-50 border-b border-gray-200">
              <tr>
                <th class="px-6 py-4 text-left text-sm font-semibold text-gray-700">Event</th>
                <th class="px-6 py-4 text-left text-sm font-semibold text-gray-700">Event Date</th>
                <th class="px-6 py-4 text-left text-sm font-semibold text-gray-700">Location</th>
                <th class="px-6 py-4 text-left text-sm font-semibold text-gray-700">Status</th>
                <th class="px-6 py-4 text-left text-sm font-semibold text-gray-700">Notes</th>
                <th class="px-6 py-4 text-center text-sm font-semibold text-gray-700">Actions</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-gray-200">
              {#each getEventById(fitting?.events).events as event}
                <tr class="hover:bg-gray-50 transition duration-150">
                  <td class="px-6 py-4">
                    <div class="flex flex-wrap gap-2">
                      {#each event.eventTypes as eventType}
                        <span class="px-3 py-1 text-xs font-medium rounded-full bg-blue-100 text-blue-800">
                          {eventType}
                        </span>
                      {/each}
                    </div>
                  </td>
                  <td class="px-6 py-4 text-sm text-gray-600">
                    {formatDate(event.date)}
                  </td>
                  <td class="px-6 py-4 text-sm text-gray-600">
                    {event.location}
                  </td>
                  <td class="px-6 py-4">
                    <span class="px-3 py-1 text-xs font-medium rounded-full bg-green-100 text-green-800">
                      {event.status}
                    </span>
                  </td>
                  <td class="px-6 py-4 text-sm text-gray-600">
                    {event.notes}
                  </td>
                  <td class="px-6 py-4">
                    <div class="flex items-center justify-center gap-2">
                      <button
                        on:click={() => openEventDetails(event)}
                        class="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 text-sm font-medium rounded-lg transition duration-200"
                      >
                        Details
                      </button>
                      <button
                        on:click={() => deleteEvent(event.id)}
                        class="p-2 text-red-600 hover:bg-red-50 rounded-lg transition duration-200"
                        title="Hapus event"
                      >
                        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path>
                        </svg>
                      </button>
                    </div>
                  </td>
                </tr>
              {/each}

              {#if isAddingEvent}
                <tr class="bg-blue-50">
                  <td class="px-6 py-4">
                    <div class="event-dropdown-container relative">
                      <button
                        type="button"
                        on:click|stopPropagation={() => showEventDropdown = !showEventDropdown}
                        class="w-full px-3 py-2 text-left border border-gray-300 rounded-lg bg-white hover:border-rose-300 focus:ring-2 focus:ring-rose-300 focus:border-transparent outline-none min-h-[42px]"
                      >
                        {#if newEvent.eventTypes.length > 0}
                          <div class="flex flex-wrap gap-2">
                            {#each newEvent.eventTypes as eventType}
                              <span class="px-2 py-1 text-xs font-medium rounded-full bg-blue-100 text-blue-800">
                                {eventType}
                              </span>
                            {/each}
                          </div>
                        {:else}
                          <span class="text-gray-400 text-sm">Pilih event...</span>
                        {/if}
                      </button>

                      {#if showEventDropdown}
                        <div class="absolute z-50 mt-1 w-full bg-white border border-gray-200 rounded-lg shadow-lg">
                          {#each eventOptions as option}
                            <button
                              type="button"
                              on:click={(e) => toggleEventType(option, e)}
                              class="w-full px-4 py-2 text-left hover:bg-gray-50 flex items-center gap-2"
                            >
                              <input
                                type="checkbox"
                                checked={newEvent.eventTypes.includes(option)}
                                class="w-4 h-4 text-rose-400 rounded focus:ring-rose-300"
                                readonly
                              />
                              <span class="text-sm">{option}</span>
                            </button>
                          {/each}
                        </div>
                      {/if}
                    </div>
                  </td>
                  <td class="px-6 py-4">
                    <input
                      bind:value={newEvent.date}
                      type="date"
                      class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-300 focus:border-transparent outline-none"
                    />
                  </td>
                  <td class="px-6 py-4">
                    <input
                      bind:value={newEvent.location}
                      type="text"
                      placeholder="Location"
                      class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-300 focus:border-transparent outline-none"
                    />
                  </td>
                  <td class="px-6 py-4">
                    <span class="px-3 py-1 text-xs font-medium rounded-full bg-yellow-100 text-yellow-800">
                      Draft
                    </span>
                  </td>
                  <td class="px-6 py-4">
                    <input
                      bind:value={newEvent.notes}
                      type="text"
                      placeholder="Notes"
                      class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-300 focus:border-transparent outline-none"
                    />
                  </td>
                  <td class="px-6 py-4">
                    <div class="flex items-center justify-center gap-2">
                      <button
                        type="button"
                        on:click={saveNewEvent}
                        class="px-4 py-2 bg-green-500 hover:bg-green-600 text-white text-sm font-medium rounded-lg transition duration-200"
                      >
                        Save
                      </button>
                      <button
                        type="button"
                        on:click={cancelAddingEvent}
                        class="px-4 py-2 bg-gray-200 hover:bg-gray-300 text-gray-700 text-sm font-medium rounded-lg transition duration-200"
                      >
                        Cancel
                      </button>
                    </div>
                  </td>
                </tr>
              {/if}
            </tbody>
          </table>
        </div>
      </div>

      <!-- Add Event Button -->
      {#if !isAddingEvent}
        <div class="mt-4">
          <button
            on:click={startAddingEvent}
            class="bg-rose-400 hover:bg-rose-500 text-white font-medium py-3 px-6 rounded-lg transition duration-200 flex items-center gap-2"
          >
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"></path>
            </svg>
            Add Event
          </button>
        </div>
      {/if}
    </div>
  {/if}
</div>

<style>
  .event-dropdown-container {
    position: relative;
  }
</style>