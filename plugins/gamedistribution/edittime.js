function GetPluginSettings() {
  return {
    name: "Gamedistribution Ads",
    id: "GD_SDK",
    version: "1.1",
    description: "Gamedistribution.com Construct 2 SDK",
    author: "Gamedistribution",
    "help url": "https://github.com/GameDistribution/GD-Construct2/wiki",
    category: "Monetisation",
    type: "object", // appears in layout
    rotatable: false,
    flags: pf_singleglobal
  };
}

AddCondition(
  0,
  0,
  "Is showing banner ad",
  "Ads",
  "Is showing an advertisement",
  "True if currently showing an advertisement.",
  "IsShowingBanner"
);
AddCondition(
  2,
  cf_trigger,
  "On SDK loaded",
  "Ads",
  "On SDK loaded",
  "Called when the SDK is ready.",
  "onInit"
);
AddCondition(
  3,
  cf_trigger,
  "On Error occurs",
  "Ads",
  "On Error",
  "Called when an error has occured.",
  "onError"
);
AddCondition(
  4,
  cf_trigger,
  "On Resume game",
  "Ads",
  "On resume game",
  "Called when an advertisement is closed or not received.",
  "onResumeGame"
);
AddCondition(
  5,
  cf_trigger,
  "On Pause game",
  "Ads",
  "On pause game",
  "Called when an advertisement is received and ready to show.",
  "onPauseGame"
);
AddCondition(
  6,
  cf_trigger,
  "On Rewarded Ad preloaded",
  "Ads",
  "On preloaded ad",
  "Called when a rewarded ad preloaded",
  "onPreloadedAd"
);

// Actions
AddStringParam("Key Name", "Key for analytics");
AddAction(
  0,
  af_none,
  "Show Ad",
  "Ads",
  "Show an advertisement.",
  "Show an advertisement.",
  "ShowAd"
);

AddAction(
  1,
  0,
  "Play",
  "Ads",
  "Counts Play",
  "Counts how many times the play button has been clicked.",
  "PlayLog"
);

AddStringParam("Key Name", "Key for analytics");
AddAction(
  2,
  af_none,
  "Custom Log",
  "Ads",
  "Saves CustomLog with key <i>{0}</i> value",
  "Counts how many times a custom action called",
  "CustomLog"
);

AddAction(
  3,
  0,
  "Init SDK",
  "Ads",
  "Load the SDK",
  "Loads the Gamedistribution.com HTML5 SDK for showing advertisements.",
  "InitAds"
);

AddAction(
  4,
  af_none,
  "Show Rewarded Ad",
  "Ads",
  "Show a rewarded advertisement.",
  "Show a rewarded advertisement.",
  "ShowRewardedAd"
);

AddAction(
  5,
  af_none,
  "Preload a Rewarded Ad",
  "Ads",
  "Preload a rewarded advertisement.",
  "Preload a rewarded advertisement.",
  "PreloadRewardedAd"
);

ACESDone();

// Property grid properties for this plugin
var property_list = [
  new cr.Property(
    ept_section,
    "GD Account",
    "",
    "Account settings. You can get your GameId and UserId from https://gamedistribution.com."
  ),
  new cr.Property(
    ept_text,
    "GameId",
    "",
    "Your GameId, you can find it after uploading a game to Gamedistribution.com."
  )
  // new cr.Property(ept_text,		"UserId",		"",	"Your UserId, you can find it after uploading a game to Gamedistribution.com.")
];

// Called by IDE when a new object type is to be created
function CreateIDEObjectType() {
  return new IDEObjectType();
}

// Class representing an object type in the IDE
function IDEObjectType() {
  assert2(this instanceof arguments.callee, "Constructor called as a function");
}

// Called by IDE when a new object instance of this type is to be created
IDEObjectType.prototype.CreateInstance = function(instance) {
  return new IDEInstance(instance);
};

// Class representing an individual instance of an object in the IDE
function IDEInstance(instance, type) {
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
}

IDEInstance.prototype.OnCreate = function() {};

IDEInstance.prototype.OnInserted = function() {};

IDEInstance.prototype.OnDoubleClicked = function() {};

// Called by the IDE after a property has been changed
IDEInstance.prototype.OnPropertyChanged = function(property_name) {};

IDEInstance.prototype.OnRendererInit = function(renderer) {};

// Called to draw self in the editor
IDEInstance.prototype.Draw = function(renderer) {};

IDEInstance.prototype.OnRendererReleased = function(renderer) {};
