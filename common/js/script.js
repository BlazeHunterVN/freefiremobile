const translations = {
    'vietnam': {
        'home_link': 'TRANG CHỦ',
        'nation_link': 'QUỐC GIA',
        'news_link': 'TIN TỨC',
        'contact_link': 'LIÊN HỆ',
        'select_country': 'QUỐC GIA ĐANG CHỌN',
        'welcome_heading': 'BLAZE HUNTER',
        'welcome_paragraph': 'Trang Cung Cấp Biểu Ngữ Và Cập Nhật Sự Kiện Free Fire Mới Nhất.',
        'news_heading': 'TIN TỨC',
        'contact_heading': 'LIÊN HỆ VỚI CHÚNG TÔI',
        'contact_info': 'Thông Tin Liên Hệ Tại Đây.',
        'operating_policy': 'CHÍNH SÁCH VẬN HÀNH',
        'terms_of_use': 'ĐIỀU KHOẢN SỬ DỤNG',
        'copyright': '© 2025 Bản Quyền Website Thuộc Về BlazeHunter.',
        'select_prompt': 'VUI LÒNG CHỌN MỘT QUỐC GIA',
        'update_banner': 'Dữ Liệu Biểu Ngữ Đang Được Cập Nhật.',
        'update_news': 'Dữ liệu Tin tức Đang Được Cập Nhật.',
        'start_date': 'Ngày Bắt Đầu',
        'date_posting': 'Ngày Đăng',
        'link_access': 'Truy Cập Link',
        'no_title': 'Không Có Tiêu đề',
        'active': 'ĐANG HOẠT ĐỘNG',
        'upcoming': 'SẮP DIỄN RA'
    },
    'default': {
        'home_link': 'HOME',
        'nation_link': 'NATION',
        'news_link': 'NEWS',
        'contact_link': 'CONTACT',
        'select_country': 'CURRENT NATION',
        'welcome_heading': 'BLAZE HUNTER',
        'welcome_paragraph': 'Page Providing Free Fire Game Banner And Latest Updates.',
        'news_heading': 'NEWS',
        'contact_heading': 'CONTACT US',
        'contact_info': 'Contact Information Here.',
        'operating_policy': 'OPERATING POLICY',
        'terms_of_use': 'TERMS OF USE',
        'copyright': '© 2025 Website Copyright Belongs To BlazeHunter.',
        'select_prompt': 'PLEASE SELECT A COUNTRY',
        'update_banner': 'Banner Data Is Currently Being Updated.',
        'update_news': 'News Data Is Currently Being Updated.',
        'start_date': 'Start Date',
        'date_posting': 'Date Of Posting',
        'link_access': 'Link Access',
        'no_title': 'No Title',
        'active': 'ACTIVE',
        'upcoming': 'UPCOMING'
    }
};

let currentLanguage = localStorage.getItem('currentLang') || 'default';

function applyTranslation(langKey) {
    const translationSet = translations[langKey] || translations['default'];

    document.querySelectorAll('[data-i18n]').forEach(element => {
        const key = element.getAttribute('data-i18n');
        if (translationSet[key]) {
            element.textContent = translationSet[key];
        }
    });

    currentLanguage = langKey;
    const currentPath = window.location.pathname;
    const parts = currentPath.split('/');
    const key = parts[parts.length - 1];
    if (nationSection.classList.contains('active') || newsSection.classList.contains('active')) {
        updateSectionHeadings(currentPath, key);
    }
}

/**
 * @param {string} langKey
 */
function changeLanguageAndReload(langKey) {
    if (langKey) {
        localStorage.setItem('currentLang', langKey);
    }

    window.location.reload();
}

