export function HowWeWork({ details }: { details: string[] }) {
  return (
    <div>
      <h3 className='text-xl text-poche lettering-display'>What happens in a session</h3>
      <ul className='mt-3 border-t border-poche'>
        {details.map((detail) => (
          <li
            key={detail}
            className='border-b border-mortar py-4 text-[1.0625rem] leading-7 text-ink'
          >
            {detail}
          </li>
        ))}
      </ul>
    </div>
  );
}
