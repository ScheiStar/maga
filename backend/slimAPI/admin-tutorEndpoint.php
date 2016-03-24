<?php
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
          $id=$args['id'];
          $db = $this->alec;
         $result=$db->query('delete from Tutor where id='.$id);
echo 'success';
});
?>