const nationData = {
    brazil: {
        images: [
            { url: 'https://dl.dir.freefiremobile.com/common/OB51/BR/Digimon_Squad_Treasure_1750x1070_BR_pt.png', startDate: '17/11/2025', bannerLink: 'https://dl.dir.freefiremobile.com/common/OB51/BR/Digimon_Squad_Treasure_1750x1070_BR_pt.png', title: '[REVENUE] Digimon Squad Treasure' },
            { url: 'https://dl.dir.freefiremobile.com/common/OB51/BR/SAMSUNG_1750x1070_BR_pt.jpg', startDate: '16/11/2025', bannerLink: 'https://shopee.com.br/m/samsung-e-freefire-na-shopee?utm_campaign=br_pd_social_youtube_a56_sustain_ac-2025GalaxyaH2-c-9mr5bq2878_video_skinFreefire-30s-na-na_awareness&utm_medium=diolv&utm_source=goads-9youtube&keeplink=true&cid=br_pd_social_youtube_a56_sustain_ac-2025GalaxyaH2-c-9mr5bq2878_video_skinFreefire-30s-na-na_awareness', title: '[BD] SAMSUNG' },
            { url: 'https://dl.dir.freefiremobile.com/common/OB51/BR/Fist_Bump_1750x1070_BR_pt.png', startDate: '15/11/2025', bannerLink: 'https://dl.dir.freefiremobile.com/common/OB51/BR/Fist_Bump_1750x1070_BR_pt.png', title: '[REVENUE] Fist Bump' },
        ]
    },
    india: {
        images: [
            { url: 'https://dl-tata.freefireind.in/common/Local/IND/config/1400x700_TheLatestUpdatesINDanno_en.jpg', startDate: '', bannerLink: 'https://www.instagram.com/freefireindiaofficial/', title: 'Instagram Garena Free Fire' },
            { url: 'https://dl-tata.freefireind.in/common/Local/IND/config/1400x700_StayInLoopAnnIND_en.jpg', startDate: '', bannerLink: 'https://www.facebook.com/freefireIND', title: 'Facebook Garena Free Fire' },
            { url: 'https://dl-tata.freefireind.in/common/Local/IND/config/1400x700_WatchTheBattleUnfoldINDAnno_en.jpg', startDate: '', bannerLink: 'https://www.youtube.com/@FreeFireIndiaOfficial', title: 'TikTok Garena Free Fire' },
        ]
    },
    indonesia: {
        images: [
            { url: 'https://dl-tata.freefireind.in/common/Local/IND/config/1750x1070_DigimonRingBizonSplashIND_en.jpg', startDate: '21/11/2025', bannerLink: 'https://dl-tata.freefireind.in/common/Local/IND/config/1750x1070_DigimonRingBizonSplashIND_en.jpg', title: 'Digimon Ring Bizon Splash' },
            { url: 'https://dl-tata.freefireind.in/common/Local/IND/config/1400x700_TheLatestUpdatesINDanno_en.jpg', startDate: '', bannerLink: 'https://www.instagram.com/freefireindiaofficial/', title: 'Instagram Garena Free Fire' },
            { url: 'https://dl-tata.freefireind.in/common/Local/IND/config/1400x700_WatchTheBattleUnfoldINDAnno_en.jpg', startDate: '', bannerLink: 'https://www.youtube.com/@FreeFireIndiaOfficial', title: 'YouTube Garena Free Fire' },
            { url: 'https://dl-tata.freefireind.in/common/Local/IND/config/1400x700_StayInLoopAnnIND_en.jpg', startDate: '', bannerLink: 'https://www.facebook.com/freefireIND', title: 'Facebook Garena Free Fire' },
        ]
    },
    pakistan: {
        images: [
            { url: 'https://dl.dir.freefiremobile.com/common/Local/BD/Splashanno/1750x1070_RingMasterArrival_en.jpg', startDate: '22/11/2025', bannerLink: 'https://dl.dir.freefiremobile.com/common/Local/BD/Splashanno/1750x1070_RingMasterArrival_en.jpg', title: 'Ring Master Arrival' },
            { url: 'https://dl.dir.freefiremobile.com/common/Local/BD/Splashanno/1750x1070_SoulLandCG_en.jpg', startDate: '22/11/2025', bannerLink: 'https://www.youtube.com/watch?v=yGHGC0y7vG4', title: 'Soul Land CG' },
            { url: 'https://dl.dir.freefiremobile.com/common/Local/BD/Splashanno/1750x1070_DigimonCG_en.jpg', startDate: '17/11/2025', bannerLink: 'youtube.com/watch?si=0hTON5Alaz4HVPFV&v=xLwoaPkUaf4&feature=youtu.be', title: 'Digimon CG' },
            { url: 'https://dl.dir.freefiremobile.com/common/Local/IND/config/1400x700_ig_en.jpg', startDate: '', bannerLink: 'https://www.instagram.com/freefirepkofficial/?hl=en', title: 'Instagram Garena Free Fire' },
            { url: 'https://dl.dir.freefiremobile.com/common/Local/IND/config/1400x700_enfb.jpg', startDate: '', bannerLink: 'https://www.facebook.com/freefireenn/?brand_redir=139274140865488#', title: 'Facebook Garena Free Fire' },
            { url: 'https://dl.dir.freefiremobile.com/common/Local/IND/config/1400x700_enyoutube.jpg', startDate: '', bannerLink: 'https://www.youtube.com/@FreeFirePakistanOfficial', title: 'YouTube Garena Free Fire' },
            { url: 'https://dl.dir.freefiremobile.com/common/Local/IND/config/1400x700_entiktok.jpg', startDate: '', bannerLink: 'https://www.tiktok.com/@garenafreefirepkofficial', title: 'TikTok Garena Free Fire' }
        ]
    },
    singapore: {
        images: [
            { url: 'https://dl.dir.freefiremobile.com/common/Local/BD/Splashanno/1750x1070_RingMasterArrival_en.jpg', startDate: '22/11/2025', bannerLink: 'https://dl.dir.freefiremobile.com/common/Local/BD/Splashanno/1750x1070_RingMasterArrival_en.jpg', title: 'Ring Master Arrival' },
            { url: 'https://dl.dir.freefiremobile.com/common/Local/BD/Splashanno/1750x1070_MetalgreymonRing1_en.jpg', startDate: '21/11/2025', bannerLink: 'https://dl.dir.freefiremobile.com/common/Local/BD/Splashanno/1750x1070_MetalgreymonRing1_en.jpg', title: 'Metalgreymon Ring' },
            { url: 'https://dl.dir.freefiremobile.com/common/Local/BD/Splashanno/1750x1070_DigimonTakeruPatamon_en.jpg', startDate: '21/11/2025', bannerLink: 'https://dl.dir.freefiremobile.com/common/Local/BD/Splashanno/1750x1070_DigimonTakeruPatamon_en.jpg', title: 'Digimon Takeru Patamon' },
            { url: 'https://dl.dir.freefiremobile.com/common/Local/BD/Splashanno/1750x1070_DigimonCG_en.jpg', startDate: '20/11/2025', bannerLink: 'youtube.com/watch?si=F-lU7CbcnUHip_S5&v=3-UwfwzJRQE&feature=youtu.be', title: 'Digimon CG' },
            { url: 'https://dl.dir.freefiremobile.com/common/Local/BD/Splashanno/1750x1070_MetalgreymonRing1_en.jpg', startDate: '20/11/2025', bannerLink: 'https://dl.dir.freefiremobile.com/common/Local/BD/Splashanno/1750x1070_MetalgreymonRing1_en.jpg', title: 'Metalgreymon Ring' },
            { url: 'https://dl.dir.freefiremobile.com/common/Local/IND/config/1400x700_ig_en.jpg', startDate: '', bannerLink: 'https://www.instagram.com/freefiremalaysiaofficial/', title: 'Instagram Garena Free Fire' },
            { url: 'https://dl.dir.freefiremobile.com/common/Local/IND/config/1400x700_enfb.jpg', startDate: '', bannerLink: 'https://www.facebook.com/freefiremalaysia/', title: 'Facebook Garena Free Fire' },
            { url: 'https://dl.dir.freefiremobile.com/common/Local/IND/config/1400x700_enyoutube.jpg', startDate: '', bannerLink: 'https://www.youtube.com/@freefiremalaysiaofficial', title: 'YouTube Garena Free Fire' },
            { url: 'https://dl.dir.freefiremobile.com/common/Local/IND/config/1400x700_entiktok.jpg', startDate: '', bannerLink: 'https://www.tiktok.com/@freefiremalaysiaofficial', title: 'TikTok Garena Free Fire' }
        ]
    },
    taiwan: {
        images: [

        ]
    },
    thailand: {
        images: [
            { url: 'https://dl.dir.freefiremobile.com/common/Local/TH/Splash/2025Nov_FA_DIGI_Weekly_Login_days_OverviewBG_1.png', startDate: '20/11/2025', bannerLink: 'https://dl.dir.freefiremobile.com/common/Local/TH/Splash/2025Nov_FA_DIGI_Weekly_Login_days_OverviewBG_1.png', title: '2025Nov FA DIGI Weekly Login days OverviewBG 1' },
            { url: 'https://dl.dir.freefiremobile.com/common/Local/TH/Splash/TH_Nov25_GroupTopup_DA.png', startDate: '21/11/2025', bannerLink: 'https://dl.dir.freefiremobile.com/common/Local/TH/Splash/TH_Nov25_GroupTopup_DA.png', title: 'Nov25 Group Topup' },
            { url: 'https://dl.dir.freefiremobile.com/common/Local/TH/Splash/2025Nov_FA_DIGI_Weekly_Deal_damage_Weapon_Type_OverviewBG_1.png', startDate: '21/11/2025', bannerLink: 'https://dl.dir.freefiremobile.com/common/Local/TH/Splash/2025Nov_FA_DIGI_Weekly_Deal_damage_Weapon_Type_OverviewBG_1.png', title: '2025Nov FA DIGI Weekly Deal damage Weapon Type OverviewBG 1' },
            { url: 'https://dl.dir.freefiremobile.com/common/Local/TH/Splash/TH_Nov25_TW5_DA_Bizon.png', startDate: '21/11/2025', bannerLink: 'https://dl.dir.freefiremobile.com/common/Local/TH/Splash/TH_Nov25_TW5_DA_Bizon.png', title: 'TH Nov25 TW5 DA Bizon' },
            { url: 'https://dl.dir.freefiremobile.com/common/Local/TH/Splash/2025Nov_FA_DIGI_FlexHigh_Playwithfriends_games_OverviewBG_1.png', startDate: '22/11/2025', bannerLink: 'https://dl.dir.freefiremobile.com/common/Local/TH/Splash/2025Nov_FA_DIGI_FlexHigh_Playwithfriends_games_OverviewBG_1.png', title: '2025Nov FA DIGI FlexHigh Playwithfriends games OverviewBG 1' },
            { url: 'https://dl.dir.freefiremobile.com/common/Local/TH/Splash/TH_Nov25_TW6_IncubatorFashionVault_PhantomBunny.png', startDate: '22/11/2025', bannerLink: 'https://dl.dir.freefiremobile.com/common/Local/TH/Splash/TH_Nov25_TW6_IncubatorFashionVault_PhantomBunny.png', title: 'TH Nov25 TW6 IncubatorFashionVault PhantomBunny' },
        ]
    },
    vietnam: {
        images: [
            { url: 'https://dl.dir.freefiremobile.com/common/Local/VN/Splash_Upload/251123_OB47VN_TW5_Incu_PEKINGOPERA.png', startDate: '23/11/2025', bannerLink: 'https://dl.dir.freefiremobile.com/common/Local/VN/Splash_Upload/251123_OB47VN_TW5_Incu_PEKINGOPERA.png', title: 'TW5 Incu PEKINGOPERA' },
            { url: 'https://dl.dir.freefiremobile.com/common/Local/VN/Splash_Upload/251121_OB47VN_TW4_Bizon_MetalGreymon.png', startDate: '21/11/2025', bannerLink: 'https://dl.dir.freefiremobile.com/common/Local/VN/Splash_Upload/251121_OB47VN_TW4_Bizon_MetalGreymon.png', title: 'TW4 Bizon MetalGreymon' },
            { url: 'https://dl.dir.freefiremobile.com/common/Local/VN/Splash_Upload/251117_OB47VN_Squad_Treasure_Digimon.png', startDate: '17/11/2025', bannerLink: 'https://dl.dir.freefiremobile.com/common/Local/VN/Splash_Upload/251117_OB47VN_Squad_Treasure_Digimon.png', title: 'Squad Treasure Digimon' },
            { url: 'https://dl.dir.freefiremobile.com/common/Local/VN/Splash_Upload/251117_OB47VN_TW3_M590_MetalGarurumon.png', startDate: '17/11/2025', bannerLink: 'https://dl.dir.freefiremobile.com/common/Local/VN/Splash_Upload/251117_OB47VN_TW3_M590_MetalGarurumon.png', title: 'TW3 M590 MetalGarurumon' },
            { url: 'https://dl.dir.freefiremobile.com/common/Local/VN/Splash_Upload/251116_OB47VN_FW3_Naatu_Naatu.png', startDate: '16/11/2025', bannerLink: 'https://dl.dir.freefiremobile.com/common/Local/VN/Splash_Upload/251116_OB47VN_FW3_Naatu_Naatu.png', title: 'FW3 Naatu Naatu' },
        ]
    },
    news: {
        images: [
            { url: 'https://dl.dir.freefiremobile.com/common/Local/VN/2025/11/FFxRedBull_20251119.png', startDate: '22/11/2025', bannerLink: 'https://redbulltcp.freefiremobile.com/?lang=vn&region=VN', title: 'FREE FIRE X REDBULL' },
            { url: 'https://dl.dir.freefiremobile.com/common/web_event/official2.ff.garena.all/202511/1ba5e066c1fa66a9b192dc6b943187cb.png', startDate: '19/11/2025', bannerLink: 'https://ff.garena.com/en/article/1566/', title: 'THAILAND’S BURIRAM UNITED ESPORTS TRIUMPHS AS FREE FIRE’S NEW WORLD CHAMPION' },
            { url: 'https://dl.dir.freefiremobile.com/common/web_event/official2.ff.garena.all/202511/94a6014336306edfca0eb84b30d62e5a.png', startDate: '20/11/2025', bannerLink: 'https://ff.garena.com/vn/article/1568/', title: 'FREE FIRE CHÍNH THỨC KHỞI ĐỘNG SỰ KIỆN HỢP TÁC CÙNG DIGIMON ADVENTURE!' },
            { url: 'https://dl.dir.freefiremobile.com/common/web_event/official2.ff.garena.all/202511/0a893ebc2f08ac6f27bdd01a6b7ffc48.jpg', startDate: '19/11/2025', bannerLink: 'https://ff.garena.com/vn/article/1564/', title: 'CUỘC THI CAPCUT AI - LỄ HỘI TUYẾT FREE FIRE' },
        ]
    },
};

