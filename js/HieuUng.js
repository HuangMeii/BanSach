//   Hiệu ứng 1 
$(document).ready(function(){
    $(".owl-carousel").owlCarousel({
    loop: true,
    margin: 20,
    center: true,
    nav: false,
    dots: true,
    autoplay: true,
    autoplayTimeout: 2000,
    autoplayHoverPause: false,
    smartSpeed: 500,
    responsive: {
        0: { 
        items: 1,
        margin: 0
        },
        800: { 
        items: 3,
        margin: 10
        }
    },
    onInitialized: centerItem,
    onChanged: centerItem
    });

    function centerItem(event) {
    $('.owl-item').removeClass('center');

    // Chỉ chọn các item thực (loại bỏ .cloned)
    const $activeItems = $('.owl-item.active').not('.cloned');
    const centerIndex = Math.floor($activeItems.length / 2);

    $activeItems.eq(centerIndex).addClass('center');
    }



});
  
  
  // Hiệu ứng 2 - cuộn trang
  const t1 = document.querySelector(".title-1");
  const t2 = document.querySelector(".title-2");
  const t3 = document.querySelector(".title-3");
  const t4 = document.querySelector(".title-4");
  const finalSection = document.getElementById("final-section");
  const emptySpace = document.getElementById("empty-space");

  const floatingElements = [];
  let floatingElementsActivated = false;

  window.addEventListener("scroll", () => {
    const scrollY = window.scrollY;
    const vh = window.innerHeight;
    const totalHeight = document.body.scrollHeight;

    // Kiểm tra có đang ở layout 1 không
    if (scrollY < vh) {
      [t1, t2, t3, t4].forEach(t => t.classList.remove("visible"));
      deactivateFloatingElements();
      floatingElementsActivated = false;
      return;
    }

    // Kích hoạt hoặc tắt 
    if (!floatingElementsActivated && scrollY > 3 * vh) {
      activateFloatingElements();
      floatingElementsActivated = true;
    } else if (floatingElementsActivated && scrollY < 5 * vh - 200) {
      deactivateFloatingElements();
      floatingElementsActivated = false;
    }

    // Hiệu ứng 
    if (scrollY + vh >= totalHeight - 500) {
      [t1, t2, t3, t4].forEach(t => t.classList.remove("visible"));
      finalSection.classList.add("visible");
    } else {
      [t1, t2, t3, t4].forEach(t => {
        t.classList.remove("visible");
        t.style.transform = "translate(-50%, -50%)";
      });

      if (scrollY < 2 * vh) {
        t1.classList.add("visible");
        t1.style.transform = `translate(calc(-50% - ${(scrollY - vh) * 0.4}px), -50%)`;
      } else if (scrollY < 3 * vh) {
        t2.classList.add("visible");
        t2.style.transform = `translate(calc(-50% + ${(scrollY - 2 * vh) * 0.4}px), -50%)`;
      } else if (scrollY < 4 * vh) {
        t3.classList.add("visible");
        const scale3 = 1 + (scrollY - 3 * vh) * 0.001;
        const move3 = (scrollY - 3 * vh) * 0.4;
        t3.style.transform = `translate(calc(-50% + ${move3}px), -50%) scale(${scale3})`;
      } else if (scrollY < 5 * vh) {
        t4.classList.add("visible");
        const scale4 = 1 + (scrollY - 4 * vh) * 0.001;
        const move4 = (scrollY - 4 * vh) * 0.4;
        t4.style.transform = `translate(calc(-50% - ${move4}px), -50%) scale(${scale4})`;
      }

      finalSection.classList.remove("visible");
    }
  });

  // Hiệu ứng 3 - Trôi nổi ảnh
  function activateFloatingElements() {
    const NUM_ELEMENTS = 8;
    const NguonAnh = [
    'picture/poster/dacnhantam.png',
    'picture/poster/tutodenvidai.jpg',
    'picture/poster/nhagiakim.jpg',
    'picture/poster/nhungnguoikhonkho.jpg',
    'picture/poster/luocsuloainguoi.png', 
    'picture/poster/tuduynhanhcham.jpg',
    'picture/demenphieuluuki.jpg',
    'picture/thaotungtamli.jpg',
  ];
    const width = window.innerWidth;
    const height = window.innerHeight;

    for (let i = 0; i < NUM_ELEMENTS; i++) {
      const el = document.createElement('div');
      el.className = 'floating';

      const img = document.createElement('img');
      img.src = NguonAnh[i]; 
      img.alt = `Ảnh ${i + 1}`;
      img.style.width = '100%'; 
      img.style.height = '100%';
      img.style.zIndex = '20'; 
      img.style.objectFit = 'cover'; 
      
      el.appendChild(img);
      document.body.appendChild(el);

      const edge = Math.floor(Math.random() * 4);
      let startX, startY, deltaX, deltaY;

      switch (edge) {
        case 0:
          startX = -130;
          startY = Math.random() * height;
          deltaX = width + 200;
          deltaY = (Math.random() - 0.5) * 300;
          break;
        case 1:
          startX = Math.random() * width;
          startY = -70;
          deltaX = (Math.random() - 0.5) * 300;
          deltaY = height + 200;
          break;
        case 2:
          startX = width + 130;
          startY = Math.random() * height;
          deltaX = - (width + 200);
          deltaY = (Math.random() - 0.5) * 300;
          break;
        case 3:
          startX = Math.random() * width;
          startY = height + 70;
          deltaX = (Math.random() - 0.5) * 300;
          deltaY = - (height + 200);
          break;
      }

      el.style.left = startX + 'px';
      el.style.top = startY + 'px';

      const duration = Math.random() * 20 + 20;
      const delay = Math.random() * 3;
      const animationName = `float${i}-${Date.now()}`;

      // Tạo stylesheet động nếu chưa có
      let styleSheet = document.getElementById('dynamic-styles');
      if (!styleSheet) {
        styleSheet = document.createElement('style');
        styleSheet.id = 'dynamic-styles';
        document.head.appendChild(styleSheet);
      }
      
      styleSheet.sheet.insertRule(`
        @keyframes ${animationName} {
          0% { transform: translate(0, 0); }
          100% { transform: translate(${deltaX}px, ${deltaY}px); }
        }
      `, styleSheet.sheet.cssRules.length);

      el.style.animationName = animationName;
      el.style.animationDuration = duration + 's';
      el.style.animationDelay = delay + 's';
      el.style.animationIterationCount = 'infinite';
      el.style.animationTimingFunction = 'linear';

      el.classList.add('visible');
      document.body.appendChild(el);
      floatingElements.push(el);
    }
  }

  // Hàm tắt 
  function deactivateFloatingElements() {
    floatingElements.forEach(el => {
      el.classList.remove('visible');
      el.remove();
    });
    floatingElements.length = 0;
  }

