// ============================================================
// ✏️  PANDUAN PENGISIAN KONTEN — Edit bagian ini saja!
// ============================================================

const CONFIG = {
  // 1. NAMA PENERIMA
  recipientName: "Ley",

  // 2. NAMA PEMBUAT (untuk tanda tangan di pesan)
  senderName: "Mr.Panda",

  // 3. UMUR (untuk lilin di kue)
  age: 19,

  // 4. FOTO & VIDEO (Bisa menggunakan file foto atau video .mp4)
  photos: [
    { src: "assets/videos/video1.mp4", caption: "First Flower", type: "video" },
    { src: "assets/photos/photo2.jpg", caption: "You make me fall again" },
    { src: "assets/photos/photo3.jpg", caption: "Yailyalili" },
    { src: "assets/photos/photo4.jpg", caption: "Mr.Panda's Favorite" },
  ],

  // 5. PESAN DARI KAMU
  message: `HAPPY BIRTHDAY DAYYY LEYKAA🥳🥳😛🤩❗❗, selamat ulang tahun yaa cantikk, semoga panjang umur, sehat selalu, rezekinya lancar, cita citanya tercapai, nilainya naik, apa yang kamu mau terwujud, semuanya deh yang terbaik untuk kamu, I WISH YOUU ALL THE BEST IN THIS UNIVERSEE❗❗.

You are the most wonderful, the coolest person ive ever met, aku percaya kamu bisa capai semua yang kamu ingin kan, I HAVE FAITH ON YOU👆🏻, soo jangan pernah ngerasa pesimis yaa, trus kalo stress jangan terlalu di bawa stress kalii cause your not alone okeyy, itu pesan dari akuu yaa walaupun aku tau sii kamu bisa ngehandle itu sendirii, kamu kuat, kamu itu dewasa, tapi ga selamanya kita kuat jadi dewasa, pokoknya kalo ada apa apa i'll always be here for you yaaa jangan sungkan sama aku, i dont bite✌🏻(kadang)

ENJOY YOUR BIRTHDAY PRETTYY🥳🥳🥳.`,

  // 6. FORMSPREE ENDPOINT
  formspreeEndpoint: "https://formspree.io/f/xojzjbnq",
};

// ============================================================
// ⛔  JANGAN EDIT DI BAWAH BARIS INI KECUALI KAMU TAHU JS
// ============================================================

