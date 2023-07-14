import { AuthorizationMiddleware } from '@/application/middlewares';
import { ForbiddenError } from '@/application/errors';

describe('AuthorizationMiddleware', () => {
  let sut: AuthorizationMiddleware;
  let authorization: jest.Mock;
  let request: {
    authorization: string;
  };
  let requiredPermission: 'any_required_permission';

  beforeAll(() => {
    request = {
      authorization: 'any_authorization_token',
    };
    authorization = jest.fn();
  });

  beforeEach(() => {
    sut = new AuthorizationMiddleware(authorization, requiredPermission);
  });

  it('Should return 403 if authorization is empty', async () => {
    const httpResponse = await sut.handle({ authorization: '' });

    expect(httpResponse).toEqual({
      statusCode: 403,
      data: new ForbiddenError(),
    });
  });

  it('Should return 403 if authorization is null', async () => {
    const httpResponse = await sut.handle({ authorization: null as any });

    expect(httpResponse).toEqual({
      statusCode: 403,
      data: new ForbiddenError(),
    });
  });

  it('Should return 403 if authorization is undefined', async () => {
    const httpResponse = await sut.handle({ authorization: undefined as any });

    expect(httpResponse).toEqual({
      statusCode: 403,
      data: new ForbiddenError(),
    });
  });

  it('Should call Authorization with correct input', async () => {
    await sut.handle(request);

    expect(authorization).toHaveBeenCalledWith({ token: request.authorization, requiredPermission });
    expect(authorization).toHaveBeenCalledTimes(1);
  });
});
