<script>
  import { muaPersonalPaket, muaPersonalUpgrade, muaPersonalUpgradePaes } from '$lib/data/pricelistData.js';

  function formatCurrency(amount) {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0
    }).format(amount);
  }
</script>

<div class="space-y-8">
  <!-- Paket Table -->
  <div class="border border-gray-200 rounded-lg overflow-hidden">
    <div class="bg-gray-50 px-6 py-4 border-b border-gray-200">
      <h4 class="text-lg font-semibold text-gray-800">Paket</h4>
    </div>
    <div class="overflow-x-auto">
      <table class="w-full">
        <thead class="bg-gray-50 border-b border-gray-200">
          <tr>
            <th class="px-6 py-3 text-left text-sm font-semibold text-gray-800 w-16">No</th>
            <th class="px-6 py-3 text-left text-sm font-semibold text-gray-800">Nama</th>
            <th class="px-6 py-3 text-left text-sm font-semibold text-gray-800">Instagram</th>
          </tr>
        </thead>
        <tbody class="divide-y divide-gray-200">
          {#each muaPersonalPaket as mua, index}
            <tr class="hover:bg-gray-50">
              <td class="px-6 py-4 text-sm text-gray-700">{index + 1}</td>
              <td class="px-6 py-4 text-sm text-gray-900 font-medium">{mua.name}</td>
              <td class="px-6 py-4 text-sm text-gray-700">{mua.instagram}</td>
            </tr>
          {/each}
        </tbody>
      </table>
    </div>
  </div>

  <!-- Upgrade Table -->
  <div class="border border-gray-200 rounded-lg overflow-hidden">
    <div class="bg-gray-50 px-6 py-4 border-b border-gray-200">
      <h4 class="text-lg font-semibold text-gray-800">Upgrade</h4>
    </div>
    <div class="overflow-x-auto">
      <table class="w-full">
        <thead class="bg-gray-50 border-b border-gray-200">
          <tr>
            <th class="px-6 py-3 text-left text-sm font-semibold text-gray-800 w-16">No</th>
            <th class="px-6 py-3 text-left text-sm font-semibold text-gray-800">Nama</th>
            <th class="px-6 py-3 text-left text-sm font-semibold text-gray-800">Instagram</th>
            <th class="px-6 py-3 text-right text-sm font-semibold text-gray-800">Upgrade</th>
            <th class="px-6 py-3 text-left text-sm font-semibold text-gray-800">Keterangan</th>
          </tr>
        </thead>
        <tbody class="divide-y divide-gray-200">
          {#each muaPersonalUpgrade as mua, index}
            <tr class="hover:bg-gray-50">
              <td class="px-6 py-4 text-sm text-gray-700">{index + 1}</td>
              <td class="px-6 py-4 text-sm text-gray-900 font-medium">{mua.name}</td>
              <td class="px-6 py-4 text-sm text-gray-700">{mua.instagram}</td>
              <td class="px-6 py-4 text-sm text-gray-900 font-medium text-right">{formatCurrency(mua.upgrade)}</td>
              <td class="px-6 py-4 text-sm text-gray-700">{mua.keterangan || '-'}</td>
            </tr>
          {/each}
        </tbody>
      </table>
    </div>
  </div>

  <!-- Upgrade Paes Table -->
  <div class="border border-gray-200 rounded-lg overflow-hidden">
    <div class="bg-gray-50 px-6 py-4 border-b border-gray-200">
      <h4 class="text-lg font-semibold text-gray-800">Upgrade Paes</h4>
    </div>
    <div class="overflow-x-auto">
      <table class="w-full">
        <thead class="bg-gray-50 border-b border-gray-200">
          <tr>
            <th class="px-6 py-3 text-left text-sm font-semibold text-gray-800 w-16">No</th>
            <th class="px-6 py-3 text-left text-sm font-semibold text-gray-800">Nama</th>
            <th class="px-6 py-3 text-left text-sm font-semibold text-gray-800">Instagram</th>
            <th class="px-6 py-3 text-right text-sm font-semibold text-gray-800">Upgrade</th>
          </tr>
        </thead>
        <tbody class="divide-y divide-gray-200">
          {#each muaPersonalUpgradePaes as mua, index}
            <tr class="hover:bg-gray-50">
              <td class="px-6 py-4 text-sm text-gray-700">{index + 1}</td>
              <td class="px-6 py-4 text-sm text-gray-900 font-medium">{mua.name}</td>
              <td class="px-6 py-4 text-sm text-gray-700">{mua.instagram}</td>
              <td class="px-6 py-4 text-sm text-gray-900 font-medium text-right">{formatCurrency(mua.upgrade)}</td>
            </tr>
          {/each}
        </tbody>
      </table>
    </div>
  </div>
</div>