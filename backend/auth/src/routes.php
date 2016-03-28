<?php
// Routes

$app->get('/[{name}]', function ($request, $response, $args) {
  // Sample log message
  // $this->logger->info("Slim-Skeleton '/' route");

  // Render index view
  return $this->renderer->render($response, 'index.phtml', $args);
});

$app->post('/login', function () {
  $app = \Slim\Slim::getInstance();
  $post_vars = $app->request->post();
  $uid = $post_vars['userID'];
  $password = $post_vars['password'];

  $db = $this->authConn;
  try{
    $query = $db->prepare('SELECT * from Users WHERE user_id = :uid');

    $query->bindParam(':uid', $uid, PDO::PARAM_INT);
    $query->execute();

    $user = $query->fetch(PDO::FETCH_ASSOC);

    if($user){
      $db_hash = $user['hash'];
      if(password_verify($password, $db)){
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
