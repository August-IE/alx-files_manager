/* eslint-disable import/no-named-as-default */
import { v4 as uuidv4 } from 'uuid';
import redisClient from '../utils/redis';

export default class AuthController {
  /**
   * Authenticates a user and generates an authentication token.
   * @param {Request} req - The request object.
   * @param {Response} res - The response object.
   */
  static async getConnect(req, res) {
    try {
      const { user } = req;
      if (!user || !user._id) {
        return res.status(400).json({ error: 'Invalid user data' });
      }

      const token = uuidv4();
      await redisClient.set(`auth_${token}`, user._id.toString(), 24 * 60 * 60);

      return res.status(200).json({ token });
    } catch (error) {
      return res.status(500).json({ error: 'Error connecting user' });
    }
  }

  /**
   * Logs out a user by deleting the authentication token from Redis.
   * @param {Request} req - The request object.
   * @param {Response} res - The response object.
   */
  static async getDisconnect(req, res) {
    try {
      const token = req.headers['x-token'];
      if (!token) {
        return res.status(400).json({ error: 'Missing token' });
      }

      await redisClient.del(`auth_${token}`);
      return res.status(204).send();
    } catch (error) {
      return res.status(500).json({ error: 'Error disconnecting user' });
    }
  }
}
