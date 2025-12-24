// app/layout.js
import "./globals.css";
import Navbar from "./components/navbar.js"; // Make sure the path is correct


export const metadata = {
  title: "Saurav | Master of Code",
  description: "Portfolio of a Master of Code and AI Solutions",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="scroll-smooth"> {/* Added scroll-smooth for nice transitions */}
      <body className="antialiased bg-[#030014]">
        <Navbar />
        {children}
      </body>
    </html>
  );
}