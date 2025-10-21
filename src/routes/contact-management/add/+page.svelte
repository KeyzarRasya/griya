<script>
  import { goto } from '$app/navigation';
  import { page } from '$app/stores';
  import { addThirdParty, addVendor, addTeam, packageList } from '$lib/data/contactManagementData.js';
  import {packets} from '$lib/data/packetData.js'

  let contactType = $page.url.searchParams.get('type') || 'third-party';

  // Form fields
  let name = '';
  let email = '';
  let phone = '';
  let address = '';
  let type = '';

  // For third party packages
  let packages = [{ id: 1, packageName: '', price: 0 }];
  let nextPackageId = 2;

  // For team services
  let services = [{ id: 1, serviceName: '', price: 0 }];
  let nextServiceId = 2;

  function addPackageRow() {
    packages = [...packages, { id: nextPackageId++, packageName: '', price: 0 }];
  }

  function removePackageRow(id) {
    if (packages.length > 1) {
      packages = packages.filter(pkg => pkg.id !== id);
    }
  }

  function addServiceRow() {
    services = [...services, { id: nextServiceId++, serviceName: '', price: 0 }];
  }

  function removeServiceRow(id) {
    if (services.length > 1) {
      services = services.filter(svc => svc.id !== id);
    }
  }

  function handleSubmit() {
    // Validation
    if (!name || !email || !phone || !address) {
      alert('Mohon lengkapi semua field yang diperlukan');
      return;
    }

    if (!type) {
      alert('Mohon pilih type');
      return;
    }

    let result;
    
    switch(contactType) {
      case 'third-party':
        const validPackages = packages.filter(pkg => pkg.packageName && pkg.price > 0);
        if (validPackages.length === 0) {
          alert('Mohon tambahkan minimal 1 paket');
          return;
        }
        result = addThirdParty({ name, email, phone, address, type, packages: validPackages });
        break;
      
      case 'vendor':
        result = addVendor({ name, email, phone, address, type });
        break;
      
      case 'team':
        const validServices = services.filter(svc => svc.serviceName && svc.price > 0);
        if (validServices.length === 0) {
          alert('Mohon tambahkan minimal 1 service');
          return;
        }
        result = addTeam({ name, email, phone, type, services: validServices });
        break;
    }

    alert('Kontak berhasil ditambahkan!');
    goto('/contact-management');
  }

  function handleCancel() {
    goto('/contact-management');
  }

  function getTypeLabel() {
    switch(contactType) {
      case 'third-party': return 'Third Party';
      case 'vendor': return 'Vendor';
      case 'team': return 'Team';
      default: return 'Kontak';
    }
  }

  function getTypeOptions() {
    switch(contactType) {
      case 'third-party':
        return ['WO', 'Catering'];
      case 'vendor':
        return ['Supplier Kain', 'Jahit Kebaya'];
      case 'team':
        return ['MUA', 'Hairdo'];
      default:
        return [];
    }
  }
</script>

