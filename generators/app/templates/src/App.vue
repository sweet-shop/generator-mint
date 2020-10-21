<template>
    <div id="app">
        <router-view/>
    </div>
</template>
<script>
export default {
    data() {
        const { meta } = this.$route;
        return {
            meta
        };
    },
    created() {},
    methods: {}
};
</script>
<style src="./app.less" lang="less"></style>
