<template>
    <div :class="{navCollapsed:isSidebarNavCollapse}">
        <sidebar-nav  class="sidebar"/>
        <main-content/>
    </div>
</template>

<script>
import SidebarNav from './component/sidebar-nav'
import MainContent from './component/main-content/index'
import { mapState } from 'vuex'
export default {
    name:"Layout",
    data() {
        return {}
    },
    computed: {
        ...mapState(['isSidebarNavCollapse'])
    },
    components: {
        SidebarNav,
        MainContent
    }
}
</script>

<style lang="scss" scoped>

</style>
