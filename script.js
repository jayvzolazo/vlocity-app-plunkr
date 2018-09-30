// Code goes here
'use strict';

var app = angular.module('VlocityApp', []);

app.controller('PeopleController', function ($scope, $http) {
  $scope.list = null;
  $scope.selectedPerson = null;
  $scope.personRatings = [];

  $scope.tabs = {
    about: true,
    likes: false,
    dislikes: false
  };

  $scope.setPerson = function (index) {
    $scope.selectedPerson = $scope.list.People[index];

    $scope.setTab('about');

    setRatings($scope.selectedPerson.rating);
  };

  $scope.setTab = function (tab) {
    resetTabs();

    $scope.tabs[tab] = true;
  };

  function resetTabs () {
    angular.forEach($scope.tabs, function (val, key) {
      $scope.tabs[key] = false;
    });
  }

  function getPeople () {
    $http.get('people.json').success(function (data) {
      $scope.list = data;

      $scope.setPerson(0);
    });
  }

  function setRatings(rating) {
    var ratingLen = 5;
    var ratings = [];
    var count = 1;

    while (count <= rating) {
      ratings.push(count);
      count++
    }

    if (ratings.length < ratingLen) {
      var diff = ratingLen - ratings.length;

      for (var i = 0; i < diff; i++) {
        ratings.push(0);
      }
    }

    $scope.personRatings = ratings;

    console.log(ratings);
  }

  function init () {
    getPeople();
  }

  init();
});
