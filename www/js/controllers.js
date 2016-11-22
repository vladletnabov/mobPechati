angular.module('app.controllers', [])

.controller('page2Ctrl', function ($scope,  orderSettings, $ionicSideMenuDelegate) {
  /*$scope.typeProduct = 0;//тип изделия: печать-0, штамп-0, факсимиле-0
  $scope.typeStamp = 0; //тип штампа: новый-0 или по оттиску-1
  $scope.typeMaterial = 0; // тип материала: фотополимер-0 или резина-1
  $scope.typeOsnastka = 0; // тип оснастки: какая оснастка 0 ручная
  $scope.stampImages = []; // массив с изображениями оттиска
  $scope.typeShipping = 0; //тип доставки самовывоз-0, доставка по адресу-1, до метро-2
  $scope.telNumber = ''; // контактный номер телефона
  $scope.email = ''; // контактный email
  $scope.countProducts = 1; // количество изделий в заказе 1 - минимум
  $scope.costProduct = 0; //стоимость изделия
  $scope.summOrder = 0; //общая стоимость заказа*/
  //orderSettings.setTypeStamp(2);
  orderSettings.setCurrentSize({title:'Диаметр 39мм',price:0});
  $scope.textInfo = '';
  orderSettings.setTypeProduct('rstamp');
  $scope.typeProduct=orderSettings.getTypeProduct();
  $scope.orderSettings = orderSettings;
  $scope.uploadFileName = [];
  $scope.countProduct = $scope.orderSettings.getCountProduct();
  $scope.selected = $scope.orderSettings.getOsnastkaRstamp()[0].title; //.title;
  $scope.defaultOsn = $scope.orderSettings.getOsnastkaRstamp()[0].title;
  $scope.orderSettings.setTypeOsnastka($scope.selected);
  console.log('!---! scope.orderSettings.setTypeOsnastka(scope.selected) ' + $scope.orderSettings.getTypeOsnastka() + ' value was: '+ $scope.selected);

  $scope.toggleMenu = function() {
    $scope.sideMenuController.toggleRight();
  };

  $scope.openFileDialog=function() {
    console.log('fire! $scope.openFileDialog()');
    ionic.trigger('click', { target: document.getElementById('fileRStamp') });
  };

  $scope.addFile = function (newImage) {
    console.log('add file');
    $scope.orderSettings.addStampImages(newImage);
  }

  $scope.costProduct = function () {
    console.log('costProduct()');
    var price = $scope.orderSettings.getCostProduct();
    /*var arrOsnastka = $scope.orderSettings.getOsnastkaByType($scope.orderSettings.getTypeProduct());
     var osnastka = $scope.orderSettings.getOsnastkaByType($scope.orderSettings.getTypeProduct())[0];
     angular.forEach(arrOsnastka, function (value,key) {
     if ($scope.selected.title.localeCompare(value.title)==0){
     osnastka =
     }

     })*/
    var osnastkaName = $scope.selected;
    var osnastka = $scope.orderSettings.getOsnastkaByName($scope.orderSettings.getTypeProduct(), osnastkaName);
    //var priceOsnastka
    console.log('osnastka ' + osnastka.title + ' price: ' + osnastka.price);
    var priceClishe = $scope.orderSettings.getPriceClisheByNumber($scope.orderSettings.getTypeProduct(), $scope.orderSettings.getTypeMaterial() );
    console.log('priceClishe ' + priceClishe + ' typematerial: ' + $scope.orderSettings.getTypeMaterial());
    var priceTypeStamp = $scope.orderSettings.getPriceTypeStampByName($scope.orderSettings.getTypeProduct(), $scope.orderSettings.getTypeStamp() );
    console.log('priceTypeStamp ' + priceTypeStamp + ' typeStamp: ' + $scope.orderSettings.getTypeStamp());
    $scope.orderSettings.setTypeOsnastka($scope.selected);
    console.log('scope.orderSettings.setTypeOsnastka ' + $scope.orderSettings.getTypeOsnastka());
    $scope.orderSettings.setCostProduct(priceClishe + osnastka.price + priceTypeStamp);
    console.log('scope.orderSettings.setCostProduct ' + $scope.orderSettings.getCostProduct());

    console.log('scope.orderSettings.getCountProduct ' + $scope.orderSettings.getCountProduct() + ' scope.orderSettings.getCostProduct ' + $scope.orderSettings.getCostProduct());
    $scope.orderSettings.setSummOrderParam(parseInt($scope.orderSettings.getCountProduct()),parseInt($scope.orderSettings.getCostProduct()));
    console.log('scope.orderSettings.setSummOrder ' + $scope.orderSettings.getSummOrder());
  };


  $scope.addCountProduct = function () {
    console.log('addCountProduct + 1');
    $scope.countProduct  =$scope.countProduct + 1;
    console.log($scope.countProduct);
    $scope.orderSettings.setCountProduct($scope.countProduct);
    $scope.costProduct();
  };

  $scope.remCountProduct = function () {
    console.log('remCountProduct - 1');
    var remCount = $scope.countProduct - 1;
    if (remCount<1){
      $scope.countProduct = 1;
    }
    else {
      $scope.countProduct = remCount;
    }
    console.log($scope.countProduct);
    $scope.orderSettings.setCountProduct($scope.countProduct);
    $scope.costProduct();
  };



  $scope.costProduct();
  $scope.setTypeMaterial = function (value) {
    console.log('setTypeMaterial()');
    $scope.orderSettings.setTypeMaterial(parseInt(value));
    console.log('getTypeMaterial() ' + $scope.orderSettings.getTypeMaterial());
    $scope.costProduct();
  }
  $scope.setTypeStamp = function (value) {
    console.log('getTypeStamp()');
    $scope.orderSettings.setTypeStamp(parseInt(value));
    console.log('getTypeStamp() ' + $scope.orderSettings.getTypeStamp());
    $scope.costProduct();
  }
  $scope.selectOsnastka = function (osnastka) {
    $scope.selected = osnastka.title;
    console.log('selectOsnastka() ' + $scope.selected  + 'realosnasyka: '+ osnastka.title + ' price: ' + osnastka.price);
    $scope.orderSettings.setTypeOsnastka(osnastka.title);
    $scope.costProduct();
  }


  $scope.setTextInfo = function (value) {
    console.debug('textinfo:' + value);
    orderSettings.setStampInfo(value);
  }

  $scope.toggleMenu = function() {
    //$scope.sideMenuController.toggleRight();
    $ionicSideMenuDelegate.toggleRight();
  };


})

