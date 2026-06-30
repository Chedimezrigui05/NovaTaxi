import '../styles/globals.css';
import { PropsWithChildren } from 'react';

export const metadata = {
  title: 'NovaTaxi',
  description: 'NovaTaxi - Frontend'
};

export default function RootLayout({ children }: PropsWithChildren) {
  return (
    <html lang="en">
      <body>
        {/* App layout - keep simple for initialization */}
        {children}
      </body>
    </html>
  );
}
