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


$$app->post('/applicationForm', function (ServerRequestInterface $request, ResponseInterface $response) use($app) {


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

  $query = $db->prepare('INSERT INTO Applicants values(:id, :first_name, :last_name, :email, :gpa, :major, :password)');
  $query->bindParam(":email", $email, PDO::PARAM_STR);
  $query->bindParam(":id", $id, PDO::PARAM_INT);
  $query->bindParam(":first_name", $first_name, PDO::PARAM_STR);
  $query->bindParam(":last_name", $last_name, PDO::PARAM_STR);
  $query->bindParam(":gpa", $gpa, PDO::PARAM_DEC);
  $query->bindParam(":major", $major, PDO::PARAM_INT);
  $query->bindParam(":password", $password, PDO::PARAM_STR);
  $query->execute();
  $user = $query->fetch(PDO::FETCH_OBJ);



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
