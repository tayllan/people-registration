<?php

$baseDir = __DIR__ . '/../';

$header = file_get_contents($baseDir . '/view/html/header.html');
$footer = file_get_contents($baseDir . '/view/html/footer.html');

preg_match('/\/index.php(?:\/(\w+))?(?:\/(\w+))?/', $_SERVER['REQUEST_URI'], $matches);

if (isset($matches[1])) {
    $requested = $matches[1];

    if (file_exists($baseDir . '/controller/' . $requested . '.php')) {
        require_once $baseDir . '/controller/' . $requested . '.php';

        $className = ucfirst($requested);
        $controller = new $className;

        if (isset($matches[2]) && $_SERVER['REQUEST_METHOD'] === 'POST') {
            $controllerMethod = $matches[2];
            if (method_exists($controller, $controllerMethod)) {
                call_user_func([$controller, $controllerMethod], $_POST);
            } else {
                $controller->show();
            }
        } else {
            $controller->show();
        }
    } else {
        http_response_code(404);
        echo $header;
        echo file_get_contents($baseDir . '/view/html/404.html');
        echo $footer;
    }
} else {
    echo $header;
    echo file_get_contents($baseDir . '/view/html/index.html');
    echo $footer;
}
