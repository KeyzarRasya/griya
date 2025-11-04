<script>
  import { goto } from '$app/navigation';
  import { fittingFormsList, calculateDaysFromEvent, getNearestEventDate } from '$lib/data/fittingFormsData';
  import { getEventById } from '$lib/data/events';
  import { getAllMarketingNames } from '$lib/data/marketingData';

  // Use data from fittingFormsData.js
  let allContacts = fittingFormsList;

  const stages = [
    { id: 'new', name: 'New', color: 'bg-blue-100 text-blue-800', borderColor: 'border-blue-300' },
    { id: 'fitting', name: 'Fitting', color: 'bg-purple-100 text-purple-800', borderColor: 'border-purple-300' },
    { id: 'finalization', name: 'Finalization', color: 'bg-yellow-100 text-yellow-800', borderColor: 'border-yellow-300' },
    { id: 'preparation', name: 'Preparation', color: 'bg-green-100 text-green-800', borderColor: 'border-green-300' }
  ];

  // Get marketing staff from master data
  const marketingStaff = getAllMarketingNames();

  let draggedContact = null;

  // Search filters
  let selectedMarketing = '';
  let searchNamaPengantin = '';
  let searchDate = '';

  // Reactive filtered contacts
  $: filteredContacts = allContacts.filter(contact => {
    if (selectedMarketing && contact.marketingName !== selectedMarketing) {
      return false;
    }
    if (searchNamaPengantin.trim() && !contact.namaPengantin.toLowerCase().includes(searchNamaPengantin.toLowerCase().trim())) {
      return false;
    }
    if (searchDate) {
      const nearestEvent = getNearestEventDate(contact.id);
      if (!nearestEvent || nearestEvent.date !== searchDate) {
        return false;
      }
    }
    return true;
  });

  // Reactive function to get contacts by stage
  $: getFilteredContactsByStage = (stageId) => {
    return filteredContacts.filter(contact => contact.stage === stageId);
  };

  function resetSearch() {
    selectedMarketing = '';
    searchNamaPengantin = '';
    searchDate = '';
  }

  function handleDragStart(event, contact) {
    draggedContact = contact;
    event.dataTransfer.effectAllowed = 'move';
  }

  function handleDragOver(event) {
    event.preventDefault();
    event.dataTransfer.dropEffect = 'move';
  }

  function handleDrop(event, targetStage) {
    event.preventDefault();
    if (draggedContact) {
      const contactIndex = allContacts.findIndex(c => c.id === draggedContact.id);
      if (contactIndex !== -1) {
        allContacts[contactIndex].stage = targetStage;
        allContacts = [...allContacts];
      }
      draggedContact = null;
    }
  }

  function openContact(contactId) {
    goto(`/fitting/${contactId}`);
  }

  function createNewContact() {
    goto('/fitting/new');
  }

  function getInitials(name) {
    const names = name.split(' ');
    if (names.length >= 2) {
      return names[0][0] + names[names.length - 1][0];
    }
    return name.substring(0, 2);
  }

  // Format date to readable format
  function formatEventDate(dateString) {
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('id-ID', options);
  }

  // Get event display data
  function getEventDisplay(contact) {
    const eventData = getEventById(contact.events);
    if (!eventData || !eventData.events || eventData.events.length === 0) {
      return null;
    }
    
    const nearestEvent = getNearestEventDate(contact.id);
    if (!nearestEvent) {
      return null;
    }

    return {
      eventTypes: nearestEvent.eventTypes,
      date: nearestEvent.date,
      formattedDate: formatEventDate(nearestEvent.date)
    };
  }
</script>

