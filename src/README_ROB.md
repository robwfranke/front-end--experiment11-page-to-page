1.    npm install
2.    npm install react-hook-form --save
3.    npm install react-router-dom --save
4.    npm install axios --save
      npm install jwt-decode --save
      npm start
      
5.    Maak een nieuwe file in the root: .env (op dezelfde hoogte als de .gitignore en package.json)
5a.   open file .env, en zet daarin: REACT_APP_API_KEY=a95ffa740846f24a0d03465edc5e8294 (of een andere key)

      
6.    Maak een nieuwe file in the root:.env.dist (op dezelfde hoogte als de .gitignore en package.json)
6a.   open file, en zet daarin: REACT_APP_API_KEY=
      
7.    Voeg aan .gitignore /.idea toe
8.    Voeg aan .gitignore  .env  toe
      
9.    zet in filesettings Editor inspections goed
      
10.    Zet volgende in index.js      
     
    Router element index.js ipv in app. Deze zijn (wanneer dit in app.js blijft) alleen beschikbaar in de
    <Router></Router>
    en dan kun je usehistory e.d. niet gebruiken, deze staat buiten router element. Dus dan in index.js,
    dit is 1 niveau hoger.

import {BrowserRouter as Router} from 'react-router-dom';
import TempContextProvider from './context/TempContext';

    in de ReactDom.render (zie hieronder<>)

<Router>
              <App/>
</Router>


<TempContextProvider>
          <App />
</TempContextProvider>


    Daarmee zet je het router element om je hele applicatie!!!

11. npm build  (elke keer dat je iets veranderd in .env !!!!!)



A runnen met npm start
B bij problemen wil nog wel eens helpen: File invalidate caches
C npm build

Maak repository aan!!

- git init
maak in github nieuwe repository aan.

- git remote remove origin
- git remote add origin https://github.com/robwfranke/new_clone.git
- git add .
- git status
- git branch -a (local+remogit branch -a
- git commit -m "Start project"
- git push origin master
- check github
- git checkout -b branchname

- git branch --show-current

- git status
- git add .
- git commit -m "stap 1"
- git push origin branchname
- zie Stappenplan_GIT_Clonen en branchen.docx