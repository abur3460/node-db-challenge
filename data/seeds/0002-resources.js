exports.seed = function (knex) {
  return knex("resource")
    .truncate()
    .then(function () {
      return knex("resource").insert([
        {
          resource_name: "Stack overflow",
          description: "Life saver, literally",
        },
        {
          resource_name: "VSCode",
          description: "IDE",
        },
      ]);
    });
};
