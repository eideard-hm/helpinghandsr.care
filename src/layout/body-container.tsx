interface BodyContainerLayoutProps {
  children: React.ReactNode;
}

export function BodyContainerLayout({ children }: BodyContainerLayoutProps) {
  return <main>{children}</main>;
}

//  <main className='container mx-auto grid grid-cols-12 gap-6 px-4 py-8 my-4'></main>;
