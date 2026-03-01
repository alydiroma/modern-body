<?php

namespace modules\captivateapi;

use Craft;
use yii\base\Module as BaseModule;
use craft\web\twig\variables\CraftVariable;
use yii\base\Event;

/**
 * CaptivateApi module
 */
class CaptivateApi extends BaseModule
{
    public function init(): void
    {
        Craft::setAlias('@modules/captivateapi', __DIR__);
        
        // Ensure the controller namespace is set for the "Load More" functionality
        $this->controllerNamespace = 'modules\\captivateapi\\controllers';

        parent::init();

        // FIX: You MUST call the event handler registration here!
        $this->attachEventHandlers();
    }

    private function attachEventHandlers(): void
    {
        Event::on(
            CraftVariable::class,
            CraftVariable::EVENT_INIT,
            function (Event $event) {
                /** @var CraftVariable $variable */
                $variable = $event->sender;
                
                // This makes {{ craft.captivateApi }} available in Twig
                $variable->set('captivateApi', $this);
            }
        );
    }

    public function getAuthToken()
    {
        return Craft::$app->cache->getOrSet('captivate_auth_token', function() {
            $username = Craft::parseEnv('$CAPTIVATE_USERNAME');
            $token = Craft::parseEnv('$CAPTIVATE_TOKEN');

            try {
                $client = Craft::createGuzzleClient();
                $response = $client->post('https://api.captivate.fm/authenticate/token', [
                    'form_params' => [
                        'username' => $username,
                        'token' => $token,
                    ],
                ]);

                return json_decode($response->getBody()->getContents(), true);
            } catch (\Exception $e) {
                Craft::error("Captivate Auth Error: " . $e->getMessage(), __METHOD__);
                return ['error' => $e->getMessage()];
            }
        }, 82800);
    }

    public function getEpisodes($limit = 10, $offset = 0)
    {
        $limit = (int)$limit;
        $offset = (int)$offset;
        $cacheKey = "captivate_v10_l{$limit}_o{$offset}";

        return \Craft::$app->cache->getOrSet($cacheKey, function() use ($limit, $offset) {
            $auth = $this->getAuthToken();
            $token = $auth['user']['token'] ?? null;
            $showId = Craft::parseEnv('$CAPTIVATE_SHOW_ID');

            if (!$token || !$showId) {
                return [];
            }

            try {
                $client = Craft::createGuzzleClient();
                $response = $client->get("https://api.captivate.fm/shows/{$showId}/episodes", [
                    'headers' => [
                        'Authorization' => 'Bearer ' . $token,
                        'Accept'        => 'application/json',
                    ],
                ]);

                $body = json_decode($response->getBody()->getContents(), true);
                $items = $body['episodes'] ?? $body['data'] ?? $body;

                if (is_array($items)) {
                    return array_slice(array_values($items), $offset, $limit);
                }

                return [];
            } catch (\Exception $e) {
                Craft::error("Captivate Error: " . $e->getMessage(), __METHOD__);
                return []; 
            }
        }, 3600);
    }

    public function getMedia($limit = 10, $offset = 0)
    {
        $limit = (int)$limit;
        $offset = (int)$offset;
        $cacheKey = "captivate_v10_l{$limit}_o{$offset}";

        return \Craft::$app->cache->getOrSet($cacheKey, function() use ($limit, $offset) {
            $auth = $this->getAuthToken();
            $token = $auth['user']['token'] ?? null;
            $showId = Craft::parseEnv('$CAPTIVATE_SHOW_ID');

            if (!$token || !$showId) {
                return [];
            }

            try {
                $client = Craft::createGuzzleClient();
                $response = $client->get("https://api.captivate.fm/shows/{$showId}/media?limit=$limit&offset=$offset&order=created_at&sort=DESC", [
                    'headers' => [
                        'Authorization' => 'Bearer ' . $token,
                        'Accept'        => 'application/json',
                    ],
                ]);

                $body = json_decode($response->getBody()->getContents(), true);
                $items = $body['media'] ?? $body['data'] ?? $body;

                if (is_array($items)) {
                    return array_slice(array_values($items), $offset, $limit);
                }

                return [];
            } catch (\Exception $e) {
                Craft::error("Captivate Error: " . $e->getMessage(), __METHOD__);
                return []; 
            }
        }, 3600);
    }
}
