angular.module("lojatotvs",["ngRoute","LocalStorageModule","ngCookies","ngSessionStorage"])
.config(function (localStorageServiceProvider)
{
    localStorageServiceProvider.setPrefix('lojatotvs');
    localStorageServiceProvider.setStorageType('localStorage');
})
