import React from 'react';
import Head from 'next/head';
import { Geist, Geist_Mono } from "next/font/google";
import './globals.css'

const geistSans = Geist({
    variable: "--font-geist-sans",
    subsets: ["latin"],
});

const geistMono = Geist_Mono({
    variable: "--font-geist-mono",
    subsets: ["latin"],
});


export default function RootLayout({
                                       children,
                                   }: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
        {/* Meta Tags Section */}
        <Head>
            {/* Basic Meta Tags */}
            <title>MetaMask Signature Verification Demo</title>
            <meta
                name="description"
                content="A demo showing how to sign and verify messages using MetaMask and Ethereum's personal sign method. Includes secure cryptographic verification in a Next.js app."
            />
            <meta
                name="keywords"
                content="MetaMask, Ethereum, Signature Verification, Crypto Signing, Cryptographic Security, Blockchain, Next.js"
            />
            <meta name="author" content="Your Name or Team" />
            <meta name="viewport" content="width=device-width, initial-scale=1" />

            {/* Open Graph Meta Tags */}
            <meta
                property="og:title"
                content="MetaMask Signature Verification Demo"
            />
            <meta
                property="og:description"
                content="Learn how to sign and verify Ethereum messages securely using MetaMask in a Next.js application. Ideal for Web3 developers."
            />
            <meta
                property="og:image"
                content="/meta_site.png"
            />
            <meta property="og:url" content="https://yourwebsite.com" />
            <meta property="og:type" content="website" />

            {/* Twitter Card Meta Tags */}
            <meta name="twitter:card" content="summary_large_image" />
            <meta name="twitter:title" content="MetaMask Signature Verification Demo" />
            <meta
                name="twitter:description"
                content="Learn how to implement cryptographic signature verification with MetaMask in a secure Next.js app."
            />
            <meta name="twitter:image" content="/meta_site.png" />

            {/* Favicon */}
            <link rel="icon" href="/favicon.ico" />
        </Head>
        <body
            className={`${geistSans.variable} ${geistMono.variable} antialiased bg-gray-900 text-gray-100`}
        >
        <>


            {/* Main Content Section */}
            <main>{children}</main>
        </>
        </body>
        </html>
    );
}