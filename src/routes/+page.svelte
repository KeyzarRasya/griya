<script>
  import { onMount } from 'svelte';

  // Mock data
  const dresses = [
    { kode: 'WD-001', name: 'Elegant Lace Gown' },
    { kode: 'WD-002', name: 'Princess Ball Gown' },
    { kode: 'WD-003', name: 'Modern Minimalist Dress' },
    { kode: 'WD-004', name: 'Vintage Romance Gown' },
    { kode: 'WD-005', name: 'Bohemian Style Dress' }
  ];

  const bookings = [
    { kode: 'WD-001', tanggal: '2025-10-20', customer: 'Sarah Johnson' },
    { kode: 'WD-001', tanggal: '2025-10-25', customer: 'Maria Garcia' },
    { kode: 'WD-002', tanggal: '2025-10-18', customer: 'Emily Chen' },
    { kode: 'WD-002', tanggal: '2025-10-22', customer: 'Lisa Anderson' },
    { kode: 'WD-003', tanggal: '2025-10-19', customer: 'Amanda Brown' },
    { kode: 'WD-003', tanggal: '2025-10-28', customer: 'Jessica Lee' },
    { kode: 'WD-004', tanggal: '2025-10-21', customer: 'Rachel Kim' },
    { kode: 'WD-005', tanggal: '2025-10-24', customer: 'Sophie Martinez' }
  ];

  const marketingStaff = ['Siti Nurhaliza', 'Dewi Lestari', 'Rina Kusuma', 'Maya Sari', 'Fitri Handayani'];
  
  const dressColors = ['Putih', 'Putih Gading', 'Putih Broken White', 'Krem', 'Silver', 'Gold'];
  const traditions = ['Jawa', 'Minangkabau', 'Batak', 'Sunda', 'Bali', 'Modern', 'Tidak Ada'];
  const handbouquetColors = ['Pink', 'Violet', 'White', 'Blue']
  const muaList = ['MUA A', 'MUA B', 'MUA C', 'MUA D'];

  const kainData = [
    { id: 1, nama: 'Brokat Gold', foto: 'brokat-gold.jpg' },
    { id: 2, nama: 'Brokat Silver', foto: 'brokat-silver.jpg' },
    { id: 3, nama: 'Satin Putih', foto: 'satin-white.jpg' },
    { id: 4, nama: 'Organza Krem', foto: 'organza-cream.jpg' },
    { id: 5, nama: 'Silk Putih Gading', foto: 'silk-cream.jpg' },
    { id: 6, nama: 'Tulle Putih', foto: 'tulle-white.jpg' },
    { id: 7, nama: 'Lace Putih', foto: 'lace-white.jpg' },
    { id: 8, nama: 'Batik Premium', foto: 'batik-premium.jpg' }
  ];

  // Route state
  let currentRoute = '/';

  // Availability Checker State
  let selectedKode = '';
  let selectedDate = '';
  let searchQuery = '';
  let showResults = false;
  let isAvailable = false;
  let availabilityList = [];
  let filteredDresses = dresses;
  let showDropdown = false;

  // Fitting Form State
  let formData = {
    namaMarketing: '',
    namaPengantin: '',
    hari: '',
    gedung: '',
    noTelp: '',
    alamat: '',
    adatAkad: '',
    resepsi: '',
    warnaHandbouquet: '',
    pilihanMua: '',
    pengantinWanita: {
      akad: { warnaKodeBusana: '', ukuranSelop: '', adat: '', kain: null, requests: [], fittingNotes: '' },
      resepsi: { warnaKodeBusana: '', ukuranSelop: '', adat: '', kain: null, requests: [], fittingNotes: '' }
    },
    pengantinPria: {
      akad: { warnaKodeBusana: '', ukuranSelop: '', ukuranKepala: '', adat: '', kain: null, requests: [], fittingNotes: '' },
      resepsi: { warnaKodeBusana: '', ukuranSelop: '', ukuranKepala: '', adat: '', kain: null, requests: [], fittingNotes: '' }
    }
  };

  // Modal States
  let showRequestModal = false;
  let showKainModal = false;
  let currentModalContext = null;
  let requestFormData = { items: '', foto: null };
  let kainSearchQuery = '';
  let filteredKain = kainData;

  // Reactive Statements
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

  $: {
    if (kainSearchQuery) {
      filteredKain = kainData.filter(kain =>
        kain.nama.toLowerCase().includes(kainSearchQuery.toLowerCase())
      );
    } else {
      filteredKain = kainData;
    }
  }

  // Router Functions
  function navigate(route) {
    currentRoute = route;
  }

  // Availability Checker Functions
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

  // Fitting Form Modal Functions
  function openRequestModal(section, category) {
    currentModalContext = { section, category };
    requestFormData = { items: '', foto: null };
    showRequestModal = true;
  }

  function saveRequest() {
    if (!requestFormData.items.trim()) {
      alert('Mohon isi item request');
      return;
    }

    if (currentModalContext) {
      const { section, category } = currentModalContext;
      const target = section === 'wanita' 
        ? formData.pengantinWanita[category] 
        : formData.pengantinPria[category];

      target.requests = [...target.requests, { items: requestFormData.items, foto: requestFormData.foto }];
      formData = formData;
      closeRequestModal();
    }
  }

  function closeRequestModal() {
    showRequestModal = false;
    currentModalContext = null;
    requestFormData = { items: '', foto: null };
  }

  function removeRequest(section, category, index) {
    const target = section === 'wanita' 
      ? formData.pengantinWanita[category] 
      : formData.pengantinPria[category];
    target.requests.splice(index, 1);
    formData = formData;
  }

  function openKainModal(section, category) {
    currentModalContext = { section, category };
    kainSearchQuery = '';
    filteredKain = kainData;
    showKainModal = true;
  }

  function selectKain(kain) {
    if (currentModalContext) {
      const { section, category } = currentModalContext;
      const target = section === 'wanita' 
        ? formData.pengantinWanita[category] 
        : formData.pengantinPria[category];

      target.kain = kain;
      formData = formData;
      closeKainModal();
    }
  }

  function closeKainModal() {
    showKainModal = false;
    currentModalContext = null;
    kainSearchQuery = '';
    filteredKain = kainData;
  }

  function removeKain(section, category) {
    const target = section === 'wanita' 
      ? formData.pengantinWanita[category] 
      : formData.pengantinPria[category];
    target.kain = null;
    formData = formData;
  }

  function handleFotoUpload(e) {
    const file = e.target.files[0];
    if (file) {
      requestFormData.foto = file.name;
    }
  }

  function submitForm() {
    console.log('Form submitted:', JSON.stringify(formData, null, 2));
    alert('Form berhasil disimpan. Lihat console untuk data lengkap.');
    resetForm();
  }

  function resetForm() {
    formData = {
      namaMarketing: '',
      namaPengantin: '',
      hari: '',
      gedung: '',
      noTelp: '',
      alamat: '',
      adatAkad: '',
      resepsi: '',
      warnaHandbouquet: '',
      pilihanMua: '',
      pengantinWanita: {
        akad: { warnaKodeBusana: '', ukuranSelop: '', adat: '', kain: null, requests: [], fittingNotes: '' },
        resepsi: { warnaKodeBusana: '', ukuranSelop: '', adat: '', kain: null, requests: [], fittingNotes: '' }
      },
      pengantinPria: {
        akad: { warnaKodeBusana: '', ukuranSelop: '', ukuranKepala: '', adat: '', kain: null, requests: [], fittingNotes: '' },
        resepsi: { warnaKodeBusana: '', ukuranSelop: '', ukuranKepala: '', adat: '', kain: null, requests: [], fittingNotes: '' }
      }
    };
  }
