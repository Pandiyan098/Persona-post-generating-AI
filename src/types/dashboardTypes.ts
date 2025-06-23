export interface UserProfile {
  personalInfo: {
    name: string;
    profession?: string;
    bio?: string;
  };
  socialConnections: SocialConnection[];
  interests: string[];
}

export interface SocialConnection {
  platform: 'instagram' | 'linkedin' | 'facebook' | 'twitter';
  username: string;
  connected: boolean;
}

export interface ChatMessage {
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
}

export interface PostVariation {
  id: string;
  content: string;
  style: 'casual' | 'professional' | 'humorous';
}

export interface Feedback {
  postId: string;
  comments: string;
  rating: number;
  stylePreferences: string[];
}