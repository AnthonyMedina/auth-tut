# Authentication with Express, Sessions, Passport and cURL

[REFERENCE](https://medium.com/@evangow/server-authentication-basics-express-sessions-passport-and-curl-359b7456003d)

## cURL

**curl** is a tool to transfer data from or to a server, using one of the supported protocols. The command is designed to work without user interaction.

curl offers a busload of useful tricks like proxy support, user authentication, FTP upload, HTTP post, SSL connections, cookies, file transfer resume, Metalink, and more. As you will see below, the number of features will make your head spin!

`cURL -X GET http://localhost:9090/ -v`

```
client $ curl -X GET http://localhost:9090 -v
Note: Unnecessary use of -X or --request, GET is already inferred.
* Rebuilt URL to: GET/
* Closing connection 0
* Rebuilt URL to: http://localhost:9090/
*   Trying ::1...
* TCP_NODELAY set
* Connected to localhost (::1) port 9090 (#1)
> GET / HTTP/1.1
> Host: localhost:9090
> User-Agent: curl/7.54.0
> Accept: */*
>
< HTTP/1.1 200 OK
< X-Powered-By: Express
< Content-Type: application/json; charset=utf-8
< Content-Length: 14
< ETag: W/"e-KHLHnAeBEFHqcxXlxfptBwROFvI"
< Date: Sat, 24 Nov 2018 21:46:12 GMT
< Connection: keep-alive
<
* Connection #1 to host localhost left intact
{"msg":"👋"}%
```

1. cURL is tells us we don’t need to pass the -X GET as that is the default for cURL. I wanted to be explicit with this tutorial however.
2. 'rebuilt URL to…' let’s you know cURL added a slash at the end of the URL.
3. 'Trying ::1…' is the IP address that the URL resolved to.
4. The next line is the port we connected to, which you notice is the port we specified when we created the server.
5. '>' indicates data cURL has sent to the server.
6. '<' indicates data cURL has received from server.
7. Lastly, you see the response text that the server sent
