import { env } from '@/config/env';

export const DEFAULT_TESTIMONIALS = [
  {
    id: '1',
    name: 'Robert Chen',
    content: `As a software developer with chronic thoracic stiffness, I engaged ${env.brand} for a targeted deep tissue treatment. The therapist conducted a thorough postural assessment and precisely addressed my hypertonic trapezius and rhomboid muscles. The treatment effectively broke down adhesions, significantly improving my range of motion and reducing referred pain. The home visit service was highly efficient and professional. An essential maintenance service for anyone in a sedentary profession.`,
    rating: 5,
    status: 'approved',
    createdAt: new Date('2025-01-22'),
  },
];
