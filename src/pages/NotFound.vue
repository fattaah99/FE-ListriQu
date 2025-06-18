<template>
  <div
    class="min-h-screen bg-gradient-to-br from-purple-600 via-blue-600 to-indigo-800 flex items-center justify-center p-4"
  >
    <div class="text-center">
      <!-- Animated 404 Text -->
      <div class="relative mb-8">
        <h1
          class="text-9xl md:text-[12rem] font-black text-white opacity-20 select-none animate-pulse"
        >
          404
        </h1>
        <div class="absolute inset-0 flex items-center justify-center">
          <div
            class="text-6xl md:text-8xl font-bold bg-gradient-to-r from-pink-400 to-yellow-400 bg-clip-text text-transparent animate-bounce"
          >
            404
          </div>
        </div>
      </div>

      <!-- Floating Elements -->
      <div class="relative mb-8">
        <div
          class="floating-element absolute -top-4 -left-4 w-8 h-8 bg-pink-400 rounded-full opacity-60"
        ></div>
        <div
          class="floating-element absolute -top-8 right-8 w-6 h-6 bg-yellow-400 rounded-full opacity-40"
          style="animation-delay: 1s"
        ></div>
        <div
          class="floating-element absolute top-4 -right-8 w-4 h-4 bg-blue-300 rounded-full opacity-50"
          style="animation-delay: 2s"
        ></div>

        <!-- Main Content -->
        <div
          class="backdrop-blur-sm bg-white/10 rounded-3xl p-8 md:p-12 border border-white/20 shadow-2xl"
        >
          <div class="mb-6">
            <!-- Animated Icon -->
            <div class="inline-block p-4 bg-white/20 rounded-full mb-4 animate-spin-slow">
              <svg
                class="w-16 h-16 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M9.172 16.172a4 4 0 015.656 0M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                ></path>
              </svg>
            </div>
          </div>

          <h2 class="text-3xl md:text-4xl font-bold text-white mb-4 animate-fade-in">
            Halaman Tidak Ditemukan
          </h2>

          <p
            class="text-lg md:text-xl text-white/80 mb-8 max-w-md mx-auto leading-relaxed animate-fade-in-delay"
          >
            Maaf, halaman yang Anda cari sepertinya telah hilang di dunia maya. Mari kembali ke
            tempat yang aman!
          </p>

          <!-- Action Buttons -->
          <div class="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <router-link
              to="/"
              class="group inline-flex items-center px-8 py-4 bg-gradient-to-r from-pink-500 to-violet-500 text-white font-semibold rounded-full hover:from-pink-600 hover:to-violet-600 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl"
            >
              <svg
                class="w-5 h-5 mr-2 group-hover:-translate-x-1 transition-transform duration-300"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M10 19l-7-7m0 0l7-7m-7 7h18"
                ></path>
              </svg>
              Kembali ke Beranda
            </router-link>

            <button
              @click="goBack"
              class="group inline-flex items-center px-6 py-4 bg-white/20 text-white font-semibold rounded-full hover:bg-white/30 transform hover:scale-105 transition-all duration-300 backdrop-blur-sm"
            >
              <svg
                class="w-5 h-5 mr-2 group-hover:rotate-180 transition-transform duration-300"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                ></path>
              </svg>
              Halaman Sebelumnya
            </button>
          </div>
        </div>
      </div>

      <!-- Bottom decorative text -->
      <p class="text-white/40 text-sm mt-8 animate-fade-in-delay-2">
        "Terkadang jalan yang salah membawa kita ke tempat yang tepat" ✨
      </p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'NotFound',
  methods: {
    goBack() {
      if (window.history.length > 1) {
        this.$router.go(-1)
      } else {
        this.$router.push('/')
      }
    },
  },
  mounted() {
    // Add some interactive particles effect
    this.createParticles()
  },
  methods: {
    goBack() {
      if (window.history.length > 1) {
        this.$router.go(-1)
      } else {
        this.$router.push('/')
      }
    },
    createParticles() {
      // Create floating particles for extra visual appeal
      const container = document.querySelector('.min-h-screen')
      for (let i = 0; i < 20; i++) {
        const particle = document.createElement('div')
        particle.className = 'particle'
        particle.style.cssText = `
          position: absolute;
          width: ${Math.random() * 4 + 2}px;
          height: ${Math.random() * 4 + 2}px;
          background: rgba(255, 255, 255, ${Math.random() * 0.5 + 0.2});
          border-radius: 50%;
          left: ${Math.random() * 100}%;
          top: ${Math.random() * 100}%;
          animation: float ${Math.random() * 3 + 2}s ease-in-out infinite alternate;
          pointer-events: none;
        `
        container.appendChild(particle)
      }
    },
  },
}
</script>

<style scoped>
@keyframes float {
  0% {
    transform: translateY(0px) rotate(0deg);
  }
  100% {
    transform: translateY(-20px) rotate(180deg);
  }
}

@keyframes spin-slow {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}

@keyframes fade-in {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes fade-in-delay {
  0% {
    opacity: 0;
    transform: translateY(20px);
  }
  50% {
    opacity: 0;
    transform: translateY(20px);
  }
  100% {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes fade-in-delay-2 {
  0%,
  75% {
    opacity: 0;
    transform: translateY(20px);
  }
  100% {
    opacity: 1;
    transform: translateY(0);
  }
}

.floating-element {
  animation: float 3s ease-in-out infinite alternate;
}

.animate-spin-slow {
  animation: spin-slow 8s linear infinite;
}

.animate-fade-in {
  animation: fade-in 1s ease-out;
}

.animate-fade-in-delay {
  animation: fade-in-delay 2s ease-out;
}

.animate-fade-in-delay-2 {
  animation: fade-in-delay-2 3s ease-out;
}

.particle {
  animation: float 4s ease-in-out infinite alternate !important;
}

/* Responsive adjustments */
@media (max-width: 768px) {
  .backdrop-blur-sm {
    margin: 1rem;
  }
}

/* Hover effects */
.group:hover .group-hover\:translate-x-1 {
  transform: translateX(0.25rem);
}

.group:hover .group-hover\:-translate-x-1 {
  transform: translateX(-0.25rem);
}

.group:hover .group-hover\:rotate-180 {
  transform: rotate(180deg);
}
</style>
