package dao

import javax.inject.{Inject, Singleton}
import models.Subtask
import play.api.db.slick.{DatabaseConfigProvider, HasDatabaseConfigProvider}
import slick.jdbc.JdbcProfile

import scala.concurrent.{ExecutionContext, Future}

trait SubtasksComponent {
  self: HasDatabaseConfigProvider[JdbcProfile] =>

  import profile.api._

  // This class convert the database's subtasks table in a object-oriented entity: the Subtask model.
  class SubtaskTable(tag: Tag) extends Table[Subtask](tag, "subtask") {
    def id = column[Long]("id", O.PrimaryKey, O.AutoInc) // Primary key, auto-incremented
    def title = column[String]("title")
    def date = column[String]("date")
    def checked = column[Boolean]("checked")
    def taskId = column[Long]("taskId")

    // Map the attributes with the model; the ID is optional.
    def * = (id.?, title, date, checked, taskId) <> (Subtask.tupled, Subtask.unapply)
  }

  // Get the object-oriented list of subtasks directly from the query table.
  val subtasks = TableQuery[SubtaskTable]
}

@Singleton
class SubtasksDAO @Inject()(protected val dbConfigProvider: DatabaseConfigProvider)(implicit executionContext: ExecutionContext) extends SubtasksComponent with HasDatabaseConfigProvider[JdbcProfile] {
  import profile.api._

  /** Retrieve the list of subtasks */
  def list(): Future[Seq[Subtask]] = {
    val query = subtasks.sortBy(subtask => (subtask.title))
    db.run(query.result)
  }

  /** Retrieve a subtask from the id. */
  def findById(id: Long): Future[Option[Subtask]] =
    db.run(subtasks.filter(_.id === id).result.headOption)

  /** Insert a new subtask, then return it. */
  def insert(subtask: Subtask): Future[Subtask] = {
    val insertQuery = subtasks returning subtasks.map(_.id) into ((subtask, id) => subtask.copy(Some(id)))
    db.run(insertQuery += subtask)
  }

  /** Update a subtask, then return an integer that indicate if the subtask was found (1) or not (0). */
  def update(id: Long, subtask: Subtask): Future[Int] = {
    val subtaskToUpdate: Subtask = subtask.copy(Some(id))
    db.run(subtasks.filter(_.id === id).update(subtaskToUpdate))
  }

  /** Delete a subtask, then return an integer that indicate if the subtask was found (1) or not (0). */
  def delete(id: Long): Future[Int] =
    db.run(subtasks.filter(_.id === id).delete)
}