<div class="bg-white rounded-lg shadow-md p-8 border-t-4 border-rose-300">
  <div class="flex items-center justify-between mb-8">
    <div>
      <h2 class="text-3xl font-serif text-gray-800 mb-2">Fitting Forms - Kanban View</h2>
      <p class="text-gray-600">Kelola fitting forms dengan tampilan kanban</p>
    </div>
    
    <button
      on:click={createNewContact}
      class="bg-rose-400 hover:bg-rose-500 text-white font-medium py-3 px-6 rounded-lg transition duration-200 flex items-center gap-2"
    >
      <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"></path>
      </svg>
      Tambah Contact Baru
    </button>
  </div>

  <!-- Search Filters -->
  <div class="mb-8 bg-gray-50 rounded-lg p-6 border border-gray-200">
    <div class="grid grid-cols-1 md:grid-cols-4 gap-4">
      <!-- Marketing Filter -->
      <div>
        <label class="block text-sm font-medium text-gray-700 mb-2">Marketing Staff</label>
        <select 
          bind:value={selectedMarketing}
          class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-300 focus:border-transparent outline-none"
        >
          <option value="">-- Semua Marketing --</option>
          {#each marketingStaff as staff}
            <option value={staff}>{staff}</option>
          {/each}
        </select>
      </div>

      <!-- Nama Pengantin Filter -->
      <div>
        <label class="block text-sm font-medium text-gray-700 mb-2">Nama Pengantin</label>
        <input
          type="text"
          bind:value={searchNamaPengantin}
          placeholder="Cari nama pengantin..."
          class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-300 focus:border-transparent outline-none"
        />
      </div>

      <!-- Tanggal Acara Filter -->
      <div>
        <label class="block text-sm font-medium text-gray-700 mb-2">Tanggal Acara</label>
        <input
          type="date"
          bind:value={searchDate}
          class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-300 focus:border-transparent outline-none"
        />
      </div>

      <!-- Reset Button -->
      <div class="flex items-end">
        <button
          on:click={resetSearch}
          class="w-full px-4 py-3 bg-gray-200 hover:bg-gray-300 text-gray-700 font-medium rounded-lg transition duration-200"
        >
          Reset Filter
        </button>
      </div>
    </div>

    <!-- Active Filters Display -->
    {#if selectedMarketing || searchNamaPengantin || searchDate}
      <div class="mt-4 flex flex-wrap gap-2">
        <span class="text-sm text-gray-600 font-medium">Active Filters:</span>
        {#if selectedMarketing}
          <span class="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm flex items-center gap-2">
            Marketing: {selectedMarketing}
            <button on:click={() => selectedMarketing = ''} class="hover:text-blue-900">
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
              </svg>
            </button>
          </span>
        {/if}
        {#if searchNamaPengantin}
          <span class="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm flex items-center gap-2">
            Nama: {searchNamaPengantin}
            <button on:click={() => searchNamaPengantin = ''} class="hover:text-blue-900">
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
              </svg>
            </button>
          </span>
        {/if}
        {#if searchDate}
          <span class="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm flex items-center gap-2">
            Tanggal: {searchDate}
            <button on:click={() => searchDate = ''} class="hover:text-blue-900">
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
              </svg>
            </button>
          </span>
        {/if}
      </div>
    {/if}

    <!-- Results Count -->
    <div class="mt-4 text-sm text-gray-600">
      Menampilkan {filteredContacts.length} dari {allContacts.length} contact
    </div>
  </div>

  <!-- Kanban Board -->
  <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
    {#each stages as stage}
      <div
        class="bg-gray-50 rounded-lg p-4 border-2 {stage.borderColor}"
        on:dragover={handleDragOver}
        on:drop={(e) => handleDrop(e, stage.id)}
      >
        <div class="flex items-center justify-between mb-4">
          <h3 class="font-semibold text-gray-800 text-lg">{stage.name}</h3>
          <span class="px-3 py-1 rounded-full text-xs font-medium {stage.color}">
            {getFilteredContactsByStage(stage.id).length}
          </span>
        </div>

        <div class="space-y-3">
          {#each getFilteredContactsByStage(stage.id) as contact}
            {@const daysInfo = calculateDaysFromEvent(contact.id)}
            {@const eventDisplay = getEventDisplay(contact)}
            <div
              class="bg-white rounded-lg p-4 shadow-sm border border-gray-200 hover:shadow-md transition duration-200 cursor-move relative"
              draggable="true"
              on:dragstart={(e) => handleDragStart(e, contact)}
              on:click={() => openContact(contact.id)}
            >
              <div class="flex items-start gap-3 mb-3">
                <div class="w-10 h-10 rounded-full bg-rose-100 flex items-center justify-center flex-shrink-0">
                  <span class="text-rose-600 font-semibold text-sm">
                    {getInitials(contact.namaPengantin)}
                  </span>
                </div>
                <div class="flex-1 min-w-0">
                  <h4 class="font-semibold text-gray-800 text-sm truncate">{contact.namaPengantin}</h4>
                  <p class="text-xs text-gray-500 mt-1">
                    Marketing: {contact.marketingName}
                  </p>
                  <div class="mt-2">
                    {#if eventDisplay}
                      {#if eventDisplay.eventTypes.length > 1}
                        <div class="space-y-1">
                          {#each eventDisplay.eventTypes as eventType}
                            <div class="text-xs font-medium text-blue-800">
                              {eventType} {eventDisplay.formattedDate}
                            </div>
                          {/each}
                        </div>
                      {:else}
                        <span class="px-2 py-1 text-xs font-medium rounded-full bg-blue-100 text-blue-800">
                          {eventDisplay.eventTypes[0]} - {eventDisplay.formattedDate}
                        </span>
                      {/if}
                    {:else}
                      <span class="px-2 py-1 text-xs font-medium rounded-full bg-gray-100 text-gray-600">
                        No events
                      </span>
                    {/if}
                  </div>
                </div>
              </div>
              
              <!-- Days Remaining/Passed Badge - Bottom Left -->
              <div class="mt-3 pt-3 border-t border-gray-100">
                <span class="text-xs font-medium {daysInfo.type === 'remaining' ? 'text-green-600' : daysInfo.type === 'passed' ? 'text-red-600' : 'text-orange-600'}">
                  {daysInfo.text}
                </span>
              </div>
            </div>
          {/each}
        </div>
      </div>
    {/each}
  </div>
</div>