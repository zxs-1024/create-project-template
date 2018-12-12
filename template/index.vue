<template>
  <div class="$kebabCase$">
    <h1>$camelCase$</h1>
  </div>
</template>

<script>
import { params, rule } from './config.js'

export default {
  name: '$camelCase$',
  mixins: [],

  data () {
    return {
      params,
      rule,
      loading: false,
      tableData: []
    }
  },

  created () {
    this.searchData()
  },

  mounted () { },

  computed: {},

  filters: {},

  methods: {
    searchData () {
      this.loading = true

      this.axios.post('/user', {
        ...this.params
      })
        .then(data => {
          this.tableData = data
          this.loading = false
        })
        .catch(() => {
          this.loading = false
        })
    }
  },

  components: {}
}
</script>

<style lang="less" scoped>
</style>


