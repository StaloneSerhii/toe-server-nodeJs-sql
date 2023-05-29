const { connection } = require("mysql");

const Content = {
  create: (newsData, callback) => {
    const { title, img_url, hits, text } = newsData;
    const query = `INSERT INTO news (title, img_url, hits, text) VALUES (?, ?, ?, ?)`;
    const values = [title, img_url, hits, text];

    connection.query(query, values, (error, results) => {
      if (error) {
        return callback(error, null);
      }
      const insertedNewsId = results.insertId;
      callback(null, insertedNewsId);
    });
  },

  update: (newsId, newsData, callback) => {
    const { title, img_url, hits, text } = newsData;
    const query = `UPDATE news SET title = ?, img_url = ?, hits = ?, text = ? WHERE id = ?`;
    const values = [title, img_url, hits, text, newsId];

    connection.query(query, values, (error, results) => {
      if (error) {
        return callback(error, null);
      }
      const affectedRows = results.affectedRows;
      callback(null, affectedRows);
    });
  },

  delete: (newsId, callback) => {
    const query = `DELETE FROM news WHERE id = ?`;
    const values = [newsId];

    connection.query(query, values, (error, results) => {
      if (error) {
        return callback(error, null);
      }
      const affectedRows = results.affectedRows;
      callback(null, affectedRows);
    });
  },

  getById: (newsId, callback) => {
    const query = `SELECT * FROM news WHERE id = ?`;
    const values = [newsId];

    connection.query(query, values, (error, results) => {
      if (error) {
        return callback(error, null);
      }
      if (results.length === 0) {
        return callback(null, null);
      }
      const news = results[0];
      callback(null, news);
    });
  },

  getAll: (callback) => {
    const query = `SELECT * FROM news`;

    connection.query(query, (error, results) => {
      if (error) {
        return callback(error, null);
      }
      const newsList = results;
      callback(null, newsList);
    });
  },
};

module.exports = Content;
