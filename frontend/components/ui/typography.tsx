'use client';

import type { ReactNode } from 'react';

export const Heading = ({ children }: { children: ReactNode }) => (
  <h1 className="text-4xl font-semibold tracking-tight text-slate-950 sm:text-5xl">{children}</h1>
);

export const Subheading = ({ children }: { children: ReactNode }) => (
  <p className="max-w-2xl text-xl leading-8 text-slate-700">{children}</p>
);

export const SectionTitle = ({ children }: { children: ReactNode }) => (
  <h2 className="text-2xl font-semibold tracking-tight text-slate-950">{children}</h2>
);

export const Label = ({ children }: { children: ReactNode }) => (
  <label className="block text-sm font-medium text-slate-900">{children}</label>
);
