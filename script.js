document.addEventListener('DOMContentLoaded', () => {
    
    // --- 1. عرض التاريخ الهجري (تقريبي أو عبر دالة) ---
    const dateDisplay = document.getElementById('dateDisplay');
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', calendar: 'islamic-umalqura' };
    dateDisplay.innerText = new Date().toLocaleDateString('ar-SA', options);

    // --- 2. مشغل الإذاعة ---
    const audioPlayer = document.getElementById('audioPlayer');
    const playBtn = document.getElementById('playBtn');
    const readerSelect = document.getElementById('readerSelect');
    const radioStatus = document.getElementById('radioStatus');
    let isPlaying = false;

    playBtn.addEventListener('click', () => {
        if (!readerSelect.value) {
            alert('الرجاء اختيار القارئ أولاً');
            return;
        }

        if (isPlaying) {
            audioPlayer.pause();
            playBtn.innerHTML = '<i class="fas fa-play"></i>';
            radioStatus.innerText = "متوقف مؤقتاً";
            radioStatus.style.color = "#fff";
            document.querySelector('.wave-visualizer').style.opacity = '0.3';
            isPlaying = false;
        } else {
            audioPlayer.src = readerSelect.value;
            audioPlayer.play();
            playBtn.innerHTML = '<i class="fas fa-pause"></i>';
            radioStatus.innerText = "جاري الاستماع...";
            radioStatus.style.color = "#d4af37"; // لون ذهبي
            document.querySelector('.wave-visualizer').style.opacity = '1';
            isPlaying = true;
        }
    });

    readerSelect.addEventListener('change', () => {
        isPlaying = false;
        playBtn.click(); // تشغيل تلقائي عند التغيير
    });

    // --- 3. المسبحة ---
    let count = 0;
    const countDisplay = document.getElementById('tasbihCount');
    const countBtn = document.getElementById('countBtn');
    const resetBtn = document.getElementById('resetBtn');

    countBtn.addEventListener('click', () => {
        count++;
        // تنسيق الرقم ليظهر دائماً بـ 3 خانات (001, 002)
        countDisplay.innerText = count.toString().padStart(3, '0');
        
        // تأثير اهتزاز للجوال
        if (navigator.vibrate) navigator.vibrate(30);
    });

    resetBtn.addEventListener('click', () => {
        if(confirm("هل تريد تصفير العداد؟")) {
            count = 0;
            countDisplay.innerText = "000";
        }
    });

    // --- 4. توليد الأذكار ---
    const athkarData = [
        "سبحان الله", "الحمد لله", "لا إله إلا الله", "الله أكبر",
        "سبحان الله وبحمده", "سبحان الله العظيم", "أستغفر الله وأتوب إليه",
        "لا حول ولا قوة إلا بالله", "اللهم صل على محمد"
    ];

    const athkarGrid = document.getElementById('athkar-grid') || document.querySelector('.athkar-grid');
    
    athkarData.forEach(text => {
        const div = document.createElement('div');
        div.className = 'thikr-item';
        div.innerHTML = `<h4>${text}</h4>`;
        div.onclick = function() {
            // وميض بسيط عند الضغط
            this.style.backgroundColor = '#f3e5ab';
            setTimeout(() => this.style.backgroundColor = 'white', 200);
            navigator.vibrate(20);
        };
        athkarGrid.appendChild(div);
    });

    // --- 5. توليد قائمة سور القرآن (تجريبي) ---
    const surahList = document.getElementById('surahList');
    const surahNames = ["الفاتحة", "البقرة", "آل عمران", "النساء", "المائدة", "الأنعام", "الأعراف", "الأنفال", "التوبة", "يونس", "هود", "يوسف", "الرعد", "إبراهيم", "الحجر", "النحل", "الإسراء", "الكهف", "مريم", "طه"];
    
    surahNames.forEach((name, index) => {
        const btn = document.createElement('div');
        btn.className = 'surah-btn';
        btn.innerText = `${index + 1}. ${name}`;
        btn.onclick = () => alert(`سيتم فتح سورة ${name} برواية ورش`);
        surahList.appendChild(btn);
    });
});
