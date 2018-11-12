module.exports = function (app) {
	var controller = require("../controller/controller");

	app.route('/users')
			.post(controller.addNewUser);

	app.route('/:userId/tasks')
			.get(controller.getTasks)
			.post(controller.newTask);

	app.route('/:userId/tasks/:id')
			.put(controller.modifyTask)
			.delete(controller.deleteTask);
};