const menuToggle = document.querySelector('.menu-toggle');
const navbar = document.querySelector('.navbar');
const homeSection = document.getElementById('home-section');
const nationSection = document.getElementById('nation-section');
const nationHeading = document.getElementById('nation-heading');
const imageGrid = document.getElementById('image-grid');
const contactSection = document.getElementById('contact-section');
const logoLink = document.querySelector('.logo a');
const newsSection = document.getElementById('news-section');
const newsHeading = document.getElementById('news-heading');
const newsImageGrid = document.getElementById('news-image-grid');
const gridOverlay = document.getElementById('grid-overlay');
const overlayTitle = document.getElementById('overlay-title');
const overlayDate = document.getElementById('overlay-date');
const overlayLink = document.getElementById('overlay-link');
const closeBtn = document.querySelector('.close-btn');
const overlayImage = document.getElementById('overlay-image');
const nationDropdownLi = document.querySelector('.dropdown:not(.language-selector)');
const languageSelectorLi = document.querySelector('.language-selector');
const languageLinks = document.querySelectorAll('.language-menu a');

const homeBackgrounds = [
    '/common/image/background_free_fire_22.png',
    '/common/image/background_free_fire_9.png',
    '/common/image/background_free_fire_63.png',
    '/common/image/background_free_fire_41.png',
];

