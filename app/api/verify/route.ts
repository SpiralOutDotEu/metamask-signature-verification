import {NextRequest, NextResponse} from 'next/server';
import {hashMessage, recoverAddress, toUtf8Bytes} from 'ethers';

export async function POST(request: NextRequest) {
    try {
        const { message, signature, address } = await request.json();

        // Validation
        if (!message || !signature || !address) {
            return NextResponse.json(
                { valid: false, error: 'Missing required fields' },
                { status: 400 }
            );
        }

        // Verify the signature
        let recoveredAddress;
        try {
            // Hash the message as MetaMask does
            const messageBytes = toUtf8Bytes(message);
            const hash = hashMessage(messageBytes);

            // Recover the signer's address
            recoveredAddress = recoverAddress(hash, signature);
        } catch (error) {
            console.error("Verification error:", error);
            return NextResponse.json(
                { valid: false, error: 'Invalid signature format' },
                { status: 400 }
            );
        }

        // Check if the recovered address matches the provided address
        const isValid = recoveredAddress.toLowerCase() === address.toLowerCase();

        return NextResponse.json({
            valid: isValid,
            recoveredAddress,
            providedAddress: address
        });
    } catch (error) {
        console.error('Error verifying signature:', error);
        return NextResponse.json(
            { valid: false, error: 'Server error' },
            { status: 500 }
        );
    }
}