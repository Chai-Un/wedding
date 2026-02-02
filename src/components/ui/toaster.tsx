import { Toaster as Sonner } from 'sonner';

export function Toaster() {
  return (
    <Sonner
      position="top-right"
      toastOptions={{
        style: {
          background: '#2a2722',
          border: '1px solid #d4c5ad',
          color: '#d4c5ad',
        },
        className: 'font-serif',
      }}
    />
  );
}
