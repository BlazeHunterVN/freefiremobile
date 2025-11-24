// ====================================================================
// ⭐ BƯỚC 1: CẤU HÌNH SUPABASE API (PHẢI THAY THẾ DỮ LIỆU THẬT) ⭐
// ====================================================================
const SUPABASE_URL = 'https://htesrjwwfctvimxilaus.supabase.co';
const SUPABASE_KEY = 'sb_publishable_yQTpJNR016GW-pImgH4K9A_Xk3_kH6r'; // Khóa công khai để đọc dữ liệu (anon key)
const SUPABASE_TABLE = 'nation_banners'; // Tên bảng bạn đã tạo trong Supabase

// ====================================================================

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
    if (nationSection && newsSection && (nationSection.classList.contains('active') || newsSection.classList.contains('active'))) {
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

// ====================================================================
// ⭐ BƯỚC 2: DỮ LIỆU MẶC ĐỊNH (FALLBACK) VÀ KHỞI TẠO NATION DATA ⭐
// (ĐÃ XÓA TẤT CẢ DỮ LIỆU MẪU CỨNG)
// ====================================================================
const initialNationData = {
    // Chỉ giữ lại các key chính để đảm bảo cấu trúc nationData luôn sẵn sàng.
    brazil: { images: [] },
    india: { images: [] },
    indonesia: { images: [] },
    pakistan: { images: [] },
    singapore: { images: [] },
    taiwan: { images: [] },
    thailand: { images: [] },
    vietnam: { images: [] },
    news: { images: [] },
};

const nationData = initialNationData;

/**
 * Lấy dữ liệu từ Supabase API và chuyển đổi nó thành cấu trúc nationData.
 */
async function fetchDataFromAPI() {
    if (!SUPABASE_URL || SUPABASE_URL === 'YOUR_SUPABASE_URL') {
        console.warn("SUPABASE_URL chưa được cấu hình. Sử dụng dữ liệu mặc định.");
        return; // Dùng dữ liệu mặc định (initialNationData trống)
    }

    try {
        const response = await fetch(`${SUPABASE_URL}/rest/v1/${SUPABASE_TABLE}?select=*`, {
            headers: {
                'apikey': SUPABASE_KEY,
                'Authorization': `Bearer ${SUPABASE_KEY}`
            }
        });

        if (!response.ok) {
            console.error("Lỗi API Supabase, Status:", response.status);
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const rawData = await response.json();

        // 1. Xóa tất cả các mảng images hiện tại (dữ liệu cứng/trống)
        // Lấy danh sách keys từ dữ liệu đã load (nếu có key mới) và keys cũ
        const allKeys = new Set([...Object.keys(nationData), ...rawData.map(item => item.nation_key)]);

        // Xóa/khởi tạo lại mảng images cho tất cả các key (cũ và mới)
        allKeys.forEach(key => {
            if (!nationData[key]) {
                nationData[key] = { images: [] };
            } else {
                nationData[key].images = []; // Xóa dữ liệu cũ trong nationData
            }
        });

        // 2. Tái tạo cấu trúc nationData từ dữ liệu API
        rawData.forEach(item => {
            const nationKey = item.nation_key; // Đảm bảo khớp với tên cột trong Supabase

            // Đảm bảo key tồn tại trước khi push (đã được xử lý ở bước 1, nhưng thêm kiểm tra an toàn)
            if (!nationData[nationKey]) {
                nationData[nationKey] = { images: [] };
            }

            nationData[nationKey].images.push({
                url: item.url,
                startDate: item.start_date,
                bannerLink: item.banner_link,
                title: item.title
            });
        });

        console.log("Dữ liệu đã được tải từ Supabase thành công!");

    } catch (error) {
        console.error("Không thể tải dữ liệu từ Supabase. Tiếp tục sử dụng dữ liệu mặc định/cũ.", error);
    }
}


const IK_URL_ENDPOINT = "https://ik.imagekit.io/blazehunter/";

/**
 * Kiểm tra xem URL có phải là của ImageKit không
 * @param {string} url
 * @returns {boolean}
 */
function isImageKitUrl(url) {
    // Kiểm tra xem url có tồn tại và có bao gồm endpoint không
    return url && typeof url === 'string' && url.includes(IK_URL_ENDPOINT);
}

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
// Lấy thẻ li cha của dropdown quốc gia
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
    if (!section) return;
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

    if (!nationHeading || !newsHeading) return;

    if (path.startsWith('/nation/')) {
        // Xử lý key thành tên hiển thị (ví dụ: vietnam -> Vietnam)
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
        if (nationHeading) nationHeading.textContent = '';
    }
    else if (path.startsWith('/nation/')) {
        showSection(nationSection);
        updateSectionHeadings(path, key);
        displayImages(key, false);
    }
    else if (path === '/nation') {
        showSection(nationSection);
        updateSectionHeadings(path, key);
        // Hiển thị nội dung mặc định khi chưa chọn quốc gia (dữ liệu trống)
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
    // Sử dụng Date.UTC để tránh lỗi múi giờ
    const startDate = new Date(Date.UTC(year, month - 1, day));

    if (isNaN(startDate.getTime())) {
        return { status: 'none', label: '' };
    }

    const now = new Date();
    // Tạo ngày hôm nay theo UTC để so sánh công bằng
    const today = new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate()));

    // So sánh ngày (bỏ qua giờ)
    const eventDay = new Date(startDate.getUTCFullYear(), startDate.getUTCMonth(), startDate.getUTCDate());

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
    // Sử dụng Date.UTC để sắp xếp ngày chính xác
    return new Date(Date.UTC(year, month - 1, day));
}


