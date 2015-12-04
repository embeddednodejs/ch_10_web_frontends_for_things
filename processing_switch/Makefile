# firmata or localhost
server=http://localhost:4000/LED
# edison
# server=http://edison.local:4000/LED

on:
	curl -X POST -d '{"intensity": 255}' $(server)

off:
	curl -X POST -d '{"intensity": 0}' $(server)

