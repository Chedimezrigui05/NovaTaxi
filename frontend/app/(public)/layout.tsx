import type { PropsWithChildren } from 'react';
import PublicLayout from '@/components/layouts/PublicLayout';

export const metadata = {
  title: 'NovaTaxi | Explore',
  description: 'Public pages for NovaTaxi',
};

export default function PublicRouteLayout({ children }: PropsWithChildren) {
  return <PublicLayout>{children}</PublicLayout>;
}
