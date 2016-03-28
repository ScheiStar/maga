<?php
// Routes
use Psr\Http\Message\ServerRequestInterface;
use Psr\Http\Message\ResponseInterface;
$app->get('/', function ($request, $response, $args) {

  return $this->renderer->render($response, 'index.phtml', $args);
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
