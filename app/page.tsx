'use client';

import SignatureComponent from './components/SignatureComponent';

export default function Home() {
    return (
        <main className="min-h-screen p-8 flex flex-col items-center justify-center">
            <h1 className="text-3xl font-bold mb-8 text-gray-100">
                MetaMask Signature Verification
            </h1>

            {/* App Description */}
            <div className="max-w-xl text-center text-gray-300 mb-8">
                <p>
                    This is a demo showing how to sign a message with MetaMask and verify the signature.
                </p>
                <p className="mt-4">
                    Enter a message, sign it, and check the result.
                </p>
                <p className="mt-4">
                    The code for this demo is available on GitHub!
                </p>
            </div>

            {/* Signature Component */}
            <SignatureComponent />
        </main>
    );
}