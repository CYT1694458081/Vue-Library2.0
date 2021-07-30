<template>
    <div class="wrapper">
      <v-head></v-head>
      <v-aside></v-aside>
      <div class="content-box" :class="{'content-collapse':collapse}">
        <div class="content">
          <transition name="move" mode="out-in">
            <keep-alive :include="tagsList">
              <router-view></router-view>
            </keep-alive>
          </transition>
        </div>
      </div>
    </div>
</template>

<script>
import vHead from './Head.vue'
import vAside from './Aside.vue'
export default {
  data () {
    return {
      tagsList: [],
      collapse: false
    }
  },
  components: {
    vHead, vAside
  },
  created () {

  }
}
</script>

<style scoped>
</style>