let currentBgIndex = 0;
let slideshowInterval;

const layer1 = document.getElementById('background-layer-1');
const layer2 = document.getElementById('background-layer-2');

let activeLayer = layer1;
let nextLayer = layer2;

function showSection(section) {
    const allSections = document.querySelectorAll('.content-section');
    allSections.forEach(s => s.classList.remove('active'));
    section.classList.add('active');

    if (section !== homeSection) {
        clearInterval(slideshowInterval);
    }

    const body = document.body;

    if (section === nationSection || section === contactSection || section === newsSection) {
        body.classList.add('hide-footer');
    } else {
        body.classList.remove('hide-footer');
    }
    window.scrollTo(0, 0);
}

function updateSectionHeadings(path, key) {
    const t = translations[currentLanguage];

    if (path.startsWith('/nation/')) {
        const countryName = key.charAt(0).toUpperCase() + key.slice(1);
        nationHeading.textContent = `${t['select_country']}: ${countryName}`;
    }
    else if (path === '/nation') {
        nationHeading.textContent = `${t['select_country']} - ${t['select_prompt']}`;
    }
    else if (path === '/news') {
        newsHeading.textContent = t['news_heading'];
    }
}

function handleRouting(path, key) {
    const allNavLinks = document.querySelectorAll('.nav-links a');
    allNavLinks.forEach(link => {
        link.classList.remove('active');
        const linkPath = link.getAttribute('href');

        if (linkPath === path ||
            (path.startsWith('/nation/') && (linkPath === '/nation' || (linkPath === `/nation/${key}`))) ||
            (path === '/' && linkPath === '/')
        ) {
            link.classList.add('active');
        }
    });

    if (path === '/') {
        showSection(homeSection);
        nationHeading.textContent = '';
    }
    else if (path.startsWith('/nation/')) {
        showSection(nationSection);
        updateSectionHeadings(path, key);
        displayImages(key, false);
    }
    else if (path === '/nation') {
        showSection(nationSection);
        updateSectionHeadings(path, key);
        displayImages('default', false);
    }
    else if (path === '/news') {
        showSection(newsSection);
        updateSectionHeadings(path, key);
        displayImages('news', true);
    }
    else if (path === '/contact') {
        showSection(contactSection);
    } else {
        showSection(homeSection);
    }

    window.history.pushState({}, '', path);
}


