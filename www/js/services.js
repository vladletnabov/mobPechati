angular.module('app.services', [])

.service('BlankService', [function(){

  /*var orderValue = {
    typeProduct: 0,
    typeStamp: 0,
    typeMaterial: 0,
    typeOsnastka:0,
    stampImages: [],
    typeShipping: 0,
    telNumber: '',
    email: '',
    countProducts: 1,
    costProduct: 0,
    summOrder:0
  };
  return {orderValue: orderValue};*/

/*
  var typeProduct = 0;//тип изделия: печать-0, штамп-0, факсимиле-0
  var typeStamp = 0; //тип штампа: новый-0 или по оттиску-1
  var typeMaterial = 0; // тип материала: фотополимер-0 или резина-1
  var typeOsnastka = 0; // тип оснастки: какая оснастка 0 ручная
  var stampImages = []; // массив с изображениями оттиска
  var typeShipping = 0; //тип доставки самовывоз-0, доставка по адресу-1, до метро-2
  var telNumber = ''; // контактный номер телефона
  var email = ''; // контактный email
  var countProducts = 1; // количество изделий в заказе 1 - минимум
  var costProduct = 0; //стоимость изделия
  var summOrder = 0; //общая стоимость заказа


  return {
    getTypeProduct: function () {
      return typeProduct;
    },
    setTypeProduct: function(value) {
      typeProduct = value;
    },
    getTypeStamp: function () {
      return typeProduct;
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
      return typeOsnastka;
    },
    setTypeOsnastka: function (value) {
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
      costProduct = value;
    },
    getSummOrder: function () {
      return summOrder;
    },
    getSummOrder: function (count,cost) {
      summOrder = count*cost;
      return summOrder;
    },
    setSummOrder: function (value) {
      summOrder = value;
    },
    setSummOrder: function (count,cost) {
      summOrder = count*cost;
    },
    getCostProduct: function () {
      return costProduct;
    },
    setCostProduct: function (value) {
      costProduct = value;
    }

  };*/
}])

.factory('BlankService', [function(){

}]);
/*
.factory('orderSettings', function () {
    var typeProduct = 0;//тип изделия: печать-0, штамп-0, факсимиле-0
    var typeStamp = 0; //тип штампа: новый-0 или по оттиску-1
    var typeMaterial = 0; // тип материала: фотополимер-0 или резина-1
    var typeOsnastka = 0; // тип оснастки: какая оснастка 0 ручная
    var stampImages = []; // массив с изображениями оттиска
    var typeShipping = 0; //тип доставки самовывоз-0, доставка по адресу-1, до метро-2
    var telNumber = ''; // контактный номер телефона
    var email = ''; // контактный email
    var countProducts = 1; // количество изделий в заказе 1 - минимум
    var costProduct = 0; //стоимость изделия
    var summOrder = 0; //общая стоимость заказа


    return {
      getTypeProduct: function () {
        return typeProduct;
      },
      setTypeProduct: function(value) {
        typeProduct = value;
      },
      getTypeStamp: function () {
        return typeProduct;
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
        return typeOsnastka;
      },
      setTypeOsnastka: function (value) {
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
        costProduct = value;
      },
      getSummOrder: function () {
        return summOrder;
      },
      getSummOrder: function (count,cost) {
        summOrder = count*cost;
        return summOrder;
      },
      setSummOrder: function (value) {
        summOrder = value;
      },
      setSummOrder: function (count,cost) {
        summOrder = count*cost;
      },
      getCostProduct: function () {
        return costProduct;
      },
      setCostProduct: function (value) {
        costProduct = value;
      }

    };
  });*/


