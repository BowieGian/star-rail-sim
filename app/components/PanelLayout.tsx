import React, { ReactNode } from 'react';

interface Props {
  children?: ReactNode
}

export default function PanelLayout({ children }: Props) {
  return (
    <div className="w-full max-w-6xl overflow-hidden rounded-xl bg-neutral-700 shadow-lg">
      <div className="px-4 py-5 sm:p-6">{children}</div>
    </div>
  );
}
