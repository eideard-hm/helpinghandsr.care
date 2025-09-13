import { env } from '@/config/env';
import { waLink } from '@/lib/whatsapp';

export const SERVICES = [
  {
    id: Date.now() + 1,
    image: '/services/deep-tissue-massage.webp',
    bigImage: '/services/deep-tissue-massage-big.webp',
    title: 'Deep Tissue Massage',
    excerpt:
      'Deep tissue massage can be an effective treatment method for various conditions, including sports injuries and back pain.',
    waLink: waLink(
      env.whatsAppNumber,
      env.waMessageTemplate.replace('{SERVICE}', 'Deep Tissue Massage')
    ),
    benefits: [
      'Relieves pain and stiffness',
      'Improves circulation and reduces swelling',
      'Speeds up muscle recovery',
      'Reduces stress and anxiety',
    ],
    details: [
      'Deep tissue massages use firm pressure and slow strokes to target deep layers of muscle and fascia.',
      'Therapist starts with lighter pressure to warm up the muscles and then increases intensity.',
      'Techniques include stripping and friction to break up adhesions and improve range of motion.',
    ],
  },

  {
    id: Date.now() + 2,
    title: 'Anti-Stress & Face Massage',
    image: '/services/anti-stress-massage.webp',
    bigImage: '/services/anti-stress-massage-big.webp',
    excerpt:
      'Anti-Stress & Face Massage is a form of massage therapy where the joints and soft tissues are exercised to lessen muscle tension and pain.',
    waLink: waLink(
      env.whatsAppNumber,
      env.waMessageTemplate.replace('{SERVICE}', 'Anti-Stress & Face Massage')
    ),
    benefits: [
      'Reduction of inflammation of joints and heart rate',
      'Improved range of motion and flexibility',
      'Releases endorphins',
      'Decreases muscle spasms and cramp',
    ],
    details: [
      'Anti-stress massage focuses on relieving tension in the neck, shoulders, and back using gentle techniques.',
      'Face massage involves gentle strokes and pressure on the face to promote relaxation and improve circulation.',
      'Both massages can include aromatherapy and soothing music to enhance the experience.',
    ],
  },
  {
    id: Date.now() + 3,
    title: 'Sports Massage',
    image: '/services/sports-massage.webp',
    bigImage: '/services/sports-massage-big.webp',
    excerpt:
      'Sports Massage is focused at systematic, targeting muscles that are used in gym or in a specific sport.',
    waLink: waLink(
      env.whatsAppNumber,
      env.waMessageTemplate.replace('{SERVICE}', 'Sports Massage')
    ),
    benefits: [
      'Increases flexibility',
      'Prevents injuries',
      'Improves performance',
      'Increases endurance',
    ],
    details: [
      'Sports massage uses a combination of techniques such as deep tissue massage, stretching, and trigger point therapy to target specific muscle groups.',
      'It can be used before or after physical activity to prepare the muscles or aid in recovery.',
      'Therapist may also provide advice on stretching and strengthening exercises to prevent future injuries.',
    ],
  },
  {
    id: Date.now() + 4,
    title: 'Cupping Therapy',
    image: '/services/cupping-therapy.webp',
    bigImage: '/services/cupping-therapy-big.webp',
    excerpt:
      'This ancient healing technique utilizes specialized cups that create a gentle suction on your skin, promoting improved circulation, detoxification, and muscle relaxation.',
    waLink: waLink(
      env.whatsAppNumber,
      env.waMessageTemplate.replace('{SERVICE}', 'Cupping Therapy')
    ),
    benefits: [
      'Encourage whole-body comfort and relaxation',
      'Increase your pain threshold',
      'Reduce inflammation',
      'Reduce cholesterol and low-density lipoprotein (LDL)',
    ],
    details: [
      'Cupping therapy involves placing cups on the skin to create suction, which helps to increase blood flow and promote healing.',
      'The cups can be made of various materials, including glass, bamboo, or silicone.',
      'Therapist may use static or moving cupping techniques depending on the desired effect.',
    ],
  },
  {
    id: Date.now() + 5,
    title: 'Reflexology Therapy',
    image: '/services/reflexology-therapy.webp',
    bigImage: '/services/reflexology-therapy-big.webp',
    excerpt:
      'Reflexology is a compression technique that focuses on specific pressure points in the hands and feet.',
    waLink: waLink(
      env.whatsAppNumber,
      env.waMessageTemplate.replace('{SERVICE}', 'Reflexology Therapy')
    ),
    benefits: [
      'Promotes relaxation and reduces stress',
      'Improves circulation',
      'Relieves pain and tension',
      'Enhances overall well-being',
    ],
    details: [
      'Reflexology involves applying pressure to specific points on the hands and feet that correspond to different organs and systems in the body.',
      'It is based on the principle that these points can influence the health of the corresponding areas.',
      'Therapist may use techniques such as thumb walking, finger pressure, and stretching to stimulate the reflex points.',
    ],
  },
] as const;

export type Services = (typeof SERVICES)[number];
