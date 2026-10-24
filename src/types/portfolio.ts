export interface Project {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  url: string;
  tags: string[];
  category: string;
  featured?: boolean;
}

export interface ProfileData {
  name: string;
  displayName: string;
  age: number;
  tagline: string;
  about: string;
  goal: string;
  goalDetail: string;
  hobby: string;
  favoriteGame: string;
  photoUrl: string;
  netlifyUrl: string;
  videoUrl: string;
  skills: string[];
}