.controller('page3Ctrl', function ($scope,  orderSettings, $ionicSideMenuDelegate) {
  //orderSettings.setTypeStamp(3);
  //orderSettings.orderValue.typeProduct = 3
  /*$scope.typeStamper=orderSettings.orderValue.typeProduct;*/
  //$stateParams.typeStamper['typeProduct'] = 3;
  $scope.typeProduct=orderSettings.getTypeProduct();
  $scope.orderSettings = orderSettings;

  /*setInterval(function(){
    console.log($ionicSideMenuDelegate.isOpen());
  }, 1000);*/

 /* $scope.openMenu = function () {
    $ionicSideMenuDelegate.toggleLeft();
  };*/

  $scope.toggleMenu = function() {
    //$scope.sideMenuController.toggleRight();
    $ionicSideMenuDelegate.toggleRight();
  };
})

.controller('page4Ctrl', function ($scope,  orderSettings, $ionicSideMenuDelegate) {
 // orderSettings.setTypeStamp(4);

  $scope.textInfo = '';
  orderSettings.setTypeProduct('sqstamp');
  $scope.typeProduct=orderSettings.getTypeProduct();
  $scope.orderSettings = orderSettings;
  $scope.uploadFileName = [];
  $scope.countProduct = $scope.orderSettings.getCountProduct();
  $scope.selected = $scope.orderSettings.getOsnastkaSqStamp()[0].title; //.title;
  $scope.defaultOsn = $scope.orderSettings.getOsnastkaRstamp()[0].title;
  $scope.orderSettings.setTypeOsnastka($scope.selected);
  $scope.sizeSelect = $scope.orderSettings.getOsnastkaSizePrice()[0].title;
  $scope.sizeDefault = $scope.orderSettings.getOsnastkaSizePrice()[0].title;
  console.log('!---! scope.orderSettings.setTypeOsnastka(scope.selected) ' + $scope.orderSettings.getTypeOsnastka() + ' value was: '+ $scope.selected);

  $scope.toggleMenu = function() {
    $scope.sideMenuController.toggleRight();
  };

  $scope.openFileDialog=function() {
    console.log('fire! $scope.openFileDialog()');
    ionic.trigger('click', { target: document.getElementById('fileRStamp') });
  };

  $scope.addFile = function (newImage) {
    console.log('add file');
    $scope.orderSettings.addStampImages(newImage);
  }

  $scope.costProduct = function () {
    console.log('costProduct()');
    var price = $scope.orderSettings.getCostProduct();

    var osnastkaName = $scope.selected;
    //Цена оснастка
    var osnastka = orderSettings.getCurrentOsnastka();
    var osnastka = $scope.orderSettings.getOsnastkaByName($scope.orderSettings.getTypeProduct(), osnastkaName);
    console.log('osnastka ' + osnastka.title + ' price: ' + osnastka.price);
    //Цена клише
    var priceClishe = $scope.orderSettings.getPriceClisheByNumber($scope.orderSettings.getTypeProduct(), $scope.orderSettings.getTypeMaterial() );
    if (orderSettings.getTypeProduct().localeCompare('rstamp')!=0){
      dopPrice = orderSettings.getCurrentSize().clishe;
      priceClishe = $scope.orderSettings.getPriceClisheByNumber($scope.orderSettings.getTypeProduct(), $scope.orderSettings.getTypeMaterial() ) + dopPrice;
    }
    console.debug('orderSettings.getCurrentSize.clishe: ' + orderSettings.getCurrentSize().clishe);
    console.log('priceClishe ' + priceClishe + ' typematerial: ' + $scope.orderSettings.getTypeMaterial());
    //Цена --
    var priceTypeStamp = $scope.orderSettings.getPriceTypeStampByName($scope.orderSettings.getTypeProduct(), $scope.orderSettings.getTypeStamp() );
    console.log('priceTypeStamp ' + priceTypeStamp + ' typeStamp: ' + $scope.orderSettings.getTypeStamp());
    $scope.orderSettings.setTypeOsnastka($scope.selected);
    console.log('scope.orderSettings.setTypeOsnastka ' + $scope.orderSettings.getTypeOsnastka());
    var priceOsnastkaByType = 0;
    if (osnastka.subtitle.localeCompare('auto')==0){
      priceOsnastkaByType = orderSettings.getCurrentSize().auto;
    }
    $scope.orderSettings.setCostProduct(priceClishe + osnastka.price + priceOsnastkaByType + priceTypeStamp); //priceTypeStamp
    console.log('scope.orderSettings.setCostProduct ' + $scope.orderSettings.getCostProduct());

    console.log('scope.orderSettings.getCountProduct ' + $scope.orderSettings.getCountProduct() + ' scope.orderSettings.getCostProduct ' + $scope.orderSettings.getCostProduct());
    $scope.orderSettings.setSummOrderParam(parseInt($scope.orderSettings.getCountProduct()),parseInt($scope.orderSettings.getCostProduct()));
    console.log('scope.orderSettings.setSummOrder ' + $scope.orderSettings.getSummOrder());
  };

  $scope.addCountProduct = function () {
    console.log('addCountProduct + 1');
    $scope.countProduct  =$scope.countProduct + 1;
    console.log($scope.countProduct);
    $scope.orderSettings.setCountProduct($scope.countProduct);
    $scope.costProduct();
  };

  $scope.remCountProduct = function () {
    console.log('remCountProduct - 1');
    var remCount = $scope.countProduct - 1;
    if (remCount<1){
      $scope.countProduct = 1;
    }
    else {
      $scope.countProduct = remCount;
    }
    console.log($scope.countProduct);
    $scope.orderSettings.setCountProduct($scope.countProduct);
    $scope.costProduct();
  };

  $scope.costProduct();
  $scope.setTypeMaterial = function (value) {
    console.log('setTypeMaterial()');
    $scope.orderSettings.setTypeMaterial(parseInt(value));
    console.log('getTypeMaterial() ' + $scope.orderSettings.getTypeMaterial());
    $scope.costProduct();
  }
  $scope.setTypeStamp = function (value) {
    console.log('getTypeStamp()');
    $scope.orderSettings.setTypeStamp(parseInt(value));
    console.log('getTypeStamp() ' + $scope.orderSettings.getTypeStamp());
    $scope.costProduct();
  }
  $scope.selectOsnastka = function (osnastka) {
    $scope.selected = osnastka.title;
    orderSettings.setCurrentOsnastka(osnastka);
    console.log('selectOsnastka() ' + $scope.selected  + 'realosnasyka: '+ osnastka.title + ' price: ' + osnastka.price);
    $scope.orderSettings.setTypeOsnastka(osnastka.title);
    $scope.costProduct();
  }
  $scope.chkSize = function (value) {
    console.debug('sizeClishe: ' + value.title);
    orderSettings.setCurrentSize(value);
    $scope.costProduct();
  }

  $scope.setTextInfo = function (value) {
    console.debug('textinfo:' + value);
    orderSettings.setStampInfo(value);
  }

  $scope.toggleMenu = function() {
    //$scope.sideMenuController.toggleRight();
    $ionicSideMenuDelegate.toggleRight();
  };
})

