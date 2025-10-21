<script>
  import { paketDaftarHarga } from '$lib/data/pricelistData.js';
  
  let items = [...paketDaftarHarga];
  let editingId = null;
  let editingItem = null;
  let isAddingNew = false;
  let newItem = {
    section: 'pengantin',
    item: '',
    price: 0
  };

  function formatCurrency(amount) {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0
    }).format(amount);
  }

  function parseCurrency(value) {
    return parseInt(value.toString().replace(/\D/g, '')) || 0;
  }

  function startEdit(item) {
    editingId = item.id;
    editingItem = { ...item };
  }

  function cancelEdit() {
    editingId = null;
    editingItem = null;
  }

  function saveEdit() {
    const index = items.findIndex(i => i.id === editingId);
    if (index !== -1) {
      items[index] = { ...editingItem };
      items = [...items];
    }
    cancelEdit();
  }

  function deleteItem(id) {
    if (confirm('Apakah Anda yakin ingin menghapus item ini?')) {
      items = items.filter(i => i.id !== id);
    }
  }

  function startAddNew() {
    isAddingNew = true;
    newItem = {
      section: 'pengantin',
      item: '',
      price: 0
    };
  }

  function cancelAddNew() {
    isAddingNew = false;
    newItem = {
      section: 'pengantin',
      item: '',
      price: 0
    };
  }

  function saveNewItem() {
    if (newItem.item.trim() === '') {
      alert('Nama item tidak boleh kosong');
      return;
    }

    const maxId = items.length > 0 ? Math.max(...items.map(i => i.id)) : 0;
    const itemToAdd = {
      id: maxId + 1,
      section: newItem.section,
      item: newItem.item,
      price: newItem.price
    };

    items = [...items, itemToAdd];
    cancelAddNew();
  }

  function getSectionLabel(section) {
    const labels = {
      'pengantin': 'Pengantin',
      'adat': 'Adat',
      'lainLain': 'Lain-Lain'
    };
    return labels[section] || section;
  }

  function groupBySection(items) {
    const grouped = {
      pengantin: [],
      adat: [],
      lainLain: []
    };
    
    items.forEach(item => {
      if (grouped[item.section]) {
        grouped[item.section].push(item);
      }
    });
    
    return grouped;
  }

  $: groupedItems = groupBySection(items);
</script>