/**
 * Tạo thuộc tính ảnh tối ưu (src, srcset, sizes)
 * @param {string} imageDataUrl - URL đầy đủ của ảnh
 * @param {string} altText - Văn bản thay thế (alt)
 * @returns {object} - Một đối tượng chứa các thuộc tính (src, srcset, sizes, alt)
 */
function getOptimizedImageAttributes(imageDataUrl, altText) {
    const defaultAttributes = {
        src: imageDataUrl || '',
        alt: altText,
    };

    if (window.ImageKit && isImageKitUrl(imageDataUrl)) {

        const relativePath = imageDataUrl.replace(IK_URL_ENDPOINT, '');

        try {
            return window.ImageKit.getResponsiveImageAttributes({
                urlEndpoint: IK_URL_ENDPOINT,
                src: relativePath,
                sizes: "(min-width: 800px) 30vw, 100vw",
                transformation: [{
                    format: "auto",
                    crop: "at_max"
                }],
                alt: altText
            });
        } catch (error) {
            console.error("ImageKit SDK error:", error, imageDataUrl);
            return defaultAttributes;
        }
    }

    return defaultAttributes;
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

    if (images.length === 0 || key === 'default' || !nationData[key]) {
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
        const altText = imageData.title || t['no_title'];

        const finalAttributes = getOptimizedImageAttributes(imageData.url, altText);

        Object.assign(imgElement, finalAttributes);

        imgElement.onerror = () => {

            const updatingDiv = document.createElement('div');
            updatingDiv.textContent = 'Updating...';
            updatingDiv.classList.add('updating-message');

            if (imgElement.parentNode) {
                imgElement.parentNode.replaceChild(updatingDiv, imgElement);
            }
        };

        gridItem.appendChild(imgElement);

        const titleElement = document.createElement('p');
        titleElement.classList.add('grid-item-title');
        titleElement.textContent = altText;
        gridItem.appendChild(titleElement);

        targetGrid.appendChild(gridItem);

    });
}

/**
 * Hàm tách riêng xử lý click cho các link điều hướng
 */
function handleNavLinkClick(e) {
    e.preventDefault();

    const path = e.target.getAttribute('href');
    const parts = path.split('/');
    const key = parts[parts.length - 1];
    const parentLi = e.target.closest('li');
    const isDropdownLink = (parentLi && parentLi.classList.contains('dropdown'));
    const isCountryLink = (parentLi && parentLi.closest('.dropdown-menu') && !parentLi.classList.contains('language-selector'));

    // Logic xử lý đóng/mở menu mobile
    if (window.innerWidth <= 768) {
        if (isDropdownLink && path === '/nation') {
            if (nationDropdownLi) {
                nationDropdownLi.classList.toggle('active');
            }
            // Không chuyển trang, chỉ mở dropdown nếu đang ở mobile
            return;
        }

        if (parentLi && parentLi.classList.contains('language-selector')) {
            if (languageSelectorLi) languageSelectorLi.classList.toggle('active');
            return;
        }

        // Đóng menu mobile sau khi chọn link
        if (isCountryLink || path === '/' || path === '/contact' || path === '/news') {
            if (navbar) navbar.classList.remove('active');
            if (nationDropdownLi) {
                nationDropdownLi.classList.remove('active');
            }
            if (languageSelectorLi) {
                languageSelectorLi.classList.remove('active');
            }
            if (menuToggle) {
                const menuIcon = menuToggle.querySelector('i');
                if (menuIcon) {
                    menuIcon.classList.remove('fa-times');
                    menuIcon.classList.add('fa-bars');
                }
            }
        }
    }

    // Xử lý link ngoài
    if (path.startsWith('http://') || path.startsWith('https://') || path === '#') {
        if (path.startsWith('http') || path.startsWith('https')) {
            window.open(path, '_blank');
        }
        return;
    }

    handleRouting(path, key);
    setTimeout(startBackgroundSlideshow, 50);
}


