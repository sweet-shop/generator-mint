<template src="./index.tpl.html"></template>
<script>
export default {
    name: 'welcome',
    components: {},
    props: '',
    data() {
        return {
            exportLoading: false
        };
    },
    computed: {},
    created() {},
    mounted() {},
    methods: {
        /**
         * 表单导出示例
         */
        exportExcel() {
            alert('导出');
        }
    }
};
</script>
<style src="./index.less" lang="less" scoped></style>
