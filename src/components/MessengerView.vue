<template>
  <div class="view-chat">
    <div class="chat-container">
      <div class="chat-main" ref="chatmain">
        <div v-for="message in getmessage" :key="message" class="messsage-main">
          <span v-if="message.username != $store.state.user.id">
            {{ message.name }}</span
          >
          <div
            v-if="message.username == $store.state.user.id"
            style="height: 2px"
          ></div>
          <div
            class="message-content"
            :style="
              message.username == $store.state.user.id
                ? 'flex-direction: row-reverse;'
                : ''
            "
          >
            <img
              :src="message.avt"
              alt=""
              v-if="message.username != $store.state.user.id"
            />
            <div class="message">
              <p>{{ message.message }}</p>
            </div>
          </div>
        </div>
      </div>
      <div class="chat-send">
        <form class="form-send" @submit.prevent="submitMessage">
          <input
            class="input-send"
            type="text"
            placeholder="Aa"
            v-model="inputmessage"
          />
          <button class="btn-send" type="submit">
            <i class="bi bi-send-fill"></i>
          </button>
        </form>
      </div>
    </div>
  </div>
</template>
<script>
import { ref, push, dbchat, onValue } from "../configs/firebase";
export default {
  data() {
    return {
      inputmessage: "",
      getmessage: [],
    };
  },
  mounted() {
    this.scrollToEnd();
    this.readMessage();
  },
  updated() {
    this.scrollToEnd();
  },
  methods: {
    scrollToEnd() {
      var heightScroll = this.$refs.chatmain.scrollHeight;
      this.$refs.chatmain.scrollTop = heightScroll;
    },
    sendMessage(message) {
      push(ref(dbchat, "message/" + this.$store.state.project.id), {
        username: this.$store.state.user.id,
        name: this.$store.state.user.name,
        avt: this.$store.state.user.avt,
        message: message,
      });
    },
    submitMessage() {
      if (this.inputmessage == "") return;
      this.sendMessage(this.inputmessage);
      this.inputmessage = "";
    },
    readMessage() {
      const starCountRef = ref(
        dbchat,
        "message/" + this.$store.state.project.id
      );
      onValue(starCountRef, (snapshot) => {
        this.getmessage = [];
        snapshot.forEach((element) => {
          this.getmessage.push(element.val());
        });
      });
    },
  },
};
</script>
<style scoped>
.view-chat {
  height: calc(100vh - 165px);
  width: 100%;
  background-color: rgb(255, 255, 255);
}
.chat-container {
  width: 800px;
  height: 100%;
  box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
  margin: 0 auto;
  margin-top: 20px;
  margin-bottom: 20px;
  border-radius: 10px;
  background-color: rgb(246, 246, 246);
}
.chat-main {
  width: 100%;
  height: calc(100% - 50px);
  overflow-y: scroll;
}
.chat-send {
  height: 50px;
  margin-top: 5px;
}
.form-send {
  position: relative;
}
.input-send {
  height: 40px;
  border: 1px solid rgba(17, 17, 17, 0.536);
  width: 790px;
  margin: 0 5px;
  border-radius: 20px;
  padding: 0 10px;
  padding-right: 40px;
}
.input-send:focus {
  outline: none;
}
.btn-send {
  position: absolute;
  right: 5px;
  width: 40px;
  height: 40px;
  margin: 0 5px;
  background-color: Transparent;
  background-repeat: no-repeat;
  border: none;
  cursor: pointer;
  overflow: hidden;
}

.btn-send i {
  font-size: 20px;
  color: blue;
}
.messsage-main {
  margin: 0px 10px;
}
.messsage-main span {
  font-size: 9px;
  margin-left: 45px;
}
.message-content {
  display: flex;
}
.message-content img {
  width: 40px;
  height: 40px;
  object-fit: cover;
  border-radius: 50%;
}
.message-content p {
  margin: 0;
  color: #fff;
  word-break: break-word;
}
.message {
  background-color: #0084ff;
  margin-left: 5px;
  padding: 10px 10px;
  border-radius: 20px;
  max-width: calc(100% - 70px);
}
</style>
