<?php
return [
    'settings' => [
        'displayErrorDetails' => true, // set to false in production

        'dbConn' => [
          'username' =>'root',
          'password' => ' ',
          'host' => 'localhost',
          'dbname' => 'solr_test',
          'db' => 'mysql',
        ],

        'auth_db' => [
          'username' => 'passman',
          'password' => 'masterofpass',
          'host' => 'localhost',
          'dbname' => 'alecDB',
          'db' => 'mysql',
        ],

        // Renderer settings
        'renderer' => [
            'template_path' => __DIR__ . '/../templates/',
        ],

        // Monolog settings
        'logger' => [
            'name' => 'slim-app',
            'path' => __DIR__ . '/../logs/app.log',
        ],
    ],
];
