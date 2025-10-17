<script>
  import { dresses, bookings } from '$lib/data/mockData.js';

  let selectedKode = '';
  let selectedDate = '';
  let searchQuery = '';
  let showResults = false;
  let isAvailable = false;
  let availabilityList = [];
  let filteredDresses = dresses;
  let showDropdown = false;

  $: {
    if (searchQuery) {
      filteredDresses = dresses.filter(dress =>
        dress.kode.toLowerCase().includes(searchQuery.toLowerCase()) ||
        dress.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
    } else {
      filteredDresses = dresses;
    }
  }

  function selectDress(dress) {
    selectedKode = dress.kode;
    searchQuery = `${dress.kode} - ${dress.name}`;
    showDropdown = false;
  }

  function checkAvailability() {
    if (!selectedKode || !selectedDate) {
      alert('Mohon pilih dress dan tanggal');
      return;
    }

    const booking = bookings.find(b => b.kode === selectedKode && b.tanggal === selectedDate);
    isAvailable = !booking;
    showResults = true;

    const today = new Date().toISOString().split('T')[0];
    availabilityList = bookings
      .filter(b => b.kode === selectedKode && b.tanggal >= today)
      .sort((a, b) => new Date(a.tanggal) - new Date(b.tanggal));
  }

  function resetAvailability() {
    selectedKode = '';
    selectedDate = '';
    searchQuery = '';
    showResults = false;
    availabilityList = [];
  }

  function formatDate(dateString) {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('id-ID', options);
  }
</script>

<div class="bg-white rounded-lg shadow-md p-8 border-t-4 border-rose-300">
  <h2 class="text-3xl font-serif text-gray-800 mb-2">Availability Checker</h2>
  <p class="text-gray-600 mb-8">Cek ketersediaan gaun untuk hari spesial Anda</p>

  <div class="space-y-6">
    <!-- Dress Selection -->
    <div class="relative">
      <label class="block text-sm font-medium text-gray-700 mb-2">Kode Produk Dress</label>
      <input
        type="text"
        bind:value={searchQuery}
        on:focus={() => (showDropdown = true)}
        on:blur={() => setTimeout(() => (showDropdown = false), 200)}
        placeholder="Cari kode dress atau nama..."
        class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-300 focus:border-transparent outline-none"
      />

      {#if showDropdown && filteredDresses.length > 0}
        <div class="absolute z-10 w-full mt-1 bg-white border border-gray-200 rounded-lg shadow-lg max-h-60 overflow-y-auto">
          {#each filteredDresses as dress}
            <button
              type="button"
              on:click={() => selectDress(dress)}
              class="w-full text-left px-4 py-3 hover:bg-rose-50 border-b border-gray-100 last:border-0"
            >
              <div class="font-medium text-gray-800">{dress.kode}</div>
              <div class="text-sm text-gray-600">{dress.name}</div>
            </button>
          {/each}
        </div>
      {/if}
    </div>

    <!-- Date Selection -->
    <div>
      <label class="block text-sm font-medium text-gray-700 mb-2">Tanggal</label>
      <input
        type="date"
        bind:value={selectedDate}
        min={new Date().toISOString().split('T')[0]}
        class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-300 focus:border-transparent outline-none"
      />
    </div>

    <!-- Buttons -->
    <div class="flex gap-4">
      <button
        on:click={checkAvailability}
        class="flex-1 bg-rose-400 hover:bg-rose-500 text-white font-medium py-3 px-6 rounded-lg transition duration-200"
      >
        Cek Ketersediaan
      </button>
      <button
        on:click={resetAvailability}
        class="px-6 py-3 border border-gray-300 text-gray-700 font-medium rounded-lg hover:bg-gray-50 transition duration-200"
      >
        Reset
      </button>
    </div>
  </div>

  <!-- Results -->
  {#if showResults}
    <div class="mt-8 pt-8 border-t border-gray-200">
      {#if isAvailable}
        <div class="bg-green-50 border border-green-200 rounded-lg p-6 mb-6">
          <h3 class="text-lg font-semibold text-green-800 mb-2">Tersedia</h3>
          <p class="text-green-700">Produk tersedia untuk tanggal {formatDate(selectedDate)}</p>
        </div>
      {:else}
        <div class="bg-red-50 border border-red-200 rounded-lg p-6 mb-6">
          <h3 class="text-lg font-semibold text-red-800 mb-2">Tidak Tersedia</h3>
          <p class="text-red-700">Produk tidak tersedia untuk tanggal {formatDate(selectedDate)}</p>
        </div>
      {/if}

      {#if availabilityList.length > 0}
        <div class="bg-white border border-gray-200 rounded-lg overflow-hidden">
          <div class="px-6 py-4 bg-gray-50 border-b border-gray-200">
            <h3 class="text-lg font-semibold text-gray-800">Jadwal Pemesanan</h3>
            <p class="text-sm text-gray-600 mt-1">Pemesanan saat ini untuk {selectedKode}</p>
          </div>
          <div class="overflow-x-auto">
            <table class="w-full">
              <thead class="bg-gray-50">
                <tr>
                  <th class="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">Kode Dress</th>
                  <th class="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">Tanggal</th>
                  <th class="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">Nama Pelanggan</th>
                </tr>
              </thead>
              <tbody class="bg-white divide-y divide-gray-200">
                {#each availabilityList as booking}
                  <tr class="hover:bg-gray-50">
                    <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{booking.kode}</td>
                    <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{formatDate(booking.tanggal)}</td>
                    <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{booking.customer}</td>
                  </tr>
                {/each}
              </tbody>
            </table>
          </div>
        </div>
      {/if}
    </div>
  {/if}
</div>