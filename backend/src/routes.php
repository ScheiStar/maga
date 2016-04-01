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

		   echo($applicant);
		   return $response;


		  }else{
		    $new_response = $response->withStatus(204);
		   // echo('No Applicant Found');
		  }


		  return $new_response; //returns the response

});

$app->post('/login', function (ServerRequestInterface $request, ResponseInterface $response) use($app) {
  $db = $this->authConn;
  $json = $request->getBody();
  $data = json_decode($json);
  $uid = $data->userID;
  $password = $data->password;

  if(!isset($uid) || !isset($password)){
    $new_response = $response->withStatus(418);
    echo("Provide a user or password");
    return $new_response;
  }

  $query = $db->prepare('SELECT * from Users WHERE user_id = :uid');

  $query->bindParam(':uid', $uid, PDO::PARAM_INT);
  $query->execute();

  $user = $query->fetch(PDO::FETCH_OBJ);

  if($user){
    $db_hash = $user->hash;
    if(password_verify($password, $db_hash)){
      $new_response = $response->withStatus(200);
      echo('Success');
    }else{
      $new_response = $response->withStatus(403);
      echo('Invalid password');
    }

  }else{
    $new_response = $response->withStatus(403);
    echo('No user found');
  }

  return $new_response;
});


$app->get('/getApplications', function($request, $response, $args) {
	
	
	  $db = $this->createDB;
	
	  $query = $db->prepare('SELECT * FROM Applicants');
	  $query->execute();
	
	  $temp = array(); 

	while($row = $query->fetch(PDO::FETCH_OBJ)){
	    //iterate over all the fields
		$temp[] = $row; 
	}
	
	  if($temp){

	      echo( json_encode($temp));
		  return $response;

	  }else{
		
	    $new_response = $response->withStatus(204);
	   
		return $new_response; 
	
	  }
	
});

$app->get('/admin/getTutors',function($request,$response,$args){
  //$query = mysql_query("SELECT * FROM Tutor");
      $db = $this->createDB;
         $result=$db->query('select * from Tutor');
         $temp = array();
         while($row = $result->fetch(PDO::FETCH_ASSOC)) {
           $temp[] = $row;
         }
echo json_encode($temp);
// In case any of o
});
$app->get('/admin/getTutors/{id}',function($request,$response,$args){
  //$query = mysql_query("SELECT * FROM Tutor");
        $id=$args['id'];
        if(!isset($id))
        {
          $new_response=$response->withStatus(400);
          echo "please provide a user id";
          return $new_response;
        }
        $db = $this->createDB;
         $result=$db->query('select * from Tutor where id='.$id);
         $user=$result->fetch(PDO::FETCH_OBJ);
         if ($user){
           echo json_encode($user);
           return $response;
         }
         else{
           $new_response=$response->withStatus(204);
           echo "user not found";
           return $new_response;
         }
});
$app->delete('/admin/getTutors/{id}',function($request,$response,$args){
  //$query = mysql_query("SELECT * FROM Tutor");
        $id=$args['id'];
        if(!isset($id))
        {
          $new_response=$response->withStatus(400);
          echo "please provide a user id";
          return $new_response;
        }
        $db = $this->createDB;
        $result=$db->query('delete from Tutor where id='.$id);
        echo 'success';
   return $response;
});

