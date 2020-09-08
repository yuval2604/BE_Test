GET /tweets
[{
"id": [INT],
"content": [STRING],
"username: [STRING],
"timestamp": [ISO_FORMATED_STRING],
"likes_count: [INT]
"retweets_count": [INT]
}]

GET /retweets
[{
"content",[STRING]
"retweet_user": [STRING]
"tweet_id": [INT]
"tweet_user": [STRING]
"timestamp": [ISO_FORMATED_STRING]
}]

POST /tweets

{
"content": [STRING],
"username: [STRING]
}

POST /tweets/[:id]/likes

{
"username": [STRING]
}

POST /tweets/[:id]/retweet
{
"username": [STRING]
}