.controller('page5Ctrl', function ($scope,  orderSettings) {
 // orderSettings.setTypeStamp(5);

  $scope.textInfo = '';
  orderSettings.setTypeProduct('faximile');
  $scope.typeProduct=orderSettings.getTypeProduct();
  $scope.orderSettings = orderSettings;
  $scope.uploadFileName = [];
  $scope.countProduct = $scope.orderSettings.getCountProduct();
  $scope.selected = $scope.orderSettings.getOsnastkaSqStamp()[0].title; //.title;
  $scope.defaultOsn = $scope.orderSettings.getOsnastkaRstamp()[0].title;
  $scope.orderSettings.setTypeOsnastka($scope.selected);
  $scope.sizeSelect = $scope.orderSettings.getOsnastkaSizePrice()[0].title;
  $scope.sizeDefault = $scope.orderSettings.getOsnastkaSizePrice()[0].title;
  console.log('!---! scope.orderSettings.setTypeOsnastka(scope.selected) ' + $scope.orderSettings.getTypeOsnastka() + ' value was: '+ $scope.selected);

  $scope.toggleMenu = function() {
    $scope.sideMenuController.toggleRight();
  };

  $scope.openFileDialog=function() {
    console.log('fire! $scope.openFileDialog()');
    ionic.trigger('click', { target: document.getElementById('fileRStamp') });
  };

  $scope.addFile = function (newImage) {
    console.log('add file');
    $scope.orderSettings.addStampImages(newImage);
  }

  $scope.costProduct = function () {
    console.log('costProduct()');
    var price = $scope.orderSettings.getCostProduct();

    var osnastkaName = $scope.selected;
    //Цена оснастка
    var osnastka = orderSettings.getCurrentOsnastka();
    var osnastka = $scope.orderSettings.getOsnastkaByName($scope.orderSettings.getTypeProduct(), osnastkaName);
    console.log('osnastka ' + osnastka.title + ' price: ' + osnastka.price);
    //Цена клише
    var priceClishe = $scope.orderSettings.getPriceClisheByNumber($scope.orderSettings.getTypeProduct(), $scope.orderSettings.getTypeMaterial() );
    if (orderSettings.getTypeProduct().localeCompare('rstamp')!=0){
      dopPrice = orderSettings.getCurrentSize().clishe;
      priceClishe = $scope.orderSettings.getPriceClisheByNumber($scope.orderSettings.getTypeProduct(), $scope.orderSettings.getTypeMaterial() ) + dopPrice;
    }
    console.debug('orderSettings.getCurrentSize.clishe: ' + orderSettings.getCurrentSize().clishe);
    console.log('priceClishe ' + priceClishe + ' typematerial: ' + $scope.orderSettings.getTypeMaterial());
    //Цена --
    var priceTypeStamp = $scope.orderSettings.getPriceTypeStampByName($scope.orderSettings.getTypeProduct(), $scope.orderSettings.getTypeStamp() );
    console.log('priceTypeStamp ' + priceTypeStamp + ' typeStamp: ' + $scope.orderSettings.getTypeStamp());
    $scope.orderSettings.setTypeOsnastka($scope.selected);
    console.log('scope.orderSettings.setTypeOsnastka ' + $scope.orderSettings.getTypeOsnastka());
    var priceOsnastkaByType = 0;
    if (osnastka.subtitle.localeCompare('auto')==0){
      priceOsnastkaByType = orderSettings.getCurrentSize().auto;
    }
    $scope.orderSettings.setCostProduct(priceClishe + osnastka.price + priceOsnastkaByType + priceTypeStamp); //priceTypeStamp
    console.log('scope.orderSettings.setCostProduct ' + $scope.orderSettings.getCostProduct());

    console.log('scope.orderSettings.getCountProduct ' + $scope.orderSettings.getCountProduct() + ' scope.orderSettings.getCostProduct ' + $scope.orderSettings.getCostProduct());
    $scope.orderSettings.setSummOrderParam(parseInt($scope.orderSettings.getCountProduct()),parseInt($scope.orderSettings.getCostProduct()));
    console.log('scope.orderSettings.setSummOrder ' + $scope.orderSettings.getSummOrder());
  };

  $scope.addCountProduct = function () {
    console.log('addCountProduct + 1');
    $scope.countProduct  =$scope.countProduct + 1;
    console.log($scope.countProduct);
    $scope.orderSettings.setCountProduct($scope.countProduct);
    $scope.costProduct();
  };

  $scope.remCountProduct = function () {
    console.log('remCountProduct - 1');
    var remCount = $scope.countProduct - 1;
    if (remCount<1){
      $scope.countProduct = 1;
    }
    else {
      $scope.countProduct = remCount;
    }
    console.log($scope.countProduct);
    $scope.orderSettings.setCountProduct($scope.countProduct);
    $scope.costProduct();
  };

  $scope.costProduct();
  $scope.setTypeMaterial = function (value) {
    console.log('setTypeMaterial()');
    $scope.orderSettings.setTypeMaterial(parseInt(value));
    console.log('getTypeMaterial() ' + $scope.orderSettings.getTypeMaterial());
    $scope.costProduct();
  }
  $scope.setTypeStamp = function (value) {
    console.log('getTypeStamp()');
    $scope.orderSettings.setTypeStamp(parseInt(value));
    console.log('getTypeStamp() ' + $scope.orderSettings.getTypeStamp());
    $scope.costProduct();
  }
  $scope.selectOsnastka = function (osnastka) {
    $scope.selected = osnastka.title;
    orderSettings.setCurrentOsnastka(osnastka);
    console.log('selectOsnastka() ' + $scope.selected  + 'realosnasyka: '+ osnastka.title + ' price: ' + osnastka.price);
    $scope.orderSettings.setTypeOsnastka(osnastka.title);
    $scope.costProduct();
  }
  $scope.chkSize = function (value) {
    console.debug('sizeClishe: ' + value.title);
    orderSettings.setCurrentSize(value);
    $scope.costProduct();
  }

  $scope.setTextInfo = function (value) {
    console.debug('textinfo:' + value);
    orderSettings.setStampInfo(value);
  }

  $scope.toggleMenu = function() {
    //$scope.sideMenuController.toggleRight();
    $ionicSideMenuDelegate.toggleRight();
  };


})

