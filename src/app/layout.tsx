import type {Metadata} from "next";
import {Roboto} from "next/font/google";
import "./globals.css";

const roboto = Roboto({
    variable: "--font-roboto",
    subsets: ["latin"],
});

export const metadata: Metadata = {
    title: "Sample User Admin APP",
    description: "A sample user admin app built with Next.js and TypeScript",
};

export default function RootLayout({
                                       children,
                                   }: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en"
              data-google-analytics-opt-out="">
        <body
            className={`${roboto.variable} antialiased`}
        >
        <main className="max-w-2xl mx-auto my-4 px-4">
            {children}
        </main>
        <footer className="text-center text-xs text-gray-500 mt-8">
            &copy; {new Date().getFullYear()} <a href="https://erny.co" target="_blank" rel="noopener noreferrer"
                                                 className="underline">Erny Sans</a>.
        </footer>
        </body>
        </html>
    );
}
