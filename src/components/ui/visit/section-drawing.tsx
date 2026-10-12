'use client';

import { useId } from 'react';

import { motion, useReducedMotion } from 'framer-motion';

import { THERAPIST } from '@/data/site';
import type { Hour, HourId } from '@/data/visit';
import { cn } from '@/lib/cn';

type SectionDrawingProps = {
  hour: Hour;
  /**
   * `full` is the whole building, `room` crops to the doorway and living room
   * with larger lettering, `door` is the detail of the arrival.
   */
  view?: 'full' | 'room' | 'door';
  /** False until the visitor picks an hour; the stamp then reads the time. */
  chosen?: boolean;
  className?: string;
};

/*
 * Geometry, in drawing units (143 units is about one metre).
 * Corridor 64-360, front-door wall 360-380, living room 380-1020,
 * facade 1020-1042, balcony beyond. Ceiling at 140, floor at 600.
 * Sunlight enters under the lintel at (1028, 190).
 * One storey up, a hotel room runs from its floor at 116 to the roof slab at -244.
 */
const BEAM: Record<HourId, string> = {
  morning: 'M1028 190 L503 600 L503 600 L1028 600 Z',
  afternoon: 'M1028 190 L810 600 L810 600 L1028 600 Z',
  // Low enough to pass the doorway and reach the corridor wall.
  evening: 'M1028 190 L64 467 L64 600 L1028 600 Z',
  night: 'M1028 190 L1028 600 L1028 600 L1028 600 Z',
};

// The same light one storey up, stopped by the closed door.
const BEAM_ABOVE: Record<HourId, string> = {
  morning: 'M1028 -194 L631 116 L631 116 L1028 116 Z',
  afternoon: 'M1028 -194 L863 116 L863 116 L1028 116 Z',
  evening: 'M1028 -194 L380 -8 L380 116 L1028 116 Z',
  night: 'M1028 -194 L1028 116 L1028 116 L1028 116 Z',
};

const SUN: Record<HourId, { cx: number; cy: number }> = {
  morning: { cx: 1133, cy: 108 },
  afternoon: { cx: 1115, cy: 26 },
  evening: { cx: 1144, cy: 157 },
  night: { cx: 1144, cy: 300 },
};

const SKY: Record<HourId, string> = {
  morning: '#e4e8f2',
  afternoon: '#f2f3ef',
  evening: '#f0deaa',
  night: '#1e1f63',
};

const ROOM_WALL: Record<HourId, string> = {
  morning: '#e7e9e3',
  afternoon: '#e9ebe5',
  evening: '#e8e6dc',
  night: '#d5d7e6',
};

// Rooms that are not the visitor's own: plaster by day, unlit after dark.
const OTHER_ROOMS: Record<HourId, string> = {
  morning: '#dfe1da',
  afternoon: '#dfe1da',
  evening: '#dfe1da',
  night: '#c3c6dc',
};

// The full drawing is taller than any hero: it is anchored bottom right and the page crops the rest.
const VIEW_BOX = {
  full: '40 -940 1140 1700',
  room: '150 116 892 509',
  door: '40 116 560 509',
};

const SCENE = {
  full: 'Richard stands at the open front door carrying a folded massage table, and a dashed outline by the window shows where the table will go.',
  room: 'Richard stands at the open front door carrying a folded massage table, and a dashed outline by the window shows where the table will go.',
  door: 'Richard stands at the open front door with a kit bag and a folded massage table while the resident greets him from inside.',
};

// The role is lettered on two lines to fit the corridor.
const roleBreak = THERAPIST.role.lastIndexOf(' ');
const ROLE_LINES = [
  THERAPIST.role.slice(0, roleBreak),
  THERAPIST.role.slice(roleBreak + 1),
];

