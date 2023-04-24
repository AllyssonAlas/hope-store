import { EmailAlreadyExistsError, NonexistentRoleError } from '@/domain/errors';
import { CreateUserController } from '@/application/controllers';
import { ForbiddenError, ServerError } from '@/application/errors';
import { RequiredStringValidator, RequiredEmailValidator } from '@/application/validation';

jest.mock('@/application/validation/required-string');
jest.mock('@/application/validation/required-email');

describe('CreateUserController', () => {
  let sut: CreateUserController;
  let createUser: jest.Mock;
  let request: {
    name: string;
    email: string;
    password: string;
    role: string;
  };

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

  it('Should return 400 if RequiredStringValidator returns an error', async () => {
    const error = new Error('validation_error');
    const RequiredStringValidatorSpy = jest.fn().mockImplementationOnce(() => ({
      validate: jest.fn().mockReturnValueOnce(error),
    }));
    jest.mocked(RequiredStringValidator).mockImplementationOnce(RequiredStringValidatorSpy);

    const response = await sut.handle(request);

    expect(RequiredStringValidator).toHaveBeenCalledWith('any_name', 'name');
    expect(response).toEqual({ data: error, statusCode: 400 });
  });

  it('Should return 400 if RequiredEmailValidator returns an error', async () => {
    const error = new Error('validation_error');
    const RequiredEmailValidatorSpy = jest.fn().mockImplementationOnce(() => ({
      validate: jest.fn().mockReturnValueOnce(error),
    }));
    jest.mocked(RequiredEmailValidator).mockImplementationOnce(RequiredEmailValidatorSpy);

    const response = await sut.handle(request);

    expect(RequiredEmailValidator).toHaveBeenCalledWith(request.email, 'email');
    expect(response).toEqual({ data: error, statusCode: 400 });
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
