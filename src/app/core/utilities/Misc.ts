import * as pako from 'pako'; // Asegúrate de tener pako instalado: npm install pako

export function decompressText(base64String: string): string {
    if (!base64String) {
        throw new Error('Input string is empty.');
    }

    const compressedData = Uint8Array.from(atob(base64String), c => c.charCodeAt(0));
    const decompressedData = pako.inflate(compressedData, { to: 'string' });

    if (typeof decompressedData !== 'string') {
        throw new Error('Decompressed data is not a string.');
    }

    return decompressedData;
}
