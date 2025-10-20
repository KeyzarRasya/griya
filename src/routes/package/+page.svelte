<script>
  import { goto } from '$app/navigation';
  
  // Mock data for vendors
  const vendors = [
    {
      id: 'v001',
      name: 'Rias Pengantin Elegan',
      type: 'Make Up Artist',
      contact: '0812-3456-7890',
      lastUpdated: '2025-10-15'
    },
    {
      id: 'v002',
      name: 'Busana Nusantara',
      type: 'Busana',
      contact: '0813-4567-8901',
      lastUpdated: '2025-10-12'
    },
    {
      id: 'v003',
      name: 'Dekorasi Impian',
      type: 'Dekorasi',
      contact: '0814-5678-9012',
      lastUpdated: '2025-10-10'
    },
    {
      id: 'v004',
      name: 'Fotografi Cantik',
      type: 'Photographer',
      contact: '0815-6789-0123',
      lastUpdated: '2025-10-08'
    },
    {
      id: 'v005',
      name: 'Catering Lezat',
      type: 'Catering',
      contact: '0816-7890-1234',
      lastUpdated: '2025-10-05'
    }
  ];
  
  function openVendor(vendorId) {
    goto(`/package/${vendorId}`);
  }
  
  function createNewVendor() {
    goto('/package/new');
  }
  
  function formatDate(dateString) {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('id-ID', options);
  }
</script>

<div class="bg-white rounded-lg shadow-md p-8 border-t-4 border-rose-300">
  <div class="flex items-center justify-between mb-6">
    <div>
      <h2 class="text-3xl font-serif text-gray-800">Package Management</h2>
      <p class="text-gray-600 mt-1">Kelola daftar Package pernikahan</p>
    </div>
    <button
      on:click={createNewVendor}
      class="bg-rose-400 hover:bg-rose-500 text-white font-medium py-3 px-6 rounded-lg transition duration-200 flex items-center gap-2"
    >
      <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"></path>
      </svg>
      Tambah Package Baru
    </button>
  </div>

  <div class="mt-6">
    <h3 class="text-lg font-semibold text-gray-800 mb-4">
      Daftar Package
      <span class="text-sm font-normal text-gray-600 ml-2">({vendors.length} vendor)</span>
    </h3>

    {#if vendors.length > 0}
      <div class="grid grid-cols-1 gap-4">
        {#each vendors as vendor}
          <button
            on:click={() => openVendor(vendor.id)}
            class="bg-white border border-gray-200 rounded-lg p-6 hover:border-rose-300 hover:shadow-md transition duration-200 text-left"
          >
            <div class="flex items-start justify-between">
              <div class="flex-1">
                <div class="flex items-center gap-3 mb-2">
                  <h4 class="text-lg font-semibold text-gray-800">{vendor.name}</h4>
                  <span class="px-3 py-1 text-xs font-medium rounded-full bg-blue-100 text-blue-800">
                    {vendor.type}
                  </span>
                </div>
                
                <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                  <div class="flex items-center text-sm text-gray-600">
                    <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path>
                    </svg>
                    {vendor.contact}
                  </div>
                  
                  <div class="flex items-center text-sm text-gray-600">
                    <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
                    </svg>
                    Terakhir diupdate: {formatDate(vendor.lastUpdated)}
                  </div>
                </div>
              </div>
              
              <svg class="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
              </svg>
            </div>
          </button>
        {/each}
      </div>
    {:else}
      <div class="text-center py-12 bg-gray-50 rounded-lg">
        <svg class="w-16 h-16 mx-auto text-gray-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"></path>
        </svg>
        <p class="text-gray-600 mb-4">Belum ada Paket yang terdaftar</p>
        <button
          on:click={createNewVendor}
          class="inline-flex items-center gap-2 bg-rose-400 hover:bg-rose-500 text-white font-medium py-2 px-4 rounded-lg transition duration-200"
        >
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"></path>
          </svg>
          Tambah Paket Pertama
        </button>
      </div>
    {/if}
  </div>
</div>