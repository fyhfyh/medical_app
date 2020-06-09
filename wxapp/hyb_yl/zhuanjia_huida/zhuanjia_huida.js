// hyb_yl/zhuanjia_huida/zhuanjia_huida.js
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
Page({

  /**
   * 页面的初始数据
   */
  data: {

    info:[],
    textarea:'',
    upload_picture_list:[],
    url: 'https://wapp.mjkq29.com/',
    img: [],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
     
      var info = JSON.parse(options.qs);
      this.setData({
        info:info
      })
      console.log(this.data.info)
  },
  computing_word: function(t) {
     this.setData({
        wordLength: t.detail.value.length,
        textarea: t.detail.value
    });
},
  uploadpic: function (t) {
    var i = this, n = i.data.upload_picture_list, e = i.data.info.p_id;
    function s(a, o, i) {
      var t = app.siteInfo.uniacid, e = a.data.info.p_id;
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
  formSubmit: function(e) {
    var t = this, 
    o = t.data.info.q_docthumb,  
    s = t.data.info.q_dname, 
    d = t.data.info.savant_openid, 
    c = t.data.info.user_openid, 
    l = t.data.info.fromuser, 
    u = t.data.info.q_zhiwei, 
    r = t.data.info.p_id, 
    qu = t.data.info.q_username, 
    g = t.data.info.q_thumb, 
    i = t.data.info.qid, 
    qy=t.data.info.q_type,
    hqs = t.data.textarea
 
      if ("" == t.data.textarea){
        wx.showModal({
          title: "",
          content: "请填写回复内容"
      });
      }  else {
         
          wx.showModal({
              title: "提示",
              content: " 确认提交么？ ",
              success: function(t) {
                  if (t.confirm) {
                      console.log("用户点击确定");
                   
                      app.util.request({
                          url: "entry/wxapp/Selcetwzximg",
                          data: {
                              us_openid: c,
                              i_doctor: r
                          },
                          header: {
                              "Content-Type": "application/json"
                          },
                          success: function(t) {
                              console.log(t);
                              var e = t.data, 
                              a = e.substring(0, e.length - 1);
                              app.util.request({
                                  url: "entry/wxapp/Fromque",
                                  data: {
                                    qid:i,
                                    user_picture: a,
                                    hq_question: hqs,
                                    parentid: i,
                                    q_dname: s,
                                    fromuser: l,
                                    savant_openid:d,
                                    user_openid: c,
                                    q_thumb: g,
                                    q_zhiwei: u,
                                    p_id: r,
                                    parentid: i,
                                    q_docthumb: o,
                                    q_username:qu,
                                    q_type:qy,
                                      
                                  },
                                  header: {
                                      "content-type": "application/json"
                                  },
                                  success: function(t) {
                                    wx.showLoading({
                                      title: "回复成功"
                                  }), setTimeout(function() {
                                      wx.hideLoading(), wx.redirectTo({
                                          url: "../wodehuida/wodehuida"
                                      });
                                  }, 800);
                                  },
                                  fail: function(t) {
                                    console.log('回复失败')
                                      console.log(t);
                                  }
                              });
                          }
                      });
                  }
              }
          }); 
      }
  }


})