function getEventStatus(startDateString) {
    const t = translations[currentLanguage];
    if (!startDateString) {
        return { status: 'none', label: '' };
    }

    const parts = startDateString.split('/');
    if (parts.length !== 3) {
        return { status: 'none', label: '' };
    }
    const [day, month, year] = parts.map(Number);
    const startDate = new Date(year, month - 1, day);

    if (isNaN(startDate.getTime())) {
        return { status: 'none', label: '' };
    }

    const now = new Date();
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const eventDay = new Date(startDate.getFullYear(), startDate.getMonth(), startDate.getDate());

    if (eventDay <= today) {
        return { status: 'active', label: t['active'] };
    } else {
        return { status: 'upcoming', label: t['upcoming'] };
    }
}

function convertDateStringToDate(dateString) {
    if (!dateString) {
        return new Date(0);
    }
    const parts = dateString.split('/');
    if (parts.length !== 3) {
        return new Date(0);
    }
    const [day, month, year] = parts.map(Number);
    return new Date(Date.UTC(year, month - 1, day));
}

function displayImages(key, isNews = false) {
    const targetGrid = isNews ? newsImageGrid : imageGrid;
    const data = nationData[key];
    const t = translations[currentLanguage];

    let images = data && data.images ? data.images : [];

    targetGrid.innerHTML = '';

    if (!targetGrid) {
        console.error("Target grid element not found.");
        return;
    }

    if (images.length === 0 || key === 'default') {
        targetGrid.style.display = 'flex';
        targetGrid.style.flexDirection = 'column';
        targetGrid.style.justifyContent = 'center';
        targetGrid.style.alignItems = 'center';
        targetGrid.style.minHeight = 'calc(100vh - 80px)';
        targetGrid.style.width = '100%';
        targetGrid.style.padding = '0';

        let message = '';
        if (key === 'default') {
            message = `<h1>${t['select_prompt']}</h1><p>Or, this nation is currently updating its banner data.</p>`;
        } else if (isNews) {
            message = `<h1>${t['update_news']}</h1><p>Please check back later for the latest news.</p>`;
        } else {
            message = `<h1>${t['update_banner']}</h1><p>Please check back later.</p>`;
        }

        targetGrid.innerHTML = `
        <div style="
            text-align: center;
            width: 90%;
            max-width: 400px;
            padding: 50px 20px;
            color: #aaa;
            box-sizing: border-box;
        ">${message}</div>
        `;
        return;
    }

    targetGrid.style.display = '';
    targetGrid.style.flexDirection = '';
    targetGrid.style.justifyContent = '';
    targetGrid.style.alignItems = '';
    targetGrid.style.minHeight = '';
    targetGrid.style.width = '';
    targetGrid.style.padding = '';

    images.sort((a, b) => {
        const dateA = convertDateStringToDate(a.startDate);
        const dateB = convertDateStringToDate(b.startDate);

        if (dateA.getTime() === 0 && dateB.getTime() === 0) {
            return 0;
        }
        if (dateA.getTime() === 0) {
            return 1;
        }
        if (dateB.getTime() === 0) {
            return -1;
        }
        return dateB.getTime() - dateA.getTime();
    });

    images.forEach((imageData, index) => {
        const gridItem = document.createElement('div');
        gridItem.classList.add('grid-item');
        gridItem.dataset.key = key;
        gridItem.dataset.index = index;
        gridItem.style.order = index;

        if (!isNews) {
            const { status, label } = getEventStatus(imageData.startDate);
            if (status !== 'none') {
                const badgeElement = document.createElement('div');
                badgeElement.classList.add('event-badge', `${status}-event`);
                badgeElement.textContent = label;
                badgeElement.style.display = 'block';
                gridItem.appendChild(badgeElement);
            }
        }

        const imgElement = document.createElement('img');
        imgElement.src = imageData.url;
        imgElement.alt = `${key} image`;

        const titleElement = document.createElement('p');
        titleElement.classList.add('grid-item-title');
        titleElement.textContent = imageData.title || t['no_title'];

        const tempImage = new Image();

        tempImage.onload = () => {
            gridItem.appendChild(imgElement);
            gridItem.appendChild(titleElement);
            targetGrid.appendChild(gridItem);
        };

        tempImage.onerror = () => {
            const updatingDiv = document.createElement('div');
            updatingDiv.textContent = 'Updating...';
            updatingDiv.classList.add('updating-message');

            gridItem.appendChild(updatingDiv);
            gridItem.appendChild(titleElement);
            targetGrid.appendChild(gridItem);
        };

        if (imageData.url) {
            tempImage.src = imageData.url;
        } else {
            tempImage.onerror();
        }
    });
}

