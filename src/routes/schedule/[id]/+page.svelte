<script>
  let formData = {
    hari: '',
    tglAcara: '',
    jamStartMakeUp: '',
    akadPukul: '',
    resepsiPukul: '',
    lokasiMakeUp: '',
    namaPengantin: '',
    noHp: '',
    adat: { akad: '', resepsi: '' },
    marketingGriyaAristy: '',
    paket: '',
    keterangan: '',
    muaPengantin: '',
    hairdoHijabdo: '',
    hennaArt: '',
    handbouqet: '',
    requestMelatiBunga: '',
    pic: '',
    crewKostum: [{ name: '' }, { name: '' }],
    crewPerias: [
      { name: '' },
      { name: '' },
      { name: '' },
      { name: '' },
      { name: '' }
    ]
  };

  function addCrewKostum() {
    formData.crewKostum = [...formData.crewKostum, { name: '' }];
  }

  function removeCrewKostum(index) {
    formData.crewKostum = formData.crewKostum.filter((_, i) => i !== index);
  }

  function addCrewPerias() {
    formData.crewPerias = [...formData.crewPerias, { name: '' }];
  }

  function removeCrewPerias(index) {
    formData.crewPerias = formData.crewPerias.filter((_, i) => i !== index);
  }

  function handleSubmit() {
    console.log('Form submitted:', formData);
    alert('Jadwal Rias berhasil disimpan!');
  }

  function handleReset() {
    if (confirm('Apakah Anda yakin ingin mereset form?')) {
      formData = {
        hari: '',
        tglAcara: '',
        jamStartMakeUp: '',
        akadPukul: '',
        resepsiPukul: '',
        lokasiMakeUp: '',
        namaPengantin: '',
        noHp: '',
        adat: { akad: '', resepsi: '' },
        marketingGriyaAristy: '',
        paket: '',
        keterangan: '',
        muaPengantin: '',
        hairdoHijabdo: '',
        hennaArt: '',
        handbouqet: '',
        requestMelatiBunga: '',
        pic: '',
        crewKostum: [{ name: '' }, { name: '' }],
        crewPerias: [
          { name: '' },
          { name: '' },
          { name: '' },
          { name: '' },
          { name: '' }
        ]
      };
    }
  }
</script>

