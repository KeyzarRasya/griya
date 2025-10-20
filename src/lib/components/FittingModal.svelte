<script>
  export let showModal = false;
  export let fittings = [];
  export let onSave;
  export let onClose;

  let fittingOptions = [];

  $: if (showModal) {
    if (fittings.length === 0) {
      fittingOptions = [
        {name: 'Lingkar Dada', ukuran: '', readonly: true},
        {name: 'Ketiak', ukuran: '', readonly: true},
        {name: 'Lengan', ukuran: '', readonly: true}
      ];
    } else {
      fittingOptions = JSON.parse(JSON.stringify(fittings));
    }
  }

  function addFittingOption() {
    fittingOptions = [...fittingOptions, {name: `Fitting ${fittingOptions.length + 1}`, ukuran: '', readonly: false}];
  }

  function removeFittingOption(index) {
    if (fittingOptions[index] && !fittingOptions[index].readonly) {
      fittingOptions.splice(index, 1);
      fittingOptions = [...fittingOptions];
    }
  }

  function handleSave() {
    const hasChanges = fittingOptions.some(opt => opt.ukuran !== '');
    
    if (!hasChanges) {
      alert('Mohon isi minimal satu ukuran fitting');
      return;
    }

    onSave(fittingOptions);
  }

  function handleClose() {
    fittingOptions = [];
    onClose();
  }
</script>

{#if showModal}
  <div class="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
    <div class="bg-white rounded-lg shadow-lg p-6 w-full max-w-2xl max-h-96 overflow-y-auto">
      <h3 class="text-xl font-semibold text-gray-800 mb-4">Tambah Fitting</h3> 
      <div class="overflow-x-auto">
        <table class="w-full table-fixed border-collapse">
          <thead class="bg-gray-50 sticky top-0">
            <tr>
              <th class="w-2/5 px-4 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider border-b border-gray-200">Nama</th>
              <th class="w-2/5 px-4 py-3 text-center text-xs font-medium text-gray-700 uppercase tracking-wider border-b border-gray-200">Ukuran</th>
              <th class="w-1/5 px-4 py-3 text-right text-xs font-medium text-gray-700 uppercase tracking-wider border-b border-gray-200">Aksi</th>
            </tr>
          </thead>

          <tbody class="divide-y divide-gray-200">
            {#each fittingOptions as option, index}
              <tr class="hover:bg-gray-50">
                <td class="px-4 py-3 text-sm text-gray-900 font-medium">
                  {#if option.readonly}
                    <input
                      bind:value={option.name}
                      readonly
                      class="bg-gray-100 cursor-not-allowed w-full px-2 py-1 rounded"
                    />
                  {:else}
                    <input
                      bind:value={option.name}
                      class="bg-white w-full px-2 py-1 border border-gray-300 rounded focus:ring-2 focus:ring-rose-300 outline-none"
                    />
                  {/if}
                </td>
                <td class="px-4 py-3 text-sm text-gray-900 font-medium">
                  <input
                    type="text"
                    bind:value={option.ukuran}
                    class="bg-white w-full text-center px-2 py-1 border border-gray-300 rounded focus:ring-2 focus:ring-rose-300 outline-none"
                  />
                </td>
                <td class="px-4 py-3 text-sm text-gray-900 font-medium text-right">
                  {#if !option.readonly}
                    <button type="button" on:click={() => removeFittingOption(index)} class="px-2 py-1 bg-red-500 hover:bg-red-600 text-white text-xs rounded transition duration-200">
                      Hapus
                    </button>
                  {/if}
                </td>
              </tr>
            {/each}
          </tbody>
        </table>

        <div class="flex justify-end mt-4 gap-2">
          <button type="button" on:click={addFittingOption} class="px-4 py-2 bg-rose-400 hover:bg-rose-500 text-white text-sm rounded transition duration-200">
            Tambah Baris
          </button>
          <button type="button" on:click={handleSave} class="px-4 py-2 bg-green-500 hover:bg-green-600 text-white text-sm rounded transition duration-200">
            Simpan Fitting
          </button>
          <button type="button" on:click={handleClose} class="px-4 py-2 bg-gray-300 hover:bg-gray-400 text-gray-700 text-sm rounded transition duration-200">
            Batal
          </button>
        </div>
      </div>      
    </div>
  </div>
{/if}