<div class="space-y-6">
  <!-- Header with Add Button -->
  <div class="flex items-center justify-between">
    <div>
      <h3 class="text-xl font-semibold text-gray-800">Daftar Harga Penambahan</h3>
      <p class="text-sm text-gray-600 mt-1">Kelola harga penambahan untuk paket</p>
    </div>
    <button
      on:click={startAddNew}
      class="px-4 py-2 bg-rose-400 hover:bg-rose-500 text-white rounded-lg transition duration-200 flex items-center gap-2"
    >
      <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"></path>
      </svg>
      Tambah Item
    </button>
  </div>

  <!-- Add New Item Form -->
  {#if isAddingNew}
    <div class="border-2 border-rose-300 rounded-lg p-6 bg-rose-50">
      <h4 class="font-semibold text-gray-800 mb-4">Tambah Item Baru</h4>
      <div class="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2">Kategori</label>
          <select
            bind:value={newItem.section}
            class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-300 outline-none"
          >
            <option value="pengantin">Pengantin</option>
            <option value="adat">Adat</option>
            <option value="lainLain">Lain-Lain</option>
          </select>
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2">Nama Item</label>
          <input
            type="text"
            bind:value={newItem.item}
            placeholder="Masukkan nama item"
            class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-300 outline-none"
          />
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2">Harga (Rp)</label>
          <input
            type="number"
            bind:value={newItem.price}
            placeholder="0"
            class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-300 outline-none"
          />
        </div>
      </div>
      <div class="flex gap-2">
        <button
          on:click={saveNewItem}
          class="px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded-lg transition duration-200"
        >
          Simpan
        </button>
        <button
          on:click={cancelAddNew}
          class="px-4 py-2 bg-gray-300 hover:bg-gray-400 text-gray-800 rounded-lg transition duration-200"
        >
          Batal
        </button>
      </div>
    </div>
  {/if}

  <!-- Table -->
  <div class="border border-gray-200 rounded-lg overflow-hidden">
    <div class="overflow-x-auto">
      <table class="w-full">
        <thead class="bg-gray-50 border-b border-gray-200">
          <tr>
            <th class="px-6 py-3 text-left text-sm font-semibold text-gray-800">Jenis Penambahan</th>
            <th class="px-6 py-3 text-right text-sm font-semibold text-gray-800">Harga</th>
            <th class="px-6 py-3 text-center text-sm font-semibold text-gray-800 w-32">Aksi</th>
          </tr>
        </thead>
        <tbody>
          {#each Object.entries(groupedItems) as [section, sectionItems]}
            {#if sectionItems.length > 0}
              <!-- Section Header -->
              <tr class="bg-rose-50">
                <td colspan="3" class="px-6 py-3 text-sm font-bold text-gray-900">
                  {getSectionLabel(section)}
                </td>
              </tr>
              
              <!-- Section Items -->
              {#each sectionItems as item}
                <tr class="hover:bg-gray-50 border-b border-gray-100">
                  {#if editingId === item.id}
                    <!-- Edit Mode -->
                    <td class="px-6 py-4">
                      <input
                        type="text"
                        bind:value={editingItem.item}
                        class="w-full px-2 py-1 border border-gray-300 rounded focus:ring-2 focus:ring-rose-300 outline-none text-sm"
                      />
                    </td>
                    <td class="px-6 py-4">
                      <input
                        type="number"
                        bind:value={editingItem.price}
                        class="w-full px-2 py-1 border border-gray-300 rounded focus:ring-2 focus:ring-rose-300 outline-none text-sm text-right"
                      />
                    </td>
                    <td class="px-6 py-4">
                      <div class="flex items-center justify-center gap-2">
                        <button
                          on:click={saveEdit}
                          class="px-3 py-1 bg-green-500 hover:bg-green-600 text-white text-sm rounded transition duration-200"
                        >
                          Simpan
                        </button>
                        <button
                          on:click={cancelEdit}
                          class="px-3 py-1 bg-gray-300 hover:bg-gray-400 text-gray-800 text-sm rounded transition duration-200"
                        >
                          Batal
                        </button>
                      </div>
                    </td>
                  {:else}
                    <!-- View Mode -->
                    <td class="px-6 py-4 text-sm text-gray-700">{item.item}</td>
                    <td class="px-6 py-4 text-sm text-gray-900 text-right font-medium">
                      {formatCurrency(item.price)}
                    </td>
                    <td class="px-6 py-4">
                      <div class="flex items-center justify-center gap-2">
                        <button
                          on:click={() => startEdit(item)}
                          class="p-1.5 text-blue-600 hover:bg-blue-50 rounded transition duration-200"
                          title="Edit"
                        >
                          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path>
                          </svg>
                        </button>
                        <button
                          on:click={() => deleteItem(item.id)}
                          class="p-1.5 text-red-600 hover:bg-red-50 rounded transition duration-200"
                          title="Hapus"
                        >
                          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path>
                          </svg>
                        </button>
                      </div>
                    </td>
                  {/if}
                </tr>
              {/each}
            {/if}
          {/each}
        </tbody>
      </table>
    </div>
  </div>

  <!-- Summary -->
  <div class="bg-gray-50 rounded-lg p-4 border border-gray-200">
    <div class="flex items-center justify-between text-sm text-gray-600">
      <span>Total Items: <span class="font-semibold text-gray-900">{items.length}</span></span>
      <div class="flex gap-4">
        <span>Pengantin: <span class="font-semibold text-gray-900">{groupedItems.pengantin.length}</span></span>
        <span>Adat: <span class="font-semibold text-gray-900">{groupedItems.adat.length}</span></span>
        <span>Lain-Lain: <span class="font-semibold text-gray-900">{groupedItems.lainLain.length}</span></span>
      </div>
    </div>
  </div>
</div>