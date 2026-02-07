document.addEventListener('DOMContentLoaded', () => {
    
    // --- تفعيل تأثير الـ 3D للمكتبة Vanilla Tilt ---
    VanillaTilt.init(document.querySelectorAll(".tilt-card"), {
        max: 15,
        speed: 400,
        glare: true,
        "max-glare": 0.5,
    });

    // --- 1. قسم الإذاعة ---
    const readerSelect = document.getElementById('readerSelect');
    const audioPlayer = document.getElementById('liveAudio');
    const statusText = document.getElementById('statusText');

    readerSelect.addEventListener('change', (e) => {
        const url = e.target.value;
        if (url) {
            audioPlayer.src = url;
            audioPlayer.play();
            statusText.innerText = "جاري التشغيل: " + e.target.options[e.target.selectedIndex].text;
            statusText.style.color = "#d4af37";
        }
    });

    // --- 2. قسم المسبحة ---
    let count = 0;
    const countDisplay = document.getElementById('tasbihCount');
    const tasbihBtn = document.getElementById('tasbihBtn');
    const resetBtn = document.getElementById('resetTasbih');

    tasbihBtn.addEventListener('click', () => {
        count++;
        countDisplay.innerText = count;
        // تأثير اهتزاز بسيط
        navigator.vibrate(50); 
    });

    resetBtn.addEventListener('click', () => {
        count = 0;
        countDisplay.innerText = 0;
    });

    // --- 3. قسم الأذكار (بيانات محلية) ---
    const athkarData = [
        "سبحان الله وبحمده", "سبحان الله العظيم", "لا إله إلا الله", 
        "الله أكبر", "أستغفر الله", "لا حول ولا قوة إلا بالله"
    ];
    const athkarGrid = document.getElementById('athkarGrid');
    
    athkarData.forEach(thikr => {
        const card = document.createElement('div');
        card.className = 'thikr-card tilt-card';
        card.innerHTML = `<h3>${thikr}</h3>`;
        athkarGrid.appendChild(card);
    });

    // --- 4. قسم القرآن (ورش) ---
    // ملاحظة: جلب نص "ورش" كنص رقمي صعب لعدم توفر API مجاني موثوق للنص الكامل برسم ورش بسهولة مثل حفص
    // لذا سنستخدم روابط لصور المصحف أو نص حفص كمثال، ولكن سأضع لك منطق الفهرس.
    
    const surahIndex = document.getElementById('surahIndex');
    const surahViewer = document.getElementById('surahViewer');
    const surahContent = document.getElementById('surahContent');
    const viewSurahName = document.getElementById('viewSurahName');
    const closeSurah = document.getElementById('closeSurah');

    // قائمة بأسماء السور (اختصاراً سأضع أول 5 سور كمثال، يمكنك إضافة الباقي)
    const surahs = [
        { id: 1, name: "الفاتحة" }, { id: 2, name: "البقرة" }, 
        { id: 3, name: "آل عمران" }, { id: 18, name: "الكهف" }, { id: 67, name: "الملك" }
    ];

    // بناء الفهرس
    surahs.forEach(surah => {
        const item = document.createElement('div');
        item.className = 'surah-item';
        item.innerText = `${surah.id}. ${surah.name}`;
        item.onclick = () => loadSurah(surah.id, surah.name);
        surahIndex.appendChild(item);
    });

    async function loadSurah(number, name) {
        surahIndex.style.display = 'none';
        surahViewer.classList.remove('hidden');
        viewSurahName.innerText = "سورة " + name;
        surahContent.innerHTML = "جاري التحميل...";

        try {
            // استخدام API (هذا API يعيد النص برواية حفص افتراضياً، للحصول على ورش نصاً الأمر معقد تقنياً ويحتاج ملفات json خاصة)
            // كحل بديل ممتاز: نعرض صور مصحف المدينة (ورش) أو نستخدم API للنص العادي.
            // هنا مثال لجلب النص العادي:
            const response = await fetch(`https://api.alquran.cloud/v1/surah/${number}`);
            const data = await response.json();
            
            let verses = data.data.ayahs.map(ayah => 
                `<span class="ayah">${ayah.text} ﴿${ayah.numberInSurah}﴾</span>`
            ).join(' ');
            
            surahContent.innerHTML = verses;
        } catch (error) {
            surahContent.innerText = "حدث خطأ في تحميل السورة، تأكد من الاتصال بالإنترنت.";
        }
    }

    closeSurah.addEventListener('click', () => {
        surahViewer.classList.add('hidden');
        surahIndex.style.display = 'grid';
        surahContent.innerHTML = "";
    });
});
