import type { PropsWithChildren } from 'react';
import ProtectedLayout from '@/components/layouts/ProtectedLayout';

export const metadata = {
  title: 'NovaTaxi | Dashboard',
  description: 'Protected dashboard routes for NovaTaxi',
};

export default function ProtectedRouteLayout({ children }: PropsWithChildren) {
  return <ProtectedLayout>{children}</ProtectedLayout>;
}
