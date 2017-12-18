# FDPonly

By this point in time, you're probably wondering what on earth happened here.
If not, there's probably something wrong. The code located in files above this readme is designed to be a structured documentation system. it uses Handlebars, Express, NEDB and notams to compile a webpage containing all the data one would need, in this case about airports. 

## setup

To install, run the following (on Rpi):
```
git clone (url)

cd FDPonly

npm install

node ./app.js
```
To setup to run without needing the console open:

as above, then:
```
npm -i install forever -g

forever ./app.js
```

## disclamer

as one could expect, this is nowhere near finished. it is built on Express-Handlebars, which at time of writing has outdated dependencies, so may not be totally secure. My code style isn't exactly the most coherent, logical or understandable. Use at one's own risk.