</script>

<div class="flex min-h-screen bg-gray-50">
  <!-- Sidebar -->
  <aside class="w-64 bg-white shadow-lg">
    <div class="p-6 border-b border-gray-200">
      <h1 class="text-2xl font-serif text-gray-800">Wedding Rental</h1>
      <p class="text-sm text-gray-500 mt-1">Management System</p>
    </div>

    <nav class="p-4 space-y-2">
      <button
        on:click={() => navigate('/')}
        class="w-full text-left block px-4 py-3 text-gray-700 {currentRoute === '/' ? 'bg-rose-50 border-l-4 border-rose-400' : 'hover:bg-gray-50'} font-medium transition duration-200"
      >
        Home
      </button>
      <button
        on:click={() => navigate('/availability')}
        class="w-full text-left block px-4 py-3 text-gray-700 {currentRoute === '/availability' ? 'bg-rose-50 border-l-4 border-rose-400' : 'hover:bg-gray-50'} font-medium transition duration-200"
      >
        Availability Checker
      </button>
      <button
        on:click={() => navigate('/fitting')}
        class="w-full text-left block px-4 py-3 text-gray-700 {currentRoute === '/fitting' ? 'bg-rose-50 border-l-4 border-rose-400' : 'hover:bg-gray-50'} font-medium transition duration-200"
      >
        Fitting Form
      </button>
    </nav>
  </aside>

  <!-- Main Content -->
  <main class="flex-1 p-8">
    <div class="max-w-6xl mx-auto">
      <!-- Home Page -->
      {#if currentRoute === '/'}
        <div class="bg-white rounded-lg shadow-md p-8 border-t-4 border-rose-300">
          <h2 class="text-4xl font-serif text-gray-800 mb-4">Selamat Datang</h2>
          <p class="text-gray-600 mb-8 text-lg">Wedding Rental Management System</p>

          <div class="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12">
            <div class="bg-gray-50 rounded-lg p-6 border-l-4 border-rose-400">
              <h3 class="text-2xl font-semibold text-gray-800 mb-4">Tentang Aplikasi</h3>
              <p class="text-gray-700 leading-relaxed mb-4">
                Sistem manajemen penyewaan gaun pernikahan yang dirancang untuk membantu bisnis Anda mengelola ketersediaan gaun, jadwal fitting, dan detail pelanggan dengan mudah.
              </p>
            </div>

            <div class="bg-gray-50 rounded-lg p-6 border-l-4 border-rose-400">
              <h3 class="text-2xl font-semibold text-gray-800 mb-4">Fitur Utama</h3>
              <ul class="text-gray-700 space-y-2">
                <li class="flex items-start">
                  <span class="text-rose-400 font-bold mr-2">1.</span>
                  <span>Cek ketersediaan gaun untuk tanggal tertentu</span>
                </li>
                <li class="flex items-start">
                  <span class="text-rose-400 font-bold mr-2">2.</span>
                  <span>Manajemen formulir fitting lengkap</span>
                </li>
                <li class="flex items-start">
                  <span class="text-rose-400 font-bold mr-2">3.</span>
                  <span>Pencatatan detail busana pengantin</span>
                </li>
                <li class="flex items-start">
                  <span class="text-rose-400 font-bold mr-2">4.</span>
                  <span>Pemilihan kain dan material</span>
                </li>
                <li class="flex items-start">
                  <span class="text-rose-400 font-bold mr-2">5.</span>
                  <span>Dokumentasi request dan fitting notes</span>
                </li>
              </ul>
            </div>
          </div>

          <div class="mt-12 bg-rose-50 rounded-lg p-8 border border-rose-200">
            <h3 class="text-2xl font-semibold text-gray-800 mb-4">Navigasi</h3>
            <p class="text-gray-700 mb-6">Gunakan menu samping untuk mengakses fitur berikut:</p>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div class="bg-white rounded-lg p-4 border-l-4 border-rose-400">
                <h4 class="font-semibold text-gray-800 mb-2">Availability Checker</h4>
                <p class="text-gray-600 text-sm">Periksa ketersediaan gaun untuk tanggal yang diinginkan dan lihat jadwal pemesanan.</p>
              </div>
              <div class="bg-white rounded-lg p-4 border-l-4 border-rose-400">
                <h4 class="font-semibold text-gray-800 mb-2">Fitting Form</h4>
                <p class="text-gray-600 text-sm">Isi formulir detail fitting untuk pasangan pengantin termasuk ukuran, pilihan kain, dan request khusus.</p>
              </div>
            </div>
          </div>
        </div>

      <!-- Availability Checker Page -->
      {:else if currentRoute === '/availability'}
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
              {:else}
                <div class="bg-red-50 border border-red-200 rounded-lg p-6 mb-6">
                  <h3 class="text-lg font-semibold text-red-800 mb-2">Tidak Tersedia</h3>
                  <p class="text-red-700">Produk tidak tersedia untuk tanggal {formatDate(selectedDate)}</p>
                </div>

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
              {/if}
            </div>
          {/if}
        </div>

      <!-- Fitting Form Page -->
      {:else if currentRoute === '/fitting'}
        <div class="bg-white rounded-lg shadow-md p-8 border-t-4 border-rose-300">
          <h2 class="text-3xl font-serif text-gray-800 mb-2">Fitting Form</h2>
          <p class="text-gray-600 mb-8">Checklist fitting gaun pernikahan</p>

          <form on:submit|preventDefault={submitForm} class="space-y-6">
            <!-- Marketing and Paket Section -->
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">Nama Marketing Griya Aristy</label>
                <select bind:value={formData.namaMarketing} class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-300 focus:border-transparent outline-none">
                  <option value="">Pilih Marketing</option>
                  {#each marketingStaff as staff}
                    <option value={staff}>{staff}</option>
                  {/each}
                </select>
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">Paket Rias</label>
                <input bind:value={formData.pilihanMua} type="text" class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-300 focus:border-transparent outline-none" />
              </div>
            </div>

            <!-- Nama Pengantin -->
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Nama Pengantin</label>
              <input bind:value={formData.namaPengantin} type="text" class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-300 focus:border-transparent outline-none" />
            </div>

            <!-- Hari/Tanggal/Tahun -->
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Hari / Tanggal / Tahun</label>
              <input bind:value={formData.hari} type="text" class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-300 focus:border-transparent outline-none" />
            </div>

            <!-- Gedung -->
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Gedung</label>
              <input bind:value={formData.gedung} type="text" class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-300 focus:border-transparent outline-none" />
            </div>

            <!-- No Telp -->
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">No. Telp</label>
              <input bind:value={formData.noTelp} type="tel" class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-300 focus:border-transparent outline-none" />
            </div>

            <!-- Alamat -->
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Alamat</label>
              <input bind:value={formData.alamat} type="text" class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-300 focus:border-transparent outline-none" />
            </div>

            <!-- Adat Section -->
            <div class="border border-gray-300 rounded-lg p-6">
              <h4 class="font-semibold text-gray-800 mb-4">Adat</h4>
              <div class="space-y-4">
                <!-- Akad Row -->
                <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div class="flex items-center">
                    <span class="text-sm font-medium text-gray-700">Akad</span>
                  </div>
                  <div>
                    <select bind:value={formData.adatAkad} class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-300 focus:border-transparent outline-none text-sm">
                      <option value="">Pilih Adat</option>
                      {#each traditions as tradition}
                        <option value={tradition}>{tradition}</option>
                      {/each}
                    </select>
                  </div>
                  <div>
                    <input type="time" class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-300 focus:border-transparent outline-none text-sm" placeholder="Pukul" />
                  </div>
                </div>

                <!-- Resepsi Row -->
                <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div class="flex items-center">
                    <span class="text-sm font-medium text-gray-700">Resepsi</span>
                  </div>
                  <div>
                    <select bind:value={formData.resepsi} class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-300 focus:border-transparent outline-none text-sm">
                      <option value="">Pilih Adat</option>
                      {#each traditions as tradition}
                        <option value={tradition}>{tradition}</option>
                      {/each}
                    </select>
                  </div>
                  <div>
                    <input type="time" class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-300 focus:border-transparent outline-none text-sm" placeholder="Pukul" />
                  </div>
                </div>
              </div>
            </div>

            <!-- Busana Pengantin Section -->
            <div class="border border-gray-300 rounded-lg p-6 mt-8">
              <h3 class="text-xl font-semibold text-gray-800 mb-4 text-center bg-gray-100 py-2 -mx-6 -mt-6 mb-6 rounded-t-lg">BUSANA PENGANTIN</h3>

              <!-- Pengantin Wanita -->
              <div class="mb-8">
                <h4 class="font-semibold text-gray-800 mb-6 bg-gray-50 px-4 py-2 -mx-6">PENGANTIN WANITA</h4>

                <div class="grid grid-cols-3 gap-4 mb-6 pb-4 border-b border-gray-200">
                  <div></div>
                  <div class="text-center font-semibold text-gray-800">AKAD</div>
                  <div class="text-center font-semibold text-gray-800">RESEPSI</div>
                </div>

                <div class="space-y-4">
                  <!-- Warna & Kode Busana -->
                  <div class="grid grid-cols-3 gap-4">
                    <div class="text-sm font-medium text-gray-700">WARNA & KODE</div>
                    <div>
                      <select bind:value={formData.pengantinWanita.akad.warnaKodeBusana} class="w-full px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-rose-300 outline-none text-sm">
                        <option value="">Pilih Warna</option>
                        {#each dressColors as color}
                          <option value={color}>{color}</option>
                        {/each}
                      </select>
                    </div>
                    <div>
                      <select bind:value={formData.pengantinWanita.resepsi.warnaKodeBusana} class="w-full px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-rose-300 outline-none text-sm">
                        <option value="">Pilih Warna</option>
                        {#each dressColors as color}
                          <option value={color}>{color}</option>
                        {/each}
                      </select>
                    </div>
                  </div>

                  <!-- Ukuran Selop -->
                  <div class="grid grid-cols-3 gap-4">
                    <div class="text-sm font-medium text-gray-700">UKURAN SELOP</div>
                    <div><input bind:value={formData.pengantinWanita.akad.ukuranSelop} type="text" class="w-full px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-rose-300 outline-none text-sm" /></div>
                    <div><input bind:value={formData.pengantinWanita.resepsi.ukuranSelop} type="text" class="w-full px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-rose-300 outline-none text-sm" /></div>
                  </div>

                  <!-- Adat -->
                  <div class="grid grid-cols-3 gap-4">
                    <div class="text-sm font-medium text-gray-700">ADAT</div>
                    <div>
                      <select bind:value={formData.pengantinWanita.akad.adat} class="w-full px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-rose-300 outline-none text-sm">
                        <option value="">Pilih Adat</option>
                        {#each traditions as tradition}
                          <option value={tradition}>{tradition}</option>
                        {/each}
                      </select>
                    </div>
                    <div>
                      <select bind:value={formData.pengantinWanita.resepsi.adat} class="w-full px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-rose-300 outline-none text-sm">
                        <option value="">Pilih Adat</option>
                        {#each traditions as tradition}
                          <option value={tradition}>{tradition}</option>
                        {/each}
                      </select>
                    </div>
                  </div>

                  <!-- Kain -->
                  <div class="grid grid-cols-3 gap-4">
                    <div class="text-sm font-medium text-gray-700">KAIN</div>
                    <div>
                      <div class="flex items-center justify-between mb-2">
                        <span class="text-sm {formData.pengantinWanita.akad.kain ? 'text-gray-800 font-medium' : 'text-gray-500'}">{formData.pengantinWanita.akad.kain?.nama || 'Belum dipilih'}</span>
                        <div class="flex gap-2">
                          <button type="button" on:click={() => openKainModal('wanita', 'akad')} class="px-2 py-1 bg-rose-400 hover:bg-rose-500 text-white text-xs rounded transition duration-200">
                            Pilih
                          </button>
                          {#if formData.pengantinWanita.akad.kain}
                            <button type="button" on:click={() => removeKain('wanita', 'akad')} class="px-2 py-1 bg-gray-300 hover:bg-gray-400 text-gray-700 text-xs rounded transition duration-200">
                              Hapus
                            </button>
                          {/if}
                        </div>
                      </div>
                    </div>
                    <div>
                      <div class="flex items-center justify-between mb-2">
                        <span class="text-sm {formData.pengantinWanita.resepsi.kain ? 'text-gray-800 font-medium' : 'text-gray-500'}">{formData.pengantinWanita.resepsi.kain?.nama || 'Belum dipilih'}</span>
                        <div class="flex gap-2">
                          <button type="button" on:click={() => openKainModal('wanita', 'resepsi')} class="px-2 py-1 bg-rose-400 hover:bg-rose-500 text-white text-xs rounded transition duration-200">
                            Pilih
                          </button>
                          {#if formData.pengantinWanita.resepsi.kain}
                            <button type="button" on:click={() => removeKain('wanita', 'resepsi')} class="px-2 py-1 bg-gray-300 hover:bg-gray-400 text-gray-700 text-xs rounded transition duration-200">
                              Hapus
                            </button>
                          {/if}
                        </div>
                      </div>
                    </div>
                  </div>

                  <!-- Request -->
                  <div class="grid grid-cols-3 gap-4">
                    <div class="text-sm font-medium text-gray-700">REQUEST</div>
                    <div>
                      <button type="button" on:click={() => openRequestModal('wanita', 'akad')} class="w-full px-4 py-2 bg-rose-400 hover:bg-rose-500 text-white text-sm rounded transition duration-200 mb-2">
                        Tambah Request
                      </button>
                      {#if formData.pengantinWanita.akad.requests.length > 0}
                        <div class="space-y-2">
                          {#each formData.pengantinWanita.akad.requests as request, idx}
                            <div class="flex items-center justify-between bg-gray-50 px-3 py-2 rounded text-sm">
                              <span class="text-gray-700">{request.items}</span>
                              <button type="button" on:click={() => removeRequest('wanita', 'akad', idx)} class="text-red-600 hover:text-red-800 font-medium text-xs">
                                Batal
                              </button>
                            </div>
                          {/each}
                        </div>
                      {/if}
                    </div>
                    <div>
                      <button type="button" on:click={() => openRequestModal('wanita', 'resepsi')} class="w-full px-4 py-2 bg-rose-400 hover:bg-rose-500 text-white text-sm rounded transition duration-200 mb-2">
                        Tambah Request
                      </button>
                      {#if formData.pengantinWanita.resepsi.requests.length > 0}
                        <div class="space-y-2">
                          {#each formData.pengantinWanita.resepsi.requests as request, idx}
                            <div class="flex items-center justify-between bg-gray-50 px-3 py-2 rounded text-sm">
                              <span class="text-gray-700">{request.items}</span>
                              <button type="button" on:click={() => removeRequest('wanita', 'resepsi', idx)} class="text-red-600 hover:text-red-800 font-medium text-xs">
                                Batal
                              </button>
                            </div>
                          {/each}
                        </div>
                      {/if}
                    </div>
                  </div>

                  <!-- Fitting -->
                  <div class="grid grid-cols-3 gap-4">
                    <div class="text-sm font-medium text-gray-700">FITTING</div>
                    <div><textarea bind:value={formData.pengantinWanita.akad.fittingNotes} placeholder="Masukkan catatan fitting..." class="w-full px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-rose-300 outline-none text-sm min-h-20"></textarea></div>
                    <div><textarea bind:value={formData.pengantinWanita.resepsi.fittingNotes} placeholder="Masukkan catatan fitting..." class="w-full px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-rose-300 outline-none text-sm min-h-20"></textarea></div>
                  </div>
                </div>
              </div>

              <!-- Pengantin Pria -->
              <div>
                <h4 class="font-semibold text-gray-800 mb-6 bg-gray-50 px-4 py-2 -mx-6">PENGANTIN PRIA</h4>

                <div class="grid grid-cols-3 gap-4 mb-6 pb-4 border-b border-gray-200">
                  <div></div>
                  <div class="text-center font-semibold text-gray-800">AKAD</div>
                  <div class="text-center font-semibold text-gray-800">RESEPSI</div>
                </div>

                <div class="space-y-4">
                  <!-- Warna & Kode Busana -->
                  <div class="grid grid-cols-3 gap-4">
                    <div class="text-sm font-medium text-gray-700">WARNA & KODE</div>
                    <div>
                      <select bind:value={formData.pengantinPria.akad.warnaKodeBusana} class="w-full px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-rose-300 outline-none text-sm">
                        <option value="">Pilih Warna</option>
                        {#each dressColors as color}
                          <option value={color}>{color}</option>
                        {/each}
                      </select>
                    </div>
                    <div>
                      <select bind:value={formData.pengantinPria.resepsi.warnaKodeBusana} class="w-full px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-rose-300 outline-none text-sm">
                        <option value="">Pilih Warna</option>
                        {#each dressColors as color}
                          <option value={color}>{color}</option>
                        {/each}
                      </select>
                    </div>
                  </div>

                  <!-- Ukuran Selop -->
                  <div class="grid grid-cols-3 gap-4">
                    <div class="text-sm font-medium text-gray-700">UKURAN SELOP</div>
                    <div><input bind:value={formData.pengantinPria.akad.ukuranSelop} type="text" class="w-full px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-rose-300 outline-none text-sm" /></div>
                    <div><input bind:value={formData.pengantinPria.resepsi.ukuranSelop} type="text" class="w-full px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-rose-300 outline-none text-sm" /></div>
                  </div>

                  <!-- Ukuran Kepala -->
                  <div class="grid grid-cols-3 gap-4">
                    <div class="text-sm font-medium text-gray-700">UKURAN KEPALA</div>
                    <div><input bind:value={formData.pengantinPria.akad.ukuranKepala} type="text" class="w-full px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-rose-300 outline-none text-sm" /></div>
                    <div><input bind:value={formData.pengantinPria.resepsi.ukuranKepala} type="text" class="w-full px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-rose-300 outline-none text-sm" /></div>
                  </div>

                  <!-- Adat -->
                  <div class="grid grid-cols-3 gap-4">
                    <div class="text-sm font-medium text-gray-700">ADAT</div>
                    <div>
                      <select bind:value={formData.pengantinPria.akad.adat} class="w-full px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-rose-300 outline-none text-sm">
                        <option value="">Pilih Adat</option>
                        {#each traditions as tradition}
                          <option value={tradition}>{tradition}</option>
                        {/each}
                      </select>
                    </div>
                    <div>
                      <select bind:value={formData.pengantinPria.resepsi.adat} class="w-full px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-rose-300 outline-none text-sm">
                        <option value="">Pilih Adat</option>
                        {#each traditions as tradition}
                          <option value={tradition}>{tradition}</option>
                        {/each}
                      </select>
                    </div>
                  </div>

                  <!-- Kain -->
                  <div class="grid grid-cols-3 gap-4">
                    <div class="text-sm font-medium text-gray-700">KAIN</div>
                    <div>
                      <div class="flex items-center justify-between mb-2">
                        <span class="text-sm {formData.pengantinPria.akad.kain ? 'text-gray-800 font-medium' : 'text-gray-500'}">{formData.pengantinPria.akad.kain?.nama || 'Belum dipilih'}</span>
                        <div class="flex gap-2">
                          <button type="button" on:click={() => openKainModal('pria', 'akad')} class="px-2 py-1 bg-rose-400 hover:bg-rose-500 text-white text-xs rounded transition duration-200">
                            Pilih
                          </button>
                          {#if formData.pengantinPria.akad.kain}
                            <button type="button" on:click={() => removeKain('pria', 'akad')} class="px-2 py-1 bg-gray-300 hover:bg-gray-400 text-gray-700 text-xs rounded transition duration-200">
                              Hapus
                            </button>
                          {/if}
                        </div>
                      </div>
                    </div>
                    <div>
                      <div class="flex items-center justify-between mb-2">
                        <span class="text-sm {formData.pengantinPria.resepsi.kain ? 'text-gray-800 font-medium' : 'text-gray-500'}">{formData.pengantinPria.resepsi.kain?.nama || 'Belum dipilih'}</span>
                        <div class="flex gap-2">
                          <button type="button" on:click={() => openKainModal('pria', 'resepsi')} class="px-2 py-1 bg-rose-400 hover:bg-rose-500 text-white text-xs rounded transition duration-200">
                            Pilih
                          </button>
                          {#if formData.pengantinPria.resepsi.kain}
                            <button type="button" on:click={() => removeKain('pria', 'resepsi')} class="px-2 py-1 bg-gray-300 hover:bg-gray-400 text-gray-700 text-xs rounded transition duration-200">
                              Hapus
                            </button>
                          {/if}
                        </div>
                      </div>
                    </div>
                  </div>

                  <!-- Request -->
                  <div class="grid grid-cols-3 gap-4">
                    <div class="text-sm font-medium text-gray-700">REQUEST</div>
                    <div>
                      <button type="button" on:click={() => openRequestModal('pria', 'akad')} class="w-full px-4 py-2 bg-rose-400 hover:bg-rose-500 text-white text-sm rounded transition duration-200 mb-2">
                        Tambah Request
                      </button>
                      {#if formData.pengantinPria.akad.requests.length > 0}
                        <div class="space-y-2">
                          {#each formData.pengantinPria.akad.requests as request, idx}
                            <div class="flex items-center justify-between bg-gray-50 px-3 py-2 rounded text-sm">
                              <span class="text-gray-700">{request.items}</span>
                              <button type="button" on:click={() => removeRequest('pria', 'akad', idx)} class="text-red-600 hover:text-red-800 font-medium text-xs">
                                Batal
                              </button>
                            </div>
                          {/each}
                        </div>
                      {/if}
                    </div>
                    <div>
                      <button type="button" on:click={() => openRequestModal('pria', 'resepsi')} class="w-full px-4 py-2 bg-rose-400 hover:bg-rose-500 text-white text-sm rounded transition duration-200 mb-2">
                        Tambah Request
                      </button>
                      {#if formData.pengantinPria.resepsi.requests.length > 0}
                        <div class="space-y-2">
                          {#each formData.pengantinPria.resepsi.requests as request, idx}
                            <div class="flex items-center justify-between bg-gray-50 px-3 py-2 rounded text-sm">
                              <span class="text-gray-700">{request.items}</span>
                              <button type="button" on:click={() => removeRequest('pria', 'resepsi', idx)} class="text-red-600 hover:text-red-800 font-medium text-xs">
                                Batal
                              </button>
                            </div>
                          {/each}
                        </div>
                      {/if}
                    </div>
                  </div>

                  <!-- Fitting -->
                  <div class="grid grid-cols-3 gap-4">
                    <div class="text-sm font-medium text-gray-700">FITTING</div>
                    <div><textarea bind:value={formData.pengantinPria.akad.fittingNotes} placeholder="Masukkan catatan fitting..." class="w-full px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-rose-300 outline-none text-sm min-h-20"></textarea></div>
                    <div><textarea bind:value={formData.pengantinPria.resepsi.fittingNotes} placeholder="Masukkan catatan fitting..." class="w-full px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-rose-300 outline-none text-sm min-h-20"></textarea></div>
                  </div>
                </div>
              </div>
            </div>

            <div class="border border-gray-300 rounded-lg p-6 mt-8">
                <div class="text-sm font-medium text-gray-700">Keterangan</div>
                <div><textarea bind:value={formData.pengantinPria.akad.fittingNotes} placeholder="Masukkan catatan fitting..." class="w-full px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-rose-300 outline-none text-sm min-h-20 mt-4"></textarea></div>
            </div>

            <!-- Bottom Section -->
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
              <div>
                <div>
                    <label for="bgColor" class="block text-sm font-medium text-gray-700 mb-2">Warna Handbouquet</label>
                    <select name="bqColor" bind:value={formData.warnaHandbouquet} class="w-full px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-rose-300 outline-none text-sm">
                    <option value="">Pilih Warna</option>
                    {#each handbouquetColors as color}
                      <option value={color}>{color}</option>
                      {/each}
                    </select>
                </div>
                <div class="mt-2">
                    <label for="bgColor" class="block text-sm font-medium text-gray-700 mb-2">Pilihan MUA</label>
                    <select name="bqColor" bind:value={formData.warnaHandbouquet} class="w-full px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-rose-300 outline-none text-sm">
                    <option value="">Pilih MUA</option>
                    {#each muaList as mua}
                      <option value={mua}>{mua}</option>
                      {/each}
                    </select>
                </div>
              </div>
            </div>

            <!-- Form Actions -->
            <div class="flex gap-4 mt-8">
              <button type="submit" class="flex-1 bg-rose-400 hover:bg-rose-500 text-white font-medium py-3 px-6 rounded-lg transition duration-200">
                Simpan Form
              </button>
              <button type="button" on:click={resetForm} class="px-6 py-3 border border-gray-300 text-gray-700 font-medium rounded-lg hover:bg-gray-50 transition duration-200">
                Reset
              </button>
            </div>
          </form>
        </div>
      {/if}
    </div>
  </main>
</div>

<!-- Request Modal -->
{#if showRequestModal}
  <div class="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
    <div class="bg-white rounded-lg shadow-lg p-6 w-full max-w-md">
      <h3 class="text-xl font-semibold text-gray-800 mb-4">Tambah Request</h3>

      <div class="space-y-4">
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2">Items</label>
          <input bind:value={requestFormData.items} type="text" placeholder="Contoh: Tidak terlalu ketat" class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-300 focus:border-transparent outline-none" />
        </div>

        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2">Foto (Opsional)</label>
          <input on:change={handleFotoUpload} type="file" accept="image/*" class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-300 focus:border-transparent outline-none" />
          {#if requestFormData.foto}
            <p class="text-sm text-gray-600 mt-2">File: {requestFormData.foto}</p>
          {/if}
        </div>
      </div>

      <div class="flex gap-3 mt-6">
        <button type="button" on:click={saveRequest} class="flex-1 bg-rose-400 hover:bg-rose-500 text-white font-medium py-2 px-4 rounded-lg transition duration-200">
          Simpan
        </button>
        <button type="button" on:click={closeRequestModal} class="flex-1 bg-gray-300 hover:bg-gray-400 text-gray-700 font-medium py-2 px-4 rounded-lg transition duration-200">
          Batal
        </button>
      </div>
    </div>
  </div>
{/if}

<!-- Kain Modal -->
{#if showKainModal}
  <div class="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
    <div class="bg-white rounded-lg shadow-lg p-6 w-full max-w-2xl max-h-96 overflow-y-auto">
      <h3 class="text-xl font-semibold text-gray-800 mb-4">Pilih Kain</h3>

      <div class="mb-4">
        <input bind:value={kainSearchQuery} type="text" placeholder="Cari kain..." class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-300 focus:border-transparent outline-none" />
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
                  <button type="button" on:click={() => selectKain(kain)} class="px-4 py-2 bg-rose-400 hover:bg-rose-500 text-white text-sm rounded transition duration-200">
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
        <button type="button" on:click={closeKainModal} class="w-full bg-gray-300 hover:bg-gray-400 text-gray-700 font-medium py-2 px-4 rounded-lg transition duration-200">
          Batal
        </button>
      </div>
    </div>
  </div>
{/if}

<style>
  :global(body) {
    margin: 0;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
  }
</style>