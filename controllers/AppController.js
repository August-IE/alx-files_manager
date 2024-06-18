/* eslint-disable import/no-named-as-default */
import redisClient from '../utils/redis';
import dbClient from '../utils/db';

export default class AppController {
  /**
   * Returns the status of the Redis and MongoDB clients.
   * @param {Request} req - The request object.
   * @param {Response} res - The response object.
   */
  static async getStatus(req, res) {
    try {
      const redisStatus = redisClient.isAlive();
      const dbStatus = await dbClient.isAlive();

      res.status(200).json({
        redis: redisStatus,
        db: dbStatus,
      });
    } catch (error) {
      res.status(500).json({ error: 'Error retrieving status' });
    }
  }

  /**
   * Returns the count of users and files in the database.
   * @param {Request} req - The request object.
   * @param {Response} res - The response object.
   */
  static async getStats(req, res) {
    try {
      const [usersCount, filesCount] = await Promise.all([dbClient.nbUsers(), dbClient.nbFiles()]);

      res.status(200).json({ users: usersCount, files: filesCount });
    } catch (error) {
      res.status(500).json({ error: 'Error retrieving stats' });
    }
  }
}
