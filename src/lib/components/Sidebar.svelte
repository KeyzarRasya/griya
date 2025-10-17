<script>
  import { page } from '$app/stores';
</script>

<aside class="w-64 bg-white shadow-lg">
  <div class="p-6 border-b border-gray-200">
    <h1 class="text-2xl font-serif text-gray-800">Griya Aristy</h1>
    <p class="text-sm text-gray-500 mt-1">Management System</p>
  </div>

  <nav class="p-4 space-y-2">
    <a
      href="/"
      class="block px-4 py-3 text-gray-700 {$page.url.pathname === '/' ? 'bg-rose-50 border-l-4 border-rose-400' : 'hover:bg-gray-50'} font-medium transition duration-200 rounded-r"
    >
      Home
    </a>
    <a
      href="/availability"
      class="block px-4 py-3 text-gray-700 {$page.url.pathname === '/availability' ? 'bg-rose-50 border-l-4 border-rose-400' : 'hover:bg-gray-50'} font-medium transition duration-200 rounded-r"
    >
      Availability Checker
    </a>
    <a
      href="/fitting"
      class="block px-4 py-3 text-gray-700 {$page.url.pathname === '/fitting' ? 'bg-rose-50 border-l-4 border-rose-400' : 'hover:bg-gray-50'} font-medium transition duration-200 rounded-r"
    >
      Fitting Form
    </a>

  
  </nav>
</aside>