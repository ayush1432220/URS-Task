const crypto = require("crypto");

const TOKEN_HEADER = {
  alg: "HS256",
  typ: "JWT",
};

const base64UrlEncode = (value) =>
  Buffer.from(value).toString("base64url");

const base64UrlDecode = (value) =>
  Buffer.from(value, "base64url").toString("utf8");

const createSignature = (payload, secret) =>
  crypto.createHmac("sha256", secret).update(payload).digest("base64url");

const createAccessToken = ({ subject, email, expiresInMinutes, secret }) => {
  const issuedAt = Math.floor(Date.now() / 1000);
  const expiresAt = issuedAt + expiresInMinutes * 60;

  const encodedHeader = base64UrlEncode(JSON.stringify(TOKEN_HEADER));
  const encodedPayload = base64UrlEncode(
    JSON.stringify({
      sub: subject,
      email,
      iat: issuedAt,
      exp: expiresAt,
    })
  );

  const unsignedToken = `${encodedHeader}.${encodedPayload}`;
  const signature = createSignature(unsignedToken, secret);

  return `${unsignedToken}.${signature}`;
};

const verifyAccessToken = ({ token, secret }) => {
  const [encodedHeader, encodedPayload, providedSignature] = token.split(".");

  if (!encodedHeader || !encodedPayload || !providedSignature) {
    throw new Error("Malformed token.");
  }

  const unsignedToken = `${encodedHeader}.${encodedPayload}`;
  const expectedSignature = createSignature(unsignedToken, secret);
  const providedSignatureBuffer = Buffer.from(providedSignature);
  const expectedSignatureBuffer = Buffer.from(expectedSignature);

  if (providedSignatureBuffer.length !== expectedSignatureBuffer.length) {
    throw new Error("Invalid token signature.");
  }

  const isValidSignature = crypto.timingSafeEqual(
    providedSignatureBuffer,
    expectedSignatureBuffer
  );

  if (!isValidSignature) {
    throw new Error("Invalid token signature.");
  }

  const payload = JSON.parse(base64UrlDecode(encodedPayload));
  const currentTimestamp = Math.floor(Date.now() / 1000);

  if (!payload.exp || payload.exp < currentTimestamp) {
    throw new Error("Token has expired.");
  }

  return payload;
};

module.exports = {
  createAccessToken,
  verifyAccessToken,
};
