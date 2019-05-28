package dao

import javax.inject.{Inject, Singleton}
import models.{Task, User}
import play.api.db.slick.{DatabaseConfigProvider, HasDatabaseConfigProvider}
import slick.jdbc.JdbcProfile

import scala.concurrent.{ExecutionContext, Future}

trait TasksComponent extends UsersComponent {
  self: HasDatabaseConfigProvider[JdbcProfile] =>

  import profile.api._

  // This class convert the database's tasks table in a object-oriented entity: the Task model.
  class TasksTable(tag: Tag) extends Table[Task](tag, "tasks") {
    def id = column[Long]("id", O.PrimaryKey, O.AutoInc) // Primary key, auto-incremented
    def title = column[String]("title")
    def date = column[String]("date")
    def description = column[String]("description")
    def checked = column[Boolean]("checked")
    def userId = column[Long]("userId")

    def user = foreignKey("userFk", userId, users)(_.id)

    // Map the attributes with the model; the ID is optional.
    def * = (id.?, title, date, description, checked, userId) <> (Task.tupled, Task.unapply)
  }
}

@Singleton
class TasksDAO @Inject()(protected val dbConfigProvider: DatabaseConfigProvider)(implicit executionContext: ExecutionContext) extends TasksComponent with HasDatabaseConfigProvider[JdbcProfile] {
  import profile.api._

  // Get the object-oriented list of tasks directly from the query table.
  val tasks = TableQuery[TasksTable]

  /** Retrieve the list of tasks */
  def list(): Future[Seq[Task]] = {
    val query = tasks.sortBy(task => (task.title))
    db.run(query.result)
  }

  /** Retrieve a tasks from the id. */
  def findById(id: Long): Future[Option[Task]] =
    db.run(tasks.filter(_.id === id).result.headOption)

  /** Insert a new task, then return it. */
  def insert(task: Task): Future[Task] = {
    val insertQuery = tasks returning tasks.map(_.id) into ((task, id) => task.copy(Some(id)))
    db.run(insertQuery += task)
  }

  /** Update a task, then return an integer that indicate if the task was found (1) or not (0). */
  def update(id: Long, task: Task): Future[Int] = {
    val taskToUpdate: Task = task.copy(Some(id))
    db.run(tasks.filter(_.id === id).update(taskToUpdate))
  }

  /** Delete a task, then return an integer that indicate if the task was found (1) or not (0). */
  def delete(id: Long): Future[Int] =
    db.run(tasks.filter(_.id === id).delete)
}