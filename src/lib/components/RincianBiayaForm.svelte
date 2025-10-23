<script>
  import { formData } from '$lib/stores/formStore.js';

  // Initialize rincian biaya data with new structure
  if (!$formData.rincianBiaya) {
    $formData.rincianBiaya = {
      namaPengantin: '',
      tanggalAcara: '',
      pilihanVendor: '',
      pilihanPaket: '',
      perincianBiaya: {
        hargaPaket: { qty: 1, harga: 0, total: 0 },
        sections: [
          // {
          //   id: Date.now() + '-paket',
          //   name: 'Paket',
          //   items: []
          // },
          {
            id: Date.now() + 1 + '-penambahan',
            name: 'Penambahan',
            items: []
          }
        ],
        unassignedProducts: []
      },
      perincianPembayaran: [
        { tanggal: '', cashTransfer: '', jumlah: 0, buktiUrl: '' }
      ]
    };
  }

  // Ensure sections array exists for backward compatibility
  if (!$formData.rincianBiaya.perincianBiaya.sections) {
    $formData.rincianBiaya.perincianBiaya.sections = [
      // {
      //   id: Date.now() + '-paket',
      //   name: 'Paket',
      //   items: $formData.rincianBiaya.perincianBiaya.penambahan || []
      // },
      {
        id: Date.now() + 1 + '-penambahan',
        name: 'Penambahan',
        items: $formData.rincianBiaya.perincianBiaya.lainnya || []
      }
    ];
    $formData.rincianBiaya.perincianBiaya.unassignedProducts = [];
  }

  let draggedProduct = null;
  let draggedProductIndex = null;
  let draggedFromSection = null;

  $: {
    // Auto calculate total for harga paket
    if ($formData.rincianBiaya?.perincianBiaya?.hargaPaket) {
      $formData.rincianBiaya.perincianBiaya.hargaPaket.total = 
        $formData.rincianBiaya.perincianBiaya.hargaPaket.qty * 
        $formData.rincianBiaya.perincianBiaya.hargaPaket.harga;
    }

    // Auto calculate total for all section items
    if ($formData.rincianBiaya?.perincianBiaya?.sections) {
      $formData.rincianBiaya.perincianBiaya.sections = 
        $formData.rincianBiaya.perincianBiaya.sections.map(section => ({
          ...section,
          items: section.items.map(item => ({
            ...item,
            total: item.qty * item.harga
          }))
        }));
    }

    // Auto calculate total for unassigned products
    if ($formData.rincianBiaya?.perincianBiaya?.unassignedProducts) {
      $formData.rincianBiaya.perincianBiaya.unassignedProducts = 
        $formData.rincianBiaya.perincianBiaya.unassignedProducts.map(item => ({
          ...item,
          total: item.qty * item.harga
        }));
    }
  }

  $: totalBiaya = calculateTotalBiaya();
  $: totalPembayaran = calculateTotalPembayaran();
  $: sisaPembayaran = totalBiaya - totalPembayaran;

  function calculateTotalBiaya() {
    if (!$formData.rincianBiaya?.perincianBiaya) return 0;
    
    let total = $formData.rincianBiaya.perincianBiaya.hargaPaket?.total || 0;
    
    $formData.rincianBiaya.perincianBiaya.sections?.forEach(section => {
      section.items?.forEach(item => {
        total += item.total || 0;
      });
    });
    
    $formData.rincianBiaya.perincianBiaya.unassignedProducts?.forEach(item => {
      total += item.total || 0;
    });
    
    return total;
  }

  function calculateTotalPembayaran() {
    if (!$formData.rincianBiaya?.perincianPembayaran) return 0;
    return $formData.rincianBiaya.perincianPembayaran.reduce((sum, item) => sum + (item.jumlah || 0), 0);
  }

  function addSection() {
    const newSection = {
      id: Date.now(),
      name: `Section ${$formData.rincianBiaya.perincianBiaya.sections.length + 1}`,
      items: []
    };
    $formData.rincianBiaya.perincianBiaya.sections = [
      ...$formData.rincianBiaya.perincianBiaya.sections,
      newSection
    ];
  }

  function removeSection(sectionId) {
    if ($formData.rincianBiaya.perincianBiaya.sections.length <= 1) {
      alert('Cannot remove the last section');
      return;
    }
    
    const section = $formData.rincianBiaya.perincianBiaya.sections.find(s => s.id === sectionId);
    if (section && section.items.length > 0) {
      // Move items to unassigned
      $formData.rincianBiaya.perincianBiaya.unassignedProducts = [
        ...$formData.rincianBiaya.perincianBiaya.unassignedProducts,
        ...section.items
      ];
    }
    
    $formData.rincianBiaya.perincianBiaya.sections = 
      $formData.rincianBiaya.perincianBiaya.sections.filter(s => s.id !== sectionId);
  }

  function addProduct() {
    const newProduct = {
      id: Date.now(),
      item: '',
      qty: 0,
      harga: 0,
      total: 0
    };
    $formData.rincianBiaya.perincianBiaya.unassignedProducts = [
      ...$formData.rincianBiaya.perincianBiaya.unassignedProducts,
      newProduct
    ];
  }

  function removeProductFromSection(sectionId, itemIndex) {
    const sectionIndex = $formData.rincianBiaya.perincianBiaya.sections.findIndex(s => s.id === sectionId);
    if (sectionIndex !== -1) {
      $formData.rincianBiaya.perincianBiaya.sections[sectionIndex].items.splice(itemIndex, 1);
      $formData.rincianBiaya.perincianBiaya.sections = [...$formData.rincianBiaya.perincianBiaya.sections];
    }
  }

  function removeUnassignedProduct(itemIndex) {
    $formData.rincianBiaya.perincianBiaya.unassignedProducts.splice(itemIndex, 1);
    $formData.rincianBiaya.perincianBiaya.unassignedProducts = [...$formData.rincianBiaya.perincianBiaya.unassignedProducts];
  }

  function handleDragStart(event, product, productIndex, sectionId = null) {
    draggedProduct = product;
    draggedProductIndex = productIndex;
    draggedFromSection = sectionId;
    event.dataTransfer.effectAllowed = 'move';
  }

  function handleDragOver(event) {
    event.preventDefault();
    event.dataTransfer.dropEffect = 'move';
  }

  function handleDrop(event, targetSectionId) {
    event.preventDefault();
    
    if (!draggedProduct) return;

    // Remove from source
    if (draggedFromSection === null) {
      // From unassigned
      $formData.rincianBiaya.perincianBiaya.unassignedProducts.splice(draggedProductIndex, 1);
    } else {
      // From a section
      const sourceSectionIndex = $formData.rincianBiaya.perincianBiaya.sections.findIndex(s => s.id === draggedFromSection);
      if (sourceSectionIndex !== -1) {
        $formData.rincianBiaya.perincianBiaya.sections[sourceSectionIndex].items.splice(draggedProductIndex, 1);
      }
    }

    // Add to target
    if (targetSectionId === null) {
      // To unassigned
      $formData.rincianBiaya.perincianBiaya.unassignedProducts = [
        ...$formData.rincianBiaya.perincianBiaya.unassignedProducts,
        draggedProduct
      ];
    } else {
      // To a section
      const targetSectionIndex = $formData.rincianBiaya.perincianBiaya.sections.findIndex(s => s.id === targetSectionId);
      if (targetSectionIndex !== -1) {
        $formData.rincianBiaya.perincianBiaya.sections[targetSectionIndex].items = [
          ...$formData.rincianBiaya.perincianBiaya.sections[targetSectionIndex].items,
          draggedProduct
        ];
      }
    }

    // Trigger reactivity
    $formData.rincianBiaya.perincianBiaya.sections = [...$formData.rincianBiaya.perincianBiaya.sections];
    
    // Reset drag state
    draggedProduct = null;
    draggedProductIndex = null;
    draggedFromSection = null;
  }

  function addPembayaran() {
    $formData.rincianBiaya.perincianPembayaran = [
      ...$formData.rincianBiaya.perincianPembayaran,
      { tanggal: '', cashTransfer: '', jumlah: 0, buktiUrl: '' }
    ];
  }

  function removePembayaran(index) {
    if ($formData.rincianBiaya.perincianPembayaran.length > 1) {
      $formData.rincianBiaya.perincianPembayaran.splice(index, 1);
      $formData.rincianBiaya.perincianPembayaran = [...$formData.rincianBiaya.perincianPembayaran];
    }
  }

  function handleUploadBukti(index) {
    // Simulate file upload - in real implementation, this would open file picker
    alert(`Upload bukti pembayaran for row ${index + 1}`);
    // You can implement actual file upload logic here
    // For now, we'll just set a placeholder
    $formData.rincianBiaya.perincianPembayaran[index].buktiUrl = 'uploaded-file-url';
  }

  function formatCurrency(value) {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0
    }).format(value);
  }
