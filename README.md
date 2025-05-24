# Project 10: WTWR (What to Wear)

# Overview

- Intro 
- Figma
- Images
- Page
- Improvements
- Video

*Intro*

WTWR is a weather tracking web app that will suggest what should be worn depending on the current tempature. The call to the https://openweathermap.org/ API using (currently hard coded) longitude and laditude. The app then gathers needed information from the API (location, tempature, condition) and displays the city, tempature, and shows a banner with the current condition (right now limited to clear, raining, snowing, cloudy, and lightning (thunderstorm)). Using the tempature, the app then displays clothing approperate for outdoor use. 

If the user clicks on the clothing a popup showing an enlarged image of the clothing along with a brief description. Here the user can also choose to delete the item, with a verification modal. The 'Add Clothes' button opens a popup where the user can add clothing.

New users can create an account with a unique email address. And provide an avatar, if no avatar, 'avatar image' is the user's first initial of their first name. This is also, only when they user can add clothing items. 

The user can also log out. 

If a non-registered 'user' attempts to view a profile page, or clothing items, will direct them to create an account. 

*Figma*

- [Link to the project on Figma](https://www.figma.com/design/F03bTb81Pw8IDPj5Y9rc5i/Sprint-10-%7C-WTWR?node-id=311-433&p=f&t=70ifSUnNSLGFJCva-0)

*Images*

This project was created with HTML, CSS, JS, and React. With the visual being from Figma. 

*GitHub*
- [Link to GitHub Project](https://github.com/HTMLGitHub/se_project_react) ***Front End***
- [Link to GitHub Project](https://github.com/HTMLGitHub/se_project_express) ***Back End***

## Improvements

Basic improvement will be adding clothing via the popup created. Perhaps adding additional functionality to allow for all weather conditions (brought in via API) to display in the banner. Also, have a profile editing, to change the image and name, as well as the location of the user. 

## Video

Will be created later
