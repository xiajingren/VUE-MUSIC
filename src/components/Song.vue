<template>
  <v-container fluid>
    <v-row align="center" justify="center">
      <v-col lg="6" md="6" sm="12">
        <v-row align="center" justify="center">
          <v-img :src="songdetail.al.picUrl" max-width="300">
            <v-overlay :absolute="true" :value="!playing"></v-overlay>
            <v-btn class="mx-2 centerbtn" fab outlined color="primary">
              <v-icon dark v-text="playing?'mdi-pause':'mdi-play'" @click="playbtn_click"></v-icon>
            </v-btn>
          </v-img>
        </v-row>
        <v-row align="center text-center" justify="center">
          <audio ref="audio" :src="songurl.url" controls autoplay="autoplay" hidden />
          <h3 class="pt-2">{{songdetail.name}}</h3>
          <h4>
            <span v-for="(item, index) in songdetail.ar" :key="index">{{item.name}}&nbsp;</span>
          </h4>
        </v-row>
        <v-row class="pt-2">
          <v-divider></v-divider>
          <v-list three-line>
            <template v-for="(item) in hotComments">
              <v-list-item :key="item.commentId">
                <v-list-item-avatar>
                  <v-img :src="item.user.avatarUrl"></v-img>
                </v-list-item-avatar>
                <v-list-item-content>
                  <v-list-item-title v-html="item.user.nickname"></v-list-item-title>
                  <v-list-item-subtitle v-html="item.content"></v-list-item-subtitle>
                  <template v-for="(item) in item.beReplied">
                    <div :key="item.beRepliedCommentId" class="pt-2">
                      <v-divider></v-divider>
                      <p>{{item.user.nickname}}:{{item.content}}</p>
                    </div>
                  </template>
                </v-list-item-content>
              </v-list-item>
            </template>
          </v-list>
        </v-row>
      </v-col>
    </v-row>
  </v-container>
</template>
<script>
export default {
  data() {
    return {
      songurl: {},
      songdetail: { al: [] },
      playing: true,
      hotComments: []
    };
  },
  methods: {
    playbtn_click() {
      this.playing = !this.playing;
      if (this.playing) this.$refs.audio.play();
      else this.$refs.audio.pause();
    },
    get_url() {
      this.$http
        .get("/music/url", {
          params: {
            id: this.$route.params.id
          }
        })
        .then(res => {
          console.log(res);
          if (res.data.code == 200 && res.data.data.length > 0) {
            this.songurl = res.data.data[0];
          }
        });
    },
    get_detail() {
      this.$http
        .get("/song/detail", {
          params: {
            ids: this.$route.params.id
          }
        })
        .then(res => {
          console.log(res);
          if (res.data.code == 200 && res.data.songs.length > 0) {
            this.songdetail = res.data.songs[0];
          }
        });
    },
    get_comment() {
      this.$http
        .get("/comment/music", {
          params: {
            id: this.$route.params.id,
            limit: 1
          }
        })
        .then(res => {
          console.log(res);
          if (res.data.code == 200) {
            this.hotComments = res.data.hotComments;
          }
        });
    }
  },
  created() {
    this.get_url();
    this.get_detail();
    this.get_comment();
  }
};
</script>
<style lang="less" scoped>
.centerbtn {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 10;
}
h1,
h2,
h3,
h4,
h5 {
  width: 100%;
}
</style>