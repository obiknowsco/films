<template>
  <div class="root">
    <div class="space"></div>
    <div class="space"></div>
    <!-- Tags -->
    <!-- <ul class="dn tc tags mb3">
      <li v-on:click="setTag">health</li>
      <li v-on:click="setTag">food</li>
      <li v-on:click="setTag">water</li>
      <li v-on:click="setTag">sebi</li>
      <li v-on:click="setTag">herbs</li>
      <li v-on:click="setTag">finance</li>
      <li v-on:click="setTag">code</li>
      <li v-on:click="setTag">history</li>
    </ul> -->
    <div class="space"></div>
    <!-- Videos -->
    <div class="listing" v-show="!loading">
      <article class="video" v-for="video in videos" :key="video.snippet.id">
        <router-link
          :to="{ name: 'Player', params: { id: video.contentDetails.videoId }}"
          :title="video.snippet.title"
        >
          <div class="thumb"
          :style="'background-image: url(' + video.snippet.thumbnails.medium.url + ')'"
        ></div>
        </router-link>
        <div class="space"></div>
        <div class="meta">
          <div class="title">
            <router-link
              :to="{ name: 'Player', params: { id: video.contentDetails.videoId }}"
            >
              <b>{{ video.snippet.title }}</b>
            </router-link>
          </div>
          <div class="space single"></div>
          <span class="time">{{ video.snippet.publishedAt | date }}</span>
        </div>
      </article>
    </div>

    <div class="loading" v-show="loading">
      <article v-for="fake in [1, 2, 3, 4, 5, 6, 7, 8]" :key="fake.id"></article>
    </div>
  </div>
</template>

<script>
import moment from 'moment';

export default {
  name: 'Feed',
  data() {
    return {
      err: '',
      videos: [],
      tags: [],
      loading: true,
    };
  },
  computed: {
    genTags() {
      let tags = '';
      // Check if is the last iteration, to avoid adding another +
      this.tags.forEach((tag, i) => {
        if ((i + 1) === this.tags.length) {
          tags += tag;
        } else {
          tags += `${tag}+`;
        }
      });
      return tags;
    },
  },
  filters: {
    date(value) {
      // Formate the date field
      return moment(value).fromNow();
    },
  },
  created() {
    this.getVideos();
  },
  methods: {
    getVideos() {
      // Config options
      // const MYKEY = 'AIzaSyCDZWMXOaUh4PBFfJABK2q-d2crb96JTGg';
      const PLAYLISTID = 'PLzM_sP6ghXRvs-gbeCkOPF12vBLBQ9B8D';
      const KEY = 'AIzaSyBlSc4Zavlls-c_K2cESn1jyuiUSckHgwM';
      // const OPTS = `part=snippet&type=video&q=${this.genTags}&maxResults=50`;
      // const BASE_URL = `https://www.googleapis.com/youtube/v3/search?&${OPTS}&key=${KEY}`;
      const OPTS = `part=snippet,contentDetails&playlistId=${PLAYLISTID}&maxResults=50`;
      const BASE_URL = `https://www.googleapis.com/youtube/v3/playlistItems?&${OPTS}&key=${KEY}`;

      // Get request to youtube API
      fetch(BASE_URL, { method: 'GET' })
        .then(response => response.json())
        .then((json) => {
          this.videos = json.items;
          this.loading = false;
          console.log(json);
        })
        .catch((err) => { this.err = err; });
    },
    setTag(event) {
      this.loading = true;
      const tagName = event.target.innerHTML;
      // Chech if the tags is active by checking the classname
      if (event.target.classList.value === "") {
        // Add a special class to the selected element
        event.target.classList.add('tag-on');
        // Add clicked tag to tags array
        this.tags.push(tagName);
        // Make a new request with the new parameters
        this.getVideos();
      } else {
        this.tags.forEach((tag, i) => {
          if (tagName === tag) {
            this.tags.splice(i, 1);
          }
        });
        event.target.classList.remove('tag-on');
        this.getVideos();
      }
    },
  },
};
</script>

<style>
  .listing,
  .loading{
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    min-height: 100%;
    justify-content: space-between;
  }

  .video,
  .loading article{
    width: 32%;
    position: relative;
    margin-bottom: 35px;
    padding-bottom: 10px;
  }

  .video::before,
  .video::after{
    width: 0%;
    bottom: 0;
    height: 4px;
    content: "";
    position: absolute;
    transition: width .5s;
    background-color: #f7b238;
  }

  .video::before{
    left: 0;
  }

  .video::after{
    right: 0;
  }

  .video:hover::before,
  .video:hover::after{
    width: 50%;
  }

  .video .thumb{
    width: 100%;
    height: 140px;
    border-radius: 3px;
    background-size: cover;
  }

  .video .meta{
    color: #666;
  }

  .video .meta .title{
    font-size: 14px;
  }

  .video .meta span{
    font-size: 12px;
  }

  .video .meta a{
    color: #333;
    text-decoration: none;
  }

  .video:hover .meta a{
    color: #a15e24;
  }

  /* Tags */
  .tags{
    list-style: none;
  }

  .tags li{
    color: #fafafa;
    padding: 5px;
    cursor: pointer;
    display: inline;
    border-radius: 3px;
    background-color: #9dbaca;
    transition: background-color .3s;
  }

  .tags li:hover,
  .tag-on{
    background-color: #333 !important;
  }

  .loading{
    animation: loadingAnimation infinite .8s;
  }

  .loading article{
    height: 140px;
    position: relative;
    margin-bottom: 50px;
    background-color: #DDD;
  }

  @keyframes loadingAnimation{
    from {
      opacity: 1;
    }

    to {
      opacity: 0;
    }
  }

  .loading article:before{
    width: 100%;
    content: "";
    height: 10px;
    bottom: -20px;
    position: absolute;
    background-color: #DDD;
  }

  @media screen and (max-width: 450px) {
    .wrap{
      width: 90%;
    }

    .video,
    .loading article{
      width: 100%
    }

    .tags{
      display: flex;
      flex-wrap: wrap;
      justify-content: space-between;
    }

    .tags li{
      margin-bottom: 10px;
    }
  }
</style>
