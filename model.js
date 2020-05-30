const db = require("./data/db-config");

module.exports = {
  listResources,
  addResources,
  listprojects,
  addprojects,
  listTask,
  addTask,
  getProject,
  addResourceToProject,
};

function listResources() {
  return db("resource");
}

function addResources(resource) {
  return db("resource").insert(resource);
}

function listprojects() {
  return db("projects");
}

function addprojects(project) {
  return db("projects").insert(project);
}

function listTask() {
  return db("task")
    .join("projects", "projects.id", "task.project_id")
    .select(
      "projects.project_name",
      "projects.description as project description",
      "task.*"
    );
}

function addTask(task) {
  return db("task").insert(task);
}

function getProject(project_id) {
  return db("projects")
    .where("projects.id", "=", project_id)
    .then((project) => {
      return db("task")
        .where("task.project_id", "=", project_id)
        .then((tasks) => {
          tasks.forEach((task) => {
            task.task_completed = !!task.task_completed;
          });
          project.tasks = tasks;
          return db
            .select(
              "resource.resource_name",
              "resource.description",
              "resource.id"
            )
            .from("projects")
            .where("projects.id", "=", project_id)
            .join(
              "projectDetails",
              "projectDetails.project_id",
              "=",
              "projects.id"
            )
            .join("resource", "projectDetails.resource_id", "=", "resource.id")
            .then((resources) => {
              project.resources = resources;
              console.log(project);
              return project;
            })
            .catch((err) => {
              console.log(err);
              return null;
            });
        })
        .catch((err) => {
          console.log(err);
          return null;
        });
    })
    .catch((err) => {
      console.log(err);
      return null;
    });
}

function addResourceToProject(resource_id, project_id) {
  return db("projectDetails")
    .insert({ project_id: project_id, resource_id: resource_id })
    .then((response) => {
      return response;
    })
    .catch((err) => {
      console.log(err);
      return null;
    });
}
