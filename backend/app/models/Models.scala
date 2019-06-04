package models

/*
// Represent a database's course entry; the ID is optional because we don't necessary want to have it (for example when
// we create a new course).
case class Course(id: Option[Long], name: String, description: String, hasApero: Option[Boolean])

// Represent a database's student entry.
case class Student(id: Option[Long], firstName: String, lastName: String, age: Int, isInsolent: Boolean)

// Represent a database's course <- >student entry.
case class CourseStudent(id: Option[Long], courseId: Long, studentId: Long)
 */

case class User(id: Option[Long], username: String, password: String)

case class Task(id: Option[Long], title: String, date: String, description: String, checked: Boolean, userId: Long)

case class Subtask(id: Option[Long], title: String, date: String, checked: Boolean, taskId: Long)