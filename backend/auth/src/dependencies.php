<?php
// DIC configuration

$container = $app->getContainer();

// view renderer
$container['renderer'] = function ($c) {
    $settings = $c->get('settings')['renderer'];
    return new Slim\Views\PhpRenderer($settings['template_path']);
};

// monolog
$container['logger'] = function ($c) {
    $settings = $c->get('settings')['logger'];
    $logger = new Monolog\Logger($settings['name']);
    $logger->pushProcessor(new Monolog\Processor\UidProcessor());
    $logger->pushHandler(new Monolog\Handler\StreamHandler($settings['path'], Monolog\Logger::DEBUG));
    return $logger;
};

$container['authConn'] = function ($c) {
  $settings = $c->get('settings')['auth_db'];

  $connString = $settings['db'] . ': host=' . $settings['host'];
  $connString .= ';dbname=' . $settings['dbname'] . ';charset=utf8mb4';

  $db = new PDO($connString, $settings['username'], $settings['password']);

  return $db;

};
