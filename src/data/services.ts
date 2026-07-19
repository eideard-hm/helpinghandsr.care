import { env } from '@/config/env';
import { waLink } from '@/lib/whatsapp';

export const SERVICES: Services[] = [
  {
    isMain: true,
    visible: true,
    id: 'zeinmotion-therapy',
    title: `${env.brand} Therapy`,
    image: '/services/deep-tissue-massage.webp',
    bigImage: '/services/sports-massage-big.webp',
    excerpt:
      'A premium signature massage method developed over 20+ years of clinical experience. Integrates Head Massage, Deep Tissue, Sports Massage, Assisted Stretching, and Reflexology for comprehensive pain relief and performance enhancement.',
    waLink: waLink(
      env.whatsAppNumber,
      env.waMessageTemplate.replace('{SERVICE}', `${env.brand} Therapy`)
    ),
    benefits: [
      {
        title: 'Comprehensive Pain Relief',
        details: [
          'Targets chronic pain, muscle tension, and stiffness with deep-tissue precision.',
          'Combines stripping and cross-fiber friction to break up adhesions and scar tissue.',
          'Promotes healthy circulation and speeds muscle recovery.'
        ],
      },
      {
        title: 'Mobility & Performance',
        details: [
          'Integrates assisted stretching and sports massage to increase flexibility and range of motion.',
          'Ideal for athletes, active professionals, and anyone seeking better posture and movement quality.',
          'Helps reduce risk of future injuries and supports optimal performance.'
        ],
      },
      {
        title: 'Stress & Energy Balance',
        details: [
          'Anti-stress and head/face massage calm the nervous system and release mental tension.',
          'The session flow is calm, intentional, and adapted to your body so the therapeutic work feels focused instead of rushed.',
          'Leaves you feeling lighter, more relaxed, and re-energized.'
        ],
      },
      {
        title: 'Holistic Enhancements',
        details: [
          'Reflexology stimulates key pressure points linked to internal organs and overall wellness.',
          'Optional cupping improves blood flow and accelerates muscle healing when appropriate.',
          'Tailored combinations ensure a truly personalized, whole-body approach.'
        ],
      },
    ],
    details: [
      `${env.brand} is the culmination of 20+ years of specialized practice and ancestral knowledge passed down through generations of therapeutic practitioners.`,
      'Each session begins with a comprehensive assessment of your physical condition, range of motion, and specific wellness goals, ensuring completely personalized treatment.',
      'The method seamlessly integrates multiple therapeutic disciplines in a flowing sequence designed to address pain at its source while promoting overall physical harmony.',
      'Ideal for athletes seeking performance optimization, professionals managing stress-related tension, and individuals committed to proactive musculoskeletal health.',
    ],
  },
  {
    isMain: false,
    visible: false,
    id: 'deep-tissue-massage',
    image: '/services/deep-tissue-massage.webp',
    bigImage: '/services/deep-tissue-massage-big.webp',
    title: 'Deep Tissue Massage',
    excerpt:
      'Focused pressure and slow therapeutic work for chronic tension, back pain, sports recovery, and restricted mobility.',
    waLink: waLink(
      env.whatsAppNumber,
      env.waMessageTemplate.replace('{SERVICE}', 'Deep Tissue Massage')
    ),
    benefits: [
      {
        title: 'Relieves pain and stiffness',
        details: [
          'Targets deeper muscle layers to release persistent knots, tightness, and restricted movement.',
        ],
      },
      {
        title: 'Improves circulation and reduces swelling',
        details: [
          'Encourages blood flow through tense areas to support recovery after training or long workdays.',
        ],
      },
      {
        title: 'Speeds up muscle recovery',
        details: [
          'Helps reduce post-activity soreness and supports easier movement between sessions.',
        ],
      },
      {
        title: 'Reduces stress and anxiety',
        details: [
          'Releases physical tension that often builds up from stress, posture, and repetitive routines.',
        ],
      },
    ],
    details: [
      'Deep tissue massage uses firm pressure and slow strokes to target deep layers of muscle and fascia.',
      'The therapist starts with lighter pressure to warm up the muscles and then increases intensity.',
      'Techniques include stripping and friction to break up adhesions and improve range of motion.',
    ],
  },
  {
    isMain: false,
    visible: false,
    id: 'anti-stress-face-massage',
    title: 'Anti-Stress & Face Massage',
    image: '/services/anti-stress-massage.webp',
    bigImage: '/services/anti-stress-massage-big.webp',
    excerpt:
      'A calming treatment for neck, shoulder, head, and facial tension, designed to reduce stress and restore a lighter feeling.',
    waLink: waLink(
      env.whatsAppNumber,
      env.waMessageTemplate.replace('{SERVICE}', 'Anti-Stress & Face Massage')
    ),
    benefits: [
      {
        title: 'Relieves stress-related tension',
        details: [
          'Softens tension around the neck, shoulders, jaw, and face where stress commonly accumulates.',
        ],
      },
      {
        title: 'Improves comfort and mobility',
        details: [
          'Uses gentle mobility and soft-tissue work to ease stiffness without overloading the body.',
        ],
      },
      {
        title: 'Releases endorphins',
        details: [
          'Supports relaxation, calmer breathing, and a more settled nervous system.',
        ],
      },
      {
        title: 'Decreases muscle spasms and cramps',
        details: [
          'Helps quiet tight muscles and reduce discomfort from stress-related tension.',
        ],
      },
    ],
    details: [
      'Anti-stress massage focuses on relieving tension in the neck, shoulders, and back using gentle techniques.',
      'Face massage involves gentle strokes and pressure on the face to promote relaxation and improve circulation.',
      'Both massages can include aromatherapy and soothing music to enhance the experience.',
    ],
  },
  {
    isMain: false,
    visible: false,
    id: 'sports-massage',
    title: 'Sports Massage',
    image: '/services/sports-massage.webp',
    bigImage: '/services/sports-massage-big.webp',
    excerpt:
      'Targeted recovery work for active clients, gym routines, sport-specific tension, flexibility, and injury prevention.',
    waLink: waLink(
      env.whatsAppNumber,
      env.waMessageTemplate.replace('{SERVICE}', 'Sports Massage')
    ),
    benefits: [
      {
        title: 'Increases flexibility',
        details: [
          'Assisted stretching and targeted pressure help improve range of motion and ease stiffness.',
        ],
      },
      {
        title: 'Prevents injuries',
        details: [
          'Addresses overloaded muscle groups before they become recurring pain or preventable injuries.',
        ],
      },
      {
        title: 'Improves performance',
        details: [
          'Supports better movement quality by reducing tension and improving muscle readiness.',
        ],
      },
      {
        title: 'Increases endurance',
        details: [
          'Helps active clients recover more comfortably between workouts, matches, or training blocks.',
        ],
      },
    ],
    details: [
      'Sports massage uses a combination of techniques such as deep tissue massage, stretching, and trigger point therapy to target specific muscle groups.',
      'It can be used before or after physical activity to prepare the muscles or aid in recovery.',
      'The therapist may also provide advice on stretching and strengthening exercises to prevent future injuries.',
    ],
  },
  {
    isMain: false,
    visible: false,
    id: 'cupping-therapy',
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
      {
        title: 'Encourages whole-body comfort and relaxation',
        details: [
          'Creates a decompressive effect that can make tight areas feel lighter and less restricted.',
        ],
      },
      {
        title: 'Supports whole-body comfort and relaxation',
        details: [
          'Can be paired with massage when extra circulation support is useful for recovery.',
        ],
      },
      {
        title: 'Eases sensitive, tense areas',
        details: [
          'May help reduce sensitivity in tense areas when applied appropriately.',
        ],
      },
      {
        title: 'Supports local recovery',
        details: [
          'Supports local blood flow and tissue recovery after stiffness or overuse.',
        ],
      },
      {
        title: 'Works well as a focused add-on',
        details: [
          'Best used as an add-on for muscle tension, stiffness, and recovery goals.',
        ],
      },
    ],
    details: [
      'Cupping therapy involves placing cups on the skin to create suction, which helps to increase blood flow and promote healing.',
      'The cups can be made of various materials, including glass, bamboo, or silicone.',
      'The therapist may use static or moving cupping techniques depending on the desired effect.',
    ],
  },
  {
    isMain: false,
    visible: false,
    id: 'reflexology-therapy',
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
      {
        title: 'Promotes relaxation and reduces stress',
        details: [
          'Pressure-point work helps the body settle and supports a calmer overall state.',
        ],
      },
      {
        title: 'Improves circulation',
        details: [
          'Stimulates the feet and hands to encourage warmth, circulation, and comfort.',
        ],
      },
      {
        title: 'Relieves pain and tension',
        details: [
          'Useful when the body feels tired, heavy, tense, or overworked.',
        ],
      },
      {
        title: 'Enhances overall well-being',
        details: [
          'Complements therapeutic massage as part of a balanced, personalized session.',
        ],
      },
    ],
    details: [
      'Reflexology involves applying pressure to specific points on the hands and feet that correspond to different organs and systems in the body.',
      'It is based on the principle that these points can influence the health of the corresponding areas.',
      'The therapist may use techniques such as thumb walking, finger pressure, and stretching to stimulate reflex points.',
    ],
  },
  {
    isMain: false,
    id: 'lymphatic-drainage-massage',
    visible: true,
    title: 'Lymphatic Drainage Massage',
    image: '/services/lymphatic-drainage-massage.webp',
    bigImage: '/services/lymphatic-drainage-massage-big.webp',
    excerpt:
      'Lymphatic Drainage Massage is a gentle massage technique that stimulates the lymphatic system to promote the removal of toxins and excess fluid from the body.',
    waLink: waLink(
      env.whatsAppNumber,
      env.waMessageTemplate.replace('{SERVICE}', 'Lymphatic Drainage Massage')
    ),
    benefits: [
      {
        title: 'Reduces swelling and inflammation',
        details: [
          'Gentle rhythmic work supports fluid movement and can help reduce a heavy or swollen feeling.',
        ],
      },
      {
        title: 'Boosts immune system function',
        details: [
          'Encourages healthy lymph flow as part of a restorative wellness routine.',
        ],
      },
      {
        title: 'Improves circulation',
        details: [
          'Uses light, precise pressure to support circulation without deep muscular strain.',
        ],
      },
      {
        title: 'Promotes relaxation and reduces stress',
        details: [
          'Creates a calm, gentle session for clients who prefer lighter therapeutic work.',
        ],
      },
    ],
    details: [
      'Lymphatic Drainage Massage involves gentle, rhythmic strokes that follow the natural flow of the lymphatic system.',
      'The therapist uses light pressure to stimulate the lymphatic vessels and promote the movement of lymph fluid.',
      "The massage can be performed on the entire body or focused on specific areas, depending on the client's needs.",
    ],
  },
  {
    isMain: false,
    id: 'anti-cellulite-massage',
    visible: true,
    title: 'Anti-Cellulite Massage',
    image: '/services/anti-cellulite-massage.webp',
    bigImage: '/services/anti-cellulite-massage-big.webp',
    excerpt:
      'Anti-Cellulite Massage is a specialized massage technique that targets areas of the body affected by cellulite, helping to improve skin texture and reduce the appearance of dimpling.',
    waLink: waLink(
      env.whatsAppNumber,
      env.waMessageTemplate.replace('{SERVICE}', 'Anti-Cellulite Massage')
    ),
    benefits: [
      {
        title: 'Reduces the appearance of cellulite',
        details: [
          'Focused manual techniques support smoother-looking skin texture over time.',
        ],
      },
      {
        title: 'Improves circulation and lymphatic drainage',
        details: [
          'Combines circulation and lymphatic techniques for targeted body-care goals.',
        ],
      },
      {
        title: 'Promotes relaxation and reduces stress',
        details: [
          'Keeps the session comfortable while focusing on specific treatment areas.',
        ],
      },
      {
        title: 'Enhances skin tone and texture',
        details: [
          'Supports skin tone and firmness when paired with consistent care.',
        ],
      },
    ],
    details: [
      'Anti-Cellulite Massage involves a combination of techniques, including deep tissue massage, lymphatic drainage, and skin rolling.',
      'The therapist uses firm pressure and rhythmic strokes to target areas affected by cellulite, promoting better circulation and lymphatic flow.',
      'The massage can be performed on the thighs, buttocks, abdomen, and other areas where cellulite is commonly found.',
    ],
  },
] as const;

export type Services = {
  isMain: boolean;
  visible: boolean;
  id: string;
  title: string;
  image: string;
  bigImage: string;
  excerpt: string;
  waLink: string;
  benefits: Benefits[];
  details: string[];
};

export type Benefits = {
  title: string;
  details: string[];
};
