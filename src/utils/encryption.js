import crypto from "crypto"

export function generateSalt() {
    return crypto.randomBytes(128).toString('base64');
}

export function generateHashedPassword(salt, password) {
    return crypto.createHmac('sha256', salt).update(password).digest('hex');
}