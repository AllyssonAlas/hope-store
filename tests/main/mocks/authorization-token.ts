
import { sign } from 'jsonwebtoken';
import { PrismaClient } from '@prisma/client';

import { AuthToken } from '@/domain/entities';
import { env } from '@/main/config/env';

export const mockAuthorizationToken = async (permission: string): Promise<string> => {
  const prisma = new PrismaClient();

  await prisma.role.create({
    data: {
      name: 'any_role_name',
      permissions: {
        create: [{ name: permission }],
      },
    },
  });

  const user = await prisma.user.create({
    data: {
      name: 'any_user_name',
      email: 'any_email@email.com',
      password: 'any_password',
      role: 'any_role_name',
    },
  });

  return sign({
    id: user.id,
    role: 'any_role_name',
    permissions: [permission],
  }, env.jwtSecret, { expiresIn: AuthToken.expirationInMs / 1000 });
};
