<script>
  import { goto } from '$app/navigation';
  import { thirdParties, vendors, teams, deleteContact } from '$lib/data/contactManagementData.js';

  let activeTab = 'third-party';
  let showAddModal = false;
  let selectedContactType = 'third-party';

  function openAddModal() {
    showAddModal = true;
  }

  function closeAddModal() {
    showAddModal = false;
  }

  function handleContactTypeChange(e) {
    selectedContactType = e.target.value
  }

  function goToAddForm() {
    closeAddModal();
    console.log(selectedContactType)
    goto(`/contact-management/add?type=${selectedContactType}`);
  }

  function handleDelete(type, id, name) {
    if (confirm(`Apakah Anda yakin ingin menghapus ${name}?`)) {
      deleteContact(type, id);
      alert('Kontak berhasil dihapus!');
    }
  }

  function editContact(type, id) {
    goto(`/contact-management/edit/${id}?type=${type}`);
  }

  function viewContact(type, id) {
    goto(`/contact-management/edit/${id}?type=${type}`);
  }
</script>

<div class="bg-white rounded-lg shadow-md p-8 border-t-4 border-rose-300">
  <div class="flex items-center justify-between mb-8">
    <div>
      <h2 class="text-3xl font-serif text-gray-800 mb-2">Contact Management</h2>
      <p class="text-gray-600">Kelola kontak third party, vendor, dan team</p>
    </div>
    
    <button
      on:click={openAddModal}
      class="bg-rose-400 hover:bg-rose-500 text-white font-medium py-3 px-6 rounded-lg transition duration-200 flex items-center gap-2"
    >
      <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"></path>
      </svg>
      Tambah Kontak Baru
    </button>
  </div>

  <!-- Tabs -->
  <div class="border-b border-gray-200 mb-6">
    <nav class="flex space-x-8">
      <button
        on:click={() => activeTab = 'third-party'}
        class="py-4 px-1 border-b-2 font-medium text-sm {activeTab === 'third-party' ? 'border-rose-400 text-rose-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'} transition duration-200"
      >
        Third Party
      </button>
      <button
        on:click={() => activeTab = 'vendor'}
        class="py-4 px-1 border-b-2 font-medium text-sm {activeTab === 'vendor' ? 'border-rose-400 text-rose-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'} transition duration-200"
      >
        Vendor
      </button>
      <button
        on:click={() => activeTab = 'team'}
        class="py-4 px-1 border-b-2 font-medium text-sm {activeTab === 'team' ? 'border-rose-400 text-rose-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'} transition duration-200"
      >
        Team
      </button>
    </nav>
  </div>

  <!-- Tab Content -->
  <div class="mt-6">
    {#if activeTab === 'third-party'}
      <!-- Third Party Tab -->
      <div class="space-y-6">
        <h3 class="text-xl font-semibold text-gray-800">
          Third Party (WO & Catering)
          <span class="text-sm font-normal text-gray-600 ml-2">({thirdParties.length} kontak)</span>
        </h3>
        
        {#if thirdParties.length > 0}
          <div class="grid grid-cols-1 gap-4">
            {#each thirdParties as party}
              <button
                on:click={() => viewContact('third-party', party.id)}
                class="bg-white border border-gray-200 rounded-lg p-6 hover:border-rose-300 hover:shadow-md transition duration-200 text-left w-full"
              >
                <div class="flex items-start justify-between">
                  <div class="flex-1">
                    <div class="flex items-center gap-3 mb-3">
                      <h4 class="text-lg font-semibold text-gray-800">{party.name}</h4>
                      <span class="px-2 py-1 text-xs font-medium rounded-full bg-blue-100 text-blue-800">
                        {party.type}
                      </span>
                    </div>
                    
                    <div class="grid grid-cols-1 md:grid-cols-3 gap-4 mb-3">
                      <div class="flex items-center text-sm text-gray-600">
                        <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
                        </svg>
                        <span>{party.email}</span>
                      </div>
                      
                      <div class="flex items-center text-sm text-gray-600">
                        <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path>
                        </svg>
                        <span>{party.phone}</span>
                      </div>
                      
                      <div class="flex items-center text-sm text-gray-600">
                        <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path>
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
                        </svg>
                        <span class="line-clamp-1">{party.address}</span>
                      </div>
                    </div>

                    {#if party.packages && party.packages.length > 0}
                      <div class="mt-3 pt-3 border-t border-gray-200">
                        <p class="text-xs font-medium text-gray-500 mb-2">PAKET TERSEDIA:</p>
                        <div class="flex flex-wrap gap-2">
                          {#each party.packages as pkg}
                            <span class="inline-flex items-center px-2 py-1 rounded text-xs bg-rose-50 text-rose-700">
                              {pkg.packageName} - Rp {pkg.price.toLocaleString('id-ID')}
                            </span>
                          {/each}
                        </div>
                      </div>
                    {/if}
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
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"></path>
            </svg>
            <h3 class="text-lg font-medium text-gray-900 mb-2">Belum Ada Third Party</h3>
            <p class="text-gray-600">Tambahkan kontak third party WO atau Catering pertama Anda</p>
          </div>
        {/if}
      </div>
    {/if}   

    {#if activeTab === 'vendor'}
      <!-- Vendor Tab -->
      <div class="space-y-4">
        <h3 class="text-xl font-semibold text-gray-800">
          Vendor (Supplier Kain & Jahit Kebaya)
          <span class="text-sm font-normal text-gray-600 ml-2">({vendors.length} vendor)</span>
        </h3>
        
        {#if vendors.length > 0}
          <div class="grid grid-cols-1 gap-4">
            {#each vendors as vendor}
              <button
                on:click={() => viewContact('vendor', vendor.id)}
                class="bg-white border border-gray-200 rounded-lg p-6 hover:border-rose-300 hover:shadow-md transition duration-200 text-left w-full"
              >
                <div class="flex items-start justify-between">
                  <div class="flex-1">
                    <div class="flex items-center gap-3 mb-3">
                      <h4 class="text-lg font-semibold text-gray-800">{vendor.name}</h4>
                      <span class="px-2 py-1 text-xs font-medium rounded-full bg-purple-100 text-purple-800">
                        {vendor.type}
                      </span>
                    </div>
                    
                    <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div class="flex items-center text-sm text-gray-600">
                        <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
                        </svg>
                        <span>{vendor.email}</span>
                      </div>
                      
                      <div class="flex items-center text-sm text-gray-600">
                        <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path>
                        </svg>
                        <span>{vendor.phone}</span>
                      </div>
                      
                      <div class="flex items-center text-sm text-gray-600">
                        <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path>
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
                        </svg>
                        <span class="line-clamp-1">{vendor.address}</span>
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
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"></path>
            </svg>
            <h3 class="text-lg font-medium text-gray-900 mb-2">Belum Ada Vendor</h3>
            <p class="text-gray-600">Tambahkan vendor Supplier Kain atau Jahit Kebaya pertama Anda</p>
          </div>
        {/if}
      </div>
    {/if}

    {#if activeTab === 'team'}
      <!-- Team Tab -->
      <div class="space-y-4">
        <h3 class="text-xl font-semibold text-gray-800">
          Team (MUA & Hairdo)
          <span class="text-sm font-normal text-gray-600 ml-2">({teams.length} member)</span>
        </h3>
        
        {#if teams.length > 0}
          <div class="grid grid-cols-1 gap-4">
            {#each teams as member}
              <button
                on:click={() => viewContact('team', member.id)}
                class="bg-white border border-gray-200 rounded-lg p-6 hover:border-rose-300 hover:shadow-md transition duration-200 text-left w-full"
              >
                <div class="flex items-start justify-between">
                  <div class="flex-1">
                    <div class="flex items-center gap-3 mb-3">
                      <h4 class="text-lg font-semibold text-gray-800">{member.name}</h4>
                      <span class="px-2 py-1 text-xs font-medium rounded-full bg-green-100 text-green-800">
                        {member.type}
                      </span>
                    </div>
                    
                    <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-3">
                      <div class="flex items-center text-sm text-gray-600">
                        <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
                        </svg>
                        <span>{member.email}</span>
                      </div>
                      
                      <div class="flex items-center text-sm text-gray-600">
                        <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path>
                        </svg>
                        <span>{member.phone}</span>
                      </div>
                    </div>

                    {#if member.services && member.services.length > 0}
                      <div class="mt-3 pt-3 border-t border-gray-200">
                        <p class="text-xs font-medium text-gray-500 mb-2">SERVICES:</p>
                        <div class="flex flex-wrap gap-2">
                          {#each member.services as service}
                            <span class="inline-flex items-center px-2 py-1 rounded text-xs bg-green-50 text-green-700">
                              {service.serviceName} - Rp {service.price.toLocaleString('id-ID')}
                            </span>
                          {/each}
                        </div>
                      </div>
                    {/if}
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
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"></path>
            </svg>
            <h3 class="text-lg font-medium text-gray-900 mb-2">Belum Ada Team Member</h3>
            <p class="text-gray-600">Tambahkan team MUA atau Hairdo pertama Anda</p>
          </div>
        {/if}
      </div>
    {/if}
  </div>
</div>

<!-- Add Contact Modal -->
{#if showAddModal}
  <div class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
    <div class="bg-white rounded-lg p-8 max-w-md w-full mx-4">
      <h3 class="text-2xl font-semibold text-gray-800 mb-6">Pilih Tipe Kontak</h3>
      
      <div class="mb-6">
        <label class="block text-sm font-medium text-gray-700 mb-2">
          Tipe Kontak
        </label>
        <select
          bind:value={selectedContactType}
          on:change={handleContactTypeChange}
          class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-300 focus:border-rose-400 outline-none"
        >
          <option value="third-party">Third Party (WO/Catering)</option>
          <option value="vendor">Vendor (Supplier Kain/Jahit Kebaya)</option>
          <option value="team">Team (MUA/Hairdo)</option>
        </select>
      </div>

      <div class="flex gap-3">
        <button
          on:click={closeAddModal}
          class="flex-1 px-4 py-2 bg-gray-200 hover:bg-gray-300 text-gray-800 font-medium rounded-lg transition duration-200"
        >
          Batal
        </button>
        <button
          on:click={goToAddForm}
          class="flex-1 px-4 py-2 bg-rose-400 hover:bg-rose-500 text-white font-medium rounded-lg transition duration-200"
        >
          Lanjutkan
        </button>
      </div>
    </div>
  </div>
{/if}