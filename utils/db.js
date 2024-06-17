import mongodb from 'mongodb';
import dotenv from 'dotenv';

dotenv.config();

/**
 * Represents a MongoDB client.
 */
class DBClient {
  /**
   * Creates a new DBClient instance.
   */
  constructor() {
    const {
      DB_HOST = 'localhost',
      DB_PORT = 27017,
      DB_DATABASE = 'files_manager'
    } = process.env;

    const dbURL = `mongodb://${DB_HOST}:${DB_PORT}/${DB_DATABASE}`;

    this.client = new mongodb.MongoClient(dbURL, { useUnifiedTopology: true });
    this.connect();
  }

  /**
   * Connects to the MongoDB server.
   */
  async connect() {
    try {
      await this.client.connect();
      console.log('MongoDB connected successfully');
    } catch (error) {
      console.error('Error connecting to MongoDB:', error);
    }
  }

  /**
   * Checks if this client's connection to the MongoDB server is active.
   * @returns {boolean}
   */
  isAlive() {
    return this.client.topology?.isConnected() || false;
  }

  /**
   * Retrieves the number of users in the database.
   * @returns {Promise<Number>}
   */
  async nbUsers() {
    try {
      const usersCollection = await this.usersCollection();
      return await usersCollection.countDocuments();
    } catch (error) {
      console.error('Error retrieving number of users:', error);
      return -1;
    }
  }

  /**
   * Retrieves the number of files in the database.
   * @returns {Promise<Number>}
   */
  async nbFiles() {
    try {
      const filesCollection = await this.filesCollection();
      return await filesCollection.countDocuments();
    } catch (error) {
      console.error('Error retrieving number of files:', error);
      return -1;
    }
  }

  /**
   * Retrieves a reference to the `users` collection.
   * @returns {Promise<Collection>}
   */
  async usersCollection() {
    return this.client.db().collection('users');
  }

  /**
   * Retrieves a reference to the `files` collection.
   * @returns {Promise<Collection>}
   */
  async filesCollection() {
    return this.client.db().collection('files');
  }
}

// Create and export an instance of DBClient
export const dbClient = new DBClient();
export default dbClient;
