<?php
require_once 'vendor/autoload.php';
use Symfony\Component\Routing\Matcher\UrlMatcher;
use Symfony\Component\Routing\RequestContext;
use Symfony\Component\Routing\RouteCollection;
use Symfony\Component\Routing\Route;
use Symfony\Component\HttpFoundation\Request;

header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Method: POST');
header('Access-Control-Allow-Headers: Origin, Content-Type, X-Auth-Token');

try {
    $routePartnership = new Route('/partnership');

    $routes = new RouteCollection();
    $routes->add('partnership', $routePartnership);

    $context = new RequestContext();
    $context->fromRequest(Request::createFromGlobals());

    $matcher = new UrlMatcher($routes, $context);
    $parameters = $matcher->match($context->getPathInfo());
} catch (Exception $e) {
    return;
}

if ($parameters['_route'] === 'partnership') {
    require_once 'objects/partnership.php';
    return;
}

$data = file_get_contents('php://input');
$data = json_decode($data, true);
?>