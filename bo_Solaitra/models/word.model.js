const sql = require("./db.js");

// constructor
const Word = function(word) {
    this.id = word.id;
    this.name  = word.name;
    this.description = word.description;
    this.picture = word.picture;
    this.alphabet = word.alphabet;
};

Word.create = (newWord, result) => {
  sql.query("INSERT INTO word SET ?", newWord, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("created word: ", { id: res.insertId, ...newWord });
    result(null, { id: res.insertId, ...newWord });
  });
};

Word.findById = (id, result) => {
  sql.query(`SELECT * FROM word WHERE id = ${id}`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("found word: ", res[0]);
      result(null, res[0]);
      return;
    }

    // not found User with the id
    result({ kind: "not_found" }, null);
  });
};

Word.findByAlphabet = (id, result) => {
  sql.query(`SELECT * FROM word WHERE alphabet = ${id}`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("found words: ", res);
      result(null, res);
      return;
    }

    // not found User with the id
    result({ kind: "not_found" }, null);
  });
};

Word.getAll = (alphabet, result) => {
  let query = "SELECT * FROM word";

  if (alphabet) {
    query += ` WHERE alphabet = ${alphabet}`;
  }

  sql.query(query, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("words: ", res);
    result(null, res);
  });
};


module.exports = Word;