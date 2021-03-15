<template>
  <div class="container">
    <h1>About Us</h1>
    <p>We like You</p>
    <h2>Lets Chat About {{toy.name}}</h2>
    <ul>
      <li v-for="(msg, idx) in msgs" :key="idx">
        {{msg.from.fullname}} : {{msg.txt}}
      </li>
    </ul>
    <form @submit.prevent="sendMsg">
      <input type="text" v-model="msg.txt" />
      <button>Send</button>
    </form>
  </div>
</template>

<script>
import {socketService} from '@/services/socket.service';

export default {
  props:['toy'],
  data() {
    return {
      msg: {from: '', txt: ''},
      msgs: [],
      topic : this.toy._id
    }
  },
  created() {
    socketService.setup();
    socketService.emit('chat topic', this.topic)
    socketService.on('chat addMsg', this.addMsg)
    socketService.on('topic welcome', this.initChat)
    this.setUser()
  },
  destroyed() {
    socketService.off('chat addMsg', this.addMsg)
    socketService.terminate();
  },
  methods: {
    setUser(){
      this.msg.from= this.$store.getters.user || {fullname: 'Guest'}
    },
    addMsg(msgArr) {
      console.log('msg at front', msgArr)
      this.msgs=msgArr
    },
    sendMsg() {
      console.log('Sending', this.msg);
      socketService.emit('chat newMsg', this.msg)
      this.msg.txt = ''
    },
    changeTopic() {
      socketService.emit('chat topic', this.topic)
    },
    initChat(topicObj)      {
      this.msgs = topicObj.msgs
    }
  }
}
</script>