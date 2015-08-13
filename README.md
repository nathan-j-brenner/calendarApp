# calendarApp

to start server: node calendarServer.js
open browser to http://localhost:3000/calendar.html

if Error: listen EADDRINUSE  run lsof -i tcp:[port number], then kill -9 [value of PID]