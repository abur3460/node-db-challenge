exports.up = function (knex) {
  return knex.schema
    .createTable("projects", (tbl) => {
      tbl.increments();
      tbl.text("project_name").notNullable();
      tbl.text("description");
      tbl.boolean("completed_project").notNullable().defaultTo("False");
    })

    .createTable("resource", (tbl) => {
      tbl.increments();
      tbl.text("resource_name").notNullable();
      tbl.text("description");
    })

    .createTable("task", (tbl) => {
      tbl.increments();
      tbl
        .integer("project_id")
        .unsigned()
        .notNullable()
        .references("id")
        .inTable("projects")
        .onDelete("RESTRICT")
        .onUpdate("CASCADE");

      tbl.text("description").notNullable();
      tbl.text("notes");
      tbl.boolean("completed_task").notNullable().defaultTo("False");
    })

    .createTable("project_details", (tbl) => {
      tbl.increments();
      tbl
        .integer("project_id")
        .unsigned()
        .notNullable()
        .references("id")
        .inTable("project")
        .onUpdate("CASCADE")
        .onDelete("CASCADE");
      tbl
        .integer("resource_id")
        .unsigned()
        .notNullable()
        .references("id")
        .inTable("resource")
        .onUpdate("CASCADE")
        .onDelete("CASCADE");
    });
};

exports.down = function (knex) {
  return knex.schema
    .dropTableIfExists("task")
    .dropTableIfExists("resource")
    .dropTableIfExists("projects");
};
