import { ProfileData, Project } from '../types/portfolio';

export const profileData: ProfileData = {
  name: 'Эрдэнэ-Очир',
  displayName: 'Эрдэнэ-Очир®',
  age: 14,
  tagline: 'Мөрөөдөл зүтгэлээр дүрэлзэж, ирээдүй энд эхэлнэ.',
  about:
    'Сайн байна уу, намайг Эрдэнэ-Очир гэдэг. Би 14 настай, орчин үеийн вэб технологи, бүтээлч кодчилолд суралцаж буй залуу хөгжүүлэгч. Санаагаа бодит вэб хуудас, тоглоом болгон хувиргах нь миний хамгийн том хүсэл эрмэлзэл юм.',
  goal: 'Код, AI-ийн талаар мэдлэг авах',
  goalDetail:
    'Сургалтандаа тууштай суралцаж, компьютерийн шинжлэх ухаан, хиймэл оюун болон орчин үеийн вэб хөгжүүлэлтийн бат бөх суурьтай болж, өөрийн гэсэн бие даасан шилдэг төслүүд бүтээх.',
  hobby: 'Сагсан бөмбөг тоглох',
  favoriteGame: 'Counter-Strike 2 (CS2)',
  photoUrl: 'https://superlative-figolla-438f7b.netlify.app/my-photo.png',
  netlifyUrl: 'https://superlative-figolla-438f7b.netlify.app',
  videoUrl:
    'https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260314_131748_f2ca2a28-fed7-44c8-b9a9-bd9acdd5ec31.mp4',
  skills: ['HTML5 & CSS3', 'JavaScript', 'Вэб дизайн', 'Тоглоомын логик', 'AI судлал', 'Багийн ажиллагаа'],
};

export const projectsData: Project[] = [
  {
    id: 'dream-job',
    title: 'Мөрөөдлийн ажил',
    subtitle: 'Мэргэжлийн чиг баримжаа & Ирээдүйн зорилго',
    description:
      'Ирээдүйд ямар мэргэжилтэн болох, технологийн салбарт ямар амжилтанд хүрэхийг хүсэж байгаагаа илэрхийлсэн бие даасан танилцуулга вэб төсөл.',
    url: 'https://superlative-figolla-438f7b.netlify.app/dream-job.html',
    tags: ['Вэбсайт', 'Танилцуулга', 'Зорилго'],
    category: 'Төлөвлөлт & Хүсэл эрмэлзэл',
    featured: true,
  },
  {
    id: 'my-youtube',
    title: 'Миний YouTube',
    subtitle: 'Видео контент & Сонирхолтой бичлэгүүд',
    description:
      'Өөрийн сонирхдог сэдвүүд, тоглоом, бүтээлч бичлэгүүдийг нэгтгэн байршуулсан интерактив медиа танилцуулга хуудас.',
    url: 'https://superlative-figolla-438f7b.netlify.app/my-youtube.html',
    tags: ['Видео', 'Медиа', 'YouTube'],
    category: 'Контент бүтээгч',
  },
  {
    id: 'game-project',
    title: 'Тоглоомын сайт',
    subtitle: 'Вэб дээр ажиллах интерактив төсөл',
    description:
      'HTML болон CSS логик ашиглан хийсэн, хэрэглэгч тоглох боломжтой сонирхолтой вэб тоглоомын хуудас.',
    url: 'https://superlative-figolla-438f7b.netlify.app/tusul.html',
    tags: ['Тоглоом', 'Интерактив', 'HTML/CSS'],
    category: 'Хөгжүүлэлт',
  },
  {
    id: 'malaa-hashaandaa',
    title: 'Малаа хашаандаа',
    subtitle: 'Монгол ахуй сэдэвт тоглоом',
    description:
      'Монгол уламжлалт мал аж ахуйн сэдвийг вэб кодчилолтой уялдуулан бүтээсэн, бүтээлч сэтгэлгээг шалгах сонирхолтой бүтээл.',
    url: 'https://superlative-figolla-438f7b.netlify.app/togloom.html',
    tags: ['Монгол тоглоом', 'Логик', 'Бүтээл'],
    category: 'Тусгай төсөл',
    featured: true,
  },
];
