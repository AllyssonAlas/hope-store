import { Controller } from '@/application/controllers';
import { ServerError } from '@/application/errors';
import { ValidationComposite } from '@/application/validation';
import { HttpResponse } from '@/application/helpers';

jest.mock('@/application/validation/composite');

class ControllerStub extends Controller {
  output: HttpResponse = {
    statusCode: 200,
    data: 'any_data',
  };

  async perform(httpRequest: any): Promise<HttpResponse> {
    return this.output;
  }
}

describe('ControllerStub', () => {
  let sut: ControllerStub;

  beforeEach(() => {
    sut = new ControllerStub();
  });

  it('Should return 400 if ValidationComposite returns an error', async () => {
    const error = new Error('validation_error');
    const ValidationCompositeSpy = jest.fn().mockImplementationOnce(() => ({
      validate: jest.fn().mockReturnValueOnce(error),
    }));
    jest.mocked(ValidationComposite).mockImplementationOnce(ValidationCompositeSpy);

    const response = await sut.handle('any_value');

    expect(ValidationComposite).toHaveBeenCalledWith([]);
    expect(response).toEqual({ data: error, statusCode: 400 });
  });

  it('Should return 500 if handle throws', async () => {
    const error = new Error('handle_error');
    jest.spyOn(sut, 'perform').mockRejectedValueOnce(error);

    const response = await sut.handle('any_value');

    expect(response).toEqual({ data: new ServerError(error), statusCode: 500 });
  });

  it('Should return 500 if undefined error if handle throws undefined', async () => {
    jest.spyOn(sut, 'perform').mockRejectedValueOnce('non_error_object');

    const response = await sut.handle('any_value');

    expect(response).toEqual({ data: new ServerError(), statusCode: 500 });
  });

  it('Should return same result as handle', async () => {
    const response = await sut.handle('any_value');

    expect(response).toEqual(sut.output);
  });
});
