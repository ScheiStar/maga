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
  $user_id = $post_vars['userID'];
  $password = $post_vars['password'];




});
