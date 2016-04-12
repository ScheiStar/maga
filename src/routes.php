<?php
// Routes
use Psr\Http\Message\ServerRequestInterface;
use Psr\Http\Message\ResponseInterface;

//$app->get('/[{name}]', function ($request, $response, $args) {
$app->get('/', function($request, $response, $args){
    // Sample log message
  // $this->logger->info("Slim-Skeleton '/' route");
	echo "HOME";
    // Render index view
    //return $this->renderer->render($response, 'index.html', $args);
});

$app->post('/applicationForm', function (ServerRequestInterface $request, ResponseInterface $response) use($app) {


	$db = $this->createDB;
	$json = $request->getBody();
	$data = json_decode($json);


	// create a variable
	$first_name = $data->fName;
	$last_name = $data->lName;
	$password = $data->pass;
	$config_password = $data->confPass;
	$id = $data->id;
	$email = $data->email;
	$major = $data->major;
	$gpa = $data->gpa;



  if(!isset($first_name) || !isset($last_name) || !isset($password) || !isset($config_password) || !isset($id) || !isset($email) || !isset($major) || !isset($gpa)){
    $new_response = $response->withStatus(418);
    echo("The application is not filled out completely ");
    return $new_response;
  }


	  $query = $db->prepare('SELECT * FROM Applicants WHERE applicant_id = :uid');
	  $query->bindParam(':uid', $uid, PDO::PARAM_INT);
	  $query->execute();

	//gets the user and applicant
	  $applicant = $query->fetch(PDO::FETCH_OBJ);
	
	
	  $query = $db->prepare('SELECT * FROM Users WHERE applicant_id = :uid');
	  $query->bindParam(':uid', $uid, PDO::PARAM_INT);
	  $query->execute();

	//gets the user and applicant
	  $user = $query->fetch(PDO::FETCH_OBJ);
	
	
	  
	if($applicant || $user){
		
		//applicant or user exists 
		    $new_response = $response->withStatus(409);
		    echo("Usero or Applicant already exists");
		    return $new_response;
		
	} else {
	
		//applicant or user does not exist does not exits 

  $query = $db->prepare('INSERT INTO Applicants values(:id, :first_name, :last_name, :email, :gpa, :major, :password)');
  $query->bindParam(":email", $email, PDO::PARAM_STR);
  $query->bindParam(":id", $id, PDO::PARAM_INT);
  $query->bindParam(":first_name", $first_name, PDO::PARAM_STR);
  $query->bindParam(":last_name", $last_name, PDO::PARAM_STR);
  $query->bindParam(":gpa", $gpa, PDO::PARAM_STR);
  $query->bindParam(":major", $major, PDO::PARAM_INT);
  $query->bindParam(":password", $password, PDO::PARAM_STR);
  $query->execute();
  $user = $query->fetch(PDO::FETCH_OBJ);

	$new_response = $response->withStatus(200);
     return $response;

	}


  return $response;
  
});


