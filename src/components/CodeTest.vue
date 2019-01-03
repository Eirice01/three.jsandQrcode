<template>
<div id="qrcode"></div>
</template>

<script>
import QRCode from 'qrcodejs2'
export default {
  name: 'CodeTest',
  data () {
    return {}
  },
  mounted () {
    this.qrcode()
  },
  methods: {
    qrcode () {
      let qrcode = new QRCode('qrcode', {
        width: 100,
        height: 100,
        text: 'Eirice',
        render: 'canvas',
        background: '#ace'
      })
      console.log(qrcode)
    }
  }
}
</script>

<style scoped>
#qrcode{
  width: 400px;
  height: 300px;
  position: absolute;
  left: 50%;
  top: 50%;
}
</style>
