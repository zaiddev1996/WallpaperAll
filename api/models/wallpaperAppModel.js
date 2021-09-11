"use strict";
var mongoose = require("mongoose");
var textSearch = require("mongoose-text-search");
var Schema = mongoose.Schema;

var WallpaperSchema = new Schema({
  link: {
    type: String,
    default: "www",
  },
  name: {
    type: String,
    default: "wallpaper",
  },
  thumb_link: {
    type: String,
    default: "www",
  },
  Created_date: {
    type: Date,
    default: Date.now,
  },
  //   status: {
  //     type: [{
  //       type: String,
  //       enum: ['pending', 'ongoing', 'completed']
  //     }],
  //     default: 'pending'
  //   },
  downloads: {
    type: Number,
    default: 0,
  },
  views: {
    type: String,
    default: "0",
  },
  size: {
    type: String,
    default: "0",
  },
  tags: {
    type: String,
    default: "",
  },
});
WallpaperSchema.plugin(textSearch);
WallpaperSchema.index({ tags: "text" });

module.exports = mongoose.model("Wallpapers", WallpaperSchema);
