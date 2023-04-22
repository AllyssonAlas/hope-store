import { CreateUserController } from '@/application/controllers';

describe('CreateUserController', () => {
  let sut: CreateUserController;
  let createUser: jest.Mock;

  beforeAll(() => {
    createUser = jest.fn();
  });

  beforeEach(() => {
    sut = new CreateUserController(createUser);
  });

  it('Should return 400 if name is not received', async () => {
    const response = await sut.handle({
      email: 'any_email@mail.com',
      password: 'any_password',
      role: 'any_role',
    });

    expect(response.statusCode).toBe(400);
    expect(response.data).toEqual(new Error('Field name is required'));
  });

  it('Should return 400 if email is not received', async () => {
    const response = await sut.handle({
      name: 'any_name',
      password: 'any_password',
      role: 'any_role',
    });

    expect(response.statusCode).toBe(400);
    expect(response.data).toEqual(new Error('Field email is required'));
  });

  it('Should return 400 if password is not received', async () => {
    const response = await sut.handle({
      name: 'any_name',
      email: 'any_email@mail.com',
      role: 'any_role',
    });

    expect(response.statusCode).toBe(400);
    expect(response.data).toEqual(new Error('Field password is required'));
  });

  it('Should return 400 if role is not received', async () => {
    const response = await sut.handle({
      name: 'any_name',
      email: 'any_email@mail.com',
      password: 'any_password',
    });

    expect(response.statusCode).toBe(400);
    expect(response.data).toEqual(new Error('Field role is required'));
  });

  it('Should return 400 if email received is not valid', async () => {
    const response = await sut.handle({
      name: 'any_name',
      email: '@mail.com',
      password: 'any_password',
      role: 'any_role',
    });

    expect(response.statusCode).toBe(400);
    expect(response.data).toEqual(new Error('Field email is not valid'));
  });

  it('Should call CreateUser with correct input', async () => {
    await sut.handle({
      name: 'any_name',
      email: 'email@mail.com',
      password: 'any_password',
      role: 'any_role',
    });

    expect(createUser).toHaveBeenCalledWith({
      name: 'any_name',
      email: 'email@mail.com',
      password: 'any_password',
      role: 'any_role',
    });
    expect(createUser).toHaveBeenCalledTimes(1);
  });
});
