module.exports = {
  lintOnSave: false,//关闭eslint
  devServer: {
    proxy: {    //配置代理服务器
      // 接口小暗号
      '/recommendUrl': {
        target: 'http://ustbhuangyi.com', //要转发的目标网址目标网址 
        changeOrigin: true,
        pathRewrite: {
          "^/recommendUrl": ''  //将路径中多余的暗号 删除
        }
      },
      // 接口小暗号
      '/getsongbymid': {
        target: 'http://47.95.207.1:3000', //要转发的目标网址目标网址 
        changeOrigin: true,
        pathRewrite: {
          "^/getsongbymid": ''  //将路径中多余的暗号 删除
        }
      },
      // 接口小暗号
      '/getsongurlbymid': {
        target: 'http://47.95.207.1:3000', //要转发的目标网址目标网址 
        changeOrigin: true,
        pathRewrite: {
          "^/getsongurlbymid": ''  //将路径中多余的暗号 删除
        }
      }
    }
  }

}

// http://ustbhuangyi.com/afas/fsdfsd/sdfsdf/sfsdf  

//  /hehe/afas/fsdfsd/sdfsdf/sfsdf  请求的本地服务器

// http://ustbhuangyi.com/afas/fsdfsd/sdfsdf/sfsdf 本地服务器转发