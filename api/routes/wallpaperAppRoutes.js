"use strict";
module.exports = function (app) {
  var todoList = require("../controllers/wallpaperAppController");

  // todoList Routes
  app
    .route("/wallpapers")
    .get(todoList.list_all_tasks)
    .post(todoList.create_a_task);

  app.route("/latestWallpapers").get(todoList.get_latest_wallpapers);

  app.route("/popularWallpapers").get(todoList.get_popular_wallpapers);

  app.route("/searchWallpapers").get(todoList.get_searched_wallpapers);

  app
    .route("/wallpapers/:wallpaperId")
    .get(todoList.read_a_task)
    .put(todoList.update_a_task)
    .delete(todoList.delete_a_task);

  app.route("/updateByName/:name").put(todoList.update_value_by_name);
};