const navLinks = document.querySelectorAll('.nav-links a');

navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();

        const path = e.target.getAttribute('href');
        const parts = path.split('/');
        const key = parts[parts.length - 1];
        const parentLi = e.target.closest('li');
        const isDropdownLink = (parentLi && parentLi.classList.contains('dropdown'));
        const isCountryLink = (parentLi && parentLi.closest('.dropdown-menu') && !parentLi.classList.contains('language-selector'));
        const isLanguageLink = (parentLi && parentLi.closest('.language-menu'));


        if (window.innerWidth <= 768) {
            // Xử lý toggle cho dropdown Nation
            if (isDropdownLink && !isCountryLink && path === '/nation') {
                if (nationDropdownLi) {
                    nationDropdownLi.classList.toggle('active');
                }
                handleRouting(path, 'default');
                return;
            }

            if (parentLi && parentLi.classList.contains('language-selector')) {
                languageSelectorLi.classList.toggle('active');
                return;
            }

            if (isCountryLink || path === '/' || path === '/contact' || path === '/news') {
                navbar.classList.remove('active');
                if (nationDropdownLi) {
                    nationDropdownLi.classList.remove('active');
                }
                if (languageSelectorLi) {
                    languageSelectorLi.classList.remove('active');
                }
                const menuIcon = menuToggle.querySelector('i');
                menuIcon.classList.remove('fa-times');
                menuIcon.classList.add('fa-bars');
            }
        }

        if (path.startsWith('http://') || path.startsWith('https://') || path === '#') {
            if (path.startsWith('http') || path.startsWith('https')) {
                window.open(path, '_blank');
            }
            return;
        }

        handleRouting(path, key);

        setTimeout(startBackgroundSlideshow, 50); // Khởi động lại slideshow nếu quay về Home
    });
});


