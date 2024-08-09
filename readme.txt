
username: guest@exam.no
password: Frontend!

A continuation of my portfolio page. I have integrated firebase and login, and pretty much improved and updated all the code. In order to add videos with the button on the bottom of the page you need to log in otherwise the button is not there. I chose not to add a "sign-up" feature as there is no need for anyone but me to have acces to add films. 

The way you add them is a bit specific, firebase only stores the embed-url and title, date etc. for each vimeo link. In order to fetch one, you need to go to www.vimeo.com  click a video and hit embed and copy the embed-link. You can copy the whole thing as the SRC is extracted with a regex. 
for example 

<div style="padding:56.25% 0 0 0;position:relative;"><iframe src="https://player.vimeo.com/video/771542986?title=0&amp;byline=0&amp;portrait=0&amp;badge=0&amp;autopause=0&amp;player_id=0&amp;app_id=58479" frameborder="0" allow="autoplay; fullscreen; picture-in-picture; clipboard-write" style="position:absolute;top:0;left:0;width:100%;height:100%;" title="Hva er i Safen - Pimp Lotion (2019)"></iframe></div><script src="https://player.vimeo.com/api/player.js"></script>
Title: Egon Lotion
Year: October 2019
No Agency

The login validation checks for existing user, password and that email is the correct format. 
The Add button validation checks for values of each field, but there is sadly no way to validate the src link before adding. 

A logged in user can delete videos from the dataset by pressing "delete" in the top right corner of each film. 

Firebase project:
https://console.firebase.google.com/u/0/project/film-portfolio-fae54/overview

Netlify-link:
https://nawportfolio.netlify.app/

Github-link:
https://github.com/Nicolai-Astrup-Wiik/final_project.git

resources:
Fancy button:
https://codepen.io/mortezasharifinia/pen/QWxmEWW
Menu icon: 
https://www.flaticon.com/free-icon-font/rectangle-list_10742286?term=menu&related_id=10742286

font: 
https://fonts.google.com/specimen/Audiowide


