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
    'Сайн байна уу, намайг Эрдэнэ-Очир гэдэг. Би 14 настай, орчин үеийн вэб технологи, бүтээлч кодчилолд суралцаж буй залуу суралцагч. Санаагаа бодит вэб хуудас, JavaScript хэрэглүүр болгон хувиргах нь миний хамгийн том хүсэл эрмэлзэл юм.',
  goal: 'Код, AI-ийн талаар мэдлэг авах',
  goalDetail:
    'Сургалтандаа тууштай суралцаж, компьютерийн шинжлэх ухаан, JavaScript логик, хиймэл оюун болон орчин үеийн вэб хөгжүүлэлтийн бат бөх суурьтай болж, өөрийн гэсэн бие даасан шилдэг төслүүд бүтээх.',
  hobby: 'Сагсан бөмбөг тоглох',
  favoriteGame: 'Counter-Strike 2 (CS2)',
  photoUrl: 'https://superlative-figolla-438f7b.netlify.app/my-photo.png',
  netlifyUrl: 'https://superlative-figolla-438f7b.netlify.app',
  javascriptUrl: 'https://erdene-ochir-javascript.netlify.app',
  vercelUrl: 'https://erdene-ochir-oduh.vercel.app',
  videoUrl:
    'https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260314_131748_f2ca2a28-fed7-44c8-b9a9-bd9acdd5ec31.mp4',
  skills: ['HTML5 & CSS3', 'JavaScript (ES6+)', 'DOM манипуляци', 'Вэб дизайн', 'Netlify & Vercel', 'AI технологи судлал'],
};

export const projectsData: Project[] = [
  {
    id: 'javascript-site',
    title: 'JavaScript бодлогууд',
    subtitle: 'Хичээл 8–11: Интерактив кодын дасгал & Алгоритм',
    description:
      'Насаар амьдарсан хугацаа (өдөр, цаг, минут) тооцоолох, ирээдүйн нас олох, 4 оронтой тоо тонгоруулах, дүн болон нууц үг шалгах зэрэг практик JavaScript бодлогуудыг багтаасан бие даасан вэб төсөл.',
    url: 'https://erdene-ochir-javascript.netlify.app',
    tags: ['JavaScript', 'DOM', 'Кодын дасгал', 'Алгоритм'],
    category: 'Шинэ нэмэлт төсөл ⚡',
    featured: true,
  },
  {
    id: 'dream-job',
    title: 'Мөрөөдлийн ажил',
    subtitle: 'Мэргэжлийн чиг баримжаа & Ирээдүйн хүсэл тэмүүлэл',
    description:
      'Ирээдүйд технологийн ертөнцөд ямар мэргэжилтэн болох, өөрийн сонирхдог салбарын талаар дэлгэрэнгүй хуваалцсан бие даасан вэб төсөл.',
    url: 'https://superlative-figolla-438f7b.netlify.app/my%20dreamjob.html',
    tags: ['HTML5', 'CSS3', 'Вэб дизайн', 'Зорилго'],
    category: 'Суурь төсөл',
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
    category: 'Эхлэл бүтээл',
    featured: false,
  },
];

export const learningRoadmap: Milestone[] = [
  {
    year: '2026',
    stage: '1-р шат: Эхлэл',
    title: 'Код бичиж, анхны HTML/CSS сайтуудаа хийсэн',
    description: 'HTML бүтцийн үндэс, CSS өнгө, тохиргоо, линкүүдийг сурч, "Мөрөөдлийн ажил" болон хувийн сайтуудаа Netlify дээр байршуулсан.',
    skills: ['HTML5 семантик', 'CSS загварчлал', 'Холбоосууд', 'Netlify deployment'],
    status: 'completed',
  },
  {
    year: 'Одоо',
    stage: '2-р шат: JavaScript & Интерактив',
    title: 'JavaScript бодлогууд ба орчин үеийн вэб апп',
    description: 'erdene-ochir-javascript.netlify.app дээр бодлого шийдэж, DOM удирдах, хэрэглэгчийн оролтыг боловсруулах болон Vercel дээр портфолио сайт хөгжүүлж байна.',
    skills: ['JavaScript логик', 'DOM & Forms', 'Шилэн эффект (Liquid Glass)', 'Vercel & Netlify'],
    status: 'current',
  },
  {
    year: 'Ирээдүй',
    stage: '3-р шат: AI & Бүрэн систем',
    title: 'AI технологи ба Бие даасан томоохон платформ',
    description: 'Хиймэл оюун (AI) интеграцитай вэб аппууд, олон хэрэглэгчтэй систем, тоглоомын хөдөлгүүр болон өөрийн бүтээгдэхүүнийг зах зээлд гаргах.',
    skills: ['AI технологиуд', 'Full-stack хөгжүүлэлт', 'React/Next.js', 'Төслийн архитектур'],
    status: 'future',
  },
];