export function SectionDrawing({
  hour,
  view = 'full',
  chosen = true,
  className,
}: SectionDrawingProps) {
  const stamp = chosen ? hour.time : 'Any hour';
  const id = useId();
  const reduce = useReducedMotion();
  const night = hour.id === 'night';
  const transition = reduce
    ? { duration: 0 }
    : { duration: 1.2, ease: [0.16, 1, 0.3, 1] as const };

  return (
    <svg
      viewBox={VIEW_BOX[view]}
      preserveAspectRatio={view === 'full' ? 'xMaxYMax slice' : undefined}
      className={cn(
        'block w-full',
        view === 'full' ? 'h-full overflow-visible' : 'h-auto',
        className
      )}
      role='img'
      aria-label={`Section drawing of an apartment in Abu Dhabi${chosen ? ` at ${hour.time}` : ''}. ${SCENE[view]}`}
    >
      <defs>
        <linearGradient
          id={`${id}-beam`}
          gradientUnits='userSpaceOnUse'
          x1='1028'
          y1='0'
          x2='64'
          y2='0'
        >
          <stop
            offset='0'
            stopColor='#dcae3f'
            stopOpacity='0.7'
          />
          <stop
            offset='1'
            stopColor='#dcae3f'
            stopOpacity='0.34'
          />
        </linearGradient>
      </defs>

      {/* Outside air, tinted by the hour: the sky over the roof and beyond the facade, wide enough to reach the page edge. */}
      <motion.rect
        x='40'
        y='-940'
        width='3000'
        height='1700'
        initial={false}
        animate={{ fill: SKY[hour.id] }}
        transition={transition}
      />

      {/* A neighbouring tower, lit after dark. */}
      <g
        className='fill-none stroke-poche'
        strokeWidth='1'
        opacity={night ? 0.9 : 0.3}
      >
        <rect
          x='1126'
          y='236'
          width='44'
          height='380'
          stroke={night ? '#c5c7ea' : undefined}
        />
        <rect
          x='1160'
          y='330'
          width='40'
          height='286'
          stroke={night ? '#c5c7ea' : undefined}
        />
      </g>
      <motion.g
        initial={false}
        animate={{ opacity: night ? 1 : 0 }}
        transition={transition}
        className='fill-sun'
      >
        {[262, 300, 338, 414, 452, 528].map((y, index) => (
          <rect
            key={y}
            x={index % 2 ? 1134 : 1150}
            y={y}
            width='12'
            height='16'
          />
        ))}
      </motion.g>

      <motion.circle
        r='20'
        className='fill-sun'
        initial={false}
        animate={{ ...SUN[hour.id], opacity: night ? 0 : 1 }}
        transition={transition}
      />

      {/* Rooms beyond the cut: the floor above, the corridor, the home, the floor below. */}
      <motion.rect
        x='64'
        y='-244'
        width='956'
        height='360'
        initial={false}
        animate={{ fill: OTHER_ROOMS[hour.id] }}
        transition={transition}
      />
      <motion.rect
        x='64'
        y='626'
        width='956'
        height='134'
        initial={false}
        animate={{ fill: OTHER_ROOMS[hour.id] }}
        transition={transition}
      />
      <rect
        x='64'
        y='140'
        width='316'
        height='460'
        fill='#dcdfd8'
      />
      <motion.rect
        x='380'
        y='140'
        width='640'
        height='460'
        initial={false}
        animate={{ fill: ROOM_WALL[hour.id] }}
        transition={transition}
      />

      {/* Wall panel joints. */}
      <g
        className='stroke-limewash'
        strokeWidth='1.5'
        opacity='0.8'
      >
        {[540, 700, 860].map((x) => (
          <line
            key={x}
            x1={x}
            y1='140'
            x2={x}
            y2='600'
          />
        ))}
      </g>

      {/* Corridor downlight. */}
      <polygon
        points='190,145 230,145 300,600 120,600'
        className='fill-limewash'
        opacity='0.4'
      />

      {/* The same downlight one storey up. */}
      <polygon
        points='190,-239 230,-239 290,116 130,116'
        className='fill-limewash'
        opacity='0.4'
      />

      {/* Sunlight. Only this moves. */}
      <g
        className='animate-sun-arrive'
        style={{ transformOrigin: '1028px 600px', transformBox: 'view-box' }}
      >
        <motion.path
          fill={`url(#${id}-beam)`}
          initial={false}
          animate={{ d: BEAM[hour.id], opacity: night ? 0 : 1 }}
          transition={transition}
        />
        <motion.path
          fill={`url(#${id}-beam)`}
          initial={false}
          animate={{ d: BEAM_ABOVE[hour.id], opacity: night ? 0 : 0.5 }}
          transition={transition}
        />
      </g>

      {/* Lamp light after dark. */}
      <motion.polygon
        points='766,452 814,452 890,600 690,600'
        className='fill-sun'
        initial={false}
        animate={{ opacity: night ? 0.36 : 0 }}
        transition={transition}
      />

      {/* The floor above: a hotel room. */}
      <g
        className='fill-limewash stroke-poche'
        strokeWidth='1.5'
      >
        <rect
          x='552'
          y='18'
          width='10'
          height='98'
          className='fill-poche'
          stroke='none'
        />
        <rect
          x='566'
          y='98'
          width='218'
          height='10'
        />
        <rect
          x='560'
          y='70'
          width='230'
          height='28'
          rx='8'
        />
        <rect
          x='568'
          y='54'
          width='56'
          height='18'
          rx='8'
        />
        <rect
          x='852'
          y='60'
          width='40'
          height='52'
          rx='6'
        />
        <path
          d='M862 60 v-14 h20 v14'
          fill='none'
        />
        {/* Picture over the bed, bedside pendant, closed door. */}
        <rect
          x='606'
          y='-84'
          width='132'
          height='78'
        />
        <line
          x1='618'
          y1='-30'
          x2='726'
          y2='-30'
        />
        <line
          x1='820'
          y1='-244'
          x2='820'
          y2='-52'
        />
        <path
          d='M802 -34 a18 18 0 0 1 36 0 Z'
          className='fill-poche'
        />
        <rect
          x='366'
          y='-184'
          width='8'
          height='300'
        />
        {/* Curtain, drawn back. */}
        <line
          x1='972'
          y1='-194'
          x2='1020'
          y2='-194'
          strokeWidth='2.5'
        />
        <path
          d='M980 -194 V110 M990 -194 V110 M1000 -194 V110 M1010 -194 V110'
          fill='none'
          strokeWidth='1'
        />
      </g>

      {/* The roof: tank, condenser, mast. */}
      <g
        className='fill-limewash stroke-poche'
        strokeWidth='1.5'
        strokeLinejoin='round'
      >
        <path
          d='M152 -268 V-300 M228 -268 V-300'
          fill='none'
        />
        <rect
          x='136'
          y='-372'
          width='108'
          height='72'
          rx='6'
        />
        <rect
          x='640'
          y='-314'
          width='86'
          height='46'
        />
        <circle
          cx='683'
          cy='-291'
          r='14'
          fill='none'
        />
        <path
          d='M884 -268 V-440 M868 -416 H900 M873 -394 H895'
          fill='none'
        />
      </g>

      {/* The floor below: a residence. */}
      <g
        className='stroke-poche'
        strokeWidth='1.5'
      >
        <line
          x1='962'
          y1='626'
          x2='962'
          y2='700'
        />
        <path
          d='M944 716 a18 18 0 0 1 36 0 Z'
          className='fill-poche'
        />
        <line
          x1='1000'
          y1='626'
          x2='1000'
          y2='724'
        />
        <path
          d='M984 738 a16 16 0 0 1 32 0 Z'
          className='fill-poche'
        />
        <rect
          x='96'
          y='700'
          width='210'
          height='60'
          className='fill-limewash'
        />
        <line
          x1='96'
          y1='730'
          x2='306'
          y2='730'
        />
      </g>

      {/* Furniture, drawn in line beyond the cut. */}
      <g
        className='fill-limewash stroke-poche'
        strokeWidth='1.5'
        strokeLinecap='round'
        strokeLinejoin='round'
      >
        {/* Open front door, seen face on. */}
        <rect
          x='380'
          y='300'
          width='96'
          height='300'
          opacity='0.8'
        />
        <circle
          cx='462'
          cy='456'
          r='3'
          className='fill-poche'
        />
        {/* Door number. */}
        <rect
          x='334'
          y='372'
          width='14'
          height='20'
        />

        {/* Shelf and picture. */}
        <line
          x1='590'
          y1='330'
          x2='744'
          y2='330'
          strokeWidth='2.5'
        />
        <rect
          x='600'
          y='300'
          width='10'
          height='30'
        />
        <rect
          x='612'
          y='292'
          width='9'
          height='38'
        />
        <rect
          x='623'
          y='304'
          width='13'
          height='26'
        />
        <rect
          x='700'
          y='306'
          width='28'
          height='24'
        />
        <rect
          x='808'
          y='246'
          width='112'
          height='84'
        />
        <line
          x1='818'
          y1='302'
          x2='910'
          y2='302'
        />
        <circle
          cx='884'
          cy='280'
          r='8'
          className='fill-sun'
          stroke='none'
        />

        {/* Pendant. */}
        <line
          x1='680'
          y1='140'
          x2='680'
          y2='222'
        />
        <path
          d='M660 242 a20 20 0 0 1 40 0 Z'
          className='fill-poche'
        />

        {/* Sofa. */}
        <rect
          x='578'
          y='498'
          width='174'
          height='58'
          rx='12'
        />
        <rect
          x='570'
          y='540'
          width='190'
          height='38'
          rx='10'
        />
        <rect
          x='600'
          y='510'
          width='46'
          height='34'
          rx='8'
        />
        <line
          x1='586'
          y1='578'
          x2='586'
          y2='600'
        />
        <line
          x1='744'
          y1='578'
          x2='744'
          y2='600'
        />

        {/* Floor lamp. */}
        <line
          x1='790'
          y1='600'
          x2='790'
          y2='452'
        />
        <line
          x1='776'
          y1='600'
          x2='804'
          y2='600'
          strokeWidth='4'
        />
        <polygon points='774,424 806,424 814,452 766,452' />

        {/* Balcony planter. */}
        <rect
          x='1078'
          y='562'
          width='30'
          height='42'
          rx='3'
        />
      </g>

      {/* Living things. */}
      <g className='fill-life'>
        <ellipse
          cx='1093'
          cy='532'
          rx='8'
          ry='32'
        />
        <ellipse
          cx='1093'
          cy='532'
          rx='8'
          ry='30'
          transform='rotate(-28 1093 562)'
        />
        <ellipse
          cx='1093'
          cy='532'
          rx='8'
          ry='30'
          transform='rotate(28 1093 562)'
        />
        <ellipse
          cx='1093'
          cy='540'
          rx='7'
          ry='24'
          transform='rotate(-56 1093 562)'
        />
        <ellipse
          cx='1093'
          cy='540'
          rx='7'
          ry='24'
          transform='rotate(56 1093 562)'
        />
      </g>

      {/* Where the massage table will go: dashed, as drawings mark what is yet to come. */}
      <g
        className='fill-none stroke-poche'
        strokeWidth='1.75'
        strokeDasharray='8 6'
        strokeLinecap='round'
      >
        <rect
          x='838'
          y='472'
          width='160'
          height='14'
          rx='6'
        />
        <rect
          x='814'
          y='470'
          width='26'
          height='10'
          rx='5'
        />
        <line
          x1='854'
          y1='486'
          x2='854'
          y2='600'
        />
        <line
          x1='982'
          y1='486'
          x2='982'
          y2='600'
        />
      </g>

      {/* People, drawn as scale figures. The resident greets from inside. */}
      <g
        transform='translate(522 600) scale(-0.96 0.96)'
        className='fill-poche'
      >
        <path d='M-15 -118 L-16 -8 H-3 L0 -104 L3 -8 H16 L15 -118 Z' />
        <path d='M-17 -8 H-2 L6 0 H-17 Z M2 -8 H17 L25 0 H2 Z' />
        <path d='M-20 -199 Q-21 -209 -11 -210 H11 Q21 -209 20 -199 L17 -106 H-17 Z' />
        <rect
          x='-5'
          y='-221'
          width='11'
          height='13'
        />
        <ellipse
          cx='1'
          cy='-233'
          rx='12'
          ry='15'
        />
        <path
          d='M-16 -198 L-22 -150 L-22 -110 M17 -198 L30 -176 L40 -212'
          className='fill-none stroke-poche'
          strokeWidth='11'
          strokeLinecap='round'
          strokeLinejoin='round'
        />
      </g>

      {/* Richard at the door, in his whites, a kit bag in one hand and the folded table in the other. */}
      <g
        transform='translate(250 600)'
        strokeLinecap='round'
        strokeLinejoin='round'
      >
        <rect
          x='-43'
          y='-102'
          width='30'
          height='38'
          rx='4'
          className='fill-poche'
        />
        <path
          d='M-36 -102 q8 -14 16 0'
          className='fill-none stroke-poche'
          strokeWidth='3'
        />
        <path
          d='M-17 -198 L-25 -150 L-27 -108'
          className='fill-none stroke-poche'
          strokeWidth='13'
        />
        <path
          d='M-17 -198 L-25 -150 L-27 -108'
          className='fill-none stroke-limewash'
          strokeWidth='9'
        />
        <g
          className='fill-limewash stroke-poche'
          strokeWidth='2'
        >
          <path d='M-16 -118 L-17 -8 H-3 L0 -104 L3 -8 H17 L16 -118 Z' />
          <path d='M-21 -199 Q-22 -209 -11 -210 H11 Q22 -209 21 -199 L18 -106 H-18 Z' />
          <path d='M-5 -209 V-220 H6 V-209' />
          <ellipse
            cx='1'
            cy='-233'
            rx='12'
            ry='15'
          />
        </g>
        <path
          d='M-18 -8 H-2 L6 0 H-18 Z M2 -8 H18 L26 0 H2 Z M-11 -236 A12 15 0 0 1 13 -236 Q8 -243 1 -242 Q-6 -243 -11 -236 Z'
          className='fill-poche'
        />

        {/* The folded table: two leaves, the legs tucked between, a carry handle. */}
        <g
          className='fill-limewash stroke-poche'
          strokeWidth='2'
        >
          <rect
            x='38'
            y='-136'
            width='9'
            height='136'
            rx='2'
          />
          <rect
            x='53'
            y='-136'
            width='9'
            height='136'
            rx='2'
          />
          <path
            d='M47 -118 L53 -96 L47 -74 M47 -52 L53 -30 L47 -8'
            fill='none'
            strokeWidth='1.5'
          />
          <path
            d='M40 -136 q10 -15 20 0'
            fill='none'
            strokeWidth='3'
          />
        </g>
        <path
          d='M18 -198 L27 -162 L37 -140'
          className='fill-none stroke-poche'
          strokeWidth='13'
        />
        <path
          d='M18 -198 L27 -162 L37 -140'
          className='fill-none stroke-limewash'
          strokeWidth='9'
        />
      </g>

      {/* Everything the section cuts through. */}
      <g className='fill-poche'>
        <rect
          x='40'
          y='-304'
          width='24'
          height='1064'
        />
        <rect
          x='40'
          y='-268'
          width='1002'
          height='24'
        />
        <rect
          x='1020'
          y='-304'
          width='22'
          height='110'
        />
        <rect
          x='40'
          y='116'
          width='1002'
          height='24'
        />
        <rect
          x='40'
          y='600'
          width='1002'
          height='26'
        />
        <rect
          x='1042'
          y='604'
          width='112'
          height='16'
        />
        <rect
          x='360'
          y='-244'
          width='20'
          height='60'
        />
        <rect
          x='360'
          y='140'
          width='20'
          height='160'
        />
        <rect
          x='360'
          y='626'
          width='20'
          height='134'
        />
        <rect
          x='1020'
          y='96'
          width='22'
          height='20'
        />
        <rect
          x='1020'
          y='140'
          width='22'
          height='50'
        />
        <rect
          x='1020'
          y='626'
          width='22'
          height='44'
        />
        <rect
          x='190'
          y='140'
          width='40'
          height='5'
          className='fill-poche-deep'
        />
        <rect
          x='190'
          y='-244'
          width='40'
          height='5'
          className='fill-poche-deep'
        />
      </g>

      {/* Glazing and balcony rail. */}
      <g
        className='stroke-poche'
        strokeWidth='1.5'
      >
        <line
          x1='1028'
          y1='190'
          x2='1028'
          y2='600'
        />
        <line
          x1='1034'
          y1='190'
          x2='1034'
          y2='600'
        />
        <line
          x1='1028'
          y1='-194'
          x2='1028'
          y2='96'
        />
        <line
          x1='1034'
          y1='-194'
          x2='1034'
          y2='96'
        />
        <line
          x1='1031'
          y1='670'
          x2='1031'
          y2='760'
        />
        <line
          x1='1150'
          y1='500'
          x2='1150'
          y2='604'
          strokeWidth='2.5'
        />
        <line
          x1='1138'
          y1='500'
          x2='1156'
          y2='500'
          strokeWidth='3.5'
        />
      </g>

      {/* The detail stops here: a drafted break line, not an accidental crop. */}
      {view === 'door' && (
        <path
          d='M590 116 V330 l-9 12 l18 14 l-9 12 V625'
          className='fill-none stroke-poche'
          strokeWidth='1.5'
          strokeLinejoin='round'
        />
      )}

      {/* Stamps, leaders and dimension lines, lettered in ink so they read on plaster and in the light. */}
      {view === 'room' ? (
        <>
          <line
            x1='918'
            y1='420'
            x2='918'
            y2='464'
            className='stroke-ink'
            strokeWidth='1.5'
          />
          <g className='fill-ink'>
            <circle
              cx='918'
              cy='466'
              r='3'
            />
            <text
              x='160'
              y='200'
              className='stamp'
              fontSize={chosen ? 42 : 30}
              fontWeight='300'
            >
              {stamp}
            </text>
            <text
              x='161'
              y='226'
              className='lettering'
              fontSize='22'
            >
              At your door
            </text>
            <text
              x='1008'
              y='410'
              textAnchor='end'
              className='lettering'
              fontSize='24'
            >
              Table goes here
            </text>
          </g>
        </>
      ) : (
        <>
          <g
            className='fill-none stroke-ink'
            strokeWidth='1'
          >
            {/* Who is at the door, and on what authority. */}
            <line
              x1='84'
              y1='324'
              x2='326'
              y2='324'
            />
            <line
              x1='250'
              y1='324'
              x2='250'
              y2='347'
            />
            {view === 'full' && (
              <>
                <line
                  x1='918'
                  y1='420'
                  x2='918'
                  y2='464'
                />
                <line
                  x1='396'
                  y1='630'
                  x2='396'
                  y2='666'
                />
                <line
                  x1='918'
                  y1='630'
                  x2='918'
                  y2='666'
                />
                <line
                  x1='396'
                  y1='658'
                  x2='918'
                  y2='658'
                />
                <line
                  x1='389'
                  y1='665'
                  x2='403'
                  y2='651'
                  strokeWidth='2'
                />
                <line
                  x1='911'
                  y1='665'
                  x2='925'
                  y2='651'
                  strokeWidth='2'
                />
              </>
            )}
          </g>
          <g className='fill-ink'>
            <circle
              cx='250'
              cy='349'
              r='2.5'
            />
            <text
              x='84'
              y='196'
              className='stamp'
              fontSize={chosen ? 40 : 29}
              fontWeight='300'
            >
              {stamp}
            </text>
            <text
              x='85'
              y='220'
              className='lettering'
              fontSize='18'
            >
              At your door
            </text>
            <text
              x='85'
              y='256'
              className='lettering'
              fontSize='18'
              fontWeight='500'
            >
              {THERAPIST.name}
            </text>
            <text
              className='lettering'
              fontSize='15.5'
            >
              <tspan
                x='85'
                y='277'
              >
                {ROLE_LINES[0]}
              </tspan>
              <tspan
                x='85'
                y='295'
              >
                {ROLE_LINES[1]}
              </tspan>
              <tspan
                x='85'
                y='313'
              >
                MOFA and KHDA attested
              </tspan>
            </text>
            <text
              x='396'
              y='170'
              className='lettering'
              fontSize='16'
            >
              Your home
            </text>
            {view === 'full' && (
              <>
                <circle
                  cx='918'
                  cy='466'
                  r='2.5'
                />
                <text
                  x='1008'
                  y='410'
                  textAnchor='end'
                  className='lettering'
                  fontSize='18'
                >
                  Table goes here
                </text>
                <text
                  x='657'
                  y='649'
                  textAnchor='middle'
                  className='lettering'
                  fontSize='17'
                >
                  Your commute · 0 km
                </text>
                <text
                  x='396'
                  y='36'
                  className='lettering'
                  fontSize='16'
                >
                  A hotel room
                </text>
                <text
                  x='396'
                  y='746'
                  className='lettering'
                  fontSize='16'
                >
                  A residence
                </text>
              </>
            )}
          </g>
        </>
      )}
    </svg>
  );
}
