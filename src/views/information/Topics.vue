<template lang="jade">
#admin-topics.admin
  .admin-header
    .title
      h1 {{$route.meta.title}}
      el-button(type='text', @click="addTopic") 添加专题
    .filter
      el-input(placeholder="搜索",
               icon="search",
               v-model="params.title",
               :on-icon-click="search")
  el-table(:data='listData.topics' border)
    el-table-column(prop='title', label='专题名称', width="150")
      template(scope='scope')
        a(@click='clickColumn(scope.row)') {{scope.row.title}}
    el-table-column(prop='description', label='专题描述')
    el-table-column(prop='post_count', label='文章数量', width="90")
    el-table-column(prop='published_at', label='添加时间', width="160")
    el-table-column(label='操作', width="110")
        template(scope='scope')
          el-button(type='text',
                    @click='handleEdit(scope.$index, scope.row)') 编辑
          el-button(type='text',
                    @click='handleDestroy(scope.$index, scope.row, listData.topics)') 删除
  el-pagination(@size-change='handleSizeChange',
                @current-change='handleCurrentChange',
                :current-page='currentPage',
                :page-size='listData.meta.limit_value',
                layout='total, prev, pager, next, jumper',
                :total='listData.meta.total_count')
</template>

<script>
import Base from '../base'
import tool from 'tools'
import config from '../../config.js'

const vm = Base({
  url: 'admin/topics',
  data: {
    params: {
      title: ''
    }
  },
  methods: {
    addTopic () {
      window.open('/topics/new')
    },
    handleEdit (index, row) {
      window.open(`topics/new?id=${row.id}`)
    },
    search () {
      this.fetch()
    },
    clickColumn (row) {
      window.open(`${config.main}/collections/${row.title}`)
    }
  },
  watch: {
    'listData.topics': function (val) {
      val.forEach(el => {
        if (el.state === 'published') { el.state = '已发布' }
        el.published_at = tool.moment(el.created_at)
      })
    }
  }
})
export default vm
</script>

<style lang="stylus" scoped>

</style>
