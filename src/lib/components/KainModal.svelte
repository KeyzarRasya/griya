<script>
  import { kainData } from '$lib/data/mockData.js';
  
  export let showModal = false;
  export let onSelect;
  export let onClose;

  let searchQuery = '';
  let filteredKain = kainData;

  $: {
    if (searchQuery) {
      filteredKain = kainData.filter(kain =>
        kain.nama.toLowerCase().includes(searchQuery.toLowerCase())
      );
    } else {
      filteredKain = kainData;
    }
  }

  function handleSelect(kain) {
    onSelect(kain);
    searchQuery = '';
  }

  function handleClose() {
    searchQuery = '';
    onClose();
  }
</script>

{#if showModal}
  <div class="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
    <div class="bg-white rounded-lg shadow-lg p-6 w-full max-w-2xl max-h-96 overflow-y-auto">
      <h3 class="text-xl font-semibold text-gray-800 mb-4">Pilih Kain</h3>

      <div class="mb-4">
        <input bind:value={searchQuery} type="text" placeholder="Cari kain..." class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-300 focus:border-transparent outline-none" />
      </div>

      <div class="overflow-x-auto">
        <table class="w-full border-collapse">
          <thead class="bg-gray-50 sticky top-0">
            <tr>
              <th class="px-4 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider border-b border-gray-200">Nama Kain</th>
              <th class="px-4 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider border-b border-gray-200">Foto</th>
              <th class="px-4 py-3 text-center text-xs font-medium text-gray-700 uppercase tracking-wider border-b border-gray-200">Aksi</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-gray-200">
            {#each filteredKain as kain}
              <tr class="hover:bg-gray-50">
                <td class="px-4 py-3 text-sm text-gray-900 font-medium">{kain.nama}</td>
                <td class="px-4 py-3 text-sm text-gray-600">{kain.foto}</td>
                <td class="px-4 py-3 text-center">
                  <button type="button" on:click={() => handleSelect(kain)} class="px-4 py-2 bg-rose-400 hover:bg-rose-500 text-white text-sm rounded transition duration-200">
                    Pilih
                  </button>
                </td>
              </tr>
            {/each}
          </tbody>
        </table>
        {#if filteredKain.length === 0}
          <div class="text-center py-8">
            <p class="text-gray-500">Kain tidak ditemukan</p>
          </div>
        {/if}
      </div>

      <div class="mt-4">
        <button type="button" on:click={handleClose} class="w-full bg-gray-300 hover:bg-gray-400 text-gray-700 font-medium py-2 px-4 rounded-lg transition duration-200">
          Batal
        </button>
      </div>
    </div>
  </div>
{/if}