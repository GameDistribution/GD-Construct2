# GD-Construct2
The repository containing the GameDistribution SDK for Construct 2 games. This allows you to display advertisements and other solutions available to games published within the GameDistribution network.

Welcome to the Gamedistribution.com HTML5 SDK for Construct 2 wiki!

## Important
11-12-2017 - **It should now be possible to minify and mangle your project. Please let us know if problems persist. Do make sure you download a new version of the SDK.**

## Support
Feel free to request for help by sending an email to our customer support at <a href="mailto:support@gamedistribution.com" target="_blank">support@gamedistribution.com</a>, when you're having trouble implementing the plugin. 

## Download
<a href="https://github.com/GameDistribution/GD-Construct2/archive/master.zip" target="_blank">Download the plugin</a> and extract the file to `C:\Program Files\Construct 2\exporters\html5\plugins`

## Settings
Select the new plugin within Construct 2 and insert your gameId and UserId. You can find these values within your Gamedistribution constrol panel after creating a new game.

![](http://www.gamedistribution.com/images/api/construct2/settings.jpg)

## Actions
![](http://www.gamedistribution.com/images/api/construct2/actions.jpg)

### Init SDK
Loads the Gamedistribution.com HTML5 SDK. Add this as soon as possible, as it is mandatory for calling any advertisements. **Only do this once!**			

### Show Banner
Calls an advertisement, you can call this whenever and as often as you want. Calling this will also invoke the pause game method.			

### Play (Deprecated)
Sends how many times 'PlayGame' is called. If you invoke 'PlayGame' many times, it increases 'PlayGame' counter and sends this counter value. 		

### Custom Log (Deprecated)
Sends how many times 'CustomLog' that is called related to given by _key name. If you invoke 
'CustomLog' many times, it increases 'CustomLog' counter and sends this counter value. 	

## Conditions & events
![](https://gamedistribution.com/images/api/construct2/conditions.jpg)

### Is showing banner ad
True if currently showing an advertisement.

### On SDK loaded
Called when the SDK is ready.

### On Error occurs
Called when an error has occured.

### On Resume game
Called when an advertisement is closed or not received.

### On Pause game
Called when an advertisement is received and ready to show.

## How to use & example

### Step 1
Double click the GRAY area.

![](http://www.gamedistribution.com/images/api/construct2/addplugin1.jpg)

### Step 2
Choose Vooxe Google Ads in Monetisation.

![](http://www.gamedistribution.com/images/api/construct2/addplugin2.jpg)

### Step 3
Click VooxeGoogleAds and insert your GameId and UserId .

![](http://www.gamedistribution.com/images/api/construct2/addplugin3.jpg)

### Step 4
Init SDK.

![](http://www.gamedistribution.com/images/api/construct2/addplugin4.jpg)

### Step 5
Add events for pause and resume game. You have to stop your game and mute all sound & music when you see an advertisement.

![](http://www.gamedistribution.com/images/api/construct2/addplugin5.jpg)

### Showing an advertisement
You can call this whenever and as often as you want. We will make sure to reject any premature calls.

![](http://www.gamedistribution.com/images/api/construct2/addplugin6.jpg)

### Pause & resume game
![](http://www.gamedistribution.com/images/api/construct2/addplugin7.jpg)

