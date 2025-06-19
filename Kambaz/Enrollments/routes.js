import * as enrollmentsDao from "./dao.js";

export default function EnrollmentRoutes(app) {
  // 注册课程
  app.post("/api/enrollments/:courseId", async (req, res) => {
    const { courseId } = req.params;
    const currentUser = req.session["currentUser"];
    
    if (!currentUser) {
      res.sendStatus(401);
      return;
    }
    
    try {
      const enrollment = await enrollmentsDao.enrollUserInCourse(
        currentUser._id, 
        courseId
      );
      res.json(enrollment);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });

  // 退出课程
  app.delete("/api/enrollments/:courseId", async (req, res) => {
    const { courseId } = req.params;
    const currentUser = req.session["currentUser"];
    
    if (!currentUser) {
      res.sendStatus(401);
      return;
    }
    
    try {
      await enrollmentsDao.unenrollUserFromCourse(currentUser._id, courseId);
      res.sendStatus(204);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });

  // 获取用户的所有注册
  app.get("/api/enrollments", async (req, res) => {
    const currentUser = req.session["currentUser"];
    
    if (!currentUser) {
      res.sendStatus(401);
      return;
    }
    
    try {
      const enrollments = await enrollmentsDao.findEnrollmentsForUser(currentUser._id);
      res.json(enrollments);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });

  // 检查是否已注册某课程
  app.get("/api/enrollments/:courseId", async (req, res) => {
    const { courseId } = req.params;
    const currentUser = req.session["currentUser"];
    
    if (!currentUser) {
      res.sendStatus(401);
      return;
    }
    
    try {
      const isEnrolled = await enrollmentsDao.isUserEnrolledInCourse(
        currentUser._id, 
        courseId
      );
      res.json({ enrolled: isEnrolled });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });
}