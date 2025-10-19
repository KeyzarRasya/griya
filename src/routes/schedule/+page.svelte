<script>
  import { onMount } from 'svelte';
  
  let dateRange = 7;
  let weddings = [];
  let filteredWeddings = [];

  // Mock data
  const mockWeddings = [
    { id: 1, customerName: 'Siti & Ahmad', weddingDate: new Date(2025, 9, 20), location: 'Jakarta' },
    { id: 2, customerName: 'Dewi & Budi', weddingDate: new Date(2025, 9, 22), location: 'Bandung' },
    { id: 3, customerName: 'Rina & Eko', weddingDate: new Date(2025, 9, 24), location: 'Bogor' },
    { id: 4, customerName: 'Maya & Fajar', weddingDate: new Date(2025, 9, 25), location: 'Jakarta' },
    { id: 5, customerName: 'Lina & Hendra', weddingDate: new Date(2025, 9, 27), location: 'Depok' },
    { id: 6, customerName: 'Putri & Irfan', weddingDate: new Date(2025, 9, 30), location: 'Tangerang' },
    { id: 7, customerName: 'Ayu & Joko', weddingDate: new Date(2025, 10, 2), location: 'Bekasi' }
  ];

  function filterWeddings() {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    const endDate = new Date(today);
    endDate.setDate(endDate.getDate() + parseInt(dateRange));
    
    filteredWeddings = mockWeddings.filter(wedding => {
      return wedding.weddingDate >= today && wedding.weddingDate <= endDate;
    });
  }

  function formatDate(date) {
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    return date.toLocaleDateString('id-ID', options);
  }

  function getDaysUntil(date) {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const weddingDate = new Date(date);
    weddingDate.setHours(0, 0, 0, 0);
    const diffTime = weddingDate - today;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  }

  function navigateToDetail(id) {
    window.location.href = `/schedule/${id}`;
  }

  onMount(() => {
    weddings = mockWeddings;
    filterWeddings();
  });

  $: dateRange, filterWeddings();
</script>

<div class="max-w-6xl mx-auto">
  <div class="mb-8">
    <h1 class="text-3xl font-serif text-gray-800 mb-2">Wedding Schedule</h1>
    <p class="text-gray-600">Manage upcoming wedding events</p>
  </div>

  <!-- Filter Section -->
  <div class="bg-white rounded-lg shadow-md p-6 mb-6">
    <div class="flex items-center gap-4">
      <label for="dateRange" class="text-sm font-medium text-gray-700">Show weddings in the next:</label>
      <select 
        id="dateRange" 
        bind:value={dateRange}
        class="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-300 focus:border-transparent outline-none text-sm"
      >
        <option value="7">7 days</option>
        <option value="14">14 days</option>
        <option value="30">30 days</option>
        <option value="60">60 days</option>
        <option value="90">90 days</option>
      </select>
      <span class="text-sm text-gray-600">({filteredWeddings.length} weddings found)</span>
    </div>
  </div>

  <!-- Wedding List -->
  <div class="space-y-4">
    {#if filteredWeddings.length === 0}
      <div class="bg-white rounded-lg shadow-md p-8 text-center">
        <p class="text-gray-500">No weddings scheduled in the next {dateRange} days</p>
      </div>
    {:else}
      {#each filteredWeddings as wedding}
        <button
          on:click={() => navigateToDetail(wedding.id)}
          class="w-full bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition duration-200 text-left"
        >
          <div class="flex items-center justify-between">
            <div class="flex-1">
              <h3 class="text-xl font-semibold text-gray-800 mb-2">{wedding.customerName}</h3>
              <div class="flex items-center gap-4 text-sm text-gray-600">
                <div class="flex items-center gap-2">
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  <span>{formatDate(wedding.weddingDate)}</span>
                </div>
                <div class="flex items-center gap-2">
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  <span>{wedding.location}</span>
                </div>
              </div>
            </div>
            <div class="flex items-center gap-4">
              {#if getDaysUntil(wedding.weddingDate) === 0}
                <span class="px-4 py-2 bg-red-100 text-red-800 text-sm font-medium rounded-full">Today</span>
              {:else if getDaysUntil(wedding.weddingDate) === 1}
                <span class="px-4 py-2 bg-orange-100 text-orange-800 text-sm font-medium rounded-full">Tomorrow</span>
              {:else}
                <span class="px-4 py-2 bg-rose-100 text-rose-800 text-sm font-medium rounded-full">
                  {getDaysUntil(wedding.weddingDate)} days
                </span>
              {/if}
              <svg class="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
              </svg>
            </div>
          </div>
        </button>
      {/each}
    {/if}
  </div>
</div>