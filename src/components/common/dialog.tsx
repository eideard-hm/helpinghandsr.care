'use client';

type DialogProps = {
  panelId: string;
  open: boolean;
  children: React.ReactNode;
};

export function Dialog({ panelId, open, children }: DialogProps) {
  return (
    <div
      role='dialog'
      id={panelId}
      hidden={!open}
      className='md:hidden border-t bg-white/95 backdrop-blur absolute top-28 left-0 right-0 shadow-md'
    >
      {children}
    </div>
  );
}
