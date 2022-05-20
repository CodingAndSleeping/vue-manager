<template>
  <div class="tabs">
    <el-tag
      :key="tag.path"
      v-for="(tag, index) in tags"
      :closable="tag.name !== 'home'"
      :effect="$route.name === tag.name ? 'dark' : 'plain'"
      size="small"
      @click="changeMenu(tag)"
      @close="handleClose(tag, index)"
      >{{ tag.label }}</el-tag
    >
  </div>
</template>

<script>
import { mapState, mapMutations } from "vuex";
export default {
  name: "CommonTag",
  data() {
    return {};
  },
  computed: {
    ...mapState({
      tags: (state) => state.tab.tabList,
    }),
  },
  methods: {
    ...mapMutations({
      close: "closeTag",
    }),
    changeMenu(tag) {
      if (this.$route.name !== tag.name) {
        this.$router.push({
          name: tag.name,
        });
      }
    },
    handleClose(tag, index) {
      const length = this.tags.length - 1;
      this.close(tag);
      if (this.$route.name !== tag.name) {
        return;
      }
      if (index === length) {
        this.$router.push({
          name: this.tags[index - 1].name,
        });
      } else {
        this.$router.push({
          name: this.tags[index].name,
        });
      }
    },
  },
};
</script>

<style lang="less" scoped>
.tabs {
  padding: 20px;
  .el-tag {
    margin-right: 15px;
    cursor: pointer;
  }
}
</style>