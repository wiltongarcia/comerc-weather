<?php

namespace App\Action;

use Zend\Diactoros\Response\JsonResponse;
use Psr\Http\Message\ResponseInterface;
use Psr\Http\Message\ServerRequestInterface;
use PicoFeed\Reader\Reader;

class NewsAction
{
    public function __invoke(
        ServerRequestInterface $request, 
        ResponseInterface $response, 
        callable $next = null
    )
    {
        $params = $request->getQueryParams(); 
        $reader = new Reader;
        $resource = $reader->download('http://www.panoramacomerc.com.br/?feed=rss2');


        $parser = $reader->getParser(
            $resource->getUrl(),
            $resource->getContent(),
            $resource->getEncoding()
        );

        $feed = $parser->execute();   

        $news = [];

        foreach ($feed->items as $item) {
            $news[] = [
                'title' => $item->title,
                'description' => $item->description,
            ];           
        }

        return new JsonResponse(['news' => $news]);
    }
}
