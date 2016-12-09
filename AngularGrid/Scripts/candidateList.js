app = angular.module('myApp', ['ngGrid']);


app.factory('CandidateListService', function ($http, $q, $log, $rootScope) {



    var service = {
        data: {
            baseUrl: '/home/LoadCandidate',
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
                fields: ["CandidateID"],
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

            $http.get(service.data.baseUrl, { params: params })
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


    return service;
});


app.controller('CandidateController', function ($scope, CandidateListService, $routeParams, $log) {
    $scope.data = CandidateListService.data;

    $scope.$watch('data.sortOptions', function (newVal, oldVal) {
        $log.log("sortOptions changed: " + newVal);
        if (newVal !== oldVal) {
            $scope.data.pagingOptions.currentPage = 1;
            CandidateListService.find();
        }
    }, true);

    $scope.$watch('data.filterOptions', function (newVal, oldVal) {
        $log.log("filters changed: " + newVal);
        if (newVal !== oldVal) {
            $scope.data.pagingOptions.currentPage = 1;
            CandidateListService.find();
        }
    }, true);
    $scope.$watch('data.pagingOptions', function (newVal, oldVal) {
        $log.log("page changed: " + newVal);
        if (newVal !== oldVal) {
            CandidateListService.find();
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
                    { field: 'CandidateID', displayName: 'Candidate ID' },
                    { field: 'Prefix', displayName: 'Prefix' },
                    { field: 'FirstName', displayName: 'First Name' },
                    { field: 'MiddleName', displayName: 'Middle Name' },
                    { field: 'LastName', displayName: 'Last Name' },
                    { field: 'SSN', displayName: 'SSN' },
                    { field: 'Birthdate', displayName: 'Birth date' },
                    { field: 'Email', displayName: 'Email' },
                    { field: 'Relocation', displayName: 'Relocation' },
                    { field: 'AdditionalInfo', displayName: 'Additional Info' },


        ],
        afterSelectionChange: function (selection, event) {
            $log.log("selection: " + selection.entity.name);

        }
    };
});


