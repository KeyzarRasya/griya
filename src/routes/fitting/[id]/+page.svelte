<script>
  import { page } from '$app/stores';
  import { goto } from '$app/navigation';
  import { formData, resetForm } from '$lib/stores/formStore.js';
  import { getFormById } from '$lib/data/fittingFormsData.js';
  import PengantinForm from '$lib/components/PengantinForm.svelte';
  import OrangTuaForm from '$lib/components/OrangTuaForm.svelte';
  import RincianBiayaForm from '$lib/components/RincianBiayaForm.svelte';

  let activeTab = 'pengantin';
  let currentFormId = $page.params.id;
  let isNewForm = currentFormId === 'new';
  let currentFormData = null;

  // Load form data if editing existing form
  if (!isNewForm) {
    currentFormData = getFormById(currentFormId);
    if (!currentFormData) {
      // Form not found, redirect to list
      goto('/fitting');
    }
  }

  function submitForm() {
    console.log('Form submitted:', JSON.stringify($formData, null, 2));
    alert(`Form berhasil disimpan! Form ID: ${currentFormId}`);
    // In real app, you would save to database here
    goto('/fitting');
  }

  function handleReset() {
    if (confirm('Apakah Anda yakin ingin mereset form?')) {
      resetForm();
      alert('Form telah direset');
    }
  }

  function goBack() {
    goto('/fitting');
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
        <h2 class="text-3xl font-serif text-gray-800">
          {isNewForm ? 'Fitting Form Baru' : `Edit Fitting Form #${currentFormId}`}
        </h2>
        <p class="text-gray-600 mt-1">
          {#if isNewForm}
            Buat fitting form baru untuk pengantin
          {:else if currentFormData}
            Form untuk: {currentFormData.namaPengantin}
          {/if}
        </p>
      </div>
    </div>

    {#if !isNewForm && currentFormData}
      <div class="flex items-center gap-2">
        <span class="px-3 py-1 text-xs font-medium rounded-full {
          currentFormData.status === 'Completed' ? 'bg-green-100 text-green-800' :
          currentFormData.status === 'In Progress' ? 'bg-blue-100 text-blue-800' :
          'bg-gray-100 text-gray-800'
        }">
          {currentFormData.status}
        </span>
      </div>
    {/if}
  </div>

  <!-- Tabs -->
  <div class="border-b border-gray-200 mb-8">
    <nav class="flex space-x-8">
      <button
        on:click={() => activeTab = 'pengantin'}
        class="py-4 px-1 border-b-2 font-medium text-sm {activeTab === 'pengantin' ? 'border-rose-400 text-rose-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'} transition duration-200"
      >
        Pengantin
      </button>
      <button
        on:click={() => activeTab = 'orangtua'}
        class="py-4 px-1 border-b-2 font-medium text-sm {activeTab === 'orangtua' ? 'border-rose-400 text-rose-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'} transition duration-200"
      >
        Lainnya
      </button>
      <button
        on:click={() => activeTab = 'biaya'}
        class="py-4 px-1 border-b-2 font-medium text-sm {activeTab === 'biaya' ? 'border-rose-400 text-rose-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'} transition duration-200"
      >
        Rincian Biaya
      </button>
    </nav>
  </div>

  <!-- Tab Content -->
  {#if activeTab === 'pengantin'}
    <form on:submit|preventDefault={submitForm}>
      <PengantinForm />

      <!-- Form Actions -->
      <div class="flex gap-4 mt-8 pt-6 border-t border-gray-200">
        <button 
          type="submit" 
          class="flex-1 bg-rose-400 hover:bg-rose-500 text-white font-medium py-3 px-6 rounded-lg transition duration-200"
        >
          {isNewForm ? 'Simpan Form Baru' : 'Update Form'}
        </button>
        <button 
          type="button" 
          on:click={handleReset} 
          class="px-6 py-3 border border-gray-300 text-gray-700 font-medium rounded-lg hover:bg-gray-50 transition duration-200"
        >
          Reset
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

  {:else if activeTab === 'orangtua'}
    <OrangTuaForm />

  {:else if activeTab === 'biaya'}
    <RincianBiayaForm />
  {/if}
</div>