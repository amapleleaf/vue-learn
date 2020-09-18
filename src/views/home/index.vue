<template>
  <div class="home">
      这是首页，
  </div>
</template>

<script>
// @ is an alias to /src
import { mapState } from 'vuex'
export default {
  name: 'home',
  components: {
  },
  computed: {
    ...mapState('',['crumbList']),

  },
}
</script>
