package controllers

import dao.UsersDAO
import javax.inject.{Inject, Singleton}
import models.User
import play.api.libs.json._
import play.api.libs.json.Reads._
import play.api.libs.functional.syntax._
import play.api.mvc.{AbstractController, ControllerComponents}

import scala.concurrent.ExecutionContext.Implicits.global

@Singleton
class UsersController @Inject()(cc: ControllerComponents, usersDAO: UsersDAO) extends AbstractController(cc) {

  // Convert a User-model object into a JsValue representation, which means that we serialize it into JSON.
  implicit val userToJson: Writes[User] = (
    (JsPath \ "id").write[Option[Long]] and
      (JsPath \ "username").write[String] and
      (JsPath \ "password").write[String]

    // Use the default 'unapply' method (which acts like a reverted constructor) of the User case class if order to get
    // back the User object's arguments and pass them to the JsValue.
    )(unlift(User.unapply))

  // Convert a JsValue representation into a User-model object, which means that we deserialize the JSON.
  implicit val jsonToUser: Reads[User] = (
    // In order to be valid, the user must have first and last names that are 2 characters long at least, as well as
    // an age that is greater than 0.
    (JsPath \ "id").readNullable[Long] and
      (JsPath \ "username").read[String](minLength[String](2)) and
      (JsPath \ "password").read[String](minLength[String](2))

    // Use the default 'apply' method (which acts like a constructor) of the User case class with the JsValue in order
    // to construct a User object from it.
    )(User.apply _)

  /**
    * This helper parses and validates JSON using the implicit `jsonToUser` above, returning errors if the parsed
    * json fails validation.
    */
  def validateJson[A : Reads] = parse.json.validate(
    _.validate[A].asEither.left.map(e => BadRequest(JsError.toJson(e)))
  )

  /**
    * Get the list of all existing users, then return it.
    * The Action.async is used because the request is asynchronous.
    */
  def getUsers = Action.async {
    val usersList = usersDAO.list()
    usersList map (s => Ok(Json.toJson(s)))
  }

  /**
    * Parse the POST request, validate the request's body, then create a new user based on the sent JSON payload, and
    * finally sends back a JSON response.
    * The action expects a request with a Content-Type header of text/json or application/json and a body containing a
    * JSON representation of the entity to create.
    */
  def createUser = Action.async(validateJson[User]) { implicit request =>
    // `request.body` contains a fully validated `User` instance, since it has been validated by the `validateJson`
    // helper above.
    val user = request.body

    val createdUser = usersDAO.insert(user)

    createdUser.map(s =>
      Ok(
        Json.obj(
          "status" -> "OK",
          "id" -> s.id,
          "message" -> ("User '" + s.username + " " + s.password + "' saved.")
        )
      )
    )
  }

  /**
    * Get the User identified by the given ID, then return it as JSON.
    */
  def getUser(userId: Long) = Action.async {
    val optionalUser = usersDAO.findById(userId)

    optionalUser.map {
      case Some(s) => Ok(Json.toJson(s))
      case None =>
        // Send back a 404 Not Found HTTP status to the client if the user does not exist.
        NotFound(Json.obj(
          "status" -> "Not Found",
          "message" -> ("User #" + userId + " not found.")
        ))
    }
  }

  /**
    * Parse the PUT request, validate the request's body, then update the user whose ID matches with the given one,
    * based on the sent JSON payload, and finally sends back a JSON response.
    */
  def updateUser(userId: Long) = Action.async(validateJson[User]) { request =>
    val newUser = request.body

    // Try to edit the user, then return a 200 OK HTTP status to the client if everything worked.
    usersDAO.update(userId, newUser).map {
      case 1 => Ok(
        Json.obj(
          "status" -> "OK",
          "message" -> ("User '" + newUser.username + " " + newUser.password + "' updated.")
        )
      )
      case 0 => NotFound(Json.obj(
        "status" -> "Not Found",
        "message" -> ("User #" + userId + " not found.")
      ))
    }
  }

  /**
    * Try to delete the user identified by the given ID, and sends back a JSON response.
    */
  def deleteUser(userId: Long) = Action.async {
    usersDAO.delete(userId).map {
      case 1 => Ok(
        Json.obj(
          "status"  -> "OK",
          "message" -> ("User #" + userId + " deleted.")
        )
      )
      case 0 => NotFound(Json.obj(
        "status" -> "Not Found",
        "message" -> ("User #" + userId + " not found.")
      ))
    }
  }

}