</script>

<div class="space-y-8">
  <!-- Header Information -->
  <div class="grid grid-cols-1 md:grid-cols-4 gap-6">
    <div>
      <label class="block text-sm font-medium text-gray-700 mb-2">Nama Pengantin</label>
      <input 
        type="text" 
        bind:value={$formData.rincianBiaya.namaPengantin} 
        class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-300 focus:border-transparent outline-none" 
      />
    </div>
    <div>
      <label class="block text-sm font-medium text-gray-700 mb-2">Tanggal Acara</label>
      <input 
        type="date" 
        bind:value={$formData.rincianBiaya.tanggalAcara} 
        class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-300 focus:border-transparent outline-none" 
      />
    </div>
    <div>
      <label for="vendors" class="block text-sm font-medium text-gray-700 mb-2">Pilihan Vendor</label>
      <select bind:value={$formData.rincianBiaya.pilihanVendor} name="vendors" id="vendors" class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-300 focus:border-transparent outline-none">
        <option value="griya">Griya</option>
        <option value="a">Vendor A</option>
      </select>
    </div>
    <div>
      <label for="paket" class="block text-sm font-medium text-gray-700 mb-2">Pilihan Paket</label>
      <select bind:value={$formData.rincianBiaya.pilihanPaket} name="paket" id="paket" class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-300 focus:border-transparent outline-none">
        <option value="pa">Paket A</option>
        <option value="pb">Paket B</option>
      </select>
    </div>
  </div>

  <!-- Perincian Biaya Section -->
  <div class="border border-gray-300 rounded-lg p-6">
    <h3 class="text-xl font-semibold text-gray-800 mb-6 text-center bg-gray-100 py-2 -mx-6 -mt-6 rounded-t-lg">Perincian Biaya</h3>

    <div class="overflow-x-auto">
      <table class="w-full border-collapse">
        <thead>
          <tr class="bg-gray-50">
            <th class="px-4 py-3 text-left text-sm font-semibold text-gray-800 border border-gray-300 w-8">No</th>
            <th class="px-4 py-3 text-left text-sm font-semibold text-gray-800 border border-gray-300">Item</th>
            <th class="px-4 py-3 text-center text-sm font-semibold text-gray-800 border border-gray-300 w-24">Qty</th>
            <th class="px-4 py-3 text-center text-sm font-semibold text-gray-800 border border-gray-300 w-40">Harga</th>
            <th class="px-4 py-3 text-center text-sm font-semibold text-gray-800 border border-gray-300 w-40">Total Harga Items</th>
            <th class="px-4 py-3 text-center text-sm font-semibold text-gray-800 border border-gray-300 w-16">Aksi</th>
          </tr>
        </thead>
        <tbody>
          <!-- Harga Paket -->
          <tr>
            <td class="px-4 py-2 text-center text-sm border border-gray-300">1</td>
            <td class="px-4 py-2 text-sm font-medium text-gray-800 border border-gray-300">Harga Paket</td>
            <td class="px-4 py-2 border border-gray-300">
              <input 
                type="number" 
                bind:value={$formData.rincianBiaya.perincianBiaya.hargaPaket.qty}
                class="w-full px-2 py-1 border border-gray-300 rounded focus:ring-2 focus:ring-rose-300 outline-none text-sm text-center" 
              />
            </td>
            <td class="px-4 py-2 border border-gray-300">
              <input 
                type="number" 
                bind:value={$formData.rincianBiaya.perincianBiaya.hargaPaket.harga}
                class="w-full px-2 py-1 border border-gray-300 rounded focus:ring-2 focus:ring-rose-300 outline-none text-sm text-right" 
              />
            </td>
            <td class="px-4 py-2 border border-gray-300 text-right text-sm font-medium">
              {formatCurrency($formData.rincianBiaya.perincianBiaya.hargaPaket.total)}
            </td>
            <td class="px-4 py-2 border border-gray-300"></td>
          </tr>

          <!-- Dynamic Sections -->
          {#each $formData.rincianBiaya.perincianBiaya.sections as section, sectionIdx}
            <!-- Section Header -->
            <tr 
              class="bg-gray-100"
              on:dragover={handleDragOver}
              on:drop={(e) => handleDrop(e, section.id)}
            >
              <td class="px-4 py-2 text-center text-sm border border-gray-300">{sectionIdx + 2}</td>
              <td class="px-4 py-2 text-sm font-semibold text-gray-800 border border-gray-300" colspan="4">
                <div class="flex items-center justify-between">
                  <input 
                    type="text" 
                    bind:value={section.name}
                    class="font-semibold bg-transparent border-none focus:outline-none focus:ring-2 focus:ring-rose-300 rounded px-2 py-1" 
                  />
                  <span class="text-xs text-gray-500 italic">Drop products here</span>
                </div>
              </td>
              <td class="px-4 py-2 text-center border border-gray-300">
                {#if $formData.rincianBiaya.perincianBiaya.sections.length > 1}
                  <button 
                    type="button" 
                    on:click={() => removeSection(section.id)} 
                    class="p-1 text-red-500 hover:text-red-700 transition duration-200"
                    title="Remove Section"
                  >
                    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path>
                    </svg>
                  </button>
                {/if}
              </td>
            </tr>

            <!-- Section Items -->
            {#each section.items as item, itemIdx}
              <tr 
                draggable="true"
                on:dragstart={(e) => handleDragStart(e, item, itemIdx, section.id)}
                class="cursor-move hover:bg-gray-50"
              >
                <td class="px-4 py-2 text-center text-sm border border-gray-300">
                  <svg class="w-4 h-4 mx-auto text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 8h16M4 16h16"></path>
                  </svg>
                </td>
                <td class="px-4 py-2 border border-gray-300">
                  <input 
                    type="text" 
                    bind:value={item.item}
                    placeholder="Nama item..."
                    class="w-full px-2 py-1 border border-gray-300 rounded focus:ring-2 focus:ring-rose-300 outline-none text-sm" 
                  />
                </td>
                <td class="px-4 py-2 border border-gray-300">
                  <input 
                    type="number" 
                    bind:value={item.qty}
                    class="w-full px-2 py-1 border border-gray-300 rounded focus:ring-2 focus:ring-rose-300 outline-none text-sm text-center" 
                  />
                </td>
                <td class="px-4 py-2 border border-gray-300">
                  <input 
                    type="number" 
                    bind:value={item.harga}
                    class="w-full px-2 py-1 border border-gray-300 rounded focus:ring-2 focus:ring-rose-300 outline-none text-sm text-right" 
                  />
                </td>
                <td class="px-4 py-2 border border-gray-300 text-right text-sm font-medium">
                  {formatCurrency(item.total)}
                </td>
                <td class="px-4 py-2 text-center border border-gray-300">
                  <button 
                    type="button" 
                    on:click={() => removeProductFromSection(section.id, itemIdx)} 
                    class="p-1 text-red-500 hover:text-red-700 transition duration-200"
                    title="Hapus"
                  >
                    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path>
                    </svg>
                  </button>
                </td>
              </tr>
            {/each}

            <!-- Empty section placeholder -->
            {#if section.items.length === 0}
              <tr 
                on:dragover={handleDragOver}
                on:drop={(e) => handleDrop(e, section.id)}
              >
                <td colspan="6" class="px-4 py-4 border border-gray-300 text-center text-sm text-gray-400 italic">
                  No items in this section. Drag products here.
                </td>
              </tr>
            {/if}
          {/each}

          <!-- Unassigned Products Section -->
          {#if $formData.rincianBiaya.perincianBiaya.unassignedProducts.length > 0}
            <tr class="bg-yellow-50">
              <td class="px-4 py-2 text-center text-sm border border-gray-300"></td>
              <td class="px-4 py-2 text-sm font-semibold text-gray-800 border border-gray-300" colspan="5">
                <div class="flex items-center justify-between">
                  <span class="text-yellow-700">Unassigned Products (Drag to a section above)</span>
                </div>
              </td>
            </tr>

            {#each $formData.rincianBiaya.perincianBiaya.unassignedProducts as item, itemIdx}
              <tr 
                draggable="true"
                on:dragstart={(e) => handleDragStart(e, item, itemIdx, null)}
                class="cursor-move hover:bg-yellow-50 bg-yellow-25"
              >
                <td class="px-4 py-2 text-center text-sm border border-gray-300">
                  <svg class="w-4 h-4 mx-auto text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 8h16M4 16h16"></path>
                  </svg>
                </td>
                <td class="px-4 py-2 border border-gray-300">
                  <input 
                    type="text" 
                    bind:value={item.item}
                    placeholder="Nama item..."
                    class="w-full px-2 py-1 border border-gray-300 rounded focus:ring-2 focus:ring-rose-300 outline-none text-sm" 
                  />
                </td>
                <td class="px-4 py-2 border border-gray-300">
                  <input 
                    type="number" 
                    bind:value={item.qty}
                    class="w-full px-2 py-1 border border-gray-300 rounded focus:ring-2 focus:ring-rose-300 outline-none text-sm text-center" 
                  />
                </td>
                <td class="px-4 py-2 border border-gray-300">
                  <input 
                    type="number" 
                    bind:value={item.harga}
                    class="w-full px-2 py-1 border border-gray-300 rounded focus:ring-2 focus:ring-rose-300 outline-none text-sm text-right" 
                  />
                </td>
                <td class="px-4 py-2 border border-gray-300 text-right text-sm font-medium">
                  {formatCurrency(item.total)}
                </td>
                <td class="px-4 py-2 text-center border border-gray-300">
                  <button 
                    type="button" 
                    on:click={() => removeUnassignedProduct(itemIdx)} 
                    class="p-1 text-red-500 hover:text-red-700 transition duration-200"
                    title="Hapus"
                  >
                    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path>
                    </svg>
                  </button>
                </td>
              </tr>
            {/each}
          {/if}

          <!-- Total Biaya -->
          <tr class="bg-rose-50 font-semibold">
            <td class="px-4 py-3 border border-gray-300" colspan="4"></td>
            <td class="px-4 py-3 text-sm text-gray-800 border border-gray-300">Total Biaya</td>
            <td class="px-4 py-3 text-right text-sm text-gray-800 border border-gray-300">{formatCurrency(totalBiaya)}</td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Add Product Button at Bottom -->
    <div class="flex justify-center items-center gap-4 mt-4">
      <button 
        type="button" 
        on:click={addProduct} 
        class="text-blue-600 hover:text-blue-700 text-sm font-bold transition duration-200 flex items-center gap-1"
      >
        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"></path>
        </svg>
        Add Product
      </button>
      <button 
        type="button" 
        on:click={addSection} 
        class="text-blue-600 hover:text-blue-700 text-sm font-bold transition duration-200 flex items-center gap-1"
      >
        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"></path>
        </svg>
        Add Section
      </button>
    </div>
  </div>

  <!-- Perincian Pembayaran Section -->
  <div class="border border-gray-300 rounded-lg p-6">
    <h3 class="text-xl font-semibold text-gray-800 mb-6 text-center bg-gray-100 py-2 -mx-6 -mt-6 rounded-t-lg">Perincian Pembayaran</h3>

    <div class="flex items-center justify-end mb-4">
      <button type="button" on:click={addPembayaran} class="px-4 py-2 bg-rose-400 hover:bg-rose-500 text-white text-sm rounded transition duration-200">
        Tambah Pembayaran
      </button>
    </div>

    <div class="overflow-x-auto">
      <table class="w-full border-collapse">
        <thead>
          <tr class="bg-gray-50">
            <th class="px-4 py-3 text-left text-sm font-semibold text-gray-800 border border-gray-300 w-8">No</th>
            <th class="px-4 py-3 text-center text-sm font-semibold text-gray-800 border border-gray-300">Tanggal Pembayaran</th>
            <th class="px-4 py-3 text-center text-sm font-semibold text-gray-800 border border-gray-300">Cash/Transfer</th>
            <th class="px-4 py-3 text-center text-sm font-semibold text-gray-800 border border-gray-300">Jumlah</th>
            <th class="px-4 py-3 text-center text-sm font-semibold text-gray-800 border border-gray-300 w-48">Aksi</th>
          </tr>
        </thead>
        <tbody>
          {#each $formData.rincianBiaya.perincianPembayaran as pembayaran, idx}
            <tr>
              <td class="px-4 py-2 text-center text-sm border border-gray-300">{idx + 1}</td>
              <td class="px-4 py-2 border border-gray-300">
                <input 
                  type="date" 
                  bind:value={pembayaran.tanggal}
                  class="w-full px-2 py-1 border border-gray-300 rounded focus:ring-2 focus:ring-rose-300 outline-none text-sm" 
                />
              </td>
              <td class="px-4 py-2 border border-gray-300">
                <select 
                  bind:value={pembayaran.cashTransfer}
                  class="w-full px-2 py-1 border border-gray-300 rounded focus:ring-2 focus:ring-rose-300 outline-none text-sm"
                >
                  <option value="">Pilih</option>
                  <option value="Cash">Cash</option>
                  <option value="Transfer">Transfer</option>
                </select>
              </td>
              <td class="px-4 py-2 border border-gray-300">
                <input 
                  type="number" 
                  bind:value={pembayaran.jumlah}
                  class="w-full px-2 py-1 border border-gray-300 rounded focus:ring-2 focus:ring-rose-300 outline-none text-sm text-right" 
                />
              </td>
              <td class="px-4 py-2 text-center border border-gray-300">
                <div class="flex items-center justify-center gap-3">
                  <button 
                    type="button" 
                    on:click={() => handleUploadBukti(idx)} 
                    class="p-1 text-blue-500 hover:text-blue-700 transition duration-200"
                    title="Upload Bukti"
                  >
                    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"></path>
                    </svg>
                  </button>
                  <span class="text-gray-300">|</span>
                  <button 
                    type="button" 
                    on:click={() => removePembayaran(idx)} 
                    class="p-1 text-red-500 hover:text-red-700 transition duration-200"
                    title="Hapus"
                  >
                    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path>
                    </svg>
                  </button>
                </div>
              </td>
            </tr>
          {/each}

          <!-- Total Pembayaran -->
          <tr class="bg-blue-50 font-semibold">
            <td class="px-4 py-3 border border-gray-300" colspan="3"></td>
            <td class="px-4 py-3 text-sm text-gray-800 border border-gray-300">Total Pembayaran</td>
            <td class="px-4 py-3 text-right text-sm text-gray-800 border border-gray-300">{formatCurrency(totalPembayaran)}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>

  <!-- Summary Section -->
  <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
    <div class="bg-rose-50 border-2 border-rose-200 rounded-lg p-6">
      <h4 class="text-sm font-medium text-gray-600 mb-2">Total Biaya</h4>
      <p class="text-2xl font-bold text-rose-600">{formatCurrency(totalBiaya)}</p>
    </div>
    
    <div class="bg-blue-50 border-2 border-blue-200 rounded-lg p-6">
      <h4 class="text-sm font-medium text-gray-600 mb-2">Total Pembayaran</h4>
      <p class="text-2xl font-bold text-blue-600">{formatCurrency(totalPembayaran)}</p>
    </div>
    
    <div class="bg-{sisaPembayaran > 0 ? 'yellow' : 'green'}-50 border-2 border-{sisaPembayaran > 0 ? 'yellow' : 'green'}-200 rounded-lg p-6">
      <h4 class="text-sm font-medium text-gray-600 mb-2">Sisa Pembayaran</h4>
      <p class="text-2xl font-bold text-{sisaPembayaran > 0 ? 'yellow' : 'green'}-600">{formatCurrency(sisaPembayaran)}</p>
    </div>
  </div>

  <!-- Footer Signature -->
  <div class="grid grid-cols-2 gap-8 mt-12 pt-8 border-t border-gray-200">
    <div class="text-center">
      <p class="text-sm font-medium text-gray-700 mb-16">Pengantin</p>
      <div class="border-t-2 border-gray-400 pt-2 mx-12">
        <p class="text-sm text-gray-600">( {$formData.rincianBiaya.namaPengantin || '_______________'} )</p>
      </div>
    </div>
    <div class="text-center">
      <p class="text-sm font-medium text-gray-700 mb-16">Griya Aristy</p>
      <div class="border-t-2 border-gray-400 pt-2 mx-12">
        <p class="text-sm text-gray-600">( _______________ )</p>
      </div>
    </div>
  </div>
</div>