<div class="bg-white rounded-lg shadow-md p-8 border-t-4 border-rose-300">
  <div class="flex items-center gap-4 mb-6">
    <button
      on:click={handleCancel}
      class="p-2 hover:bg-gray-100 rounded-lg transition duration-200"
      title="Kembali"
    >
      <svg class="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"></path>
      </svg>
    </button>
    <div>
      <h2 class="text-3xl font-serif text-gray-800">Tambah {getTypeLabel()}</h2>
      <p class="text-gray-600 mt-1">Masukkan data kontak baru</p>
    </div>
  </div>

  <form on:submit|preventDefault={handleSubmit} class="space-y-6">
    <!-- Basic Information -->
    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div>
        <label class="block text-sm font-medium text-gray-700 mb-2">
          Nama <span class="text-red-500">*</span>
        </label>
        <input
          type="text"
          bind:value={name}
          required
          class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-300 focus:border-rose-400 outline-none"
          placeholder="Masukkan nama"
        />
      </div>

      <div>
        <label class="block text-sm font-medium text-gray-700 mb-2">
          Email <span class="text-red-500">*</span>
        </label>
        <input
          type="email"
          bind:value={email}
          required
          class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-300 focus:border-rose-400 outline-none"
          placeholder="Masukkan email"
        />
      </div>

      <div>
        <label class="block text-sm font-medium text-gray-700 mb-2">
          No HP <span class="text-red-500">*</span>
        </label>
        <input
          type="tel"
          bind:value={phone}
          required
          class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-300 focus:border-rose-400 outline-none"
          placeholder="Masukkan nomor HP"
        />
      </div>

      <div>
        <label class="block text-sm font-medium text-gray-700 mb-2">
          Alamat <span class="text-red-500">*</span>
        </label>
        <input
          type="text"
          bind:value={address}
          required
          class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-300 focus:border-rose-400 outline-none"
          placeholder="Masukkan alamat"
        />
      </div>
    </div>

    <!-- Type Selection -->
    <div>
      <label class="block text-sm font-medium text-gray-700 mb-2">
        Type <span class="text-red-500">*</span>
      </label>
      <select
        bind:value={type}
        required
        class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-300 focus:border-rose-400 outline-none"
      >
        <option value="">Pilih Type</option>
        {#each getTypeOptions() as option}
          <option value={option}>{option}</option>
        {/each}
      </select>
    </div>

    <!-- Package Table for Third Party -->
    {#if contactType === 'third-party'}
      <div class="border border-gray-300 rounded-lg p-6">
        <div class="flex items-center justify-between mb-4">
          <h3 class="text-lg font-semibold text-gray-800">List of Package</h3>
          <button
            type="button"
            on:click={addPackageRow}
            class="px-3 py-1 bg-rose-400 hover:bg-rose-500 text-white text-sm rounded transition duration-200"
          >
            Tambah Baris
          </button>
        </div>

        <div class="overflow-x-auto">
          <table class="w-full border-collapse">
            <thead>
              <tr class="bg-gray-50">
                <th class="px-4 py-3 text-left text-sm font-semibold text-gray-800 border border-gray-300 w-16">No</th>
                <th class="px-4 py-3 text-left text-sm font-semibold text-gray-800 border border-gray-300">Paket</th>
                <th class="px-4 py-3 text-left text-sm font-semibold text-gray-800 border border-gray-300">Harga</th>
                <th class="px-4 py-3 text-center text-sm font-semibold text-gray-800 border border-gray-300 w-24">Aksi</th>
              </tr>
            </thead>
            <tbody>
              {#each packages as pkg, index}
                <tr class="hover:bg-gray-50">
                  <td class="px-4 py-2 text-sm text-gray-900 border border-gray-300">{index + 1}</td>
                  <td class="px-4 py-2 border border-gray-300">
                    <select
                      bind:value={pkg.packageName}
                      class="w-full px-2 py-1 border border-gray-300 rounded focus:ring-2 focus:ring-rose-300 outline-none text-sm"
                    >
                      <option value="">Pilih Paket</option>
                      {#if type == "third-party"}
                        {#each packets as packet}
                            <option value={packet.name}>{packet.name}</option>
                        {/each}
                      {/if}
                    </select>
                  </td>
                  <td class="px-4 py-2 border border-gray-300">
                    <input
                      type="number"
                      bind:value={pkg.price}
                      min="0"
                      class="w-full px-2 py-1 border border-gray-300 rounded focus:ring-2 focus:ring-rose-300 outline-none text-sm"
                      placeholder="Harga"
                    />
                  </td>
                  <td class="px-4 py-2 text-center border border-gray-300">
                    <button
                      type="button"
                      on:click={() => removePackageRow(pkg.id)}
                      class="px-2 py-1 bg-red-500 hover:bg-red-600 text-white text-xs rounded transition duration-200"
                      disabled={packages.length === 1}
                    >
                      Hapus
                    </button>
                  </td>
                </tr>
              {/each}
            </tbody>
          </table>
        </div>
      </div>
    {/if}

    <!-- Service Table for Team -->
    {#if contactType === 'team'}
      <div class="border border-gray-300 rounded-lg p-6">
        <div class="flex items-center justify-between mb-4">
          <h3 class="text-lg font-semibold text-gray-800">List of Service</h3>
          <button
            type="button"
            on:click={addServiceRow}
            class="px-3 py-1 bg-rose-400 hover:bg-rose-500 text-white text-sm rounded transition duration-200"
          >
            Tambah Baris
          </button>
        </div>

        <div class="overflow-x-auto">
          <table class="w-full border-collapse">
            <thead>
              <tr class="bg-gray-50">
                <th class="px-4 py-3 text-left text-sm font-semibold text-gray-800 border border-gray-300 w-16">No</th>
                <th class="px-4 py-3 text-left text-sm font-semibold text-gray-800 border border-gray-300">Service</th>
                <th class="px-4 py-3 text-left text-sm font-semibold text-gray-800 border border-gray-300">Harga</th>
                <th class="px-4 py-3 text-center text-sm font-semibold text-gray-800 border border-gray-300 w-24">Aksi</th>
              </tr>
            </thead>
            <tbody>
              {#each services as service, index}
                <tr class="hover:bg-gray-50">
                  <td class="px-4 py-2 text-sm text-gray-900 border border-gray-300">{index + 1}</td>
                  <td class="px-4 py-2 border border-gray-300">
                    <input
                      type="text"
                      bind:value={service.serviceName}
                      class="w-full px-2 py-1 border border-gray-300 rounded focus:ring-2 focus:ring-rose-300 outline-none text-sm"
                      placeholder="Nama service"
                    />
                  </td>
                  <td class="px-4 py-2 border border-gray-300">
                    <input
                      type="number"
                      bind:value={service.price}
                      min="0"
                      class="w-full px-2 py-1 border border-gray-300 rounded focus:ring-2 focus:ring-rose-300 outline-none text-sm"
                      placeholder="Harga"
                    />
                  </td>
                  <td class="px-4 py-2 text-center border border-gray-300">
                    <button
                      type="button"
                      on:click={() => removeServiceRow(service.id)}
                      class="px-2 py-1 bg-red-500 hover:bg-red-600 text-white text-xs rounded transition duration-200"
                      disabled={services.length === 1}
                    >
                      Hapus
                    </button>
                  </td>
                </tr>
              {/each}
            </tbody>
          </table>
        </div>
      </div>
    {/if}

    <!-- Action Buttons -->
    <div class="flex gap-4 pt-6">
      <button
        type="button"
        on:click={handleCancel}
        class="flex-1 px-6 py-3 bg-gray-200 hover:bg-gray-300 text-gray-800 font-medium rounded-lg transition duration-200"
      >
        Batal
      </button>
      <button
        type="submit"
        class="flex-1 px-6 py-3 bg-rose-400 hover:bg-rose-500 text-white font-medium rounded-lg transition duration-200"
      >
        Simpan Kontak
      </button>
    </div>
  </form>
</div>