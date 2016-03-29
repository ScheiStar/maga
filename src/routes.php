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
		  $query = $db->prepare('SELECT * FROM Applicants WHERE applicant_id = :uid');
		  $query->bindParam(':uid', $uid, PDO::PARAM_INT);
		  $query->execute();
		
		//gets the user and applicant
		  $user = $query->fetch(PDO::FETCH_OBJ);
		  $applicant = json_encode($user);

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
