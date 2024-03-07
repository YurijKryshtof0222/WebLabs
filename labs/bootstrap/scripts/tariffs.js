angular.module('myApp', []).controller('userCtrl', function ($scope) {
        $scope.idCounter = 4 
        $scope.tariffs = [
            {id: 1, policyName: 'Basic', coverageType: "Liability", premiumCost: 50, deductible: 250, discounts: "Student, Bundling", additionalBenefits: "None"},
            {id: 2, policyName: 'Ultimate', coverageType: "Full Coverage", premiumCost: 150, deductible: 1050, discounts: "Safe Driver, Multi-Car", additionalBenefits: "Accident Forgiveness"},
            {id: 3, policyName: 'Plus', coverageType: "Liability", premiumCost: 80, deductible: 500, discounts: "Defensive Driving", additionalBenefits: "Claims Support"},
            {id: 4, policyName: 'Platinum', coverageType: "Full Coverage", premiumCost: 1200, deductible: 1500, discounts: "Safe Driver, Multi-Policy", additionalBenefits: "Roadside Assistance, Rental Car Coverage"},
        ];
        $scope.carBrands = [
            "Audi","BMW","Volkswagen","Mercedes-Benz","Other"
        ];
        $scope.defaultCarBrand = "Audi";

        $scope.hideTariffEditorForm = true;
        $scope.hideChooseTariffForm = true;
        $scope.showErrorMessage = false;
    
        $scope.editTariff = function (id) {
            $scope.hideTariffEditorForm = false;
            $scope.hideChooseTariffForm = true;
            if (id == 'new') {
                $scope.edit = true;
                $scope.policyName = '';
                $scope.coverageType = '';
                $scope.premiumCost = '';
                $scope.deductible = '';
                $scope.discounts = '';
                $scope.additionalBenefits = '';
            } else {
                $scope.edit = false;
                $scope.index = id - 1;
                $scope.policyName = $scope.tariffs[$scope.index].policyName;
                $scope.coverageType = $scope.tariffs[$scope.index].coverageType;
                $scope.premiumCost = $scope.tariffs[$scope.index].premiumCost;
                $scope.deductible = $scope.tariffs[$scope.index].deductible;
                $scope.discounts = $scope.tariffs[$scope.index].discounts;
                $scope.additionalBenefits = $scope.tariffs[$scope.index].additionalBenefits;
            }
        };
    
        $scope.saveTariff = function () {
            if ($scope.edit == true) {
                if ($scope.allTariffFieldsAreFilledCorrectly()) {
                    $scope.LENGTH = $scope.tariffs.length;
                    $scope.tariffs.push({
                        id: $scope.LENGTH + 1,
                        policyName: $scope.policyName,
                        coverageType: $scope.coverageType,
                        premiumCost: $scope.premiumCost,
                        deductible: $scope.deductible,
                        discounts: $scope.discounts,
                        additionalBenefits: $scope.additionalBenefits
                    });
                } else {
                    // alert("Please fill correct values in all fields before saving.");
                    $scope.showErrorMessage = true
                    return;
                }
            } else {
                $scope.tariffs[$scope.index].policyName = $scope.policyName;
                $scope.tariffs[$scope.index].coverageType = $scope.coverageType;
                $scope.tariffs[$scope.index].premiumCost = $scope.premiumCost;
                $scope.tariffs[$scope.index].deductible = $scope.deductible;
                $scope.tariffs[$scope.index].discounts = $scope.discounts;
                $scope.tariffs[$scope.index].additionalBenefits = $scope.additionalBenefits;
            }
        };

        $scope.clientName = '';
        $scope.phoneNumber = '';
        $scope.email = '';
        $scope.carBrand = '';
        $scope.carModel = '';
        $scope.selectedTariff = '';
    
        $scope.allFieldsAreFilled = function() {
            return $scope.clientName && $scope.phoneNumber && $scope.email && $scope.carBrand && $scope.carModel && $scope.selectedTariff;
        };

        $scope.requestTariff = function() {
            $scope.hideChooseTariffForm = false;
            $scope.hideTariffEditorForm = true;
        };
    
        $scope.sendData = function() {
            if ($scope.allUserFieldsAreFilledCorrectly()) {
                // $scope.hideChooseTariffForm = true;
                $scope.clientName = '';
                $scope.phoneNumber = '';
                $scope.email = '';
                $scope.carModel = '';

                alert("The tariff request was sended suceessfully!");
                $scope.hideChooseTariffForm = true;
            } else {
                // alert("Please fill all required fields before sending.");
                $scope.showErrorMessage = true
            }
        };
    
        $scope.hideForm = function() {
            $scope.hideChooseTariffForm = true;
        };
    
        $scope.allTariffFieldsAreFilledCorrectly = function() {
            return  $scope.isValidText($scope.policyName)   && !$scope.containsNumbers($scope.policyName)
                &&  $scope.isValidText($scope.coverageType) && !$scope.containsNumbers($scope.coverageType)
                &&  $scope.isValidText($scope.premiumCost)  && $scope.premiumCost > 0
                &&  $scope.isValidText($scope.deductible)   && $scope.deductible > 0
                &&  $scope.isValidText($scope.discounts)    && !$scope.containsNumbers($scope.policyName)
                &&  $scope.isValidText($scope.additionalBenefits) 
                && !$scope.containsNumbers($scope.additionalBenefits)
        };

        $scope.allUserFieldsAreFilledCorrectly = function() {
            return $scope.isValidClientName($scope.clientName)
                && $scope.isValidPhoneNumber($scope.phoneNumber)
                && $scope.isValidEmail($scope.email)
                && $scope.isValidText($scope.carModel)
        };

        $scope.isValidText = function(value) {
            string = new String(value)
            return string && string.length >= 2 && string.trim() !== '';
        };
    
        $scope.containsNumbers = function(value) {
            return value == 0 || /\d/.test(value);        
        };

        $scope.isValidClientName = function(value) {
            return $scope.isValidText(value) && new String(value).length >= 5 && !$scope.containsNumbers(value);
        };

        $scope.isValidPhoneNumber = function(value) {
            var regex = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im;
            return regex.test(value);
        };

        $scope.isValidEmail = function(value) {
            var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            return emailRegex.test(value);
        };

    });

angular.module('myApp').filter('orderByPremium', function() {
    return function(input) {
        if (!angular.isArray(input)) return input;
        
        return input.slice().sort(function(a, b) {
            return -(a.premiumCost - b.premiumCost);
        });
    };
});

