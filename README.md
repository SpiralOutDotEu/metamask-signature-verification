# MetaMask Signature Verification Demo

This project demonstrates how to implement cryptographic signature verification using MetaMask and Ethereum's personal sign method in a Next.js application.

## Overview

This application allows users to:

1. Enter a custom message
2. Sign the message using their MetaMask wallet
3. Send the message, signature, and address to a backend API
4. Verify the signature's authenticity on the server-side
5. Display the verification result to the user

## How Ethereum Signatures Work

Ethereum's personal signing mechanism works as follows:

1. A message is converted to UTF-8 bytes and then prefixed with a standard message: `"\x19Ethereum Signed Message:\n" + message.length + message`
2. This prefixed message is hashed using Keccak-256
3. The user signs this hash with their private key (via MetaMask)
4. The signature can be verified by recovering the signer's address from the signature and comparing it with the expected address

## Security Considerations

### ⚠️ Important Security Warning

The current implementation has a security vulnerability: it doesn't include a timestamp or nonce in the signed message. This means signatures could potentially be reused in replay attacks.

For production use, you should:

1. **Always include a timestamp or nonce in the message before signing**
   ```js
   // Example of a more secure message format
   const secureMessage = JSON.stringify({
     originalMessage: userMessage,
     timestamp: Date.now(),
     nonce: generateRandomNonce(), // Implement this function and get a unique nonce from server side
     domain: window.location.host // Prevents cross-site signature reuse
   });
   ```

2. **Verify the timestamp/nonce on the backend**
   - Check that the timestamp is recent (e.g., within last 5 minutes)
   - Store used nonces to prevent replay attacks or use server side nonce generation
   - Validate that the domain matches your application

3. **Consider using EIP-712 typed data for more complex applications**

## How to Use This Demo

1. Clone this repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Run the development server:
   ```bash
   npm run dev
   ```
4. Open [http://localhost:3000](http://localhost:3000) in your browser
5. Make sure MetaMask is installed and connected to your desired network
6. Enter a message, click "Sign with MetaMask" and approve the signature request
7. View the signature data and verification result

## Technical Implementation

### Frontend

The frontend uses React/Next.js with TypeScript and consists of:
- A text input for the message
- A button to trigger the MetaMask signing process
- A display area for the signature data
- Verification result feedback

### Backend

The verification happens on the backend via a Next.js API route:
1. The API receives the message, signature, and expected address
2. It uses ethers.js to recover the signer's address from the signature
3. It compares the recovered address with the provided address
4. It returns a JSON response indicating if the signature is valid

## Use Cases

This pattern can be used for:
- User authentication without passwords
- Verifying ownership of an Ethereum address
- Authorizing specific actions for wallet owners
- Creating secure, non-forgeable user-generated content

## Best Practices for Production

1. Always include a timestamp or nonce in signed messages
2. Set a short expiration time for signatures
3. Store used signatures/nonces to prevent replay attacks
4. Consider implementing EIP-712 typed structured data for complex applications
5. Add rate limiting to prevent brute force attacks
6. Log all signature verification attempts for security auditing

## Dependencies

- Next.js 15.x
- ethers.js 6.x
- TypeScript
- MetaMask or any other Ethereum compatible browser extension

## License

[MIT](LICENSE)