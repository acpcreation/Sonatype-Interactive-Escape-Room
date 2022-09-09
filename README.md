# Sonatype - Interactive Escape Room

## Project Overview
This is a Vue.js project which simulates a digital escape room. 
The challenges and content are designed to educate and entertain on open source software and the security risks out there, all in a creative and interactive environment. 

```
Copyright Sonatype - 2021

Code Contributors:
- Alexander Plattel
- Austin Becker
- Maury Cupitt

Content Contributors:
- Dana Ward
- Kadi Grigg
- Steve Poole
- Theresa Mammarella


Events Used:
- Accelerate 2021 (Internal - NA, EMEA, APJ)
- Kansas City Developers Conference September 2022
```

## Project Description
There are several games linked onto the interactive `src/views/Home.vue` page. Games currently available for use are in the `src/views/` directory. There are unused pages and game ideas in the `src/unused-views` directory.

When you want to **add a new game**, make sure to do the following:
- Add the page details to the `router.js`
- Add the game to the `progress` object in the `store.js`
- Add the same game details from the store.js to the `src/components/Settings.vue`
- Add an image and link the game on the `Home.vue` page

You can use one of the other games as a template to work off of.

This game also come with a scoreboard which can be run locally in parallel to record player scores: https://github.com/acpcreation/GameScoreBoard


## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```
The console output will indicate what port it's running on (it will smart select an available port).

### You may need to install Vue dependency for this to work
```
 npm install @vue/cli-service --save-dev
```

### Compiles and minifies for production
```
npm run build
```
This generates a `dist` folder.


### Lints and fixes files
```
npm run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).
