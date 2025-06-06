import { createTables } from '../migrations';
import { getDBConnection } from '../database';

jest.mock('../database');

const mockExecuteSql = jest.fn();

(getDBConnection as jest.Mock).mockResolvedValue({
  executeSql: mockExecuteSql,
});

describe('createTables', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('deve executar a criação da tabela notes', async () => {
    await createTables();

    expect(mockExecuteSql).toHaveBeenCalledWith(expect.stringContaining('CREATE TABLE IF NOT EXISTS notes'));
  });
});
