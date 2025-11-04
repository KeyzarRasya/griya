<script>
  import { page } from '$app/stores';
  import { goto } from '$app/navigation';
  import { onMount } from 'svelte';
  import {fittingFormsList, getFittingEvent} from '$lib/data/fittingFormsData'
  import {getEventById} from '$lib/data/events'
  import { getAllMarketingNames } from '$lib/data/marketingData';

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

  // Get marketing staff from master data
  const marketingStaffList = getAllMarketingNames();

  // Selected salespersons array
  let selectedSalespersons = fitting?.marketingName ? [fitting.marketingName] : [];
  let currentSalespersonSelection = '';

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

  // Salesperson multi-select functions
  function addSalesperson() {
    if (currentSalespersonSelection && !selectedSalespersons.includes(currentSalespersonSelection)) {
      selectedSalespersons = [...selectedSalespersons, currentSalespersonSelection];
      currentSalespersonSelection = '';
    }
  }

  function removeSalesperson(salesperson) {
    selectedSalespersons = selectedSalespersons.filter(s => s !== salesperson);
  }

  // Watch for dropdown change
  $: if (currentSalespersonSelection) {
    addSalesperson();
  }

  // Contract functionality
  let showPrintContractModal = false;
  let selectedContractedContact = null;
  console.log(selectedContractedContact)
  let contractForm = {
    nama: '',
    nik: '',
    tanggalLahir: '',
    alamat: '',
    nomorHP: ''
  };
  let uploadedContracts = [];

  function openPrintContractModal() {
    showPrintContractModal = true;
    contractForm = {
      nama: '',
      nik: '',
      tanggalLahir: '',
      alamat: '',
      nomorHP: ''
    };
  }

  function closePrintContractModal() {
    showPrintContractModal = false;
  }

  function handlePrintContract() {
    if (!contractForm.nama || !contractForm.nik || !contractForm.tanggalLahir || !contractForm.alamat || !contractForm.nomorHP) {
      alert('Semua field harus diisi');
      return;
    }
    
    console.log('Print contract with data:', contractForm);
    alert('Contract data submitted for printing');
    closePrintContractModal();
  }

  function handleContractUpload(event) {
    const files = event.target.files;
    if (files && files.length > 0) {
      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        uploadedContracts = [...uploadedContracts, {
          id: Date.now() + i,
          name: file.name,
          size: (file.size / 1024).toFixed(2) + ' KB',
          uploadDate: new Date().toLocaleDateString('id-ID')
        }];
      }
      alert(`${files.length} contract(s) uploaded successfully`);
      event.target.value = '';
    }
  }

  function removeContract(contractId) {
    if (confirm('Hapus contract ini?')) {
      uploadedContracts = uploadedContracts.filter(c => c.id !== contractId);
    }
  }

  function handleClickOutside(event) {
    const dropdown = document.querySelector('.event-dropdown-container');
    if (dropdown && !dropdown.contains(event.target)) {
      showEventDropdown = false;
    }
  }

  function onChangeNameContract(event) {
    let value = event.target.value;
    for (let i = 0; i < contacts.length; i++) {
      if (value == contacts[i].name) {
        contractForm.nomorHP = contacts[i].phone
      }
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
            <select 
              bind:value={currentSalespersonSelection}
              class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-rose-300"
            >
              <option value="">Choose Salesperson</option>
              {#each marketingStaffList as staff}
                <option value={staff}>{staff}</option>
              {/each}
            </select>

            <!-- Selected Salespersons Display -->
            {#if selectedSalespersons.length > 0}
              <div class="mt-3 flex flex-wrap gap-2">
                {#each selectedSalespersons as salesperson}
                  <span class="inline-flex items-center gap-2 px-3 py-1 bg-rose-100 text-rose-800 rounded-full text-sm">
                    {salesperson}
                    <button
                      type="button"
                      on:click={() => removeSalesperson(salesperson)}
                      class="hover:text-rose-900 focus:outline-none"
                    >
                      <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
                      </svg>
                    </button>
                  </span>
                {/each}
              </div>
            {/if}
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
                    bind:value={contact.name}
                    type="text"
                    placeholder="Nama"
                    class="w-full px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-rose-300 outline-none text-sm"
                  />
                </td>
                <td class="px-6 py-4">
                  <input
                    bind:value={contact.phone}
                    type="text"
                    placeholder="Phone"
                    class="w-full px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-rose-300 outline-none text-sm"
                  />
                </td>
                <td class="px-6 py-4">
                  <input
                    bind:value={contact.keterangan}
                    type="text"
                    placeholder="Keterangan"
                    class="w-full px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-rose-300 outline-none text-sm"
                  />
                </td>
                <td class="px-6 py-4 text-center">
                  <button
                    type="button"
                    on:click={() => removeContactRow(index)}
                    class="text-red-600 hover:text-red-800 font-medium text-sm"
                  >
                    Remove
                  </button>
                </td>
              </tr>
            {/each}
          </tbody>
        </table>
      </div>

      <div class="mt-4">
        <button
          type="button"
          on:click={addContactRow}
          class="px-4 py-2 bg-rose-400 hover:bg-rose-500 text-white text-sm font-medium rounded transition duration-200"
        >
          Add Contact Row
        </button>
      </div>
    </div>

    <!-- Events List -->
    <div class="mb-8">
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
              {#if fitting?.events}
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
              {/if}

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

    <!-- Contract Documents Section -->
    <div class="mb-8">
      <h3 class="text-xl font-semibold text-gray-800 mb-4">Contract Documents</h3>
      
      <div class="bg-white border border-gray-200 rounded-lg p-6">
        <!-- Action Buttons -->
        <div class="flex flex-wrap gap-4 mb-6">
          <button
            on:click={openPrintContractModal}
            class="flex items-center gap-2 px-6 py-3 bg-blue-500 hover:bg-blue-600 text-white font-medium rounded-lg transition duration-200"
          >
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z"></path>
            </svg>
            Print Contract
          </button>

          <label class="flex items-center gap-2 px-6 py-3 bg-green-500 hover:bg-green-600 text-white font-medium rounded-lg transition duration-200 cursor-pointer">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"></path>
            </svg>
            Upload Contract
            <input
              type="file"
              multiple
              accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
              on:change={handleContractUpload}
              class="hidden"
            />
          </label>
        </div>

        <!-- Uploaded Contracts List -->
        {#if uploadedContracts.length > 0}
          <div class="border-t border-gray-200 pt-4">
            <h4 class="text-sm font-medium text-gray-700 mb-3">Uploaded Contracts</h4>
            <div class="space-y-2">
              {#each uploadedContracts as contract}
                <div class="flex items-center justify-between p-3 bg-gray-50 rounded-lg border border-gray-200">
                  <div class="flex items-center gap-3">
                    <svg class="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"></path>
                    </svg>
                    <div>
                      <p class="text-sm font-medium text-gray-800">{contract.name}</p>
                      <p class="text-xs text-gray-500">{contract.size} - Uploaded on {contract.uploadDate}</p>
                    </div>
                  </div>
                  <button
                    on:click={() => removeContract(contract.id)}
                    class="p-2 text-red-600 hover:bg-red-50 rounded-lg transition duration-200"
                    title="Remove contract"
                  >
                    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path>
                    </svg>
                  </button>
                </div>
              {/each}
            </div>
          </div>
        {:else}
          <div class="text-center py-8 text-gray-500">
            <svg class="w-16 h-16 mx-auto mb-4 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
            </svg>
            <p class="text-sm">No contracts uploaded yet</p>
          </div>
        {/if}
      </div>
    </div>
  {/if}
</div>

<!-- Print Contract Modal -->
{#if showPrintContractModal}
  <div class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
    <div class="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
      <div class="p-6 border-b border-gray-200">
        <div class="flex items-center justify-between">
          <h3 class="text-2xl font-semibold text-gray-800">Print Contract</h3>
          <button
            on:click={closePrintContractModal}
            class="p-2 hover:bg-gray-100 rounded-lg transition duration-200"
          >
            <svg class="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
            </svg>
          </button>
        </div>
      </div>

      <div class="p-6">
        <p class="text-gray-600 mb-6">Please fill in the required information to generate the contract document.</p>
        
        <div class="space-y-4">
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">
              Nama <span class="text-red-500">*</span>
            </label>
            <select bind:value={contractForm.nama} on:change={onChangeNameContract} name="contactName" id="contact" class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-300 focus:border-transparent outline-none">
              {#each contacts as contact}
                <option value={contact.name}>{contact.name}</option>
              {/each}
            </select>
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">
              NIK <span class="text-red-500">*</span>
            </label>
            <input
              bind:value={contractForm.nik}
              type="text"
              placeholder="Masukkan NIK"
              class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-300 focus:border-transparent outline-none"
            />
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">
              Tanggal Lahir <span class="text-red-500">*</span>
            </label>
            <input
              bind:value={contractForm.tanggalLahir}
              type="date"
              class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-300 focus:border-transparent outline-none"
            />
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">
              Alamat <span class="text-red-500">*</span>
            </label>
            <textarea
              bind:value={contractForm.alamat}
              placeholder="Masukkan alamat lengkap"
              rows="3"
              class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-300 focus:border-transparent outline-none resize-none"
            ></textarea>
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">
              Nomor HP <span class="text-red-500">*</span>
            </label>
            <input
              bind:value={contractForm.nomorHP}
              type="tel"
              placeholder="08xxx"
              class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-300 focus:border-transparent outline-none"
            />
          </div>
        </div>
      </div>

      <div class="p-6 border-t border-gray-200 flex items-center justify-end gap-4">
        <button
          on:click={closePrintContractModal}
          class="px-6 py-3 bg-gray-200 hover:bg-gray-300 text-gray-700 font-medium rounded-lg transition duration-200"
        >
          Cancel
        </button>
        <button
          on:click={handlePrintContract}
          class="px-6 py-3 bg-blue-500 hover:bg-blue-600 text-white font-medium rounded-lg transition duration-200"
        >
          Print
        </button>
      </div>
    </div>
  </div>
{/if}

<style>
  .event-dropdown-container {
    position: relative;
  }
</style>