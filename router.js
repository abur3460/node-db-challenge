const express = require("express");
const router = express.Router();
const db = require("./model");

router.post("/", (req, res) => {
  const newProject = req.body;
  console.log(newProject);
  db.addprojects(newProject)
    .then((project) => {
      res.status(201).json(project);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ message: "failed to add project" });
    });
});

router.get("/", (req, res) => {
  db.listprojects()
    .then((project) => {
      res.json(project);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ message: "failed to get project" });
    });
});

router.post("/tasks", (req, res) => {
  const newtask = req.body;
  console.log(newtask);
  db.addTask(newtask)
    .then((task) => {
      res.status(201).json(task);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ message: "failed to add task" });
    });
});

router.get("/tasks", (req, res) => {
  db.listTask()
    .then((task) => {
      res.json(task);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ message: "failed to get task" });
    });
});

router.get("/resources", (req, res) => {
  db.listResources()
    .then((resource) => {
      res.json(resource);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ message: "failed to get resources" });
    });
});

router.post("/resources", (req, res) => {
  const resource = req.body;
  db.addResources(resource)
    .then((resources) => {
      if (resources) {
        res.json(resources);
      } else {
        res.status(400).json({ message: "please provide valid params" });
      }
    })
    .catch((err) => {
      res.status(500).json({ message: "Failed to add resources" });
    });
});

router.post("/:id/resources", (req, res) => {
  const { id } = req.params;
  const resource = req.body;

  db.addResourceToProject(resource.resource_id, id)
    .then((resource) => {
      if (resource) {
        res.json(resource);
      } else {
        res.status(400).json({ message: "please provide valid params" });
      }
    })
    .catch((err) => {
      console.log(err);
      res
        .status(500)
        .json({ message: "Failed to add resource to specified project" });
    });
});

router.get("/:id", (req, res) => {
  const { id } = req.params;

  db.getProject(id)
    .then((project) => {
      if (project) {
        res.json(project);
      } else {
        res
          .status(404)
          .json({ message: "Could not find project with given id." });
      }
    })
    .catch((err) => {
      res.status(500).json({ message: "Failed to get project" });
    });
});

module.exports = router;
