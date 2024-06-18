import dbClient from '../utils/db';

describe('dbClient', () => {
  it('should connect to MongoDB', async () => {
    const isConnected = await dbClient.isAlive();
    expect(isConnected).toBe(true);
  });

  it('should retrieve number of users', async () => {
    const usersCount = await dbClient.nbUsers();
    expect(typeof usersCount).toBe('number');
  });

  it('should retrieve number of files', async () => {
    const filesCount = await dbClient.nbFiles();
    expect(typeof filesCount).toBe('number');
  });
});
