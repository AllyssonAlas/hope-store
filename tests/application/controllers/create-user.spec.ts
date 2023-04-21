import { CreateUserController } from '@/application/controllers';

describe('CreateUserController', () => {
  it('Should return 400 if name is not received', async () => {
    const sut = new CreateUserController();

    const response = await sut.handle({
      email: 'any_email@mail.com',
      password: 'any_password',
      role: 'any_role',
    });

    expect(response.statusCode).toBe(400);
    expect(response.data).toEqual(new Error('Field name is required'));
  });

  it('Should return 400 if email is not received', async () => {
    const sut = new CreateUserController();

    const response = await sut.handle({
      name: 'any_name',
      password: 'any_password',
      role: 'any_role',
    });

    expect(response.statusCode).toBe(400);
    expect(response.data).toEqual(new Error('Field email is required'));
  });

  it('Should return 400 if password is not received', async () => {
    const sut = new CreateUserController();

    const response = await sut.handle({
      name: 'any_name',
      email: 'any_email@mail.com',
      role: 'any_role',
    });

    expect(response.statusCode).toBe(400);
    expect(response.data).toEqual(new Error('Field password is required'));
  });

  it('Should return 400 if role is not received', async () => {
    const sut = new CreateUserController();

    const response = await sut.handle({
      name: 'any_name',
      email: 'any_email@mail.com',
      password: 'any_password',
    });

    expect(response.statusCode).toBe(400);
    expect(response.data).toEqual(new Error('Field role is required'));
  });

  it('Should return 400 if email received is not valid', async () => {
    const sut = new CreateUserController();

    const response = await sut.handle({
      name: 'any_name',
      email: '@mail.com',
      password: 'any_password',
      role: 'any_role',
    });

    expect(response.statusCode).toBe(400);
    expect(response.data).toEqual(new Error('Field email is not valid'));
  });
});
