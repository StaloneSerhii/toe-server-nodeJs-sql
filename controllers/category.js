const { buildNestedResult } = require("../helpers/buildNestedResult");

// Повернення всіх категорій меню
const getCategory = (req, res) => {
  const connection = req.app.get("connection");
  const query = "SELECT * FROM category;";
  connection.query(query, (error, results) => {
    if (error) {
      return res.status(500).json({ error: "Failed to fetch content" });
    }
    const nestedResult = buildNestedResult(results);
    res.json(nestedResult);
  });
};

// Поверненя всіх новин та по пошуку
const getNewsByCategoriId = (req, res) => {
  const connection = req.app.get("connection");
  const { findValue, id, limit, page, category_id } = req.query;
  console.log(category_id);
  // Відправка новин по пошуку
  if (findValue !== undefined) {
    const query = "SELECT * FROM `content` WHERE title LIKE ? and hidden=0";
    connection.query(query, [`%${findValue}%`], (error, results) => {
      if (error) {
        return res.status(500).json({ error: "Failed to fetch content" });
      }
      return res.json(results);
    });
  } else if (id !== undefined) {
    const query = "SELECT * FROM `content` WHERE id = ? and hidden=0";
    const updateQuery =
      "UPDATE `content` SET hits = hits + 1 WHERE id = ? and hidden=0";

    connection.query(query, [id], (error, results) => {
      if (error) {
        return res.status(500).json({ error: "Failed to fetch content" });
      }
      connection.query(updateQuery, [id], (error) => {
        if (error) {
          console.error("Failed to update hits:", error);
        }
      });
      return res.json(results);
    });
  } else if (category_id !== undefined) {
    const query =
      "SELECT * FROM `content` WHERE category_id=? and hidden=0 order by id DESC LIMIT ? OFFSET ?";
    const totalCountQuery =
      "SELECT COUNT(*) as totalCount FROM `content` WHERE category_id=? and hidden=0 order by id DESC";
    const offset = (page - 1) * limit;

    connection.query(
      query,
      [Number(category_id), Number(limit), offset],
      (error, results) => {
        if (error) {
          return res.status(500).json({ error: "Failed to fetch content" });
        }
        connection.query(
          totalCountQuery,
          [Number(category_id)],
          (totalCountError, totalCountResult) => {
            if (totalCountError) {
              console.error("Failed to fetch total count:", totalCountError);
              return res
                .status(500)
                .json({ error: "Failed to fetch total count" });
            }
            const totalCount = totalCountResult[0].totalCount;
            const totalPages = Math.ceil(totalCount / limit);
            return res.json({ res: results, pageAll: totalPages });
          }
        );
      }
    );
  } else {
    // Відправка всіх новин з пагінацією
    const query =
      "SELECT * FROM `content` where and hidden=0 order by id DESC LIMIT ? OFFSET ?";
    const totalCountQuery =
      "SELECT COUNT(*) as totalCount FROM `content` where and hidden=0 order by id DESC";
    const offset = (page - 1) * limit;

    connection.query(query, [Number(limit), offset], (error, results) => {
      if (error) {
        return res.status(500).json({ error: "Failed to fetch content" });
      }
      connection.query(totalCountQuery, (totalCountError, totalCountResult) => {
        if (totalCountError) {
          console.error("Failed to fetch total count:", totalCountError);
          return res.status(500).json({ error: "Failed to fetch total count" });
        }
        const totalCount = totalCountResult[0].totalCount;
        const totalPages = Math.ceil(totalCount / limit);
        return res.json({ res: results, pageAll: totalPages });
      });
    });
  }
};

module.exports = { getCategory, getNewsByCategoriId };
