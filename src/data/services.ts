import { env } from '@/config/env';
import { waLink } from '@/lib/whatsapp';

export const SERVICES: Services[] = [
  {
    isMain: true,
    visible: true,
    id: Date.now(),
    title: 'ZeinMotion Therapy',
    image: '/services/deep-tissue-massage.webp',
    bigImage: '/services/sports-massage-big.webp',
    excerpt:
      'ZeinMotion is a unique therapy that combines elements of massage, stretching, and movement to improve flexibility, reduce pain, and enhance overall well-being.',
    waLink: waLink(
      env.whatsAppNumber,
      env.waMessageTemplate.replace('{SERVICE}', 'ZeinMotion')
    ),
    benefits: [
      {
        title: 'Deep Tissue Massage',
        details: [
          'Deep tissue massages use firm pressure and slow strokes to target deep layers of muscle and fascia.',
          'Therapist starts with lighter pressure to warm up the muscles and then increases intensity.',
          'Techniques include stripping and friction to break up adhesions and improve range of motion.',
        ],
      },
      {
        title: 'Anti-Stress & Face Massage',
        details: [
          'Anti-stress massage focuses on relieving tension in the neck, shoulders, and back using gentle techniques.',
          'Face massage involves gentle strokes and pressure on the face to promote relaxation and improve circulation.',
          'Both massages can include aromatherapy and soothing music to enhance the experience.',
        ],
      },
      {
        title: 'Sports Massage',
        details: [
          'Sports massage uses a combination of techniques such as deep tissue massage, stretching, and trigger point therapy to target specific muscle groups.',
          'It can be used before or after physical activity to prepare the muscles or aid in recovery.',
          'Therapist may also provide advice on stretching and strengthening exercises to prevent future injuries.',
        ],
      },
      {
        title: 'Cupping Therapy',
        details: [
          'Cupping therapy involves placing cups on the skin to create suction, which helps to increase blood flow and promote healing.',
          'The cups can be made of various materials, including glass, bamboo, or silicone.',
          'Therapist may use static or moving cupping techniques depending on the desired effect.',
        ],
      },
      {
        title: 'Reflexology Therapy',
        details: [
          'Reflexology involves applying pressure to specific points on the hands and feet that correspond to different organs and systems in the body.',
          'It is based on the principle that these points can influence the health of the corresponding areas.',
          'Therapist may use techniques such as thumb walking, finger pressure, and stretching to stimulate the reflex points.',
        ],
      },
    ],
    details: [
      'ZeinMotion therapy is designed to address a variety of issues, including chronic pain, limited mobility, and stress-related conditions.',
      'The therapy sessions are tailored to the individual needs of each client, with a focus on achieving optimal results through a combination of techniques.',
      'Regular sessions can help to improve overall health and well-being, promoting a sense of balance and harmony in the body.',
    ],
  },
  {
    isMain: false,
    visible: false,
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
      {
        title: 'Relieves pain and stiffness',
        details: [
          'This benefit helps you achieve better results by providing specialized expertise and personalized attention to your needs.',
        ],
      },
      {
        title: 'Improves circulation and reduces swelling',
        details: [
          'This benefit helps to enhance blood flow and reduce inflammation, promoting faster healing and recovery.',
        ],
      },
      {
        title: 'Speeds up muscle recovery',
        details: [
          'This benefit aids in the recovery process after intense physical activity, helping to reduce soreness and stiffness.',
        ],
      },
      {
        title: 'Reduces stress and anxiety',
        details: [
          'This benefit promotes relaxation and a sense of well-being, helping to alleviate stress and anxiety.',
        ],
      },
    ],
    details: [
      'Deep tissue massages use firm pressure and slow strokes to target deep layers of muscle and fascia.',
      'Therapist starts with lighter pressure to warm up the muscles and then increases intensity.',
      'Techniques include stripping and friction to break up adhesions and improve range of motion.',
    ],
  },
  {
    isMain: false,
    visible: false,
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
      {
        title: 'Reduction of inflammation of joints and heart rate',
        details: [
          'This benefit helps to reduce inflammation in the joints, promoting better mobility and overall joint health.',
        ],
      },
      {
        title: 'Improved range of motion and flexibility',
        details: [
          'This benefit helps to enhance flexibility and reduce stiffness, allowing for greater ease of movement.',
        ],
      },
      {
        title: 'Releases endorphins',
        details: [
          'This benefit promotes a sense of well-being and can help to alleviate pain and discomfort.',
        ],
      },
      {
        title: 'Decreases muscle spasms and cramp',
        details: [
          'This benefit helps to relax tight muscles and reduce the frequency and intensity of spasms.',
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
      {
        title: 'Increases flexibility',
        details: [
          'This benefit helps to enhance flexibility and reduce stiffness, allowing for greater ease of movement.',
        ],
      },
      {
        title: 'Prevents injuries',
        details: [
          'This benefit helps to reduce the risk of injuries by improving muscle balance and coordination.',
        ],
      },
      {
        title: 'Improves performance',
        details: [
          'This benefit helps to optimize physical performance by enhancing muscle function and reducing fatigue.',
        ],
      },
      {
        title: 'Increases endurance',
        details: [
          'This benefit helps to improve stamina and endurance, allowing for longer and more effective workouts.',
        ],
      },
    ],
    details: [
      'Sports massage uses a combination of techniques such as deep tissue massage, stretching, and trigger point therapy to target specific muscle groups.',
      'It can be used before or after physical activity to prepare the muscles or aid in recovery.',
      'Therapist may also provide advice on stretching and strengthening exercises to prevent future injuries.',
    ],
  },
  {
    isMain: false,
    visible: false,
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
      {
        title: 'Encourages whole-body comfort and relaxation',
        details: [
          'This benefit helps to promote a sense of overall well-being and relaxation, reducing stress and tension in the body.',
        ],
      },
      {
        title: 'Encourage whole-body comfort and relaxation',
        details: [
          'This benefit helps to promote a sense of overall well-being and relaxation, reducing stress and tension in the body.',
        ],
      },
      {
        title: 'Increase your pain threshold',
        details: [
          'This benefit helps to increase your pain tolerance, making it easier to cope with discomfort.',
        ],
      },
      {
        title: 'Reduce inflammation',
        details: [
          'This benefit helps to decrease inflammation in the body, promoting faster healing and recovery.',
        ],
      },
      {
        title: 'Reduce cholesterol and low-density lipoprotein (LDL)',
        details: [
          'This benefit helps to lower cholesterol levels and reduce the risk of heart disease.',
        ],
      },
    ],
    details: [
      'Cupping therapy involves placing cups on the skin to create suction, which helps to increase blood flow and promote healing.',
      'The cups can be made of various materials, including glass, bamboo, or silicone.',
      'Therapist may use static or moving cupping techniques depending on the desired effect.',
    ],
  },
  {
    isMain: false,
    visible: false,
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
      {
        title: 'Promotes relaxation and reduces stress',
        details: [
          'This benefit helps to promote a sense of overall well-being and relaxation, reducing stress and tension in the body.',
        ],
      },
      {
        title: 'Improves circulation',
        details: [
          'This benefit helps to enhance blood flow and circulation, promoting better oxygen and nutrient delivery to the body.',
        ],
      },
      {
        title: 'Relieves pain and tension',
        details: [
          'This benefit helps to alleviate pain and tension in the body, promoting relaxation and comfort.',
        ],
      },
      {
        title: 'Enhances overall well-being',
        details: [
          'This benefit helps to improve overall health and well-being, promoting a sense of balance and harmony in the body.',
        ],
      },
    ],
    details: [
      'Reflexology involves applying pressure to specific points on the hands and feet that correspond to different organs and systems in the body.',
      'It is based on the principle that these points can influence the health of the corresponding areas.',
      'Therapist may use techniques such as thumb walking, finger pressure, and stretching to stimulate the reflex points.',
    ],
  },
  {
    isMain: false,
    id: Date.now() + 6,
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
          'This benefit helps to decrease swelling and inflammation in the body, promoting faster healing and recovery.',
        ],
      },
      {
        title: 'Boosts immune system function',
        details: [
          'This benefit helps to enhance the function of the immune system, promoting better overall health and well-being.',
        ],
      },
      {
        title: 'Improves circulation',
        details: [
          'This benefit helps to enhance blood flow and circulation, promoting better oxygen and nutrient delivery to the body.',
        ],
      },
      {
        title: 'Promotes relaxation and reduces stress',
        details: [
          'This benefit helps to promote a sense of overall well-being and relaxation, reducing stress and tension in the body.',
        ],
      },
    ],
    details: [
      'Lymphatic Drainage Massage involves gentle, rhythmic strokes that follow the natural flow of the lymphatic system.',
      'Therapist uses light pressure to stimulate the lymphatic vessels and promote the movement of lymph fluid.',
      "The massage can be performed on the entire body or focused on specific areas, depending on the client's needs.",
    ],
  },
  {
    isMain: false,
    id: Date.now() + 7,
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
          'This benefit helps to improve skin texture and reduce the appearance of dimpling, promoting a smoother and more toned appearance.',
        ],
      },
      {
        title: 'Improves circulation and lymphatic drainage',
        details: [
          'This benefit helps to enhance blood flow and promote the removal of toxins and excess fluid from the body.',
        ],
      },
      {
        title: 'Promotes relaxation and reduces stress',
        details: [
          'This benefit helps to promote a sense of overall well-being and relaxation, reducing stress and tension in the body.',
        ],
      },
      {
        title: 'Enhances skin tone and texture',
        details: [
          'This benefit helps to improve skin elasticity and firmness, promoting a healthier and more youthful appearance.',
        ],
      },
    ],
    details: [
      'Anti-Cellulite Massage involves a combination of techniques, including deep tissue massage, lymphatic drainage, and skin rolling.',
      'Therapist uses firm pressure and rhythmic strokes to target areas affected by cellulite, promoting better circulation and lymphatic flow.',
      'The massage can be performed on the thighs, buttocks, abdomen, and other areas where cellulite is commonly found.',
    ],
  },
] as const;

export type Services = {
  isMain: boolean;
  visible: boolean;
  id: number;
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