document.addEventListener("DOMContentLoaded", () => {
  // ────────────────────────────────────────────────────────────
  // 2.1  Inisialisasi & Populasi Konten
  // ────────────────────────────────────────────────────────────

  /**
   * Mengisi konten dinamis dari CONFIG ke elemen-elemen HTML.
   * Termasuk judul hero, gallery grid, dan judul section wish.
   */
  function initContent() {
    try {
      // Set judul hero
      const heroTitle = document.getElementById("hero-title");
      if (heroTitle) {
        heroTitle.textContent = `Happy ${CONFIG.age}th Birthday, ${CONFIG.recipientName} 🌸`;
      }

      // Populasi gallery grid dengan foto/video dari CONFIG
      const galleryGrid = document.getElementById("gallery-grid");
      if (galleryGrid) {
        galleryGrid.innerHTML = "";
        CONFIG.photos.forEach((photo, index) => {
          const item = document.createElement("div");
          item.className = "gallery-item fade-in";
          item.setAttribute("data-index", index);

          const isVideo = photo.type === "video" || 
            (photo.src && /\.(mp4|webm|ogg|mov|m4v)$/i.test(photo.src));

          if (isVideo) {
            item.innerHTML = `
              <video src="${photo.src}" muted playsinline loop autoplay class="gallery-video-preview"
                     onerror="this.parentElement.innerHTML='<div class=gallery-placeholder>🎥</div>'"></video>
              <div class="caption">${photo.caption}</div>
              <div class="video-badge">▶</div>
            `;
          } else {
            item.innerHTML = `
              <img src="${photo.src}" alt="${photo.caption}" loading="lazy"
                   onerror="this.parentElement.innerHTML='<div class=gallery-placeholder>📷</div>'">
              <div class="caption">${photo.caption}</div>
            `;
          }
          galleryGrid.appendChild(item);
        });
      }

      // Set judul section wish menggunakan nama penerima
      const wishTitle = document.getElementById("wish-title");
      if (wishTitle) {
        wishTitle.textContent = `What's Your Wish, ${CONFIG.recipientName}?`;
      }
    } catch (err) {
      console.error("Error saat inisialisasi konten:", err);
    }
  }

  // ────────────────────────────────────────────────────────────
  // 2.2  Falling Petals (Kelopak Bunga Berjatuhan)
  // ────────────────────────────────────────────────────────────

  /**
   * Membuat 25 elemen kelopak bunga pink yang jatuh di background.
   * Setiap petal memiliki posisi, ukuran, durasi, dan warna acak.
   */
  function createPetals() {
    try {
      const container = document.getElementById("petals-container");
      if (!container) return;

      // Variasi warna pink untuk kelopak
      const pinkColors = [
        "#FFB6C1",
        "#FF69B4",
        "#FFC0CB",
        "#FF85A2",
        "#FFD1DC",
        "#F8A4BF",
        "#E891AA",
        "#F4A6C1",
      ];

      const petalCount = 25;

      for (let i = 0; i < petalCount; i++) {
        const petal = document.createElement("div");
        petal.className = "petal";

        // Ukuran acak antara 15-35px
        const size = Math.random() * 20 + 15;
        // Durasi animasi acak antara 8-18 detik
        const duration = Math.random() * 10 + 8;
        // Delay animasi acak antara 0-15 detik
        const delay = Math.random() * 15;
        // Opacity acak antara 0.3-0.8
        const opacity = Math.random() * 0.5 + 0.3;
        // Warna pink acak dari daftar
        const color = pinkColors[Math.floor(Math.random() * pinkColors.length)];

        // Border-radius organik agar setiap petal sedikit berbeda bentuknya
        const br1 = Math.floor(Math.random() * 30 + 40);
        const br2 = Math.floor(Math.random() * 30 + 50);
        const br3 = Math.floor(Math.random() * 30 + 30);
        const br4 = Math.floor(Math.random() * 30 + 60);

        petal.style.cssText = `
          left: ${Math.random() * 100}%;
          width: ${size}px;
          height: ${size}px;
          animation-duration: ${duration}s;
          animation-delay: ${delay}s;
          opacity: ${opacity};
          background: ${color};
          border-radius: ${br1}% ${br2}% ${br3}% ${br4}%;
        `;

        container.appendChild(petal);
      }
    } catch (err) {
      console.error("Error saat membuat petals:", err);
    }
  }

  // ────────────────────────────────────────────────────────────
  // 2.3  Music Player (Pemutar Musik)
  // ────────────────────────────────────────────────────────────

  /**
   * Mengatur pemutar musik latar belakang.
   * Mencoba autoplay saat halaman dibuka, dengan fallback tombol play/pause.
   */
  function initMusic() {
    try {
      const music = document.getElementById("bg-music");
      const musicBtn = document.getElementById("music-btn");
      if (!music || !musicBtn) return;

      let isPlaying = false;

      // Fungsi untuk memperbarui tampilan tombol musik
      function updateMusicBtn() {
        if (isPlaying) {
          musicBtn.textContent = "🎵";
          musicBtn.classList.add("playing");
        } else {
          musicBtn.textContent = "🔇";
          musicBtn.classList.remove("playing");
        }
      }

      // Coba autoplay saat halaman dimuat
      music.play().then(() => {
        isPlaying = true;
        updateMusicBtn();
      }).catch(() => {
        // Browser memblokir autoplay — pengguna harus klik tombol
        isPlaying = false;
        updateMusicBtn();
      });

      // Toggle play/pause saat tombol diklik
      musicBtn.addEventListener("click", () => {
        if (isPlaying) {
          music.pause();
          isPlaying = false;
        } else {
          music.play().then(() => {
            isPlaying = true;
            updateMusicBtn();
          }).catch((err) => {
            console.error("Gagal memutar musik:", err);
          });
        }
        updateMusicBtn();
      });
    } catch (err) {
      console.error("Error saat inisialisasi musik:", err);
    }
  }

  // ────────────────────────────────────────────────────────────
  // 2.4  Gallery & Lightbox (Galeri Foto & Tampilan Penuh)
  // ────────────────────────────────────────────────────────────

  /**
   * Mengatur galeri foto interaktif dengan lightbox.
   * Mendukung navigasi prev/next, keyboard, dan klik di luar untuk menutup.
   */
  function initGallery() {
    try {
      const galleryGrid = document.getElementById("gallery-grid");
      const lightbox = document.getElementById("lightbox");
      const lightboxImg = document.getElementById("lightbox-img");
      const lightboxVideo = document.getElementById("lightbox-video");
      const lightboxCaption = document.getElementById("lightbox-caption");
      const lightboxClose = document.getElementById("lightbox-close");
      const lightboxPrev = document.getElementById("lightbox-prev");
      const lightboxNext = document.getElementById("lightbox-next");

      if (!galleryGrid || !lightbox) return;

      let currentIndex = 0;

      /**
       * Membuka lightbox pada foto/video tertentu.
       * @param {number} index - Indeks item yang akan ditampilkan
       */
      function openLightbox(index) {
        if (index < 0 || index >= CONFIG.photos.length) return;
        currentIndex = index;
        const photo = CONFIG.photos[currentIndex];

        const isVideo = photo.type === "video" || 
          (photo.src && /\.(mp4|webm|ogg|mov|m4v)$/i.test(photo.src));

        if (isVideo) {
          // Sembunyikan gambar, tampilkan video
          if (lightboxImg) lightboxImg.style.display = "none";
          if (lightboxVideo) {
            lightboxVideo.style.display = "block";
            lightboxVideo.src = photo.src;
            // Play video otomatis dengan suara (karena ini interaksi klik)
            lightboxVideo.play().catch(err => console.log("Gagal memutar video:", err));
          }
        } else {
          // Sembunyikan video, hentikan pemutaran, tampilkan gambar
          if (lightboxVideo) {
            lightboxVideo.pause();
            lightboxVideo.src = "";
            lightboxVideo.style.display = "none";
          }
          if (lightboxImg) {
            lightboxImg.style.display = "block";
            lightboxImg.src = photo.src;
          }
        }

        if (lightboxCaption) lightboxCaption.textContent = photo.caption;

        lightbox.classList.add("active");
        document.body.style.overflow = "hidden"; // Nonaktifkan scroll body
      }

      /** Menutup lightbox dan mengaktifkan kembali scroll body. */
      function closeLightbox() {
        if (lightboxVideo) {
          lightboxVideo.pause();
          lightboxVideo.src = "";
        }
        lightbox.classList.remove("active");
        document.body.style.overflow = ""; // Aktifkan kembali scroll
      }

      /**
       * Navigasi ke item sebelumnya atau berikutnya (wrap-around).
       * @param {number} direction - Arah navigasi: -1 (sebelumnya) atau +1 (berikutnya)
       */
      function navigateLightbox(direction) {
        if (lightboxVideo) {
          lightboxVideo.pause();
          lightboxVideo.src = "";
        }
        const total = CONFIG.photos.length;
        currentIndex = (currentIndex + direction + total) % total;
        openLightbox(currentIndex);
      }

      // Event delegation: klik pada item galeri untuk membuka lightbox
      galleryGrid.addEventListener("click", (e) => {
        const item = e.target.closest(".gallery-item");
        if (!item) return;
        const index = parseInt(item.getAttribute("data-index"), 10);
        if (!isNaN(index)) openLightbox(index);
      });

      // Tombol tutup lightbox
      if (lightboxClose) {
        lightboxClose.addEventListener("click", closeLightbox);
      }

      // Tombol navigasi prev/next
      if (lightboxPrev) {
        lightboxPrev.addEventListener("click", () => navigateLightbox(-1));
      }
      if (lightboxNext) {
        lightboxNext.addEventListener("click", () => navigateLightbox(1));
      }

      // Klik di luar konten lightbox (area gelap) untuk menutup
      lightbox.addEventListener("click", (e) => {
        if (e.target === lightbox) closeLightbox();
      });

      // Navigasi menggunakan keyboard
      document.addEventListener("keydown", (e) => {
        if (!lightbox.classList.contains("active")) return;

        switch (e.key) {
          case "Escape":
            closeLightbox();
            break;
          case "ArrowLeft":
            navigateLightbox(-1);
            break;
          case "ArrowRight":
            navigateLightbox(1);
            break;
        }
      });
    } catch (err) {
      console.error("Error saat inisialisasi galeri:", err);
    }
  }

  // ────────────────────────────────────────────────────────────
  // 2.5  Make a Wish (Formulir Harapan)
  // ────────────────────────────────────────────────────────────

  /**
   * Mengatur formulir "Make a Wish".
   * Mengirim harapan ke Formspree (email) lalu menyimpan ke server,
   * dan menampilkan animasi bunga saat berhasil.
   */
  function initWishForm() {
    try {
      const wishForm = document.getElementById("wish-form");
      const wishTextarea = document.getElementById("wish-textarea");
      const wishBtn = wishForm ? wishForm.querySelector("button[type='submit']") : null;

      if (!wishForm || !wishTextarea) return;

      wishForm.addEventListener("submit", async (e) => {
        e.preventDefault();

        const wishText = wishTextarea.value.trim();

        // Validasi: jangan kirim jika kosong
        if (!wishText) {
          showWishError("Tulis harapanmu dulu ya 🌸");
          return;
        }

        // Nonaktifkan tombol dan tampilkan status loading
        if (wishBtn) {
          wishBtn.disabled = true;
          wishBtn.textContent = "Sending... ✨";
        }

        const id = `wish_${Date.now()}`;
        const timestamp = new Date().toISOString();

        try {
          // 1. Simpan ke localStorage sebagai backup lokal di browser penerima
          try {
            const localWishes = JSON.parse(localStorage.getItem("wishes") || "[]");
            localWishes.push({ id, wish: wishText, timestamp });
            localStorage.setItem("wishes", JSON.stringify(localWishes));
          } catch (localErr) {
            console.error("Gagal menyimpan wish ke localStorage:", localErr);
          }

          // 2. Kirim ke Formspree hanya jika sudah dikonfigurasi (bukan placeholder)
          const isFormspreeConfigured = CONFIG.formspreeEndpoint && 
            !CONFIG.formspreeEndpoint.includes("GANTI_DENGAN_ID_KAMU");

          if (isFormspreeConfigured) {
            const emailResponse = await fetch(CONFIG.formspreeEndpoint, {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
              },
              body: JSON.stringify({
                wish: wishText,
                timestamp,
                _subject: `Birthday Wish dari ${CONFIG.recipientName}`,
              }),
            });

            if (!emailResponse.ok) {
              throw new Error("Gagal mengirim email");
            }
          }

          // 3. Kirim ke API lokal (opsional, jika dideploy di Vercel)
          try {
            await fetch("/api/save-wish", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ wish: wishText, timestamp, id }),
            });
          } catch (saveErr) {
            // Tetap abaikan error jika backend server tidak aktif (misal dijalankan statis)
            console.error("Gagal menyimpan wish ke server:", saveErr);
          }

          // Bersihkan form input
          wishTextarea.value = "";

          // Tampilkan animasi sukses
          showWishSuccess();
        } catch (err) {
          console.error("Error saat mengirim wish:", err);
          showWishError("Oops, gagal mengirim email. Coba lagi ya 🌸");
        } finally {
          // Kembalikan tombol ke keadaan semula
          if (wishBtn) {
            wishBtn.disabled = false;
            wishBtn.textContent = "Send My Wish 🌸";
          }
        }
      });
    } catch (err) {
      console.error("Error saat inisialisasi wish form:", err);
    }
  }

  /**
   * Menampilkan pesan error pada form wish.
   * @param {string} message - Pesan error yang ditampilkan
   */
  function showWishError(message) {
    // Cari atau buat elemen error
    let errorEl = document.getElementById("wish-error");
    if (!errorEl) {
      errorEl = document.createElement("div");
      errorEl.id = "wish-error";
      errorEl.className = "wish-error";
      const wishForm = document.getElementById("wish-form");
      if (wishForm) wishForm.appendChild(errorEl);
    }
    errorEl.textContent = message;
    errorEl.style.display = "block";

    // Sembunyikan error setelah 3 detik
    setTimeout(() => {
      errorEl.style.display = "none";
    }, 3000);
  }

  /**
   * Menampilkan overlay animasi bunga mekar setelah wish berhasil dikirim.
   * Membuat 30 elemen bloom flower dengan posisi, ukuran, dan delay acak.
   */
  function showWishSuccess() {
    try {
      const overlay = document.getElementById("wish-success-overlay");
      const bloomContainer = document.getElementById("bloom-container");
      const continueBtn = document.getElementById("wish-success-close");

      if (!overlay) return;

      overlay.classList.add("active");

      // Buat 30 bunga bloom dengan posisi dan animasi acak
      if (bloomContainer) {
        bloomContainer.innerHTML = "";

        const bloomColors = [
          "#FFB6C1",
          "#FF69B4",
          "#FFC0CB",
          "#FF85A2",
          "#FFD1DC",
          "#F8A4BF",
        ];

        for (let i = 0; i < 30; i++) {
          const flower = document.createElement("div");
          flower.className = "bloom-flower";

          const size = Math.random() * 30 + 15;
          const color = bloomColors[Math.floor(Math.random() * bloomColors.length)];
          const delay = Math.random() * 2;

          flower.style.cssText = `
            left: ${Math.random() * 100}%;
            top: ${Math.random() * 100}%;
            width: ${size}px;
            height: ${size}px;
            background: ${color};
            animation-delay: ${delay}s;
          `;

          bloomContainer.appendChild(flower);
        }
      }

      // Tombol "Continue" untuk menutup overlay sukses
      if (continueBtn) {
        continueBtn.addEventListener(
          "click",
          () => {
            overlay.classList.remove("active");
            // Bersihkan bloom flowers setelah overlay tertutup
            if (bloomContainer) bloomContainer.innerHTML = "";
          },
          { once: true }
        );
      }
    } catch (err) {
      console.error("Error saat menampilkan animasi sukses:", err);
    }
  }

  // ────────────────────────────────────────────────────────────
  // 2.6  Blow the Candle (Tiup Lilin)
  // ────────────────────────────────────────────────────────────

  /**
   * Mengatur interaksi tiup lilin pada kue ulang tahun.
   * Saat diklik, lilin padam dan muncul reveal "Lilies for Ley".
   */
  function initCandle() {
    try {
      const cakeScene = document.getElementById("cake-scene");
      const candleSection = document.getElementById("candle-section");
      const candleInstruction = document.getElementById("candle-instruction");

      if (!cakeScene) return;

      let isBlown = false;

      cakeScene.addEventListener("click", () => {
        if (isBlown) return;
        isBlown = true;

        // Tambah class blown untuk memadamkan lilin via CSS
        if (candleSection) candleSection.classList.add("blown");

        // Sembunyikan instruksi dengan efek fade out
        if (candleInstruction) {
          candleInstruction.style.transition = "opacity 0.5s ease";
          candleInstruction.style.opacity = "0";
          setTimeout(() => {
            candleInstruction.style.display = "none";
          }, 500);
        }

        // Setelah delay, tampilkan reveal "Lilies for Ley"
        setTimeout(() => {
          showLiliesReveal();
        }, 800);
      });
    } catch (err) {
      console.error("Error saat inisialisasi candle:", err);
    }
  }

  /**
   * Menampilkan animasi reveal "Lilies for Ley" dengan partikel bunga lily.
   * Membuat 40 partikel kecil yang melayang di layar lalu menghilang.
   */
  function showLiliesReveal() {
    try {
      const liliesReveal = document.getElementById("lilies-reveal");
      if (!liliesReveal) return;

      liliesReveal.classList.add("visible");

      // Buat 40 partikel lily yang melayang
      const particleColors = [
        "#FFB6C1",
        "#FF69B4",
        "#FFC0CB",
        "#FF85A2",
        "#FFD1DC",
      ];

      for (let i = 0; i < 40; i++) {
        const particle = document.createElement("div");
        particle.className = "lilies-particle";

        const size = Math.random() * 12 + 6;
        const color = particleColors[Math.floor(Math.random() * particleColors.length)];
        const duration = Math.random() * 3 + 2; // 2-5 detik
        const delay = Math.random() * 2; // 0-2 detik

        particle.style.cssText = `
          left: ${Math.random() * 100}%;
          top: ${Math.random() * 100}%;
          width: ${size}px;
          height: ${size}px;
          background: ${color};
          animation: lilyFloat ${duration}s ease-in-out ${delay}s forwards;
          border-radius: 50%;
          position: absolute;
          pointer-events: none;
        `;

        liliesReveal.appendChild(particle);

        // Hapus partikel dari DOM setelah animasi selesai
        const totalTime = (duration + delay) * 1000;
        setTimeout(() => {
          if (particle.parentNode) {
            particle.parentNode.removeChild(particle);
          }
        }, totalTime + 100);
      }
    } catch (err) {
      console.error("Error saat menampilkan lilies reveal:", err);
    }
  }

  // ────────────────────────────────────────────────────────────
  // 2.7  Love Letter (Amplop + Efek Typewriter)
  // ────────────────────────────────────────────────────────────

  /**
   * Mengatur interaksi amplop surat cinta.
   * Saat diklik, amplop terbuka dan surat muncul dengan efek typewriter.
   */
  function initLetter() {
    try {
      const envelope = document.getElementById("envelope");
      const envelopeInstruction = document.getElementById("envelope-instruction");
      const letterOverlay = document.getElementById("letter-overlay");
      const letterOverlayText = document.getElementById("letter-overlay-text");
      const letterOverlaySignature = document.getElementById("letter-overlay-signature");
      const letterOverlayClose = document.getElementById("letter-overlay-close");

      if (!envelope) return;

      let isOpened = false;

      envelope.addEventListener("click", () => {
        if (isOpened) return;
        isOpened = true;

        // Animasi amplop terbuka via CSS class
        envelope.classList.add("opened");

        // Sembunyikan instruksi
        if (envelopeInstruction) {
          envelopeInstruction.style.transition = "opacity 0.5s ease";
          envelopeInstruction.style.opacity = "0";
          setTimeout(() => {
            envelopeInstruction.style.display = "none";
          }, 500);
        }

        // Tunggu animasi amplop selesai, lalu buka overlay surat
        setTimeout(() => {
          if (letterOverlay) {
            letterOverlay.classList.add("active");

            // Mulai efek typewriter pada isi pesan
            if (letterOverlayText) {
              typewriterEffect(letterOverlayText, CONFIG.message, 40).then(() => {
                // Setelah typewriter selesai, tampilkan tanda tangan dengan fade-in
                if (letterOverlaySignature) {
                  letterOverlaySignature.textContent = `— ${CONFIG.senderName} 🌸`;
                  letterOverlaySignature.style.transition = "opacity 1s ease";
                  letterOverlaySignature.style.opacity = "0";
                  // Trigger reflow agar transisi berjalan
                  void letterOverlaySignature.offsetWidth;
                  letterOverlaySignature.style.opacity = "1";
                }
              });
            }
          }
        }, 1500);
      });

      // Tombol tutup overlay surat
      if (letterOverlayClose) {
        letterOverlayClose.addEventListener("click", () => {
          if (letterOverlay) letterOverlay.classList.remove("active");
        });
      }
    } catch (err) {
      console.error("Error saat inisialisasi letter:", err);
    }
  }

  /**
   * Efek typewriter: menampilkan teks satu karakter per interval.
   * Karakter newline (\n) dikonversi menjadi <br>.
   *
   * @param {HTMLElement} element - Elemen HTML tempat teks akan ditampilkan
   * @param {string} text - Teks yang akan ditampilkan
   * @param {number} speed - Kecepatan per karakter dalam milidetik (default: 40)
   * @returns {Promise} - Promise yang resolve setelah semua karakter ditampilkan
   */
  function typewriterEffect(element, text, speed = 40) {
    return new Promise((resolve) => {
      // Bersihkan konten sebelumnya
      element.innerHTML = "";

      let charIndex = 0;

      const interval = setInterval(() => {
        if (charIndex < text.length) {
          const char = text[charIndex];

          if (char === "\n") {
            // Karakter newline → tambahkan elemen <br>
            element.appendChild(document.createElement("br"));
          } else {
            // Karakter biasa → tambahkan sebagai text node
            element.appendChild(document.createTextNode(char));
          }

          charIndex++;
        } else {
          // Semua karakter sudah ditampilkan
          clearInterval(interval);
          resolve();
        }
      }, speed);
    });
  }

  // ────────────────────────────────────────────────────────────
  // 2.8  Scroll Animations (Animasi Saat Scroll)
  // ────────────────────────────────────────────────────────────

  /**
   * Mengatur animasi fade-in saat elemen masuk viewport menggunakan IntersectionObserver.
   * Juga mengatur tombol CTA scroll ke section galeri.
   */
  function initScrollAnimations() {
    try {
      // Observer untuk elemen-elemen dengan class .fade-in
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add("visible");
            }
          });
        },
        { threshold: 0.15 }
      );

      // Observe semua elemen .fade-in
      const fadeElements = document.querySelectorAll(".fade-in");
      fadeElements.forEach((el) => observer.observe(el));

      // Tombol CTA scroll ke section galeri
      const scrollCta = document.getElementById("scroll-cta");
      const gallerySection = document.getElementById("gallery-section");

      if (scrollCta && gallerySection) {
        scrollCta.addEventListener("click", () => {
          gallerySection.scrollIntoView({ behavior: "smooth" });
        });
      }
    } catch (err) {
      console.error("Error saat inisialisasi scroll animations:", err);
    }
  }

  // ────────────────────────────────────────────────────────────
  // 2.9  Inisialisasi Semua Modul
  // ────────────────────────────────────────────────────────────

  initContent();
  createPetals();
  initMusic();
  initGallery();
  initWishForm();
  initCandle();
  initLetter();
  initScrollAnimations();
});
