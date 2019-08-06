//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    motto: 'Hi, Seraph',
    priceInputData:"",
    price:false,
    priceValue:"",
    numberInputData:"",
    number:false,
    numberValue:"",
    commissionInputData:"",
    commissionPercent:false,
    commissionPercentValue:"",
    nullJudge:false,
    priceDigitHint:"",
    numDigitHint:"",
    commissionDigitHint:"",
    commission: 0.00,
    stampTax: 0.00,
    transferFee:0.00,
    fee:0.00,
    tradeDirection:"BUY",
    tradeMarket:"SH",
    tradeDirectionSet: [
      { name: 'BUY', value: '买入', checked: 'true' },
      { name: 'SELL', value: '卖出' },
    ],
    tradeMarketSet: [
      { name: 'SH', value: '沪市', checked: 'true' },
      { name: 'SZ', value: '深市' },
    ],
  },
  showStampTaxTip: function(){
    wx.showToast({
      title: '买入股票时不收取印花税，卖出股票时收取股票总额千分之一的印花税。',
      icon: 'none',
      duration: 5000
    })
  },
  showTransferFeeTip:function(){
    wx.showToast({
      title: '深市股票买卖不收取过户费，沪市股票买卖时收取股票总额万分之0.2的过户费。',
      icon: 'none',
      duration: 5000
    })
  },
  buyOrSellChange: function(e){
    this.setData({
      tradeDirection: e.detail.value
    })
    console.log(this.data.tradeDirection)
  },
  shOrSzChange: function (e) {
    this.setData({
      tradeMarket: e.detail.value
    })
  },
  priceInput: function(e) {
    //if ((!(/^[0-9]+(.[0-9]{0,3})?$/.test(e.detail.value))) || (!(/^[0-9]*$/.test(e.detail.value)))){
    //if (!(/^\d*\.{0,3}\d{0,3}$/.test(e.detail.value))){
    if (!((/^[1-9]\d*\.{0,2}\d{0,2}$/.test(e.detail.value)) || (/^0\d*\.{1,2}\d{1,2}$/.test(e.detail.value)))) {
      console.log(e.detail.value)
      if (e.detail.value == ""){
        console.log("aaa")
        this.setData({
          priceDigitHint: "",
          price: false,
        })
      }
      else {
        this.setData({
          priceDigitHint: "请输入正确的数字",
          price: false,
        })
      }
    }
    else {
      this.setData({
        priceInputData:e.detail.value,
        priceDigitHint:""
      })
      if (this.data.priceInputData == ""){
        this.setData({
          price:false
        });
      }
      else if (this.data.priceInputData <= 0) {
        this.setData({
          priceDigitHint: "请输入大于0的价格",
          price: false,
        })
      }
      else {
        this.setData({
          price: true
        });
      }
      this.setData({
        nullJudge: (this.data.price && this.data.number && this.data.commissionPercent)
      })
    }
    this.setData({
      nullJudge: (this.data.price && this.data.number && this.data.commissionPercent)
    }) 
  },
  numberInput: function (e) {
    if (!(/^[0-9]*$/.test(e.detail.value))) {
      console.log(e.detail.value)
      if (e.detail.value == "") {
        console.log("aaa")
        this.setData({
          numDigitHint: "",
          number: false,
        })
      }
      else {
        this.setData({
          numDigitHint: "请输入正确的数字",
          number: false,
        })
      }
    }
    else{
      this.setData({
        numberInputData: e.detail.value,
        numDigitHint:""
      })
      if (this.data.numberInputData == "") {
        this.setData({
          number: false
        });
      }
      else if (this.data.tradeDirection == 'BUY') {
        if (!(/^[0-9]*$/.test(e.detail.value / 100))){
          this.setData({
            number: false,
            numDigitHint: "买入股票时股票数量需为100的整数倍",
          });
        }
        else {
          this.setData({
            number: true,
          });  
        }
      }
      else {
        this.setData({
          number: true,
        });
      }
      this.setData({
        nullJudge: (this.data.price && this.data.number && this.data.commissionPercent)
      })
    }
    this.setData({
      nullJudge: (this.data.price && this.data.number && this.data.commissionPercent)
    })
  },
  commissionInput: function (e) {
    if (!(/^[0-9]*$/.test(e.detail.value))) {
      console.log(e.detail.value)
      if (e.detail.value == "") {
        console.log("commission")
        this.setData({
          commissionDigitHint: "",
          commissionPercent: false,
        })
      }
      else {
        this.setData({
          commissionDigitHint: "请输入正确的数字",
          commissionPercent: false,
        })
      }
    }
    else{
      this.setData({
        commissionInputData: e.detail.value,
        commissionDigitHint: ""
      })
      if (this.data.commissionInputData == "") {
        this.setData({
          commissionPercent: false
        });
      }
      else {
        this.setData({
          commissionPercent: true
        });
      }
      this.setData({
        nullJudge: (this.data.price && this.data.number && this.data.commissionPercent)
      })
    }
    this.setData({
      nullJudge: (this.data.price && this.data.number && this.data.commissionPercent)
    })
  },
  resetBtnClick: function(e){
    this.setData({
      priceValue: "",
      numberValue: "",
      commissionPercentValue: "",
    })
    if (this.data.priceValue == "" || this.data.numberValue == "" || this.data.commissionPercentValue == "") {
      this.setData({
        nullJudge: false
      })
    }
  },
  calBtnClick: function(e) {
    this.setData({
      commission: (Number(this.data.priceInputData) * Number(this.data.numberInputData) * Number(this.data.commissionInputData)/10000).toFixed(2)
    })
    if (this.data.commission < 5 && this.data.commission > 0) {
      this.setData({
        commission: Number(5).toFixed(2)
      })
    }
    if (this.data.tradeDirection == 'SELL'){
      this.setData({
        stampTax: (Number(this.data.priceInputData) * Number(this.data.numberInputData) * 0.001).toFixed(2)
      })
    }
    else {
      this.setData({
        stampTax: 0.00
      })
    }
    if (this.data.tradeMarket == 'SH'){
      this.setData({
        transferFee: ((Number(this.data.priceInputData) * Number(this.data.numberInputData) * 0.00002)).toFixed(2)    
      })
    }
    else {
      this.setData({
        transferFee: 0.00
      })
    }
    this.setData({
      fee: (Number(this.data.commission)+Number(this.data.stampTax)+Number(this.data.transferFee)).toFixed(2)
    })
  },
  proLossJumpBtn: function () {
    wx.navigateTo({
      url: '../../pages/cal/cal',
    })
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad: function () {
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse){
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }
  },
  getUserInfo: function(e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  }
})
