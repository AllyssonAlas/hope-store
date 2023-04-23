import { EmailAlreadyExistsError, NonexistentRoleError } from '@/domain/errors';
import { CreateUserController } from '@/application/controllers';
import { ForbiddenError, ServerError, RequiredParamError, InvalidRequiredParamError } from '@/application/errors';

describe('CreateUserController', () => {
  let sut: CreateUserController;
  let createUser: jest.Mock;
  let request: object;

  beforeAll(() => {
    createUser = jest.fn();
    request = {
      name: 'any_name',
      email: 'email@mail.com',
      password: 'any_password',
      role: 'any_role',
    };
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

    expect(response).toEqual({ data: new RequiredParamError('name'), statusCode: 400 });
  });

  it('Should return 400 if email is not received', async () => {
    const response = await sut.handle({
      name: 'any_name',
      password: 'any_password',
      role: 'any_role',
    });

    expect(response).toEqual({ data: new RequiredParamError('email'), statusCode: 400 });
  });

  it('Should return 400 if password is not received', async () => {
    const response = await sut.handle({
      name: 'any_name',
      email: 'any_email@mail.com',
      role: 'any_role',
    });

    expect(response).toEqual({ data: new RequiredParamError('password'), statusCode: 400 });
  });

  it('Should return 400 if role is not received', async () => {
    const response = await sut.handle({
      name: 'any_name',
      email: 'any_email@mail.com',
      password: 'any_password',
    });

    expect(response).toEqual({ data: new RequiredParamError('role'), statusCode: 400 });
  });

  it('Should return 400 if email received is not valid', async () => {
    const response = await sut.handle({
      name: 'any_name',
      email: '@mail.com',
      password: 'any_password',
      role: 'any_role',
    });

    expect(response).toEqual({ data: new InvalidRequiredParamError('email'), statusCode: 400 });
  });

  it('Should call CreateUser with correct input', async () => {
    await sut.handle(request);

    expect(createUser).toHaveBeenCalledWith({
      name: 'any_name',
      email: 'email@mail.com',
      password: 'any_password',
      role: 'any_role',
    });
    expect(createUser).toHaveBeenCalledTimes(1);
  });

  it('Should return 500 if CreateUser throws', async () => {
    const error = new Error('create_user_error');
    createUser.mockRejectedValueOnce(error);

    const response = await sut.handle(request);

    expect(response).toEqual({ data: new ServerError(error), statusCode: 500 });
  });

  it('Should return 403 if CreateUser throws EmailAlreadyExistsError', async () => {
    createUser.mockRejectedValueOnce(new EmailAlreadyExistsError());

    const response = await sut.handle(request);

    expect(response).toEqual({ data: new ForbiddenError(), statusCode: 403 });
  });

  it('Should return 403 if CreateUser throws NonexistentRoleError', async () => {
    createUser.mockRejectedValueOnce(new NonexistentRoleError());

    const response = await sut.handle(request);

    expect(response).toEqual({ data: new ForbiddenError(), statusCode: 403 });
  });

  it('Should return 204 on success', async () => {
    const response = await sut.handle(request);

    expect(response).toEqual({ data: null, statusCode: 204 });
  });
});
