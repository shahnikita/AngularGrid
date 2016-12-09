app = angular.module('myApp', ['ngGrid']);


app.factory('EmployeeService', function ($http, $q, $log, $rootScope) {

    var baseUrl = '/home/LoadJsonData';

    var service = {
        data: {
            currentContent: {},
            Content: [],
            selected: [],
            totalPages: 0,
            totalRecords: 0,
            filterOptions: {
                filterText: '',
                externalFilter: 'searchText',
                useExternalFilter: true
            },
            sortOptions: {
                fields: ["MultipleSelectionID"],
                directions: ["desc"]
            },
            pagingOptions: {

                pageSizes: [10, 20, 50, 100],
                pageSize: 10,
                currentPage: 1
            }
        },

        find: function () {
            var params = {
                searchtext: service.data.filterOptions.filterText,
                page: service.data.pagingOptions.currentPage,
                pageSize: service.data.pagingOptions.pageSize,
                sortBy: service.data.sortOptions.fields[0],
                sortDirection: service.data.sortOptions.directions[0]
            };

            var deferred = $q.defer();
            $http.get(baseUrl, { params: params })
            .success(function (data) {
                service.data.Content = data.Content;
                service.data.totalRecords = data.TotalRecords;
               // deferred.resolve(data);
            }).error(function () {
                deferred.reject();
            });
            return deferred.promise;
        }
    }

   // service.find();
    return service;
});


app.controller('MyCtrl', function ($scope, EmployeeService, $routeParams, $log) {
    $scope.data = EmployeeService.data;

    $scope.$watch('data.sortOptions', function (newVal, oldVal) {
        $log.log("sortOptions changed: " + newVal);
        if (newVal !== oldVal) {
            $scope.data.pagingOptions.currentPage = 1;
            EmployeeService.find();
        }
    }, true);

    $scope.$watch('data.filterOptions', function (newVal, oldVal) {
        $log.log("filters changed: " + newVal);
        if (newVal !== oldVal) {
            $scope.data.pagingOptions.currentPage = 1;
            EmployeeService.find();
        }
    }, true);
    $scope.$watch('data.pagingOptions', function (newVal, oldVal) {
        $log.log("page changed: " + newVal);
        if (newVal !== oldVal) {
            EmployeeService.find();
        }
    }, true);

   


    $scope.gridOptions = {
        data: 'data.Content',
        showFilter: false,
        multiSelect: true,
        selectedItems: $scope.data.selected,
        enablePaging: true,
        showFooter: true,
        totalServerItems: 'data.totalRecords',
        pagingOptions: $scope.data.pagingOptions,
        filterOptions: $scope.data.filterOptions,
        useExternalSorting: true,
        sortInfo: $scope.data.sortOptions,
      
        columnDefs: [
                    { field: 'MultipleSelectionID', displayName: 'MultipleSelectionID' },
                    { field: 'ActionTaken', displayName: 'ActionTaken' },
                    { field: 'UserID', displayName: 'UserID' },
                    { field: 'SelectionID', displayName: 'SelectionID' },
                    { field: 'ActionTakenDate', displayName: 'ActionTakenDate' }
                    
        ],
        afterSelectionChange: function (selection, event) {
            $log.log("selection: " + selection.entity.name);
            // $location.path("comments/" + selection.entity.commentId);
        }
    };
});








//app.controller('MyCtrl', function ($scope, EmployeeService, $routeParams, $log) {
//    $scope.filterOptions = {
//        filterText: "",
//        useExternalFilter: true
//    };
//    $scope.totalServerItems = 0;

//    $scope.data = {
//            currentcustomer: {},
//            customers: [],
//            selected:[],
//            totalPages: 0,

//            filterOptions: {
//            filterText: '',
//            externalFilter: 'searchText',
//            useExternalFilter: true
//            },
//        sortOptions: {
//            fields: ["CustomerID"],
//            directions: ["desc"]
//        },
//        pagingOptions: {
//            pageSizes: [10, 20, 50, 100],
//            pageSize: 10,
//            currentPage: 1
//        }
//    }

//    $scope.pagingOptions = {
//        pageSizes: [2, 5, 10],
//        pageSize: 2,
//        currentPage: 1
//    };
//    $scope.setPagingData = function (data, page, pageSize) {
//        var pagedData = data.slice((page - 1) * pageSize, page * pageSize);
//        $scope.myData = pagedData;
//        $scope.totalServerItems = data.length;
//        if (!$scope.$$phase) {
//            $scope.$apply();
//        }
//    };
//    $scope.getPagedDataAsync = function (pageSize, page, searchText) {
//        setTimeout(function () {
//            var data;
//            if (searchText) {
//                var ft = searchText.toLowerCase();
//                $http.get('http://localhost:58723/largeLoad.json').success(function (largeLoad) {
//                    data = largeLoad.filter(function (item) {
//                        return JSON.stringify(item).toLowerCase().indexOf(ft) != -1;
//                    });
//                    $scope.setPagingData(data, page, pageSize);
//                });
//            } else {
//                $http.get('http://localhost:58723/Home/LoadJson').success(function (largeLoad) {
//                    $scope.setPagingData(largeLoad, page, pageSize);
//                });
//            }
//        }, 100);
//    };

//    $scope.getPagedDataAsync($scope.pagingOptions.pageSize, $scope.pagingOptions.currentPage);

//    $scope.$watch('pagingOptions', function (newVal, oldVal) {
//        if (newVal !== oldVal) {
//            $scope.getPagedDataAsync($scope.pagingOptions.pageSize, $scope.pagingOptions.currentPage, $scope.filterOptions.filterText);
//        }
//    }, true);
//    $scope.$watch('filterOptions', function (newVal, oldVal) {
//        if (newVal !== oldVal) {
//            $scope.getPagedDataAsync($scope.pagingOptions.pageSize, $scope.pagingOptions.currentPage, $scope.filterOptions.filterText);
//        }
//    }, true);

//    $scope.gridOptions = {
//        data: 'myData',
//        enablePaging: true,
//        enablePinning: true,
//        showFooter: true,
//        totalServerItems: 'totalServerItems',
//        pagingOptions: $scope.pagingOptions,
//        filterOptions: $scope.filterOptions,
       
       
//        columnDefs: [{ field: 'name', displayName: 'Name'},
//                     { field: 'allowance', displayName: 'Allowance' },
//         { field: 'paid', displayName: 'Paid' }]
//    };

    
//});