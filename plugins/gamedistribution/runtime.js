// ECMAScript 5 strict mode
"use strict";

assert2(cr, "cr namespace not created");
assert2(cr.plugins_, "cr.plugins_ not created");

/////////////////////////////////////
// Plugin class
cr.plugins_.GD_SDK = function(runtime) {
  this.runtime = runtime;
};

(function() {
  /////////////////////////////////////
  var pluginProto = cr.plugins_.GD_SDK.prototype;

  /////////////////////////////////////
  // Object type class
  pluginProto.Type = function(plugin) {
    this.plugin = plugin;
    this.runtime = plugin.runtime;
  };

  var typeProto = pluginProto.Type.prototype;

  // called on startup for each object type
  typeProto.onCreate = function() {};

  /////////////////////////////////////
  // Instance class
  pluginProto.Instance = function(type) {
    this.type = type;
    this.runtime = type.runtime;
    window["gdsdk"] = {};
    window["GD_OPTIONS"] = {};
  };

  var instanceProto = pluginProto.Instance.prototype;

  var isSupported = false;

  // called whenever an instance is created
  instanceProto.onCreate = function() {
    if (!window["gdsdk"] && !window["GD_OPTIONS"]) {
      cr.logexport(
        "[Construct 2] Gamedistribution.com SDK is required to show advertisements within Cordova; other platforms are not supported."
      );
      return;
    }

    isSupported = true;

    this.gdsdk = window["gdsdk"];

    // Attach events
    var self = this;

    this.gdsdk["onInit"] = function() {
      cr.logexport("Gamedistribution.com SDK: onInit");
      self.isShowingBannerAd = false;
      self.runtime.trigger(cr.plugins_.GD_SDK.prototype.cnds.onInit, self);
    };

    this.gdsdk["onError"] = function() {
      cr.logexport("Gamedistribution.com SDK: onError");
      self.isShowingBannerAd = true;
      self.runtime.trigger(cr.plugins_.GD_SDK.prototype.cnds.onError, self);
    };

    this.gdsdk["onResumeGame"] = function() {
      cr.logexport("Gamedistribution.com SDK: onResume");
      self.isShowingBannerAd = false;
      self.runtime.trigger(
        cr.plugins_.GD_SDK.prototype.cnds.onResumeGame,
        self
      );
    };

    this.gdsdk["onPauseGame"] = function() {
      cr.logexport("Gamedistribution.com SDK: onPauseGame");
      self.isShowingBannerAd = true;
      self.runtime.trigger(cr.plugins_.GD_SDK.prototype.cnds.onPauseGame, self);
    };

    this.gdsdk["onPreloadedAd"] = function() {
      cr.logexport("Gamedistribution.com SDK: onPreloadedAd");
      self.isShowingBannerAd = true;
      self.runtime.trigger(
        cr.plugins_.GD_SDK.prototype.cnds.onPreloadedAd,
        self
      );
    };

    // Init GdApi
    this.gdsdk["InitAds"] = function() {
      window["GD_OPTIONS"] = {
        gameId: self.properties[0],
        // userId: self.properties[1],
        advertisementSettings: {
          autoplay: false
        },
        onEvent: function(event) {
          switch (event.name) {
            case "SDK_GAME_START":
              self.gdsdk["onResumeGame"]();
              break;
            case "SDK_GAME_PAUSE":
              self.gdsdk["onPauseGame"]();
              break;
            case "SDK_READY":
              self.gdsdk["onInit"]();
              break;
            case "SDK_ERROR":
              self.gdsdk["onError"]();
              break;
          }
        }
      };
      (function(d, s, id) {
        var js,
          fjs = d.getElementsByTagName(s)[0];
        if (d.getElementById(id)) return;
        js = d.createElement(s);
        js.id = id;
        js.src = "//html5.api.gamedistribution.com/main.min.js";
        fjs.parentNode.insertBefore(js, fjs);
      })(document, "script", "gamedistribution-jssdk");
    };
  };

  //////////////////////////////////////
  // Conditions
  function Cnds() {}

  Cnds.prototype.IsShowingBanner = function() {
    return this.isShowingBannerAd;
  };

  Cnds.prototype.onInit = function() {
    return true;
  };

  Cnds.prototype.onError = function(data) {
    return true;
  };

  Cnds.prototype.onResumeGame = function(data) {
    return true;
  };

  Cnds.prototype.onPauseGame = function(data) {
    return true;
  };

  Cnds.prototype.onPreloadedAd = function(data) {
    return true;
  };

  pluginProto.cnds = new Cnds();

  //////////////////////////////////////
  // Actions
  function Acts() {}

  Acts.prototype.ShowAd = function() {
    if (!isSupported) return;

    if (typeof window["gdsdk"]["showAd"] === "undefined") {
      cr.logexport(
        "Gamedistribution.com SDK is not loaded or an ad blocker is present."
      );
      this.gdsdk["onResumeGame"]();
      return;
    }

    window["gdsdk"]["showAd"]();
    cr.logexport("ShowAd");

    this.isShowingBannerAd = true;
  };

  Acts.prototype.ShowRewardedAd = function() {
    if (!isSupported) return;

    if (typeof window["gdsdk"]["showAd"] === "undefined") {
      cr.logexport(
        "Gamedistribution.com SDK is not loaded or an ad blocker is present."
      );
      this.gdsdk["onResumeGame"]();
      return;
    }

    window["gdsdk"]["showAd"]("rewarded");
    cr.logexport("ShowRewardedAd");

    this.isShowingBannerAd = true;
  };

  Acts.prototype.PreloadRewardedAd = function() {
    if (!isSupported) return;

    if (typeof window["gdsdk"]["preloadAd"] === "undefined") {
      cr.logexport(
        "Gamedistribution.com SDK is not loaded or an ad blocker is present."
      );
      this.gdsdk["onResumeGame"]();
      return;
    }

    window["gdsdk"]
      ["preloadAd"]("rewarded")
      .then(() => {
        this.gdsdk["onPreloadedAd"]();
      })
      .catch(error => {
        //this.gdsdk["onError"]();
        this.gdsdk["onResumeGame"]();
      });
    cr.logexport("PreloadRewardedAd");

    this.isShowingBannerAd = false;
  };

  Acts.prototype.PlayLog = function() {
    if (!isSupported) return;

    // if (typeof window["gdsdk"]["play"] === "undefined") {
    //   cr.logexport("Gamedistribution.com SDK is not loaded.");
    //   this.gdsdk["onResumeGame"]();
    //   return;
    // }

    // window["gdsdk"]["play"]();
  };

  Acts.prototype.CustomLog = function() {
    if (!isSupported) return;

    // if (typeof window["gdsdk"]["customLog"] === "undefined") {
    //   cr.logexport("Gamedistribution.com SDK is not loaded.");
    //   this.gdsdk["onResumeGame"]();
    //   return;
    // }

    // window["gdsdk"]["customLog"]();
  };

  Acts.prototype.InitAds = function() {
    if (!isSupported) return;

    this.gdsdk["InitAds"]();
  };

  pluginProto.acts = new Acts();

  //////////////////////////////////////
  // Expressions
  function Exps() {}

  pluginProto.exps = new Exps();
})();
