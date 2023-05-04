README File for Tingle Dating Application in React Native.

react-native-cli: 2.0.1
react-native: 0.70.6

Backend API: https://github.com/jakubpitula/dating_app_api


Quick Usage instructions: 
==========================
Application only runs on Android OS at this current time, if you dont 
have access to a physcial android device you can set up an android emulator 
on your PC. Follow the instructions here to install "Android Studio":

 Required installs before setting up emulator: 
    -Node.js (recommended you use Chocolatey Package manager) https://chocolatey.org/
    -Java SE Development Kit 17.0.7 (SDK) https://www.oracle.com/java/technologies/downloads/#java17
    
Setting up the development environment for React Native CLI project:
https://reactnative.dev/docs/environment-setup 


Steps: 
1. Make sure you have a compatible android device or emulator 

Physical device: 
2. Simply download the APK file we will provide in the zip file and run on your device

Emulator: 
2. Simply, start your android emulator as shown in the enviroment set up page above.
3. Once your emulator has loaded up, simply drag the APK file onto the homescreen of the emulator and it should begin to install. 
4. Once the APK file has finished installing, simply click on it and begin to use. (the location of the app might be hidden so on 
the homescreen swipe "up" and you should be able to see it. 

Optional: 
If you want to run the app manually and compile it on you local machine using the emulator, follow these steps:
    
    
1. Make sure you have a working emulator on your PC
2.In the project home directory (Example: C:\Users\YourName\downloads\tingle\>) install the required dependencies using the command: npm install 
3. Once the dependencies are installed, simply run this command to compile the app and run it in the emulator: npm run android


