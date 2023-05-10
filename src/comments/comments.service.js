const knex = require("../db/connection");

function list() {
  // your solution here
  return knex("comments").select("*");
}

function listCommenterCount() {
  // your solution here
  return knex("comments as c")
    .join("users", "commenter_id", "user_id")
    .select("user_email as commenter_email")
    .count("*")
    .groupBy("commenter_email")
    .orderBy("commenter_email");
}

function read(commentId) {
  // your solution here
  return knex("comments as c")
    .join("users as u", "commenter_id", "user_id")
    .join("posts as p", "c.post_id", "p.post_id")
    .select("c.comment_id", "c.comment", "user_email as commenter_email", "post_body as commented_post")
    .where({comment_id: commentId})
    .first();  
}

module.exports = {
  list,
  listCommenterCount,
  read,
};
