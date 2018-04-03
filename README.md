# FDPonly

By this point in time, you're probably wondering what on earth happened here.
If not, there's probably something wrong. The code located in files above this readme is designed to be a structured documentation system. it uses Handlebars, Express, mongoose and some other stuff to compile a webpage containing all the data one would need, in this case about airports. 

## Setup

To install, run the following (on Rpi):
```
git clone (url)

cd FDPonly

npm install

npm run devstart
```
To setup to run without needing the console open:

as above, then:
```
npm -i install forever -g

forever ./app.js
```

## Disclamer

as one could expect, this is nowhere near finished. it is built on Express-Handlebars, which at time of writing has outdated dependencies, so may not be totally secure. My code style isn't exactly the most coherent, logical or understandable. Use at one's own risk.
The code also isn't exactly very tidy, nor fast.

## Demo

Live demo runing at http://fdp.aeroniemi.ovh/airports
