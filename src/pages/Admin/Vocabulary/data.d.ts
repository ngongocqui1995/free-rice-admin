export interface VocabularyItem {
  createdAt: string;
  id: string;
  question: string;
  answer: string;
  updatedAt: string;
}

export interface CreateVocabulary {
  code: string;
  avatar: string;
  name: string;
  color: string;
}

export interface UpdateVocabulary {
  code: string;
  avatar: string;
  name: string;
  color: string;
}

export interface QueryVocabulary {
  data: VocabularyItem[];
  total: number;
  success: boolean;
}

export interface ChangeStatusVocabulary {
  status: string;
  message: string;
}
