export function maskPhoneNumber(phoneNumber) {
    if (phoneNumber?.length > 4) {
        const lastFourDigits = phoneNumber.slice(-4);
        return `XXXXXX${lastFourDigits}`;
    }
    // If phone number is 4 digits or less, return as is or handle differently
    return phoneNumber || '';
}
