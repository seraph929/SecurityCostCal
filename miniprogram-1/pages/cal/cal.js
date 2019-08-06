//index.js
//获取应用实例
const app = getApp()

Page({
  data:{
    buyPriceInputData: "",
    buyPrice: false,
    buyPriceValue: "",
    buyPriceDigitHint: "",
    sellPriceInputData: "",
    sellPrice: false,
    sellPriceValue: "",
    sellPriceDigitHint: "",
    numberInputData: "",
    number: false,
    numberValue: "",
    numDigitHint: "",
    commissionInputData: "",
    commissionPercent: false,
    commissionPercentValue: "",
    commissionDigitHint: "",
    profitAndLossCalBtnJudge: false,
    buyCommission: 0.00,
    sellCommission: 0.00,
    stampTax: 0.00,
    buyTransferFee: 0.00,
    sellTransferFee: 0.00,
    fee: 0.00,
    profit: 0.00,
    profitPercent: 0.00,
    // costType: "BUYCOST",
    // tradeDirection: "SELL",
    tradeMarket:"SH",
    tradeMarketSet: [
      { name: 'SH', value: '沪市', checked: 'true' },
      { name: 'SZ', value: '深市' },
    ],
    // costTypeSet: [
    //   { name: 'BUYCOST', value: '买入成本', checked: 'true' },
    //   { name: 'POSITIONCOST', value: '持仓成本' },
    // ],
    // tradeDirectionSet: [
    //   { name: 'BUY', value: '再次买入' },
    //   { name: 'SELL', value: '选择卖出', checked: 'true' },
    // ],
  },
  tradeMarketChange: function (e) {
    this.setData({
      tradeMarket: e.detail.value
    })
    console.log(this.data.tradeMarket)
  },
  buyPriceInput: function (e) {
    //if (!(/^\d*\.{0,2}\d{0,2}$/.test(e.detail.value))) {
    if (!((/^[1-9]\d*\.{0,2}\d{0,2}$/.test(e.detail.value)) || (/^0\d*\.{1,2}\d{1,2}$/.test(e.detail.value)))) {
      console.log(e.detail.value)
      if (e.detail.value == "") {
        console.log("aaa")
        this.setData({
          buyPriceDigitHint: "",
          buyPrice: false,
        })
      }
      else {
        this.setData({
          buyPriceDigitHint: "请输入正确的价格",
          buyPrice: false,
        })
      }
    }
    else {
      this.setData({
        buyPriceInputData: e.detail.value,
        buyPriceDigitHint: ""
      })
      //console.log(this.data.buyPriceInputData)
      if (this.data.buyPriceInputData == "") {
        this.setData({
          buyPrice: false
        });
      }
      else if (this.data.buyPriceInputData <= 0){
        this.setData({
          buyPriceDigitHint: "请输入大于0的价格",
          buyPrice: false,
        })  
      }
      else {
        this.setData({
          buyPrice: true
        });
      }
      this.setData({
        profitAndLossCalBtnJudge: (this.data.buyPrice && this.data.sellPrice &&this.data.number && this.data.commissionPercent)
      })
    }
    this.setData({
      profitAndLossCalBtnJudge: (this.data.buyPrice && this.data.sellPrice && this.data.number && this.data.commissionPercent)
    })
  },
  sellPriceInput: function (e) {
    //if ((!(/^[0-9]+(.[0-9]{0,3})?$/.test(e.detail.value))) || (!(/^[0-9]*$/.test(e.detail.value)))){
    //if (!(/^\d*\.{0,3}\d{0,3}$/.test(e.detail.value))) {
    if (!((/^[1-9]\d*\.{0,2}\d{0,2}$/.test(e.detail.value)) || (/^0\d*\.{1,2}\d{1,2}$/.test(e.detail.value)))) {
      console.log(e.detail.value)
      if (e.detail.value == "") {
        console.log("aaa")
        this.setData({
          sellPriceDigitHint: "",
          sellPrice: false,
        })
      }
      else {
        this.setData({
          sellPriceDigitHint: "请输入正确的价格",
          sellPrice: false,
        })
      }
    }
    else {
      this.setData({
        sellPriceInputData: e.detail.value,
        sellPriceDigitHint: ""
      })
      if (this.data.sellPriceInputData == "") {
        this.setData({
          sellPrice: false
        });
      }
      else if (this.data.sellPriceInputData <= 0) {
        console.log("bbb")
        this.setData({
          sellPriceDigitHint: "请输入大于0的价格",
          sellPrice: false,
        })
      }
      else {
        this.setData({
          sellPrice: true
        });
      }
      this.setData({
        profitAndLossCalBtnJudge: (this.data.sellPrice && this.data.sellPrice && this.data.number && this.data.commissionPercent)
      })
    }
    this.setData({
      profitAndLossCalBtnJudge: (this.data.sellPrice && this.data.sellPrice && this.data.number && this.data.commissionPercent)
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
    else {
      this.setData({
        numberInputData: e.detail.value,
        numDigitHint: ""
      })
      if (this.data.numberInputData == "") {
        this.setData({
          number: false
        });
      }
      // else if (this.data.tradeDirection == 'BUY') {
      //   if (!(/^[0-9]*$/.test(e.detail.value / 100))) {
      //     this.setData({
      //       number: false,
      //       numdigithint: "买入股票时股票数量需为100的整数倍",
      //     });
      //   }
      //   else {
      //     this.setData({
      //       number: true,
      //     });
      //   }
      // }
      else {
        this.setData({
          number: true,
        });
      }
      this.setData({
        profitAndLossCalBtnJudge: (this.data.buyPrice && this.data.sellPrice && this.data.number && this.data.commissionPercent)
      })
    }
    this.setData({
      profitAndLossCalBtnJudge: (this.data.buyPrice && this.data.sellPrice && this.data.number && this.data.commissionPercent)
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
    else {
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
        profitAndLossCalBtnJudge: (this.data.buyPrice && this.data.sellPrice && this.data.number && this.data.commissionPercent)
      })
    }
    this.setData({
      profitAndLossCalBtnJudge: (this.data.buyPrice && this.data.sellPrice && this.data.number && this.data.commissionPercent)
    })
  },
  resetBtnClick: function(e){
    this.setData({
      buyPriceValue: "",
      sellPriceValue: "",
      numberValue: "",
      commissionPercentValue: "",
    })
    if (this.data.buyPriceValue == "" || this.data.sellPriceValue == "" || this.data.numberValue == "" || this.data.commissionPercentValue == "") {
      this.setData({
        profitAndLossCalBtnJudge: false
      })
    }
  },
  profitAndLossCalBtnClick: function (e) {
    this.setData({
      buyCommission: (Number(this.data.buyPriceInputData) * Number(this.data.numberInputData) * Number(this.data.commissionInputData) / 10000).toFixed(2)
    })
    if (this.data.buyCommission < 5 && this.data.buyCommission > 0) {
      this.setData({
        buyCommission: Number(5).toFixed(2)
      })
    }
    this.setData({
      sellCommission: (Number(this.data.sellPriceInputData) * Number(this.data.numberInputData) * Number(this.data.commissionInputData) / 10000).toFixed(2)
    })
    if (this.data.sellCommission < 5 && this.data.sellCommission > 0) {
      this.setData({
        sellCommission: Number(5).toFixed(2)
      })
    }
    this.setData({
      stampTax: (Number(this.data.sellPriceInputData) * Number(this.data.numberInputData) * 0.001).toFixed(2)
    })
    console.log(this.data.stampTax)
    if (this.data.tradeMarket == 'SH') {
      this.setData({
        buyTransferFee: ((Number(this.data.buyPriceInputData) * Number(this.data.numberInputData) * 0.00002)).toFixed(2),
        sellTransferFee: ((Number(this.data.sellPriceInputData) * Number(this.data.numberInputData) * 0.00002)).toFixed(2)
      })
    }
    else {
      this.setData({
        transferFee: 0.00
      })
    }
    this.setData({
      fee: (Number(this.data.buyCommission) + Number(this.data.sellCommission) + Number(this.data.stampTax) + Number(this.data.buyTransferFee) + Number(this.data.sellTransferFee)).toFixed(2),
    })
    this.setData({
      profit: ((this.data.sellPriceInputData - this.data.buyPriceInputData) * this.data.numberInputData - this.data.fee).toFixed(2)
    })
    this.setData({
      profitPercent: (this.data.profit / (this.data.buyPriceInputData * this.data.numberInputData)*100).toFixed(2)
    })  
    console.log(this.data.buyPriceInputData)
    console.log(this.data.numberInputData)
    console.log(this.data.profit)
    console.log(this.data.profitPercent)
  },
})