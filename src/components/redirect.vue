<template>
      <div class="redirect">

      </div>
</template>

<script>
    export default {
        name: "redirect",
      data(){
          return{
            dataObjectUrl:''
          }
      },
      created(){
          this.upload_callback();
      },
      methods:{
        getParameter() {
          // 获取到重定向发送过来的信息
          var uri = decodeURI(window.location.hash.split("?")[1]);
          //有%3A之类的乱码，需要用正则处理一下
          uri = uri.replace(/%3A/g, ":").replace(/%2F/g, "/").replace(/%3F/g, "?").replace(/%3D/g, "=").replace(/%26/g, "&");
          //具体对数据的处理，看后台传过来的类型，最后得到一个json就可以，其中有两个属性，成功的时候，一个error,一个url
          return uri.length > 5 ? this.changUrlToObject(uri) : null
        },
        changUrlToObject(url){
          var $_REQUEST = new Object, aParams = url.split("&");
          for (var i = 0; i < aParams.length; i++) {
            var aParam = aParams[i].split("=");
            $_REQUEST[aParam[0]] = aParam[1]
          }
          return $_REQUEST;
        },
        upload_callback() {
          var obj = this.getParameter();
          var dataObject;
          // 当error为0的时候，说明上传成功
          if(obj.error == 0){
            dataObject = {"error": 0, "url": obj.url};
          }else{
            if (obj.message == '101') {
              dataObject = {"error": 1, "message": '只能上传.doc、.docx、.rar、.zip、.gz、.bz2、.pdf、.xls、.xlsx文件'};
            } else if (obj.message == '102') {
              dataObject = {"error": 1, "message": '上传失败'};
            } else if (obj.message == '103') {
              dataObject = {"error": 1, "message": '文件大小超过50M'};
            }
          }
          var data =  JSON.stringify(dataObject)
          //这里是对数据处理之后，走完这个js会回到kindeditor的js中，继续执行，注意如果后台返回了url,但是弹窗提醒是undef，
          // 可能是因为，自己这边传递接受的error的值不是number类型
          // ，为kindeditor源码里面对error的值的判断都是用的全等，值和类型都相等的情况
          document.getElementsByTagName("body")[0].innerHTML = '<pre>' + data + '</pre>';
        },
      }
    }
</script>

<style scoped>

</style>
