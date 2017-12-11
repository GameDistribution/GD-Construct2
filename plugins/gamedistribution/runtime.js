// ECMAScript 5 strict mode
"use strict";

assert2(cr, "cr namespace not created");
assert2(cr.plugins_, "cr.plugins_ not created");

/////////////////////////////////////
// Plugin class
cr.plugins_.vooxe = function(runtime)
{
	this.runtime = runtime;
};

(function ()
{
	/////////////////////////////////////
	var pluginProto = cr.plugins_.vooxe.prototype;

	/////////////////////////////////////
	// Object type class
	pluginProto.Type = function(plugin)
	{
		this.plugin = plugin;
		this.runtime = plugin.runtime;
	};

	var typeProto = pluginProto.Type.prototype;

	// called on startup for each object type
	typeProto.onCreate = function()
	{
	};

	/////////////////////////////////////
	// Instance class
	pluginProto.Instance = function(type)
	{
		this.type = type;
		this.runtime = type.runtime;
		window["vooxe"]={};
		window["GD_OPTIONS"]={};
	};

	var instanceProto = pluginProto.Instance.prototype;
	
	var isSupported = false;

	// called whenever an instance is created
	instanceProto.onCreate = function()
	{		
		if (!window["vooxe"] && !window["GD_OPTIONS"])
		{
			cr.logexport("[Construct 2] Gamedistribution.com SDK is required to show googleads ads with Cordova; other platforms are not supported");
			return;
		}		
		
		isSupported = true;
		
		this.vooxe = window["vooxe"];

		// Attach events
		var self = this;
		
		this.vooxe["onInit"] = function (data)
		{
			cr.logexport(data.Msg);
			self.isShowingBannerAd = false;
			self.runtime.trigger(cr.plugins_.vooxe.prototype.cnds.onInit, self);
		};
		
		this.vooxe["onError"] = function (data)
		{
			cr.logexport("Gamedistribution.com SDK onError: "+data);
			self.isShowingBannerAd = true;
			self.runtime.trigger(cr.plugins_.vooxe.prototype.cnds.onError, self);
		};
		
		this.vooxe["onResumeGame"] = function ()
		{
			cr.logexport("Gamedistribution.com SDK: onResume");
			self.isShowingBannerAd = false;
			self.runtime.trigger(cr.plugins_.vooxe.prototype.cnds.onResumeGame, self);
		};
		
		this.vooxe["onPauseGame"] = function ()
		{
			cr.logexport("Gamedistribution.com SDK: onPauseGame");
			self.isShowingBannerAd = true;
			self.runtime.trigger(cr.plugins_.vooxe.prototype.cnds.onPauseGame, self);
		};

		// Init GdApi
		this.vooxe["InitAds"] = function ()
		{
            window["GD_OPTIONS"] = {
                "gameId": self.properties[0],
                "userId": self.properties[1],
                "advertisementSettings": {
                    "autoplay": false
                },
                "onEvent": function(event) {
                    switch (event.name) {
                        case "SDK_GAME_START":
                            self.vooxe["onResumeGame"]();
                            break;
                        case "SDK_GAME_PAUSE":
                            self.vooxe["onPauseGame"]();
                            break;
                        case "SDK_READY":
                            self.vooxe["onInit"]();
                            break;
                        case "SDK_ERROR":
                            self.vooxe["onError"]();
                            break;
                    }
                }
            };
            (function(d, s, id) {
                var js, fjs = d.getElementsByTagName(s)[0];
                if (d.getElementById(id)) return;
                js = d.createElement(s);
                js.id = id;
                js.src = '//html5.api.gamedistribution.com/main.min.js';
                fjs.parentNode.insertBefore(js, fjs);
            }(document, 'script', 'gamedistribution-jssdk'));
		}

	};
	
	
	//////////////////////////////////////
	// Conditions
	function Cnds() {};

	Cnds.prototype.IsShowingBanner = function()
	{
		return this.isShowingBannerAd;
	};
	
	Cnds.prototype.onInit = function()
	{
		return true;
	};
	
	Cnds.prototype.onError = function(data)
	{
		return true;
	};
	
	Cnds.prototype.onResumeGame = function(data)
	{
		return true;
	};
	
	Cnds.prototype.onPauseGame = function(data)
	{
		return true;
	};

	pluginProto.cnds = new Cnds();

	//////////////////////////////////////
	// Actions
	function Acts() {};

	Acts.prototype.ShowBanner = function ()
	{
		if (!isSupported) return;
		
		if (typeof (window["gdsdk"]["showBanner"]) === "undefined")
		{
			cr.logexport("Gamedistribution.com SDK is not loaded or an ad blocker is present.");
			this.vooxe["onResumeGame"]();
			return;
		}

        window["gdsdk"]["showBanner"]();
		cr.logexport("ShowBanner");
		
		this.isShowingBannerAd = true;
	};

	Acts.prototype.PlayLog = function ()
	{
		if (!isSupported) return;

		if (typeof (window["gdsdk"]["play"]) === "undefined")
		{
			cr.logexport("Vooxe Googleads Plugin is not initiliazed.");
			this.vooxe["onResumeGame"]();
			return;
		}

        window['gdsdk']["play"]();
	};

	Acts.prototype.CustomLog = function ()
	{
		if (!isSupported) return;

		if (typeof (window['gdsdk']["customLog"]) === "undefined")
		{
			cr.logexport("Vooxe Googleads Plugin is not initiliazed.");
			this.vooxe["onResumeGame"]();
			return;
		}

        window['gdsdk']["customLog"]();
	};

	Acts.prototype.InitAds = function ()
	{
		if (!isSupported) return;

		this.vooxe["InitAds"]();
	};
	
	pluginProto.acts = new Acts();

	//////////////////////////////////////
	// Expressions
	function Exps() {};

	pluginProto.exps = new Exps();

}());