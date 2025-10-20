<script>
  import { goto } from '$app/navigation';
  import { marketingStaff } from '$lib/data/mockData.js';
  import { fittingFormsList } from '$lib/data/fittingFormsData.js';

  let searchDate = '';
  let selectedMarketing = '';
  let searchNamaPengantin = '';
  let filteredForms = [...fittingFormsList]; // Show all by default

  // Reactive statement to filter forms based on all criteria
  $: {
    filteredForms = fittingFormsList.filter(form => {
      let matchDate = true;
      let matchMarketing = true;
      let matchPengantin = true;

      // Filter by date if specified
      if (searchDate) {
        matchDate = form.tanggalAcara === searchDate;
      }

      // Filter by marketing if specified
      if (selectedMarketing) {
        matchMarketing = form.marketingName === selectedMarketing;
      }

      // Filter by nama pengantin if specified
      if (searchNamaPengantin.trim()) {
        matchPengantin = form.namaPengantin.toLowerCase().includes(searchNamaPengantin.toLowerCase());
      }

      return matchDate && matchMarketing && matchPengantin;
    });
  }

  function resetSearch() {
    searchDate = '';
    selectedMarketing = '';
    searchNamaPengantin = '';
  }

  function openForm(id) {
    goto(`/fitting/${id}`);
  }

  function createNewForm() {
    goto('/fitting/new');
  }

  function formatDate(dateString) {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('id-ID', options);
  }

  function getStatusBadgeClass(status) {
    switch(status) {
      case 'Completed':
        return 'bg-green-100 text-green-800';
      case 'In Progress':
        return 'bg-blue-100 text-blue-800';
      case 'Draft':
        return 'bg-gray-100 text-gray-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  }
</script>

<div class="bg-white rounded-lg shadow-md p-8 border-t-4 border-rose-300">
  <div class="flex items-center justify-between mb-8">
    <div>
      <h2 class="text-3xl font-serif text-gray-800 mb-2">Fitting Forms</h2>
      <p class="text-gray-600">Kelola formulir fitting gaun pernikahan</p>
    </div>
    
    <button
      on:click={createNewForm}
      class="bg-rose-400 hover:bg-rose-500 text-white font-medium py-3 px-6 rounded-lg transition duration-200 flex items-center gap-2"
    >
      <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"></path>
      </svg>
      Tambah Fitting Form Baru
    </button>
  </div>

  <!-- Search Filters -->
  <div class="mb-8 bg-gray-50 rounded-lg p-6 border border-gray-200">
    <div class="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
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
      
      <!-- Tanggal Filter -->
      <div>
        <label class="block text-sm font-medium text-gray-700 mb-2">Tanggal Acara</label>
        <input
          bind:value={searchDate}
          type="date"
          class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-300 focus:border-transparent outline-none"
        />
      </div>
    </div>
    
    <!-- Reset Button -->
    {#if searchDate || selectedMarketing || searchNamaPengantin}
      <div class="flex justify-end">
        <button
          on:click={resetSearch}
          class="text-rose-600 hover:text-rose-700 text-sm font-medium flex items-center gap-1"
        >
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
          </svg>
          Reset Filter
        </button>
      </div>
    {/if}
  </div>

  <!-- Results Section -->
  <div>
    <h3 class="text-lg font-semibold text-gray-800 mb-4">
      Daftar Fitting Forms
      <span class="text-sm font-normal text-gray-600 ml-2">({filteredForms.length} form)</span>
    </h3>

    {#if filteredForms.length > 0}
      <div class="grid grid-cols-1 gap-4">
        {#each filteredForms as form}
          <button
            on:click={() => openForm(form.id)}
            class="bg-white border border-gray-200 rounded-lg p-6 hover:border-rose-300 hover:shadow-md transition duration-200 text-left"
          >
            <div class="flex items-start justify-between">
              <div class="flex-1">
                <div class="flex items-center gap-3 mb-2">
                  <h4 class="text-lg font-semibold text-gray-800">{form.namaPengantin}</h4>
                  <span class="px-3 py-1 text-xs font-medium rounded-full {getStatusBadgeClass(form.status)}">
                    {form.status}
                  </span>
                </div>
                
                <div class="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
                  <div class="flex items-center text-sm text-gray-600">
                    <svg class="w-4 h-4 mr-2 text-rose-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
                    </svg>
                    <span class="font-medium">Marketing:</span>
                    <span class="ml-2">{form.marketingName}</span>
                  </div>
                  
                  <div class="flex items-center text-sm text-gray-600">
                    <svg class="w-4 h-4 mr-2 text-rose-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
                    </svg>
                    <span class="font-medium">Tanggal:</span>
                    <span class="ml-2">{formatDate(form.tanggalAcara)}</span>
                  </div>

                  <div class="flex items-center text-sm text-gray-600">
                    <svg class="w-4 h-4 mr-2 text-rose-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                    </svg>
                    <span class="font-medium">Terakhir Update:</span>
                    <span class="ml-2">{formatDate(form.lastUpdated)}</span>
                  </div>
                </div>
              </div>
              
              <svg class="w-5 h-5 text-gray-400 ml-4 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
              </svg>
            </div>
          </button>
        {/each}
      </div>
    {:else}
      <div class="text-center py-12 bg-gray-50 rounded-lg border-2 border-dashed border-gray-300">
        <svg class="mx-auto h-12 w-12 text-gray-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
        </svg>
        <h3 class="text-lg font-medium text-gray-900 mb-2">Tidak Ada Data</h3>
        <p class="text-gray-600 mb-4">
          Tidak ada fitting form yang sesuai dengan filter yang dipilih
        </p>
        <button
          on:click={createNewForm}
          class="inline-flex items-center gap-2 bg-rose-400 hover:bg-rose-500 text-white font-medium py-2 px-4 rounded-lg transition duration-200"
        >
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"></path>
          </svg>
          Buat Fitting Form Baru
        </button>
      </div>
    {/if}
  </div>
</div>