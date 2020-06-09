var _Page;

function _defineProperty(e, t, a) {
    return t in e ? Object.defineProperty(e, t, {
        value: a,
        enumerable: !0,
        configurable: !0,
        writable: !0
    }) : e[t] = a, e;
}

var app = getApp();

Page((_defineProperty(_Page = {
    data: {
        id: 1,
        nav: {
            nav_list: [ {
                con: "全部"
            }, {
                con: "已回答"
            }, {
                con: "未回答"
            } ],
            currentTab: 0
        },
        values: "",
      upload_picture_list:[],
      url: 'https://wapp.mjkq29.com/',
      img: [],
      
    },

  uploadpic: function (t) {
    var i = this, n = i.data.upload_picture_list, e = i.data.zid;
    function s(a, o, i) {
      var t = app.siteInfo.uniacid, e = a.data.zid;
      console.log(a);
      var n = wx.getStorageSync("openid");
      console.log("开始上传" + i + "图片到服务器："), console.log(o[i]), wx.uploadFile({
        url: a.data.url + "app/index.php?i=" + t + "&c=entry&a=wxapp&do=msg_send_imgs&m=hyb_yl",
        filePath: o[i].path,
        name: "file",
        formData: {
          path: "wxchat",
          openid: n,
          uniacid: t,
          i_type: 1,
          zid: e
        },
        success: function (t) {
          console.log(t);
          var e = t.data;
          a.setData({
            thumb: e,
            upload_picture_list: o
          }), console.log("图片上传" + i + "到服务器完成：");
        }
      }).onProgressUpdate(function (t) {
        o[i].upload_percent = t.progress, console.log("第" + i + "个图片上传进度：" + o[i].upload_percent),
          console.log(o), a.setData({
            upload_picture_list: o
          });
      });
    }
    var imgcount = this.data.imgcount;
    console.log(e), wx.chooseImage({
      count: imgcount,
      sizeType: ["original", "compressed"],
      sourceType: ["album", "camera"],
      success: function (t) {
        var e = t.tempFiles;
        for (var a in e) e[a].upload_percent = 0, e[a].path_server = "", n.push(e[a]);
        for (var o in i.setData({
          upload_picture_list: n
        }), imgcount == n.length && i.setData({
          hide: !0
        }), n) 0 == n[o].upload_percent && s(i, n, o);
      }
    });
  },
  deleteimg: function (t) {
    var e = t.currentTarget.dataset.index, a = this.data.upload_picture_list;
    a.splice(e, 1), this.setData({
      upload_picture_list: a
    });
  },
    swichNav: function(e) {
        var t = this.data.nav;
        t.currentTab = e.currentTarget.dataset.current, this.setData({
            nav: t
        });
    },
    onLoad: function(e) {
        var t = e.zid, a = e.qid, n = e.user_openid, i = wx.getStorageSync("openid");
        this.setData({
            zid: t,
            qid: a,
            user_openid: n,
            openid: i
        });
    },
    yulan: function(e) {
        console.log(e)
          var t = e.target.dataset.idx, a = (e.currentTarget.dataset.idx, this.data.qs);
          var n = a.user_picture[t], i = a.user_picture;
          wx.previewImage({
              current: n,
              urls: i
          });
      },
      yulan_doc: function(e) {
        console.log(e)
          var t = e.target.dataset.idx, a = (e.currentTarget.dataset.idx, this.data.qs.doc);
          var n = a.user_picture[t], i = a.user_picture;
          wx.previewImage({
              current: n,
              urls: i
          });
      },
    zanClick: function(e) {
        var t = this.data.qs;
        console.log(e);
        var a = e.currentTarget.dataset.index;
        t[a].checked = !t[a].checked, this.setData({
            wendaArr: t
        });
    },
    switchChange: function(e) {
        var t = e.detail.value, a = this.data.qid, n = e.currentTarget.dataset.q_category;
        if (console.log("switch2 发生 change 事件，携带值为", e.detail.value), e.detail.value) {
            i = this.data.values;
            app.util.request({
                url: "entry/wxapp/Delover",
                data: {
                    qid: a,
                    state: t,
                    q_category: n
                },
                success: function(e) {
                    console.log(e);
                }
            });
        } else {
            var i = "";
            app.util.request({
                url: "entry/wxapp/Delover",
                data: {
                    q_category: n,
                    kid: kid,
                    state: t
                },
                success: function(e) {
                    console.log(e);
                }
            });
        }
        this.setData({
            paySH: e.detail.value,
            values: i
        });
    },
    confirm: function(e) {
        console.log(e);
        var t = this, a = (t.data.zid, t.data.user_openid, e.detail.value.money);
        e.detail.value.kid;
        app.util.request({
            url: "entry/wxapp/Saveover",
            data: {
                gbmoney: a,
                qid1: e.detail.value.qid
            },
            success: function(e) {
                console.log(e), t.setData({
                    siwth: e.data.data
                });
            }
        }), setTimeout(function() {
            wx.hideLoading(), wx.showToast({
                title: "保存成功"
            });
        }, 500);
    },
    tiwenClick: function(e) {
        console.log(e);
        var t = e.currentTarget.dataset.index, a = e.currentTarget.dataset.qid;
       
        wx.navigateTo({
          url: '/hyb_yl/zhuanjia_huida/zhuanjia_huida?qs='+JSON.stringify(this.data.qs),
        })
        // this.setData({
        //     overFlow1: "true",
        //     index: t,
        //     focus: !0,
        //     qid: a
        // });
        
    },
    hideClick: function() {
        this.setData({
            overFlow1: ""
        });
    },
    inputClick: function(e) {
        var t = e.detail.value;
        this.setData({
            value: t
        });
    },
    faClick: function(e) {
        var t = this, a = t.data.qs, n = t.data.value, i = (t.data.index, t.data.qid), r = t.data.zid, o = e.currentTarget.dataset.q_docthumb, s = e.currentTarget.dataset.z_name, d = e.currentTarget.dataset.z_thumbs, u = e.currentTarget.dataset.z_zhiwu, c = e.currentTarget.dataset.docopenid, l = e.currentTarget.dataset.user, g = d;
        console.log(a), app.util.request({
            url: "entry/wxapp/Fromque",
            data: {
                hide: !1,
                question: n,
                parentid: i,
                q_dname: s,
                fromuser: l,
                user_openid: c,
                q_thumb: g,
                q_zhiwei: u,
                p_id: r,
                qid: i,
                q_docthumb: o
            },
            success: function(e) {
              wx.showToast({
                title: '发送成功',
                icon: 'success',
                duration: 2000,
                success:function(){
                  setTimeout(function () {
                    wx.reLaunch({
                      url: '/hyb_yl/wodehuida/wodehuida',
                    })
                  }, 2000);

                }
                
              });
          
                console.log(e);
            }
        });
        n = "";
        t.setData({
            qs: a,
            value: n,
            overFlow1: ""
        });
    }
}, "hideClick", function() {
    this.setData({
        overFlow1: ""
    });
}), _defineProperty(_Page, "buling", function(e) {
    return e = 10 < e ? e : "0" + e, console.log(e), e;
}), _defineProperty(_Page, "onReady", function() {
    this.getAllquestion();
}), _defineProperty(_Page, "onShow", function() {}), _defineProperty(_Page, "onHide", function() {}), 
_defineProperty(_Page, "onUnload", function() {}), _defineProperty(_Page, "onPullDownRefresh", function() {}), 
_defineProperty(_Page, "onReachBottom", function() {}), _defineProperty(_Page, "onShareAppMessage", function() {}), 
_defineProperty(_Page, "getAllquestion", function() {
    var a = this, e = a.data.zid, t = wx.getStorageSync("openid"), n = a.data.user_openid, i = a.data.qid;
    app.util.request({
        url: "entry/wxapp/Allquestion",
        data: {
            qid: i,
            zid: e,
            user_openid: n,
            fromuser: t
        },
        success: function(e) {
            if (console.log(e), 1 == e.data.data.if_over) var t = !0; else t = !1;
            a.setData({
                paySH: t,
                qs: e.data.data
            });
        }
    });
}), _Page));