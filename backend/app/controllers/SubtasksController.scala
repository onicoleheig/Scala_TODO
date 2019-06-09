package controllers

import dao.SubtasksDAO
import javax.inject.{Inject, Singleton}
import models.Subtask
import play.api.libs.json._
import play.api.libs.json.Reads._
import play.api.libs.functional.syntax._
import play.api.mvc.{AbstractController, ControllerComponents}

import scala.concurrent.ExecutionContext.Implicits.global

@Singleton
class SubtasksController @Inject()(cc: ControllerComponents, subtasksDAO: SubtasksDAO) extends AbstractController(cc) {

  // Convert a Subtask-model object into a JsValue representation, which means that we serialize it into JSON.
  implicit val subtaskToJson: Writes[Subtask] = (
    (JsPath \ "id").write[Option[Long]] and
      (JsPath \ "title").write[String] and
      (JsPath \ "date").write[String] and
      (JsPath \ "checked").write[Boolean] and
      (JsPath \ "taskId").write[Long]

    // Use the default 'unapply' method (which acts like a reverted constructor) of the Subtask case class if order to get
    // back the Subtask object's arguments and pass them to the JsValue.
    )(unlift(Subtask.unapply))

  // Convert a JsValue representation into a Subtask-model object, which means that we deserialize the JSON.
  implicit val jsonToSubtask: Reads[Subtask] = (
    // In order to be valid, the subtask must have first and last names that are 2 characters long at least, as well as
    // an age that is greater than 0.
    (JsPath \ "id").readNullable[Long] and
      (JsPath \ "title").read[String](minLength[String](2)) and
      (JsPath \ "date").read[String](minLength[String](2)) and
      (JsPath \ "checked").read[Boolean] and
      (JsPath \ "taskId").read[Long]

    // Use the default 'apply' method (which acts like a constructor) of the Subtask case class with the JsValue in order
    // to construct a Subtask object from it.
    )(Subtask.apply _)

  /**
    * This helper parses and validates JSON using the implicit `jsonToSubtask` above, returning errors if the parsed
    * json fails validation.
    */
  def validateJson[A : Reads] = parse.json.validate(
    _.validate[A].asEither.left.map(e => BadRequest(JsError.toJson(e)))
  )

  /**
    * Get the list of all existing subtaskss, then return it.
    * The Action.async is used because the request is asynchronous.
    */
  def getSubtasks = Action.async {
    val subtasksList = subtasksDAO.list()
    subtasksList map (s => Ok(Json.toJson(s)))
  }

  /**
    * Parse the POST request, validate the request's body, then create a new subtask based on the sent JSON payload, and
    * finally sends back a JSON response.
    * The action expects a request with a Content-Type header of text/json or application/json and a body containing a
    * JSON representation of the entity to create.
    */
  def createSubtask = Action.async(validateJson[Subtask]) { implicit request =>
    // `request.body` contains a fully validated `Subtask` instance, since it has been validated by the `validateJson`
    // helper above.
    val subtask = request.body
    val createdSubtask = subtasksDAO.insert(subtask)

    createdSubtask.map(s =>
      Ok(
        Json.obj(
          "status" -> "OK",
          "id" -> s.id,
          "message" -> ("Subtask '" + s.title + "' saved.")
        )
      )
    )
  }

  /**
    * Get the Subtask identified by the given ID, then return it as JSON.
    */
  def getSubtask(subtaskId: Long) = Action.async {
    val optionalSubtask = subtasksDAO.findById(subtaskId)

    optionalSubtask.map {
      case Some(s) => Ok(Json.toJson(s))
      case None =>
        // Send back a 404 Not Found HTTP status to the client if the subtask does not exist.
        NotFound(Json.obj(
          "status" -> "Not Found",
          "message" -> ("Subtask #" + subtaskId + " not found.")
        ))
    }
  }

  /**
    * Parse the PUT request, validate the request's body, then update the subtask whose ID matches with the given one,
    * based on the sent JSON payload, and finally sends back a JSON response.
    */
  def updateSubtask(subtaskId: Long) = Action.async(validateJson[Subtask]) { request =>
    val newSubtask = request.body

    // Try to edit the subtask, then return a 200 OK HTTP status to the client if everything worked.
    subtasksDAO.update(subtaskId, newSubtask).map {
      case 1 => Ok(
        Json.obj(
          "status" -> "OK",
          "message" -> ("Subtask '" + newSubtask.title + "' updated.")
        )
      )
      case 0 => NotFound(Json.obj(
        "status" -> "Not Found",
        "message" -> ("Subtask #" + subtaskId + " not found.")
      ))
    }
  }

  /**
    * Try to delete the subtask identified by the given ID, and sends back a JSON response.
    */
  def deleteSubtask(subtaskId: Long) = Action.async {
    subtasksDAO.delete(subtaskId).map {
      case 1 => Ok(
        Json.obj(
          "status"  -> "OK",
          "message" -> ("Subtask #" + subtaskId + " deleted.")
        )
      )
      case 0 => NotFound(Json.obj(
        "status" -> "Not Found",
        "message" -> ("Subtask #" + subtaskId + " not found.")
      ))
    }
  }

}
