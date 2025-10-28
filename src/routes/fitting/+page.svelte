<script>
  import { goto } from '$app/navigation';

  // Mock data for contacts with events
  let allContacts = [
    {
      id: '1',
      name: 'Juni & Hermansyah',
      company: 'My Company',
      phone: '08999415758',
      salesperson: 'Administrator',
      stage: 'new',
      tanggalAcara: '2025-12-15',
      events: [
        { id: 'e1', name: 'Studio Kencana', date: '2025-12-15', status: 'Active' },
        { id: 'e2', name: 'Gedung Permata', date: '2025-12-20', status: 'Active' }
      ]
    },
    {
      id: '2',
      name: 'Budi & Ani',
      company: 'PT Sejahtera',
      phone: '08123456789',
      salesperson: 'Administrator',
      stage: 'fitting',
      tanggalAcara: '2025-11-10',
      events: [
        { id: 'e3', name: 'Ballroom Indah', date: '2025-11-10', status: 'Active' }
      ]
    },
    {
      id: '3',
      name: 'Dewi & Ahmad',
      company: 'CV Maju Jaya',
      phone: '08567891234',
      salesperson: 'Marketing A',
      stage: 'finalization',
      tanggalAcara: '2025-11-25',
      events: [
        { id: 'e4', name: 'Gedung Griya', date: '2025-11-25', status: 'Active' },
        { id: 'e5', name: 'Studio Elegan', date: '2025-11-26', status: 'Active' }
      ]
    },
    {
      id: '4',
      name: 'Siti & Joko',
      company: 'Toko Bahagia',
      phone: '08765432198',
      salesperson: 'Marketing B',
      stage: 'preparation',
      tanggalAcara: '2025-10-30',
      events: [
        { id: 'e6', name: 'Ballroom Grand', date: '2025-10-30', status: 'Active' }
      ]
    },
    {
      id: '5',
      name: 'Rina & Andi',
      company: 'PT Digital Solutions',
      phone: '08234567890',
      salesperson: 'Administrator',
      stage: 'new',
      tanggalAcara: '2026-01-15',
      events: [
        { id: 'e7', name: 'Gedung Megah', date: '2026-01-15', status: 'Active' }
      ]
    },
    {
      id: '6',
      name: 'Maya & Rudi',
      company: 'CV Kreatif',
      phone: '08345678901',
      salesperson: 'Marketing A',
      stage: 'fitting',
      tanggalAcara: '2025-12-05',
      events: [
        { id: 'e8', name: 'Studio Modern', date: '2025-12-05', status: 'Active' },
        { id: 'e9', name: 'Ballroom Vista', date: '2025-12-06', status: 'Active' }
      ]
    },
    {
      id: '7',
      name: 'Budi Santoso & Lisa',
      company: 'PT Maju Bersama',
      phone: '08111222333',
      salesperson: 'Marketing A',
      stage: 'new',
      tanggalAcara: '2025-12-20',
      events: [
        { id: 'e10', name: 'Gedung Sentosa', date: '2025-12-20', status: 'Active' }
      ]
    },
    {
      id: '8',
      name: 'Andi Budi & Sari',
      company: 'CV Sukses',
      phone: '08222333444',
      salesperson: 'Marketing B',
      stage: 'fitting',
      tanggalAcara: '2025-11-18',
      events: [
        { id: 'e11', name: 'Studio Cantik', date: '2025-11-18', status: 'Active' }
      ]
    }
  ];

  const stages = [
    { id: 'new', name: 'New', color: 'bg-blue-100 text-blue-800', borderColor: 'border-blue-300' },
    { id: 'fitting', name: 'Fitting', color: 'bg-purple-100 text-purple-800', borderColor: 'border-purple-300' },
    { id: 'finalization', name: 'Finalization', color: 'bg-yellow-100 text-yellow-800', borderColor: 'border-yellow-300' },
    { id: 'preparation', name: 'Preparation', color: 'bg-green-100 text-green-800', borderColor: 'border-green-300' }
  ];

  const marketingStaff = ['Administrator', 'Marketing A', 'Marketing B'];

  let draggedContact = null;

  // Search filters
  let selectedMarketing = '';
  let searchNamaPengantin = '';
  let searchDate = '';

  // Reactive filtered contacts
  $: filteredContacts = allContacts.filter(contact => {
    if (selectedMarketing && contact.salesperson !== selectedMarketing) {
      return false;
    }
    if (searchNamaPengantin.trim() && !contact.name.toLowerCase().includes(searchNamaPengantin.toLowerCase().trim())) {
      return false;
    }
    if (searchDate && contact.tanggalAcara !== searchDate) {
      return false;
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
          bind:value={searchNamaPengantin}
          type="text"
          placeholder="Cari nama pengantin..."
          class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-300 focus:border-transparent outline-none"
        />
      </div>

      <!-- Tanggal Acara Filter -->
      <div>
        <label class="block text-sm font-medium text-gray-700 mb-2">Tanggal Acara</label>
        <input
          bind:value={searchDate}
          type="date"
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
        <span class="text-sm text-gray-600">Filter aktif:</span>
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
            <div
              class="bg-white rounded-lg p-4 shadow-sm border border-gray-200 hover:shadow-md transition duration-200 cursor-move"
              draggable="true"
              on:dragstart={(e) => handleDragStart(e, contact)}
              on:click={() => openContact(contact.id)}
            >
              <div class="flex items-start gap-3 mb-3">
                <div class="w-10 h-10 rounded-full bg-rose-100 flex items-center justify-center flex-shrink-0">
                  <span class="text-rose-600 font-semibold text-sm">
                    {getInitials(contact.name)}
                  </span>
                </div>
                <div class="flex-1 min-w-0">
                  <h4 class="font-semibold text-gray-800 text-sm truncate">{contact.name}</h4>
                  <p class="text-xs text-gray-500 truncate">{contact.company}</p>
                </div>
              </div>

              <div class="space-y-2 text-xs text-gray-600">
                <div class="flex items-center gap-2">
                  <svg class="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path>
                  </svg>
                  <span class="truncate">{contact.phone}</span>
                </div>

                <div class="flex items-center gap-2">
                  <svg class="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
                  </svg>
                  <span class="truncate">{contact.salesperson}</span>
                </div>

                <div class="flex items-center gap-2">
                  <svg class="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
                  </svg>
                  <span>{contact.tanggalAcara}</span>
                </div>

                {#if contact.events && contact.events.length > 0}
                  <div class="flex items-center gap-2 mt-2">
                    <svg class="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"></path>
                    </svg>
                    <span class="text-rose-600 font-medium">{contact.events.length} event{contact.events.length > 1 ? 's' : ''}</span>
                  </div>
                {/if}
              </div>
            </div>
          {/each}

          {#if getFilteredContactsByStage(stage.id).length === 0}
            <div class="text-center py-8 text-gray-400 text-sm">
              Tidak ada contact
            </div>
          {/if}
        </div>
      </div>
    {/each}
  </div>
</div>