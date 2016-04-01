<?php
// Routes
use Psr\Http\Message\ServerRequestInterface;
use Psr\Http\Message\ResponseInterface;

$app->get('/home', function ($request, $response, $args) {
    // Sample log message
    $this->logger->info("Slim-Skeleton '/' route");

    // Render index view
    return $this->renderer->render($response, 'index.html', $args);
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
        if(!isset($id))
        {
          $new_response=$response->withStatus(400);
          echo "please provide a user id";
          return $new_response;
        }

        $db = $this->alec;
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
        $db = $this->alec;
        $result=$db->query('delete from Tutor where id='.$id);
        echo 'success';
   return $response;
});
