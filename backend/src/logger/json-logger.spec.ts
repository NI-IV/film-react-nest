import { JsonLogger } from './json-logger';

describe('JsonLogger', () => {
  let jsonLogger: JsonLogger;

  beforeEach(() => {
    jsonLogger = new JsonLogger();
  });

  afterEach(() => {
    jest.restoreAllMocks(); // Сброс всех шпионов после каждого теста
  });

  it('should log a message in JSON format', () => {
    const consoleLogSpy = jest
      .spyOn(console, 'log')
      .mockImplementation(() => {});

    const message = 'Test message';
    jsonLogger.log(message);

    const expectedOutput = JSON.stringify({
      level: 'log',
      message: message,
      optionalParams: [],
    });

    expect(consoleLogSpy).toHaveBeenCalledWith(expectedOutput);
  });

  it('should log an error message in JSON format', () => {
    const consoleErrorSpy = jest
      .spyOn(console, 'error')
      .mockImplementation(() => {});

    const errorMessage = 'Test error';
    jsonLogger.error(errorMessage);

    const expectedOutput = JSON.stringify({
      level: 'error',
      message: errorMessage,
      optionalParams: [],
    });

    expect(consoleErrorSpy).toHaveBeenCalledWith(expectedOutput);
  });
});
