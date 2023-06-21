import { EmailAlreadyExistsError, NonexistentRoleError } from '@/domain/errors';
import { CreateUserController } from '@/application/controllers';
import { ForbiddenError } from '@/application/errors';
import { RequiredEmailValidator, RequiredStringValidator } from '@/application/validation';

describe('CreateUserController', () => {
  let sut: CreateUserController;
  let createUser: jest.Mock;
  let authentication: jest.Mock;
  let request: {
    name: string;
    email: string;
    password: string;
    role: string;
  };

  beforeAll(() => {
    createUser = jest.fn();
    authentication = jest.fn().mockResolvedValue({
      authToken: 'any_token',
      name: 'any_name',
      email: 'email@mail.com',
    });
    request = {
      name: 'any_name',
      email: 'email@mail.com',
      password: 'any_password',
      role: 'any_role',
    };
  });

  beforeEach(() => {
    sut = new CreateUserController(createUser, authentication);
  });

  it('Should build validators correctly', () => {
    const validators = sut.buildValidators(request);

    expect(validators).toEqual([
      new RequiredStringValidator(request.name, 'name'),
      new RequiredStringValidator(request.email, 'email'),
      new RequiredStringValidator(request.password, 'password'),
      new RequiredStringValidator(request.role, 'role'),
      new RequiredEmailValidator(request.email, 'email'),
    ]);
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

  it('Should call Authentication with correct input', async () => {
    await sut.handle(request);

    expect(authentication).toHaveBeenCalledWith({
      email: 'email@mail.com',
      password: 'any_password',
    });
    expect(authentication).toHaveBeenCalledTimes(1);
  });

  it('Should return 200 on success', async () => {
    const response = await sut.handle(request);

    expect(response).toEqual({
      data: {
        authToken: 'any_token',
        name: 'any_name',
        email: 'email@mail.com',
      },
      statusCode: 200,
    });
  });
});
