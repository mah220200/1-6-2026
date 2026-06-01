// Tập hợp love được chạm
const loveTaps = new Set();
let userName = '';

function startApp() {
  const stageIds = ['cardStage', 'startStage', 'inputStage', 'loveStage'];
  const stages = Object.fromEntries(stageIds.map(id => [id, document.getElementById(id)]));

  if (Object.values(stages).some(stage => !stage)) {
    console.error('Thiếu một trong các element stage!');
    return;
  }

  stages.startStage.style.display = 'none';
  stages.inputStage.style.display = 'block';
  stages.loveStage.style.display = 'none';
  stages.cardStage.style.display = 'none';

  document.getElementById('bgMusic')?.play().catch(err =>
    console.warn('Không thể phát nhạc:', err)
  );

  inipesan();
}

// Hiệu ứng gõ chữ
typeWriterEffect = (text, elementId, callback) => {
  const element = document.getElementById(elementId);
  if (!element) {
    console.error(`Không tìm thấy element với ID: ${elementId}`);
    return;
  }

  let i = 0;
  const speed = 50;
  element.textContent = '';

  const type = () => {
    if (i < text.length) {
      element.textContent += text.charAt(i);
      i++;
      setTimeout(type, speed);
    } else {
      console.log('Hiệu ứng gõ hoàn tất');
      callback?.();
    }
  };

  type();
};

function switchStage(fromId, toId, withFade = false) {
  const fromElement = document.getElementById(fromId);
  const toElement = document.getElementById(toId);

  if (!fromElement || !toElement) {
    console.error(`Không tìm thấy element: ${fromId} hoặc ${toId}`);
    return;
  }

  if (withFade) {
    fromElement.classList.add('hidden');
    setTimeout(() => {
      fromElement.style.display = 'none';
      toElement.style.display = 'block';
    }, 1000);
  } else {
    fromElement.style.display = 'none';
    toElement.style.display = 'block';
  }
}

function tapLove(id) {
  if (loveTaps.has(id)) return;

  const loveIcon = document.querySelector(`#loveIcons .love-icon:nth-child(${id})`);
  loveIcon.classList.add('tapped');
  loveTaps.add(id);
  console.log(`Chạm love ${id}, tổng: ${loveTaps.size}`);

  if (loveTaps.size === 5) {
    Swal.fire({
      title: 'Đủ love rồi nè!',
      text: 'Sẵn sàng nhận quà chưa nì Be ? 💖',
      timer: 1500,
      showConfirmButton: false,
      background: '#fffbe7',
      customClass: { title: 'swal-title', content: 'swal-text' }
    }).then(() => {
      switchStage('loveStage', 'cardStage', true);

      const loveMsg = document.getElementById('loveMsg');
      if (!loveMsg) return console.error('Không tìm thấy element loveMsg!');

      typeWriterEffect(
        `Chúc ${userName} của anh 1/6 thật vui vẻ như đứa trẻ, như một nữ hoàng 👑...

        Ngày 1/6 thật vui vẻ, hạnh phúc và ngập tràn tiếng cười.Mong rằng dù hôm nay hay những ngày sau này, em vẫn luôn giữ được sự hồn nhiên, đáng yêu và năng lượng tích cực của riêng mình.Anh hy vọng mọi điều tốt đẹp nhất sẽ đến với em, những điều em mong muốn sẽ dần trở thành hiện thực, những khó khăn sẽ chỉ là những bài học giúp em mạnh mẽ hơn.

        Cảm ơn em vì đã xuất hiện và mang đến cho mọi người xung quanh rất nhiều niềm vui.Hãy luôn tự tin vào bản thân, luôn mỉm cười nhé.Mong em vẫn giữ được trái tim ấm áp và sự lạc quan của mình.

        Hôm nay là ngày của cô gái đáng yêu, nên anh chúc em nhận được thật nhiều yêu thương, thật nhiều quà, thật nhiều lời chúc và có những khoảnh khắc đáng nhớ bên gia đình, bạn bè.Chúc em luôn khỏe mạnh, học tập tốt, ngày càng xinh đẹp và vẫn giữ được nét ngây thơ, dễ thương.

        Chúc cho nụ cười của em luôn rạng rỡ như ánh nắng đầu hè,đôi mắt luôn ánh lên niềm vui là một ngày đáng nhớ.Dù em có lớn bao nhiêu thì trong tim anh, em vẫn là công chúa bé bỏng cần được iu chiều mỗi ngày! 💘.

        Và cuối cùng, anh chỉ mong dù sau này có thế nào đi nữa, em vẫn luôn vui vẻ, bình an và gặp được những điều xứng đáng nhất với mình. Chúc cô gái nhỏ của anh có một ngày 1/6 thật trọn vẹn nhé. 💙🌷`,

        'loveMsg',
        () => {
          const fromTag = document.createElement("div");
          fromTag.id = 'fromTag';
          fromTag.textContent = "From: Mah";
          fromTag.style.marginTop = "20px";
          fromTag.style.opacity = "0";
          fromTag.style.transition = "opacity 1s ease";
          loveMsg.appendChild(fromTag);

          setTimeout(() => {
            fromTag.style.opacity = "1";
          }, 500);
        }
      );
    });
  }
}

async function inipesan() {
  const { value: typedName } = await Swal.fire({
    title: 'Nhập Tên Của Be nà 🌷',
    input: 'text',
    inputValue: '',
    allowOutsideClick: false,
    allowEscapeKey: false,
    showConfirmButton: true,
    didOpen: () => Swal.getInput()?.focus(),
    preConfirm: () => Swal.getInput()?.value?.trim()
  });

  const validNames = ['Trang', 'Bee','Be','be','trang','bee','Yen Trang','Yến Trang','Nguyen Yen Trang','Nguyễn Yến Trang','Yến Trang 13/5',];
  
  if (typedName && validNames.includes(typedName)) {
    userName = typedName;
    loveTaps.clear();
    document.querySelectorAll('.love-icon').forEach(icon =>
      icon.classList.remove('tapped')
    );
    switchStage('inputStage', 'loveStage');
  } else {
    await Swal.fire({
      icon: 'warning',
      title: 'lêu lêu sai ròi sai ròi',
      confirmButtonText: 'Nhập lại ik nè '
    });
    inipesan();
  }
}