logoLink.addEventListener('click', (e) => {
    e.preventDefault();
    handleRouting('/', '');
    setTimeout(startBackgroundSlideshow, 50);
});

languageLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();

        const selectedLangKey = e.target.dataset.lang;

        if (selectedLangKey === 'vietnam' || selectedLangKey === 'default') {
            changeLanguageAndReload(selectedLangKey);
        }
    });
});

[imageGrid, newsImageGrid].forEach(grid => {
    if (grid) {
        grid.addEventListener('click', (e) => {
            const target = e.target.closest('.grid-item');
            if (!target) return;

            const t = translations[currentLanguage];
            const key = target.dataset.key;
            const index = target.dataset.index;

            const keyData = nationData[key];
            let data = null;
            if (!keyData || !keyData.images || !keyData.images[index]) return;

            data = keyData.images[index];
            const isNewsItem = (key === 'news');

            if (target.querySelector('.updating-message')) {
                overlayImage.style.display = 'none';
            } else {
                overlayImage.style.display = 'block';
                overlayImage.src = data.url;
            }

            if (data) {
                overlayTitle.textContent = data.title || t['no_title'];
                const datePrefix = isNewsItem ? t['date_posting'] : t['start_date'];
                overlayDate.textContent = `${datePrefix}: ${data.startDate || 'N/A'}`;

                overlayLink.textContent = t['link_access'];
                overlayLink.href = data.bannerLink || '#';
                overlayLink.target = '_blank';
                gridOverlay.style.display = 'flex';
            }
        });
    }
});

