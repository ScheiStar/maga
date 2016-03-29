<?php
// Routes

$app->get('/home', function ($request, $response, $args) {
    // Sample log message
    $this->logger->info("Slim-Skeleton '/' route");

    // Render index view
    return $this->renderer->render($response, 'index.html', $args);
});
$app->get('/dbcse3330',function($request,$response,$args){

	$todo=$this->dbcse3330;
	$str='';
	foreach($todo->query('select * from todo where id=0') as $row){
		    echo "<tr>";
        foreach($row as $key => $value){
            echo "<td>" . $value . "</td>"."\n";
        }
         echo "</tr>";
	}
	//return $response->write($str);
});
$app->get('/m',function($request,$response,$args){
echo $args['x'];
echo $args['y'];
// In case any of our lines are larger than 70 characters, we should use wordwrap()
// Send

	//return $response->write($str);
});
$app->get('/admin/getTutors',function($request,$response,$args){
  //$query = mysql_query("SELECT * FROM Tutor");
      $db = $this->alec;
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
        $db = $this->alec;
         $result=$db->query('select * from Tutor where id='.$id);
         $temp = array();
         while($row = $result->fetch(PDO::FETCH_ASSOC)) {
           $temp[] = $row;
         }
echo json_encode($temp);
// In case any of o
});
$app->delete('/admin/getTutors/{id}',function($request,$response,$args){
  //$query = mysql_query("SELECT * FROM Tutor");
        $id=$args['id'];
        $db = $this->alec;
         $result=$db->query('delete from Tutor where id='.$id);

echo 'success';
// In case any of o
});
