<script>
  import { goto } from '$app/navigation';
  import { marketingStaff } from '$lib/data/mockData.js';
  import { fittingFormsList, getFormsByMarketing } from '$lib/data/fittingFormsData.js';

  let selectedMarketing = '';
  let filteredForms = [];

  $: {
    filteredForms = getFormsByMarketing(selectedMarketing);
  }

  function handleMarketingChange() {
    filteredForms = getFormsByMarketing(selectedMarketing);
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

  <!-- Marketing Staff Dropdown -->
  <div class="mb-8">
    <label class="block text-sm font-medium text-gray-700 mb-2">Pilih Marketing Staff</label>
    <select 
      bind:value={selectedMarketing}
      on:change={handleMarketingChange}
      class="w-full md:w-96 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-300 focus:border-transparent outline-none"
    >
      <option value="">-- Pilih Marketing --</option>
      {#each marketingStaff as staff}
        <option value={staff}>{staff}</option>
      {/each}
    </select>
  </div>

  <!-- Forms List -->
  {#if selectedMarketing}
    <div class="mt-6">
      <h3 class="text-lg font-semibold text-gray-800 mb-4">
        Fitting Forms untuk {selectedMarketing}
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
                      <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
                      </svg>
                      <span>Acara: {formatDate(form.tanggalAcara)}</span>
                    </div>
                    
                    <div class="flex items-center text-sm text-gray-600">
                      <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                      </svg>
                      <span>Dibuat: {formatDate(form.createdAt)}</span>
                    </div>
                    
                    <div class="flex items-center text-sm text-gray-600">
                      <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"></path>
                      </svg>
                      <span>Update: {formatDate(form.lastUpdated)}</span>
                    </div>
                  </div>
                </div>

                <div class="ml-4">
                  <svg class="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
                  </svg>
                </div>
              </div>
            </button>
          {/each}
        </div>
      {:else}
        <div class="text-center py-12 bg-gray-50 rounded-lg border-2 border-dashed border-gray-300">
          <svg class="mx-auto h-12 w-12 text-gray-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
          </svg>
          <h3 class="text-lg font-medium text-gray-900 mb-2">Belum Ada Fitting Form</h3>
          <p class="text-gray-600 mb-4">Belum ada fitting form untuk {selectedMarketing}</p>
          <button
            on:click={createNewForm}
            class="inline-flex items-center gap-2 bg-rose-400 hover:bg-rose-500 text-white font-medium py-2 px-4 rounded-lg transition duration-200"
          >
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"></path>
            </svg>
            Buat Fitting Form Pertama
          </button>
        </div>
      {/if}
    </div>
  {:else}
    <div class="text-center py-16 bg-gray-50 rounded-lg border-2 border-dashed border-gray-300">
      <svg class="mx-auto h-16 w-16 text-gray-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
      </svg>
      <h3 class="text-lg font-medium text-gray-900 mb-2">Pilih Marketing Staff</h3>
      <p class="text-gray-600">Silakan pilih marketing staff dari dropdown di atas untuk melihat daftar fitting forms</p>
    </div>
  {/if}
</div>