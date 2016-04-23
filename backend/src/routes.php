<?php
// Routes
use Lcobucci\JWT\Builder;
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


function calculateDays($days, $day){

	if ($day == 0){

		$days["Mon"] = True;

	} else if ($day == 1) {

		$days["Tues"] = True;

	} else if ($day == 2){

		$days["Wed"] = True;

	} else if ($day == 3){

		$days["Thurs"] = True;

	} else if ($day == 4){

		$days["Fri"] = True;

	}

	return $days;
}

$app->get('/getApplication/{id}', function ($request, $response, $args) {

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

	//gets the classes
	$query = $db->prepare('SELECT * from ApplicantClasses WHERE Applicants_applicant_id = :uid');
	$query->bindParam(':uid', $uid, PDO::PARAM_INT);
	$query->execute();

	$courses = array();

	//puts info in an array
	while($row = $query->fetch(PDO::FETCH_OBJ)){
		//iterate over all the fields
		$courses[] = $row;
	}


	//gets the timeslots
	$query = $db->prepare('SELECT * from ApplicantTimeslots WHERE Applicants_applicant_id = :uid');
	$query->bindParam(':uid', $uid, PDO::PARAM_INT);
	$query->execute();

	$cal = array();
	$times = array();
	$tempdays = array();

	while($row = $query->fetch(PDO::FETCH_OBJ)){
		//iterate over all the fields
		$result = json_encode($row);
		$data = json_decode($result);
		$times[] = $data->timeslot_time;
		$tempdays[] = $data->timeslot_day;
	}


		$days = array(
				"Mon" => False,
				"Tues" => False,
				"Wed"   => False,
				"Thurs"  => False,
				"Fri" => False
			);

			for ($x = 0; $x <=7; $x++){

				$cal [] = $days;

			}


			$max = sizeof($times);

			for ($y = 0; $y < $max; $y++){

				if ($times[$y] == 0 || $times[$y] == 1 || $times[$y] == 2 || $times[$y] == 3 || $times[$y] == 4 || $times[$y] == 5 || $times[$y] == 6 || $times[$y] == 7){

					$cal[$times[$y]] = 	calculateDays($cal[$times[$y]],$tempdays[$y]);

				}

		}


		//json object with all the info of an applicant
		$tempApplicant = array(
			'calArray' => $cal,
			'courseDictArray' => $courses,
			'applicantInfo' => $user
		);

		//converts it to json
		$applicant = json_encode($tempApplicant);

	//if there is an applicant then respond with 200 else respond with 403
		if($user){

			echo($applicant);
			return $response;

		} else{
			$new_response = $response->withStatus(204);
			return $new_response;
		// echo('No Applicant Found');
		}


	return $response; //returns the response

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
    $is_admin = $user->admin;
    if(password_verify($password, $db_hash)){
      $new_response = $response->withStatus(200);
      $token = (new Builder())->set('userID', $uid)
                              ->set('admin', $is_admin)
                              ->getToken();
      echo $token;
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

	$applicants = array();

	while($user = $query->fetch(PDO::FETCH_OBJ)){
		//iterate over all the fields

		$uid = $user->applicant_id;
		//gets the classes
		$query2 = $db->prepare('SELECT * from ApplicantClasses WHERE Applicants_applicant_id = :uid');
		$query2->bindParam(':uid', $uid, PDO::PARAM_INT);
		$query2->execute();

		$courses = array();

		//puts info in an array
		while($row = $query2->fetch(PDO::FETCH_OBJ)){
			//iterate over all the fields
			$courses[] = $row;
		}

		//gets the timeslots
		$query3 = $db->prepare('SELECT * from ApplicantTimeslots WHERE Applicants_applicant_id = :uid');
		$query3->bindParam(':uid', $uid, PDO::PARAM_INT);
		$query3->execute();

		$cal = array();
		$times = array();
		$tempdays = array();

		while($row = $query3->fetch(PDO::FETCH_OBJ)){
			//iterate over all the fields
			$result = json_encode($row);
			$data = json_decode($result);
			$times[] = $data->timeslot_time;
			$tempdays[] = $data->timeslot_day;
		}


			$days = array(
					"Mon" => False,
					"Tues" => False,
					"Wed"   => False,
					"Thurs"  => False,
					"Fri" => False
				);

				for ($x = 0; $x <=7; $x++){

					$cal [] = $days;

				}


				$max = sizeof($times);

				for ($y = 0; $y < $max; $y++){

					if ($times[$y] == 0 || $times[$y] == 1 || $times[$y] == 2 || $times[$y] == 3 || $times[$y] == 4 || $times[$y] == 5 || $times[$y] == 6 || $times[$y] == 7){

						$cal[$times[$y]] = 	calculateDays($cal[$times[$y]],$tempdays[$y]);

					}

			}

		//json object with all the info of an applicant
		$tempApplicant = array(
			'calArray' => $cal,
			'courseDictArray' => $courses,
			'applicantInfo' => $user
		);


		$applicants[] = $tempApplicant;

	}

	if($applicants){

		echo( json_encode($applicants));
		return $response;

	}else{

		$new_response = $response->withStatus(204);

		return $new_response;

	}

});

$app->get('/getTutors', function($request, $response, $args) {


	$db = $this->createDB;

	$query = $db->prepare('SELECT * FROM Tutors');
	$query->execute();

	$tutors = array();

	while($user = $query->fetch(PDO::FETCH_OBJ)){
		//iterate over all the fields

		$uid = $user->tutor_id;
		//gets the classes
		$query2 = $db->prepare('SELECT * from TutorClasses WHERE Tutors_tutor_id = :uid');
		$query2->bindParam(':uid', $uid, PDO::PARAM_INT);
		$query2->execute();

		$courses = array();

		//puts info in an array
		while($row = $query2->fetch(PDO::FETCH_OBJ)){
			//iterate over all the fields
			$courses[] = $row;
		}

		//gets the timeslots
		$query3 = $db->prepare('SELECT * from Timeslots WHERE Tutors_tutor_id = :uid');
		$query3->bindParam(':uid', $uid, PDO::PARAM_INT);
		$query3->execute();

		$cal = array();
		$times = array();
		$tempdays = array();

		while($row = $query3->fetch(PDO::FETCH_OBJ)){
			//iterate over all the fields
			$result = json_encode($row);
			$data = json_decode($result);
			$times[] = $data->timeslot_time;
			$tempdays[] = $data->timeslot_day;

		}


	$days = array(
				"Mon" => False,
				"Tues" => False,
				"Wed"   => False,
				"Thurs"  => False,
				"Fri" => False
		);

	for ($x = 0; $x <= 7; $x++){

		$cal [] = $days;

	}

	$max = sizeof($times);

		for ($y = 0; $y < $max; $y++){

				if ($times[$y] == 0 || $times[$y] == 1 || $times[$y] == 2 || $times[$y] == 3 || $times[$y] == 4 || $times[$y] == 5 || $times[$y] == 6 || $times[$y] == 7){

					$cal[$times[$y]] = 	calculateDays($cal[$times[$y]],$tempdays[$y]);

				}

	}

		//json object with all the info of an applicant
		$tempTutor = array(
			'calArray' => $cal,
			'courseDictArray' => $courses,
			'applicantInfo' => $user
		);


		$tutors[] = $tempTutor;

	}

	if($tutors){

		echo( json_encode($tutors));
		return $response;

	}else{

		$new_response = $response->withStatus(204);

		return $new_response;

	}

});

$app->get('/getTutor/{id}', function($request, $response, $args) {

	$db = $this->createDB; //gets the database
	$uid = $args['id']; //get the id from the url parameter

	//checks to see if there is an id
	if(!isset($uid)){
		$new_response = $response->withStatus(418);
		echo("Please Provide a User ID");
		return $new_response;
	}


	// creates, prepares and executes sql query
	$query = $db->prepare('SELECT * FROM Tutors WHERE tutor_id = :uid');
	$query->bindParam(':uid', $uid, PDO::PARAM_INT);
	$query->execute();

	//gets the user and applicant
	$user = $query->fetch(PDO::FETCH_OBJ);

	//gets the classes
	$query = $db->prepare('SELECT * from TutorClasses WHERE Tutors_tutor_id = :uid');
	$query->bindParam(':uid', $uid, PDO::PARAM_INT);
	$query->execute();

	$courses = array();

	//puts info in an array
	while($row = $query->fetch(PDO::FETCH_OBJ)){
		//iterate over all the fields
		$courses[] = $row;
	}


	//gets the timeslots
	$query = $db->prepare('SELECT * from Timeslots WHERE Tutors_tutor_id = :uid');
	$query->bindParam(':uid', $uid, PDO::PARAM_INT);
	$query->execute();

	$cal = array();
	$times = array();
	$tempdays = array();

	while($row = $query->fetch(PDO::FETCH_OBJ)){
		//iterate over all the fields
		$result = json_encode($row);
		$data = json_decode($result);
		$times[] = $data->timeslot_time;
		$tempdays[] = $data->timeslot_day;

	}


		$days = array(
			"Mon" => False,
			"Tues" => False,
			"Wed"   => False,
			"Thurs"  => False,
			"Fri" => False
		);

		for ($x = 0; $x <=7; $x++){

			$cal [] = $days;

		}


		$max = sizeof($times);

		for ($y = 0; $y < $max; $y++){

			if ($times[$y] == 0 || $times[$y] == 1 || $times[$y] == 2 || $times[$y] == 3 || $times[$y] == 4 || $times[$y] == 5 || $times[$y] == 6 || $times[$y] == 7){

					$cal[$times[$y]] = 	calculateDays($cal[$times[$y]],$tempdays[$y]);

				}

		}


	//json object with all the info of an applicant
	$tempTutor = array(
		'calArray' => $cal,
		'courseDictArray' => $courses,
		'tutorInfo' => $user
		);

	//converts it to json
	$tutor = json_encode($tempTutor);

	//if there is an applicant then respond with 200 else respond with 403
	if($user){

		echo($tutor);
		return $response;

	}else{

		$new_response = $response->withStatus(204);
		return $new_response;
		// echo('No Applicant Found');
	}


	return $response; //returns the response

});

$app->delete('/deleteApplication/{id}',function($request,$response,$args){


		$db = $this->createDB;
    $id=$args['id'];

    if(!isset($id)){

      $new_response=$response->withStatus(400);
      echo "please provide a user id";
			return $new_response;

        }

		// creates, prepares and executes sql query
		$query = $db->prepare('SELECT * FROM Applicants WHERE applicant_id = :id');
		$query->bindParam(':id', $id, PDO::PARAM_INT);
		$query->execute();

		//gets the user and applicant
		$user = $query->fetch(PDO::FETCH_OBJ);

	  //if there is an applicant then respond with 200 else respond with 403
		if($user){

			$query = $db->prepare('DELETE FROM Applicants WHERE applicant_id = :id');
			$query->bindParam(':id', $id, PDO::PARAM_INT);
			if($query->execute()){

				return $response;

				} else {

				echo "Failed Deleting Applicant";

			}

		} else {
			$new_response = $response->withStatus(204);
			return $new_response;

			}

   return $response;
});

$app->post('/sendEmail', function (ServerRequestInterface $request, ResponseInterface $response) use($app) {
  $json = $request->getBody();
  $data = json_decode($json);
  $email = $data->email;
  $message = $data->message;
  $type = $data->type;

  $message = "'" . $message . "'";

  if(!isset($email) || !isset($message) || !isset($type)){
    $new_response = $response->withStatus(418);
    echo "invalid GET request";
    return $new_response;
  }

  ob_start();
  passthru("/usr/bin/python2.7 /var/www/maga/scripts/sendEmails.py {$email} {$message} {$type}");
  $output = ob_get_clean();
  echo $output;
  return $response;
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

$app->post('/setApplicationStatus',function (ServerRequestInterface $request, ResponseInterface $response) use($app) {

  $data = $request->getBody();
  $id = $data->userID;
  $status = $data->status;

  if(!isset($id) || !isset($status)){
    $new_response = $response->withStatus(400);
    echo("Please provide a user ID and/or a status");
    return $new_response;
  }

  $db = $this->createDB;

  if($status == "0"){
    $query = $db->prepare("UPDATE Applicants SET application_status='0'
      WHERE applicant_id = :id");
    $query->bindParam(':id', $id, PDO::PARAM_INT);
    $query->execute();
    return $response;
  }else{
    $query1 = $db->prepare("INSERT INTO Tutors (tutor_id, tutor_first_name, tutor_last_name,
      tutor_email, tutor_phone, tutor_gpa, tutor_major) SELECT applicant_id, applicant_first_name,
      applicant_last_name, applicant_email, applicant_gpa, applicant_major
      FROM Applicants
      WHERE applicant_id = :id");
    $query1->bindParam(':id', $id, PDO::PARAM_INT);
    $query1->execute();

    $query2 = $db->prepare("INSERT INTO Users (user_id, hash)
      SELECT applicant_id, applicant_hash
      FROM Applicants
      WHERE applicant_id = :id");
    $query2->bindParam(':id', $id, PDO::PARAM_INT);
    $query2->execute();

    $query2_1 - $db->prepare("INSERT INTO Users (admin)
    VALUES(0)
    WHERE applicant_id = :id");
    $query2_1->bindParam(':id', $id, PDO::PARAM_INT);
    $query2_1->execute();

    $query3 = $db->prepare("INSERT INTO TutorClasses
      SELECT * FROM ApplicantClasses
      WHERE applicant_id = :id");
    $query3->bindParam(':id', $id, PDO::PARAM_INT);
    $query3->execute();

    $query4 = $db->prepare("INSERT INTO Timeslots
      SELECT * FROM ApplicantTimeslots
      WHERE applicant_id = :id");
    $query4->bindParam(':id', $id, PDO::PARAM_INT);
    $query4->execute();

    $query5 = $db->prepare("DELETE FROM Applicants WHERE applicant_id = :id");
    $query5->bindParam(':id', $id, PDO::PARAM_INT);
    $query5->execute();

    return $response;
  }


});

$app->post('/applicationForm', function ($request, $response, $args)  {
	$db = $this->createDB;
	$json = $request->getBody();
	$data = json_decode($json);

	$fName = $data->applicant_first_name;
	$lName = $data->applicant_last_name;
	$major = $data->applicant_major;
	$password = $data->applicant_hash;
	$uid = $data->applicant_id;
	$calander = $data->calArray;
	$courses = $data->courseDictArray;
	$email = $data->applicant_email;
	$gpa=$data->applicant_gpa;
	$status = "Pending";



	// gets applicant
	$query = $db->prepare('SELECT * FROM Applicants WHERE applicant_id = :uid');
	$query->bindParam(':uid', $uid, PDO::PARAM_INT);
	$query->execute();
	$applicant = $query->fetch(PDO::FETCH_OBJ);

	// gets tutor
	$query = $db->prepare('SELECT * FROM Tutors WHERE applicant_id = :uid');
	$query->bindParam(':uid', $uid, PDO::PARAM_INT);
	$query->execute();
	$tutor = $query->fetch(PDO::FETCH_OBJ);

	//checks to see if a tutor or applicant already exists with that id
	if($tutor || $applicant){

		$new_response = $response->withStatus(409);
		echo("Applicant or Tutor with that ID already exists");
		return $new_response;
	}

	//inserts general info

	$query = $db->prepare('INSERT into Applicants values(:applicant_id,:applicant_first_name,:applicant_last_name, :applicant_email, :applicant_gpa, :applicant_major, :application_status, :applicant_password)');
	$query->bindParam(":applicant_id", $uid, PDO::PARAM_INT);
	$query->bindParam(":applicant_first_name", $fName, PDO::PARAM_STR);
	$query->bindParam(":applicant_last_name", $lName, PDO::PARAM_STR);
	$query->bindParam(":applicant_email", $email, PDO::PARAM_STR);
	$query->bindParam(":applicant_gpa", $gpa, PDO::PARAM_STR);
	$query->bindParam(":applicant_major", $major, PDO::PARAM_STR);
	$query->bindParam(":application_status", $status, PDO::PARAM_STR);
	$query->bindParam(":applicant_password", $password, PDO::PARAM_STR);
	$query->execute();

	//inserts all courses
	foreach($courses as $item) {

		$name = $item->courseType;
		$courseNum = $item->courseNum;
		$grade = $item->grade;


		$query = $db->prepare('INSERT into ApplicantClasses(class_name, class_gpa, class_number, Applicants_applicant_id) values(:class_name, :class_gpa, :class_number, :Applicants_applicant_id)');
		$query->bindParam(":class_name", $name, PDO::PARAM_STR);
		$query->bindParam(":Applicants_applicant_id", $uid, PDO::PARAM_INT);
		$query->bindParam(":class_gpa", $grade, PDO::PARAM_STR);
		$query->bindParam(":class_number", $courseNum, PDO::PARAM_STR);
		$query->execute();


	}

	//inserts all days and times the applicant can tutor
	$time_slot = 0;
	$mon = 0;
	$tues = 1;
	$wed = 2;
	$thurs = 3;
	$fri = 4;
	foreach($calander as $item) {


		$day1 = $item->Mon;
		$day2 = $item->Tues;
		$day3 = $item->Wed;
		$day4 = $item->Thurs;
		$day5 = $item->Fri;

		$query = $db->prepare('INSERT into ApplicantTimeslots(timeslot_time, Applicants_applicant_id, timeslot_day) values(:timeslot_time, :Applicants_applicant_id, :timeslot_day)');


		if ($day1 == True){

			$query->bindParam(":timeslot_time", $time_slot, PDO::PARAM_INT);
			$query->bindParam(":Applicants_applicant_id", $uid, PDO::PARAM_INT);
			$query->bindParam(":timeslot_day", $mon, PDO::PARAM_INT);
			$query->execute();


		}

		if ($day2 == True) {

			$query->bindParam(":timeslot_time", $time_slot, PDO::PARAM_INT);
			$query->bindParam(":Applicants_applicant_id", $uid, PDO::PARAM_INT);
			$query->bindParam(":timeslot_day", $tues, PDO::PARAM_INT);
			$query->execute();

		}

		if( $day3 == True){

			$query->bindParam(":timeslot_time", $time_slot, PDO::PARAM_INT);
			$query->bindParam(":Applicants_applicant_id", $uid, PDO::PARAM_INT);
			$query->bindParam(":timeslot_day", $wed, PDO::PARAM_INT);
			$query->execute();

		}

		if ($day4 == True){

			$query->bindParam(":timeslot_time", $time_slot, PDO::PARAM_INT);
			$query->bindParam(":Applicants_applicant_id", $uid, PDO::PARAM_INT);
			$query->bindParam(":timeslot_day", $thurs, PDO::PARAM_INT);
			$query->execute();


		}
		if ($day5 == True){

			$query->bindParam(":timeslot_time", $time_slot, PDO::PARAM_INT);
			$query->bindParam(":Applicants_applicant_id", $uid, PDO::PARAM_INT);
			$query->bindParam(":timeslot_day", $fri, PDO::PARAM_INT);
			$query->execute();

		}


		$time_slot = $time_slot + 1;

	}

	return $response;
});

$app->post('/requestClass',function (ServerRequestInterface $request, ResponseInterface $response) use($app) {
  $db = $this->createDB;
  $data = json_decode($request->getBody());
  $uid = $data->userID;
  $classname = $data->className;
  $classnum = $data->classNum;
  $reqtype = $data->requestType;

  if(!isset($uid) || !isset($classname) || !isset($classnum) || !isset($reqtype)){
    $new_response = $response->withStatus(400);
    echo("Please send a valid JSON");
    return $new_response;
  }

  $query = $db->prepare("INSERT INTO TutorRequests
    (tr_tutor_id, tr_classtype, tr_classnum, tr_request_type, Tutors_tutor_id)
    VALUES(:uid, :classname, :classnum, :reqtype, :uid)");
  $query->bindParam(":uid", $uid, PDO::PARAM_INT);
  $query->bindParam(":classname", $classname, PDO::PARAM_STR);
  $query->bindParam(":classnum", $classnum, PDO::PARAM_STR);
  $query->bindParam(":reqtype", $reqtype, PDO::PARAM_STR);
  $query->execute();
  if(!$query){
    echo ($query->errorInfo());
  }
});

$app->get('/getTutorRequests', function(ServerRequestInterface $request, ResponseInterface $response) use($app) {
  $db = $this->createDB;

  $query = $db->prepare("SELECT Tutors.tutor_first_name, Tutors.tutor_last_name, Tutors.tutor_id, TutorRequests.tr_classtype, TutorRequests.tr_classnum, TutorRequests.tr_request_type
    FROM Tutors, TutorRequests
    WHERE  Tutors.tutor_id = TutorRequests.tr_tutor_id;");
  $query->execute();

  $temp = array();
  while($row = $query->fetch(PDO::FETCH_ASSOC)) {
    $temp[] = $row;
  }

  echo json_encode($temp);

});
