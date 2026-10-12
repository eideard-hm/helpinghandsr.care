import { SERVICE_AREAS, THERAPIST } from '@/data/site';

// Each answer is written to stand on its own, so search engines and AI
// assistants can quote it without the surrounding page.
export const FAQ_ITEMS = [
  {
    question: 'Do you provide home massages in Abu Dhabi?',
    answer:
      'Yes. ZeinMotion delivers home massage sessions at your home, hotel or residence across Abu Dhabi, with the equipment needed for a professional treatment.',
  },
  {
    question: 'What is ZeinMotion Therapy?',
    answer: `ZeinMotion Therapy is the signature method created by ${THERAPIST.name}. In one session it combines an assessment with deep tissue work, sports massage, assisted stretching, head and neck massage and reflexology, plus cupping when appropriate, to relieve pain, restore mobility and reduce stress.`,
  },
  {
    question: 'How do I book a session?',
    answer:
      'Send a WhatsApp message with your preferred service, location and available time. You will receive direct confirmation and preparation details.',
  },
  {
    question: 'Which treatment should I choose?',
    answer:
      'If you are unsure, start with ZeinMotion Therapy. It combines assessment, deep tissue work, sports massage, assisted stretching and reflexology based on your needs.',
  },
  {
    question: 'Can you help with chronic pain or stiffness?',
    answer:
      'Yes. The treatment approach focuses on muscle tension, mobility restrictions, posture-related discomfort, sports recovery and stress-related stiffness.',
  },
  {
    question: 'Is the therapist certified?',
    answer: `Yes. Sessions are delivered by ${THERAPIST.name}, a ${THERAPIST.role} attested by MOFA and KHDA, with ${THERAPIST.yearsOfExperience}+ years of experience and a diploma from ${THERAPIST.credentials.trainedAt}. He is certified in ${THERAPIST.credentials.certifiedIn.join(', ')}.`,
  },
  {
    question: 'Which areas of Abu Dhabi do you cover?',
    answer: `Home visits are available across Abu Dhabi, including ${SERVICE_AREAS.join(', ')}. If your area is not listed, send your location on WhatsApp to confirm availability before booking.`,
  },
  {
    question: 'What do I need to prepare for a home massage?',
    answer:
      'Very little. The therapist arrives fully equipped for a professional session. You only need a quiet space where a massage table fits and comfortable clothing; preparation details are shared on WhatsApp when you book.',
  },
  {
    question: 'Do you work with athletes and active people?',
    answer:
      'Yes. Sports massage, assisted stretching and deep tissue work support training recovery, flexibility and injury prevention, and suit athletes, gym-goers and professionals with posture-related tension.',
  },
  {
    question: 'How is pricing handled?',
    answer:
      'Pricing depends on the treatment type, session length, location and any add-ons such as cupping. Send a WhatsApp message to receive the best option for your needs before booking.',
  },
] as const;
