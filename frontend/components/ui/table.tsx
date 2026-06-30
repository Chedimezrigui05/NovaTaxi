'use client';

import { Motion } from '@/lib/motion';
import { cn } from '@/lib/utils';
import type { HTMLAttributes, ReactNode } from 'react';

interface TableProps extends HTMLAttributes<HTMLDivElement> {
  headers: string[];
  rows: ReactNode[][];
}

const Table = ({ headers, rows, className, ...props }: TableProps) => (
  <Motion.div
    className={cn('w-full', className)}
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.4, ease: 'easeOut' }}
    {...props}
  >
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead>
          <tr className="border-b-2 border-slate-200 bg-slate-50">
            {headers.map((header) => (
              <th
                key={header}
                className="px-6 py-4 text-left text-sm font-semibold text-slate-900"
              >
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-100">
          {rows.map((row, rowIndex) => (
            <tr
              key={rowIndex}
              className="transition-all duration-200 hover:bg-slate-50"
            >
              {row.map((cell, cellIndex) => (
                <td
                  key={`${rowIndex}-${cellIndex}`}
                  className="px-6 py-4 text-sm text-slate-700"
                >
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </Motion.div>
);

export { Table };
