<script>
  import { goto } from '$app/navigation';
  import { muaList } from '$lib/data/mockData.js';
  
  // Form state
  let vendorName = '';
  let paket = '';
  let termsConditions = '';
  
  // Pengantin - Akad
  let pengantinAkadRias = false;
  let pengantinAkadRiasPagi = '';
  let pengantinAkadRiasSore = '';
  let pengantinAkadBusana = false;
  let pengantinAkadBusanaType = '';
  
  // Pengantin - Resepsi
  let pengantinResepsiRias = false;
  let pengantinResepsiRiasPagi = '';
  let pengantinResepsiRiasSore = '';
  let pengantinResepsiBusana = false;
  let pengantinResepsiBusanaType = '';

  
  // Pilihan MUA & Aksesoris
  let pilihanMUA = '';
  let aksesoris = false;
  
  // Orang Tua
  let orangTuaRiasIbuPengantin = 0;
  let orangTuaKainIbuPengantin = 0;
  let orangTuaBeskapBapakPengantin = 0;
  
  // Buku Tamu
  let bukuTamuRias = 0;
  let bukuTamuBusana = 0;
  
  // Among Tamu
  let amongTamuRias = 0;
  let amongTamuKainPagarAyu = 0;
  let amongTamuBusanaPagarBagus = 0;
  
  function goBack() {
    goto('/vendor');
  }
  
  function handleDownload() {
    const formData = {
      vendorName,
      paket,
      pengantin: {
        akad: {
          rias: pengantinAkadRias,
          riasPagi: pengantinAkadRiasPagi,
          riasSore: pengantinAkadRiasSore,
          busana: pengantinAkadBusana,
          busanaType: pengantinAkadBusanaType
        },
        resepsi: {
          rias: pengantinResepsiRias,
          riasPagi: pengantinResepsiRiasPagi,
          riasSore: pengantinResepsiRiasSore,
          busana: pengantinResepsiBusana,
          busanaType: pengantinResepsiBusanaType
        }
      },
      pilihanMUA,
      aksesoris,
      orangTua: {
        riasIbuPengantin: orangTuaRiasIbuPengantin,
        kainIbuPengantin: orangTuaKainIbuPengantin,
        beskapBapakPengantin: orangTuaBeskapBapakPengantin
      },
      bukuTamu: {
        rias: bukuTamuRias,
        busana: bukuTamuBusana
      },
      amongTamu: {
        rias: amongTamuRias,
        kainPagarAyu: amongTamuKainPagarAyu,
        busanaPagarBagus: amongTamuBusanaPagarBagus
      },
      termsConditions
    };
    
    console.log('Form Data:', formData);
    alert('Data vendor berhasil diunduh!\n\nCek console untuk melihat data lengkap.');
  }
  
  function handleSubmit(event) {
    event.preventDefault();
    handleDownload();
  }
</script>

