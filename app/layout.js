import "./globals.css";
import { Analytics } from "@vercel/analytics/react"

export const metadata = {
  title: "zennspace",
  description: "Boost your focus and productivity with ZennSpace - a next-gen Pomodoro and deep work companion. Stay on track, optimize your workflow, and achieve more. Coming soon!",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="text-slate-200">
        {children}
        <Analytics />
      </body>
    </html>
  );
}
