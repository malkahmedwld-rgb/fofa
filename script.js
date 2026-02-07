document.addEventListener('DOMContentLoaded', () => {
    
    // 1. القائمة في الجوال
    const menuBtn = document.getElementById('mobileMenuBtn');
    const sidebar = document.getElementById('sidebar');
    
    menuBtn.addEventListener('click', () => {
        sidebar.classList.toggle('active');
    });

    // 2. التاريخ الهجري
    const dateDisplay = document.getElementById('dateDisplay');
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', calendar: 'islamic-umalqura' };
    dateDisplay.innerText = new Date().toLocaleDateString('ar-SA', options);

    // 3. الإذاعة
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
            isPlaying = false;
        } else {
            audioPlayer.src = readerSelect.value;
            audioPlayer.play();
            playBtn.innerHTML = '<i class="fas fa-pause"></i>';
            radioStatus.innerText = "جاري الاستماع...";
            isPlaying = true;
        }
    });

    readerSelect.addEventListener('change', () => {
        if(isPlaying) {
            audioPlayer.src = readerSelect.value;
            audioPlayer.play();
        }
    });

    // 4. المسبحة
    let count = 0;
    const countDisplay = document.getElementById('tasbihCount');
    const countBtn = document.getElementById('countBtn');
    const resetBtn = document.getElementById('resetBtn');

    countBtn.addEventListener('click', () => {
        count++;
        countDisplay.innerText = count.toString().padStart(3, '0');
        if (navigator.vibrate) navigator.vibrate(30);
    });

    resetBtn.addEventListener('click', () => {
        count = 0;
        countDisplay.innerText = "000";
    });

    // 5. الأذكار
    const athkarData = [
        "سبحان الله وبحمده", "سبحان الله العظيم", "لا إله إلا الله", 
        "الله أكبر", "أستغفر الله", "لا حول ولا قوة إلا بالله", 
        "اللهم صل وسلم على نبينا محمد", "حسبي الله ونعم الوكيل"
    ];
    const athkarGrid = document.getElementById('athkar');
    
    athkarData.forEach(txt => {
        const div = document.createElement('div');
        div.className = 'thikr-item';
        div.innerHTML = `<h4>${txt}</h4>`;
        athkarGrid.appendChild(div);
    });

    // 6. سور القرآن
    const surahList = document.getElementById('surahList');
    const surahs = ["الفاتحة", "البقرة", "آل عمران", "النساء", "المائدة", "الأنعام", "الأعراف", "الأنفال", "التوبة", "يونس", "هود", "يوسف", "الكهف", "مريم", "طه", "الأنبياء", "الحج", "المؤمنون", "الملك"];
    
    surahs.forEach((name, i) => {
        const btn = document.createElement('div');
        btn.className = 'surah-btn';
        btn.innerText = `${i+1}. ${name}`;
        surahList.appendChild(btn);
    });
});
