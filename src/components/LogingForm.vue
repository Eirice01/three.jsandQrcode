<template>
  <div id="THREEbg">
  <div id="logingform">
  <Form ref="formInline" :model="formInline" :rules="ruleInline" style="height: 200px;width: 200px;margin:30px auto">
    <FormItem prop="user">
      <Input type="text" v-model="formInline.user" placeholder="Username">
        <Icon type="ios-person-outline" slot="prepend"></Icon>
      </Input>
    </FormItem>
    <FormItem prop="password">
      <Input type="password" v-model="formInline.password" placeholder="Password">
        <Icon type="ios-lock-outline" slot="prepend"></Icon>
      </Input>
    </FormItem>
    <FormItem>
      <Button type="primary" @click="handleSubmit('formInline')">Signin</Button>
    </FormItem>
  </Form>
  </div>
  </div>
</template>

<script>
import * as THREE from 'three'
import * as TWEEN from 'tween'
let SEPARATION = 100,
  AMOUNTX = 100,
  AMOUNTY = 70

let container
let camera, scene, renderer

let particles,
  particle,
  count = 0

let mouseX = 85,
  mouseY = -342

let windowHalfX = window.innerWidth / 2
let windowHalfY = window.innerHeight / 2
export default {
  name: 'LogingForm',
  data () {
    return {
      formInline: {
        user: '',
        password: ''
      },
      ruleInline: {
        user: [
          {required: true, message: 'Please fill in the user name', trigger: 'blur'}
        ],
        password: [
          {required: true, message: 'Please fill in the password.', trigger: 'blur'},
          {type: 'string', min: 6, message: 'The password length cannot be less than 6 bits', trigger: 'blur'}
        ]
      }
    }
  },
  mounted () {
    this.init()
    this.animate()
  },
  methods: {
    handleSubmit (name) {
      this.$refs[name].validate((valid) => {
        if (valid) {
          this.$Message.success('Success!')
        } else {
          this.$Message.error('Fail!')
        }
      })
    },
    init () {
      container = document.createElement('div')
      document.body.appendChild(container)
      camera = new THREE.PerspectiveCamera(
        120,
        window.innerWidth / window.innerHeight,
        1,
        10000
      )
      container.style.cssText = 'position:fixed;top:0;left:0;cursor:pointer;opacity:0.9;z-index:10000'
      camera.position.z = 1000
      scene = new THREE.Scene()

      particles = new Array()

      var PI2 = Math.PI * 2
      var material = new THREE.MeshBasicMaterial({
        color: 0xe1e1e1,
        program: function (context) {
          context.beginPath()
          context.arc(0, 0, 0.6, 0, PI2, true)
          context.fill()
        }
      })

      var i = 0

      for (var ix = 0; ix < AMOUNTX; ix++) {
        for (var iy = 0; iy < AMOUNTY; iy++) {
          particle = particles[i++] = new THREE.Particle(material)
          particle.position.x = ix * SEPARATION - AMOUNTX * SEPARATION / 2
          particle.position.z = iy * SEPARATION - AMOUNTY * SEPARATION / 2
          scene.add(particle)
        }
      }

      renderer = new THREE.WebGLRenderer()
      renderer.setClearColor(0x08f7f4, 0.5)
      renderer.setSize(window.innerWidth, window.innerHeight)
      container.appendChild(renderer.domElement)
      document.addEventListener('mousemove', this.onDocumentMouseMove, false)
      document.addEventListener('touchstart', this.onDocumentTouchStart, false)
      document.addEventListener('touchmove', this.onDocumentTouchMove, false)

      //

      window.addEventListener('resize', this.onWindowResize, false)
    },
    onWindowResize () {
      windowHalfX = window.innerWidth / 2
      windowHalfY = window.innerHeight / 2

      camera.aspect = window.innerWidth / window.innerHeight
      camera.updateProjectionMatrix()

      renderer.setSize(window.innerWidth, window.innerHeight)
    },
    onDocumentMouseMove (event) {
      mouseX = event.clientX - windowHalfX
      mouseY = event.clientY - windowHalfY
    },
    onDocumentTouchStart (event) {
      if (event.touches.length === 1) {
        event.preventDefault()

        mouseX = event.touches[0].pageX - windowHalfX
        mouseY = event.touches[0].pageY - windowHalfY
      }
    },
    onDocumentTouchMove (event) {
      if (event.touches.length === 1) {
        event.preventDefault()

        mouseX = event.touches[0].pageX - windowHalfX
        mouseY = event.touches[0].pageY - windowHalfY
      }
    },
    animate () {
      requestAnimationFrame(this.animate)

      this.render()
    },
    render () {
      camera.position.x += (mouseX - camera.position.x) * 0.05
      camera.position.y += (-mouseY - camera.position.y) * 0.05
      camera.lookAt(scene.position)

      var i = 0

      for (var ix = 0; ix < AMOUNTX; ix++) {
        for (var iy = 0; iy < AMOUNTY; iy++) {
          particle = particles[i++]
          particle.position.y =
            Math.sin((ix + count) * 0.3) * 50 +
            Math.sin((iy + count) * 0.5) * 50
          particle.scale.x = particle.scale.y =
            (Math.sin((ix + count) * 0.3) + 1) * 2 +
            (Math.sin((iy + count) * 0.5) + 1) * 2
        }
      }

      renderer.render(scene, camera)

      count += 0.1
    }
  }
}
</script>

<style scoped>
#THREEbg{
  width: 100%;
  height: 100%;
  position: relative;
}
  #logingform{
    width: 400px;
    height: 400px;
    position: absolute;
    left: 38%;
    margin-top: 100px;
    background: aquamarine;
    text-align: center;
    z-index: 999999;
  }
</style>
