export const env = {
  port: process.env.PORT ?? 8080,
  salt: Number(process.env.SALT) ?? 12,
  jwtSecret: 'runfasbreakthings' ?? process.env.JWT_SECRET,
};
