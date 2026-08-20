(function () {
  var supported = ["en", "it"];
  var fallback = "en";
  var preferred = (navigator.language || fallback).slice(0, 2).toLowerCase();
  var target = supported.indexOf(preferred) === -1 ? fallback : preferred;
  window.location.replace("/" + target + "/");
})();
