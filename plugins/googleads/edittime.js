function GetPluginSettings()
{
	return {
		"name":			"Vooxe Google Ads",
		"id":			"vooxe",
		"version":		"1.0",
		"description":	"Google ads for Vooxe",
		"author":		"Vooxe",
		"help url":		"http://www.gamedistribution.com/Api/",
		"category":		"Monetisation",
		"type":			"object",			// appears in layout
		"rotatable":	false,
		"flags":		pf_singleglobal
	};
};

AddCondition(0, 0, "Is showing banner ad", "Ads", "Is showing banner ad", "True if currently showing a banner ad.", "IsShowingBanner");
AddCondition(2, cf_trigger, "On Initiliaze ads", "Ads", "On Initiliaze ads", "Triggered when Vooxe ads system is ready.", "onInit");
AddCondition(3, cf_trigger, "On Error occurs", "Ads", "On Error occurs", "Triggered when an error occured.", "onError");
AddCondition(4, cf_trigger, "On Resume game", "Ads", "On Resume game", "Triggered when an banner closed or not recieved.", "onResumeGame");
AddCondition(5, cf_trigger, "On Pause game", "Ads", "On Pause game", "Triggered when banner ad is received and ready to show.", "onPauseGame");

// Actions
AddStringParam("Key Name", "Key for analytics");
AddAction(0, af_none, "Show Banner", "Ads", "Show banner with key <i>{0}</i> value", "Show a banner ad with given key on the screen while the game is running.", "ShowBanner");

AddAction(1, 0, "Play", "Ads", "Counts Play", "Counts how many times clicked play button", "PlayLog");

AddStringParam("Key Name", "Key for analytics");
AddAction(2, af_none, "Custom Log", "Ads", "Saves CustomLog with key <i>{0}</i> value", "Counts how many times custom action called", "CustomLog");

AddAction(3, 0, "Init API", "Ads", "Initiliaze ads system", "Loads Vooxe Html5 GdApi that hides the running game and display it when ready.", "InitAds");

ACESDone();

// Property grid properties for this plugin
var property_list = [	
	new cr.Property(ept_section,	"GD Account",	"",	"Account settings. You can get GameId and UserId from http://www.gamedistribution.com, register first to GD"),
	new cr.Property(ept_text,		"GameId",		"",	"Your Game Id, you can find it after upload a game to GameDistribution"),
	new cr.Property(ept_text,		"UserId",		"",	"Your UserId")
	];

// Called by IDE when a new object type is to be created
function CreateIDEObjectType()
{
	return new IDEObjectType();
};

// Class representing an object type in the IDE
function IDEObjectType()
{
	assert2(this instanceof arguments.callee, "Constructor called as a function");
};

// Called by IDE when a new object instance of this type is to be created
IDEObjectType.prototype.CreateInstance = function(instance)
{
	return new IDEInstance(instance);
};

// Class representing an individual instance of an object in the IDE
function IDEInstance(instance, type)
{
	assert2(this instanceof arguments.callee, "Constructor called as a function");

	// Save the constructor parameters
	this.instance = instance;
	this.type = type;

	// Set the default property values from the property table
	this.properties = {};

	for (var i = 0; i < property_list.length; i++)
		this.properties[property_list[i].name] = property_list[i].initial_value;

	// Plugin-specific variables
	this.just_inserted = false;
};

IDEInstance.prototype.OnCreate = function()
{
};

IDEInstance.prototype.OnInserted = function()
{
};

IDEInstance.prototype.OnDoubleClicked = function()
{
};

// Called by the IDE after a property has been changed
IDEInstance.prototype.OnPropertyChanged = function(property_name)
{
};

IDEInstance.prototype.OnRendererInit = function(renderer)
{
};

// Called to draw self in the editor
IDEInstance.prototype.Draw = function(renderer)
{
};

IDEInstance.prototype.OnRendererReleased = function(renderer)
{
};