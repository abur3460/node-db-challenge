exports.seed = function (knex) {
  return knex("projects")
    .truncate()
    .then(function () {
      return knex("projects").insert([
        {
          project_name: "Start a portfolio",
          description: "try with react and then scratch it",
          completed_project: false,
        },
        {
          project_name: "Build an API",
          description: "Use node to make an API",
          completed_project: false,
        },
        {
          project_name: "LESS",
          description: "Learn LESS",
          completed_project: false,
        },
      ]);
    });
};