$app->get('/getapplicant/{id}', function ($request, $response, $args) {


		//echo "Success:". $args['id'];

		  $db = $this->createDB; //gets the database
		  $uid = $args['id']; //get the id from the url parameter

	//checks to see if there is an id
		  if(!isset($uid)){
		    $new_response = $response->withStatus(418);
		    echo("Please Provide a User ID");
		    return $new_response;
		  }


		// creates, prepares and executes sql query
		  $query = $db->prepare('SELECT * FROM Applicants WHERE id = :uid');
		  $query->bindParam(':uid', $uid, PDO::PARAM_INT);
		  $query->execute();

		//gets the user and applicant
		  $user = $query->fetch(PDO::FETCH_ASSOC);
		  $applicant = json_encode($user);
      echo $applicant;
	//if there is an applicant then respond with 200 else respond with 403
		  if($user){

			  $new_response = $response->withJson($applicant, 200);
		      //echo('Success! Applicant Found');


		  }else{
		    $new_response = $response->withStatus(204);
		   // echo('No Applicant Found');
		  }


		  return $new_response; //returns the response

});
$app->get('/getApplications', function ($request, $response, $args) {


		//echo "Success:". $args['id'];

		$db = $this->createDB;
			 $result=$db->query('select * from Applicants');
			 $temp = array();
			 while($row = $result->fetch(PDO::FETCH_ASSOC)) {
				 $temp[] = $row;
			 }
echo json_encode($temp);
// In case any of o
});
	//checks to see if there is an id


});
$app->post('/setApplicationStatus', function (ServerRequestInterface $request, ResponseInterface $response) use($app) {


	$db = $this->createDB;
	$json = $request->getBody();
	$data = json_decode($json);

	$id = $data->id;
	$status = $data->status;


  if(!isset($id) ||!isset($status)){
    $new_response = $response->withStatus(418);
    echo("ID or status not given ");
    return $new_response;
  }
  $checkForID=$db->prepare('select id from Applicants where id=:id');
  $checkForID->bindParam(":id", $id, PDO::PARAM_INT);
  $checkForID->execute();
  $user=$checkForID->fetch(PDO::FETCH_OBJ);
  if ($user){
    $query = $db->prepare('UPDATE Applicants SET status=:status WHERE id=:id;');
    $query->bindParam(":status", $status, PDO::PARAM_STR);
    $query->bindParam(":id", $id, PDO::PARAM_INT);
    $query->execute();
    $user = $query->fetch(PDO::FETCH_OBJ);
   $new_response=$response->withStatus(201);
   echo "successfully updated status";
  return $new_response;
  }
  else{
    $new_response=$response->withStatus(404);
    echo "user not found";
    return $new_response;
  }



});
$app->post('/addClass', function (ServerRequestInterface $request, ResponseInterface $response) use($app) {


	$db = $this->createDB;
	$json = $request->getBody();
	$data = json_decode($json);

	$userID = $data->userID;
	$classID = $data->classID;
  $className=$data->className;
  $gpa=$data->gpa;

  if(!isset($userID) || !isset($classID) || !isset($gpa) || !isset($className)){
    $new_response = $response->withStatus(418);
    echo("userID, classID, className or gpa not given ");
    return $new_response;
  }
  $checkForID=$db->prepare('select id from Tutors where id=:userID');
  $checkForID->bindParam(":userID", $userID, PDO::PARAM_INT);
  $checkForID->execute();
  $user=$checkForID->fetch(PDO::FETCH_OBJ);
  if ($user){
    $query = $db->prepare('INSERT into TutorClasses values(:classID,:className,:gpa, :userID)');
    $query->bindParam(":className", $className, PDO::PARAM_STR);
    $query->bindParam(":classID", $classID, PDO::PARAM_INT);
    $query->bindParam(":gpa", $gpa, PDO::PARAM_STR);
    $query->bindParam(":userID", $userID, PDO::PARAM_INT);
    $query->execute();
    $user = $query->fetch(PDO::FETCH_OBJ);
   $new_response=$response->withStatus(201);
   echo "successfully created class";
  return $new_response;
  }
  else{
    echo"no tutor found";
    $new_response=$response->withStatus(404);
    return $new_response;
  }



});
$app->delete('/dropClass', function (ServerRequestInterface $request, ResponseInterface $response) use($app) {


	$db = $this->createDB;
	$json = $request->getBody();
	$data = json_decode($json);

	$userID = $data->userID;
	$classID = $data->classID;

  if(!isset($userID) || !isset($classID)){
    $new_response = $response->withStatus(418);
    echo("userID or classID not given ");
    return $new_response;
  }
  $checkForID=$db->prepare('select id from Tutors where id=:userID');
  $checkForID->bindParam(":userID", $userID, PDO::PARAM_INT);
  $checkForID->execute();
  $user=$checkForID->fetch(PDO::FETCH_OBJ);
  if ($user){
    $query = $db->prepare('Delete from TutorClasses where id=:classID and tutor_ID=:userID');
    $query->bindParam(":classID", $classID, PDO::PARAM_INT);
    $query->bindParam(":userID", $userID, PDO::PARAM_INT);
    $query->execute(); 
    $user = $query->fetch(PDO::FETCH_OBJ);
   $new_response=$response->withStatus(410);
   echo "successfully deleted class";
  return $new_response;
  }
  else{
    echo"no tutor found";
    $new_response=$response->withStatus(404);
    return $new_response;
  }



});