<div class="max-w-5xl mx-auto bg-white rounded-lg shadow-lg p-8">
  <h1 class="text-2xl font-bold text-center text-gray-800 mb-6 bg-gray-100 py-3 -mx-8 -mt-8 rounded-t-lg">JADWAL RIAS</h1>

  <form on:submit|preventDefault={handleSubmit}>
    <!-- Basic Information -->
    <div class="grid grid-cols-2 gap-4 mb-6">
      <div>
        <label class="block text-sm font-medium text-gray-700 mb-1">Hari, Tgl Acara</label>
        <input 
          type="text" 
          bind:value={formData.hari}
          placeholder="Contoh: Sabtu, 25 Oktober 2025"
          class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-300 focus:border-transparent outline-none text-sm"
        />
      </div>
      <div>
        <label class="block text-sm font-medium text-gray-700 mb-1">Jam (Start Make Up)</label>
        <input 
          type="time" 
          bind:value={formData.jamStartMakeUp}
          class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-300 focus:border-transparent outline-none text-sm"
        />
      </div>
    </div>

    <!-- Akad dan Resepsi -->
    <div class="grid grid-cols-2 gap-4 mb-6">
      <div>
        <label class="block text-sm font-medium text-gray-700 mb-1">Akad Pukul :</label>
        <input 
          type="time" 
          bind:value={formData.akadPukul}
          class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-300 focus:border-transparent outline-none text-sm"
        />
      </div>
      <div>
        <label class="block text-sm font-medium text-gray-700 mb-1">Resepsi Pukul :</label>
        <input 
          type="time" 
          bind:value={formData.resepsiPukul}
          class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-300 focus:border-transparent outline-none text-sm"
        />
      </div>
    </div>

    <!-- Lokasi Make Up -->
    <div class="mb-6">
      <label class="block text-sm font-medium text-gray-700 mb-1">Lokasi Make Up</label>
      <textarea 
        bind:value={formData.lokasiMakeUp}
        rows="2"
        placeholder="Alamat lengkap lokasi make up"
        class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-300 focus:border-transparent outline-none text-sm resize-none"
      ></textarea>
    </div>

    <!-- Nama Pengantin dan No HP -->
    <div class="grid grid-cols-2 gap-4 mb-6">
      <div>
        <label class="block text-sm font-medium text-gray-700 mb-1">Nama Pengantin</label>
        <input 
          type="text" 
          bind:value={formData.namaPengantin}
          placeholder="Nama lengkap pengantin"
          class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-300 focus:border-transparent outline-none text-sm"
        />
      </div>
      <div>
        <label class="block text-sm font-medium text-gray-700 mb-1">No. hp :</label>
        <input 
          type="tel" 
          bind:value={formData.noHp}
          placeholder="08xxxxxxxxxx"
          class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-300 focus:border-transparent outline-none text-sm"
        />
      </div>
    </div>

    <!-- Adat -->
    <div class="grid grid-cols-2 gap-4 mb-6">
      <div>
        <label class="block text-sm font-medium text-gray-700 mb-1">Akad :</label>
        <input 
          type="text" 
          bind:value={formData.adat.akad}
          placeholder="Adat acara akad"
          class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-300 focus:border-transparent outline-none text-sm"
        />
      </div>
      <div>
        <label class="block text-sm font-medium text-gray-700 mb-1">Resepsi :</label>
        <input 
          type="text" 
          bind:value={formData.adat.resepsi}
          placeholder="Adat acara resepsi"
          class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-300 focus:border-transparent outline-none text-sm"
        />
      </div>
    </div>

    <!-- Marketing dan Paket -->
    <div class="grid grid-cols-2 gap-4 mb-6">
      <div>
        <label class="block text-sm font-medium text-gray-700 mb-1">Marketing Griya Aristy</label>
        <input 
          type="text" 
          bind:value={formData.marketingGriyaAristy}
          placeholder="Nama marketing"
          class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-300 focus:border-transparent outline-none text-sm"
        />
      </div>
      <div>
        <label class="block text-sm font-medium text-gray-700 mb-1">PAKET :</label>
        <input 
          type="text" 
          bind:value={formData.paket}
          placeholder="Jenis paket"
          class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-300 focus:border-transparent outline-none text-sm"
        />
      </div>
    </div>

    <!-- Keterangan -->
    <div class="mb-6">
      <label class="block text-sm font-medium text-gray-700 mb-1">Keterangan</label>
      <textarea 
        bind:value={formData.keterangan}
        rows="3"
        placeholder="Catatan tambahan"
        class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-300 focus:border-transparent outline-none text-sm resize-none"
      ></textarea>
    </div>

    <!-- Services Section -->
    <div class="grid grid-cols-2 gap-4 mb-6">
      <div>
        <label class="block text-sm font-medium text-gray-700 mb-1">MUA Pengantin</label>
        <input 
          type="text" 
          bind:value={formData.muaPengantin}
          class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-300 focus:border-transparent outline-none text-sm"
        />
      </div>
      <div>
        <label class="block text-sm font-medium text-gray-700 mb-1">Hairdo / Hijabdo</label>
        <input 
          type="text" 
          bind:value={formData.hairdoHijabdo}
          class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-300 focus:border-transparent outline-none text-sm"
        />
      </div>
    </div>

    <div class="grid grid-cols-2 gap-4 mb-6">
      <div>
        <label class="block text-sm font-medium text-gray-700 mb-1">Henna Art</label>
        <input 
          type="text" 
          bind:value={formData.hennaArt}
          class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-300 focus:border-transparent outline-none text-sm"
        />
      </div>
      <div>
        <label class="block text-sm font-medium text-gray-700 mb-1">Handbouqet</label>
        <input 
          type="text" 
          bind:value={formData.handbouqet}
          class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-300 focus:border-transparent outline-none text-sm"
        />
      </div>
    </div>

    <div class="grid grid-cols-2 gap-4 mb-6">
      <div>
        <label class="block text-sm font-medium text-gray-700 mb-1">Request Melati / Bunga</label>
        <input 
          type="text" 
          bind:value={formData.requestMelatiBunga}
          class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-300 focus:border-transparent outline-none text-sm"
        />
      </div>
      <div>
        <label class="block text-sm font-medium text-gray-700 mb-1">PIC</label>
        <input 
          type="text" 
          bind:value={formData.pic}
          class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-300 focus:border-transparent outline-none text-sm"
        />
      </div>
    </div>

    <!-- Crew Kostum -->
    <div class="mb-6">
      <div class="flex items-center justify-between mb-3">
        <label class="block text-sm font-medium text-gray-700">Crew Kostum</label>
        <button 
          type="button" 
          on:click={addCrewKostum}
          class="px-3 py-1 bg-rose-400 hover:bg-rose-500 text-white text-xs rounded transition duration-200"
        >
          Tambah
        </button>
      </div>
      <div class="space-y-2">
        {#each formData.crewKostum as crew, index}
          <div class="flex gap-2 items-center">
            <span class="text-sm text-gray-600 w-8">{index + 1}.</span>
            <input 
              type="text" 
              bind:value={crew.name}
              placeholder="Nama crew kostum"
              class="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-300 focus:border-transparent outline-none text-sm"
            />
            {#if formData.crewKostum.length > 1}
              <button 
                type="button" 
                on:click={() => removeCrewKostum(index)}
                class="px-3 py-2 bg-red-500 hover:bg-red-600 text-white text-xs rounded transition duration-200"
              >
                Hapus
              </button>
            {/if}
          </div>
        {/each}
      </div>
    </div>

    <!-- Crew Perias -->
    <div class="mb-8">
      <div class="flex items-center justify-between mb-3">
        <label class="block text-sm font-medium text-gray-700">Crew Perias</label>
        <button 
          type="button" 
          on:click={addCrewPerias}
          class="px-3 py-1 bg-rose-400 hover:bg-rose-500 text-white text-xs rounded transition duration-200"
        >
          Tambah
        </button>
      </div>
      <div class="space-y-2">
        {#each formData.crewPerias as crew, index}
          <div class="flex gap-2 items-center">
            <span class="text-sm text-gray-600 w-8">{index + 1}.</span>
            <input 
              type="text" 
              bind:value={crew.name}
              placeholder="Nama crew perias"
              class="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-300 focus:border-transparent outline-none text-sm"
            />
            {#if formData.crewPerias.length > 1}
              <button 
                type="button" 
                on:click={() => removeCrewPerias(index)}
                class="px-3 py-2 bg-red-500 hover:bg-red-600 text-white text-xs rounded transition duration-200"
              >
                Hapus
              </button>
            {/if}
          </div>
        {/each}
      </div>
    </div>

    <!-- Form Actions -->
    <div class="flex gap-4 pt-6 border-t border-gray-200">
      <button 
        type="submit" 
        class="flex-1 bg-rose-400 hover:bg-rose-500 text-white font-medium py-3 px-6 rounded-lg transition duration-200"
      >
        Simpan Jadwal Rias
      </button>
      <button 
        type="button" 
        on:click={handleReset}
        class="px-6 py-3 border border-gray-300 text-gray-700 font-medium rounded-lg hover:bg-gray-50 transition duration-200"
      >
        Reset
      </button>
    </div>
  </form>
</div>