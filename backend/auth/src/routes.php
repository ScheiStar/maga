<?php
// Routes

$app->get('/', function ($request, $response, $args) {
  // Sample log message
  // $this->logger->info("Slim-Skeleton '/' route");

  // Render index view
  return $this->renderer->render($response, 'index.phtml', $args);
});

$app->get('/login', function () {
  $app = \Slim\Slim::getInstance();
  $post_vars = $app->request->post();
  $uid = $post_vars['userID'];
  $password = $post_vars['password'];

  echo ('Username: ' . $uid . ' Password: ' . $password);

  $db = $this->authConn;
  try{
    $query = $db->prepare('SELECT * from Users WHERE user_id = :uid');

    $query->bindParam(':uid', $uid, PDO::PARAM_INT);
    $query->execute();

    $user = $query->fetch(PDO::FETCH_OBJ);

    if($user){
      $db_hash = $user->hash;
      if(password_verify($password, $db_hash)){
        $app->response()->setStatus(200);
        echo('Success');
      }else{
        $app->response()->setStatus(403);
        echo('Invalid password');
      }

    }else{
      throw new PDOException('No user found');
    }
  }catch (PDOException $e){
    $app->response()->setStatus(403);
    echo '{"error":{"text":'. $e->getMessage() .'}}';
  }


});
//echo (password_hash("123456", PASSWORD_DEFAULT));
