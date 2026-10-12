/** The room the visitor asked for: cut in section like the others, with nothing drawn inside. */
export function EmptyRoom({ className }: { className?: string }) {
  return (
    <svg
      viewBox='0 0 640 420'
      className={className}
      role='img'
      aria-label='Section drawing of an empty room with an open door'
    >
      {/* Outside air and the room beyond the cut. */}
      <rect
        x='560'
        y='20'
        width='80'
        height='370'
        fill='#e4e8f2'
      />
      <rect
        x='44'
        y='44'
        width='500'
        height='320'
        fill='#e7e9e3'
      />

      {/* Daylight on an empty floor. */}
      <polygon
        points='548,84 548,364 300,364'
        className='fill-sun'
        opacity='0.5'
      />

      {/* What would be here: dashed, as drawings mark what is not built. */}
      <g
        className='fill-none stroke-poche'
        strokeWidth='1.75'
        strokeDasharray='8 6'
        strokeLinecap='round'
      >
        <rect
          x='250'
          y='250'
          width='170'
          height='14'
          rx='6'
        />
        <path d='M268 264 V364 M402 264 V364' />
      </g>

      {/* The open door, seen face on. */}
      <rect
        x='44'
        y='124'
        width='86'
        height='240'
        className='fill-limewash stroke-poche'
        strokeWidth='1.5'
      />
      <circle
        cx='116'
        cy='248'
        r='3'
        className='fill-poche'
      />

      {/* Everything the section cuts through. */}
      <g className='fill-poche'>
        <rect
          x='0'
          y='20'
          width='560'
          height='24'
        />
        <rect
          x='0'
          y='364'
          width='560'
          height='26'
        />
        <rect
          x='24'
          y='44'
          width='20'
          height='80'
        />
        <rect
          x='540'
          y='44'
          width='20'
          height='40'
        />
      </g>
      <path
        d='M548 84 V364 M554 84 V364'
        className='fill-none stroke-poche'
        strokeWidth='1.5'
      />

      <g className='fill-ink'>
        <text
          x='150'
          y='86'
          className='stamp'
          fontSize='34'
          fontWeight='300'
        >
          404
        </text>
        <text
          x='151'
          y='110'
          className='lettering'
          fontSize='15'
        >
          Not on the drawing
        </text>
        <text
          x='335'
          y='236'
          textAnchor='middle'
          className='lettering'
          fontSize='15'
        >
          Nothing here yet
        </text>
      </g>
    </svg>
  );
}
