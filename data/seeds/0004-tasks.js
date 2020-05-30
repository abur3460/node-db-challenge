exports.seed = function (knex) {
  return knex("task")
    .truncate()
    .then(function () {
      return knex("task").insert([
        {
          description: "Use it",
          notes: "code your project",
          completed_task: false,
          project_id: 1,
        },
        {
          description: "Start a project",
          notes: "Put it on your portfolio",
          completed_task: false,
          project_id: 2,
        },
        {
          description: "Hope it works",
          notes: "Cross your fingers",
          completed_task: false,
          project_id: 2,
        },
        {
          description: "Add a framework",
          notes: "Use it in your projects",
          completed_task: false,
          project_id: 3,
        },
        {
          description: "Design a toolbar",
          notes: "Make sure it works",
          completed_task: false,
          project_id: 3,
        },
      ]);
    });
};
