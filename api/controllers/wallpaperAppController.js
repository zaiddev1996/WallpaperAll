'use strict';

var mongoose = require('mongoose'),
	Task = mongoose.model('Wallpapers');

var AWS = require('aws-sdk');

exports.list_all_tasks = function(req, res) {
	Task.find({}, function(err, task) {
		if (err) res.send(err);
		res.json(task);
	});
};

exports.get_latest_wallpapers = function(req, res) {
	var mysort = { Created_date: -1 };
	var limit = parseInt(req.query.limit);
	var page = parseInt(req.query.page);
	var skipIndex = (page - 1) * limit;
	Task.find({}, function(err, task) {
		if (err) res.send(err);
		res.json(task);
	})
		.sort(mysort)
		.limit(limit)
		.skip(skipIndex);
};

exports.get_popular_wallpapers = function(req, res) {
	var mysort = { downloads: -1 };
	var limit = parseInt(req.query.limit);
	var page = parseInt(req.query.page);
	var skipIndex = (page - 1) * limit;
	Task.find({}, function(err, task) {
		if (err) res.send(err);
		res.json(task);
	})
		.sort(mysort)
		.skip(skipIndex)
		.limit(limit);
};

exports.get_searched_wallpapers = function(req, res) {
	var mysort = { Created_date: -1 };
	var limit = parseInt(req.query.limit);
	var page = parseInt(req.query.page);
	var skipIndex = (page - 1) * limit;
	Task.find({ $text: { $search: req.query.query_text } }, function(err, task) {
		if (err) res.send(err);
		res.json(task);
	})
		.sort(mysort)
		.skip(skipIndex)
		.limit(limit);
};

exports.create_a_task = function(req, res) {
	var new_task = new Task(req.body);
	new_task.save(function(err, task) {
		if (err) res.send(err);
		res.json(task);
	});
};

exports.read_a_task = function(req, res) {
	Task.findById(req.params.wallpaperId, function(err, task) {
		if (err) res.send(err);
		res.json(task);
	});
};

exports.update_a_task = function(req, res) {
	Task.findOneAndUpdate({ _id: req.params.wallpaperId }, req.body, { new: true }, function(err, task) {
		if (err) res.send(err);
		res.json(task);
	});
};

exports.update_value_by_name = function(req, res) {
	Task.findOneAndUpdate({ name: req.params.name }, req.body, { new: true }, function(err, task) {
		if (err) res.send(err);
		res.json(task);
	});
};

exports.delete_a_task = function(req, res) {
	Task.remove(
		{
			_id: req.params.wallpaperId
		},
		function(err, task) {
			if (err) res.send(err);
			res.json({ message: 'Wallpaper successfully deleted' });
		}
	);
};

exports.generate_signed_url = function(req, res) {
	AWS.config = new AWS.Config({
		accessKeyId: '****',
		secretAccessKey: '*****',
		region: 'us-west-1',
		signatureVersion: 'v4'
	});
	const s3 = new AWS.S3();
	const signedUrl = s3.getSignedUrl('putObject', {
		Key: req.query.key,
		Bucket: 'all-wallpapers92145-dev/public',
		Expires: 900,
		ACL: 'public-read'
	});
	const signedUrlThumb = s3.getSignedUrl('putObject', {
		Key: `thumbnail${req.query.key}`,
		Bucket: 'all-wallpapers92145-dev/public',
		Expires: 900,
		ACL: 'public-read'
	});
	res.json({ imageUrl: signedUrl, thumbUrl: signedUrlThumb });
};
