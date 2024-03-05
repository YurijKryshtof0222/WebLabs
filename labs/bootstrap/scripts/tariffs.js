angular.module('myApp', []).controller('userCtrl', function ($scope) {
        $scope.idCounter = 4 
        $scope.tariffs = [
            {id: 1, policyName: 'Basic', coverageType: "Liability", premiumCost: 50, deductible: 250, discounts: "Student, Bundling", additionalBenefits: "None"},
            {id: 2, policyName: 'Ultimate', coverageType: "Full Coverage", premiumCost: 150, deductible: 1050, discounts: "Safe Driver, Multi-Car", additionalBenefits: "Accident Forgiveness"},
            {id: 3, policyName: 'Plus', coverageType: "Liability", premiumCost: 80, deductible: 500, discounts: "Defensive Driving", additionalBenefits: "24/7 Claims Support"},
            {id: 4, policyName: 'Platinum', coverageType: "Full Coverage", premiumCost: 1200, deductible: 1500, discounts: "Safe Driver, Multi-Policy", additionalBenefits: "Roadside Assistance, Rental Car Coverage"},
        ];
        $scope.hideform = true;
    
        $scope.editUser = function (id) {
            $scope.hideform = false;
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
    
        $scope.saveUser = function () {
            $scope.hideform = false;
            if ($scope.edit == true) {
                // Перевірка чи всі необхідні поля заповнені
                if ($scope.policyName && $scope.coverageType && $scope.premiumCost && $scope.deductible && $scope.discounts && $scope.additionalBenefits) {
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
                    alert("Please fill correct values in all fields before saving.");
                    return; // Перериваємо операцію збереження
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
    
        $scope.containsNumbers = function(value) {
            return value.length == 0 || /\d/.test(value);        
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

