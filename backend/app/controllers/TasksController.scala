package controllers

import dao.TasksDAO
import javax.inject.{Inject, Singleton}
import models.Task
import play.api.libs.json._
import play.api.libs.json.Reads._
import play.api.libs.functional.syntax._
import play.api.mvc.{AbstractController, ControllerComponents}

import scala.concurrent.ExecutionContext.Implicits.global

@Singleton
class TasksController @Inject()(cc: ControllerComponents, tasksDAO: TasksDAO) extends AbstractController(cc) {

  // Convert a Task-model object into a JsValue representation, which means that we serialize it into JSON.
  implicit val taskToJson: Writes[Task] = (
    (JsPath \ "id").write[Option[Long]] and
      (JsPath \ "title").write[String] and
      (JsPath \ "date").write[String] and
      (JsPath \ "description").write[String] and
      (JsPath \ "checked").write[Boolean] and
      (JsPath \ "userId").write[Long]

    // Use the default 'unapply' method (which acts like a reverted constructor) of the Task case class if order to get
    // back the Task object's arguments and pass them to the JsValue.
    )(unlift(Task.unapply))

  // Convert a JsValue representation into a Task-model object, which means that we deserialize the JSON.
  implicit val jsonToTask: Reads[Task] = (
    // In order to be valid, the task must have first and last names that are 2 characters long at least, as well as
    // an age that is greater than 0.
    (JsPath \ "id").readNullable[Long] and
      (JsPath \ "title").read[String](minLength[String](2)) and
      (JsPath \ "date").read[String](minLength[String](2)) and
      (JsPath \ "description").read[String](minLength[String](2)) and
      (JsPath \ "checked").read[Boolean] and
      (JsPath \ "userId").read[Long]

    // Use the default 'apply' method (which acts like a constructor) of the Task case class with the JsValue in order
    // to construct a Task object from it.
    )(Task.apply _)

  /**
    * This helper parses and validates JSON using the implicit `jsonToTask` above, returning errors if the parsed
    * json fails validation.
    */
  def validateJson[A : Reads] = parse.json.validate(
    _.validate[A].asEither.left.map(e => BadRequest(JsError.toJson(e)))
  )

  /**
    * Get the list of all existing tasks, then return it.
    * The Action.async is used because the request is asynchronous.
    */
  def getTasks = Action.async {
    val tasksList = tasksDAO.list()
    tasksList map (s => Ok(Json.toJson(s)))
  }

  /**
    * Parse the POST request, validate the request's body, then create a new task based on the sent JSON payload, and
    * finally sends back a JSON response.
    * The action expects a request with a Content-Type header of text/json or application/json and a body containing a
    * JSON representation of the entity to create.
    */
  def createTask = Action.async(validateJson[Task]) { implicit request =>
    // `request.body` contains a fully validated `Task` instance, since it has been validated by the `validateJson`
    // helper above.
    val task = request.body
    val createdTask = tasksDAO.insert(task)

    createdTask.map(s =>
      Ok(
        Json.obj(
          "status" -> "OK",
          "id" -> s.id,
          "message" -> ("Task '" + s.title + " " + s.description + "' saved.")
        )
      )
    )
  }

  /**
    * Get the list of all existing tasks for a specified user, then return it.
    * The Action.async is used because the request is asynchronous.
    */
  def getTasksForUser(taskId: Long) = Action.async {
    val tasksList = tasksDAO.findByUserId(taskId)
    tasksList map (s => Ok(Json.toJson(s)))
  }

  /**
    * Get the Task identified by the given ID, then return it as JSON.
    */
  def getTask(taskId: Long) = Action.async {
    val optionalTask = tasksDAO.findById(taskId)

    optionalTask.map {
      case Some(s) => Ok(Json.toJson(s))
      case None =>
        // Send back a 404 Not Found HTTP status to the client if the task does not exist.
        NotFound(Json.obj(
          "status" -> "Not Found",
          "message" -> ("Task #" + taskId + " not found.")
        ))
    }
  }

  /**
    * Parse the PUT request, validate the request's body, then update the task whose ID matches with the given one,
    * based on the sent JSON payload, and finally sends back a JSON response.
    */
  def updateTask(taskId: Long) = Action.async(validateJson[Task]) { request =>
    val newTask = request.body

    // Try to edit the task, then return a 200 OK HTTP status to the client if everything worked.
    tasksDAO.update(taskId, newTask).map {
      case 1 => Ok(
        Json.obj(
          "status" -> "OK",
          "message" -> ("Task '" + newTask.title + " " + newTask.description + "' updated.")
        )
      )
      case 0 => NotFound(Json.obj(
        "status" -> "Not Found",
        "message" -> ("Task #" + taskId + " not found.")
      ))
    }
  }

  /**
    * Try to delete the task identified by the given ID, and sends back a JSON response.
    */
  def deleteTask(taskId: Long) = Action.async {
    tasksDAO.delete(taskId).map {
      case 1 => Ok(
        Json.obj(
          "status"  -> "OK",
          "message" -> ("Task #" + taskId + " deleted.")
        )
      )
      case 0 => NotFound(Json.obj(
        "status" -> "Not Found",
        "message" -> ("Task #" + taskId + " not found.")
      ))
    }
  }

}
