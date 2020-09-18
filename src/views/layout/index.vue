<template>
    <div :class="{navCollapsed:isSidebarNavCollapse}">
        <sidebar-nav  class="sidebar"/>
        <main-content/>
    </div>
</template>

<script>
import sidebarNav from './component/sidebar-nav'
import mainContent from './component/main-content/index'
import { mapState } from 'vuex'
export default {
    data() {
        return {}
    },
    computed: {
        ...mapState(['isSidebarNavCollapse'])
    },
    components: {
        sidebarNav,
        mainContent
    }
}
</script>

<style lang="scss" scoped>

</style>
