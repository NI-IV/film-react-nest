import { TskvLogger } from './tskv-logger';

describe('TskvLogger', () => {
  let tskvLogger: TskvLogger;

  beforeEach(() => {
    tskvLogger = new TskvLogger();
    jest.spyOn(console, 'log').mockImplementation(() => {});
    jest.spyOn(console, 'error').mockImplementation(() => {});
    jest.spyOn(console, 'warn').mockImplementation(() => {});
    jest.spyOn(console, 'debug').mockImplementation(() => {});
  });

  afterEach(() => {
    jest.restoreAllMocks(); // Сброс всех шпионов после каждого теста
  });

  it('should log a message in the correct format', () => {
    const message = 'Test message';
    tskvLogger.log(message);
    const expectedOutput = `level=log\tmessage=Test message\n`;
    expect(console.log).toHaveBeenCalledWith(expectedOutput);
  });

  it('should log an error message in the correct format', () => {
    const errorMessage = 'Test error';
    tskvLogger.error(errorMessage);
    const expectedOutput = `level=error\tmessage=Test error\n`;
    expect(console.error).toHaveBeenCalledWith(expectedOutput);
  });

  it('should log a warning message in the correct format', () => {
    const warningMessage = 'Test warning';
    tskvLogger.warn(warningMessage);
    const expectedOutput = `level=warn\tmessage=Test warning\n`;
    expect(console.warn).toHaveBeenCalledWith(expectedOutput);
  });

  it('should log a debug message in the correct format', () => {
    const debugMessage = 'Test debug';
    tskvLogger.debug(debugMessage);
    const expectedOutput = `level=debug\tmessage=Test debug\n`;
    expect(console.debug).toHaveBeenCalledWith(expectedOutput);
  });
});
