import { ProfileData, Project } from '../types/portfolio';

export interface Milestone {
  year: string;
  stage: string;
  title: string;
  description: string;
  skills: string[];
  status: 'completed' | 'current' | 'future';
}

export const profileData: ProfileData = {
  name: 'Эрдэнэ-Очир',
  displayName: 'Эрдэнэ-Очир®',
  age: 14,
  tagline: 'Мөрөөдөл зүтгэлээр дүрэлзэж, ирээдүй энд эхэлнэ.',
  about:
    'Сайн байна уу, намайг Эрдэнэ-Очир гэдэг. Би 14 настай, орчин үеийн вэб технологи, бүтээлч кодчилолд суралцаж буй залуу суралцагч. Санаагаа бодит вэб хуудас, тоглоом болгон хувиргах нь миний хамгийн том хүсэл эрмэлзэл юм.',
  goal: 'Код, AI-ийн талаар мэдлэг авах',
  goalDetail:
    'Сургалтандаа тууштай суралцаж, компьютерийн шинжлэх ухаан, хиймэл оюун болон орчин үеийн вэб хөгжүүлэлтийн бат бөх суурьтай болж, өөрийн гэсэн бие даасан шилдэг төслүүд бүтээх.',
  hobby: 'Сагсан бөмбөг тоглох',
  favoriteGame: 'Counter-Strike 2 (CS2)',
  photoUrl: 'https://superlative-figolla-438f7b.netlify.app/my-photo.png',
  netlifyUrl: 'https://superlative-figolla-438f7b.netlify.app',
  videoUrl:
    'https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260314_131748_f2ca2a28-fed7-44c8-b9a9-bd9acdd5ec31.mp4',
  skills: ['HTML5 & CSS3', 'JavaScript суурь', 'Вэб дизайн', 'Responsive загвар', 'Netlify байршуулалт', 'AI технологи судлал'],
};

export const projectsData: Project[] = [
  {
    id: 'dream-job',
    title: 'Мөрөөдлийн ажил',
    subtitle: 'Мэргэжлийн чиг баримжаа & Ирээдүйн хүсэл тэмүүлэл',
    description:
      'Ирээдүйд технологийн ертөнцөд ямар мэргэжилтэн болох, өөрийн сонирхдог салбарын талаар дэлгэрэнгүй хуваалцсан бие даасан вэб төсөл.',
    url: 'https://superlative-figolla-438f7b.netlify.app/my%20dreamjob.html',
    tags: ['HTML5', 'CSS3', 'Вэб дизайн', 'Зорилго'],
    category: 'Онцлох төсөл',
    featured: true,
  },
  {
    id: 'main-website',
    title: 'Миний анхны вэбсайт',
    subtitle: 'Танилцуулга хуудас & Хувийн блог',
    description:
      'Netlify дээр амжилттай байршуулсан анхны бүрэн хэмжээний вэб хуудас. Миний сонирхол, хобби, суралцах зорилго зэргийг өнгөлөг загвараар багтаасан.',
    url: 'https://superlative-figolla-438f7b.netlify.app',
    tags: ['Netlify', 'HTML', 'CSS бүтэц', 'Хувийн танилцуулга'],
    category: 'Суурь бүтээл',
    featured: true,
  },
];

export const learningRoadmap: Milestone[] = [
  {
    year: '2026',
    stage: '1-р шат: Эхлэл',
    title: 'Код бичиж, анхны сайтуудаа хийж эхэлсэн',
    description: 'HTML бүтцийн үндэс, CSS өнгө, тохиргоо, линкүүдийг сурч, "Мөрөөдлийн ажил" болон хувийн сайтуудаа Netlify дээр байршуулсан.',
    skills: ['HTML5 семантик', 'CSS загварчлал', 'Холбоосууд', 'Netlify deployment'],
    status: 'completed',
  },
  {
    year: 'Одоо',
    stage: '2-р шат: Ахисан шат',
    title: 'Орчин үеийн шилдэг дизайн & Интерактив логик',
    description: 'Кинематик видео дэвсгэр, шилэн эффект (Liquid Glass), нарийн хөдөлгөөнт анимац болон JavaScript логикт суралцаж байна.',
    skills: ['Шилэн эффект (Liquid Glass)', 'CSS Animations', 'Интерактив тоглоом', 'React үндэс'],
    status: 'current',
  },
  {
    year: 'Ирээдүй',
    stage: '3-р шат: Мөрөөдөл',
    title: 'AI технологи ба Бие даасан платформ',
    description: 'Хиймэл оюун (AI) интеграцитай вэб аппууд, цахим тоглоомын логик болон олон хэрэглэгч ашиглах бүтээгдэхүүн хөгжүүлэх.',
    skills: ['AI технологиуд', 'Full-stack хөгжүүлэлт', 'Тоглоомын хөдөлгүүр', 'Төслийн архитектур'],
    status: 'future',
  },
];
