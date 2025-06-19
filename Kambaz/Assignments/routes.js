import * as assignmentsDao from "./dao.js";

export default function AssignmentRoutes(app) {
  // 获取某个课程的所有作业
  app.get("/api/courses/:courseId/assignments", async (req, res) => {
    const { courseId } = req.params;
    const assignments = await assignmentsDao.findAssignmentsForCourse(courseId);
    res.json(assignments);
  });

  // 创建新作业
  app.post("/api/courses/:courseId/assignments", async (req, res) => {
    const { courseId } = req.params;
    const assignment = {
      ...req.body,
      course: courseId
    };
    const newAssignment = await assignmentsDao.createAssignment(assignment);
    res.json(newAssignment);
  });

  // 更新作业
  app.put("/api/assignments/:assignmentId", async (req, res) => {
    try {
      const { assignmentId } = req.params;
      const assignmentUpdates = req.body;
      const status = await assignmentsDao.updateAssignment(assignmentId, assignmentUpdates);
      res.json(status);
    } catch (error) {
      console.error("Error updating assignment:", error);
      res.status(500).json({ error: "Failed to update assignment" });
    }
  });

  // 删除作业
  app.delete("/api/assignments/:assignmentId", async (req, res) => {
    try {
      const { assignmentId } = req.params;
      const status = await assignmentsDao.deleteAssignment(assignmentId);
      res.json(status);
    } catch (error) {
      console.error("Error deleting assignment:", error);
      res.status(500).json({ error: "Failed to delete assignment" });
    }
  });

  // 根据ID获取单个作业
  app.get("/api/assignments/:assignmentId", async (req, res) => {
    try {
      const { assignmentId } = req.params;
      const assignment = await assignmentsDao.findAssignmentById(assignmentId);
      if (assignment) {
        res.json(assignment);
      } else {
        res.status(404).json({ error: "Assignment not found" });
      }
    } catch (error) {
      console.error("Error fetching assignment:", error);
      res.status(500).json({ error: "Failed to fetch assignment" });
    }
  });
}