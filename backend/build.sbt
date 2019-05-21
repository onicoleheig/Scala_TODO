name := "todo"
 
version := "1.0" 
      
lazy val `todo` = (project in file(".")).enablePlugins(PlayScala)

resolvers += "scalaz-bintray" at "https://dl.bintray.com/scalaz/releases"
      
resolvers += "Akka Snapshot Repository" at "http://repo.akka.io/snapshots/"
      
scalaVersion := "2.12.2"

libraryDependencies ++= Seq( jdbc , ehcache , ws , specs2 % Test , guice )

libraryDependencies += "com.typesafe.play" %% "play-slick" % "4.0.0"
libraryDependencies += "mysql" % "mysql-connector-java" % "5.1.24"

unmanagedResourceDirectories in Test <+=  baseDirectory ( _ /"target/web/public/test")

unmanagedResourceDirectories in Test <+=  baseDirectory ( _ /"target/web/public/test" )