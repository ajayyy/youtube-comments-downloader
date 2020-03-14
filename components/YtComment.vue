<template>
  <li class="comment">
    <v-avatar
      :size="avatarSize"
      class="comment__avatar grey"
    >
      <img
        :data-src="avatar"
        :width="avatarSize"
        :height="avatarSize"
        class="lazyload"
      >
    </v-avatar>

    <div class="comment__content">
      <div class="comment__header">
        <span class="comment__author">
          {{ comment.name }}
        </span>

        <span class="comment__time">
          <timeago :datetime="comment.date" />
        </span>
      </div>

      <div
        class="comment__text"
        v-html="text"
      />

      <div class="comment__footer">
        <span class="comment__reply">
          Reply
        </span>

        <span
          v-if="comment.likes > 0"
          class="comment__count"
        >
          {{ comment.likes }}
        </span>

        <v-btn
          class="comment__button ma-0"
          flat
          icon
        >
          <v-icon size="16px">
            thumb_up
          </v-icon>
        </v-btn>

        <v-btn
          class="comment__button ma-0"
          flat
          icon
        >
          <v-icon size="16px">
            thumb_down
          </v-icon>
        </v-btn>
      </div>

      <div
        v-if="comment.totalReplyCount > 0"
        class="comment__child"
      >
        <yt-comment
          v-for="reply in replies"
          :key="reply.id"
          :comment="reply"
          :is-child="true"
        />
      </div>
    </div>
  </li>
</template>

<script>
  import {
    VAvatar,
    VBtn,
    VIcon
  } from 'vuetify'

  export default {
    name: 'YtComment',
    components: {
      VAvatar,
      VBtn,
      VIcon
    },
    props: {
      comment: {
        type: Object,
        required: true
      },
      isChild: {
        type: Boolean,
        default: false
      }
    },
    computed: {
      avatar () {
        return this.comment.avatar.replace(
          /\/s28(.*\/photo\.jpg)$/,
          `/s${this.avatarSize * 2}$1`
        )
      },
      avatarSize () {
        return this.isChild ? 24 : 40
      },
      replies () {
        return this.comment.replies
      },
      search () {
        return this.$store.state.search
      },
      text () {
        if (this.search) {
          return this.comment.text.replace(new RegExp(this.search, 'ig'), '<mark>$&</mark>')
        }
        return this.comment.text
      }
    }
  }
</script>

<style scoped>
  .comment {
    display: flex;
    margin-bottom: 16px;
  }

  .comment__avatar {
    margin-right: 16px;
  }

  .comment__avatar img {
    transition: opacity 300ms ease-in-out;
  }

  .comment__avatar .lazyload,
  .comment__avatar .lazyloading {
    opacity: 0;
  }

  .comment__header {
    display: flex;
    align-items: center;
    height: 20px;
    margin-bottom: 2px;
    font-size: 13px;
  }

  .comment__author {
    margin-right: 8px;
    color: rgb(17, 17, 17);
    font-weight: 500;
  }

  .comment__time {
    color: rgb(136, 136, 136);
    font-weight: 400;
  }

  .comment__text {
    color: rgb(17, 17, 17);
    font-size: 14px;
    line-height: 20px;
    word-break: break-word;
  }

  .comment__text a {
    color: rgb(38, 147, 230);
    font-weight: 400;
    text-decoration: none;
  }

  .comment__footer {
    display: flex;
    height: 32px;
    align-items: center;
    margin-top: 4px;
  }

  .comment__reply {
    margin-left: -16px;
    padding: 8px 16px;
    color: rgba(17, 17, 17, 0.6);
    font-size: 13px;
    font-weight: 500;
    text-transform: uppercase;
  }

  .comment__count {
    margin-left: 4px;
    margin-right: 16px;
    color: rgba(17, 17, 17, 0.6);
    font-size: 13px;
    font-weight: 500;
  }

  .comment__button {
    margin: 0;
    height: 32px;
    width: 32px;
    color: rgba(17, 17, 17, 0.4) !important;
  }

  .comment__child {
    margin-top: 16px;
  }

  .comment__child .comment:last-child {
    margin-bottom: 0;
  }

  mark {
    background: orange;
    color: black;
  }
</style>
