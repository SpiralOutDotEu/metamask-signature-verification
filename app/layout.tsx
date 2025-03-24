import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
    variable: "--font-geist-sans",
    subsets: ["latin"],
});

const geistMono = Geist_Mono({
    variable: "--font-geist-mono",
    subsets: ["latin"],
});

export const metadata: Metadata = {
    metadataBase: new URL("https://yourwebsite.com"), // Replace with your actual domain
    title: "MetaMask Signature Verification Demo",
    description:
        "A demo showing how to sign and verify messages using MetaMask and Ethereum's personal sign method. Includes secure cryptographic verification in a Next.js app.",
    keywords: [
        "MetaMask",
        "Ethereum",
        "Signature Verification",
        "Crypto Signing",
        "Cryptographic Security",
        "Blockchain",
        "Next.js",
    ],
    authors: [{ name: "Your Name or Team" }],
    openGraph: {
        title: "MetaMask Signature Verification Demo",
        description:
            "Learn how to sign and verify Ethereum messages securely using MetaMask in a Next.js application. Ideal for Web3 developers.",
        images: ["/meta_site.png"],
        url: "https://yourwebsite.com",
        type: "website",
    },
    twitter: {
        card: "summary_large_image",
        title: "MetaMask Signature Verification Demo",
        description:
            "Learn how to implement cryptographic signature verification with MetaMask in a secure Next.js app.",
        images: ["/meta_site.png"],
    },
    icons: {
        icon: "/favicon.ico",
    },
};

// Export viewport separately
export const viewport = {
    width: "device-width",
    initialScale: 1,
};

export default function RootLayout({
                                       children,
                                   }: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
        <body
            className={`${geistSans.variable} ${geistMono.variable} antialiased bg-gray-900 text-gray-100`}
        >
        <main>{children}</main>
        </body>
        </html>
    );
}