<div class="bg-white rounded-lg shadow-md p-8 border-t-4 border-rose-300">
  <!-- Header with Back Button -->
  <div class="flex items-center justify-between mb-6">
    <div class="flex items-center gap-4">
      <button
        on:click={goBack}
        class="p-2 hover:bg-gray-100 rounded-lg transition duration-200"
        title="Kembali ke daftar"
      >
        <svg class="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"></path>
        </svg>
      </button>
      <div>
        <h2 class="text-3xl font-serif text-gray-800">Vendor Creation Form</h2>
        <p class="text-gray-600 mt-1">Buat paket vendor untuk acara pernikahan</p>
      </div>
    </div>
  </div>

  <form on:submit={handleSubmit} class="space-y-6">
    <!-- Vendor Name -->
    <!-- <div>
      <label class="block text-sm font-medium text-gray-700 mb-2">Nama Vendor</label>
      <input
        type="text"
        bind:value={vendorName}
        required
        placeholder="Masukkan nama vendor..."
        class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-300 focus:border-transparent outline-none"
      />
    </div> -->

    <!-- Paket -->
    <div>
      <label class="block text-sm font-medium text-gray-700 mb-2">Paket</label>
      <input
        type="text"
        bind:value={paket}
        required
        placeholder="Contoh: Paket Premium, Paket Silver, dll"
        class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-300 focus:border-transparent outline-none"
      />
    </div>

    <!-- Pengantin Section -->
    <div class="border border-gray-300 rounded-lg p-6">
      <h3 class="text-xl font-semibold text-gray-800 mb-6 text-center bg-green-100 py-2 -mx-6 -mt-6 rounded-t-lg">Pengantin</h3>
      
      <!-- Akad -->
      <div class="mb-6">
        <h4 class="font-semibold text-gray-800 mb-4 pb-2 border-b-2 border-gray-200">Akad</h4>
        
        <div class="space-y-4 ml-4">
          <!-- Rias Checkbox -->
          <div>
            <label class="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                bind:checked={pengantinAkadRias}
                class="w-4 h-4 text-rose-400 border-gray-300 rounded focus:ring-rose-300"
              />
              <span class="text-sm font-medium text-gray-700">Rias</span>
            </label>
            
            {#if pengantinAkadRias}
              <div class="ml-6 mt-2 space-y-2 p-3 bg-gray-50 rounded">
                <p class="text-sm text-gray-700 font-medium">Start Make Up</p>
                <div class="flex items-center gap-2">
                  <label class="text-sm text-gray-600 w-12">Pagi:</label>
                  <input
                    type="time"
                    bind:value={pengantinAkadRiasPagi}
                    class="px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-rose-300 outline-none text-sm"
                  />
                </div>
                <div class="flex items-center gap-2">
                  <label class="text-sm text-gray-600 w-12">Sore:</label>
                  <input
                    type="time"
                    bind:value={pengantinAkadRiasSore}
                    class="px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-rose-300 outline-none text-sm"
                  />
                </div>
              </div>
            {/if}
          </div>
          
          <!-- Busana Checkbox -->
          <div>
            <label class="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                bind:checked={pengantinAkadBusana}
                class="w-4 h-4 text-rose-400 border-gray-300 rounded focus:ring-rose-300"
              />
              <span class="text-sm font-medium text-gray-700">Busana</span>
            </label>
            
            {#if pengantinAkadBusana}
              <div class="ml-6 mt-2 p-3 bg-gray-50 rounded">
                <select
                  bind:value={pengantinAkadBusanaType}
                  class="w-full px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-rose-300 outline-none text-sm"
                >
                  <option value="">Pilih Tipe Busana</option>
                  <option value="Nation">National Only</option>
                  <option value="All Adat">All Adat</option>
                </select>
              </div>
            {/if}
          </div>
        </div>
      </div>
      
      <!-- Resepsi -->
      <div>
        <h4 class="font-semibold text-gray-800 mb-4 pb-2 border-b-2 border-gray-200">Resepsi</h4>
        
        <div class="space-y-4 ml-4">
          <!-- Rias Checkbox -->
          <div>
            <label class="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                bind:checked={pengantinResepsiRias}
                class="w-4 h-4 text-rose-400 border-gray-300 rounded focus:ring-rose-300"
              />
              <span class="text-sm font-medium text-gray-700">Retouch Make up</span>
            </label>
            
            {#if pengantinResepsiRias}
              <div class="ml-6 mt-2 space-y-2 p-3 bg-gray-50 rounded">
                <p class="text-sm text-gray-700 font-medium">Start Make Up</p>
                <div class="flex items-center gap-2">
                  <label class="text-sm text-gray-600 w-12">Pagi:</label>
                  <input
                    type="time"
                    bind:value={pengantinResepsiRiasPagi}
                    class="px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-rose-300 outline-none text-sm"
                  />
                </div>
                <div class="flex items-center gap-2">
                  <label class="text-sm text-gray-600 w-12">Sore:</label>
                  <input
                    type="time"
                    bind:value={pengantinResepsiRiasSore}
                    class="px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-rose-300 outline-none text-sm"
                  />
                </div>
              </div>
            {/if}
          </div>
          
          <!-- Busana Checkbox -->
          <div>
            <label class="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                bind:checked={pengantinResepsiBusana}
                class="w-4 h-4 text-rose-400 border-gray-300 rounded focus:ring-rose-300"
              />
              <span class="text-sm font-medium text-gray-700">Busana</span>
            </label>
            
            {#if pengantinResepsiBusana}
              <div class="ml-6 mt-2 p-3 bg-gray-50 rounded">
                <select
                  bind:value={pengantinResepsiBusanaType}
                  class="w-full px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-rose-300 outline-none text-sm"
                >
                  <option value="">Pilih Tipe Busana</option>
                  <option value="Nation">National Only</option>
                  <option value="All Adat">All Adat</option>
                </select>
              </div>
            {/if}
          </div>
        </div>
      </div>
    </div>

    <!-- Pilihan MUA & Aksesoris Section -->
    <div class="border border-gray-300 rounded-lg p-6">
      <h3 class="text-xl font-semibold text-gray-800 mb-6 text-center bg-pink-100 py-2 -mx-6 -mt-6 rounded-t-lg">Pilihan MUA & Aksesoris</h3>
      
      <div class="space-y-4">
        <div class="flex items-center gap-3">
            <label class="text-sm font-medium text-gray-700 w-48">Aksesoris (Siger, Paes, & Sumatra):</label>
            <input
              type="checkbox"
              bind:checked={aksesoris}
              min="0"
              class="px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-rose-300 outline-none text-sm"
            />
          </div>
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2">Pilihan MUA</label>
          <select
            bind:value={pilihanMUA}
            class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-300 outline-none text-sm"
          >
            <option value="">Pilih MUA</option>
            {#each muaList as mua}
              <option value={mua}>{mua}</option>
            {/each}
          </select>
        </div>
        
      </div>
    </div>

    <!-- Orang Tua Section -->
    <div class="border border-gray-300 rounded-lg p-6">
      <h3 class="text-xl font-semibold text-gray-800 mb-6 text-center bg-yellow-100 py-2 -mx-6 -mt-6 rounded-t-lg">Orang Tua</h3>
      
      <div class="space-y-4">
        <div class="flex items-center gap-3">
          <label class="text-sm font-medium text-gray-700 w-64">Rias Ibu Pengantin:</label>
          <input
            type="number"
            bind:value={orangTuaRiasIbuPengantin}
            min="0"
            class="w-24 px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-rose-300 outline-none text-sm"
          />
        </div>
        
        <div class="flex items-center gap-3">
          <label class="text-sm font-medium text-gray-700 w-64">Kain Ibu Pengantin:</label>
          <input
            type="number"
            bind:value={orangTuaKainIbuPengantin}
            min="0"
            class="w-24 px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-rose-300 outline-none text-sm"
          />
        </div>
        
        <div class="flex items-center gap-3">
          <label class="text-sm font-medium text-gray-700 w-64">Beskap Bapak Pengantin:</label>
          <input
            type="number"
            bind:value={orangTuaBeskapBapakPengantin}
            min="0"
            class="w-24 px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-rose-300 outline-none text-sm"
          />
        </div>
      </div>
    </div>

    <!-- Buku Tamu Section -->
    <div class="border border-gray-300 rounded-lg p-6">
      <h3 class="text-xl font-semibold text-gray-800 mb-6 text-center bg-blue-100 py-2 -mx-6 -mt-6 rounded-t-lg">Buku Tamu</h3>
      
      <div class="space-y-4">
        <div class="flex items-center gap-3">
          <label class="text-sm font-medium text-gray-700 w-64">Rias:</label>
          <input
            type="number"
            bind:value={bukuTamuRias}
            min="0"
            class="w-24 px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-rose-300 outline-none text-sm"
          />
        </div>
        
        <div class="flex items-center gap-3">
          <label class="text-sm font-medium text-gray-700 w-64">Busana:</label>
          <input
            type="number"
            bind:value={bukuTamuBusana}
            min="0"
            class="w-24 px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-rose-300 outline-none text-sm"
          />
        </div>
      </div>
    </div>

    <!-- Among Tamu Section -->
    <div class="border border-gray-300 rounded-lg p-6">
      <h3 class="text-xl font-semibold text-gray-800 mb-6 text-center bg-purple-100 py-2 -mx-6 -mt-6 rounded-t-lg">Among Tamu</h3>
      
      <div class="space-y-4">
        <div class="flex items-center gap-3">
          <label class="text-sm font-medium text-gray-700 w-64">Rias:</label>
          <input
            type="number"
            bind:value={amongTamuRias}
            min="0"
            class="w-24 px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-rose-300 outline-none text-sm"
          />
        </div>
        
        <div class="flex items-center gap-3">
          <label class="text-sm font-medium text-gray-700 w-64">Kain Pagar Ayu:</label>
          <input
            type="number"
            bind:value={amongTamuKainPagarAyu}
            min="0"
            class="w-24 px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-rose-300 outline-none text-sm"
          />
        </div>
        
        <div class="flex items-center gap-3">
          <label class="text-sm font-medium text-gray-700 w-64">Busana Pagar Bagus:</label>
          <input
            type="number"
            bind:value={amongTamuBusanaPagarBagus}
            min="0"
            class="w-24 px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-rose-300 outline-none text-sm"
          />
        </div>
      </div>
    </div>

    <!-- Terms & Conditions -->
    <div>
      <label class="block text-sm font-medium text-gray-700 mb-2">Terms & Condition</label>
      <textarea
        bind:value={termsConditions}
        rows="6"
        placeholder="Masukkan syarat dan ketentuan..."
        class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-300 focus:border-transparent outline-none resize-none"
      ></textarea>
    </div>

    <!-- Download Button -->
    <div class="flex gap-4 pt-4">
      <button
        type="submit"
        class="flex-1 bg-rose-400 hover:bg-rose-500 text-white font-medium py-3 px-6 rounded-lg transition duration-200 flex items-center justify-center gap-2"
      >
        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"></path>
        </svg>
        Download
      </button>
      
      <button
        type="button"
        on:click={goBack}
        class="px-6 py-3 border border-gray-300 text-gray-700 font-medium rounded-lg hover:bg-gray-50 transition duration-200"
      >
        Batal
      </button>
    </div>
  </form>
</div>