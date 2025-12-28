// Menunggu dokumen selesai dimuat sebelum menjalankan script
document.addEventListener('DOMContentLoaded', function () {

    // --- 1. LOGIKA MENU MOBILE (HAMBURGER) ---
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');

    // Saat tombol hamburger diklik
    hamburger.addEventListener('click', () => {
        // Cek apakah menu sedang tampil atau tidak
        if (navLinks.style.display === 'flex') {
            navLinks.style.display = 'none'; // Sembunyikan jika sudah tampil
        } else {
            // Tampilkan menu
            navLinks.style.display = 'flex';
            navLinks.style.flexDirection = 'column'; // Susun vertikal
            navLinks.style.position = 'absolute'; // Melayang
            navLinks.style.top = '70px'; // Di bawah navbar
            navLinks.style.left = '0';
            navLinks.style.width = '100%';
            navLinks.style.background = 'white';
            navLinks.style.padding = '1rem';
            navLinks.style.boxShadow = '0 5px 10px rgba(0,0,0,0.1)';
        }
    });

    // Reset menu saat ukuran layar berubah (misal HP diputar landscape atau layar dibesarkan)
    window.addEventListener('resize', () => {
        if (window.innerWidth > 768) {
            navLinks.style.display = 'flex';
            navLinks.style.flexDirection = 'row'; // Kembali ke horizontal
            navLinks.style.position = 'static';
            navLinks.style.boxShadow = 'none';
            navLinks.style.padding = '0';
        } else {
            navLinks.style.display = 'none'; // Sembunyikan lagi di mode mobile
        }
    });

    // --- 2. LOGIKA SLIDER PRODUK ---
    const slider = document.querySelector('.product-slider');
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');

    // Jarak scroll setiap kali tombol diklik
    const scrollAmount = 300;

    // Tombol Kanan (Next)
    nextBtn.addEventListener('click', () => {
        slider.scrollBy({
            left: scrollAmount, // Geser ke kanan
            behavior: 'smooth'  // Gerakan halus
        });
    });

    // Tombol Kiri (Previous)
    prevBtn.addEventListener('click', () => {
        slider.scrollBy({
            left: -scrollAmount, // Geser ke kiri (negatif)
            behavior: 'smooth'
        });
    });

    // --- 2.5. LOGIKA SLIDER TESTIMONI ---
    const testimoniSlider = document.querySelector('.testimonial-slider');
    const testimoniPrevBtn = document.querySelector('.testimoni-prev');
    const testimoniNextBtn = document.querySelector('.testimoni-next');

    // Tombol Kanan Testimoni
    if (testimoniNextBtn) {
        testimoniNextBtn.addEventListener('click', () => {
            testimoniSlider.scrollBy({
                left: 320 + 24, // Lebar card + gap (approx)
                behavior: 'smooth'
            });
        });
    }

    // Tombol Kiri Testimoni
    if (testimoniPrevBtn) {
        testimoniPrevBtn.addEventListener('click', () => {
            testimoniSlider.scrollBy({
                left: -(320 + 24), // Geser ke kiri
                behavior: 'smooth'
            });
        });
    }

    // --- 3. MODAL POPUP LOGIC (TENDA & SOUND) ---
    const tendaCard = document.getElementById('tenda-card');
    const tendaModal = document.getElementById('tendaModal');

    // Logic Modal Sound System
    const soundCard = document.getElementById('sound-card');
    const soundModal = document.getElementById('soundModal');

    // Logic Modal Lampu
    const lampuCard = document.getElementById('lampu-card');
    const lampuModal = document.getElementById('lampuModal');

    // Logic Modal Paket Lainnya
    const paketLainBtn = document.getElementById('paket-lain-btn');
    const paketLainModal = document.getElementById('paketLainModal');

    // Menggunakan class untuk close button yang lebih spesifik jika perlu, 
    // tapi karena strukturnya sama, kita bisa pakai selector yang ada atau tambah class baru.
    // Kita akan ambil semua tombol close
    const closeButtons = document.querySelectorAll('.close-btn');

    // Buka Modal Tenda
    if (tendaCard) {
        tendaCard.addEventListener('click', () => {
            tendaModal.style.display = 'flex';
        });
    }

    // Buka Modal Sound
    if (soundCard) {
        soundCard.addEventListener('click', () => {
            soundModal.style.display = 'flex';
        });
    }

    // Buka Modal Lampu
    if (lampuCard) {
        lampuCard.addEventListener('click', () => {
            lampuModal.style.display = 'flex';
        });
    }

    // Buka Modal Paket Lainnya
    if (paketLainBtn) {
        paketLainBtn.addEventListener('click', (e) => {
            e.preventDefault(); // Mencegah link default
            paketLainModal.style.display = 'flex';
        });
    }

    // Tutup Modal (Looping untuk semua tombol close)
    closeButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            if (tendaModal) tendaModal.style.display = 'none';
            if (soundModal) soundModal.style.display = 'none';
            if (lampuModal) lampuModal.style.display = 'none';
            if (paketLainModal) paketLainModal.style.display = 'none';
        });
    });

    // Tutup Modal saat klik di luar area konten
    window.addEventListener('click', (e) => {
        if (e.target === tendaModal) {
            tendaModal.style.display = 'none';
        }
        if (e.target === soundModal) {
            soundModal.style.display = 'none';
        }
        if (e.target === lampuModal) {
            lampuModal.style.display = 'none';
        }
        if (e.target === paketLainModal) {
            paketLainModal.style.display = 'none';
        }
    });

    // --- 4. LIGHTBOX GALERI LOGIC ---
    const lightbox = document.getElementById('lightboxModal');
    const lightboxImg = document.getElementById('lightbox-img');
    const lightboxClose = document.querySelector('.lightbox-close');
    const lightboxPrev = document.querySelector('.lightbox-prev');
    const lightboxNext = document.querySelector('.lightbox-next');
    const productImages = document.querySelectorAll('.product-img');

    let currentImgIndex = 0;
    const imagesArray = Array.from(productImages);

    // Fungsi untuk update gambar lightbox berdasarkan index
    function updateLightboxImage(index) {
        if (index < 0) index = imagesArray.length - 1; // Jika index < 0, looping ke gambar terakhir
        if (index >= imagesArray.length) index = 0; // Jika index > max, looping ke gambar pertama

        currentImgIndex = index;
        lightboxImg.src = imagesArray[currentImgIndex].src;
    }

    // Tambahkan event click ke setiap gambar produk
    imagesArray.forEach((img, index) => {
        img.addEventListener('click', () => {
            lightbox.style.display = 'block';
            updateLightboxImage(index); // Set gambar awal sesuai yang diklik
        });
    });

    // Event Listener untuk Tombol Navigasi Next/Prev
    if (lightboxNext) {
        lightboxNext.addEventListener('click', (e) => {
            e.stopPropagation(); // Mencegah event bubbling menutup modal
            updateLightboxImage(currentImgIndex + 1);
        });
    }

    if (lightboxPrev) {
        lightboxPrev.addEventListener('click', (e) => {
            e.stopPropagation(); // Mencegah event bubbling menutup modal
            updateLightboxImage(currentImgIndex - 1);
        });
    }

    // Keyboard support (Arrow Left/Right)
    document.addEventListener('keydown', (e) => {
        if (lightbox.style.display === 'block') {
            if (e.key === 'ArrowLeft') {
                updateLightboxImage(currentImgIndex - 1);
            } else if (e.key === 'ArrowRight') {
                updateLightboxImage(currentImgIndex + 1);
            } else if (e.key === 'Escape') {
                lightbox.style.display = 'none';
            }
        }
    });

    // Tutup Lightbox saat tombol X diklik
    if (lightboxClose) {
        lightboxClose.addEventListener('click', () => {
            lightbox.style.display = 'none';
        });
    }

    // Tutup Lightbox saat klik di luar gambar
    lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox) {
            lightbox.style.display = 'none';
        }
    });

});
