<!-- src/lib/components/RequestModal.svelte -->
<script>
  export let showModal = false;
  export let onSave;
  export let onClose;

  let items = '';
  let foto = null;

  function handleFotoUpload(e) {
    const file = e.target.files[0];
    if (file) {
      foto = file.name;
    }
  }

  function handleSave() {
    if (!items.trim()) {
      alert('Mohon isi item request');
      return;
    }
    onSave({ items, foto });
    items = '';
    foto = null;
  }

  function handleClose() {
    items = '';
    foto = null;
    onClose();
  }
</script>

{#if showModal}
  <div class="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
    <div class="bg-white rounded-lg shadow-lg p-6 w-full max-w-md">
      <h3 class="text-xl font-semibold text-gray-800 mb-4">Tambah Request</h3>

      <div class="space-y-4">
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2">Items</label>
          <input bind:value={items} type="text" placeholder="Contoh: Tidak terlalu ketat" class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-300 focus:border-transparent outline-none" />
        </div>

        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2">Foto (Opsional)</label>
          <input on:change={handleFotoUpload} type="file" accept="image/*" class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-300 focus:border-transparent outline-none" />
          {#if foto}
            <p class="text-sm text-gray-600 mt-2">File: {foto}</p>
          {/if}
        </div>
      </div>

      <div class="flex gap-3 mt-6">
        <button type="button" on:click={handleSave} class="flex-1 bg-rose-400 hover:bg-rose-500 text-white font-medium py-2 px-4 rounded-lg transition duration-200">
          Simpan
        </button>
        <button type="button" on:click={handleClose} class="flex-1 bg-gray-300 hover:bg-gray-400 text-gray-700 font-medium py-2 px-4 rounded-lg transition duration-200">
          Batal
        </button>
      </div>
    </div>
  </div>
{/if}