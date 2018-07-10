
# Flashcards App (iOS)
(This version has been tested and created for iOS platform - an Android version is under constuction and will be released in the near future 🏗 🔨 🤓 )

## Installing Nodejs, setting up the package manager and installing the dependencies

Running and using the app is very straight forward, just follow the instructions below.

First of all, make sure you have [Nodejs](https://nodejs.org/en/) installed. Right after that, you can go ahead and install either [Yarn](https://yarnpkg.com/en/docs/install) or [npm](https://docs.npmjs.com/getting-started/installing-node) , so feel free to pick whichever you prefer.

Clicking either the `Yarn` or the `npm` links above will lead you to the corresponding instructions to set up whichever package manager you've picked.

Once you've installed those, go to the project folder via command line (in your terminal app) :
```cd your/path/here/flashcards-app ```

Then, run the following commands depending on which package manager you want to use, either `npm` or `yarn` , let's start with `npm` :

## npm

Since there's a `package.json` file in the directory, you have to run `npm install`. `npm` will look at the dependencies that are listed in that file and download the latest versions.

Then, once it finish, you can run the command below:
`npm start`

This will display a QR code (you could scan the code and it will ask you to run the app in the [`Expo application`](https://expo.io/) ) , along with a list of options on how you could run the app, as shown below:

```
View your app with live reloading:

  Android device:
    -> Point the Expo app to the QR code above.
       (You'll find the QR scanner on the Projects tab of the app.)
  iOS device:
    -> Press s to email/text the app URL to your phone.
  Emulator:
    -> Press a (Android) or i (iOS) to start an emulator.

Your phone will need to be on the same local network as this computer.
For links to install the Expo app, please visit https://expo.io.

Logs from serving your app will appear here. Press Ctrl+C at any time to stop.

 › Press a to open Android device or emulator, or i to open iOS emulator.
 › Press s to send the app URL to your phone number or email address
 › Press q to display QR code.
 › Press r to restart packager, or R to restart packager and clear cache.
 › Press d to toggle development mode. (current mode: development)

```
  
## Yarn

We need to use something like we did above with `npm` , but with `yarn` this time, of course. In this case, you'll need to run [`yarn install`](https://yarnpkg.com/en/docs/cli/install) , which is used to install all dependencies for the project. The dependencies are retrieved from the project’s `package.json` file, and stored in the `yarn.lock` file.

And then, once the process finish, run this command:
``` yarn start ```

This will display a QR code (you could scan the code and it will ask you to run the app in the [`Expo application`](https://expo.io/) ) , along with a list of options on how you could run the app, as shown below:

```
View your app with live reloading:

  Android device:
    -> Point the Expo app to the QR code above.
       (You'll find the QR scanner on the Projects tab of the app.)
  iOS device:
    -> Press s to email/text the app URL to your phone.
  Emulator:
    -> Press a (Android) or i (iOS) to start an emulator.

Your phone will need to be on the same local network as this computer.
For links to install the Expo app, please visit https://expo.io.

Logs from serving your app will appear here. Press Ctrl+C at any time to stop.

 › Press a to open Android device or emulator, or i to open iOS emulator.
 › Press s to send the app URL to your phone number or email address
 › Press q to display QR code.
 › Press r to restart packager, or R to restart packager and clear cache.
 › Press d to toggle development mode. (current mode: development)

```

These steps mentioned above should do the trick so you can use the Web App! :thumbsup:

# HAVE FUN! 👨🏻‍💻