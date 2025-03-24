'use client';

import { useState, useEffect } from 'react';
import { toUtf8Bytes, hexlify } from 'ethers';

declare global {
    interface Window {
        ethereum?: import('ethers').Eip1193Provider;
    }
}

export default function SignatureComponent() {
    const [message, setMessage] = useState('');
    const [signature, setSignature] = useState('');
    const [editableSignature, setEditableSignature] = useState('');
    const [address, setAddress] = useState('');
    const [verificationResult, setVerificationResult] = useState('');
    const [loading, setLoading] = useState(false);
    const [hasMetaMask, setHasMetaMask] = useState(false);
    const [isSigned, setIsSigned] = useState(false);

    useEffect(() => {
        const checkMetaMask = async () => {
            setHasMetaMask(typeof window !== 'undefined' && window.ethereum !== undefined);
        };
        checkMetaMask();
    }, []);

    const signMessage = async () => {
        if (!message) {
            alert('Please enter a message to sign');
            return;
        }

        if (!hasMetaMask) {
            alert('MetaMask is not installed!');
            return;
        }

        try {
            if (!window.ethereum) {
                alert('MetaMask is not installed!');
                return;
            }

            setLoading(true);

            // Request account access
            const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
            const userAddress = accounts[0];
            setAddress(userAddress);

            // Sign the message
            const sig = await window.ethereum.request({
                method: 'personal_sign',
                params: [hexlify(toUtf8Bytes(message)), userAddress]
            });

            setSignature(sig);
            setEditableSignature(sig);
            setIsSigned(true);
            setVerificationResult('');
        } catch (error) {
            console.error('Error signing message:', error);
            setVerificationResult('Failed to sign message');
        } finally {
            setLoading(false);
        }
    };

    const verifySignature = async () => {
        if (!editableSignature) {
            alert('Signature cannot be empty');
            return;
        }

        try {
            setLoading(true);
            const response = await fetch('/api/verify', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    message,
                    signature: editableSignature,
                    address
                }),
            });

            const data = await response.json();
            setVerificationResult(data.valid ? 'Signature verified successfully!' : 'Invalid signature! The signature was tampered with or is invalid.');
        } catch (error) {
            console.error('Error verifying signature:', error);
            setVerificationResult('Error verifying signature');
        } finally {
            setLoading(false);
        }
    };

    const resetSignature = () => {
        setEditableSignature(signature);
    };

    return (
        <div className="w-full max-w-lg bg-gray-900 p-8 rounded-xl shadow-lg space-y-6">
            <div className="space-y-2">
                <label htmlFor="message" className="block text-base font-semibold text-gray-300">
                    Enter your message
                </label>
                <textarea
                    id="message"
                    className="w-full bg-gray-800 border border-gray-700 rounded-md p-3 h-32 text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Type a message to sign..."
                    disabled={loading || isSigned}
                />
            </div>

            {!isSigned ? (
                <button
                    className="w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white px-6 py-3 rounded-lg shadow-md hover:from-blue-700 hover:to-blue-800 transition disabled:opacity-50"
                    onClick={signMessage}
                    disabled={!message || loading || !hasMetaMask}
                >
                    {loading ? 'Signing...' : 'Sign with MetaMask'}
                </button>
            ) : (
                <div className="space-y-6">
                    <div className="space-y-4 mt-6">
                        <div className="border border-gray-700 rounded-lg p-6 bg-gray-800 shadow-inner">
                            <h3 className="font-semibold text-xl mb-3 text-gray-200">Signature Data</h3>
                            <div className="space-y-4">
                                <div>
                                    <span className="font-medium text-gray-300">Address: </span>
                                    <span className="break-all font-mono text-sm text-gray-400">{address}</span>
                                </div>

                                <div>
                                    <span className="font-medium text-gray-300">Message: </span>
                                    <span className="break-all font-mono text-sm text-gray-400">{message}</span>
                                </div>

                                <div className="space-y-2">
                                    <label htmlFor="editableSignature" className="block font-medium text-gray-300">
                                        Signature (you can edit this to test invalid signatures):
                                    </label>
                                    <textarea
                                        id="editableSignature"
                                        className="w-full font-mono text-sm bg-gray-700 border-2 border-gray-600 text-gray-200 p-3 rounded-lg h-28 focus:outline-none focus:ring-2 focus:ring-blue-400 transition break-all"
                                        value={editableSignature}
                                        onChange={(e) => setEditableSignature(e.target.value)}
                                    />
                                    <div className="flex space-x-4 mt-2">
                                        <button
                                            className="flex-1 text-sm px-4 py-2 border border-blue-500 rounded-lg bg-blue-500 text-white shadow-md hover:bg-blue-600 transition"
                                            onClick={resetSignature}
                                        >
                                            Reset signature
                                        </button>

                                        <button
                                            className="flex-1 text-sm px-4 py-2 border border-red-500 rounded-lg bg-red-500 text-white shadow-md hover:bg-red-600 transition"
                                            onClick={() => setEditableSignature(editableSignature.substring(0, editableSignature.length - 5) + "00000")}
                                        >
                                            Tamper signature
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="flex space-x-4">
                            <button
                                className="flex-1 bg-green-600 hover:bg-green-700 transition text-white px-6 py-3 rounded-lg shadow-md disabled:opacity-50"
                                onClick={verifySignature}
                                disabled={loading}
                            >
                                {loading ? 'Verifying...' : 'Verify Signature'}
                            </button>

                            <button
                                className="bg-gray-700 hover:bg-gray-600 transition text-white px-6 py-3 rounded-lg shadow-md disabled:opacity-50"
                                onClick={() => {
                                    setIsSigned(false);
                                    setSignature('');
                                    setEditableSignature('');
                                    setVerificationResult('');
                                }}
                                disabled={loading}
                            >
                                New Message
                            </button>
                        </div>

                        {verificationResult && (
                            <div
                                className={`p-3 rounded-lg border ${verificationResult.includes('successfully') ? 'bg-green-800 text-green-300 border-green-600' : 'bg-red-800 text-red-300 border-red-600'}`}
                            >
                                {verificationResult}
                            </div>
                        )}
                    </div>
                </div>
            )}

            {!hasMetaMask && (
                <div className="text-red-400 font-medium mt-4">
                    MetaMask is not installed. Please install MetaMask to use this feature.
                </div>
            )}
        </div>
    );
}
