var users = require('../stockage/users');

exports.addNewUser = function(req, res) {
	var newId = users.length;
	users.push({
		id: newId,
		taskList: []
	});
	res.json(newId);
};

exports.getTasks = function(req, res) {
	for (var i = 0; i < users.length; i++) {
		if (users[i].id == req.params.userId) {
			res.json(users[i].taskList);
			return res.status(200);
		}
	}
	return res.status(400).send({
		message: 'User with id ' + req.params.userId + ' does not exist'
	});
};

exports.newTask = function(req, res) {
	for (var i = 0; i < users.length; i++) {
		if (users[i].id == req.params.userId) {
			if (req.body.name) {
				var newTaskId = 1;
				var len = users[i].taskList.length;
				if (len > 0) {
					newTaskId = users[i].taskList[len - 1].id + 1;
				}
				users[i].taskList.push({
					id: newTaskId,
					name: req.body.name
				});
				res.json({
					"id":newTaskId,
					"name":req.body.name
				});
				return res.status(200);
			} else {
				return res.status(400).send({
					message: 'Task definition is invalid'
				});
			}
		}
	}
	return res.status(400).send({
		message: 'User with id ' + req.params.userId + ' does not exist'
	});
};

exports.modifyTask = function (req, res) {
	for (var i = 0; i < users.length; i++) {
		if (users[i].id == req.params.userId) {
			for (var countTask = 0; countTask < users[i].taskList.length; countTask++) {
				if (users[i].taskList[countTask].id == req.params.id) {
					if (req.body.name) {
						users[i].taskList[countTask].name = req.body.name;
						res.json({
							"id":req.params.id,
							"name":req.body.name
						});
						return res.status(200);
					} else {
						return res.status(400).send({
							message: 'Task definition is invalid'
						});
					}
				}
			}
			return res.status(400).send({
				message: 'Task ' + req.params.id + ' does not exist'
			});
		}
	}
	return res.status(400).send({
		message: 'User with id ' + req.params.userId + ' does not exist'
	});
};

exports.deleteTask = function(req, res) {
	for (var i = 0; i < users.length; i++) {
		if (users[i].id == req.params.userId) {
			for (var countTask = 0; countTask < users[i].taskList.length; countTask++) {
				if (users[i].taskList[countTask].id == req.params.id) {
					users[i].taskList.splice(countTask, 1);
					res.json();
					return res.status(204);
				}
			}
			return res.status(400).send({
				message: 'Task ' + req.params.id + ' does not exist'
			});
		}
	}
	return res.status(400).send({
		message: 'User with id ' + req.params.userId + ' does not exist'
	});
};