.controller('page6Ctrl', function ($scope, $state, $ionicHistory, $ionicPopup, $window, $http, $base64, orderSettings, $ionicSideMenuDelegate, $ionicLoading) {
  //orderSettings.setTypeStamp(6);
  //$scope.typeProduct=orderSettings.getTypeProduct();
  $scope.$on('$ionicView.enter', function(){
    $scope.priceWithShipping = $scope.orderSettings.getSummOrder();
  });
  orderSettings.setCurrentUrgent(orderSettings.getUrgent()[0]);
  $scope.urgentPrice = orderSettings.getCurrentUrgent().price;
  $scope.urgentSelect = orderSettings.getCurrentUrgent().title;
  $scope.urgentModel = orderSettings.getCurrentUrgent().title;
  $scope.orderSettings = orderSettings;

  $scope.typeProduct = function (value) {
    result = 'Печать';
    switch (value) {
      case 'rstamp':
        result = 'Печать';
            break
      case 'sqstamp':
        result = 'Штамп';
        break
      case 'faximile':
        result = 'Факсимиле';
        break
      default:
        result = 'Печать';

    }
    return result;

  }

  $scope.typeStamp = function (product, stamp) {
    result = 'По оттиску';
    if (parseInt(stamp)<1){
      switch (product) {
        case 'rstamp':
          result = 'Новая';
          break
        case 'sqstamp':
          result = 'Новый';
          break
        case 'faximile':
          result = 'Новое';
          break
        default:
          result = 'Новая';

      }
    }

    return result;
  }

  $scope.typeMaterial = function (value) {
    result = 'Фотополимер';
    if (parseInt(value)>0){
      result = 'Резина';
    }
    return result;
  }

  $scope.filialName='м. Беговая';
  $scope.changeFilial = function (data) {
    console.log(data);
    $scope.filialName = data;
  }


  $scope.currentShipping = orderSettings.getShipping()[0];
  $scope.selected = $scope.orderSettings.getShipping()[0].title; //.title;
  $scope.defaultShipping = $scope.orderSettings.getShipping()[0].title;

  $scope.shippingPrice = 0;
  $scope.setPriceShipping = function (value) {
    $scope.currentShipping = value;
    $scope.shippingPrice = $scope.currentShipping.price;
    console.log('--> price: ' + $scope.shippingPrice);
    $scope.selected = $scope.currentShipping.title;
    $scope.priceWithShipping = $scope.orderSettings.getSummOrder() + $scope.currentShipping.price + orderSettings.getCurrentUrgent().price;
  };
  //$stateParams.typeStamper.typeProduct = 6;

  $scope.priceWithShipping = $scope.orderSettings.getSummOrder();

  $scope.showLoading = function() {
    $ionicLoading.show({
      template: '<ion-spinner icon="bubbles"></ion-spinner>Регистрация... ',
      //duration: 3000
    })
      .then(function(){
        console.log("The loading indicator is now displayed");
        $scope.onlyOrderRegister();
    });
  };
  $scope.hideLoading = function(){
    $ionicLoading.hide();/*.then(function(){
      console.log("The loading indicator is now hidden");
    });*/
  };

  $scope.registerOrder  = function () {
    //
    //$scope.showLoading();
    document.getElementById('register-window').style.display = 'flex'; //classList.add("foo");
    //document.getElementById('register-window').classList.add("active");
    console.log('register order');
    $scope.onlyOrderRegister();

    /*$scope.toggleMenu = function() {
      //$scope.sideMenuController.toggleRight();
      $ionicSideMenuDelegate.toggleRight();
    };*/

  }

  $scope.onlyOrderRegister = function () {
    if (($scope.orderSettings.getEmail2().localeCompare('')==0)||($scope.orderSettings.getTelNumber2()==0)||($scope.orderSettings.getUserName()==0)){
      console.debug('have error - absent contact data');
      //$scope.hideLoading();
      document.getElementById('register-window').style.display = 'none';
      //document.getElementById('register-window').classList.remove("active");
      $scope.showAlert();

    }
    else{
      console.debug('try to send order');
      var files = {};
      if($scope.orderSettings.getStampImages().length>0){
        angular.forEach($scope.orderSettings.getStampImages(), function (value, key) {
          console.log('----> filename: ' + value.name);
          files[value.name] = {
            file: value,
            file64: $base64.encode(value)
          }
        });
      }



      var orderData = {
        name: $scope.orderSettings.getUserName(),
        phoneHardware: $scope.orderSettings.getTelNumber(), // полученный от телефона
        phoneSoftware: $scope.orderSettings.getTelNumber2(), // указанный пользователем
        emailHardware: $scope.orderSettings.getEmail(), // полученный от телефона
        emailSoftware: $scope.orderSettings.getEmail2(), // указанный пользователем
        platform: $scope.orderSettings.getPlatform(), // содержит android, ios
        typeProduct: $scope.typeProduct(orderSettings.getTypeProduct()),
        typeStamp: $scope.typeStamp(),
        material: $scope.typeMaterial(),
        size: $scope.orderSettings.getCurrentSize().title,
        osnastka: $scope.orderSettings.getTypeOsnastka(),
        info: $scope.orderSettings.getStampInfo(),
        urgent: $scope.orderSettings.getCurrentUrgent().title,
        typeShipping: $scope.selected,
        priceShipping: $scope.shippingPrice,
        countProduct: $scope.orderSettings.getCountProduct(),
        priceCostProduct: $scope.orderSettings.getCostProduct(),
        summaryPriceOrder: $scope.orderSettings.getSummOrder(),
        summaryPriceOrderWithShipping: $scope.priceWithShipping,
        office: $scope.filialName,
        attachFiles: files,
        attachFilesRow: $scope.orderSettings.getStampImages(),
        attachFilesRow64: $scope.orderSettings.getStampImages64()
      };
      console.log(orderData);
      var resultRequest = $http.post($scope.orderSettings.getUrlRegisterOrder(), orderData,{
        headers : {
          'Content-Type' : 'application/x-www-form-urlencoded; charset=UTF-8'
        }}
      ).success(function(data, status, headers, config) {
        //$window.location.href = '/index.html';
        console.log(data);
        //$scope.checkVariable('data', data);
        console.log('sended!');
        //$scope.hideLoading();
        document.getElementById('register-window').style.display = 'none';
        //document.getElementById('register-window').classList.remove("active");
        console.debug('====> data.send: ' + data.send + 'data[send]: ' + data['send']);
        if (data['send'] == true){
          $scope.successRegisterOrder(data.orderNumber);
        }
        else {
          $scope.errorRegisterOrder();
        }
      });

      //$scope.showLoading();
      //resultRequest.error(function(data, status, headers, config) {
      //  $scope.errorRegisterOrder();
      //});
    }
  }

  $scope.successRegisterOrder = function(value) {
    var alertPopup = $ionicPopup.alert({
      title: 'Заказ зарегистрирован',
      template: 'Номер вашего заказа:' + value
    });

    alertPopup.then(function(res) {
      console.log('ok!');
      //$window.location.href = '/index';
      //$location.path('/');
      $ionicHistory.nextViewOptions({
        historyRoot: true
      });
      orderSettings.setDefailtValues();
      $state.transitionTo("page3");
    });
  };

  $scope.checkVariable = function(key, value) {
    var alertPopup = $ionicPopup.alert({
      title: 'Key:' + key,
      template: 'value:' + value
    });

    alertPopup.then(function(res) {
      console.log('ok!');
      //$window.location.href = '/index.html';
    });
  };


  $scope.errorRegisterOrder = function() {
    var confirmPopup = $ionicPopup.confirm({
      title: 'Регистрация заказа',
      template: 'Ошибка при регистрации заказа. Повторить?'
    });

    confirmPopup.then(function(res) {
      if(res) {
        console.log('Да!');
        $scope.registerOrder();
      } else {
        console.log('Нет!');
        $window.location.href = '/index.html';
      }
    });
  };
  $scope.toggleMenu = function() {
    //$scope.sideMenuController.toggleRight();
    $ionicSideMenuDelegate.toggleRight();
  };
  $scope.showAlert = function() {
    var alertPopup = $ionicPopup.alert({
      title: 'Отсуствуеют контактные данные!',
      template: 'Пожалуйста, введите контактные данные: Имя, номер телефона и email'
    });

    alertPopup.then(function(res) {
      console.log('show menu');
      $scope.toggleMenu();
    });
  };
  $scope.setCurrentUrgent = function (value) {
    console.debug('setCurrentUrgent: ' + value.title);
    orderSettings.setCurrentUrgent(value);
    $scope.urgentPrice = orderSettings.getCurrentUrgent().price;
    $scope.setPriceShipping($scope.currentShipping);
  }
})

.controller('menuCtrl', function ($scope,  orderSettings) {
    // orderSettings.setTypeStamp(5);
    //menuInputData ={'telNumber':'','email':'','userName':''}
    $scope.menuInputData=orderSettings.getDataForMenu;
    $scope.typeProduct=orderSettings.getTypeProduct();
    $scope.orderSettings = orderSettings;
    //$stateParams.typeStamper.typeProduct = 5;
    //$scope.dataForMenu = orderSettings.getDataForMenu;
    $scope.saveData = function() {
      console.debug($scope.menuInputData);
      /*savedData = {
        'email': $('#email').text(),
        'telNumber': $('#telNumber').text(),
        'userName': $('#userName').text()

      };*/
      console.debug('orderSettings.setDataFromMenu(savedData)');
      orderSettings.setDataFromMenu($scope.menuInputData);
      //console.debug('$ionicSideMenuDelegate.toggleLeft()');
      //$ionicSideMenuDelegate.toggleLeft();
    };

})
