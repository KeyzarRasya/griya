<script>
	import { vendors } from '$lib/data/contactManagementData';
  import { formData } from '$lib/stores/formStore.js';

  let status = ['Terkonfirmasi', 'Dalam ']
  let state = [
    {
      id:'terkonfirmasi',
      displayName: 'Terkonfirmasi'
    },

    {
      id:'d_konfirmasi',
      displayName: 'Dalam Konfirmasi'
    }
  ]
  
  // Mock thirdParties data structure - replace with actual import from contactManagementData.js
  const thirdParties = [
    {
      id: 1,
      name: 'griya',
      displayName: 'Griya Aristy',
      packages: [
        { id: 'g1', name: 'Paket Silver', price: 15000000 },
        { id: 'g2', name: 'Paket Gold', price: 25000000 },
        { id: 'g3', name: 'Paket Platinum', price: 35000000 }
      ]
    },
    {
      id: 2,
      name: 'vendor_a',
      displayName: 'Catering Mawar',
      packages: [
        { id: 'v1', name: 'Paket Ekonomis', price: 8000000 },
        { id: 'v2', name: 'Paket Standard', price: 12000000 },
        { id: 'v3', name: 'Paket Premium', price: 18000000 }
      ]
    },
    {
      id: 3,
      name: 'vendor_b',
      displayName: 'Dekorasi Melati',
      packages: [
        { id: 'd1', name: 'Paket Simple', price: 5000000 },
        { id: 'd2', name: 'Paket Elegant', price: 10000000 },
        { id: 'd3', name: 'Paket Luxury', price: 20000000 }
      ]
    },
    {
      id: 4,
      name: 'vendor_c',
      displayName: 'Fotografi Indah',
      packages: [
        { id: 'f1', name: 'Paket Basic', price: 3000000 },
        { id: 'f2', name: 'Paket Pro', price: 6000000 },
        { id: 'f3', name: 'Paket Ultimate', price: 12000000 }
      ]
    }
  ];

  // Initialize rincian biaya data with new structure
  if (!$formData.rincianBiaya) {
    $formData.rincianBiaya = {
      namaPengantin: '',
      tanggalAcara: '',
      pilihanVendor: 'griya',
      pilihanPaket: '',
      perincianBiaya: {
        hargaPaket: { qty: 1, harga: 0, total: 0, tanggungJawabBayar: '' },
        sections: [
          {
            id: Date.now() + '-item',
            name: 'Item',
            items: []
          },
          {
            id: Date.now() + 1 + '-penambahan',
            name: 'Penambahan',
            items: []
          }
        ],
        unassignedProducts: []
      },
      perincianPembayaran: {
        vendor: [
          { tanggal: '', cashTransfer: '', jumlah: 0, buktiUrl: '' }
        ],
        customer: [
          { tanggal: '', cashTransfer: '', jumlah: 0, buktiUrl: '' }
        ],
        griya: [
          { tanggal: '', cashTransfer: '', jumlah: 0, buktiUrl: '' }
        ]
      }
    };
  }

  // Ensure sections array exists for backward compatibility
  if (!$formData.rincianBiaya.perincianBiaya.sections) {
    $formData.rincianBiaya.perincianBiaya.sections = [
      {
        id: Date.now() + '-item',
        name: 'Item',
        items: $formData.rincianBiaya.perincianBiaya.penambahan || []
      },
      {
        id: Date.now() + 1 + '-penambahan',
        name: 'Penambahan',
        items: $formData.rincianBiaya.perincianBiaya.lainnya || []
      }
    ];
    $formData.rincianBiaya.perincianBiaya.unassignedProducts = [];
  }

  // Ensure pilihanVendor field exists
  if (!$formData.rincianBiaya.pilihanVendor) {
    $formData.rincianBiaya.pilihanVendor = 'griya';
  }

  // Ensure new payment structure exists
  if (!$formData.rincianBiaya.perincianPembayaran.vendor) {
    $formData.rincianBiaya.perincianPembayaran = {
      vendor: [{ tanggal: '', cashTransfer: '', jumlah: 0, buktiUrl: '' }],
      customer: [{ tanggal: '', cashTransfer: '', jumlah: 0, buktiUrl: '' }],
      griya: $formData.rincianBiaya.perincianPembayaran || [{ tanggal: '', cashTransfer: '', jumlah: 0, buktiUrl: '' }]
    };
  }

  // Ensure tanggungJawabBayar field exists in hargaPaket
  if (!$formData.rincianBiaya.perincianBiaya.hargaPaket.tanggungJawabBayar) {
    $formData.rincianBiaya.perincianBiaya.hargaPaket.tanggungJawabBayar = '';
  }

  let draggedProduct = null;
  let draggedProductIndex = null;
  let draggedFromSection = null;

  // Get available packages based on selected vendor
  $: availablePackages = thirdParties.find(v => v.name === $formData.rincianBiaya.pilihanVendor)?.packages || [];
  
  // Get selected package details
  $: selectedPackage = availablePackages.find(p => p.id === $formData.rincianBiaya.pilihanPaket);

  // Auto-update price when package changes
  $: if (selectedPackage && $formData.rincianBiaya.perincianBiaya.hargaPaket) {
    $formData.rincianBiaya.perincianBiaya.hargaPaket.harga = selectedPackage.price;
  }

  // Reset package selection when vendor changes
  $: if ($formData.rincianBiaya.pilihanVendor) {
    const currentPackages = thirdParties.find(v => v.name === $formData.rincianBiaya.pilihanVendor)?.packages || [];
    const packageExists = currentPackages.some(p => p.id === $formData.rincianBiaya.pilihanPaket);
    if (!packageExists) {
      $formData.rincianBiaya.pilihanPaket = '';
      $formData.rincianBiaya.perincianBiaya.hargaPaket.harga = 0;
    }
  }

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
    
    let total = 0;
    
    if ($formData.rincianBiaya.pilihanVendor === 'griya') {
      // For Griya, only count griya payments
      total = $formData.rincianBiaya.perincianPembayaran.griya?.reduce((sum, item) => sum + (item.jumlah || 0), 0) || 0;
    } else {
      // For other vendors, count both vendor and customer payments
      const vendorTotal = $formData.rincianBiaya.perincianPembayaran.vendor?.reduce((sum, item) => sum + (item.jumlah || 0), 0) || 0;
      const customerTotal = $formData.rincianBiaya.perincianPembayaran.customer?.reduce((sum, item) => sum + (item.jumlah || 0), 0) || 0;
      total = vendorTotal + customerTotal;
    }
    
    return total;
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
      total: 0,
      tanggungJawabBayar: ''
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

    if (draggedFromSection === targetSectionId) return;

    if (draggedFromSection === null) {
      $formData.rincianBiaya.perincianBiaya.unassignedProducts.splice(draggedProductIndex, 1);
      $formData.rincianBiaya.perincianBiaya.unassignedProducts = [...$formData.rincianBiaya.perincianBiaya.unassignedProducts];
    } else {
      const fromSectionIndex = $formData.rincianBiaya.perincianBiaya.sections.findIndex(s => s.id === draggedFromSection);
      if (fromSectionIndex !== -1) {
        $formData.rincianBiaya.perincianBiaya.sections[fromSectionIndex].items.splice(draggedProductIndex, 1);
      }
    }

    const toSectionIndex = $formData.rincianBiaya.perincianBiaya.sections.findIndex(s => s.id === targetSectionId);
    if (toSectionIndex !== -1) {
      $formData.rincianBiaya.perincianBiaya.sections[toSectionIndex].items = [
        ...$formData.rincianBiaya.perincianBiaya.sections[toSectionIndex].items,
        draggedProduct
      ];
    }

    $formData.rincianBiaya.perincianBiaya.sections = [...$formData.rincianBiaya.perincianBiaya.sections];

    draggedProduct = null;
    draggedProductIndex = null;
    draggedFromSection = null;
  }

  function addPembayaran(type) {
    if (type === 'griya') {
      $formData.rincianBiaya.perincianPembayaran.griya = [
        ...$formData.rincianBiaya.perincianPembayaran.griya,
        { tanggal: '', cashTransfer: '', jumlah: 0, buktiUrl: '' }
      ];
    } else if (type === 'vendor') {
      $formData.rincianBiaya.perincianPembayaran.vendor = [
        ...$formData.rincianBiaya.perincianPembayaran.vendor,
        { tanggal: '', cashTransfer: '', jumlah: 0, buktiUrl: '' }
      ];
    } else if (type === 'customer') {
      $formData.rincianBiaya.perincianPembayaran.customer = [
        ...$formData.rincianBiaya.perincianPembayaran.customer,
        { tanggal: '', cashTransfer: '', jumlah: 0, buktiUrl: '' }
      ];
    }
  }

  function removePembayaran(type, idx) {
    if (type === 'griya' && $formData.rincianBiaya.perincianPembayaran.griya.length > 1) {
      $formData.rincianBiaya.perincianPembayaran.griya.splice(idx, 1);
      $formData.rincianBiaya.perincianPembayaran.griya = [...$formData.rincianBiaya.perincianPembayaran.griya];
    } else if (type === 'vendor' && $formData.rincianBiaya.perincianPembayaran.vendor.length > 1) {
      $formData.rincianBiaya.perincianPembayaran.vendor.splice(idx, 1);
      $formData.rincianBiaya.perincianPembayaran.vendor = [...$formData.rincianBiaya.perincianPembayaran.vendor];
    } else if (type === 'customer' && $formData.rincianBiaya.perincianPembayaran.customer.length > 1) {
      $formData.rincianBiaya.perincianPembayaran.customer.splice(idx, 1);
      $formData.rincianBiaya.perincianPembayaran.customer = [...$formData.rincianBiaya.perincianPembayaran.customer];
    }
  }

  function handleUploadBukti(type, idx) {
    alert(`Upload bukti for ${type} payment #${idx + 1} - Feature to be implemented`);
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
  <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
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
      <label class="block text-sm font-medium text-gray-700 mb-2">Pilihan Vendor</label>
      <select 
        bind:value={$formData.rincianBiaya.pilihanVendor}
        class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-300 focus:border-transparent outline-none"
      >
        {#each thirdParties as vendor}
          <option value={vendor.name}>{vendor.displayName}</option>
        {/each}
      </select>
    </div>
    {#if $formData.rincianBiaya.pilihanVendor != 'griya'}
    <div>
      <label class="block text-sm font-medium text-gray-700 mb-2">Pilihan Paket</label>
      <select 
        bind:value={$formData.rincianBiaya.pilihanPaket}
        class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-300 focus:border-transparent outline-none"
        disabled={availablePackages.length === 0}
      >
        <option value="">-- Pilih Paket --</option>
        {#each availablePackages as package_item}
          <option value={package_item.name}>
            {package_item.name}
          </option>
        {/each}
      </select>
    </div>
    {/if}
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
            {#if $formData.rincianBiaya.pilihanVendor !== 'griya'}
              <th class="px-4 py-3 text-center text-sm font-semibold text-gray-800 border border-gray-300 w-40">Tanggung Jawab Bayar</th>
            {/if}
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
            <td class="px-4 py-2 text-sm font-medium text-gray-800 border border-gray-300">
              Harga Paket
              {#if selectedPackage}
                <span class="text-xs text-gray-600 block">({selectedPackage.name})</span>
              {/if}
            </td>
            {#if $formData.rincianBiaya.pilihanVendor !== 'griya'}
              <td class="px-4 py-2 border border-gray-300">
                <select 
                  bind:value={$formData.rincianBiaya.perincianBiaya.hargaPaket.tanggungJawabBayar}
                  class="w-full px-2 py-1 border border-gray-300 rounded focus:ring-2 focus:ring-rose-300 outline-none text-sm"
                >
                  <option value="">Pilih</option>
                  <option value="Customer">Customer</option>
                  <option value="Vendor">Vendor</option>
                </select>
              </td>
            {/if}
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
                readonly={selectedPackage !== undefined}
              />
            </td>
            <td class="px-4 py-2 border border-gray-300 text-right text-sm font-medium">
              {formatCurrency($formData.rincianBiaya.perincianBiaya.hargaPaket.total)}
            </td>
            <td class="px-4 py-2 text-center border border-gray-300"></td>
          </tr>

          <!-- Sections -->
          {#each $formData.rincianBiaya.perincianBiaya.sections as section, sectionIdx}
            <!-- Section Header -->
            <tr class="bg-gray-200">
              <td colspan="{$formData.rincianBiaya.pilihanVendor !== 'griya' ? '7' : '6'}" class="px-4 py-2 border border-gray-300">
                <div class="flex justify-between items-center">
                  <input 
                    type="text" 
                    bind:value={section.name}
                    class="font-semibold bg-transparent border-none focus:outline-none"
                  />
                  <button 
                    type="button" 
                    on:click={() => removeSection(section.id)}
                    class="text-red-600 hover:underline text-sm"
                  >
                    Remove Section
                  </button>
                </div>
              </td>
            </tr>

            <!-- Drop Zone -->
            <tr 
              on:dragover={handleDragOver}
              on:drop={(e) => handleDrop(e, section.id)}
              class="bg-gray-50"
            >
              <td colspan="{$formData.rincianBiaya.pilihanVendor !== 'griya' ? '7' : '6'}" class="px-4 py-3 text-center text-sm text-gray-500 border border-gray-300 italic">
                {#if section.items.length === 0}
                  Drop items here
                {:else}
                  {section.items.length} item(s)
                {/if}
              </td>
            </tr>

            <!-- Section Items -->
            {#each section.items as item, itemIdx}
              <tr 
                draggable="true"
                on:dragstart={(e) => handleDragStart(e, item, itemIdx, section.id)}
                class="hover:bg-gray-50"
              >
                <td class="px-4 py-2 text-center text-sm border border-gray-300">{sectionIdx + 2 + itemIdx}</td>
                <td class="px-4 py-2 border border-gray-300">
                  <input 
                    type="text" 
                    bind:value={item.item}
                    class="w-full px-2 py-1 border border-gray-300 rounded focus:ring-2 focus:ring-rose-300 outline-none text-sm" 
                  />
                </td>
                {#if $formData.rincianBiaya.pilihanVendor !== 'griya'}
                  <td class="px-4 py-2 border border-gray-300">
                    <select 
                      bind:value={item.tanggungJawabBayar}
                      class="w-full px-2 py-1 border border-gray-300 rounded focus:ring-2 focus:ring-rose-300 outline-none text-sm"
                    >
                      <option value="">Pilih</option>
                      <option value="Customer">Customer</option>
                      <option value="Vendor">Vendor</option>
                    </select>
                  </td>
                {/if}
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
          {/each}

          <!-- Unassigned Products -->
          {#if $formData.rincianBiaya.perincianBiaya.unassignedProducts.length > 0}
            <tr class="bg-gray-200">
              <td colspan="{$formData.rincianBiaya.pilihanVendor !== 'griya' ? '7' : '6'}" class="px-4 py-2 border border-gray-300">
                <span class="font-semibold">Unassigned Products</span>
              </td>
            </tr>
            {#each $formData.rincianBiaya.perincianBiaya.unassignedProducts as item, itemIdx}
              <tr 
                draggable="true"
                on:dragstart={(e) => handleDragStart(e, item, itemIdx, null)}
                class="hover:bg-gray-50"
              >
                <td class="px-4 py-2 text-center text-sm border border-gray-300">-</td>
                <td class="px-4 py-2 border border-gray-300">
                  <input 
                    type="text" 
                    bind:value={item.item}
                    class="w-full px-2 py-1 border border-gray-300 rounded focus:ring-2 focus:ring-rose-300 outline-none text-sm" 
                  />
                </td>
                {#if $formData.rincianBiaya.pilihanVendor !== 'griya'}
                  <td class="px-4 py-2 border border-gray-300">
                    <select 
                      bind:value={item.tanggungJawabBayar}
                      class="w-full px-2 py-1 border border-gray-300 rounded focus:ring-2 focus:ring-rose-300 outline-none text-sm"
                    >
                      <option value="">Pilih</option>
                      <option value="Customer">Customer</option>
                      <option value="Vendor">Vendor</option>
                    </select>
                  </td>
                {/if}
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
            <td class="px-4 py-3 border border-gray-300" colspan="{$formData.rincianBiaya.pilihanVendor !== 'griya' ? '4' : '3'}"></td>
            <td class="px-4 py-3 text-sm text-gray-800 border border-gray-300">Total Biaya</td>
            <td class="px-4 py-3 text-right text-sm text-gray-800 border border-gray-300">{formatCurrency(totalBiaya)}</td>
            <td class="px-4 py-3 border border-gray-300"></td>
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

    {#if $formData.rincianBiaya.pilihanVendor === 'griya'}
      <!-- Single table for Griya -->
      <div class="flex items-center justify-end mb-4">
        <button type="button" on:click={() => addPembayaran('griya')} class="px-4 py-2 bg-rose-400 hover:bg-rose-500 text-white text-sm rounded transition duration-200">
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
            {#each $formData.rincianBiaya.perincianPembayaran.griya as pembayaran, idx}
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
                      on:click={() => handleUploadBukti('griya', idx)} 
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
                      on:click={() => removePembayaran('griya', idx)} 
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
    {:else}
      <!-- Two tables (Vendor and Customer) in the same section -->
      
      <!-- Vendor Table -->
      <div class="mb-6">
        <h4 class="text-lg font-semibold text-gray-700 mb-4">Vendor</h4>
        
        <div class="flex items-center justify-end mb-4">
          <button type="button" on:click={() => addPembayaran('vendor')} class="px-4 py-2 bg-rose-400 hover:bg-rose-500 text-white text-sm rounded transition duration-200">
            Tambah Pembayaran Vendor
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
                <th class="px-4 py-3 text-center text-sm font-semibold text-gray-800 border border-gray-300">Status</th>
                <th class="px-4 py-3 text-center text-sm font-semibold text-gray-800 border border-gray-300 w-48">Aksi</th>
              </tr>
            </thead>
            <tbody>
              {#each $formData.rincianBiaya.perincianPembayaran.vendor as pembayaran, idx}
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
                  <td class="px-4 py-2 text-center border-gray-300 flex justify-center items-center">
                    <div class="flex items-center gap-2">
                      <span class="px-3 py-1 text-xs font-medium rounded-full {
                        state[0].id === 'terkonfirmasi' ? 'bg-green-100 text-green-800' :
                        state[0].id === 'd_konfirmasi' ? 'bg-blue-100 text-blue-800' :
                        'bg-gray-100 text-gray-800'
                      }">
                        {state[0].displayName}
                      </span>
                    </div>
                  </td>
                  <td class="px-4 py-2 text-center border border-gray-300">
                    <div class="flex items-center justify-center gap-3">
                      <button 
                        type="button" 
                        on:click={() => handleUploadBukti('vendor', idx)} 
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
                        on:click={() => removePembayaran('vendor', idx)} 
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

              <tr class="bg-blue-50 font-semibold">
                <td class="px-4 py-3 border border-gray-300" colspan="3"></td>
                <td class="px-4 py-3 text-sm text-gray-800 border border-gray-300">Total Pembayaran</td>
                <td class="px-4 py-3 text-right text-sm text-gray-800 border border-gray-300" colspan="2">{formatCurrency(totalPembayaran)}</td>
              </tr>

            </tbody>
          </table>
        </div>
      </div>

      <!-- Customer Table -->
      <div>
        <h4 class="text-lg font-semibold text-gray-700 mb-4">Customer</h4>
        
        <div class="flex items-center justify-end mb-4">
          <button type="button" on:click={() => addPembayaran('customer')} class="px-4 py-2 bg-rose-400 hover:bg-rose-500 text-white text-sm rounded transition duration-200">
            Tambah Pembayaran Customer
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
                <th class="px-4 py-3 text-center text-sm font-semibold text-gray-800 border border-gray-300">Status</th>
                <th class="px-4 py-3 text-center text-sm font-semibold text-gray-800 border border-gray-300 w-48">Aksi</th>
              </tr>
            </thead>
            <tbody>
              {#each $formData.rincianBiaya.perincianPembayaran.customer as pembayaran, idx}
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
                  <td class="px-4 py-2 text-center border-gray-300 flex justify-center items-center">
                    <div class="flex items-center gap-2">
                      <span class="px-3 py-1 text-xs font-medium rounded-full {
                        state[0].id === 'terkonfirmasi' ? 'bg-green-100 text-green-800' :
                        state[0].id === 'd_konfirmasi' ? 'bg-blue-100 text-blue-800' :
                        'bg-gray-100 text-gray-800'
                      }">
                        {state[0].displayName}
                      </span>
                    </div>
                  </td>
                  <td class="px-4 py-2 text-center border border-gray-300">
                    <div class="flex items-center justify-center gap-3">
                      <button 
                        type="button" 
                        on:click={() => handleUploadBukti('customer', idx)} 
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
                        on:click={() => removePembayaran('customer', idx)} 
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
                <td class="px-4 py-3 text-right text-sm text-gray-800 border border-gray-300" colspan="2">{formatCurrency(totalPembayaran)}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    {/if}
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
      <p class="text-sm font-medium text-gray-700 mb-16">
        {thirdParties.find(v => v.name === $formData.rincianBiaya.pilihanVendor)?.displayName || 'Vendor'}
      </p>
      <div class="border-t-2 border-gray-400 pt-2 mx-12">
        <p class="text-sm text-gray-600">( _______________ )</p>
      </div>
    </div>
  </div>
</div>