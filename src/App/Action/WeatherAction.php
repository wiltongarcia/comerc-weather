<?php

namespace App\Action;

use Zend\Diactoros\Response\JsonResponse;
use Psr\Http\Message\ResponseInterface;
use Psr\Http\Message\ServerRequestInterface;
use GuzzleHttp\Client;

class WeatherAction
{
    public function __invoke(
        ServerRequestInterface $request, 
        ResponseInterface $response, 
        callable $next = null
    )
    {
        $params = $request->getQueryParams(); 
        $client = new Client([
            'timeout'  => 30,
        ]);                 
        $r = $client->request(
            'GET', 
            'https://query.yahooapis.com/v1/public/yql?q=' .
                urlencode(
                    'select * from weather.forecast where woeid in '.
                        '(select woeid from geo.places(1) where text="' . 
                            $params['location'] .
                                '") and u="c"'
                ) .
                    '&format=json'
        );

        $j = json_decode((string)$r->getBody());
        $item = $j->query->results->channel->item;
        $description = $item->description;
        preg_match_all("/img src=\"(.*)\"/", $description, $output);
        $item->image = $output[1][0];

        return new JsonResponse(['temp' => $item->condition->temp, 'code' => $item->condition->code]);
    }
}
