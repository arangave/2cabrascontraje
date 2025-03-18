import "./globals.css";

export const metadata = {
  title: "2CabrasConTraje",
  description: "Moda exclusiva para quienes buscan algo único.",
};

import { ReactNode } from "react";

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="es">
      <body className="bg-gray-100 text-gray-900">
        {children}
      </body>
    </html>
  );
}
