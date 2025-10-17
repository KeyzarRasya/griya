<script>
  import Sidebar from '$lib/components/Sidebar.svelte';
  import '../app.css';
</script>

<div class="flex min-h-screen bg-gray-50">
  <Sidebar />
  
  <main class="flex-1 p-8">
    <div class="max-w-6xl mx-auto">
      <slot />
    </div>
  </main>
</div>