closeBtn.addEventListener('click', () => {
    gridOverlay.style.display = 'none';
});

gridOverlay.addEventListener('click', (e) => {
    if (e.target === gridOverlay) {
        gridOverlay.style.display = 'none';
    }
});

window.addEventListener('popstate', () => {
    const currentPath = window.location.pathname;
    const parts = currentPath.split('/');
    const key = parts[parts.length - 1];

    handleRouting(currentPath, key);
});

menuToggle.addEventListener('click', () => {
    navbar.classList.toggle('active');
    const menuIcon = menuToggle.querySelector('i');

    if (navbar.classList.contains('active')) {
        menuIcon.classList.remove('fa-bars');
        menuIcon.classList.add('fa-times');
    } else {
        menuIcon.classList.remove('fa-times');
        menuIcon.classList.add('fa-bars');
        if (nationDropdownLi) {
            nationDropdownLi.classList.remove('active');
        }
        if (languageSelectorLi) {
            languageSelectorLi.classList.remove('active');
        }
    }
});

function preloadImages(imageUrls) {
    const promises = imageUrls.map(url => {
        return new Promise((resolve) => {
            const img = new Image();
            img.onload = resolve;
            img.onerror = resolve;
            img.src = url;
        });
    });
    return Promise.all(promises);
}

function changeBackground() {
    const totalImages = homeBackgrounds.length;
    if (totalImages < 2) return;

    currentBgIndex = (currentBgIndex + 1) % totalImages;

    const nextNextBgIndex = (currentBgIndex + 1) % totalImages;

    activeLayer.classList.remove('active');

    // Swap layers
    [activeLayer, nextLayer] = [nextLayer, activeLayer];

    activeLayer.classList.add('active');

    setTimeout(() => {
        nextLayer.style.backgroundImage = `url('${homeBackgrounds[nextNextBgIndex]}')`;
    }, 2000);
}

function startBackgroundSlideshow() {
    const totalImages = homeBackgrounds.length;
    if (!homeSection || totalImages === 0) return;

    if (slideshowInterval) {
        clearInterval(slideshowInterval);
    }

    if (!homeSection.classList.contains('active')) {
        return;
    }

    preloadImages(homeBackgrounds)
        .then(() => {
            if (totalImages === 1) {
                layer1.style.backgroundImage = `url('${homeBackgrounds[0]}')`;
                layer1.classList.add('active');
                layer2.classList.remove('active');
                return;
            }

            layer1.style.backgroundImage = `url('${homeBackgrounds[0]}')`;
            layer1.classList.add('active');

            const nextIndex = (currentBgIndex + 1) % totalImages;
            layer2.style.backgroundImage = `url('${homeBackgrounds[nextIndex]}')`;
            layer2.classList.remove('active');

            activeLayer = layer1;
            nextLayer = layer2;
            currentBgIndex = 0;

            slideshowInterval = setInterval(changeBackground, 5000);
        });
}

document.addEventListener('DOMContentLoaded', () => {
    // applyTranslation sẽ sử dụng giá trị currentLanguage đã được tải từ localStorage
    applyTranslation(currentLanguage);

    const currentPath = window.location.pathname;
    const parts = currentPath.split('/');
    const key = parts[parts.length - 1];

    handleRouting(currentPath, key);

    setTimeout(startBackgroundSlideshow, 100);
});