// Gán event listener cho tất cả các link (sau khi dropdown đã được tạo động)
// Chúng ta sẽ gán lại khi tạo dropdown
let navLinks = document.querySelectorAll('.nav-links a');

function attachAllNavLinkListeners() {
    navLinks.forEach(link => {
        // Gỡ bỏ listener cũ nếu có để tránh gọi nhiều lần
        link.removeEventListener('click', handleNavLinkClick);
        link.addEventListener('click', handleNavLinkClick);
    });
}

// ====================================================================
// ⭐ HÀM TẠO DROPDOWN TỪ DỮ LIỆU TẢI XUỐNG ⭐
// ====================================================================

function populateNationDropdown() {
    const dropdownMenu = nationDropdownLi ? nationDropdownLi.querySelector('.dropdown-menu') : null;
    if (!dropdownMenu) {
        console.error("Nation Dropdown container not found.");
        return;
    }

    // Xóa tất cả các mục quốc gia cũ
    dropdownMenu.innerHTML = '';

    // Lấy danh sách các key, loại trừ 'news' và sắp xếp
    const nationKeys = Object.keys(nationData)
        .filter(key => key !== 'news' && key !== 'default')
        .sort();

    // Tạo các mục menu mới
    nationKeys.forEach(key => {
        const li = document.createElement('li');
        const a = document.createElement('a');

        // Chuyển key thành định dạng tên quốc gia hiển thị
        const countryName = key.charAt(0).toUpperCase() + key.slice(1);

        a.href = `/nation/${key}`;
        a.textContent = countryName;
        a.classList.add('nation-link');

        li.appendChild(a);
        dropdownMenu.appendChild(li);
    });

    // Sau khi tạo lại các link quốc gia, cần cập nhật lại navLinks và gán lại listener
    navLinks = document.querySelectorAll('.nav-links a');
    attachAllNavLinkListeners();

    console.log(`Đã tạo ${nationKeys.length} mục quốc gia từ dữ liệu.`);
}

// Xử lý click logo
if (logoLink) {
    logoLink.addEventListener('click', (e) => {
        e.preventDefault();
        handleRouting('/', '');
        setTimeout(startBackgroundSlideshow, 50);
    });
}

// Xử lý thay đổi ngôn ngữ
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
                if (overlayImage) overlayImage.style.display = 'none';
            } else {
                if (overlayImage) {
                    overlayImage.style.display = 'block';

                    const altText = data.title || t['no_title'];
                    const overlayAttrs = getOptimizedImageAttributes(data.url, altText);

                    overlayImage.src = overlayAttrs.src;
                    overlayImage.alt = overlayAttrs.alt;
                }
            }

            if (data && overlayTitle && overlayDate && overlayLink && gridOverlay) {
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

if (closeBtn) {
    closeBtn.addEventListener('click', () => {
        if (gridOverlay) gridOverlay.style.display = 'none';
    });
}

if (gridOverlay) {
    gridOverlay.addEventListener('click', (e) => {
        if (e.target === gridOverlay) {
            gridOverlay.style.display = 'none';
        }
    });
}

window.addEventListener('popstate', () => {
    const currentPath = window.location.pathname;
    const parts = currentPath.split('/');
    const key = parts[parts.length - 1];

    handleRouting(currentPath, key);
});

if (menuToggle) {
    menuToggle.addEventListener('click', () => {
        if (!navbar) return;
        navbar.classList.toggle('active');
        const menuIcon = menuToggle.querySelector('i');
        if (!menuIcon) return;

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
}

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
    if (!activeLayer || !nextLayer) return;
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
    if (!homeSection || totalImages === 0 || !layer1 || !layer2) return;

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

// ====================================================================
// ⭐ BƯỚC 4: HÀM KHỞI TẠO CHÍNH ⭐
// ====================================================================

document.addEventListener('DOMContentLoaded', async () => {
    applyTranslation(currentLanguage);

    // 1. Tải dữ liệu từ Supabase API 
    await fetchDataFromAPI();

    // 2. TẠO DANH SÁCH QUỐC GIA TỰ ĐỘNG
    populateNationDropdown();

    // 3. Xử lý routing và hiển thị nội dung
    const currentPath = window.location.pathname;
    const parts = currentPath.split('/');
    const key = parts[parts.length - 1];

    handleRouting(currentPath, key);

    setTimeout(startBackgroundSlideshow, 100);
});