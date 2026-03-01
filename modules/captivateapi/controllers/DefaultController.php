<?php

namespace modules\captivateapi\controllers;

use Craft;
use craft\web\Controller;
use yii\web\Response;

class DefaultController extends Controller
{
    protected array|bool|int $allowAnonymous = true;

    public function actionAuthenticate(): Response
    {
        $username = Craft::parseEnv('$CAPTIVATE_USERNAME');
        $token = Craft::parseEnv('$CAPTIVATE_TOKEN');

        $client = Craft::createGuzzleClient();

        try {
            $response = $client->post('https://api.captivate.fm', [
                'form_params' => [
                    'username' => $username,
                    'token' => $token,
                ],
            ]);

            $data = json_decode($response->getBody()->getContents(), true);
            return $this->asJson($data);
        } catch (\Exception $e) {
            return $this->asErrorJson('Captivate Auth Failed: ' . $e->getMessage());
        }
    }

    public function actionLoadMore()
    {
        $this->requireAcceptsJson();
        $limit = (int)Craft::$app->request->getParam('limit', 12);
        $offset = (int)Craft::$app->request->getParam('offset', 0);

        $module = \modules\captivateapi\CaptivateApi::getInstance();
        $episodes = $module->getEpisodes($limit, $offset);

        return $this->asJson([
            'success' => true,
            'episodes' => $episodes
        ]);
    }
}
