// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires' ['ngCordova']
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js
angular.module('app', ['ionic', 'app.controllers', 'app.routes', 'app.directives','app.services','base64','ngCordova', 'lokijs',])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);
    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
  });
})

.factory('orderSettings', function ( $rootScope, $http ) {
    var urlData = 'http://pechati.ru/extdata/baseparts/filialsWSunsec.php';
    var urlRegisterOrder = 'http://json.local/index.php/session-status';
    var filialData = {};
    var filialList = {};
    var typeProduct = 'rstamp';//тип изделия: печать-rstamp, штамп-sqstamp, факсимиле-faximile
    var typeStamp = 0; //тип штампа: новый-0 или по оттиску-1
    var typeMaterial = 0; // тип материала: фотополимер-0 или резина-1
    var typeOsnastka = ''; // тип оснастки: какая оснастка 0 ручная
    var stampImages = []; // массив с изображениями оттиска
    var stampImages64 = [];
    var typeShipping = 0; //тип доставки самовывоз-0, доставка по адресу-1, до метро-2
    var telNumber = ''; // контактный номер телефона с СИМкарты
    var telNumber2 = ''; // контактный номер телефона вводимый пользователем
    var email = ''; // контактный email с аккаунта
    var email2 = ''; // контактный email вводимый пользователем
    var userName = ''; //имя пользователя
    var countProducts = 1; // количество изделий в заказе 1 - минимум
    var costProduct = 0; //стоимость изделия
    var summOrder = 0; //общая стоимость заказа
    var osnastka = {
      rstamp: [
         {
          title: 'Ручная с гербом',
          price:0,
          image: 'images/ruch.jpg',
          selected: true
        },
        {
          title: 'Автоматическая Colop R40',
          price:450,
          image: 'images/colopr40.jpg',
          selected: false
        },
        {
          title: 'Карманная Colop Mouse',
          price:450,
          image: 'images/mouse.jpg',
          selected: false
        },
        {
          title: 'Карманная металическая',
          price:850,
          image: 'images/metal.gif',
          selected: false
        }
      ],
      sqstamp: [
        {
          title: 'Ручная малого размера',
          price:0,
          image: 'images/ruch-osn.png',
          selected: true
        }
      ],
      faximile: [
        {
          title: 'Ручная малого размера',
          price:0,
          image: 'images/ruch-osn.png',
          selected: true
        }
      ]
    };
    var priceClishe = {
      rstamp:[
        {
          number: 1,
          title: 'Резина',
          price: 750
        },
        {
          number: 0,
          title: 'Фотополимер',
          price: 550
        }
      ],
      sqstamp:[],
      faximile:[]
    };
    var priceTypeStamp = {
      rstamp: [
        {
          title: 0,
          price: 0
        },
        {
          title:1,
          price: 200
        }
      ],
      sqstamp: [
        {
          title: 0,
          price: 0
        },
        {
          title:1,
          price: 200
        }
      ],
      faximile: [
        {
          title: 0,
          price: 0
        },
        {
          title:1,
          price: 200
        }
      ],
    };
    var shipping = [
      {title: 'Самовывоз из офиса', price: 0},
      {title: 'Доставка до метро', price: 0},
      {title: 'Доставка по адресу', price: 300}
    ];
  getData();
  getPhoneData();

  function getDataForMenu(){
    var checkDataResult = checkSavedData();
    result ={
      'email': '',
      'telNumber': '',
      'name': userName
    };

    // проверяем телефонный номер. пишем второй, вводимый пользователем, только тогда, когда он определён.
    // в остальных случаях - первый или пустоту
    chkTelNumber = checkDataResult['telNumber'];
    chkTelNumber2 = checkDataResult['telNumber2'];
    if ((chkTelNumber.localeCompare('')==0)&&(chkTelNumber2.localeCompare('')==0)) {
      result['telNumber'] = '';
    }
    if ((chkTelNumber.localeCompare('')!=0)&&(chkTelNumber2.localeCompare('')==0)) {
      result['telNumber'] = telNumber;
    }
    if ((chkTelNumber.localeCompare('')==0)&&(chkTelNumber2.localeCompare('')!=0)) {
      result['telNumber'] = telNumber2;
    }

    // проверяем email. пишем второй, вводимый пользователем, только тогда, когда он определён.
    // в остальных случаях - первый или пустоту
    chkEmail = checkDataResult['email'];
    chkEmail2 = checkDataResult['email2'];
    if ((chkEmail.localeCompare('')==0)&&(chkEmail2.localeCompare('')==0)) {
      result['email'] = '';
    }
    if ((chkEmail.localeCompare('')!=0)&&(chkEmail2.localeCompare('')==0)) {
      result['email'] = email;
    }
    if ((chkEmail.localeCompare('')==0)&&(chkEmail2.localeCompare('')!=0)) {
      result['email'] = email2;
    }

    return result;
  }
  function getPhoneData() {
    console.log('====> get data from phone account');
    var checkDataResult = checkSavedData();
    var platform = '';
    var phoneData = {
      'platform': '',
      'telNumber': '',
      'email': ''
    };
    chkTelNumber = checkDataResult['telNumber'];
    chkTelNumber2 = checkDataResult['telNumber2'];
    console.debug('chkTelNumber:  ' + chkTelNumber);
    console.debug('chkTelNumber2: ' + chkTelNumber2);
    if ((chkTelNumber.localeCompare('')==0)&&(chkTelNumber2.localeCompare('')==0)){
      platform = getPlatform();
      switch (platform) {
        case 'android':
          phoneData = getAndroidData()
          break
        case 'ipod':
          break
        case 'iphone':
          break
        default:
          break
      }

    }
    if (phoneData['telNumber'].localeCompare('')!=0){
      telNumber = phoneData['telNumber'];
    }
    if (phoneData['email'].localeCompare('')!=0){
      email = phoneData['telNumber'];
    }
  }
  function checkSavedData() {
    result = {
      'telNumber': '',
      'email': '',
      'telNumber2': '',
      'email2': '',
    };
    //
    return result;
  }

  function getPlatform(){
    result ='';
    //
    return result;
  }

  function getAndroidData() {
    result = {
      'platform': '',
      'telNumber': '',
      'email': ''
    };
    //
    return result;

  }



  function getData(){

    $http.get(urlData)
      .success(function(data) {
        //console.log('====> success load data from server');
        filialData = data;
        setFilialList();

      })
      .error(function(data) {
        console.log('====> error  while load data from server');
      });
  }

  function setFilialList() {
    //console.log('====> setFilialList');
    result = filialList;
    angular.forEach(filialData, function (value, key) {
      //.log('key: ' + key + ' value: ' + value);
      result[key] = {title: key, email: value.email, phone: value.phone}
    });

    filialList = result;
  }

  return {
      getTypeProduct: function () {
        return typeProduct;
      },
      setTypeProduct: function(value) {
        typeProduct = value;
      },
      getTypeStamp: function () {
        return typeStamp;
      },
      setTypeStamp: function (value) {
        typeStamp = value;
      },
      getTypeMaterial: function () {
        return typeMaterial;
      },
      setTypeMaterial: function (value) {
        typeMaterial = value;
      },
      getTypeOsnastka: function () {
        //console.log('!!!!! service getType osnastka return value: ' + typeOsnastka);
        return typeOsnastka;
      },
      setTypeOsnastka: function (value) {
        //console.log('!!!!! service setType osnastka get value: ' + value);
        typeOsnastka = value;
      },
      getStampImages: function () {
        return stampImages;
      },
      setStampImages: function (value) {
        stampImages = value;
      },
      addStampImages: function (value) {
        stampImages.push(value);
      },
      getStampImages64: function () {
        return stampImages64;
      },
      setStampImages64: function (value) {
        stampImages64 = value;
      },
      addStampImages64: function (value) {
        stampImages64.push(value);
      },
      getTypeShipping: function () {
        return typeShipping;
      },
      setTypeShipping: function (value) {
        typeShipping = value;
      },
      getTelNumber: function () {
        return telNumber;
      },
      setTelNumber:function (value) {
        telNumber = value;
      },
      getEmail: function () {
        return email;
      },
      setEmail: function (value) {
        email = value;
      },
      getCountProduct: function () {
        return countProducts;
      },
      setCountProduct: function (value) {
        countProducts = value;
      },
      getSummOrder: function () {
        return summOrder;
      },
      getSummOrderParam: function (count,cost) {
        summOrder = count*cost;
        return summOrder;
      },
      setSummOrder: function (value) {
        summOrder = value;
      },
      setSummOrderParam: function (count,cost) {
        summOrder = parseInt(count)*parseInt(cost);
      },
      getCostProduct: function () {
        return costProduct;
      },
      setCostProduct: function (value) {
        costProduct = value;
      },
      getOsnastka: function () {
        return osnastka;
      },
      getOsnastkaByType: function (type) {
        var result = [];
        switch (type) {
          case 'rstamp':
            result = osnastka.rstamp;
              break
          case 'sqstamp':
            result = osnastka.sqstamp;
            break
          case 'faximile':
            result = osnastka.faximile;
            break
          default:
            result = osnastka.rstamp;
        }
        return result;
      },
      getOsnastkaByName: function (type, name) {
        var result = '';
        var osnastkaByType =  [];
        switch (type) {
          case 'rstamp':
            osnastkaByType = osnastka.rstamp;
            break
          case 'sqstamp':
            osnastkaByType = osnastka.sqstamp;
            break
          case 'faximile':
            osnastkaByType = osnastka.faximile;
            break
          default:
            osnastkaByType = osnastka.rstamp;
        }
        angular.forEach(osnastkaByType,function (value, key) {
          //console.log ('service function getOsnastkaByName, name : ' + name + ' value: ' + value.title);
          if (name.localeCompare(value.title)==0){
            //console.log ('!!!!! service function getOsnastkaByName, name : ' + name + ' value: ' + value.title);
            //console.log ('!!!!! service function getOsnastkaByName, result  : ' +  value);
            result = value;
          }
        });
        //console.log ('====! service function getOsnastkaByName, result  : ' +  result);
        return result;
      },
      getOsnastkaRstamp: function () {
        return osnastka.rstamp;
      },
      getPriceClishe: function () {
        return priceClishe;
      },
      getPriceClisheByType: function (type) {
        var result = [];
        switch (type) {
          case 'rstamp':
            result = priceClishe.rstamp;
            break
          case 'sqstamp':
            result = priceClishe.sqstamp;
            break
          case 'faximile':
            result = priceClishe.faximile;
            break
          default:
            result = priceClishe.rstamp;
        }
        return result;
      },
      getPriceClisheByName: function (type, name) {
        var result='';
        var typeProduct = [];
        switch (type) {
          case 'rstamp':
            typeProduct = priceClishe.rstamp;
            break
          case 'sqstamp':
            typeProduct = priceClishe.sqstamp;
            break
          case 'faximile':
            typeProduct = priceClishe.faximile;
            break
          default:
            typeProduct = priceClishe.rstamp;
        }
        angular.forEach(typeProduct,function (value, key) {
          if (name.toString().localeCompare(value.title.toString())){
            result = value.price;
          }
        });
        return result;
      },
      getPriceClisheByNumber: function (type, number) {
        var result='';
        var typeProduct = [];
        switch (type) {
          case 'rstamp':
            typeProduct = priceClishe.rstamp;
            break
          case 'sqstamp':
            typeProduct = priceClishe.sqstamp;
            break
          case 'faximile':
            typeProduct = priceClishe.faximile;
            break
          default:
            typeProduct = priceClishe.rstamp;
        }
        result = typeProduct[parseInt(number)].price;
        angular.forEach(typeProduct,function (value, key) {
          if (parseInt(number) == parseInt(value.number)){
            result = value.price;
          }
        });
        return result;
      },
      getPriceTypeStampByType: function (type) {
        var result = [];
        switch (type) {
          case 'rstamp':
            result = priceTypeStamp.rstamp;
            break
          case 'sqstamp':
            result = priceTypeStamp.sqstamp;
            break
          case 'faximile':
            result = priceTypeStamp.faximile;
            break
          default:
            result = priceClishe.rstamp;
        }
        return result;
      },
      getPriceTypeStampByName: function (type, name) {
        var result = '';
        var priceTypeStampByType = [];
        switch (type) {
          case 'rstamp':
            priceTypeStampByType = priceTypeStamp.rstamp;
            break
          case 'sqstamp':
            priceTypeStampByType = priceTypeStamp.sqstamp;
            break
          case 'faximile':
            priceTypeStampByType = priceTypeStamp.faximile;
            break
          default:
            priceTypeStampByType = priceClishe.rstamp;
        }
        angular.forEach(priceTypeStampByType,function (value, key) {
          if (parseInt(name) == parseInt(value.title)){
            result = value.price;
          }
        });
        return result;
      },
      getShipping: function () {
        return shipping;
      },
      getUrlData: function () {
        return urlData;
      },
      setUrlData: function (value) {
        urlData = value;
      },
      getFilialData: function () {
        return filialData;
      },
      setFilialData: getData(),
      getFilialList: function () {
        return filialList;
      },
      getUrlRegisterOrder: function () {
        return urlRegisterOrder;
      },
      getDataForMenu: getDataForMenu()

    };
})

