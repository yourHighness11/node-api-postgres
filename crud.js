const pool = require("./dbConnection");

const createUser = (request, response) => {
  const { name, email } = request.body;

  pool.query(
    "INSERT INTO users (name, email) VALUES ($1, $2) RETURNING *",
    [name, email],
    (error, results) => {
      if (error) {
        throw error;
      }
      response.status(201).send(`User added with ID: ${results.rows[0].id}`);
      // console.log(results);
    }
  );
};

const getAllUsers = (req, res) => {
  pool.query("SELECT * FROM users ORDER BY id", (error, results) => {
    if (error) {
      throw error;
    }
    res.status(200).json(results.rows);
    console.log(results);
  });
};

const getUserById = (request, response) => {
  const id = parseInt(request.params.id);

  pool.query("SELECT * FROM users WHERE id = $1", [id], (error, results) => {
    if (error) {
      throw error;
    }
    response.status(200).json(results.rows);
  });
};

const updateUser = (req, res) => {
  const id = req.params.id;
  const { name, email } = req.body;
  pool.query(
    "UPDATE users SET name = $1, email = $2 WHERE id = $3",
    [name, email, id],
    (error, results) => {
      if (error) {
        throw error;
      }
      res.status(200).send(`User modified with id:${id}`);
      console.log(results);
    }
  );
};

const deleteUser = (req, res) => {
  const id = req.params.id;
  pool.query("DELETE FROM users WHERE id = $1", [id], (error) => {
    if (error) {
      throw error;
    }
    res.status(200).send(`User deleted with id:${id}`);
  });
};

module.exports = {
  createUser,
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser,
};
