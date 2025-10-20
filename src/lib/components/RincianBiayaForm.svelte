
<!-- ============================================ -->
<!-- FILE: src/lib/components/RincianBiayaForm.svelte -->
<!-- ============================================ -->
<script>
  import { formData } from '$lib/stores/formStore.js';
  import { page } from '$app/stores';
  import {getFormById} from "$lib/data/fittingFormsData"
	import { goto } from '$app/navigation';

  let currentFormId = $page.params.id;
  let isNewForm = currentFormId === 'new';
  let currentData = null

  if (!isNewForm) {
    currentData = getFormById(currentFormId)
    if (!currentData) {
      goto("/fitting")
    }
  }

  console.log(currentData)

  // Initialize rincian biaya data if not exists
  if (!$formData.rincianBiaya) {
    $formData.rincianBiaya = {
      namaPengantin: currentData?.namaPengantin,
      tanggalAcara: '',
      pilihanPaket: '',
      perincianBiaya: {
        hargaPaket: { qty: 1, harga: 0, total: 0 },
        penambahan: [
          { item: '', qty: 0, harga: 0, total: 0 }
        ],
        lainnya: [
          { item: '', qty: 0, harga: 0, total: 0 }
        ]
      },
      perincianPembayaran: [
        { tanggal: '', metode:'', cashTransfer: '', jumlah: 0 }
      ]
    };
  }

  $: {
    // Auto calculate total for harga paket
    if ($formData.rincianBiaya?.perincianBiaya?.hargaPaket) {
      $formData.rincianBiaya.perincianBiaya.hargaPaket.total = 
        $formData.rincianBiaya.perincianBiaya.hargaPaket.qty * 
        $formData.rincianBiaya.perincianBiaya.hargaPaket.harga;
    }

    // Auto calculate total for penambahan items
    if ($formData.rincianBiaya?.perincianBiaya?.penambahan) {
      $formData.rincianBiaya.perincianBiaya.penambahan = 
        $formData.rincianBiaya.perincianBiaya.penambahan.map(item => ({
          ...item,
          total: item.qty * item.harga
        }));
    }

    // Auto calculate total for lainnya items
    if ($formData.rincianBiaya?.perincianBiaya?.lainnya) {
      $formData.rincianBiaya.perincianBiaya.lainnya = 
        $formData.rincianBiaya.perincianBiaya.lainnya.map(item => ({
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
    
    $formData.rincianBiaya.perincianBiaya.penambahan?.forEach(item => {
      total += item.total || 0;
    });
    
    $formData.rincianBiaya.perincianBiaya.lainnya?.forEach(item => {
      total += item.total || 0;
    });
    
    return total;
  }

  function calculateTotalPembayaran() {
    if (!$formData.rincianBiaya?.perincianPembayaran) return 0;
    return $formData.rincianBiaya.perincianPembayaran.reduce((sum, item) => sum + (item.jumlah || 0), 0);
  }

  function addPenambahan() {
    $formData.rincianBiaya.perincianBiaya.penambahan = [
      ...$formData.rincianBiaya.perincianBiaya.penambahan,
      { item: '', qty: 0, harga: 0, total: 0 }
    ];
  }

  function removePenambahan(index) {
    if ($formData.rincianBiaya.perincianBiaya.penambahan.length > 1) {
      $formData.rincianBiaya.perincianBiaya.penambahan.splice(index, 1);
      $formData.rincianBiaya.perincianBiaya.penambahan = [...$formData.rincianBiaya.perincianBiaya.penambahan];
    }
  }

  function addLainnya() {
    $formData.rincianBiaya.perincianBiaya.lainnya = [
      ...$formData.rincianBiaya.perincianBiaya.lainnya,
      { item: '', qty: 0, harga: 0, total: 0 }
    ];
  }

  function removeLainnya(index) {
    if ($formData.rincianBiaya.perincianBiaya.lainnya.length > 1) {
      $formData.rincianBiaya.perincianBiaya.lainnya.splice(index, 1);
      $formData.rincianBiaya.perincianBiaya.lainnya = [...$formData.rincianBiaya.perincianBiaya.lainnya];
    }
  }

  function addPembayaran() {
    $formData.rincianBiaya.perincianPembayaran = [
      ...$formData.rincianBiaya.perincianPembayaran,
      { tanggal: '', cashTransfer: '', jumlah: 0 }
    ];
  }

  function removePembayaran(index) {
    if ($formData.rincianBiaya.perincianPembayaran.length > 1) {
      $formData.rincianBiaya.perincianPembayaran.splice(index, 1);
      $formData.rincianBiaya.perincianPembayaran = [...$formData.rincianBiaya.perincianPembayaran];
    }
  }

  function formatCurrency(value) {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0
    }).format(value);
  }

  function downloadKwitansi(value){
    alert("Downloaded")
  }
</script>

<div class="space-y-8">
  <!-- Header Information -->
  <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
    <div>
      <label class="block text-sm font-medium text-gray-700 mb-2">Nama Pengantin</label>
      <input 
        type="text" 
        bind:value={$formData.rincianBiaya.namaPengantin}
        class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-300 focus:border-transparent outline-none" 
        readonly
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
      <label class="block text-sm font-medium text-gray-700 mb-2">Pilihan Paket</label>
      <input 
        type="text" 
        bind:value={$formData.rincianBiaya.pilihanPaket} 
        class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-300 focus:border-transparent outline-none" 
      />
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

          <!-- Penambahan Header -->
          <tr class="bg-gray-100">
            <td class="px-4 py-2 text-center text-sm border border-gray-300">2</td>
            <td class="px-4 py-2 text-sm font-semibold text-gray-800 border border-gray-300" colspan="5">
              <div class="flex items-center justify-between">
                <span>Penambahan</span>
                <button type="button" on:click={addPenambahan} class="px-3 py-1 bg-rose-400 hover:bg-rose-500 text-white text-xs rounded transition duration-200">
                  Tambah Item
                </button>
              </div>
            </td>
          </tr>

          <!-- Penambahan Items -->
          {#each $formData.rincianBiaya.perincianBiaya.penambahan as item, idx}
            <tr>
              <td class="px-4 py-2 text-center text-sm border border-gray-300"></td>
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
                <button type="button" on:click={() => removePenambahan(idx)} class="px-2 py-1 bg-red-500 hover:bg-red-600 text-white text-xs rounded transition duration-200">
                  Hapus
                </button>
              </td>
            </tr>
          {/each}

          <!-- Lainnya Header -->
          <tr class="bg-gray-100">
            <td class="px-4 py-2 text-center text-sm border border-gray-300">3</td>
            <td class="px-4 py-2 text-sm font-semibold text-gray-800 border border-gray-300" colspan="5">
              <div class="flex items-center justify-between">
                <span>Lainnya</span>
                <button type="button" on:click={addLainnya} class="px-3 py-1 bg-rose-400 hover:bg-rose-500 text-white text-xs rounded transition duration-200">
                  Tambah Item
                </button>
              </div>
            </td>
          </tr>

          <!-- Lainnya Items -->
          {#each $formData.rincianBiaya.perincianBiaya.lainnya as item, idx}
            <tr>
              <td class="px-4 py-2 text-center text-sm border border-gray-300"></td>
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
                <button type="button" on:click={() => removeLainnya(idx)} class="px-2 py-1 bg-red-500 hover:bg-red-600 text-white text-xs rounded transition duration-200">
                  Hapus
                </button>
              </td>
            </tr>
          {/each}

          <!-- Total Biaya -->
          <tr class="bg-rose-50 font-semibold">
            <td class="px-4 py-3 border border-gray-300" colspan="4"></td>
            <td class="px-4 py-3 text-sm text-gray-800 border border-gray-300">Total Biaya</td>
            <td class="px-4 py-3 text-right text-sm text-gray-800 border border-gray-300">{formatCurrency(totalBiaya)}</td>
          </tr>
        </tbody>
      </table>
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
            <th class="px-4 py-3 text-center text-sm font-semibold text-gray-800 border border-gray-300">Pembayaran</th>
            <th class="px-4 py-3 text-center text-sm font-semibold text-gray-800 border border-gray-300">Cash/Transfer</th>
            <th class="px-4 py-3 text-center text-sm font-semibold text-gray-800 border border-gray-300">Jumlah</th>
            <th class="px-4 py-3 text-center text-sm font-semibold text-gray-800 border border-gray-300 w-16" colspan="2">Aksi</th>
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
                  bind:value={pembayaran.metode}
                  class="w-full px-2 py-1 border border-gray-300 rounded focus:ring-2 focus:ring-rose-300 outline-none text-sm"
                >
                  <option value="">Pilih</option>
                  <option value="DP">DP</option>
                  <option value="Full">Full</option>
                  <option value="Deposit">Deposit</option>
                </select>
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
              {#if currentData?.files.length > 0}
                <td class="px-4 py-2 text-center border border-gray-300">
                  <div class="grid grid-cols-1 gap-1">
                    {#each currentData?.files as file}
                      <button type="button" on:click={() => removePembayaran(idx)} class="px-2 py-1 font-bold text-blue-500 bg-white hover:bg-blue-500 hover:text-white text-xs rounded transition duration-200">
                        {file}
                      </button>
                    {/each}
                  </div>
                </td>
              {/if}
              <td class="px-4 py-2 text-center border border-gray-300">
                <button type="button" on:click={() => removePembayaran(idx)} class="px-2 py-1 bg-red-500 hover:bg-red-600 text-white text-xs rounded transition duration-200">
                  Hapus
                </button>
              </td>
            </tr>
          {/each}

          <!-- Total Pembayaran -->
          <tr class="bg-blue-50 font-semibold">
            <td class="px-4 py-3 text-sm text-gray-800 border border-gray-300" colspan="4">Total Pembayaran</td>
            <td class="px-4 py-3 text-right text-sm text-gray-800 border border-gray-300" colspan="3">{formatCurrency(totalPembayaran)}</td>
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